'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { currentCaption, photoSlots, type PhotoCaptions, type PhotoSources } from '@/lib/photo-slots'

const PHOTOS = [
  { id: 'galeria-1', alt: 'Filhote com laço vermelho', pos: 'object-[50%_30%]' },
  { id: 'galeria-2', alt: 'Três filhotes no jardim', pos: 'object-[50%_60%]' },
  { id: 'galeria-3', alt: 'Filhote nas pedras', pos: 'object-[50%_45%]' },
  { id: 'galeria-4', alt: 'Dois filhotes a brincar', pos: 'object-[50%_55%]' },
  { id: 'galeria-5', alt: 'Filhote deitado', pos: 'object-[50%_45%]' },
  { id: 'galeria-6', alt: 'Filhote branco de pé', pos: 'object-[50%_40%]' },
] as const

export default function Gallery({ photos, captions }: { photos: PhotoSources; captions: PhotoCaptions }) {
  const gallery = PHOTOS.map(photo => {
    const replacement = photos[photo.id]
    return {
      ...photo,
      src: replacement ?? photoSlots[photo.id].original,
      alt: replacement ? 'Lulu da Pomerânia' : photo.alt,
      label: currentCaption(photo.id, replacement, captions[photo.id]),
      custom: !!replacement,
    }
  })
  const [featured, ...others] = gallery
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          const items = el.querySelectorAll<HTMLElement>('[data-reveal]')
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
    <section id="galeria" className="py-16 sm:py-24 lg:py-36 bg-parch-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div ref={headingRef} data-reveal className="mb-10 sm:mb-16">
          <span className="font-dm text-gold-300 text-[10px] font-semibold tracking-[0.22em] uppercase mb-4 block">
            Galeria
          </span>
          <h2 className="font-cormorant font-light text-ink leading-[1.04] text-[2rem] sm:text-[2.6rem] lg:text-[3.6rem]">
            Cada filhote, um <span className="italic text-gold-300">tesouro</span> único
          </h2>
        </div>

        <div ref={gridRef}>

        {/* Mobile: 2-col uniform grid */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {gallery.map((photo, i) => (
            <div
              key={photo.id}
              data-reveal
              className="aspect-square rounded-xl overflow-hidden bg-parch-200 img-zoom group cursor-pointer shadow-sm"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="relative w-full h-full">
                <Image src={photo.src} alt={photo.alt} unoptimized={photo.custom} fill className={`object-cover ${photo.pos}`} sizes="50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 break-words p-3">
                  <p className="font-dm text-parch-100 text-[11px] font-medium">{photo.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet+: editorial grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Portrait tall — spans 2 rows on desktop */}
          <div
            data-reveal
            className="sm:row-span-2 rounded-2xl overflow-hidden bg-parch-200 img-zoom group cursor-pointer shadow-sm"
          >
            <div className="relative w-full h-full min-h-[280px] sm:min-h-[360px] lg:min-h-[480px]">
              <Image src={featured.src} alt={featured.alt} unoptimized={featured.custom} fill className={`object-cover ${featured.pos}`} sizes="(max-width:1024px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-cormorant text-parch-100 text-lg font-medium">{featured.label}</p>
              </div>
            </div>
          </div>

          {/* Remaining photos */}
          {others.map((photo, i) => (
            <div
              key={photo.id}
              data-reveal
              className="aspect-[4/3] rounded-2xl overflow-hidden bg-parch-200 img-zoom group cursor-pointer shadow-sm"
              style={{ transitionDelay: `${(i + 1) * 80}ms` }}
            >
              <div className="relative w-full h-full">
                <Image src={photo.src} alt={photo.alt} unoptimized={photo.custom} fill className={`object-cover ${photo.pos}`} sizes="(max-width:1024px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="font-cormorant text-parch-100 text-base font-medium">{photo.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        </div>{/* fim wrapper gridRef */}

        <p className="text-center font-dm text-xs sm:text-sm text-stone-300 mt-8 sm:mt-10">
          Imagens de exemplares · Fotos dos filhotes disponíveis por WhatsApp
        </p>
      </div>
    </section>
  )
}
