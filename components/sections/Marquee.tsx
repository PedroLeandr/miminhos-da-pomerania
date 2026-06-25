const ITEMS = [
  'Pedigree CBKC',
  'Saúde Garantida',
  '+200 Famílias',
  'Desde 2010',
  'Suporte Vitalício',
  'Linhagem Campeã',
  'Entrega em Todo o Brasil',
  'Filhotes Socializados',
]

const DOUBLED = [...ITEMS, ...ITEMS]

export default function Marquee() {
  return (
    <div className="bg-noir border-y border-white/[0.05] py-[18px] overflow-hidden select-none">
      <div className="marquee-track">
        {DOUBLED.map((item, i) => (
          <span key={i} className="inline-flex items-center shrink-0">
            <span className="font-cormorant text-parch-300/70 text-lg tracking-wide px-7 italic">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-300/50 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}
