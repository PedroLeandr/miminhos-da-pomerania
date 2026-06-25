'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { MessageCircle, Phone, ArrowRight, Star } from 'lucide-react'

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('is-visible'); obs.disconnect() } },
      { rootMargin: '-50px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-16 sm:py-24 lg:py-36 bg-parch-100 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 sm:w-[500px] sm:h-[400px] bg-gold-100/40 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-60 h-60 sm:w-[400px] sm:h-[300px] bg-parch-300/60 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <div ref={ref} data-reveal>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-gold-300/30 shadow-xl bg-parch-200">
                <Image
                  src="/logo.png"
                  alt="Miminhos da Pomerânia"
                  width={80}
                  height={80}
                  className="object-contain p-1"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-emerald-500 rounded-full border-2 border-parch-100 flex items-center justify-center">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-0.5 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={13} className="fill-gold-300 text-gold-300" />
            ))}
            <span className="ml-2 font-dm text-xs sm:text-sm text-stone-400">5.0 · 200+ avaliações</span>
          </div>

          <span className="font-dm text-gold-300 text-[10px] font-semibold tracking-[0.22em] uppercase mb-5 block">
            Próximo passo
          </span>

          <h2 className="font-cormorant font-light text-ink leading-[1.02] text-[2.2rem] sm:text-[3rem] lg:text-[4.5rem] mb-5">
            O seu{' '}
            <span className="italic text-gold-300">companheiro</span>
            <br />está à sua espera
          </h2>

          <p className="font-dm text-stone-400 text-sm sm:text-[16px] max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed">
            Entre em contacto agora e conheça os nossos filhotes disponíveis.
            Respondemos rapidamente e com todo o carinho que merece.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <a
              href="https://wa.me/351936196822?text=Olá! Tenho interesse num filhote de Lulu da Pomerânia. Poderia enviar-me mais informações?"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-dm font-semibold text-sm sm:text-[15px] px-7 py-4 rounded-full shadow-xl hover:shadow-emerald-400/25 transition-all duration-300"
            >
              <MessageCircle size={17} />
              Falar pelo WhatsApp
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            <a
              href="tel:+351936196822"
              className="inline-flex items-center justify-center gap-2.5 bg-ink hover:bg-charcoal text-parch-100 font-dm font-medium text-sm sm:text-[15px] px-7 py-4 rounded-full transition-colors duration-300 shadow-lg"
            >
              <Phone size={15} />
              Ligar agora
            </a>
          </div>

          <p className="font-dm text-stone-300 text-xs sm:text-sm mt-7">
            Sempre disponíveis para si
          </p>
        </div>
      </div>
    </section>
  )
}
