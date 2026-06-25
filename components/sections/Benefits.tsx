'use client'

import { useEffect, useRef } from 'react'
import { Trophy, Stethoscope, Baby, GraduationCap, Sparkles, Clock, MapPin, PhoneCall } from 'lucide-react'

const BENEFITS = [
  { n: '01', icon: Trophy,       title: 'Linhagem Campeã',     desc: 'Descendentes de campeões nacionais e internacionais, garantindo o melhor padrão da raça.' },
  { n: '02', icon: Stethoscope,  title: 'Saúde Monitorada',    desc: 'Acompanhamento veterinário desde o nascimento com exames completos e vacinas em dia.' },
  { n: '03', icon: Baby,         title: 'Filhotes Socializados',desc: 'Criados em ambiente familiar, convivendo com crianças, adultos e outros animais.' },
  { n: '04', icon: GraduationCap,title: 'Orientação Completa', desc: 'Manual de cuidados e acesso ao grupo exclusivo de tutores Miminhos da Pomerânia.' },
  { n: '05', icon: Sparkles,     title: 'Padrão Premium',      desc: 'Seleção rigorosa dos reprodutores para o mais alto padrão estético e temperamental.' },
  { n: '06', icon: Clock,        title: 'Garantia Contratual', desc: 'Contrato formal com garantia de saúde e termo de responsabilidade do canil.' },
  { n: '07', icon: MapPin,       title: 'Entrega com Segurança',desc: 'Entregamos com toda a documentação, enxoval inicial e cuidados para a viagem.' },
  { n: '08', icon: PhoneCall,    title: 'Suporte Pós-adoção',  desc: 'Tire todas as suas dúvidas connosco. Estamos disponíveis sempre que precisar.' },
]

export default function Benefits() {
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          const items = el.querySelectorAll<HTMLElement>('[data-item]')
          if (items.length) {
            items.forEach((item, i) => setTimeout(() => item.classList.add('is-visible'), i * 60))
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
    <section id="beneficios" className="py-16 sm:py-24 lg:py-36 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-100/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">

        <div ref={headingRef} data-reveal className="mb-10 sm:mb-16">
          <span className="font-dm text-gold-300 text-[10px] font-semibold tracking-[0.22em] uppercase mb-4 block">
            Por que nos escolher
          </span>
          <h2 className="font-cormorant font-light text-ink leading-[1.04] text-[2rem] sm:text-[2.6rem] lg:text-[3.6rem] mb-4">
            Tudo o que o seu{' '}
            <span className="italic text-gold-300">filhote</span>{' '}
            merece
          </h2>
          <p className="font-dm text-stone-400 text-sm sm:text-[15px] leading-relaxed max-w-md">
            Acreditamos que cada filhote merece começar a vida com o melhor. Por isso criamos um padrão de excelência em cada detalhe.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-parch-200 rounded-2xl overflow-hidden border border-parch-200">
          {BENEFITS.map((b, i) => (
            <div
              key={b.n}
              data-item
              data-reveal
              className="bg-white p-5 sm:p-6 lg:p-7 group hover:bg-parch-100 transition-colors duration-300 cursor-default"
              style={{ transitionDelay: `${i * 55}ms` }}
            >
              <div className="flex items-start justify-between mb-4 sm:mb-5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-parch-100 group-hover:bg-gold-100 flex items-center justify-center transition-colors duration-300 shrink-0">
                  <b.icon size={17} className="text-gold-300" />
                </div>
                <span className="font-cormorant text-3xl sm:text-4xl font-light text-parch-300 group-hover:text-gold-100 transition-colors duration-300 leading-none">
                  {b.n}
                </span>
              </div>
              <h3 className="font-cormorant text-[1.1rem] sm:text-xl font-semibold text-ink mb-1.5 leading-tight">{b.title}</h3>
              <p className="font-dm text-xs sm:text-sm text-stone-400 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
