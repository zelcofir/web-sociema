import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, Users, ArrowLeft, Calendar, MapPin, Facebook, Instagram, Mail } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase" // Importamos supabase

const allCommittees = {
  // IFMSA Committees
  scora: {
    name: "SCORA",
    fullName: "Standing Committee on Reproductive Health including AIDS",
    color: "bg-red-600", // Color distintivo
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070", // Imagen de ejemplo
    organization: "IFMSA",
    description: "SCORA es el comité enfocado en la salud sexual y reproductiva, incluyendo la prevención del VIH/SIDA y otras infecciones de transmisión sexual. Trabajamos para educar y sensibilizar a la comunidad estudiantil y general sobre estos temas cruciales para la salud pública.",
    objectives: "Promover la salud sexual y reproductiva, incluyendo la prevención del VIH/SIDA y otras ITS, mediante educación y sensibilización.",
    activities: [
      "Campañas de educación sexual",
      "Talleres sobre prevención de ITS",
      "Charlas sobre derechos reproductivos",
      "Actividades por el Día Mundial del SIDA",
    ],
    upcomingEvents: [
      { title: "Taller de Educación Sexual Integral", date: "15 Feb 2026", location: "Auditorio Principal" },
      { title: "Campaña Día del Condón", date: "13 Feb 2026", location: "Campus Universitario" },
    ],
    director: {
      name: "Laura Martínez",
      role: "Directora Local SCORA",
      socials: { facebook: "#", instagram: "#", email: "scora@sociema.org" },
    },
  },
  scorp: {
    name: "SCORP",
    fullName: "Standing Committee on Human Rights and Peace",
    color: "bg-green-600", // Color distintivo
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070", // Imagen de ejemplo
    organization: "IFMSA",
    description: "SCORP trabaja para promover la paz, los derechos humanos y la asistencia humanitaria. Buscamos sensibilizar a los estudiantes de medicina sobre su rol social y su responsabilidad con las poblaciones más vulnerables.",
    objectives: "Promover la paz, los derechos humanos y la asistencia humanitaria, sensibilizando a los estudiantes de medicina sobre su rol social.",
    activities: [
      "Campañas de derechos humanos",
      "Apoyo a poblaciones vulnerables",
      "Jornadas de reflexión sobre migración",
      "Actividades por el Día de los Derechos Humanos",
    ],
    upcomingEvents: [
      { title: "Foro de Derechos Humanos en Salud", date: "10 Mar 2026", location: "Sala de Conferencias" },
      { title: "Visita a Albergue de Migrantes", date: "22 Feb 2026", location: "Albergue San Juan" },
    ],
    director: {
      name: "Miguel Ángel Ruiz",
      role: "Director Local SCORP",
      socials: { facebook: "#", instagram: "#", email: "scorp@sociema.org" },
    },
  },
  scoph: {
    name: "SCOPH",
    fullName: "Standing Committee on Public Health",
    color: "bg-orange-600", // Color distintivo
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070", // Imagen de ejemplo
    organization: "IFMSA",
    description: "SCOPH se dedica a mejorar la salud pública mediante campañas de prevención, promoción de estilos de vida saludables y concientización sobre enfermedades prevalentes en nuestra comunidad.",
    objectives: "Mejorar la salud pública mediante campañas de prevención, promoción de estilos de vida saludables y concientización.",
    activities: [
      "Campañas de vacunación",
      "Ferias de salud comunitaria",
      "Educación sobre enfermedades crónicas",
      "Promoción de hábitos saludables",
    ],
    upcomingEvents: [
      { title: "Feria de Salud Comunitaria", date: "5 Mar 2026", location: "Plaza Central" },
      { title: "Campaña de Vacunación", date: "20 Feb 2026", location: "Centro de Salud" },
    ],
    director: {
      name: "Carla Fernández",
      role: "Directora Local SCOPH",
      socials: { facebook: "#", instagram: "#", email: "scoph@sociema.org" },
    },
  },
  scope: {
    name: "SCOPE",
    fullName: "Standing Committee on Professional Exchange",
    color: "bg-blue-600", // Color distintivo
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070", // Imagen de ejemplo
    organization: "IFMSA",
    description: "SCOPE facilita intercambios profesionales clínicos internacionales, permitiendo a los estudiantes enriquecer su formación médica a través de experiencias en diferentes sistemas de salud alrededor del mundo.",
    objectives: "Facilitar intercambios profesionales clínicos internacionales para enriquecer la formación médica de los estudiantes.",
    activities: [
      "Coordinación de intercambios clínicos",
      "Charlas de experiencias internacionales",
      "Talleres de preparación para intercambios",
      "Networking con estudiantes extranjeros",
    ],
    upcomingEvents: [
      { title: "Feria de Intercambios", date: "25 Feb 2026", location: "Auditorio Principal" },
      { title: "Charla: Mi Experiencia en Alemania", date: "10 Feb 2026", location: "Aula Magna" },
    ],
    director: {
      name: "Diego Vargas",
      role: "Director Local SCOPE",
      socials: { facebook: "#", instagram: "#", email: "scope@sociema.org" },
    },
  },
  score: {
    name: "SCORE",
    fullName: "Standing Committee on Research Exchange",
    color: "bg-blue-600", // Color distintivo
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070", // Imagen de ejemplo
    organization: "IFMSA",
    description: "SCORE promueve intercambios de investigación para desarrollar habilidades científicas y fomentar la colaboración internacional en proyectos de investigación médica.",
    objectives: "Promover intercambios de investigación para desarrollar habilidades científicas y colaboración internacional.",
    activities: [
      "Coordinación de intercambios de investigación",
      "Talleres de metodología científica",
      "Presentación de proyectos internacionales",
      "Colaboración con centros de investigación",
    ],
    upcomingEvents: [
      { title: "Taller de Metodología de Investigación", date: "8 Mar 2026", location: "Laboratorio Central" },
      { title: "Presentación de Proyectos Internacionales", date: "15 Feb 2026", location: "Sala de Conferencias" },
    ],
    director: {
      name: "Andrea Castillo",
      role: "Directora Local SCORE",
      socials: { facebook: "#", instagram: "#", email: "score@sociema.org" },
    },
  },
  scome: {
    name: "SCOME",
    fullName: "Standing Committee on Medical Education",
    color: "bg-black-600", // Color distintivo
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070", // Imagen de ejemplo
    organization: "IFMSA",
    description: "SCOME trabaja para mejorar la educación médica mediante innovación pedagógica, capacitación docente y desarrollo curricular, buscando formar mejores profesionales de la salud.",
    objectives: "Mejorar la educación médica mediante innovación pedagógica, capacitación docente y desarrollo curricular.",
    activities: [
      "Talleres de habilidades clínicas",
      "Capacitación en simulación médica",
      "Foros sobre educación médica",
      "Evaluación de programas académicos",
    ],
    upcomingEvents: [
      { title: "Taller de Simulación Clínica", date: "12 Mar 2026", location: "Centro de Simulación" },
      { title: "Foro: Futuro de la Educación Médica", date: "28 Feb 2026", location: "Auditorio Principal" },
    ],
    director: {
      name: "Fernando Reyes",
      role: "Director Local SCOME",
      socials: { facebook: "#", instagram: "#", email: "scome@sociema.org" },
    },
  },
  // SOCIMEP Committees
  cpa: {
    name: "CPA",
    fullName: "Comité Permanente Académico",
    color: "bg-blue-600", // Color distintivo
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070", // Imagen de ejemplo
    organization: "SOCIMEP",
    description: "El CPA es responsable de planificar, organizar y ejecutar todas las actividades académicas, científicas y sociales de la sociedad, asegurando su calidad y relevancia.",
    objectives: "Planificar, organizar y ejecutar actividades académicas, científicas y sociales de la sociedad.",
    activities: [
      "Organización de congresos",
      "Coordinación de eventos académicos",
      "Gestión de talleres y cursos",
      "Planificación de actividades sociales",
    ],
    upcomingEvents: [
      { title: "Congreso Científico Anual", date: "20 Abr 2026", location: "Centro de Convenciones" },
      { title: "Taller de Liderazgo", date: "5 Mar 2026", location: "Auditorio Principal" },
    ],
    director: {
      name: "Valentina Herrera",
      role: "Directora CPA",
      socials: { facebook: "#", instagram: "#", email: "cpa@sociema.org" },
    },
  },
  cpc: {
    name: "CPC",
    fullName: "Comité Permanente Científico",
    color: "bg-blue-600", // Color distintivo
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070", // Imagen de ejemplo
    organization: "SOCIMEP",
    description: "El CPC se encarga de brindar capacitación continua a los miembros en temas de investigación, liderazgo y habilidades blandas necesarias para su desarrollo profesional.",
    objectives: "Brindar capacitación continua a los miembros en temas de investigación, liderazgo y habilidades blandas.",
    activities: [
      "Cursos de metodología de investigación",
      "Talleres de liderazgo",
      "Capacitación en redacción científica",
      "Seminarios de desarrollo profesional",
    ],
    upcomingEvents: [
      { title: "Curso de Redacción Científica", date: "18 Feb 2026", location: "Aula Virtual" },
      { title: "Seminario de Liderazgo", date: "25 Feb 2026", location: "Sala de Conferencias" },
    ],
    director: {
      name: "Sebastián Morales",
      role: "Director CPC",
      socials: { facebook: "#", instagram: "#", email: "cpc@sociema.org" },
    },
  },
  cppc: {
    name: "CPPC",
    fullName: "Comité Permanente de Publicaciones Científicas",
    color: "bg-blue-600", // Color distintivo
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070", // Imagen de ejemplo
    organization: "SOCIMEP",
    description: "El CPPC desarrolla actividades de proyección social que impactan positivamente en la comunidad, acercando los servicios de salud a las poblaciones más necesitadas.",
    objectives: "Desarrollar actividades de proyección social que impacten positivamente en la comunidad.",
    activities: [
      "Campañas de salud comunitaria",
      "Educación sanitaria en colegios",
      "Atención médica en zonas rurales",
      "Jornadas de despistaje",
    ],
    upcomingEvents: [
      { title: "Campaña de Salud en Zona Rural", date: "8 Mar 2026", location: "Comunidad San Pedro" },
      { title: "Charla de Salud en Colegio", date: "22 Feb 2026", location: "I.E. San Martín" },
    ],
    director: {
      name: "Camila Rojas",
      role: "Directora CPPC",
      socials: { facebook: "#", instagram: "#", email: "cppc@sociema.org" },
    },
  },
  cpdii: {
    name: "CPDII",
    fullName: "Comité Permanente de Difusión e Imagen Institucional",
    color: "bg-blue-600", // Color distintivo
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070", // Imagen de ejemplo
    organization: "SOCIMEP",
    description: "El CPDII gestiona la comunicación y la imagen institucional de la sociedad científica, manejando las redes sociales y el diseño de material promocional.",
    objectives: "Gestionar la comunicación y la imagen institucional de la sociedad científica.",
    activities: [
      "Manejo de redes sociales",
      "Diseño de material promocional",
      "Cobertura de eventos",
      "Relaciones públicas",
    ],
    upcomingEvents: [
      { title: "Taller de Diseño Gráfico", date: "15 Feb 2026", location: "Laboratorio de Cómputo" },
      { title: "Sesión de Fotografía Institucional", date: "10 Feb 2026", location: "Campus" },
    ],
    director: {
      name: "Daniela Guzmán",
      role: "Directora CPDII",
      socials: { facebook: "#", instagram: "#", email: "cpdii@sociema.org" },
    },
  },
  cprii: {
    name: "CPRII",
    fullName: "Comité Permanente de Relaciones Interinstitucionales e Intercambios",
    color: "bg-blue-600", // Color distintivo
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070", // Imagen de ejemplo
    organization: "SOCIMEP",
    description: "El CPRII establece y mantiene relaciones con otras instituciones nacionales e internacionales, gestionando convenios y representación institucional.",
    objectives: "Establecer y mantener relaciones con otras instituciones nacionales e internacionales.",
    activities: [
      "Convenios interinstitucionales",
      "Gestión de intercambios",
      "Participación en redes científicas",
      "Representación institucional",
    ],
    upcomingEvents: [
      { title: "Firma de Convenio con SOCIMEP", date: "20 Mar 2026", location: "Rectorado" },
      { title: "Reunión con Sociedad Hermana", date: "5 Mar 2026", location: "Virtual" },
    ],
    director: {
      name: "Alejandro Vega",
      role: "Director CPRII",
      socials: { facebook: "#", instagram: "#", email: "cprii@sociema.org" },
    },
  },
  cpais: {
    name: "CPAIS",
    fullName: "Comité Permanente de Atención Integral en Salud",
    color: "bg-yellow-600", // Color distintivo
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070", // Imagen de ejemplo
    organization: "SOCIMEP",
    description: "El CPAIS promueve y asesora proyectos de investigación en salud entre los miembros de la sociedad, brindando soporte metodológico y estadístico.",
    objectives: "Promover y asesorar proyectos de investigación en salud entre los miembros de la sociedad.",
    activities: [
      "Asesoría de proyectos de investigación",
      "Revisión de protocolos",
      "Talleres de análisis estadístico",
      "Publicación de artículos científicos",
    ],
    upcomingEvents: [
      { title: "Taller de SPSS", date: "12 Feb 2026", location: "Laboratorio de Cómputo" },
      { title: "Asesoría Grupal de Proyectos", date: "18 Feb 2026", location: "Sala de Reuniones" },
    ],
    director: {
      name: "Isabella Mendoza",
      role: "Directora CPAIS",
      socials: { facebook: "#", instagram: "#", email: "cpais@sociema.org" },
    },
  },
}

