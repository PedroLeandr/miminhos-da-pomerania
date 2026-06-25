'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'

const STATS = [
  { value: '14+', label: 'Anos' },
  { value: '100%', label: 'Satisfação' },
]

const anim = (delay: number, dir: 'up' | 'in' = 'up') =>
  ({ animation: `${dir === 'up' ? 'fadeUp' : 'fadeIn'} 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s both` })

export default function Hero() {
  return (
    <section className="relative min-h-dvh flex flex-col justify-end lg:justify-center overflow-hidden bg-ink lg:bg-parch-100">

      {/* Imagem de fundo — mobile: centrada no cão; desktop: lado direito */}
      <div className="absolute inset-0 lg:left-auto lg:w-[54%] lg:right-0">
        <Image
          src="/banner.jpg"
          alt="Lulu da Pomerânia"
          fill
          priority
          className="object-cover object-[50%_60%] lg:object-[45%_55%]"
          sizes="(max-width: 1024px) 100vw, 54vw"
        />
        {/* Mobile: gradiente escuro de baixo para cima */}
        <div className="absolute inset-0 lg:hidden bg-gradient-to-t from-ink via-ink/70 to-ink/15" />
        {/* Desktop: gradiente da esquerda para fundir com o texto */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-parch-100 via-parch-100/25 to-transparent" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:max-w-7xl lg:mx-auto lg:px-12 pb-12 pt-28 lg:py-0">
        <div className="lg:max-w-xl">

          <div style={anim(0.1)} className="inline-flex items-center gap-2 mb-7">
            <span className="w-5 h-px bg-gold-300" />
            <span className="font-dm text-gold-300 text-[10px] font-semibold tracking-[0.22em] uppercase">
              Criação Premium · Pedigree CBKC
            </span>
          </div>

          <h1 className="font-cormorant font-light leading-[1.02] mb-6">
            {[
              { text: 'Nasce aqui', italic: false },
              { text: 'o seu próximo', italic: true },
              { text: 'grande amor.', italic: false },
            ].map(({ text, italic }, i) => (
              <span
                key={i}
                style={anim(0.25 + i * 0.12)}
                className={`block text-[2.4rem] sm:text-[3.2rem] lg:text-[clamp(3rem,5vw,5rem)] ${
                  italic ? 'italic text-gold-300' : 'text-parch-100 lg:text-ink'
                }`}
              >
                {text}
              </span>
            ))}
          </h1>

          <p
            style={anim(0.62)}
            className="font-dm text-parch-300/80 lg:text-stone-400 text-sm sm:text-[15px] leading-relaxed mb-8 max-w-xs sm:max-w-sm"
          >
            Spitz Alemão criados com dedicação absoluta, saúde comprovada e amor em cada detalhe.
          </p>

          <div style={anim(0.76)} className="flex flex-col sm:flex-row gap-3 mb-10">
            <a
              href="https://wa.me/351936196822?text=Olá! Tenho interesse num filhote de Lulu da Pomerânia."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gold-300 text-ink font-dm text-sm font-semibold px-7 py-4 rounded-full hover:bg-gold-200 transition-colors duration-300 shadow-lg"
            >
              Ver filhotes disponíveis
            </a>
            <a
              href="#sobre"
              className="inline-flex items-center justify-center font-dm text-sm font-medium px-7 py-4 rounded-full border border-white/25 text-parch-100 lg:border-parch-400/60 lg:text-ink hover:bg-white/10 lg:hover:bg-ink/5 transition-colors duration-300"
            >
              Conhecer o canil
            </a>
          </div>

          <div
            style={anim(0.9)}
            className="flex items-center gap-8 pt-7 border-t border-white/15 lg:border-parch-300"
          >
            {STATS.map(s => (
              <div key={s.label}>
                <p className="font-cormorant text-2xl sm:text-3xl font-semibold text-gold-300 leading-none mb-1">
                  {s.value}
                </p>
                <p className="font-dm text-[10px] text-parch-300/50 lg:text-stone-400 uppercase tracking-widest">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: badge de avaliação */}
      <div
        style={anim(1.2, 'in')}
        className="hidden lg:block absolute right-14 bottom-14 z-10 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-xl border border-parch-200/60"
      >
        <div className="flex gap-0.5 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={11} className="fill-gold-300 text-gold-300" />
          ))}
        </div>
        <p className="font-dm font-semibold text-ink text-sm leading-none mb-0.5">5.0 · Excelente</p>
        <p className="font-dm text-stone-400 text-xs">+200 avaliações verificadas</p>
      </div>

    </section>
  )
}
