import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import About from '@/components/sections/About'
import Gallery from '@/components/sections/Gallery'
import Benefits from '@/components/sections/Benefits'
import Testimonials from '@/components/sections/Testimonials'
import CTA from '@/components/sections/CTA'
import { readPhotos } from '@/lib/photo-storage'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const { sources: photos, captions } = await readPhotos().catch(error => {
    console.error('Erro ao consultar as fotos do site', error)
    return { sources: {}, captions: {} } as Awaited<ReturnType<typeof readPhotos>>
  })
  return (
    <main>
      <Navbar logo={photos.logo} />
      <Hero />
      <Marquee />
      <About photos={photos} />
      <Gallery photos={photos} captions={captions} />
      <Benefits />
      <Testimonials />
      <CTA logo={photos.logo} />
      <Footer logo={photos.logo} />
    </main>
  )
}
