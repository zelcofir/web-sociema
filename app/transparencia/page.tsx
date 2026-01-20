import React from "react"
import { FileText, BookOpen, ExternalLink, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const normativeDocuments = [
  {
    id: 1,
    name: "Estatuto de SOCIEMA",
    description: "Documento fundacional que establece los principios, objetivos y estructura de la organización.",
    link: "#",
  },
  {
    id: 2,
    name: "Reglamento Interno",
    description: "Normas que regulan el funcionamiento interno y la conducta de los miembros.",
    link: "#",
  },
  {
    id: 3,
    name: "Código de Ética",
    description: "Principios éticos que guían la conducta de los miembros en sus actividades científicas y sociales.",
    link: "#",
  },
  {
    id: 4,
    name: "Reglamento Electoral",
    description: "Normas que rigen el proceso de elección de la directiva y representantes.",
    link: "#",
  },
  {
    id: 5,
    name: "Plan Estratégico 2024-2026",
    description: "Documento que establece la visión, misión y objetivos estratégicos del periodo.",
    link: "#",
  },
  {
    id: 6,
    name: "Política de Privacidad",
    description: "Lineamientos sobre el manejo y protección de datos personales de los miembros.",
    link: "#",
  },
]

const manuals = [
  {
    id: 1,
    name: "Manual de Organización y Funciones",
    description: "Documento que describe la estructura organizacional y las funciones de cada área.",
    link: "#",
  },
  {
    id: 2,
    name: "Manual de Procedimientos",
    description: "Guía detallada de los procedimientos administrativos y operativos.",
    link: "#",
  },
  {
    id: 3,
    name: "Manual de Investigación",
    description: "Lineamientos para el desarrollo de proyectos de investigación dentro de SOCIEMA.",
    link: "#",
  },
  {
    id: 4,
    name: "Manual de Proyección Social",
    description: "Guía para la planificación y ejecución de actividades de proyección social.",
    link: "#",
  },
  {
    id: 5,
    name: "Manual de Eventos",
    description: "Procedimientos para la organización de congresos, talleres y actividades académicas.",
    link: "#",
  },
  {
    id: 6,
    name: "Manual de Identidad Visual",
    description: "Guía de uso del logo, colores institucionales y material gráfico de SOCIEMA.",
    link: "#",
  },
]

interface DocumentCardProps {
  document: {
    id: number
    name: string
    description: string
    link: string
  }
  icon: React.ReactNode
}

function DocumentCard({ document, icon }: DocumentCardProps) {
  return (
    <Card className="flex flex-col border-2 border-border bg-card transition-all hover:border-primary hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
          {icon}
        </div>
        <CardTitle className="text-lg text-card-foreground">{document.name}</CardTitle>
      </CardHeader>
      <CardContent className="mt-auto space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {document.description}
        </p>
        <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
          <Link href={document.link} target="_blank" rel="noopener noreferrer">
            <Download className="mr-2 h-4 w-4" />
            Ver documento
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default function TransparenciaPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl">
            Transparencia
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/90">
            Accede a nuestros documentos normativos y manuales institucionales. En SOCIEMA creemos en la transparencia y el acceso a la información.
          </p>
        </div>
      </section>

      {/* Normative Documents Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  Documentos Normativos
                </h2>
                <p className="text-muted-foreground">
                  Marco legal y normativo que rige nuestra organización
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {normativeDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                icon={<FileText className="h-8 w-8 text-primary" />}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Manuals Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                <BookOpen className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  Manuales
                </h2>
                <p className="text-muted-foreground">
                  Guías y procedimientos para nuestras actividades
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {manuals.map((manual) => (
              <DocumentCard
                key={manual.id}
                document={manual}
                icon={<BookOpen className="h-8 w-8 text-accent" />}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="border-2 border-primary/20 bg-card">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center md:flex-row md:text-left">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <ExternalLink className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                  ¿Necesitas más información?
                </h3>
                <p className="text-muted-foreground">
                  Si requieres acceso a documentos adicionales o tienes consultas sobre nuestra gestión, no dudes en contactarnos. Estamos comprometidos con la transparencia institucional.
                </p>
              </div>
              <Button asChild>
                <Link href="/faq">
                  Contáctanos
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
