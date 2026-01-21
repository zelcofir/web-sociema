import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Target, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

const ifmsaCommittees = [
  {
    name: "SCORA",
    slug: "scora",
    fullName: "Standing Committee on Reproductive Health including AIDS",
    objectives: "Promover la salud sexual y reproductiva, incluyendo la prevención del VIH/SIDA y otras ITS, mediante educación y sensibilización.",
    activities: [
      "Campañas de educación sexual",
      "Talleres sobre prevención de ITS",
      "Charlas sobre derechos reproductivos",
      "Actividades por el Día Mundial del SIDA",
    ],
  },
  {
    name: "SCORP",
    slug: "scorp",
    fullName: "Standing Committee on Human Rights and Peace",
    objectives: "Promover la paz, los derechos humanos y la asistencia humanitaria, sensibilizando a los estudiantes de medicina sobre su rol social.",
    activities: [
      "Campañas de derechos humanos",
      "Apoyo a poblaciones vulnerables",
      "Jornadas de reflexión sobre migración",
      "Actividades por el Día de los Derechos Humanos",
    ],
  },
  {
    name: "SCOPH",
    slug: "scoph",
    fullName: "Standing Committee on Public Health",
    objectives: "Mejorar la salud pública mediante campañas de prevención, promoción de estilos de vida saludables y concientización.",
    activities: [
      "Campañas de vacunación",
      "Ferias de salud comunitaria",
      "Educación sobre enfermedades crónicas",
      "Promoción de hábitos saludables",
    ],
  },
  {
    name: "SCOPE",
    slug: "scope",
    fullName: "Standing Committee on Professional Exchange",
    objectives: "Facilitar intercambios profesionales clínicos internacionales para enriquecer la formación médica de los estudiantes.",
    activities: [
      "Coordinación de intercambios clínicos",
      "Charlas de experiencias internacionales",
      "Talleres de preparación para intercambios",
      "Networking con estudiantes extranjeros",
    ],
  },
  {
    name: "SCORE",
    slug: "score",
    fullName: "Standing Committee on Research Exchange",
    objectives: "Promover intercambios de investigación para desarrollar habilidades científicas y colaboración internacional.",
    activities: [
      "Coordinación de intercambios de investigación",
      "Talleres de metodología científica",
      "Presentación de proyectos internacionales",
      "Colaboración con centros de investigación",
    ],
  },
  {
    name: "SCOME",
    slug: "scome",
    fullName: "Standing Committee on Medical Education",
    objectives: "Mejorar la educación médica mediante innovación pedagógica, capacitación docente y desarrollo curricular.",
    activities: [
      "Talleres de habilidades clínicas",
      "Capacitación en simulación médica",
      "Foros sobre educación médica",
      "Evaluación de programas académicos",
    ],
  },
]

const socimepCommittees = [
  {
    name: "CPA",
    slug: "cpa",
    fullName: "Comité Permanente Académico",
    objectives: "Planificar, organizar y ejecutar actividades académicas, científicas y sociales de la sociedad.",
    activities: [
      "Organización de congresos",
      "Coordinación de eventos académicos",
      "Gestión de talleres y cursos",
      "Planificación de actividades sociales",
    ],
  },
  {
    name: "CPC",
    slug: "cpc",
    fullName: "Comité Permanente Científico",
    objectives: "Brindar capacitación continua a los miembros en temas de investigación, liderazgo y habilidades blandas.",
    activities: [
      "Cursos de metodología de investigación",
      "Talleres de liderazgo",
      "Capacitación en redacción científica",
      "Seminarios de desarrollo profesional",
    ],
  },
  {
    name: "CPPC",
    slug: "cppc",
    fullName: "Comité Permanente de Publicaciones Científicas",
    objectives: "Desarrollar actividades de proyección social que impacten positivamente en la comunidad.",
    activities: [
      "Campañas de salud comunitaria",
      "Educación sanitaria en colegios",
      "Atención médica en zonas rurales",
      "Jornadas de despistaje",
    ],
  },
  {
    name: "CPDII",
    slug: "cpdii",
    fullName: "Comité Permanente de Difusión e Imagen Institucional",
    objectives: "Gestionar la comunicación y la imagen institucional de la sociedad científica.",
    activities: [
      "Manejo de redes sociales",
      "Diseño de material promocional",
      "Cobertura de eventos",
      "Relaciones públicas",
    ],
  },
  {
    name: "CPRII",
    slug: "cprii",
    fullName: "Comité Permanente de Relaciones Interinstitucionales e Intercambios",
    objectives: "Establecer y mantener relaciones con otras instituciones nacionales e internacionales.",
    activities: [
      "Convenios interinstitucionales",
      "Gestión de intercambios",
      "Participación en redes científicas",
      "Representación institucional",
    ],
  },
  {
    name: "CPAIS",
    slug: "cpais",
    fullName: "Comité Permanente de Atención Integral en Salud",
    objectives: "Promover y asesorar proyectos de investigación en salud entre los miembros de la sociedad.",
    activities: [
      "Asesoría de proyectos de investigación",
      "Revisión de protocolos",
      "Talleres de análisis estadístico",
      "Publicación de artículos científicos",
    ],
  },
]

function CommitteeCard({ committee }: { committee: typeof ifmsaCommittees[0] }) {
  return (
    <Card className="h-full border-2 border-border bg-card transition-colors hover:border-primary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Link href={`/comites/${committee.slug}`}>
            <Badge variant="outline" className="cursor-pointer border-primary text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
              {committee.name}
            </Badge>
          </Link>
        </div>
        <Link href={`/comites/${committee.slug}`} className="group">
          <CardTitle className="flex items-center gap-2 text-lg text-card-foreground transition-colors group-hover:text-primary">
            {committee.fullName}
            <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
            <Target className="h-4 w-4 text-primary" />
            Objetivos
          </div>
          <CardDescription className="text-sm">
            {committee.objectives}
          </CardDescription>
        </div>
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
            <Users className="h-4 w-4 text-secondary" />
            Actividades
          </div>
          <ul className="space-y-1">
            {committee.activities.map((activity, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                • {activity}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ComitesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl">
            Comités
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/90">
            Conoce nuestros comités de trabajo y sus actividades en el marco de IFMSA y SOCIMEP.
          </p>
        </div>
      </section>

      {/* Committees Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="ifmsa" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-2 lg:w-96">
              <TabsTrigger value="ifmsa">IFMSA</TabsTrigger>
              <TabsTrigger value="socimep">SOCIMEP</TabsTrigger>
            </TabsList>

            <TabsContent value="ifmsa" className="space-y-8">
              <div className="rounded-lg bg-muted p-6">
                <h2 className="mb-2 text-2xl font-bold text-foreground">IFMSA</h2>
                <p className="text-muted-foreground">
                  La Federación Internacional de Asociaciones de Estudiantes de Medicina (IFMSA) es una organización independiente, no gubernamental y apolítica que representa asociaciones de estudiantes de medicina a nivel mundial.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {ifmsaCommittees.map((committee) => (
                  <CommitteeCard key={committee.name} committee={committee} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="socimep" className="space-y-8">
              <div className="rounded-lg bg-muted p-6">
                <h2 className="mb-2 text-2xl font-bold text-foreground">SOCIMEP</h2>
                <p className="text-muted-foreground">
                  La Sociedad Científica Médico Estudiantil Peruana (SOCIMEP) es una organización que agrupa a las sociedades científicas de estudiantes de medicina del Perú, promoviendo la investigación y el desarrollo científico.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {socimepCommittees.map((committee) => (
                  <CommitteeCard key={committee.name} committee={committee} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  )
}
