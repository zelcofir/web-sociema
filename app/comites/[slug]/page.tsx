import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, Users, ArrowLeft, Calendar, MapPin, Instagram, Mail } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"

const allCommittees = {
  // IFMSA Committees
  scora: {
    name: "SCORA",
    fullName: "Standing Committee on Reproductive Health including AIDS",
    color: "bg-red-600",
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070",
    organization: "IFMSA",
    description: "SCORA es el comité enfocado en la salud sexual y reproductiva, incluyendo la prevención del VIH/SIDA e ITS.",
    objectives: "Promover la salud sexual y reproductiva mediante educación y sensibilización.",
    activities: ["Campañas de educación sexual", "Talleres sobre prevención de ITS", "Charlas sobre derechos reproductivos"],
    upcomingEvents: [{ title: "Taller de ESI", date: "15 Feb 2026", location: "Auditorio Principal" }],
    instagramWidgetId: "AQUÍ_ID_SCORA", 
  },
  scorp: {
    name: "SCORP",
    fullName: "Standing Committee on Human Rights and Peace",
    color: "bg-green-600",
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070",
    organization: "IFMSA",
    description: "SCORP trabaja para promover la paz, los derechos humanos y la asistencia humanitaria.",
    objectives: "Promover la paz y los derechos humanos, sensibilizando sobre el rol social del médico.",
    activities: ["Campañas de DDHH", "Apoyo a poblaciones vulnerables"],
    upcomingEvents: [{ title: "Foro de DDHH", date: "10 Mar 2026", location: "Sala Conferencias" }],
    instagramWidgetId: "AQUÍ_ID_SCORP",
  },
  scoph: {
    name: "SCOPH",
    fullName: "Standing Committee on Public Health",
    color: "bg-orange-600",
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070",
    organization: "IFMSA",
    description: "SCOPH se dedica a mejorar la salud pública mediante campañas de prevención y promoción de salud.",
    objectives: "Mejorar la salud pública mediante prevención y estilos de vida saludables.",
    activities: ["Campañas de vacunación", "Ferias de salud comunitaria"],
    upcomingEvents: [{ title: "Feria de Salud", date: "5 Mar 2026", location: "Plaza Central" }],
    instagramWidgetId: "AQUÍ_ID_SCOPH",
  },
  scope: {
    name: "SCOPE",
    fullName: "Standing Committee on Professional Exchange",
    color: "bg-blue-600",
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070",
    organization: "IFMSA",
    description: "SCOPE facilita intercambios profesionales clínicos internacionales.",
    objectives: "Facilitar intercambios profesionales para enriquecer la formación médica.",
    activities: ["Coordinación de intercambios", "Networking"],
    upcomingEvents: [{ title: "Feria de Intercambios", date: "25 Feb 2026", location: "Auditorio" }],
    instagramWidgetId: "AQUÍ_ID_SCOPE",
  },
  score: {
    name: "SCORE",
    fullName: "Standing Committee on Research Exchange",
    color: "bg-blue-600",
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070",
    organization: "IFMSA",
    description: "SCORE promueve intercambios de investigación para desarrollar habilidades científicas.",
    objectives: "Promover intercambios de investigación y colaboración internacional.",
    activities: ["Coordinación de intercambios", "Talleres científicos"],
    upcomingEvents: [{ title: "Taller Metodología", date: "8 Mar 2026", location: "Laboratorio" }],
    instagramWidgetId: "AQUÍ_ID_SCORE",
  },
  scome: {
    name: "SCOME",
    fullName: "Standing Committee on Medical Education",
    color: "bg-zinc-900",
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070",
    organization: "IFMSA",
    description: "SCOME trabaja para mejorar la educación médica mediante innovación pedagógica.",
    objectives: "Mejorar la educación médica mediante innovación y capacitación.",
    activities: ["Habilidades clínicas", "Simulación médica"],
    upcomingEvents: [{ title: "Taller Simulación", date: "12 Mar 2026", location: "Centro Simulación" }],
    instagramWidgetId: "520ddec5-2347-4657-9da0-c7fd0b70ae78", // TU ID REAL
  },
  // SOCIMEP Committees
  cpa: {
    name: "CPA",
    fullName: "Comité Permanente Académico",
    color: "bg-blue-800",
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070",
    organization: "SOCIMEP",
    description: "Planifica y ejecuta actividades académicas y científicas de la sociedad.",
    objectives: "Organizar actividades académicas asegurando calidad y relevancia.",
    activities: ["Congresos", "Cursos especializados"],
    upcomingEvents: [{ title: "Congreso Anual", date: "20 Abr 2026", location: "Centro Convenciones" }],
    instagramWidgetId: "AQUÍ_ID_CPA",
  },
  cpc: {
    name: "CPC",
    fullName: "Comité Permanente Científico",
    color: "bg-sky-600",
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070",
    organization: "SOCIMEP",
    description: "Brinda capacitación continua en investigación y liderazgo.",
    objectives: "Capacitación continua en investigación y habilidades blandas.",
    activities: ["Metodología", "Redacción científica"],
    upcomingEvents: [{ title: "Curso Redacción", date: "18 Feb 2026", location: "Virtual" }],
    instagramWidgetId: "AQUÍ_ID_CPC",
  },
  cppc: {
    name: "CPPC",
    fullName: "Comité Permanente de Publicaciones Científicas",
    color: "bg-indigo-700",
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070",
    organization: "SOCIMEP",
    description: "Desarrolla actividades de proyección social e impacto comunitario.",
    objectives: "Proyección social que impacte positivamente en la comunidad.",
    activities: ["Campañas rurales", "Educación en colegios"],
    upcomingEvents: [{ title: "Campaña Rural", date: "8 Mar 2026", location: "San Pedro" }],
    instagramWidgetId: "AQUÍ_ID_CPPC",
  },
  cpdii: {
    name: "CPDII",
    fullName: "Comité Permanente de Difusión e Imagen Institucional",
    color: "bg-slate-700",
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070",
    organization: "SOCIMEP",
    description: "Gestiona la comunicación e imagen de la sociedad científica.",
    objectives: "Manejo de redes sociales y diseño institucional.",
    activities: ["Redes Sociales", "Diseño"],
    upcomingEvents: [{ title: "Taller Diseño", date: "15 Feb 2026", location: "Laboratorio" }],
    instagramWidgetId: "AQUÍ_ID_CPDII",
  },
  cprii: {
    name: "CPRII",
    fullName: "Comité Permanente de Relaciones Interinstitucionales e Intercambios",
    color: "bg-cyan-700",
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070",
    organization: "SOCIMEP",
    description: "Mantiene relaciones con instituciones nacionales e internacionales.",
    objectives: "Establecer convenios y representación institucional.",
    activities: ["Convenios", "Relaciones externas"],
    upcomingEvents: [{ title: "Firma Convenio", date: "20 Mar 2026", location: "Rectorado" }],
    instagramWidgetId: "AQUÍ_ID_CPRII",
  },
  cpais: {
    name: "CPAIS",
    fullName: "Comité Permanente de Atención Integral en Salud",
    color: "bg-amber-600",
    coverImage: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070",
    organization: "SOCIMEP",
    description: "Promueve y asesora proyectos de investigación en salud.",
    objectives: "Soporte metodológico y estadístico en investigación.",
    activities: ["Asesoría proyectos", "Análisis SPSS"],
    upcomingEvents: [{ title: "Taller SPSS", date: "12 Feb 2026", location: "Cómputo" }],
    instagramWidgetId: "AQUÍ_ID_CPAIS",
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
              <Card className="border-2 border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-card-foreground">
                    <Target className="h-5 w-5 text-primary" /> Objetivos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{committee.objectives}</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-card-foreground">
                    <Users className="h-5 w-5 text-secondary" /> Actividades Principales
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

              <Card className="border-2 border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-card-foreground">
                    <Calendar className="h-5 w-5 text-primary" /> Próximos Eventos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {committee.upcomingEvents.map((event, index) => (
                      <div key={index} className="flex flex-col gap-2 rounded-lg bg-muted p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h4 className="font-medium text-foreground">{event.title}</h4>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {event.date}</span>
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.location}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="mt-2 sm:mt-0 bg-transparent">Ver más</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Columna Derecha: DIRECTORES DINÁMICOS */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="font-bold text-xl text-primary uppercase tracking-tighter">Equipo Directivo</h3>
              {directors && directors.length > 0 ? (
                directors.map((dir) => (
                  <Card key={dir.id} className="overflow-hidden">
                    <CardContent className="pt-6 text-center">
                      <div className="w-20 h-20 bg-slate-100 rounded-full mx-auto mb-4 overflow-hidden border-2 border-primary/10">
                        {dir.image_url ? (
                          <img src={dir.image_url} alt={dir.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="h-full flex items-center justify-center text-primary font-bold text-xl uppercase">
                            {dir.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <h4 className="font-bold">{dir.name}</h4>
                      <p className="text-xs text-primary font-semibold uppercase">{dir.role}</p>
                      <div className="flex justify-center gap-2 mt-4">
                        {dir.email && <Link href={`mailto:${dir.email}`} className="p-2 bg-slate-50 rounded-full hover:bg-primary hover:text-white transition-colors"><Mail className="h-4 w-4"/></Link>}
                        {dir.instagram && <Link href={dir.instagram} className="p-2 bg-slate-50 rounded-full hover:bg-primary hover:text-white transition-colors"><Instagram className="h-4 w-4"/></Link>}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="p-6 border-2 border-dashed rounded-2xl text-center text-muted-foreground">
                  Puesto en convocatoria
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN DE INSTAGRAM ELFSIGHT --- */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black uppercase tracking-tight flex items-center justify-center gap-3">
              <Instagram className="text-pink-500 h-8 w-8" /> 
              Sigue nuestra actividad
            </h2>
            <p className="text-muted-foreground mt-2 font-medium italic">Mira lo último de {committee.name} en redes sociales</p>
          </div>
          
          {/* El div del widget ahora es DINÁMICO */}
          <div className={`elfsight-app-${committee.instagramWidgetId}`} data-elfsight-app-lazy></div>
          
          <div className="mt-12 text-center">
             <Button asChild variant="outline" className="rounded-full border-primary/20 hover:bg-primary/5">
                <Link href="#" target="_blank">
                  Ver perfil oficial de Instagram
                </Link>
             </Button>
          </div>
        </div>
      </section>
    </>
  )
}