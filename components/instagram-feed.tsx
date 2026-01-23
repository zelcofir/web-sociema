import { Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function InstagramFeed() {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4">
        {/* Encabezado con el degradado oficial de Instagram */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-[2px] rounded-2xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] mb-4">
            <div className="bg-white p-2 rounded-[14px]">
              <Instagram className="h-7 w-7 text-[#ee2a7b]" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-900">
            SOCIEMA en Instagram
          </h2>
          <p className="text-muted-foreground mt-2 font-medium italic">
            Nuestra actividad científica y social en tiempo real
          </p>
        </div>
        
        {/* Contenedor del Widget */}
        <div className="max-w-5xl mx-auto rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 bg-slate-50/30 p-2 md:p-4">
          <div 
            className="elfsight-app-6a6e34a3-ab13-4e0f-92e5-5b6ca0da779c" 
            data-elfsight-app-lazy
          ></div>
        </div>

       
      </div>
    </section>
  )
}