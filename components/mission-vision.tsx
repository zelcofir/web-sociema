import { Target, Eye, Users, FlaskConical } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

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
          {/* Imagen Grande (Principal) */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-primary/10 md:col-span-2 md:row-span-2">
            <Image
              src="/activities/act1.png" // Cambia por tu archivo en /public
              alt="Reunión académica"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <p className="text-lg font-medium text-white">Estudiantes</p>
              <p className="text-sm text-white/80">Reunión académica</p>
            </div>
          </div>

          {/* Imagen Pequeña 1 */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary/20">
            <Image
              src="/activities/act4.png" // Cambia por tu archivo en /public
              alt="Congresos"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-2 text-center">
              <p className="text-xs font-medium text-white">Congresos</p>
            </div>
          </div>

          {/* Imagen Pequeña 2 */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-primary/5">
            <Image
              src="/activities/act6.png" // Cambia por tu archivo en /public
              alt="Conferencia"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-2 text-center">
              <p className="text-xs font-medium text-white">Conferencia</p>
            </div>
          </div>

          {/* Imagen Horizontal Inferior */}
          <div className="relative aspect-video overflow-hidden rounded-lg bg-secondary/10 md:col-span-2 md:row-span-1">
            <Image
              src="/activities/act2.png" // Cambia por tu archivo en /public
              alt="Compromiso con la Comunidad"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="font-medium text-white text-center">Compromiso con la Comunidad</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
