import { Microscope, Heart, GraduationCap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const pillars = [
  {
    title: "Investigación",
    description: "Promovemos la producción científica de calidad desde el pregrado.",
    icon: Microscope,
  },
  {
    title: "Proyección Social",
    description: "Llevamos salud y educación a las comunidades que más lo necesitan.",
    icon: Heart,
  },
  {
    title: "Educación Médica",
    description: "Capacitación continua para complementar la formación universitaria.",
    icon: GraduationCap,
  },
]

export function Pillars() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Nuestros Pilares
          </h2>
          <p className="text-lg text-muted-foreground">
            Fundamentos que guían nuestra labor científica y social en la comunidad universitaria.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((pillar) => (
            <Card
              key={pillar.title}
              className="group border-2 border-border bg-card transition-all hover:border-primary hover:shadow-lg"
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <pillar.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl text-card-foreground">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">
                  {pillar.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
