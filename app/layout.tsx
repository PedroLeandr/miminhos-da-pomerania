import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Miminhos da Pomerânia',
  description:
    'Criação especializada de Spitz Alemão com pedigree CBKC, saúde garantida e suporte vitalício. Filhotes criados com amor há mais de 14 anos.',
  keywords: ['Lulu da Pomerânia', 'Spitz Alemão', 'filhotes', 'canil premium', 'pedigree CBKC'],
  openGraph: {
    title: 'Miminhos da Pomerânia',
    description: 'Filhotes de Spitz Alemão criados com excelência, pedigree e amor.',
    type: 'website',
    locale: 'pt_PT',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-dm antialiased grain">{children}</body>
    </html>
  )
}