export async function generateStaticParams() {
  return Object.keys(allCommittees).map((slug) => ({ slug }))
}

export default async function CommitteePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const committee = allCommittees[slug as keyof typeof allCommittees]

  if (!committee) notFound()

    // BUSCAMOS LOS DIRECTORES EN SUPABASE USANDO EL SLUG
    const { data: directors } = await supabase
      .from("committee_directors")
      .select("*")
      .eq("slug", slug)

  return (
    <>
      {/* Hero Section */}
      
<section className={`relative overflow-hidden py-20 md:py-32 ${committee.color || 'bg-primary'}`}>
        {/* Imagen de fondo con opacidad para que el texto sea legible */}
        {committee.coverImage && (
          <div 
            className="absolute inset-0 z-0 opacity-30 bg-cover bg-center" 
            style={{ backgroundImage: `url(${committee.coverImage})` }}
          />
        )}
        
        <div className="container relative z-10 mx-auto px-4">
          <Link href="/comites" className="mb-6 inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Volver a Comités
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-secondary text-secondary-foreground">{committee.organization}</Badge>
            <Badge variant="outline" className="border-white/30 text-white">{committee.name}</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-white md:text-5xl lg:text-6xl max-w-4xl leading-tight">
            {committee.fullName}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90 leading-relaxed">
            {committee.description}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-8 lg:col-span-2">
              {/* Objectives */}
              <Card className="border-2 border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-card-foreground">
                    <Target className="h-5 w-5 text-primary" />
                    Objetivos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{committee.objectives}</p>
                </CardContent>
              </Card>

              {/* Activities */}
              <Card className="border-2 border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-card-foreground">
                    <Users className="h-5 w-5 text-secondary" />
                    Actividades Principales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {committee.activities.map((activity, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card className="border-2 border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-card-foreground">
                    <Calendar className="h-5 w-5 text-primary" />
                    Próximos Eventos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {committee.upcomingEvents.map((event, index) => (
                      <div key={index} className="flex flex-col gap-2 rounded-lg bg-muted p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h4 className="font-medium text-foreground">{event.title}</h4>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {event.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="mt-2 sm:mt-0 bg-transparent">
                          Ver más
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

           {/* Columna Derecha: DIRECTORES DINÁMICOS */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="font-bold text-xl text-primary">Equipo Directivo</h3>
            {directors && directors.length > 0 ? (
              directors.map((dir) => (
                <Card key={dir.id}>
                  <CardContent className="pt-6 text-center">
                    <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 overflow-hidden">
                      {dir.image_url ? (
                        <img src={dir.image_url} alt={dir.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="h-full flex items-center justify-center text-white font-bold text-xl">
                          {dir.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h4 className="font-bold">{dir.name}</h4>
                    <p className="text-sm text-muted-foreground">{dir.role}</p>
                    <div className="flex justify-center gap-2 mt-3">
                      {dir.email && <Link href={`mailto:${dir.email}`}><Mail className="h-4 w-4 text-muted-foreground hover:text-primary"/></Link>}
                      {dir.instagram && <Link href={dir.instagram}><Instagram className="h-4 w-4 text-muted-foreground hover:text-primary"/></Link>}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground italic">Puesto en convocatoria</p>
            )}
          </div>
        </div>
       </div>
      </section>
    </>
  )
}
