'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-primary">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white">
              E
            </div>
            EcoBank
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#calculator" className="text-foreground/80 hover:text-foreground transition">
              Calculator
            </Link>
            <Link href="#eligibility" className="text-foreground/80 hover:text-foreground transition">
              Check Eligibility
            </Link>
            <Link href="#faq" className="text-foreground/80 hover:text-foreground transition">
              FAQ
            </Link>
            <Link href="#contact" className="text-foreground/80 hover:text-foreground transition">
              Contact
            </Link>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 hover:bg-muted rounded-lg transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Button className="bg-primary hover:bg-accent text-white">
              Apply Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 hover:bg-muted rounded-lg transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-muted rounded-lg transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4 border-t border-border">
            <Link href="#calculator" className="block py-2 text-foreground/80 hover:text-foreground transition">
              Calculator
            </Link>
            <Link href="#eligibility" className="block py-2 text-foreground/80 hover:text-foreground transition">
              Check Eligibility
            </Link>
            <Link href="#faq" className="block py-2 text-foreground/80 hover:text-foreground transition">
              FAQ
            </Link>
            <Link href="#contact" className="block py-2 text-foreground/80 hover:text-foreground transition">
              Contact
            </Link>
            <Button className="w-full bg-primary hover:bg-accent text-white">
              Apply Now
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
