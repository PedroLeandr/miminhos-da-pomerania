'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { MessageCircle, Menu, X } from 'lucide-react'

const NAV = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Depoimentos', href: '#depoimentos' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 bg-white border-b border-parch-300/50 shadow-[0_1px_24px_rgba(10,8,6,0.06)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-[72px]">

        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-parch-200 ring-1 ring-parch-300/60">
            <Image src="/logo.png" alt="Logo" width={36} height={36} className="object-contain p-0.5" />
          </div>
          <div className="leading-[1.2]">
            <p className="font-cormorant text-[15px] font-semibold tracking-wide text-ink">Miminhos da</p>
            <p className="font-cormorant text-[15px] font-semibold tracking-wide text-gold-300">Pomerânia</p>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="relative font-dm text-sm text-stone-400 hover:text-ink transition-colors duration-300 group"
            >
              {l.label}
              <span className="absolute -bottom-px left-0 h-px w-0 bg-gold-300 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <a
          href="https://wa.me/351936196822"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-ink text-parch-100 font-dm text-sm font-medium px-5 py-2.5 rounded-full hover:bg-gold-300 hover:text-ink transition-all duration-300 shadow-md"
        >
          <MessageCircle size={14} />
          Falar connosco
        </a>

        <button
          className="md:hidden p-2 -mr-2 text-ink"
          onClick={() => setOpen(v => !v)}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-parch-100/98 backdrop-blur-lg border-t border-parch-300/40">
          <div className="px-6 py-5 flex flex-col gap-1">
            {NAV.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-dm text-[15px] text-stone-500 hover:text-ink py-3 border-b border-parch-200 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://wa.me/351936196822"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 bg-ink text-parch-100 font-dm text-sm font-medium px-5 py-3.5 rounded-full"
            >
              <MessageCircle size={14} />
              Falar connosco
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
