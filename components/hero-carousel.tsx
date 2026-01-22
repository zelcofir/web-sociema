"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, ArrowRight, Info, Calendar, Microscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const slides = [
  {
    id: 1,
    title: "SOCIEMA",
    subtitle: "Sociedad Científica de Estudiantes de Medicina Agustinos",
    description: "Investigación, academia y servicio a la comunidad.",
    bgColor: "#00529b",
    image: "/slide1.png",
    buttonText: "Conócenos",
    buttonLink: "/nosotros",
    icon: <Info className="mr-2 h-4 w-4" />
  },
  {
    id: 2,
    title: "Investigación",
    subtitle: "Producción científica desde el pregrado",
    description: "Fomentamos la investigación de calidad en nuestros estudiantes.",
    bgColor: "#004080",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070",
    buttonText: "Ver Publicaciones",
    buttonLink: "/publicaciones",
    icon: <Microscope className="mr-2 h-4 w-4" />
  },
  {
    id: 3,
    title: "Eventos y Noticias",
    subtitle: "Mantente al día con SOCIEMA",
    description: "Participa en nuestras jornadas, talleres y congresos científicos.",
    bgColor: "#003366",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070",
    buttonText: "Noticias y Eventos",
    buttonLink: "/noticias",
    icon: <Calendar className="mr-2 h-4 w-4" />
  },
  {id: 4,
    title: "Proyección Social",
    subtitle: "Salud y educación para todos",
    description: "Llevamos salud a las comunidades que más lo necesitan",
    bgColor: "#003366",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070",
    buttonText: "Actividades",
    buttonLink: "/noticias",
    icon: <Calendar className="mr-2 h-4 w-4" />
  },
  {
    id: 5,
    title: "Educación Médica",
    subtitle: "Capacitación continua",
    description: "Complementamos tu formación universitaria con actividades académicas",
    bgColor: "#002d5a",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070",
    buttonText: "Actividades",
    buttonLink: "/noticias",
    icon: <Calendar className="mr-2 h-4 w-4" />
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
    const timer = setInterval(nextSlide, 7000) // Un poco más de tiempo para leer
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="relative h-[550px] w-full overflow-hidden md:h-[650px]">
      {/* Slides Container */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="relative flex h-full min-w-full flex-col items-center justify-center px-4 text-center"
            style={{ backgroundColor: slide.bgColor }}
          >
            {/* Fondo con Imagen y Overlay */}
            {slide.image && (
              <>
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear"
                  style={{ 
                    backgroundImage: `url(${slide.image})`,
                    transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)' // Efecto de zoom suave
                  }}
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
              </>
            )}

            {/* Contenido Animado */}
            <div className={`relative z-20 flex flex-col items-center transition-all duration-1000 ${
              index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              <h1 className="mb-4 text-4xl font-bold text-white md:text-7xl drop-shadow-2xl">
                {slide.title}
              </h1>
              <p className="mb-4 text-xl text-white/90 md:text-2xl font-light tracking-wide italic">
                {slide.subtitle}
              </p>
              <p className="mb-8 max-w-2xl text-lg text-white/80 leading-relaxed">
                {slide.description}
              </p>
              
              {/* BOTÓN INTERACTIVO */}
              <Link href={slide.buttonLink}>
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-secondary hover:text-white transition-all duration-300 rounded-full px-8 py-6 text-lg font-bold shadow-xl group"
                >
                  {slide.icon}
                  {slide.buttonText}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 z-30 flex items-center justify-between px-6 pointer-events-none">
        <Button
          variant="ghost"
          size="icon"
          className="pointer-events-auto bg-white/10 text-white backdrop-blur-md hover:bg-white/20 h-14 w-14 rounded-full border border-white/20"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-10 w-10" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="pointer-events-auto bg-white/10 text-white backdrop-blur-md hover:bg-white/20 h-14 w-14 rounded-full border border-white/20"
          onClick={nextSlide}
        >
          <ChevronRight className="h-10 w-10" />
        </Button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentSlide ? "bg-white w-12" : "bg-white/30 w-3 hover:bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}