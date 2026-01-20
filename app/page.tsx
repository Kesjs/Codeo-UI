'use client'

import React, { useState, useEffect, lazy, Suspense, useRef, useCallback } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  PlayCircle,
  CheckCircle2,
  Cpu,
  Terminal,
  Layers,
  Braces,
  Smartphone,
  Globe,
  MousePointer2,
  Box,
  ShieldCheck,
  Zap,
  Image as ImageIcon,
  Code,
  Play,
  Pause,
  Copy,
  HelpCircle,
  X,
  Network,
  ChevronDown,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { twMerge } from 'tailwind-merge'

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'

// Langages
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import html from 'react-syntax-highlighter/dist/cjs/languages/prism/markup'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'

SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('html', html)
SyntaxHighlighter.registerLanguage('vue', html) // approximation acceptable
SyntaxHighlighter.registerLanguage('json', json)

// Thème personnalisé pour JSON
const jsonTheme = {
  ...vscDarkPlus,
  'code[class*="language-"]': {
    color: '#e1e4e8',
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: '13px',
    lineHeight: '1.6',
  },
  'string': { color: '#10b981' }, // Vert codeo pour les valeurs
  'number': { color: '#f59e0b' }, // Orange pour les nombres
  'boolean': { color: '#8b5cf6' }, // Violet pour les booléens
  'null': { color: '#64748b' }, // Gris pour null
  'property': { color: '#06b6d4' }, // Cyan pour les clés
  'punctuation': { color: '#94a3b8' }, // Gris clair pour la ponctuation
  'operator': { color: '#94a3b8' }, // Gris clair pour les opérateurs
  'attr-name': { color: '#06b6d4' }, // Cyan pour les noms d'attributs
  'keyword': { color: '#8b5cf6' }, // Violet pour les mots-clés
  'function': { color: '#ec4899' }, // Rose pour les fonctions
  'tag': { color: '#10b981' }, // Vert codeo pour les tags
}

const CodeBlock = lazy(() => import('@/components/CodeBlock'))

type Framework = 'html' | 'react' | 'vue'

