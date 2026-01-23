import { HeroCarousel } from "@/components/hero-carousel"
import { Pillars } from "@/components/pillars"
// Usamos el alias @ que apunta a la raíz para no fallar
import InstagramFeed from "@/components/instagram-feed" 

export default function HomePage() {
  return (
    <main>
      <HeroCarousel />
      <Pillars />
      <InstagramFeed />
    </main>
  )
}