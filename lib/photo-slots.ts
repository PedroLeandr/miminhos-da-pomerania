export const photoSlots = {
  'sobre-1': { group: 'Sobre o canil', label: 'Foto principal', original: '/1.jpg' },
  'sobre-2': { group: 'Sobre o canil', label: 'Segunda foto', original: '/7.jpg' },
  'sobre-3': { group: 'Sobre o canil', label: 'Terceira foto (PC)', original: '/4.jpg' },
  'galeria-1': { group: 'Galeria', label: 'Foto 1', original: '/6.jpg' },
  'galeria-2': { group: 'Galeria', label: 'Foto 2', original: '/2.jpg' },
  'galeria-3': { group: 'Galeria', label: 'Foto 3', original: '/3.jpg' },
  'galeria-4': { group: 'Galeria', label: 'Foto 4', original: '/8.jpg' },
  'galeria-5': { group: 'Galeria', label: 'Foto 5', original: '/5.jpg' },
  'galeria-6': { group: 'Galeria', label: 'Foto 6', original: '/9.jpg' },
  logo: { group: 'Identidade', label: 'Logótipo do site', original: '/logo.png' },
} as const

export type PhotoSlot = keyof typeof photoSlots
export type PhotoSources = Partial<Record<PhotoSlot, string>>
export const galleryCaptions = {
  'galeria-1': 'Sable · Macho',
  'galeria-2': 'Filhotes · Trio',
  'galeria-3': 'Laranja · Macho',
  'galeria-4': 'Duo · Filhotes',
  'galeria-5': 'Creme · Fêmea',
  'galeria-6': 'Branco · Macho',
} as const
export type GallerySlot = keyof typeof galleryCaptions
export type PhotoCaptions = Partial<Record<GallerySlot, string>>
export const maxCaptionLength = 100

export function isGallerySlot(id: string): id is GallerySlot {
  return Object.hasOwn(galleryCaptions, id)
}

export function currentCaption(id: GallerySlot, src?: string, caption?: string) {
  return caption ?? (src ? 'Lulu da Pomerânia' : galleryCaptions[id])
}
export const photoIds = Object.keys(photoSlots) as PhotoSlot[]

export function isPhotoSlot(value: string): value is PhotoSlot {
  return Object.hasOwn(photoSlots, value)
}
