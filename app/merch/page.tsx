"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, ShoppingCart, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const featuredProducts = [
  {
    id: 1,
    name: "Polo SOCIEMA Oficial",
    description: "Polo deportivo con logo bordado de SOCIEMA",
    price: 45.00,
    image: "/polo",
    link: "#",
  },
  {
    id: 2,
    name: "Mandil Blanco SOCIEMA",
    description: "Mandil médico de alta calidad con logo",
    price: 65.00,
    image: "/mandil",
    link: "#",
  },
  {
    id: 3,
    name: "Taza SOCIEMA",
    description: "Taza de cerámica con diseño exclusivo",
    price: 25.00,
    image: "/taza",
    link: "#",
  },
]

const allProducts = [
  {
    id: 1,
    name: "Polo SOCIEMA Oficial",
    description: "Polo deportivo con logo bordado de SOCIEMA. Disponible en tallas S, M, L, XL.",
    price: 45.00,
    link: "#",
    category: "Ropa",
  },
  {
    id: 2,
    name: "Mandil Blanco SOCIEMA",
    description: "Mandil médico de alta calidad con logo institucional bordado. Tela antifluidos.",
    price: 65.00,
    link: "#",
    category: "Uniforme",
  },
  {
    id: 3,
    name: "Taza SOCIEMA",
    description: "Taza de cerámica con diseño exclusivo de SOCIEMA. Capacidad 350ml.",
    price: 25.00,
    link: "#",
    category: "Accesorios",
  },
  {
    id: 4,
    name: "Gorro Quirúrgico",
    description: "Gorro quirúrgico con estampado de SOCIEMA. Material algodón 100%.",
    price: 20.00,
    link: "#",
    category: "Uniforme",
  },
  {
    id: 5,
    name: "Libreta de Notas",
    description: "Libreta profesional con pasta dura y logo de SOCIEMA. 100 hojas.",
    price: 18.00,
    link: "#",
    category: "Papelería",
  },
  {
    id: 6,
    name: "Lapicero SOCIEMA",
    description: "Set de 3 lapiceros metálicos con logo grabado. Tinta azul.",
    price: 15.00,
    link: "#",
    category: "Papelería",
  },
  {
    id: 7,
    name: "Llavero SOCIEMA",
    description: "Llavero metálico con logo 3D de SOCIEMA. Acabado premium.",
    price: 12.00,
    link: "#",
    category: "Accesorios",
  },
  {
    id: 8,
    name: "Stickers SOCIEMA",
    description: "Pack de 10 stickers con diseños variados de SOCIEMA. Vinilo resistente.",
    price: 8.00,
    link: "#",
    category: "Accesorios",
  },
]

export default function MerchPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl">
            Tienda SOCIEMA
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/90">
            Adquiere productos oficiales de SOCIEMA y lleva tu orgullo científico a todas partes.
          </p>
        </div>
      </section>

      {/* Featured Carousel */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
            Productos Destacados
          </h2>
          
          <div className="relative mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="min-w-full px-4"
                  >
                    <Card className="mx-auto max-w-md border-2 border-primary/20 bg-card">
                      <div className="flex aspect-video items-center justify-center bg-primary/10">
                        <ShoppingCart className="h-20 w-20 text-primary/40" />
                      </div>
                      <CardHeader className="text-center">
                        <CardTitle className="text-2xl text-card-foreground">{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="mb-4 text-3xl font-bold text-primary">
                          S/ {product.price.toFixed(2)}
                        </p>
                        <Button asChild className="w-full">
                          <Link href={product.link}>
                            Adquirir ahora
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-background"
              onClick={prevSlide}
              aria-label="Anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-background"
              onClick={nextSlide}
              aria-label="Siguiente"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Indicators */}
            <div className="mt-6 flex justify-center gap-2">
              {featuredProducts.map((_, index) => (
                <button
                  key={index}
                  className={`h-3 w-3 rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Ir a producto ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Products Grid */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
            Todos los Productos
          </h2>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {allProducts.map((product) => (
              <Card key={product.id} className="flex flex-col border border-border bg-card transition-all hover:border-primary hover:shadow-lg">
                <div className="flex aspect-square items-center justify-center bg-primary/5">
                  <ShoppingCart className="h-16 w-16 text-primary/30" />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                      {product.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-card-foreground">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="mt-auto space-y-4">
                  <CardDescription className="line-clamp-2 text-sm">
                    {product.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">
                      S/ {product.price.toFixed(2)}
                    </span>
                    <Button size="sm" asChild>
                      <Link href={product.link}>
                        Adquirir
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
