import type { Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'
import './globals.css'

const pixelFont = Press_Start_2P({ subsets: ['latin'], weight: '400', variable: '--font-pixel' })

export const metadata: Metadata = {
  title: 'Algorithm Catacombs',
  description: 'Master DSA through dungeon combat',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pixelFont.variable}>
      <body className="bg-gray-950 text-green-400 font-pixel min-h-screen">{children}</body>
    </html>
  )
}
