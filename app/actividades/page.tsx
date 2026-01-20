import { Calendar, MapPin, Clock, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const activities = [
  {
    id: 1,
    title: "Congreso Nacional de Estudiantes de Medicina",
    description: "Evento académico que reúne a estudiantes de medicina de todo el país para compartir investigaciones y experiencias.",
    date: "15-17 Marzo 2026",
    location: "Auditorio Principal UCSM",
    time: "8:00 AM - 6:00 PM",
    category: "Congreso",
    attendees: 500,
  },
  {
    id: 2,
    title: "Campaña de Salud Comunitaria",
    description: "Jornada de atención médica gratuita para comunidades vulnerables, incluyendo despistaje de enfermedades crónicas.",
    date: "22 Febrero 2026",
    location: "Centro Comunitario Yura",
    time: "7:00 AM - 2:00 PM",
    category: "Proyección Social",
    attendees: 200,
  },
  {
    id: 3,
    title: "Taller de Metodología de Investigación",
    description: "Capacitación práctica sobre diseño de estudios, análisis estadístico y redacción científica.",
    date: "8 Febrero 2026",
    location: "Aula Magna - Facultad de Medicina",
    time: "3:00 PM - 7:00 PM",
    category: "Taller",
    attendees: 80,
  },
  {
    id: 4,
    title: "Simulacro de Emergencias Médicas",
    description: "Práctica de atención de emergencias con escenarios simulados para fortalecer habilidades clínicas.",
    date: "1 Marzo 2026",
    location: "Hospital de Simulación UCSM",
    time: "9:00 AM - 1:00 PM",
    category: "Simulación",
    attendees: 40,
  },
  {
    id: 5,
    title: "Conferencia: Inteligencia Artificial en Medicina",
    description: "Charla magistral sobre las aplicaciones de la IA en diagnóstico y tratamiento médico.",
    date: "28 Febrero 2026",
    location: "Auditorio de Posgrado",
    time: "6:00 PM - 8:00 PM",
    category: "Conferencia",
    attendees: 150,
  },
  {
    id: 6,
    title: "Jornada de Donación de Sangre",
    description: "Campaña para promover la donación voluntaria de sangre en colaboración con el Banco de Sangre Regional.",
    date: "14 Febrero 2026",
    location: "Campus Central UCSM",
    time: "8:00 AM - 4:00 PM",
    category: "Proyección Social",
    attendees: 100,
  },
]

const categoryColors: Record<string, string> = {
  "Congreso": "bg-primary text-primary-foreground",
  "Proyección Social": "bg-secondary text-secondary-foreground",
  "Taller": "bg-accent text-accent-foreground",
  "Simulación": "bg-primary/80 text-primary-foreground",
  "Conferencia": "bg-muted text-muted-foreground",
}

export default function ActividadesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl">
            Actividades
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/90">
            Descubre nuestros próximos eventos, talleres y actividades académicas.
          </p>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <Card key={activity.id} className="flex flex-col border-2 border-border bg-card transition-all hover:border-primary hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <Badge className={categoryColors[activity.category] || "bg-muted text-muted-foreground"}>
                      {activity.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {activity.attendees}
                    </span>
                  </div>
                  <CardTitle className="text-xl text-card-foreground">{activity.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {activity.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    {activity.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    {activity.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    {activity.time}
                  </div>
                  <Button className="mt-4 w-full" asChild>
                    <Link href="#">Más información</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
