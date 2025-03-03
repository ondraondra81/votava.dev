import {Github, LinkedIn, Mail} from "@/components/icons";
import Image from 'next/image'
import ai_programmer_v1 from './../../public/images/ai_programmer.png'
import ai_programmer_v2 from './../../public/images/ai_programmer_v2.jpeg'
import ai_programmer_v3 from './../../public/images/ai_programmer_v3.jpeg'

import {getContact, getProfile} from "@/lib/dataProviders";
import {Footer} from "@/components/Footer";

// Set to dynamic to prevent static generation issues
export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Ondřej Votava - Senior Developer, IT & Business Analyst',
    description: ''
}

export default async function LandingPage() {
    const [profile, contact] = await Promise.all([getProfile(), getContact()]);
    const images = [ai_programmer_v1, ai_programmer_v2, ai_programmer_v3];

    const ai_programmer = images[Math.floor(Math.random() * images.length)];

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="container mx-auto px-4 flex-grow flex items-center">
                <div className="grid lg:grid-cols-3 gap-12 items-center h-[800px]">
                    {/* Left Side - Creative Typography */}
                    <div>
                        <div className="mb-8">
                            <div className="text-lg text-red-700 mb-2 uppercase tracking-wide">
                                { profile.title }
                            </div>
                            <h1 className="text-6xl font-black text-gray-900 leading-tight mb-4">
                                Ondřej
                                <br />
                                Votava
                            </h1>
                        </div>

                        <blockquote className="border-l-4 border-red-700 pl-4 mb-8 text-gray-600 italic">
                            {profile.motto}
                        </blockquote>

                        <div className="flex space-x-4 items-center">
                            <a
                                href="/cv"
                                className="bg-red-700 text-white px-6 py-3 rounded-full hover:bg-red-800 transition-colors"
                            >
                                curriculum vitae
                            </a>

                            <div className="flex space-x-4">
                                <a
                                    href={contact.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-red-700"
                                >
                                    <Github className="w-6 h-6" />
                                </a>
                                <a
                                    href={contact.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-red-700"
                                >
                                    <LinkedIn className="w-6 h-6" />
                                </a>
                                <a
                                    href="mailto:your.email@domain.com"
                                    className="text-gray-600 hover:text-red-700"
                                >
                                    <Mail className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Technical Visual */}
                    <div className="hidden col-span-2 lg:block">
                        <div className="w-full  bg-red-100 min-h-[640px] max-h-screen  rounded-lg overflow-hidden flex items-center justify-center">
                            <div className="text-red-700 text-center">
                                <Image src={ai_programmer} alt="Illustration of a programmer with artificial intelligence concept"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}