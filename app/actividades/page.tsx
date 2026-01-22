"use client"

import { useState, useEffect, useCallback } from "react"
import { Calendar, MapPin, Clock, Users, ArrowRight, Star, ChevronLeft, ChevronRight, Camera } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ActivityCarousel } from "@/components/ActivityCarousel"
import { supabase } from "@/lib/supabase"

export default function ActividadesPage() {
  // --- ESTADOS PARA SUPABASE ---
  const [dbActivities, setDbActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // --- CARGA DE DATOS ---
  useEffect(() => {
    async function fetchActivities() {
      try {
        const { data, error } = await supabase
          .from("actividades")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) throw error
        setDbActivities(data || [])
      } catch (err) {
        console.error("Error cargando actividades:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchActivities()
  }, [])

  // --- MAPEO DE VARIABLES (ESTRICTAMENTE EN ESPAÑOL SEGÚN TU TABLA) ---
  const featuredActivities = dbActivities.filter((a) => a.es_destacado === true)
  const activities = dbActivities.filter((a) => a.es_destacado !== true)

  // --- CONFIGURACIÓN DE UI ---
  const galleryPhotos = [
    { url: "/activities/act1.png", caption: "Tú PreVIHenes" },
    { url: "/activities/act2.png", caption: " " },
    { url: "/activities/act4.png", caption: " " },
    { url: "/activities/act5.png", caption: " " },
    { url: "/activities/act6.png", caption: " " },
  ]

  const categoryColors: Record<string, string> = {
    "Evento Nacional": "bg-amber-500 text-white",
    "Evento Regional": "bg-blue-600 text-white",
    "Taller": "bg-emerald-600 text-white",
    "Congreso": "bg-primary text-white",
    "Jornada": "bg-secondary text-white",
  }

  const [currentPhoto, setCurrentPhoto] = useState(0);
  const nextPhoto = () => setCurrentPhoto((prev) => (prev + 1) % galleryPhotos.length);
  const prevPhoto = () => setCurrentPhoto((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
  
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    if (featuredActivities.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % featuredActivities.length)
    }
  }, [featuredActivities.length])

  const prevSlide = useCallback(() => {
    if (featuredActivities.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + featuredActivities.length) % featuredActivities.length)
    }
  }, [featuredActivities.length])

  useEffect(() => {
    if (featuredActivities.length > 0) {
      const timer = setInterval(nextSlide, 7000)
      return () => clearInterval(timer)
    }
  }, [nextSlide, featuredActivities.length])

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold">Cargando actividades de SOCIEMA...</div>

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Header */}
      <section className="bg-primary py-12 md:py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white md:text-5xl tracking-tight mb-4">
            Actividades
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            Impulsando la investigación médica desde la Universidad Nacional de San Agustín.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {/* SECCIÓN DESTACADOS */}
        {featuredActivities.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Star className="text-amber-500 fill-amber-500" />
              <h2 className="text-3xl font-bold">Eventos Principales</h2>
            </div>
            
            <div className="relative h-[450px] w-full overflow-hidden rounded-[2rem] shadow-2xl md:h-[550px]">
              <div 
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredActivities.map((slide) => (
                  <div key={slide.id} className="relative h-full min-w-full">
                    {/* USANDO imagen_url EN ESPAÑOL */}
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.imagen_url})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 p-8 md:p-16 text-white w-full">
                      <Badge className={`${categoryColors[slide.categoria] || "bg-primary"} mb-4 text-md px-4 py-1`}>
                        {slide.categoria}
                      </Badge>
                      <h3 className="mb-4 text-4xl font-bold md:text-6xl max-w-4xl leading-tight drop-shadow-lg">
                        {slide.titulo}
                      </h3>
                      <p className="text-lg md:text-xl mb-6 text-white/90 max-w-2xl italic">
                        {slide.descripcion}
                      </p>
                      <div className="flex flex-wrap gap-6 text-base md:text-lg">
                        <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                          <Calendar className="h-5 w-5 text-amber-400" /> {slide.fecha}
                        </span>
                        <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                          <MapPin className="h-5 w-5 text-amber-400" /> {slide.lugar}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 z-30 pointer-events-none">
                <Button onClick={prevSlide} className="pointer-events-auto h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border-none text-white">
                  <ChevronLeft />
                </Button>
                <Button onClick={nextSlide} className="pointer-events-auto h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border-none text-white">
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* CALENDARIO GENERAL (GRID) */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
             <Calendar className="text-primary" /> Próximas Fechas
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <Card key={activity.id} className="border-2 transition-all hover:border-primary group">
                <CardHeader>
                  <div className="mb-3 flex items-center justify-between">
                    <Badge className={categoryColors[activity.categoria] || "bg-primary"}>{activity.categoria}</Badge>
                    <span className="flex items-center gap-1 text-sm font-bold text-primary">
                      <Users className="h-4 w-4" /> {activity.asistentes}
                    </span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors italic">
                    {activity.titulo}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{activity.descripcion}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 bg-muted/20 pt-4">
                  <div className="flex items-center gap-3 text-sm font-semibold"><Calendar className="h-4 w-4 text-primary" /> {activity.fecha}</div>
                  <div className="flex items-center gap-3 text-sm"><MapPin className="h-4 w-4 text-primary" /> {activity.lugar}</div>
                  <div className="flex items-center gap-3 text-sm"><Clock className="h-4 w-4 text-primary" /> {activity.hora}</div>
                  <Button className="mt-4 w-full" asChild>
                    <Link href="#">Inscribirse <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* GALERÍA DE COMUNIDAD */}
        <div className="mt-24 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl border-4 border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 text-center md:text-left">
            <div>
              <h2 className="text-3xl font-bold text-white flex items-center gap-3 justify-center md:justify-start">
                <Camera className="text-primary" /> Momentos SOCIEMA
              </h2>
              <p className="text-slate-400 mt-2 italic">Nuestra historia en imágenes</p>
            </div>
            <div className="flex gap-4">
              <Button onClick={prevPhoto} variant="outline" size="icon" className="rounded-full border-primary/50 text-white hover:bg-primary/20 h-12 w-12">
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button onClick={nextPhoto} variant="outline" size="icon" className="rounded-full border-primary/50 text-white hover:bg-primary/20 h-12 w-12">
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <div className="relative group">
            <div className="overflow-hidden rounded-2xl aspect-video md:h-[500px] w-full bg-black">
              <img 
                src={galleryPhotos[currentPhoto].url} 
                alt="Galería SOCIEMA"
                className="w-full h-full object-cover transition-all duration-700 ease-in-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-center md:text-left">
                <p className="text-lg md:text-xl font-medium italic opacity-90">
                  {galleryPhotos[currentPhoto].caption}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-2 mt-6">
            {galleryPhotos.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentPhoto(i)}
                className={`h-2 transition-all rounded-full ${currentPhoto === i ? "bg-primary w-10" : "bg-slate-700 w-2 hover:bg-slate-600"}`} 
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}