"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Target, Users, Instagram, Facebook, Info, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const ifmsaCommittees = [
  {
    name: "SCORA",
    slug: "scora",
    logo: "/logos/scora.png",
    instagram: "https://instagram.com/scora_sociema",
    facebook: "https://facebook.com/scora_sociema",
    fullName: "Standing Committee on Reproductive Health including AIDS",
    objectives: "Promover la salud sexual y reproductiva, incluyendo la prevención del VIH/SIDA y otras ITS, mediante educación y sensibilización.",
    activities: ["Campañas de educación sexual", "Talleres sobre prevención de ITS", "Charlas sobre derechos reproductivos", "Día Mundial del SIDA"],
  },
  {
    name: "SCORP",
    slug: "scorp",
    logo: "/logos/scorp.png",
    instagram: "#",
    facebook: "#",
    fullName: "Standing Committee on Human Rights and Peace",
    objectives: "Promover la paz, los derechos humanos y la asistencia humanitaria, sensibilizando a los estudiantes sobre su rol social.",
    activities: ["Campañas de derechos humanos", "Apoyo a poblaciones vulnerables", "Reflexión sobre migración", "Día de los Derechos Humanos"],
  },
  {
    name: "SCOPH",
    slug: "scoph",
    logo: "/logos/scoph.png",
    instagram: "#",
    facebook: "#",
    fullName: "Standing Committee on Public Health",
    objectives: "Mejorar la salud pública mediante campañas de prevención y promoción de estilos de vida saludables.",
    activities: ["Campañas de vacunación", "Ferias de salud comunitaria", "Prevención de enfermedades crónicas", "Hábitos saludables"],
  },
  {
    name: "SCOPE",
    slug: "scope",
    logo: "/logos/scope.png",
    instagram: "#",
    facebook: "#",
    fullName: "Standing Committee on Professional Exchange",
    objectives: "Facilitar intercambios profesionales clínicos internacionales para enriquecer la formación médica.",
    activities: ["Intercambios clínicos", "Experiencias internacionales", "Talleres de preparación", "Networking estudiantil"],
  },
  {
    name: "SCORE",
    slug: "score",
    logo: "/logos/score.png",
    instagram: "#",
    facebook: "#",
    fullName: "Standing Committee on Research Exchange",
    objectives: "Promover intercambios de investigación para desarrollar habilidades científicas y colaboración internacional.",
    activities: ["Intercambios de investigación", "Metodología científica", "Proyectos internacionales", "Centros de investigación"],
  },
  {
    name: "SCOME",
    slug: "scome",
    logo: "/logos/scome.png",
    instagram: "#",
    facebook: "#",
    fullName: "Standing Committee on Medical Education",
    objectives: "Mejorar la educación médica mediante innovación pedagógica, capacitación docente y desarrollo curricular.",
    activities: ["Talleres de habilidades", "Simulación médica", "Foros educativos", "Evaluación académica"],
  },
]

const socimepCommittees = [
  {
    name: "CPA",
    slug: "cpa",
    logo: "/logos/cpa.png",
    instagram: "#",
    facebook: "#",
    fullName: "Comité Permanente Académico",
    objectives: "Planificar, organizar y ejecutar actividades académicas, científicas y sociales de la sociedad.",
    activities: ["Congresos científicos", "Eventos académicos", "Talleres especializados", "Planificación social"],
  },
  {
    name: "CPC",
    slug: "cpc",
    logo: "/logos/cpc.png",
    instagram: "#",
    facebook: "#",
    fullName: "Comité Permanente Científico",
    objectives: "Brindar capacitación continua en investigación, liderazgo y habilidades blandas.",
    activities: ["Metodología científica", "Talleres de liderazgo", "Redacción de artículos", "Desarrollo profesional"],
  },
  {
    name: "CPPC",
    slug: "cppc",
    logo: "/logos/cppc.png",
    instagram: "#",
    facebook: "#",
    fullName: "Comité Permanente de Publicaciones Científicas",
    objectives: "Promover la publicación de trabajos de investigación en revistas científicas.",
    activities: ["Asesoría editorial", "Redacción científica", "Gestión de revista", "Difusión de ciencia"],
  },
  {
    name: "CPDII",
    slug: "cpdii",
    logo: "/logos/cpdii.png",
    instagram: "#",
    facebook: "#",
    fullName: "Comité Permanente de Difusión e Imagen Institucional",
    objectives: "Gestionar la comunicación y la imagen institucional de la sociedad científica.",
    activities: ["Redes sociales", "Diseño gráfico", "Cobertura de eventos", "Relaciones públicas"],
  },
  {
    name: "CPRII",
    slug: "cprii",
    logo: "/logos/cprii.png",
    instagram: "#",
    facebook: "#",
    fullName: "Comité Permanente de Relaciones Interinstitucionales e Intercambios",
    objectives: "Establecer y mantener relaciones con otras instituciones nacionales e internacionales.",
    activities: ["Convenios institucionales", "Gestión de intercambios", "Redes científicas", "Representación"],
  },
  {
    name: "CPAIS",
    slug: "cpais",
    logo: "/logos/cpais.png",
    instagram: "#",
    facebook: "#",
    fullName: "Comité Permanente de Atención Integral en Salud",
    objectives: "Promover actividades enfocadas en salud pública hacia la sociedad.",
    activities: ["CUMIS", "Pets vs Stress", "Taller Clown", "Jornadas de despistaje"],
  },
]

