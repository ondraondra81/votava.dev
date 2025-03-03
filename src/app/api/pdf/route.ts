// src/app/api/pdf/route.ts
import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export async function GET() {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium-browser',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu'
            ]
        })

        const page = await browser.newPage()

        // Nastavíme viewport na šířku 1000px
        await page.setViewport({
            width: 1000,
            height: 800,
            deviceScaleFactor: 1,
        })

        const url = process.env.PUPPETEER_URL || 'http://web:3000'
        await page.goto(`${url}/cv/pdf`, {
            waitUntil: 'networkidle0'
        })

        // Počkáme na načtení hlavního obsahu
        await page.waitForSelector('.pdf-container', { timeout: 5000 })

        // Pro jistotu počkáme ještě chvilku na načtení fontů a stylů
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Získáme skutečnou výšku obsahu
        const height = await page.evaluate(() => {
            const body = document.body;
            const html = document.documentElement;
            return Math.max(
                body.scrollHeight, body.offsetHeight,
                html.clientHeight, html.scrollHeight, html.offsetHeight
            );
        });

        // Nastavíme viewport na skutečnou výšku
        await page.setViewport({
            width: 1000,
            height,
            deviceScaleFactor: 1,
        });

        // Generujeme PDF
        const pdf = await page.pdf({
            width: '1000px',
            height: height + 'px',
            printBackground: true,
            preferCSSPageSize: true,
            margin: {
                top: '0',
                bottom: '0',
                left: '0',
                right: '0'
            }
        })

        await browser.close()

        return new NextResponse(pdf, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="Ondrej-Votava-CV.pdf"'
            }
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'Failed to generate PDF' },
            { status: 500 }
        )
    }
}