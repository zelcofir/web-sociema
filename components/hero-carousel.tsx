"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    title: "SOCIEMA",
    subtitle: "Sociedad Científica de Estudiantes de Medicina Agustinos",
    description: "Investigación, academia y servicio a la comunidad",
    bgClass: "bg-primary",
  },
  {
    id: 2,
    title: "Investigación",
    subtitle: "Producción científica desde el pregrado",
    description: "Fomentamos la investigación de calidad en nuestros estudiantes",
    bgClass: "bg-primary/90",
  },
  {
    id: 3,
    title: "Proyección Social",
    subtitle: "Salud y educación para todos",
    description: "Llevamos salud a las comunidades que más lo necesitan",
    bgClass: "bg-primary/80",
  },
  {
    id: 4,
    title: "Educación Médica",
    subtitle: "Capacitación continua",
    description: "Complementamos tu formación universitaria con actividades académicas",
    bgClass: "bg-primary/85",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="relative h-[500px] w-full overflow-hidden md:h-[600px]">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`flex h-full min-w-full flex-col items-center justify-center px-4 text-center ${slide.bgClass}`}
          >
            <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-6xl">
              {slide.title}
            </h1>
            <p className="mb-2 text-xl text-primary-foreground/90 md:text-2xl">
              {slide.subtitle}
            </p>
            <p className="max-w-2xl text-lg text-primary-foreground/80">
              {slide.description}
            </p>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/20 text-primary-foreground hover:bg-background/40 hover:text-primary-foreground"
        onClick={prevSlide}
        aria-label="Anterior"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/20 text-primary-foreground hover:bg-background/40 hover:text-primary-foreground"
        onClick={nextSlide}
        aria-label="Siguiente"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-secondary w-8"
                : "bg-primary-foreground/50 hover:bg-primary-foreground/70"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
