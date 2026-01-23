import { Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function InstagramFeed() {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black uppercase tracking-tight flex items-center justify-center gap-3">
            <Instagram className="text-pink-500 h-8 w-8" /> 
            SOCIEMA
          </h2>
          <p className="text-muted-foreground mt-2 font-medium italic">
            Nuestra actividad científica y social en tiempo real
          </p>
        </div>
        
        {/* AQUÍ ESTÁ EL TRUCO: 
          Agregamos max-w-4xl (aprox 800px-900px) para forzar al widget 
          a mostrar solo 3 columnas si el diseño es responsive.
        */}
        <div className="max-w-4xl mx-auto rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 bg-slate-50/30 p-4">
          <div 
            className="elfsight-app-6a6e34a3-ab13-4e0f-92e5-5b6ca0da779c" 
            data-elfsight-app-lazy
          ></div>
        </div>
      </div>
    </section>
  )
}