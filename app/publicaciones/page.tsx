"use client"

import { useState, useEffect } from "react"
import { Search, ExternalLink, Calendar, User, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { createBrowserClient } from "@supabase/ssr"

interface Publication {
  id: number
  title: string
  type: string
  authors: string
  year: string
  link: string
  image_url: string | null
}

const articleTypes = ["Todos", "Articulo Original", "Revision Sistematica", "Caso Clinico", "Carta al Editor"]
const years = ["Todos", "2026", "2025", "2024", "2023"]

export default function PublicacionesPage() {
  const [publications, setPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTitle, setSearchTitle] = useState("")
  const [selectedType, setSelectedType] = useState("Todos")
  const [searchAuthor, setSearchAuthor] = useState("")
  const [selectedYear, setSelectedYear] = useState("Todos")

  useEffect(() => {
    async function fetchPublications() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .order("year", { ascending: false })

      if (error) {
        console.error("Error fetching publications:", error)
      } else {
        setPublications(data || [])
      }
      setLoading(false)
    }

    fetchPublications()
  }, [])

  // --- LÓGICA DE CONTEO POR CATEGORÍAS ---
  const counts = publications.reduce((acc: Record<string, number>, pub) => {
    acc[pub.type] = (acc[pub.type] || 0) + 1
    return acc
  }, {})

  const filteredPublications = publications.filter((pub) => {
    const matchesTitle = pub.title.toLowerCase().includes(searchTitle.toLowerCase())
    const matchesType = selectedType === "Todos" || pub.type === selectedType
    const matchesAuthor = pub.authors.toLowerCase().includes(searchAuthor.toLowerCase())
    const matchesYear = selectedYear === "Todos" || pub.year === selectedYear
    return matchesTitle && matchesType && matchesAuthor && matchesYear
  })

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl">
            Publicaciones
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/90 mb-8">
            Explora nuestra producción científica y contribuciones a la investigación médica.
          </p>

          {/* CONTADORES CON CAJITA Y TEXTO BLANCO */}
          {!loading && (
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {Object.entries(counts).map(([type, count]) => (
                <div 
                  key={type} 
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-4 flex flex-col items-center min-w-[140px]"
                >
                  <span className="text-3xl font-bold text-white block">
                    {count}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white mt-1">
                    {type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Search Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Card className="border-2 border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Search className="h-5 w-5" />
                Buscar Publicaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Titulo del articulo</label>
                  <Input
                    placeholder="Buscar por titulo..."
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Tipo de articulo</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {articleTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Autores</label>
                  <Input
                    placeholder="Buscar por autor..."
                    value={searchAuthor}
                    onChange={(e) => setSearchAuthor(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Ano de publicacion</label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar ano" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-10 font-bold">Cargando publicaciones...</div>
          ) : (
            <>
              <p className="mb-6 text-muted-foreground italic">
                {filteredPublications.length} publicación(es) encontrada(s)
              </p>
              <div className="space-y-4">
                {filteredPublications.map((pub) => (
                  <Card key={pub.id} className="overflow-hidden border border-border bg-card transition-colors hover:border-primary">
                    <CardContent className="p-0">
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="relative h-48 w-full shrink-0 bg-muted sm:h-auto sm:w-40 md:w-48">
                          <Image
                            src={pub.image_url || "/publication_default.jpg"}
                            alt={pub.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between gap-4 p-4 sm:py-4 sm:pr-4">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="secondary">
                                <FileText className="mr-1 h-3 w-3" />
                                {pub.type}
                              </Badge>
                              <Badge variant="outline">
                                <Calendar className="mr-1 h-3 w-3" />
                                {pub.year}
                              </Badge>
                            </div>
                            <h3 className="text-lg font-semibold">{pub.title}</h3>
                            <p className="flex items-center gap-1 text-sm text-muted-foreground">
                              <User className="h-4 w-4" />
                              {pub.authors}
                            </p>
                          </div>
                          <Button variant="outline" size="sm" asChild className="w-fit">
                            <Link href={pub.link} target="_blank">
                              Ver articulo
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}