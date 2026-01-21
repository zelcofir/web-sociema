"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { createBrowserClient } from "@supabase/ssr"

interface TeamMember {
  id: number
  name: string
  role: string
  image_url: string | null
  facebook: string | null
  instagram: string | null
  linkedin: string | null
  email: string | null
}

export function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeamMembers() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("id", { ascending: true })

      if (error) {
        console.error("Error fetching team members:", error)
      } else {
        setTeamMembers(data || [])
      }
      setLoading(false)
    }

    fetchTeamMembers()
  }, [])

  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Gestion 2026
          </h2>
          <p className="text-lg text-muted-foreground">
            Consejo Ejecutivo
          </p>
        </div>

        {loading ? (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {[...Array(5)].map((_, i) => (
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
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden border-0 bg-card shadow-sm">
                <div className="aspect-square bg-primary/10 relative overflow-hidden">
                    {member.image_url ? (
                      <img 
                        src={member.image_url} 
                        alt={member.name} 
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                          {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                      </div>
                    )}
                  </div>
                <CardContent className="p-3 text-center">
                  <h3 className="mb-0.5 text-sm font-semibold text-card-foreground line-clamp-1">{member.name}</h3>
                  <p className="mb-2 text-xs text-muted-foreground line-clamp-1">{member.role}</p>
                  <div className="flex justify-center gap-1.5">
                    {member.facebook && (
                      <Link
                        href={member.facebook}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                        aria-label={`Facebook de ${member.name}`}
                      >
                        <Facebook className="h-3 w-3" />
                      </Link>
                    )}
                    {member.instagram && (
                      <Link
                        href={member.instagram}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                        aria-label={`Instagram de ${member.name}`}
                      >
                        <Instagram className="h-3 w-3" />
                      </Link>
                    )}
                    {member.linkedin && (
                      <Link
                        href={member.linkedin}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                        aria-label={`LinkedIn de ${member.name}`}
                      >
                        <Linkedin className="h-3 w-3" />
                      </Link>
                    )}
                    {member.email && (
                      <Link
                        href={`mailto:${member.email}`}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                        aria-label={`Email de ${member.name}`}
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
