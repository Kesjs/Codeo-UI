'use client'

import { Suspense } from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import './globals.css'
import NextTopLoader from 'nextjs-toploader'

// Import des configurations de polices
import { inter, jetbrainsMono } from './fonts'

// Import dynamique des composants côté client
const Header = dynamic(() => import('@/components/layout/Header'), { 
  ssr: false,
  loading: () => <div className="h-16 bg-white" />
})

const Footer = dynamic(() => import('@/components/layout/Footer'), { 
  ssr: false,
  loading: () => <div className="h-16 bg-white" />
})

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
      <body className={`min-h-screen font-sans antialiased flex flex-col ${
        isDashboard 
          ? 'bg-codeo-light-bg text-slate-900 overflow-hidden' 
          : 'bg-white text-gray-900 dark:bg-slate-900 dark:text-slate-200'
      }`}>
        <NextTopLoader 
          color="#09d600"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 8px #09d600, 0 0 4px #09d600"
          zIndex={1600}
        />
        <Suspense fallback={null}>
          {!isDashboard && <Header />}
          <main className="flex-1">
            {children}
          </main>
          {!isDashboard && <Footer />}
        </Suspense>
      </body>
    </html>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutContent>{children}</LayoutContent>;
}
