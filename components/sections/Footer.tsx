import { Heart, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Início', href: '#hero' },
  { label: 'Sobre o Canil', href: '#sobre' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Depoimentos', href: '#depoimentos' },
]

const SOCIALS = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark text-cream-200 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/5">
                <Image src="/logo.png" alt="Logo" fill className="object-contain p-1 opacity-90" />
              </div>
              <div className="leading-none">
                <p className="font-cormorant font-semibold text-[17px] text-cream-50">Miminhos da</p>
                <p className="font-cormorant font-semibold text-[17px] text-gold-400">Pomerânia</p>
              </div>
            </div>

            <p className="font-dm text-warm-300/80 text-sm leading-relaxed max-w-[320px] mb-7">
              Criação especializada em Spitz Alemão com pedigree CBKC, saúde garantida e suporte
              vitalício. Há mais de 14 anos a transformar famílias com amor peludo.
            </p>

            <div className="flex items-center gap-2.5">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/[0.08] hover:bg-gold-400/20 flex items-center justify-center transition-colors duration-300 group"
                >
                  <Icon
                    size={17}
                    className="text-cream-200/70 group-hover:text-gold-400 transition-colors"
                  />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-cormorant text-xl font-semibold text-cream-50 mb-6">Navegação</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-dm text-sm text-warm-300/80 hover:text-gold-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-cormorant text-xl font-semibold text-cream-50 mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-dm text-sm text-warm-300/80 hover:text-gold-400 transition-colors duration-300"
                >
                  <Phone size={14} className="flex-shrink-0" />
                  (11) 99999-9999
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@miminhos.com.br"
                  className="flex items-center gap-3 font-dm text-sm text-warm-300/80 hover:text-gold-400 transition-colors duration-300"
                >
                  <Mail size={14} className="flex-shrink-0" />
                  contato@miminhos.com.br
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 font-dm text-sm text-warm-300/80">
                  <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    São Paulo, SP
                    <br />
                    Atendemos todo o Brasil
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-dm text-xs text-warm-400/60">
            © {year} Miminhos da Pomerânia. Todos os direitos reservados.
          </p>
          <p className="font-dm text-xs text-warm-400/60 flex items-center gap-1.5">
            Feito com{' '}
            <Heart size={11} className="text-red-400/70 fill-red-400/70" /> para os mais fofos do
            mundo
          </p>
        </div>
      </div>
    </footer>
  )
}
