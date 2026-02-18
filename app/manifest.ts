import type { MetadataRoute } from 'next'

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Iftarkar',
        short_name: 'Iftarkar',
        description: 'Iftarkar is your companion app for Ramzan. Daily Countdown Timer, Iftar and Sehri Timings for Jammu, Kashmir, Kargil and Ladakh.',
        start_url: '/',
        display: 'standalone',
        background_color: '#f0ebe3',
        theme_color: '#f0ebe3',
        icons: [
            {
                src: '/icons/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icons/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/icons/maskable-icon.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: '/icons/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    }
}
