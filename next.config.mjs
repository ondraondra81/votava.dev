export default {
    output: "standalone",

    // Zvýšení výkonu buildu
    onDemandEntries: {
        // Období, po které server zachová stránky v paměti
        maxInactiveAge: 25 * 1000,
        // Počet stránek, které se udržují v paměti
        pagesBufferLength: 2,
    },

    // Omezit generování velikosti map zdrojového kódu
    productionBrowserSourceMaps: false,

    // Snížit počet staticky generovaných stránek
    // a využít více SSR nebo ISR
    staticPageGenerationTimeout: 120,

    // Zakázat typovou kontrolu během buildu
    typescript: {
        ignoreBuildErrors: process.env.CI !== 'true',
    },

    // Zakázat ESLint během buildu (použijte samostatnou kontrolu lintu)
    eslint: {
        // !! UPOZORNĚNÍ !!
        // Zakázání ESLint během buildu může vést k problémům v produkci
        // pokud není zajištěna kontrola lintu v jiné části CI
        ignoreDuringBuilds: process.env.CI !== 'true',
    },
};