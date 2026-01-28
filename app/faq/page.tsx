import { ExternalLink, Mail, MapPin, Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

// 1. DATA DE RESPALDO (Fallback) - Se usará si Supabase falla
const fallbackLinks = [
  { name: "Postulación Miembro Aspirante", url: "https://docs.google.com/forms/d/e/1FAIpQLSdWU4xkSPaL5GXKFlJOa5axLuqFpwno_3VrMXp8VGm_TOS9OQ/viewform" },
  { name: "Consulta Puntos de Intercambio", url: "https://docs.google.com/spreadsheets/d/1O3KMsQNFIi98iUwOVYwkLr5RYMePBGQt3Zh8gvDJZyc/edit?gid=0#gid=0" },
  { name: "Depósitos SOCIEMA", url: "https://docs.google.com/forms/u/5/d/e/1FAIpQLSf0IBzcSZla8YzckqMF1XRuPf4BROjicGMZ4QvCz6kZUhmL-Q/viewform?usp=send_form" },
  { name: "Avales SOCIEMA", url: "https://docs.google.com/forms/d/e/1FAIpQLSf0vZttSDkKMqa0EvrFy56yLOuHpf9bv089yPDzZI00tSUOfA/viewform" },
  { name: "Instagram Oficial", url: "https://www.instagram.com/sociema_oficial/" },
]
// 1. Las preguntas originales se mantienen como constantes (hardcoded) por estabilidad
const faqs = [
  {
    question: "¿Cómo puedo unirme a SOCIEMA?",
    answer: "Para unirte a SOCIEMA, debes ser estudiante de medicina de la Universidad Nacional de San Agustín de Arequipa. El proceso incluye llenar una ficha de inscripción y asistir a una charla de inducción. Regístrate como miembro aspirante a través de nuestros links útiles.",
  },
  {
    question: "¿Cuáles son los requisitos para ser miembro activo?",
    answer: "Para mantener la membresía activa, debes participar en al menos 3 actividades por semestre, asistir a las asambleas generales y estar al día con las cuotas de membresía. Además, se espera que contribuyas activamente en al menos un comité de tu elección.",
  },
  {
    question: "¿Cómo puedo participar en proyectos de investigación?",
    answer: "SOCIEMA ofrece diversas oportunidades de investigación. Puedes unirte a proyectos existentes contactando al Comité de Investigación, proponer tu propio proyecto para recibir asesoría, o participar en los talleres de metodología.",
  },
  {
    question: "¿Qué beneficios obtengo al ser miembro de SOCIEMA?",
    answer: "Acceso a capacitaciones gratuitas, oportunidades de intercambio vía IFMSA, participación en congresos, certificados, networking y descuentos en merch.",
  },
  {
    question: "¿Cómo puedo participar en las campañas de proyección social?",
    answer: "Publicamos convocatorias en nuestras redes y grupos de WhatsApp. Solo necesitas inscribirte y asistir a la reunión preparatoria antes de cada campaña.",
  },
  {
    question: "¿SOCIEMA ofrece intercambios internacionales?",
    answer: "Sí, a través de IFMSA, ofrecemos intercambios clínicos (SCOPE) y de investigación (SCORE) a más de 90 países para miembros activos.",
  },
  {
    question: "¿Cómo puedo publicar mi investigación con SOCIEMA?",
    answer: "Ofrecemos asesoría en redacción científica, revisión de manuscritos y orientación sobre revistas. Contáctanos a través del Comité de Investigación.",
  }
]

const externalLinks = [
  { name: "Portal UNSA", url: "https://www.unsa.edu.pe/", description: "Universidad Nacional de San Agustín" },
  { name: "SOCIMEP", url: "https://www.socimep.org/", description: "Sociedad Científica Médico Estudiantil Peruana" },
  { name: "IFMSA Perú", url: "https://ifmsaperu.org/", description: "Federación Internacional de Estudiantes de Medicina" },
]

export default function FAQPage({ linksFromSupabase }: { linksFromSupabase: any[] | null }) {
  
  // CONDICIONAL DE SEGURIDAD:
  // Si los datos de Supabase son nulos, están vacíos o hay error, usamos los de respaldo.
  const displayLinks = (linksFromSupabase && linksFromSupabase.length > 0) 
    ? linksFromSupabase 
    : fallbackLinks;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-primary-foreground md:text-5xl">Preguntas frecuentes</h1>
          <p className="mt-4 text-primary-foreground/90 text-lg">Resuelve tus dudas y accede a nuestros trámites.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* LADO IZQUIERDO: RÉPLICA LINKTREE (Dinamismo con Respaldo) */}
            <div className="bg-card rounded-3xl border-2 border-border p-8 shadow-sm text-center">
              <div className="mb-8">
                <div className="mx-auto h-24 w-24 rounded-full border-2 border-primary/10 mb-4 overflow-hidden bg-white relative">
                  <Image 
                    src="/logo.png" 
                    alt="SOCIEMA Logo" 
                    fill 
                    className="object-contain p-2"
                  />
                </div>
                <h2 className="text-xl font-bold">SOCIEMA 2026 💛💙</h2>
                <p className="text-sm text-muted-foreground mt-1">Somos ciencia, investigación y crecimiento. Únete y deja tu huella</p>
                
                {/* Indicador visual de modo offline (solo para desarrollo/admin si quieres) */}
                {(!linksFromSupabase || linksFromSupabase.length === 0) && (
                  <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full mt-2 inline-block">
                    Modo Respaldo Activo
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-4">
                {displayLinks.map((link, index) => (
                  <Button 
                    key={index} 
                    asChild 
                    variant="outline" 
                    className="w-full h-14 rounded-full text-base font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <Link href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.name}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>

            {/* LADO DERECHO: PREGUNTAS FRECUENTES */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Dudas Comunes</h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="rounded-xl border-2 border-border bg-card px-6">
                    <AccordionTrigger className="text-left font-medium hover:no-underline">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

          </div>
        </div>
      </section>

      {/* ENLACES INSTITUCIONALES (NO SOCIEMA) */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">Enlaces Académicos Externos</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {externalLinks.map((link) => (
              <Button key={link.name} variant="outline" className="h-auto flex-col items-start gap-1 bg-card p-4 text-left" asChild>
                <Link href={link.url} target="_blank">
                  <span className="flex w-full items-center justify-between font-bold">
                    {link.name} <ExternalLink className="h-4 w-4" />
                  </span>
                  <span className="text-xs text-muted-foreground">{link.description}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}