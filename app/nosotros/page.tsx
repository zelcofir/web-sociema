import { MissionVision } from "@/components/mission-vision"
import { TeamSection } from "@/components/team-section"
import { CommitteesPreview } from "@/components/committees-preview"

export default function NosotrosPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl">
            Nosotros
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/90">
            Conoce a la familia SOCIEMA. Estudiantes unidos por la pasión científica y el compromiso social.
          </p>
        </div>
      </section>

      <MissionVision />
      <TeamSection />
      <CommitteesPreview />
    </>
  )
}
