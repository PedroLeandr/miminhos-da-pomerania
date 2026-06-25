'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Award, Heart, Users, HeartHandshake } from 'lucide-react'

const STATS = [
  { value: '14+', label: 'Anos de experiência' },
  { value: '200+', label: 'Famílias atendidas' },
  { value: '100%', label: 'Satisfação garantida' },
]

const PILLARS = [
  { icon: Award,         title: 'Pedigree Certificado', desc: 'Registo CBKC/FCI com genealogia comprovada até quatro gerações.' },
  { icon: Heart,         title: 'Saúde Garantida',      desc: 'Protocolo vacinal completo, vermifugação e exames preventivos.' },
  { icon: Users,         title: 'Socialização Perfeita',desc: 'Filhotes criados em ambiente familiar desde os primeiros dias.' },
  { icon: HeartHandshake,title: 'Suporte Vitalício',    desc: 'Estamos ao seu lado em cada etapa da vida do seu companheiro.' },
]

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transitionDelay = delay ? `${delay}ms` : ''
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('is-visible'); obs.disconnect() } },
      { rootMargin: '-50px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return ref
}

export default function About() {
  const leftRef  = useReveal()
  const rightRef = useReveal(120)
  const pillarsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = pillarsRef.current
    if (!container) return
    const items = container.querySelectorAll<HTMLElement>('[data-pillar]')
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          items.forEach((el, i) => setTimeout(() => el.classList.add('is-visible'), i * 90))
          obs.disconnect()
        }
      },
      { rootMargin: '-40px 0px' }
    )
    obs.observe(container)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="sobre" className="py-16 sm:py-24 lg:py-36 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 lg:w-96 lg:h-96 bg-gold-100/30 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 lg:w-72 lg:h-72 bg-parch-200/60 rounded-full blur-[60px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">

        {/* Text + images grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-28 items-center mb-14 lg:mb-24">

          {/* Text */}
          <div ref={leftRef} data-reveal className="order-2 lg:order-1">
            <span className="font-dm text-gold-300 text-[10px] font-semibold tracking-[0.22em] uppercase mb-4 block">
              A nossa história
            </span>
            <h2 className="font-cormorant font-light text-ink leading-[1.04] text-[2rem] sm:text-[2.6rem] lg:text-[3.6rem] mb-6">
              Mais de uma <span className="italic text-gold-300">década</span>
              <br />dedicada à raça
            </h2>
            <p className="font-dm text-stone-400 text-[15px] sm:text-[16px] leading-relaxed mb-4">
              Somos um canil familiar especializado exclusivamente em Spitz Alemão há mais de 14 anos.
              A nossa paixão pela raça levou-nos a criar um padrão de excelência que vai muito além do esperado.
            </p>
            <p className="font-dm text-stone-400 text-[15px] leading-relaxed">
              Cada filhote que sai daqui carrega não só a beleza marcante do Lulu da Pomerânia,
              mas também o cuidado e o amor que dedicamos a cada detalhe da sua criação.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-parch-200">
              {STATS.map(s => (
                <div key={s.label}>
                  <p className="font-cormorant text-[2rem] sm:text-[2.5rem] font-semibold text-gold-300 leading-none mb-1">{s.value}</p>
                  <p className="font-dm text-[10px] text-stone-400 uppercase tracking-wide leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div ref={rightRef} data-reveal="right" className="order-1 lg:order-2">
            {/* Mobile: 2 equal images side by side */}
            <div className="grid grid-cols-2 gap-3 lg:hidden">
              {[
                { src: '/1.jpg', pos: 'object-[50%_40%]' },
                { src: '/7.jpg', pos: 'object-[45%_50%]' },
              ].map((img, i) => (
                <div key={i} className="aspect-[3/4] rounded-2xl overflow-hidden bg-parch-200 img-zoom shadow-sm">
                  <Image
                    src={img.src}
                    alt="Lulu da Pomerânia"
                    width={300}
                    height={400}
                    className={`object-cover w-full h-full ${img.pos}`}
                  />
                </div>
              ))}
            </div>

            {/* Desktop: asymmetric 3-image layout */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              <div className="row-span-2 rounded-2xl overflow-hidden bg-parch-200 img-zoom shadow-sm">
                <Image
                  src="/1.jpg"
                  alt="Lulu da Pomerânia dourado"
                  width={600}
                  height={900}
                  className="object-cover object-[50%_40%] w-full h-full"
                />
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-parch-200 img-zoom shadow-sm">
                <Image
                  src="/7.jpg"
                  alt="Lulu da Pomerânia wolf sable"
                  width={600}
                  height={450}
                  className="object-cover object-[45%_45%] w-full h-full"
                />
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-parch-200 img-zoom shadow-sm">
                <Image
                  src="/4.jpg"
                  alt="Lulu da Pomerânia preto"
                  width={600}
                  height={450}
                  className="object-cover object-[50%_50%] w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              data-pillar
              data-reveal
              className="bg-parch-100 rounded-2xl p-5 sm:p-6 border border-parch-200/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm border border-parch-200">
                <p.icon size={18} className="text-gold-300" />
              </div>
              <h3 className="font-cormorant text-lg sm:text-xl font-semibold text-ink mb-2">{p.title}</h3>
              <p className="font-dm text-sm text-stone-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
