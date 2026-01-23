"use client"

import React, { useState, useEffect } from "react"
import { FileText, BookOpen, ExternalLink, Download, Loader2, Users, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { createBrowserClient } from "@supabase/ssr"

interface Documento {
  id: string
  name: string
  description: string
  link: string
  categoria: string
  image_url: string | null
  priority: number
}

function DocumentCard({ document, icon }: { document: Documento, icon: React.ReactNode }) {
  return (
    <Card className="flex flex-col border-2 border-border bg-card transition-all hover:border-primary hover:shadow-md w-full max-w-[280px] h-full">
      <CardHeader className="pb-3 text-center">
        <CardTitle className="text-lg text-card-foreground line-clamp-2 min-h-[3.5rem] flex items-center justify-center px-2">
          {document.name}
        </CardTitle>
        <div className="mb-4 flex h-56 w-full items-center justify-center rounded-lg bg-primary/5 overflow-hidden">
          <div className="relative h-48 aspect-[1/1.5] shadow-md transition-transform hover:scale-105 duration-300">
            {document.image_url ? (
              <Image 
                src={document.image_url} 
                alt={document.name} 
                fill 
                className="object-cover rounded-sm border"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white border rounded-sm">
                {icon}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto space-y-4 text-center">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {document.description}
        </p>
        <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
          <Link href={document.link} target="_blank" rel="noopener noreferrer">
            <Download className="mr-2 h-4 w-4" />
            Ver documento
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default function TransparenciaPage() {
  const [documents, setDocuments] = useState<Documento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDocs() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      
      const { data, error } = await supabase
        .from("documentos_transparencia")
        .select("*")
        // Se eliminaron las líneas de .order para evitar el error de columna inexistente

      if (!error) setDocuments(data || [])
      setLoading(false)
    }
    fetchDocs()
  }, [])

  // Filtros por categorías
  const normativeDocs = documents.filter(d => d.categoria?.toLowerCase() === "normativo")
  const executiveDocs = documents.filter(d => d.categoria?.toLowerCase() === "ejecutivo")
  const committeeDocs = documents.filter(d => d.categoria?.toLowerCase() === "comite")

  return (
    <>
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl">Transparencia</h1>
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/90">
            Accede a nuestros documentos normativos y manuales institucionales.
          </p>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-16 space-y-24">
          
          {/* SECCIÓN 1: DOCUMENTOS NORMATIVOS */}
          <section>
            <div className="mb-10 flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary mb-2">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold md:text-3xl text-center">Documentos Normativos</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {normativeDocs.map((doc) => (
                <div key={doc.id} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(25%-1.5rem)] max-w-[280px]">
                  <DocumentCard document={doc} icon={<FileText className="h-10 w-10 text-primary/20" />} />
                </div>
              ))}
            </div>
          </section>

          {/* SECCIÓN 2: MANUALES DEL EJECUTIVO */}
          <section className="bg-muted/30 -mx-4 px-4 py-16 rounded-xl border-y border-border/50">
            <div className="mb-10 flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary mb-2">
                <ShieldCheck className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h2 className="text-2xl font-bold md:text-3xl text-center">Manuales del Ejecutivo</h2>
              <p className="text-muted-foreground text-sm">Presidencia, Vicepresidencia, Fiscalía, Secretaría y Tesorería</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {executiveDocs.map((doc) => (
                <div key={doc.id} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(25%-1.5rem)] max-w-[280px]">
                  <DocumentCard document={doc} icon={<BookOpen className="h-10 w-10 text-secondary/20" />} />
                </div>
              ))}
            </div>
          </section>

          {/* SECCIÓN 3: MANUALES DE COMITÉS */}
          <section>
            <div className="mb-10 flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent mb-2">
                <Users className="h-6 w-6 text-accent-foreground" />
              </div>
              <h2 className="text-2xl font-bold md:text-3xl text-center">Manuales de Comités</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {committeeDocs.map((doc) => (
                <div key={doc.id} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(25%-1.5rem)] max-w-[280px]">
                  <DocumentCard document={doc} icon={<BookOpen className="h-10 w-10 text-accent/20" />} />
                </div>
              ))}
            </div>
          </section>

        </div>
      )}

      {/* Footer Info */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <Card className="border-2 border-primary/20 bg-card">
          <CardContent className="flex flex-col items-center gap-4 p-8 md:flex-row">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <ExternalLink className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="mb-2 text-xl font-semibold">¿Necesitas más información?</h3>
              <p className="text-muted-foreground text-sm">
                Si requieres acceso a documentos adicionales o tienes consultas sobre nuestra gestión, no dudes en contactarnos.
              </p>
            </div>
            <Button asChild>
              <Link href="/faq">Contáctanos</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </>
  )
}