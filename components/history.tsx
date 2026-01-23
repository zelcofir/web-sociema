import { Calendar, Award, Star, History, Flag, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const historyEvents = [
  {
    year: "1992",
    title: "Creación SOCIEMSA-UNSA",
    description: "Nace la Sociedad Científica de Estudiantes de Medicina de la San Agustín, marcando el inicio del rigor científico estudiantil en Arequipa.",
    icon: <Star className="h-6 w-6" />,
    color: "bg-blue-600",
  },
  {
    year: "27 de agosto de 1992",
    title: "Fundación de SOCIPEM (actual SOCIMEP)",
    description: "SOCIEMSA-UNSA participa como sociedad fundadora de la SOCIPEM, evolucionando a lo que hoy conocemos como la Sociedad Científica Médico Estudiantil Peruana (SOCIMEP).",
    icon: <Flag className="h-6 w-6" />,
    color: "bg-red-600",
  },
  {
    year: "24 de enero de 2007",
    title: "Cambio de Denominación",
    description: "Un hito administrativo y de identidad donde adoptamos oficialmente el nombre de SOCIEMA.",
    icon: <History className="h-6 w-6" />,
    color: "bg-amber-500",
  },
  {
    year: "Actualidad",
    title: "Liderazgo Científico",
    description: "Consolidados como una de las sociedades referentes del país, liderando investigación, pasantías y proyección social, siendo titulares a nivel de IFMSA-PERU y SOCIMEP por más de 5 años consecutivos.",
    icon: <Award className="h-6 w-6" />,
    color: "bg-emerald-500",
  },
]

export default function HistoryTimeline() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            Nuestra Historia
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-medium italic">
            "Investigación que trasciende generaciones"
          </p>
        </div>

        {/* Línea de Tiempo */}
        <div className="relative mb-20">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-slate-200 hidden md:block"></div>

          <div className="space-y-12">
            {historyEvents.map((event, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                <div className="w-full md:w-1/2 px-4 md:px-12">
                  <div className="p-8 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 border border-slate-100 hover:scale-[1.02] transition-transform duration-300">
                    <span className={`inline-block px-4 py-1 rounded-full text-white text-sm font-bold mb-4 ${event.color}`}>
                      {event.year}
                    </span>
                    <h3 className="text-xl font-bold mb-2 text-slate-800">{event.title}</h3>
                    <p className="text-slate-600 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-slate-50 shadow-md my-4 md:my-0">
                   <div className={`${event.color} p-2 rounded-full text-white`}>
                     {event.icon}
                   </div>
                </div>

                <div className="hidden md:block w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de Referencia al Libro */}
        <div className="max-w-3xl mx-auto mt-20 p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-800 to-slate-900 text-white text-center shadow-2xl">
          <BookOpen className="h-10 w-10 mx-auto mb-4 text-blue-400" />
          <h3 className="text-2xl font-bold mb-4">¿Quieres conocer más detalles?</h3>
          <p className="text-slate-300 mb-8 leading-relaxed">
            Puedes profundizar en más hitos de nuestra historia en el 
            <span className="font-semibold text-white"> "Libro de Memorias SOCIMEP - 25 años"</span>, donde se detalla el papel fundamental de nuestra sociedad desde su fundación.
          </p>
          <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-500 text-white px-10 py-6 text-lg font-bold transition-all hover:shadow-lg hover:shadow-blue-500/25">
            <Link href="https://issuu.com/socimep/docs/socimep_historia-de-ciencia-en-preg" target="_blank">
              Leer Libro de Memorias
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}