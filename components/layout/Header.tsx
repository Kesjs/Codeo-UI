'use client'

import Link from 'next/link'
import { Menu, X, LayoutDashboard, Sparkles, Zap, CreditCard } from 'lucide-react'
import { useState, useEffect } from 'react'
import Logo from '@/components/Logo'

/**
 * Header Codeo UI - Version Finale Optimisée
 * Modifs : Bordure scroll subtile, nettoyage des liens, lueur logo statique.
 */

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const [isLoggedIn] = useState(false) 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Nettoyage lors du démontage du composant
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen])

  const underlineClass = "relative no-underline outline-none border-none ring-0 decoration-transparent after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-codeo-green after:transition-all after:duration-300 hover:after:w-full hover:text-codeo-green";

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-500 border-b-2 border-slate-200/80 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-xl py-1 shadow-sm' 
        : 'bg-white py-3'
    }`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between h-16">
        
        {/* --- ZONE LOGO AVEC GLOW STATIQUE --- */}
        <Link 
          href="/" 
          className="relative flex items-center transition-transform hover:scale-[1.02] outline-none border-none decoration-transparent ring-0 focus:ring-0"
        >
          {/* Lueur fixe derrière le logo */}
          <div className="absolute inset-0 bg-codeo-green/15 blur-2xl rounded-full scale-150" />
          
          <div className="relative w-48 h-12 flex items-center justify-start overflow-hidden">
            <Logo />
          </div>
        </Link>
        
        {/* --- NAVIGATION DESKTOP --- */}
        <nav className="hidden md:flex items-center gap-12">
          <Link 
            href="#workflow" 
            className={`flex items-center gap-2.5 text-sm font-bold text-slate-700 transition-colors decoration-transparent ${underlineClass}`}
          >
            <Zap className="h-4 w-4" /> Workflow
          </Link>
          
          <Link 
            href="#how-it-works" 
            className={`flex items-center gap-2.5 text-sm font-bold text-slate-700 transition-colors decoration-transparent ${underlineClass}`}
          >
            <Sparkles className="h-4 w-4" /> Engine
          </Link>
          
          <Link 
            href="#pricing" 
            className={`flex items-center gap-2.5 text-sm font-bold text-slate-700 transition-colors decoration-transparent ${underlineClass}`}
          >
            <CreditCard className="h-4 w-4" /> Pricing
          </Link>
        </nav>

        {/* --- ACTIONS DESKTOP --- */}
        <div className="hidden md:flex items-center gap-5">
          {!isLoggedIn ? (
            <>
              <Link 
                href="/login" 
                className="px-5 py-2.5 text-sm font-bold text-slate-700 hover:text-codeo-green bg-transparent hover:bg-slate-50 border border-slate-200 hover:border-codeo-green/30 rounded-xl transition-all duration-300 no-underline outline-none ring-0"
              >
                Log In
              </Link>

              <Link 
                href="/register" 
                className="px-7 py-3 bg-codeo-green text-white text-sm font-extrabold rounded-xl shadow-[0_8px_20px_-6px_rgba(0,209,255,0.3)] hover:shadow-[0_8px_25px_-4px_rgba(0,209,255,0.4)] hover:bg-opacity-95 hover:-translate-y-0.5 transition-all duration-300 no-underline outline-none border-none ring-0 active:scale-95"
              >
                Get Started 
              </Link>
            </>
          ) : (
            <Link 
              href="/workspace" 
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all no-underline shadow-lg shadow-slate-200"
            >
              <LayoutDashboard className="h-4 w-4 text-codeo-green" /> Workspace
            </Link>
          )}
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <button 
          className="md:hidden p-2 text-slate-700 outline-none border-none ring-0 focus:ring-0 focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-7 w-7 animate-in fade-in duration-200" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* --- FOND SEMI-TRANSPARENT --- */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      {/* --- MENU MOBILE --- */}
      {isMenuOpen && (
        <div className="md:hidden fixed right-0 top-0 h-screen w-4/5 max-w-sm bg-white z-40 p-6 flex flex-col gap-6 animate-in slide-in-from-right duration-300 overflow-y-auto">
          {/* Bouton de fermeture */}
          <button 
            className="absolute right-6 top-6 p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
          <Link href="#workflow" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-xl font-extrabold text-slate-900 border-b border-slate-50 py-4 no-underline outline-none decoration-transparent">
            <Zap className="text-codeo-green h-6 w-6" /> Workflow
          </Link>
          <Link href="#engine" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-xl font-extrabold text-slate-900 border-b border-slate-50 py-4 no-underline outline-none decoration-transparent">
            <Sparkles className="text-codeo-green h-6 w-6" /> Engine
          </Link>
          <Link href="#pricing" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-xl font-extrabold text-slate-900 border-b border-slate-50 py-4 no-underline outline-none decoration-transparent">
            <CreditCard className="text-codeo-green h-6 w-6" /> Pricing
          </Link>
          
          <div className="mt-auto flex flex-col gap-3">
            <Link 
              href="/login" 
              onClick={() => setIsMenuOpen(false)} 
              className="w-full py-4 text-center font-extrabold text-slate-700 bg-white border-2 border-slate-200 rounded-2xl no-underline outline-none hover:bg-slate-50 hover:text-codeo-green active:bg-slate-100 transition-colors duration-200"
            >
              Log In
            </Link>
            <Link 
              href="/register" 
              onClick={() => setIsMenuOpen(false)} 
              className="w-full py-4 text-center font-extrabold text-white bg-codeo-green rounded-2xl shadow-lg no-underline outline-none hover:bg-codeo-green/90 active:bg-codeo-green/80 transition-colors duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header