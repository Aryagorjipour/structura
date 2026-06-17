import type { Metadata } from 'next'
import { Cinzel_Decorative, Source_Serif_4, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import TopNav from '@/components/layout/TopNav'
import OnboardingGate from '@/components/layout/OnboardingGate'

const cinzel = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-display',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Structura',
  description: 'Master Data Structures & Algorithms through RPG dungeon combat',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Structura',
    description: 'Master Data Structures & Algorithms through RPG dungeon combat',
    images: ['/logo.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${sourceSerif.variable} ${jetbrains.variable}`}>
      <body style={{ backgroundColor: 'var(--color-void)', color: 'var(--color-text)', fontFamily: 'var(--font-body)' }} className="min-h-screen">
        <OnboardingGate>
          <TopNav />
          <main>{children}</main>
        </OnboardingGate>
      </body>
    </html>
  )
}
