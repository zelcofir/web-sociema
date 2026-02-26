import { HeroCarousel } from "@/components/hero-carousel"
import { Pillars } from "@/components/pillars"
import HistoryTimeline from "@/components/history" // Nuevo componente
import InstagramFeed from "@/components/instagram-feed"

export default function HomePage() {
  return (
    <main>
      <HeroCarousel />
      <div className="py-10">
        <Pillars />
      </div>
      <HistoryTimeline /> 
      <InstagramFeed />
    </main>
  )
}