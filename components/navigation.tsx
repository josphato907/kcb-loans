'use client'

import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function Navigation() {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="bg-background border-b border-border/30">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <div className="w-7 h-7 bg-primary rounded flex items-center justify-center text-white text-xs font-bold">
            KCB
          </div>
          <span className="text-sm md:text-base">M-PESA Loans</span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 hover:bg-muted rounded-lg transition"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link href="#contact" className="text-foreground/70 hover:text-foreground text-sm transition">
            Help ?
          </Link>
        </div>
      </div>
    </nav>
  )
}
