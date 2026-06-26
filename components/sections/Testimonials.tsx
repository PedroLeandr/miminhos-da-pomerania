'use client'

import { useEffect, useRef } from 'react'
import { Star, Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Ana Carolina Mendes',
    role: 'Tutora da Lola — Creme',
    avatar: 'https://i.pravatar.cc/80?img=11',
    text: 'A minha Lola chegou com toda a documentação e vacinas em dia. O atendimento foi impecável, antes e depois da adoção. Recomendo sem hesitar!',
    rating: 5,
  },
  {
    name: 'Rodrigo & Fernanda Costa',
    role: 'Tutores do Thor — Laranja',
    avatar: 'https://i.pravatar.cc/80?img=14',
    text: 'Nunca imaginei que um canil pudesse ser tão transparente e atencioso. O Thor chegou perfeito, alegre e saudável. Passado um ano, ainda recebemos carinho e dicas. É família!',
    rating: 5,
  },
  {
    name: 'Mariana Oliveira',
    role: 'Tutora da Mel — Branca',
    avatar: 'https://i.pravatar.cc/80?img=16',
    text: 'O nível de cuidado com os filhotes é impressionante. A Mel chegou super socializada, sem nenhum medo. O pedigree veio perfeito e o processo foi muito transparente.',
    rating: 5,
  },
  {
    name: 'Lucas Ferreira',
    role: 'Tutor do Bento — Chocolate',
    avatar: 'https://i.pravatar.cc/80?img=19',
    text: 'Pesquisei muito antes de escolher, e a qualidade dos cães e o atendimento daqui são incomparáveis. O meu Bento já ganhou três competições! A linhagem é realmente de elite.',
    rating: 5,
  },
  {
    name: 'Juliana Ramos',
    role: 'Tutora da Bella — Merle',
    avatar: 'https://i.pravatar.cc/80?img=22',
    text: 'Atendimento humanizado, suporte contínuo e um filhote lindíssimo. A Bella é a alegria da nossa família. Processo claro, sem surpresas. Gratidão eterna!',
    rating: 5,
  },
  {
    name: 'Carlos & Patrícia Lima',
    role: 'Tutores do Duque — Sable',
    avatar: 'https://i.pravatar.cc/80?img=25',
    text: 'Ficamos encantados desde o primeiro contacto. Recebemos fotos e vídeos regularmente. O Duque chegou muito amado e adaptou-se perfeitamente em casa. Nota 10!',
    rating: 5,
  },
]

function Card({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="bg-white/[0.07] border border-white/10 rounded-2xl p-5 sm:p-6 relative backdrop-blur-sm h-full flex flex-col">
      <Quote size={24} className="absolute top-5 right-5 text-gold-300/20 fill-gold-300/20" />
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={11} className="fill-gold-300 text-gold-300" />
        ))}
      </div>
      <p className="font-dm text-parch-300/75 text-sm leading-relaxed mb-5 flex-1">
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
        <div className="w-9 h-9 rounded-full bg-gold-300/20 border border-gold-300/30 shrink-0 flex items-center justify-center">
          <span className="font-cormorant text-gold-300 font-semibold text-base leading-none">
            {t.name.charAt(0)}
          </span>
        </div>
        <p className="font-dm font-semibold text-parch-100 text-sm leading-none">{t.name}</p>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          const items = el.querySelectorAll<HTMLElement>('[data-card]')
          if (items.length) {
            items.forEach((item, i) => setTimeout(() => item.classList.add('is-visible'), i * 80))
          } else {
            el.classList.add('is-visible')
          }
          obs.unobserve(el)
        })
      },
      { rootMargin: '-40px 0px' }
    )
    ;[headingRef.current, gridRef.current].forEach(r => r && obs.observe(r))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="depoimentos" className="py-16 sm:py-24 lg:py-36 bg-noir relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 lg:w-96 lg:h-96 bg-gold-300/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 lg:w-72 lg:h-72 bg-gold-300/4 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">

        <div ref={headingRef} data-reveal className="text-center mb-10 sm:mb-16">
          <span className="font-dm text-gold-300 text-[10px] font-semibold tracking-[0.22em] uppercase mb-4 block">
            Depoimentos
          </span>
          <h2 className="font-cormorant font-light text-parch-100 leading-[1.04] text-[2rem] sm:text-[2.6rem] lg:text-[3.6rem] mb-4">
            Famílias que <span className="italic text-gold-300">confiam</span> em nós
          </h2>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 hide-scrollbar snap-x snap-mandatory">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="w-[85vw] shrink-0 snap-start">
              <Card t={t} />
            </div>
          ))}
        </div>

        {/* Mobile dots */}
        <div className="md:hidden flex justify-center gap-1.5 mt-4">
          {TESTIMONIALS.map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === 0 ? 'bg-gold-300' : 'bg-white/20'}`} />
          ))}
        </div>

        {/* Desktop grid */}
        <div ref={gridRef} className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              data-card
              data-reveal
              style={{ transitionDelay: `${i * 75}ms` }}
            >
              <Card t={t} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
