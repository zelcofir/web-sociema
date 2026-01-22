"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, HelpCircle, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "Actividades", href: "/actividades" },
  { name: "Publicaciones", href: "/publicaciones" },
  { name: "Comités", href: "/comites" },
  { name: "Transparencia", href: "/transparencia" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
       <Link href="/" className="flex items-center gap-2">
          <div className="h-10 w-10 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Logo SOCIEMA"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold text-foreground">SOCIEMA</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Icon buttons */}
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/faq" aria-label="Preguntas frecuentes">
              <HelpCircle className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/merch" aria-label="Tienda de merch">
              <ShoppingBag className="h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-border md:hidden">
          <nav className="container mx-auto flex flex-col gap-2 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 border-t border-border pt-4">
              <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                <Link href="/faq" onClick={() => setIsOpen(false)}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  FAQ
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                <Link href="/merch" onClick={() => setIsOpen(false)}>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Merch
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