export default function Home() {
  const [selectedFramework, setSelectedFramework] = useState<Framework>('react')
  const [isHighlighting, setIsHighlighting] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [hasScanned, setHasScanned] = useState(false)
  const [autoScroll, setAutoScroll] = useState(false)
  const [activeLangIndex, setActiveLangIndex] = useState(0)
  const [pauseLangCycle, setPauseLangCycle] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false)
  const [pricingFaqOpen, setPricingFaqOpen] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollPos = useRef(0)
  const animationFrameId = useRef<number>()

  // Données JSON à afficher
  const jsonData = {
    v_ast_configuration: {
      engine: "Neural-Vision-V2",
      version: "2.5.1",
      features: ["ai_vision", "responsive_design", "dark_mode"],
      performance: {
        accuracy: 0.998,
        speed: "fast",
        last_updated: "2024-03-15T14:30:00Z"
      },
      precision: "pixel-perfect",
      confidence: 0.998
    },
    document_tree: {
      root: {
        id: "container_0",
        visual_stack: { bg: "blue-50-to-indigo-100" },
        nodes: [
          {
            id: "header_global",
            branding: { name: "MinimalistUI" },
            navigation: ["Product", "Solutions", "Pricing", "Resources"]
          },
          {
            id: "main_hero",
            content: {
              title: "Design your future...",
              badge: "Precision Engine 2.0"
            },
            media: { src: "digital-lifestyle.svg" }
          }
        ]
      }
    },
    inferred_state: {
      hooks: ["isScrolled", "mobileOpen"]
    }
  }

  // Fonction de défilement automatique
  const scrollContent = useCallback(() => {
    if (!scrollContainerRef.current || isPaused) return

    const container = scrollContainerRef.current
    const maxScroll = container.scrollHeight - container.clientHeight

    if (scrollPos.current >= maxScroll) {
      scrollPos.current = 0
      container.scrollTop = 0
    } else {
      scrollPos.current += 0.5
      container.scrollTop = scrollPos.current
    }

    animationFrameId.current = requestAnimationFrame(scrollContent)
  }, [isPaused])

  useEffect(() => {
    if (!isPaused) {
      animationFrameId.current = requestAnimationFrame(scrollContent)
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [isPaused, scrollContent])

  const SCAN_DURATION = 2800
  const HIGHLIGHT_DURATION = 500
  const AUTO_SCROLL_START_DELAY = 500

  const languages = [
    {
      name: 'React',
      bg: 'bg-[#61DAFB]/20',
      text: 'text-[#008BB2]',
      border: 'border-[#61DAFB]/30',
      heroBg: 'rgba(97, 218, 251, 0.08)',
      glow: 'rgba(97, 218, 251, 0.2)',
    },
    {
      name: 'Vue',
      bg: 'bg-[#42B883]/20',
      text: 'text-[#338F66]',
      border: 'border-[#42B883]/30',
      heroBg: 'rgba(66, 184, 131, 0.08)',
      glow: 'rgba(66, 184, 131, 0.2)',
    },
    {
      name: 'HTML',
      bg: 'bg-[#E34F26]/20',
      text: 'text-[#C63E1B]',
      border: 'border-[#E34F26]/30',
      heroBg: 'rgba(227, 79, 38, 0.08)',
      glow: 'rgba(227, 79, 38, 0.2)',
    },
  ]

  useEffect(() => {
    if (pauseLangCycle) return
    const interval = setInterval(() => {
      setActiveLangIndex((prev) => (prev + 1) % languages.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [pauseLangCycle])

  const triggerScan = () => {
    // Faire défiler vers la section de workflow
    const workflowSection = document.getElementById('workflow-section')
    if (workflowSection) {
      workflowSection.scrollIntoView({ behavior: 'smooth' })
    }
    
    // Démarrer le scan après un court délai pour laisser le temps au défilement
    setTimeout(() => {
      setIsScanning(true)
      setHasScanned(false)
      setAutoScroll(false)

      setTimeout(() => {
        setIsScanning(false)
        setHasScanned(true)
        setIsHighlighting(true)

        setTimeout(() => {
          setIsHighlighting(false)
          setAutoScroll(true)
        }, AUTO_SCROLL_START_DELAY)
      }, SCAN_DURATION)
    }, 500) // Délai pour le défilement
  }

  const [isChanging, setIsChanging] = useState(false)
  const [isHoveringLang, setIsHoveringLang] = useState(false)

  const handleFrameworkChange = (lang: Framework) => {
    if (lang !== selectedFramework) {
      setIsChanging(true);
      setIsHighlighting(true);
      setPauseLangCycle(true); // Pause le cycle automatique

      // Animation plus douce avec un léger délai
      setTimeout(() => {
        setSelectedFramework(lang);
        
        // Réinitialisation de l'état après l'animation
        setTimeout(() => {
          setIsHighlighting(false);
          setIsChanging(false);
        }, 300); // Durée légèrement plus longue pour un effet plus doux
      }, 100);
    }
  };

  // Gestion du survol des boutons de langage
  const handleLangHover = (isHovering: boolean) => {
    setIsHoveringLang(isHovering);
    if (isHovering) {
      setPauseLangCycle(true);
    } else if (!isHovering && !isChanging) {
      // Ne reprendre le cycle que si l'utilisateur n'a pas sélectionné de langage
      setTimeout(() => setPauseLangCycle(false), 1000);
    }
  };
  const codeSnippets: Record<Framework, string> = {
    html: `<section class="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
        <header class="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md px-6 py-4">
            <div class="mx-auto flex max-w-7xl items-center justify-between">
                <div class="flex items-center space-x-2">
                    <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
                        M
                    </div>
                    <span class="text-xl font-bold tracking-tight text-slate-800">MinimalistUI</span>
                </div>

                <nav class="hidden md:flex items-center space-x-8">
                    <a href="#" class="text-sm font-semibold text-gray-600 hover:text-blue-600">Product</a>
                    <a href="#" class="text-sm font-semibold text-gray-600 hover:text-blue-600">Solutions</a>
                    <a href="#" class="text-sm font-semibold text-gray-600 hover:text-blue-600">Pricing</a>
                    <a href="#" class="text-sm font-semibold text-gray-600 hover:text-blue-600">Resources</a>
                </nav>

                <div class="flex items-center space-x-4">
                    <button class="hidden md:block rounded-2xl px-4 py-2 font-semibold text-gray-600 hover:bg-gray-50">
                        Log in
                    </button>
                    <button class="rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/20">
                        Get Started
                    </button>
                </div>
            </div>
        </header>

        <main class="mx-auto max-w-7xl px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-20 md:pt-48">
            <div class="grid items-center gap-8 sm:gap-12 lg:grid-cols-2">
                
                <div class="text-center sm:text-left">
                    <div class="mb-4 sm:mb-6 inline-flex items-center space-x-2 rounded-full border border-blue-200 bg-blue-100/50 px-3 sm:px-4 py-1 sm:py-1.5">
                        <span class="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-pulse rounded-full bg-blue-600"></span>
                        <span class="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-700">
                            New: Precision Engine 2.0
                        </span>
                    </div>

                    <h1 class="mb-4 sm:mb-6 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-slate-800 px-2 sm:px-0">
                        <span class="block sm:inline">Design your future</span>{' '}
                        <span class="text-blue-600 block sm:inline">with precision</span>
                    </h1>

                    <p class="mb-8 sm:mb-10 max-w-xl text-sm xs:text-base sm:text-lg md:text-xl leading-relaxed text-gray-600 px-2 sm:px-0">
                        Experience the power of modern minimalism with a tool built for professionals. Streamline your workflow and elevate your results today.
                    </p>

                    <div class="flex flex-col gap-4 sm:flex-row px-4 sm:px-0">
                        <button class="rounded-2xl bg-blue-600 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold text-white shadow-xl shadow-blue-600/20 transition-transform hover:scale-105">
                            Get Started for Free
                        </button>
                        <button class="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-4 text-lg font-bold text-slate-800 transition-all hover:bg-gray-50">
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            Watch Demo
                        </button>
                    </div>
                </div>

                <div class="relative flex justify-center lg:justify-end">
                    <div class="relative w-full max-w-lg">
                        <div class="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl"></div>
                        
                        <div class="relative rounded-3xl border border-white/50 bg-white/30 p-4 backdrop-blur-sm shadow-2xl">
                            <img 
                                src="https://illustrations.popsy.co/amber/digital-lifestyle.svg" 
                                alt="Illustration Hero" 
                                class="h-auto w-full rounded-2xl"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </main>
    </section>`,

    react: `const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      <header className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
              M
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">MinimalistUI</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-semibold text-gray-600 hover:text-blue-600">Product</a>
            <a href="#" className="text-sm font-semibold text-gray-600 hover:text-blue-600">Solutions</a>
            <a href="#" className="text-sm font-semibold text-gray-600 hover:text-blue-600">Pricing</a>
            <a href="#" className="text-sm font-semibold text-gray-600 hover:text-blue-600">Resources</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="hidden md:block rounded-2xl px-4 py-2 font-semibold text-gray-600 hover:bg-gray-50">
              Log in
            </button>
            <button className="rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/20">
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pt-32 pb-20 md:pt-48">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          <div className="text-left">
            <div className="mb-6 inline-flex items-center space-x-2 rounded-full border border-blue-200 bg-blue-100/50 px-4 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
                New: Precision Engine 2.0
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-black leading-[1.1] text-slate-800 md:text-7xl">
              Design your future <br />
              <span className="text-blue-600">with precision</span>
            </h1>

            <p className="mb-10 max-w-xl text-xl leading-relaxed text-gray-600">
              Experience the power of modern minimalism with a tool built for professionals. Streamline your workflow and elevate your results today.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-blue-600/20 transition-transform hover:scale-105">
                Get Started for Free
              </button>
              <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-4 text-lg font-bold text-slate-800 transition-all hover:bg-gray-50">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Watch Demo
              </button>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl"></div>
              
              <div className="relative rounded-3xl border border-white/50 bg-white/30 p-4 backdrop-blur-sm shadow-2xl">
                <img 
                  src="https://illustrations.popsy.co/amber/digital-lifestyle.svg" 
                  alt="Illustration Hero" 
                  className="h-auto w-full rounded-2xl"
                />
              </div>
            </div>
          </div>

        </div>
      </main>
    </section>
  );
};

export default HeroSection;`,

    vue: `<template>
  <section class="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
    <header class="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md px-6 py-4">
      <div class="mx-auto flex max-w-7xl items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
            M
          </div>
          <span class="text-xl font-bold tracking-tight text-slate-800">MinimalistUI</span>
        </div>

        <nav class="hidden md:flex items-center space-x-8">
          <a href="#" class="text-sm font-semibold text-gray-600 hover:text-blue-600">Product</a>
          <a href="#" class="text-sm font-semibold text-gray-600 hover:text-blue-600">Solutions</a>
          <a href="#" class="text-sm font-semibold text-gray-600 hover:text-blue-600">Pricing</a>
          <a href="#" class="text-sm font-semibold text-gray-600 hover:text-blue-600">Resources</a>
        </nav>

        <div class="flex items-center space-x-4">
          <button class="hidden md:block rounded-2xl px-4 py-2 font-semibold text-gray-600 hover:bg-gray-50">
            Log in
          </button>
          <button class="rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/20">
            Get Started
          </button>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-7xl px-6 pt-32 pb-20 md:pt-48">
      <div class="grid items-center gap-12 lg:grid-cols-2">
        
        <div class="text-left">
          <div class="mb-6 inline-flex items-center space-x-2 rounded-full border border-blue-200 bg-blue-100/50 px-4 py-1.5">
            <span class="h-2 w-2 animate-pulse rounded-full bg-blue-600"></span>
            <span class="text-xs font-bold uppercase tracking-widest text-blue-700">
              New: Precision Engine 2.0
            </span>
          </div>

          <h1 class="mb-6 text-5xl font-black leading-[1.1] text-slate-800 md:text-7xl">
            Design your future <br />
            <span class="text-blue-600">with precision</span>
          </h1>

          <p class="mb-10 max-w-xl text-xl leading-relaxed text-gray-600">
            Experience the power of modern minimalism with a tool built for professionals. Streamline your workflow and elevate your results today.
          </p>

          <div class="flex flex-col gap-4 sm:flex-row">
            <button class="rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-blue-600/20 transition-transform hover:scale-105">
              Get Started for Free
            </button>
            <button class="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-4 text-lg font-bold text-slate-800 transition-all hover:bg-gray-50">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              Watch Demo
            </button>
          </div>
        </div>

        <div class="relative flex justify-center lg:justify-end">
          <div class="relative w-full max-w-lg">
            <div class="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl"></div>
            
            <div class="relative rounded-3xl border border-white/50 bg-white/30 p-4 backdrop-blur-sm shadow-2xl">
              <img 
                src="https://illustrations.popsy.co/amber/digital-lifestyle.svg" 
                alt="Illustration Hero" 
                class="h-auto w-full rounded-2xl"
              />
            </div>
          </div>
        </div>

      </div>
    </main>
  </section>
</template>`
  }

  return (
    <div className="min-h-screen bg-codeo-light-bg font-sans text-slate-900 selection:bg-codeo-green/30">
      <main className="bg-codeo-light-bg">
        {/* HERO SECTION */}
 <section
  id="/"
  className="relative pt-16 pb-16 md:pt-24 md:pb-24 overflow-hidden text-center transition-colors duration-500"
  style={{ backgroundColor: languages[activeLangIndex].heroBg }}
  onMouseEnter={() => setPauseLangCycle(true)}
  onMouseLeave={() => setPauseLangCycle(false)}
>
  {/* Glow Background */}
  <div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[700px] md:h-[700px] blur-[80px] md:blur-[140px] rounded-full transition-colors duration-1000 opacity-20 pointer-events-none"
    style={{ backgroundColor: languages[activeLangIndex].glow }}
  />

  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="flex flex-col items-center -mt-8">
      
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 text-codeo-green text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-0 animate-fade-in">
        <Sparkles className="size-3 md:size-4" /> Vision Engine AI v1.0.0
      </div>

      {/* Main Title */}
      <h1 className="text-slate-900 tracking-tighter text-4xl sm:text-6xl lg:text-7xl xl:text-[90px] font-black leading-[1.1] md:leading-[0.95] max-w-[1100px] [text-wrap:balance] mt-12">
        L'intelligence visuelle au service de <span className="text-codeo-green">vos pixels.</span>
      </h1>

      {/* Description & Dynamic Switcher */}
      <div className="mt-6 max-w-[900px]">
        <p className="text-slate-500 text-base sm:text-lg md:text-2xl font-medium leading-relaxed [text-wrap:balance]">
          Propulsé par notre moteur de vision propriétaire, donnez vie à vos designs en convertissant vos captures d'écran UI en composants
          
          {/* Wrapper pour le bouton dynamique pour qu'il ne casse pas la ligne n'importe comment */}
          <span className="inline-block mx-2 align-middle">
            <div 
              className="relative inline-flex items-center justify-center w-[90px] md:w-[110px] h-7 md:h-9 overflow-hidden rounded-lg border border-slate-200/50 bg-white/30 backdrop-blur-sm shadow-sm transition-all duration-200"
              onMouseEnter={() => handleLangHover(true)}
              onMouseLeave={() => handleLangHover(false)}
              style={{ backgroundColor: `${languages[activeLangIndex].glow}30` }}
            >
              {languages.map((lang, index) => {
                const isActive = activeLangIndex === index;
                const isNext = activeLangIndex === (index - 1 + languages.length) % languages.length;
                const isPrevious = activeLangIndex === (index + 1) % languages.length;
                
                return (
                  <button
                    key={lang.name}
                    type="button"
                    onClick={() => {
                      setActiveLangIndex(index);
                      handleFrameworkChange(lang.name.toLowerCase() as Framework);
                    }}
                    className={twMerge(
                      'absolute inset-0 flex items-center justify-center text-[9px] md:text-xs font-black uppercase tracking-widest transition-all duration-500 ease-[cubic-bezier(0.4, 0, 0.2, 1)]',
                      lang.text,
                      isActive 
                        ? 'translate-y-0 opacity-100 scale-100 z-10'
                        : isNext ? 'translate-y-full opacity-0 scale-95' : '-translate-y-full opacity-0 scale-95'
                    )}
                  >
                    {lang.name}
                  </button>
                );
              })}
            </div>
          </span>
          
          propres et optimisés.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full sm:w-auto px-4">
        <Button
          onClick={triggerScan}
          className="w-full sm:w-auto h-14 px-10 bg-codeo-green text-white text-lg font-black rounded-xl shadow-lg shadow-codeo-green/20 hover:shadow-codeo-green/40 hover:-translate-y-1 transition-all active:scale-95"
        >
          Lancer le Scan <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button 
          variant="outline" 
          className="w-full sm:w-auto h-14 px-10 bg-white/80 backdrop-blur-sm text-slate-800 text-lg font-black rounded-xl border-slate-200 hover:bg-slate-50 transition-all"
        >
          Documentation
        </Button>
      </div>
    </div>
  

            {/* WORKFLOW SECTION */}
            <section id="workflow-section" className="py-10 md:py-20">
              <div className="relative w-full max-w-6xl mx-auto px-4">
                <div className="rounded-lg overflow-hidden shadow-xl bg-gray-50">
                  <div className="flex flex-col lg:grid lg:grid-cols-2 lg:divide-x lg:divide-slate-100 lg:h-[750px] min-h-[600px] overflow-hidden">
                    {/* LEFT - IMAGE */}
                    <div className="p-6 bg-white flex flex-col h-full relative overflow-hidden">
                      <div className="flex-grow relative rounded-md bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center group">
                        <img
                          src="/images/screen.png"
                          className={`w-full h-full object-contain p-8 transition-all duration-700 ${isScanning ? 'opacity-40 blur-[2px]' : 'opacity-100'}`}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/800x800/f8fafc/94a3b8?text=Minimalist+Blue+UI'
                          }}
                        />

                        {isScanning && (
                          <div className="absolute top-0 left-0 w-full h-[3px] bg-blue-500 shadow-[0_0_20px_#3b82f6] z-30 animate-scan-line" />
                        )}

                        {!isScanning && !hasScanned && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm transition-opacity">
                            <Button
                              onClick={triggerScan}
                              className="bg-codeo-green hover:bg-codeo-green/90 text-white font-bold rounded-md px-8 shadow-md hover:shadow-codeo-green/20 transition-all duration-300"
                            >
                              Analyser le design
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* RIGHT - CODE */}
                    <div className="p-4 md:p-6 bg-[#0d1117] flex flex-col h-full relative overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-blue-500/10 pointer-events-none transition-opacity duration-700 z-50 ${isHighlighting ? 'opacity-100' : 'opacity-0'}`}
                      />

                      <div className="flex items-center justify-between mb-4 z-30 sticky top-0 bg-[#0d1117]/95 backdrop-blur-md px-2 py-3 border-b border-white/5">
                        <div className="flex gap-1.5 bg-white/5 p-1 rounded-md border border-white/5">
                          {(['html', 'react', 'vue'] as Framework[]).map((lang) => {
                            const langIndex = lang === 'react' ? 0 : lang === 'vue' ? 1 : 2
                            const langData = languages[langIndex]

                            return (
                              <button
                                key={lang}
                                onClick={() => handleFrameworkChange(lang)}
                                className={twMerge(
                                  'px-4 py-1.5 text-[10px] font-black rounded-md transition-all duration-300 ease-in-out transform',
                                  selectedFramework === lang
                                    ? `${langData.bg} ${langData.text} shadow-md scale-105`
                                    : 'text-slate-400 hover:text-white hover:bg-white/10 hover:scale-95',
                                  isChanging ? 'opacity-70' : 'opacity-100'
                                )}
                                style={{
                                  textShadow: selectedFramework === lang ? `0 0 8px ${langData.glow}` : 'none',
                                  outline: 'none',
                                  WebkitTapHighlightColor: 'transparent'
                                }}
                              >
                                {lang.toUpperCase()}
                              </button>
                            )
                          })}
                        </div>
                        <div className="flex gap-2.5">
                          <div className="size-3.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444aa]" />
                          <div className="size-3.5 rounded-full bg-yellow-500 shadow-[0_0_8px_#eab308aa]" />
                          <div className="size-3.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55eaa]" />
                        </div>
                      </div>

                      <div
                        className="
                          flex-grow overflow-y-auto relative z-20 
                          rounded-md border border-white/5 bg-black/30
                          scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-900
                          h-auto min-h-[300px] md:h-[65vh]
                        "
                      >
                        {hasScanned ? (
                          <Suspense fallback={<div className="h-full flex items-center justify-center text-white/50 pt-10">Chargement du code...</div>}>
                            <CodeBlock
                              code={codeSnippets[selectedFramework]}
                              framework={selectedFramework}
                              autoScroll={autoScroll}
                            />
                          </Suspense>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-center p-10">
                            <Terminal
                              className={`size-12 mb-4 transition-colors ${isScanning ? 'text-blue-500 animate-pulse' : 'text-white/10'}`}
                            />
                            <p className="text-white/20 text-xs font-black uppercase tracking-widest leading-relaxed whitespace-pre-line">
                              {isScanning
                                ? 'Moteur de vision actif...\nExtraction des composants'
                                : "En attente de l'analyse visuelle"}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-32 bg-codeo-light-bg">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter">
                Conçu pour l'excellence.
              </h2>
              <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
                Codeo UI automatise les tâches répétitives pour vous permettre de vous concentrer sur ce qui compte vraiment : l'innovation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                {
                  title: 'Production Ready',
                  desc: 'Pas de "div soup". Un code sémantique qui respecte les meilleures pratiques SEO et Accessibilité.',
                  icon: <ShieldCheck className="size-8" />,
                },
                {
                  title: 'Multi-Framework',
                  desc: 'Un design, trois technos. Exportez vers React, Vue.js ou HTML sémantique sans effort.',
                  icon: <Globe className="size-8" />,
                },
                {
                  title: 'Design Tokens',
                  desc: 'Extraction automatique de vos couleurs, polices et espacements vers un fichier tailwind.config.js.',
                  icon: <Box className="size-8" />,
                },
                {
                  title: 'Responsive Auto',
                  desc: 'Le moteur détecte les intentions de mise en page pour générer des grilles Flexbox/Grid adaptatives.',
                  icon: <Smartphone className="size-8" />,
                },
                {
                  title: 'Analyse V-AST',
                  desc: 'Le passage par un arbre de syntaxe visuelle garantit une précision de conversion de 99.8%.',
                  icon: <Cpu className="size-8" />,
                },
                {
                  title: 'Zéro Dépendance',
                  desc: 'Le code généré est standard. Vous n\'avez pas besoin d\'installer de bibliothèque propriétaire.',
                  icon: <Code className="size-8" />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-md bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col"
                >
                  <div className="size-10 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-codeo-green group-hover:bg-codeo-green/5 group-hover:border-codeo-green/20 transition-all mb-3 shadow-sm">
                    {React.cloneElement(item.icon, { className: 'size-6' })}
                  </div>
                  <h3 className="text-lg font-black mb-3 text-slate-800 tracking-tight">{item.title}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mt-auto">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENGINE */}
        <section id="engine" className="py-32 bg-codeo-light-bg border-y border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-50 rounded-md blur-3xl opacity-50 -z-10" />

          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="lg:w-1/2">
                <div className="flex items-center gap-4 mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-200 text-slate-600 text-xs font-black uppercase tracking-widest">
                    <Terminal className="size-3" /> Technical Deep-Dive
                  </div>
                  <button
                    onClick={() => setIsHowItWorksOpen(true)}
                    className="px-3 py-1 text-xs text-slate-500 hover:text-codeo-green hover:bg-codeo-green/10 hover:shadow hover:shadow-codeo-green/10 hover:scale-105 border border-slate-200 hover:border-codeo-green/50 rounded-md transition-all duration-300 ease-out flex items-center gap-1.5 relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-codeo-green/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                    <HelpCircle className="size-3 relative z-10 group-hover:rotate-12 transition-transform duration-300" /> 
                    <span className="relative z-10">How it works</span>
                  </button>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-10 tracking-tighter leading-[1.05]">
                  Sous le capot <br /> du moteur.
                </h2>

                <div className="space-y-10">
                  <div className="flex gap-8 group">
                    <div className="mt-1 size-14 shrink-0 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-codeo-green shadow-sm group-hover:bg-[#09d600] group-hover:text-white group-hover:border-[#09d600] transition-all duration-300">
                    <Layers className="size-7" />  
                    </div>
                    <div>
                      <h4 className="font-black text-2xl mb-2 text-slate-800">1. Déconstruction & V-AST</h4>
                      <p className="text-slate-500 font-medium leading-relaxed">
                        L'IA analyse l'image et génère un <span className="text-codeo-green font-bold">V-AST (Visual Abstract Syntax Tree)</span>. C'est l'ADN logique de votre UI (le JSON à droite) qui définit chaque structure avant même d'écrire une ligne de code.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-8 group">
                    <div className="mt-1 size-14 shrink-0 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-codeo-green shadow-sm group-hover:bg-[#09d600] group-hover:text-white group-hover:border-[#09d600] transition-all duration-300">
                      <Code className="size-7" />
                    </div>
                    <div>
                      <h4 className="font-black text-2xl mb-2 text-slate-800">2. Compilation React & Tailwind</h4>
                      <p className="text-slate-500 font-medium leading-relaxed">
                        Notre moteur traduit instantanément cet arbre logique en code React prêt pour la production. Ce n'est pas du texte brut, mais des composants structurés, utilisant Tailwind CSS pour le style et intégrant la logique interactive (états, transitions, réactivité).                      </p>
                    </div>
                  </div>

                  <div className="flex gap-8 group">
                    <div className="mt-1 size-14 shrink-0 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-codeo-green shadow-sm group-hover:bg-[#09d600] group-hover:text-white group-hover:border-[#09d600] transition-all duration-300">
                      <MousePointer2 className="size-7" />
                    </div>
                    <div>
                      <h4 className="font-black text-2xl mb-2 text-slate-800">3. Connectivité interactive native</h4>
                      <p className="text-slate-500 font-medium leading-relaxed">
    Le moteur ne se contente pas de coder des boutons, il pré-câble l'expérience utilisateur. Il déduit les zones de clic et les champs de saisie, générant un code qui réagit déjà aux intentions de l'utilisateur, transformant un simple export en un prototype fonctionnel.                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 w-full">
                <div className="bg-[#0a0a0b] rounded-xl overflow-hidden shadow-xl border border-white/5 relative">
                  <div className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-blue-900/30 to-blue-800/10 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Terminal className="size-5 text-blue-400" />
                        <div className="absolute -inset-1 bg-blue-400/20 rounded-full blur-sm opacity-70" />
                      </div>
                      <h3 className="text-sm font-black tracking-wider text-blue-300 uppercase">
                        V-AST JSON TREE
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsPaused(!isPaused)}
                        className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5"
                        title={isPaused ? 'Activer le défilement' : 'Mettre en pause'}
                      >
                        {isPaused ? <Play className="size-4" /> : <Pause className="size-4" />}
                      </button>
                      <button
                        onClick={() => navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2))}
                        className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5"
                        title="Copier le JSON"
                      >
                        <Copy className="size-4" />
                      </button>
                    </div>
                  </div>

                  <div
                    ref={scrollContainerRef}
                    className="p-8 h-[600px] font-mono text-[13px] overflow-auto bg-gradient-to-b from-black/60 to-black/40 json-scroll"
                    onWheel={(e) => {
                      if (e.deltaY !== 0 && !isPaused) setIsPaused(true)
                    }}
                  >
                    <SyntaxHighlighter
                      language="json"
                      style={jsonTheme}
                      customStyle={{ 
                        margin: 0, 
                        padding: 0, 
                        backgroundColor: 'transparent', 
                        fontSize: '13px', 
                        lineHeight: '1.6',
                        fontFamily: '"JetBrains Mono", monospace'
                      }}
                    >
                      {JSON.stringify(jsonData, null, 2)}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-32 bg-codeo-light-bg">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-black text-slate-900 mb-20 tracking-tighter">
              Échellez votre production.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {[
                { 
                  name: 'Starter', 
                  price: '0', 
                  feat: ['10 Scans IA / mois', 'Moteur V-AST Standard', 'Exports React & HTML', 'Code sémantique optimisé'] 
                },
                {
                  name: 'Pro',
                  price: '49',
                  feat: [
                    'Scans V-AST illimités', 
                    'React, Vue & HTML sémantique', 
                    'Accès prioritaire aux serveurs GPU', 
                    'Support des designs complexes', 
                    'Svelte (Prochainement)'
                  ],
                  popular: true,
                },
                {
                  name: 'Business',
                  price: '149',
                  feat: [
                    'Tout le contenu du plan Pro',
                    'Équipes (jusqu\'à 10 users)', 
                    'SSO & Sécurité avancée', 
                    'Entraînement V-AST personnalisé', 
                    'Support dédié 24/7', 
                    'Export de Design System complet',
                    'Intégration avec les outils de gestion de projet',
                    'Analyse de sécurité avancée'
                  ],
                },
              ].map((plan, i) => (
                <div
                  key={i}
                  className={twMerge(
                    'p-8 rounded-2xl bg-white border transition-all duration-300 flex flex-col h-full',
                    plan.popular ? 'border-codeo-green shadow-lg relative z-10' : 'border-slate-100'
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-codeo-green text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      Le plus utilisé
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-2xl font-black mb-4 text-slate-900">{plan.name}</h3>
                    <div className="text-4xl font-black mb-6 text-slate-900">
                      {plan.price}€<span className="text-sm font-bold text-slate-400">/mo</span>
                    </div>
                    <ul className="space-y-3 mb-6 text-left">
                      {plan.feat.map((f, j) => (
                        <li key={j} className="flex items-start gap-3 text-slate-600 text-sm">
                          <CheckCircle2 className="size-5 text-codeo-green shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    className={twMerge(
                      'w-full rounded-xl py-3 font-bold text-base transition-all mt-auto',
                      plan.popular
                        ? 'bg-codeo-green text-white hover:opacity-90 shadow-lg shadow-codeo-green/20'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                    )}
                  >
                    Choisir ce plan
                  </Button>
                </div>
              ))}
            </div>
            
            {/* Icône explicative animée vers FAQ */}
            <div className="mt-12 max-w-3xl mx-auto flex justify-center">
              <button 
                onClick={() => {
                  document.getElementById('faq-pricing')?.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => setPricingFaqOpen(true), 500);
                }}
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-codeo-green/10 border border-codeo-green/20 hover:bg-codeo-green/20 transition-all duration-300"
              >
                <div className="size-5 rounded-full bg-codeo-green flex items-center justify-center">
                  <HelpCircle className="size-3 text-white group-hover:animate-pulse" />
                </div>
                <span className="text-xs font-black text-codeo-green group-hover:text-slate-700 transition-colors">
                  Qu'est-ce qu'un Scan IA ?
                </span>
                <ArrowRight className="size-3 text-codeo-green group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* FAQ Pricing */}
            <div id="faq-pricing" className="mt-16 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <button 
                  onClick={() => setPricingFaqOpen(!pricingFaqOpen)}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="size-5 text-slate-400 group-hover:text-codeo-green transition-colors" />
                    <h3 className="text-lg font-black text-slate-900">FAQ Pricing</h3>
                  </div>
                  <ChevronDown className={`size-5 text-slate-400 transition-transform duration-300 ${pricingFaqOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {pricingFaqOpen && (
                  <div className="px-8 pb-8 border-t border-slate-100">
                    <div className="grid md:grid-cols-2 gap-8 mt-8">
                      <div>
                        <h4 className="font-black text-slate-800 mb-3 flex items-center gap-2">
                          <div className="size-8 rounded-lg bg-codeo-green/10 flex items-center justify-center">
                            <Zap className="size-4 text-codeo-green" />
                          </div>
                          Qu'est-ce qu'un "Scan IA" ?
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                          Un scan correspond à l'analyse d'une image par notre moteur Vision. Une fois qu'une image est scannée, 
                          vous pouvez générer le code (React, Vue ou HTML) autant de fois que vous le souhaitez sans consommer 
                          de crédit supplémentaire.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-black text-slate-800 mb-3 flex items-center gap-2">
                          <div className="size-8 rounded-lg bg-codeo-green/10 flex items-center justify-center">
                            <Cpu className="size-4 text-codeo-green" />
                          </div>
                          Pourquoi des crédits plutôt que des exports ?
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                          Notre technologie V-AST mobilise une puissance de calcul GPU importante pour garantir une précision 
                          de 99.8%. Le système de crédits nous permet de garantir cette haute fidélité pour chaque analyse.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-codeo-light-bg rounded-xl border border-codeo-green/20">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="size-5 text-codeo-green shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-black text-slate-800 mb-2 text-sm">Notre avantage concurrentiel</h5>
                          <p className="text-slate-600 text-xs leading-relaxed font-medium">
                            <span className="font-bold text-codeo-green">Scannez une fois, exportez partout.</span> 
                            Contrairement à nos concurrents qui facturent chaque export, Codeo UI vous donne la liberté 
                            de générer du code pour tous les frameworks sans coût additionnel après l'analyse initiale.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-[#07b300] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-[#09d600] to-[#07b300]" />
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-24 h-24 border-4 border-white rounded-full animate-pulse" />
            <div className="absolute bottom-20 right-[10%] w-32 h-32 border border-white/40 rotate-12" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 text-white/90 text-[10px] font-bold uppercase tracking-widest mb-8 backdrop-blur-sm border border-white/10">
                <Sparkles className="size-3" /> Rejoignez +12k développeurs
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-[1.1]">
                Transformez vos designs <br className="hidden md:block" />
                <span className="text-black/20">en code de production.</span>
              </h2>
              <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">
                Ne perdez plus de temps à coder des interfaces à la main. Laissez notre Vision Engine s'en charger avec une précision pixel-perfect.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <Link href="/register">
                  <Button className="group h-14 px-10 bg-white text-slate-900 text-lg font-black rounded-xl shadow-lg hover:scale-105 hover:bg-slate-50 transition-all duration-300">
                    Démarrer gratuitement
                    <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <button className="flex items-center gap-3 text-white font-bold text-lg hover:text-white/80 transition-colors group">
                  <div className="size-10 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:bg-white/10 transition-all">
                    <PlayCircle className="h-6 w-6" />
                  </div>
                  Voir la démo
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal How It Works */}
      {isHowItWorksOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-md"
          onClick={() => setIsHowItWorksOpen(false)}
        >
          <div 
            className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 rounded-t-3xl z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-900">How Codeo UI Works</h3>
                <button
                  onClick={() => setIsHowItWorksOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X className="size-5 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-12">
              <div className="text-center mb-8">
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Notre technologie V-AST (Visual Abstract Syntax Tree) est la clé qui garantit une conversion parfaite de vos designs en code, sans erreurs structurelles.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-16">
                {/* Step 1 */}
                <div className="flex gap-8 items-start">
                  <div className="shrink-0 size-20 rounded-2xl bg-blue-100 border-2 border-blue-200 flex items-center justify-center">
                    <ImageIcon className="size-10 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-black text-slate-900 mb-3">Étape 1 : Visual Input</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Notre moteur de vision analyse votre capture d'écran UI pour extraire chaque élément visuel : 
                      composants, typographie, couleurs, espacements et hiérarchie. L'IA identifie les patterns de design 
                      et comprend l'intention derrière chaque élément.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-8 items-start">
                  <div className="shrink-0 size-20 rounded-2xl bg-codeo-green/10 border-2 border-codeo-green/30 flex items-center justify-center">
                    <Network className="size-10 text-codeo-green" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-black text-slate-900 mb-3">Étape 2 : V-AST Bridge</h4>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      C'est ici que la magie opère. Le V-AST transforme les éléments visuels en une structure logique 
                      abstraite. Pensez-y comme le <span className="font-bold text-blue-600">"plan d'architecte"</span> de votre UI.
                    </p>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <p className="text-sm text-slate-600">
                        <strong className="text-codeo-green">Pourquoi c'est crucial :</strong> Le V-AST agit comme une couche de validation 
                        qui empêche les "hallucinations" de l'IA. Chaque composant doit respecter une structure sémantique 
                        avant d'être converti en code, garantissant ainsi une précision de 99.8%.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-8 items-start">
                  <div className="shrink-0 size-20 rounded-2xl bg-purple-100 border-2 border-purple-200 flex items-center justify-center">
                    <Code className="size-10 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-black text-slate-900 mb-3">Étape 3 : Code Generation</h4>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      Le compilateur traduit le V-AST en code React/Tailwind production-ready. Chaque nœud devient un 
                      composant optimisé avec :
                    </p>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-codeo-green" />
                        <span>Classes Tailwind sémantiques et responsives</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-codeo-green" />
                        <span>Structure React optimisée avec hooks d'état</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-codeo-green" />
                        <span>Logique interactive et transitions fluides</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center pt-8 border-t border-slate-200">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-codeo-green/10 text-codeo-green text-sm font-black mb-4">
                  <ShieldCheck className="size-4" />
                  Résultat : Code production-ready, zéro erreur structurelle
                </div>
                <p className="text-slate-600 text-sm font-medium italic">
                  "Passez du screenshot au déploiement en moins de 30 secondes."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes scan-line {
          0% { top: 0; opacity: 0; background-color: #09d600; }
          10% { opacity: 1; background-color: #09d600; }
          90% { opacity: 1; background-color: #09d600; }
          100% { top: 100%; opacity: 0; background-color: #09d600; }
        }
        .animate-scan-line {
          animation: scan-line 2.8s linear infinite;
        }
        html { scroll-behavior: smooth; }
        
        /* Hide scrollbar for V-AST JSON */
        .json-scroll::-webkit-scrollbar { 
          display: none; 
        }
        .json-scroll { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
      `}</style>
    </div>
  )
}