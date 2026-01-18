'use client'

import { Suspense } from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import './globals.css'
import Loading from '@/components/Loading'
import NextTopLoader from 'nextjs-toploader'

// Import des configurations de polices
import { inter, jetbrainsMono } from './fonts'

// Import dynamique des composants côté client
const Header = dynamic(() => import('@/components/layout/Header'), { 
  ssr: false,
  loading: () => <Loading />
})

const Footer = dynamic(() => import('@/components/layout/Footer'), { 
  ssr: false,
  loading: () => <Loading />
})

// Les métadonnées ont été déplacées dans head.tsx

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'light dark',
};


function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')

  if (isDashboard) {
    return (
      <body className="min-h-screen bg-codeo-light-bg font-sans text-slate-900 antialiased overflow-hidden">
        <NextTopLoader 
          color="#09d600"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </body>
    )
  }

  return (
    <body className="min-h-screen bg-white font-sans text-gray-900 antialiased dark:bg-slate-900 dark:text-slate-200">
      <NextTopLoader 
        color="#09d600"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        showSpinner={false}
        easing="ease"
        speed={200}
      />
      <Suspense fallback={<Loading />}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </Suspense>
    </body>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <LayoutContent>
        {children}
      </LayoutContent>
    </html>
  );
}