function CommitteeCard({ committee }: { committee: any }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="h-[460px] w-full [perspective:1000px]">
      <div 
        className={`relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
      >
        {/* CARA A: IDENTIDAD */}
        <Card className="absolute inset-0 flex flex-col border-2 border-border bg-card [backface-visibility:hidden]">
          <CardHeader className="items-center pb-2">
            <div className="flex w-full justify-between items-start">
              <Badge variant="outline" className="border-primary text-primary font-bold">{committee.name}</Badge>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={() => setIsFlipped(true)}
              >
                <Info className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
            
            {/* Logo Circular y Centrado */}
            <div className="relative h-32 w-32 mx-auto overflow-hidden rounded-full border bg-white shadow-sm my-4 flex items-center justify-center">
              <Image src={committee.logo} alt={committee.name} fill className="object-contain p-4" />
            </div>

            {/* Nombre Completo Centrado */}
            <CardTitle className="text-center text-lg font-bold min-h-[3.5rem] flex items-center justify-center px-4 leading-tight">
              {committee.fullName}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-6 mt-auto pb-8">
            <Button asChild className="w-full max-w-[180px] group rounded-full">
              <Link href={`/comites/${committee.slug}`}>
                Ver Comité
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <div className="flex gap-6 border-t border-border pt-4 w-full justify-center">
              <Link href={committee.instagram} target="_blank" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href={committee.facebook} target="_blank" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110">
                <Facebook className="h-6 w-6" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* CARA B: DETALLES */}
        <Card className="absolute inset-0 flex flex-col border-2 border-primary bg-card [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <CardHeader className="flex flex-row items-center justify-between py-4 border-b bg-muted/30">
            <span className="font-bold text-sm text-primary uppercase tracking-wider">Información</span>
            <Button variant="ghost" size="sm" onClick={() => setIsFlipped(false)} className="h-8 text-xs font-bold">
              Volver
            </Button>
          </CardHeader>
          <CardContent className="space-y-6 flex-grow overflow-y-auto pt-6 px-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <Target className="h-4 w-4 text-primary" /> Objetivos
              </div>
              <p className="text-sm text-muted-foreground leading-snug">{committee.objectives}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <Users className="h-4 w-4 text-secondary" /> Actividades
              </div>
              <ul className="space-y-1.5">
                {committee.activities.map((act: string, i: number) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-2 bg-muted/40 p-2 rounded-md italic">
                    <span className="text-primary font-bold">●</span> {act}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ComitesPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl uppercase tracking-tighter">
            Nuestros Comités
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/90 font-medium">
            Gestión y desarrollo estudiantil a través de nuestras áreas especializadas.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="ifmsa" className="w-full">
            <div className="flex justify-center mb-12">
              {/* Tabs List Estilo Píldora/Círculo */}
              <TabsList className="grid w-full grid-cols-2 max-w-md h-12 p-1 bg-muted rounded-full shadow-inner">
                <TabsTrigger 
                  value="ifmsa" 
                  className="rounded-full font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                >
                  IFMSA
                </TabsTrigger>
                <TabsTrigger 
                  value="socimep" 
                  className="rounded-full font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                >
                  SOCIMEP
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="ifmsa" className="outline-none">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {ifmsaCommittees.map((c) => <CommitteeCard key={c.name} committee={c} />)}
              </div>
            </TabsContent>
            
            <TabsContent value="socimep" className="outline-none">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {socimepCommittees.map((c) => <CommitteeCard key={c.name} committee={c} />)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}