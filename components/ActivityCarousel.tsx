"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const featuredActivities = [
  {
    id: 1,
    title: "XXXV Congreso Científico Nacional (CCN 2026)",
    category: "Evento Nacional",
    date: "Agosto 2026",
    location: "Cusco, Perú",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2070",
    description: "El evento científico estudiantil más importante del país. ¡Nos vemos en la ciudad imperial!"
  },
  {
    id: 2,
    title: "Jornada Científica Regional Sur (JCRS 2026)",
    category: "Evento Regional",
    date: "06 al 08 de Marzo 2026",
    location: "Arequipa (Sede UNSA)",
    image: "https://images.unsplash.com/photo-1655067519849-991fb9878fa0?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=2070",
    description: "Tres días de ciencia, academia y confraternidad entre las sociedades del sur."
  },
]

export function ActivityCarousel() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => setCurrent((prev) => (prev + 1) % featuredActivities.length), [])
  const prev = useCallback(() => setCurrent((prev) => (prev - 1 + featuredActivities.length) % featuredActivities.length), [])

  useEffect(() => {
    const timer = setInterval(next, 7000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <div className="relative h-[450px] w-full overflow-hidden rounded-[2rem] shadow-2xl md:h-[550px]">
      <div 
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {featuredActivities.map((slide, index) => (
          <div key={slide.id} className="relative h-full min-w-full">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-8 md:p-16 text-white w-full">
              <Badge className="mb-4 bg-amber-500 text-white border-none text-md px-4 py-1">
                {slide.category}
              </Badge>
              <h3 className="mb-4 text-4xl font-bold md:text-6xl max-w-4xl leading-tight drop-shadow-lg">
                {slide.title}
              </h3>
              <p className="text-lg md:text-xl mb-6 text-white/90 max-w-2xl italic">
                {slide.description}
              </p>
              <div className="flex flex-wrap gap-6">
                <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                  <Calendar className="h-5 w-5 text-amber-400" /> {slide.date}
                </span>
                <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                  <MapPin className="h-5 w-5 text-amber-400" /> {slide.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 z-30 pointer-events-none">
        <Button onClick={prev} className="pointer-events-auto h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border-none text-white">
          <ChevronLeft />
        </Button>
        <Button onClick={next} className="pointer-events-auto h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border-none text-white">
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}