import Image from 'next/image'
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin, Heart } from 'lucide-react'

const NAV = [
  { label: 'Sobre o Canil', href: '#sobre' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Depoimentos', href: '#depoimentos' },
]

const SOCIAL = [
  { icon: Instagram, href: 'https://www.instagram.com/miminhos_da_pomerania/', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/miminhosdapomerania', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-noir text-parch-300 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-10">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6 w-fit">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-white/5">
                <Image src="/logo.png" alt="Logo" width={36} height={36} className="object-contain p-0.5 opacity-80" />
              </div>
              <div className="leading-[1.2]">
                <p className="font-cormorant text-[15px] font-semibold text-parch-100">Miminhos da</p>
                <p className="font-cormorant text-[15px] font-semibold text-gold-300">Pomerânia</p>
              </div>
            </a>

            <p className="font-dm text-stone-400 text-sm leading-relaxed max-w-xs mb-7">
              Há mais de 14 anos a criar Spitz Alemão com pedigree CBKC, saúde garantida
              e suporte vitalício. Amor em cada detalhe.
            </p>

            <div className="flex gap-2.5">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-gold-300/20 flex items-center justify-center transition-colors duration-300 group"
                >
                  <Icon size={15} className="text-stone-400 group-hover:text-gold-300 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-cormorant text-lg font-semibold text-parch-100 mb-5 tracking-wide">
              Navegação
            </h4>
            <ul className="space-y-3">
              {NAV.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-dm text-sm text-stone-400 hover:text-gold-300 transition-colors duration-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-cormorant text-lg font-semibold text-parch-100 mb-5 tracking-wide">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://wa.me/351936196822"
                  className="flex items-center gap-3 font-dm text-sm text-stone-400 hover:text-gold-300 transition-colors duration-300"
                >
                  <Phone size={13} className="shrink-0" />
                  +351 936 196 822
                </a>
              </li>
              <li>
                <a
                  href="mailto:lulupomeraniaboo@hotmail.com"
                  className="flex items-center gap-3 font-dm text-sm text-stone-400 hover:text-gold-300 transition-colors duration-300"
                >
                  <Mail size={13} className="shrink-0" />
                  lulupomeraniaboo@hotmail.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 font-dm text-sm text-stone-400">
                  <MapPin size={13} className="shrink-0 mt-0.5" />
                  <span>Rua Timor Loro SAE 75<br />3880-644 Válega</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-dm text-xs text-stone-600">
            © {year} Miminhos da Pomerânia. Todos os direitos reservados.
          </p>
          <p className="font-dm text-xs text-stone-600 flex items-center gap-1.5">
            Feito com <Heart size={10} className="text-gold-300/60 fill-gold-300/60" /> para os mais fofos do mundo
          </p>
        </div>
      </div>
    </footer>
  )
}
