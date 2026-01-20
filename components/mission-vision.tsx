import { Target, Eye, Users, FlaskConical } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MissionVision() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Mission */}
          <Card className="border-2 border-primary/20 bg-card">
            <CardHeader>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Target className="h-7 w-7" />
              </div>
              <CardTitle className="text-2xl text-card-foreground">Nuestra Misión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Fomentar el desarrollo científico, académico y sociocultural de los estudiantes de medicina, contribuyendo a la solución de los problemas de salud de la comunidad.
              </p>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card className="border-2 border-secondary/50 bg-card">
            <CardHeader>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                <Eye className="h-7 w-7" />
              </div>
              <CardTitle className="text-2xl text-card-foreground">Nuestra Visión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Ser una sociedad científica líder, reconocida nacional e internacionalmente por su producción científica y calidad humana de sus miembros.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Image Grid */}
        <div className="mt-16 grid gap-4 md:grid-cols-4">
          <div className="flex aspect-square items-center justify-center rounded-lg bg-primary/10 md:col-span-2 md:row-span-2">
            <div className="text-center">
              <Users className="mx-auto mb-4 h-16 w-16 text-primary" />
              <p className="text-lg font-medium text-foreground">Estudiantes</p>
              <p className="text-sm text-muted-foreground">Reunión académica</p>
            </div>
          </div>
          <div className="flex aspect-square items-center justify-center rounded-lg bg-secondary/20">
            <div className="text-center">
              <FlaskConical className="mx-auto mb-2 h-10 w-10 text-accent" />
              <p className="text-sm font-medium text-foreground">Laboratorio</p>
            </div>
          </div>
          <div className="flex aspect-square items-center justify-center rounded-lg bg-primary/5">
            <div className="text-center">
              <Users className="mx-auto mb-2 h-10 w-10 text-primary" />
              <p className="text-sm font-medium text-foreground">Conferencia</p>
            </div>
          </div>
          <div className="flex aspect-square items-center justify-center rounded-lg bg-secondary/10 md:col-span-2">
            <div className="text-center">
              <Eye className="mx-auto mb-2 h-12 w-12 text-accent" />
              <p className="font-medium text-foreground">Compromiso con la Comunidad</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
