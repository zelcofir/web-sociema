import React from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Script from 'next/script'

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: 'SOCIEMA - Sociedad Científica de Estudiantes de Medicina Agustinos',
  description: 'Sociedad Científica de Estudiantes de Medicina Agustinos. Investigación, academia y servicio a la comunidad.',
  keywords: ['SOCIEMA', 'medicina', 'estudiantes', 'ciencia', 'investigación', 'salud'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Analytics />
      {/* ENLACE DE ELFSIGHT */}
        <Script 
          src="https://static.elfsight.com/platform/platform.js" 
          data-use-service-core 
          defer 
        />
      </body>
    </html>
  )
}

