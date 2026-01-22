import { ExternalLink, Mail, MapPin, Phone } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const faqs = [
  {
    question: "¿Cómo puedo unirme a SOCIEMA?",
    answer: "Para unirte a SOCIEMA, debes ser estudiante de medicina de la Universidad Nacional de San Agustín de Arequipa. El proceso incluye llenar una ficha de inscripción y asistir a una charla de inducción. Regístrate como miembro aspirante a través de nuestros links útiles (la sección inferior)",
  },
  {
    question: "¿Cuáles son los requisitos para ser miembro activo?",
    answer: "Para mantener la membresía activa, debes participar en al menos 3 actividades por semestre, asistir a las asambleas generales y estar al día con las cuotas de membresía. Además, se espera que contribuyas activamente en al menos un comité de tu elección.",
  },
  {
    question: "¿Cómo puedo participar en proyectos de investigación?",
    answer: "SOCIEMA ofrece diversas oportunidades de investigación. Puedes unirte a proyectos existentes contactando al Comité de Investigación, proponer tu propio proyecto de investigación para recibir asesoría, o participar en los talleres de metodología de investigación que organizamos regularmente.",
  },
  {
    question: "¿Qué beneficios obtengo al ser miembro de SOCIEMA?",
    answer: "Los miembros de SOCIEMA tienen acceso a capacitaciones gratuitas, oportunidades de intercambio a través de IFMSA, participación en congresos nacionales e internacionales, certificados de participación, networking con profesionales de la salud y descuentos en nuestros productos de merch.",
  },
  {
    question: "¿Cómo puedo participar en las campañas de proyección social?",
    answer: "Las campañas de proyección social están abiertas a todos los miembros. Publicamos convocatorias a través de nuestras redes sociales y grupos de WhatsApp. Solo necesitas inscribirte y asistir a la reunión preparatoria antes de cada campaña.",
  },
  {
    question: "¿SOCIEMA ofrece intercambios internacionales?",
    answer: "Sí, a través de nuestra afiliación con IFMSA, ofrecemos intercambios clínicos (SCOPE) y de investigación (SCORE) a más de 90 países. Los miembros activos con buen rendimiento académico pueden postular a estas oportunidades.",
  },
  {
    question: "¿Cómo puedo publicar mi investigación con SOCIEMA?",
    answer: "SOCIEMA apoya a sus miembros en la publicación científica. Ofrecemos asesoría en redacción científica, revisión de manuscritos y orientación sobre revistas científicas apropiadas. Contáctanos a través del Comité de Investigación para más información.",
  }
]

const usefulLinks = [
  {
    name: "Portal de la Universidad",
    url: "https://www.unsa.edu.pe/",
    description: "Acceso al portal estudiantil UNSA",
  },
  {
    name: "IFMSA Perú",
    url: "https://ifmsaperu.org/",
    description: "Federación Internacional de Estudiantes de Medicina",
  },
  {
    name: "SOCIMEP",
    url: "https://www.socimep.org/",
    description: "Sociedad Científica Médico Estudiantil Peruana",
  },
  {
    name: "Postulación miembro aspirante",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSdWU4xkSPaL5GXKFlJOa5axLuqFpwno_3VrMXp8VGm_TOS9OQ/viewform",
    description: "Únete a nuestra familia SOCIEMA",
  },
  {
    name: "Consulta puntos de intercambio",
    url: "https://docs.google.com/spreadsheets/d/1O3KMsQNFIi98iUwOVYwkLr5RYMePBGQt3Zh8gvDJZyc/edit?gid=0#gid=0",
    description: "Revisa cuántos puntos de intercambio posees",
  },
  {
    name: "POAs gestión 2026 SOCIEMA",
    url: "https://scholar.google.com",
    description: "Planes Operativos Anuales (POAs) de la gestión actual",
  },
  {
    name: "Miembros activos por comité",
    url: "https://scholar.google.com",
    description: "Miembros participativos durante el año",
  },
  {
    name: "Calendario de eventos SOCIEMA",
    url: "https://scholar.google.com",
    description: "Conoce nuestros eventos durante el año",
  }, 
  {
    name: "Justificaciones a asambleas",
    url: "https://scholar.google.com",
    description: "Justifica tu inasistencia a asambleas generales",
  },
  {
    name: "Avales SOCIEMA",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSf0vZttSDkKMqa0EvrFy56yLOuHpf9bv089yPDzZI00tSUOfA/viewform",
    description: "Solicita tu aval a eventos y congresos",
  },
  {
    name: "Depósitos SOCIEMA",
    url: "https://docs.google.com/forms/u/5/d/e/1FAIpQLSf0IBzcSZla8YzckqMF1XRuPf4BROjicGMZ4QvCz6kZUhmL-Q/viewform?usp=send_form",
    description: "Registra cada pago realizado a SOCIEMA",
  },
  {
    name: "Buzón de sugerencias",
    url: "https://scholar.google.com",
    description: "Queremos saber tu opinión para mejorar",
  },
]

export default function FAQPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl">
            Preguntas Frecuentes
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/90">
            Encuentra respuestas a las dudas más comunes sobre SOCIEMA.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-lg border-2 border-border bg-card px-6 data-[state=open]:border-primary"
                >
                  <AccordionTrigger className="text-left text-base font-medium text-card-foreground hover:text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Useful Links Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
            Enlaces Útiles
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {usefulLinks.map((link) => (
              <Button
                key={link.name}
                variant="outline"
                className="h-auto flex-col items-start gap-1 bg-card p-4 text-left hover:border-primary"
                asChild
              >
                <Link href={link.url} target="_blank" rel="noopener noreferrer">
                  <span className="flex w-full items-center justify-between text-base font-medium text-card-foreground">
                    {link.name}
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {link.description}
                  </span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
            ¿Tienes más preguntas?
          </h2>
          <div className="mx-auto max-w-2xl">
            <Card className="border-2 border-border bg-card">
              <CardHeader>
                <CardTitle className="text-center text-card-foreground">Contáctanos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-card-foreground">sociema.aqp2@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <p className="font-medium text-card-foreground">+51 999 888 777</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dirección</p>
                    <p className="font-medium text-card-foreground">Facultad de Medicina, UNSA - Arequipa, Perú</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
