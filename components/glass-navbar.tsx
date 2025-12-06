"use client"

import { LogIn, Menu, X } from "lucide-react"
import { useState } from "react"

interface GlassNavbarProps {
  onAboutClick: () => void
  onBlogsClick: () => void
  onLoginClick: () => void
}

export function GlassNavbar({ onAboutClick, onBlogsClick, onLoginClick }: GlassNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-white font-bold text-xl hidden sm:inline">BusinessHub</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={onAboutClick} className="text-white/80 hover:text-white transition-colors font-medium">
                About Us
              </button>
              <button onClick={onBlogsClick} className="text-white/80 hover:text-white transition-colors font-medium">
                Blogs
              </button>
            </div>

            {/* Login Button */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={onLoginClick}
                className="flex items-center gap-2 px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full text-white font-medium transition-all"
              >
                <LogIn size={18} />
                <span>Login</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-4 space-y-3">
              <button
                onClick={() => {
                  onAboutClick()
                  setIsOpen(false)
                }}
                className="block w-full text-left px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => {
                  onBlogsClick()
                  setIsOpen(false)
                }}
                className="block w-full text-left px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                Blogs
              </button>
              <button
                onClick={() => {
                  onLoginClick()
                  setIsOpen(false)
                }}
                className="block w-full text-left px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
