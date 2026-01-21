"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Instagram, Mail } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"

interface CommitteeDirector {
  id: number
  name: string
  role: string
  committee: string
  slug: string
  image_url: string | null
  facebook: string | null
  instagram: string | null
  email: string | null
}

export function CommitteesPreview() {
  const [directors, setDirectors] = useState<CommitteeDirector[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDirectors() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data, error } = await supabase
        .from("committee_directors")
        .select("*")
        .order("id", { ascending: true })

      if (error) {
        console.error("Error fetching committee directors:", error)
      } else {
        setDirectors(data || [])
      }
      setLoading(false)
    }

    fetchDirectors()
  }, [])

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Directores de Comites Permanentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Conoce a los lideres de nuestros comites de trabajo
          </p>
        </div>

        {loading ? (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {[...Array(10)].map((_, i) => (
              <Card key={i} className="overflow-hidden border-0 bg-card shadow-sm animate-pulse">
                <div className="aspect-square bg-primary/10" />
                <CardContent className="p-3 text-center">
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-3 bg-muted rounded w-2/3 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {directors.map((director) => (
              <Card key={director.id} className="overflow-hidden border-0 bg-card shadow-sm transition-shadow hover:shadow-md">
                <Link href={`/comites/${director.slug}`}>
                   <div className="aspect-square bg-primary/10 relative overflow-hidden">
                       {director.image_url ? (
                        <img 
                          src={director.image_url} 
                          alt={director.name} 
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                            {director.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </div>
                        </div>
                      )}
                    </div>
                </Link>
                <CardContent className="p-3 text-center">
                  <Link href={`/comites/${director.slug}`} className="group">
                    <h3 className="mb-0.5 text-sm font-semibold text-card-foreground transition-colors group-hover:text-primary line-clamp-1">
                      {director.name}
                    </h3>
                  </Link>
                  <p className="mb-0.5 text-xs font-medium text-primary">{director.committee}</p>
                  <p className="mb-2 text-xs text-muted-foreground line-clamp-1">{director.role}</p>
                  <div className="flex justify-center gap-1.5">
                    {director.facebook && (
                      <Link
                        href={director.facebook}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                        aria-label={`Facebook de ${director.name}`}
                      >
                        <Facebook className="h-3 w-3" />
                      </Link>
                    )}
                    {director.instagram && (
                      <Link
                        href={director.instagram}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                        aria-label={`Instagram de ${director.name}`}
                      >
                        <Instagram className="h-3 w-3" />
                      </Link>
                    )}
                    {director.email && (
                      <Link
                        href={`mailto:${director.email}`}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                        aria-label={`Email de ${director.name}`}
                      >
                        <Mail className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
