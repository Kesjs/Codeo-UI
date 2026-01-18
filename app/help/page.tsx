'use client'

import React, { useEffect, useRef } from 'react'
import { 
  Search, 
  MessageCircle, 
  BookOpen, 
  Video, 
  Mail, 
  ArrowLeft, 
  Zap, 
  ChevronRight, 
  FileCode,
  ShieldCheck
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HelpPage() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Gestion du raccourci Ctrl+K / Cmd+K pour toute la page
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-codeo-green/20">
      
      {/* 1. NAVIGATION : Retour & Statut */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group no-underline">
            <ArrowLeft className="size-5 text-slate-400 group-hover:text-codeo-green transition-colors" />
            <span className="font-black text-xl tracking-tighter text-slate-900">
              Codeo <span className="text-codeo-green">Support</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest leading-none">V-AST Engine: Live</span>
          </div>
        </div>
      </nav>

      {/* 2. HERO : Recherche & Titre (Optimisé avec Ctrl+K) */}
      <div className="relative bg-gradient-to-b from-codeo-green/[0.08] via-white to-white py-20 px-6 border-b border-slate-50 overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[400px] h-[400px] bg-codeo-green/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-100 rounded-full shadow-sm mb-6">
            <Zap className="size-3 text-codeo-green fill-codeo-green" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Centre d'aide Codeo</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-10 tracking-tighter leading-[0.95] [text-wrap:balance]">
            Besoin d'un <br /> 
            <span className="text-codeo-green">coup de main ?</span>
          </h1>

          <div className="relative max-w-xl mx-auto group">
            {/* Icône isolée à gauche */}
            <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
              <Search className="h-5 w-5 text-slate-300 group-focus-within:text-codeo-green transition-colors duration-300" />
            </div>
            
            <Input
              ref={searchInputRef}
              type="search"
              placeholder="Rechercher une solution..."
              className="
                w-full h-14 text-base rounded-2xl border-slate-200 bg-white 
                focus-visible:ring-4 focus-visible:ring-codeo-green/5 focus-visible:border-codeo-green/50
                transition-all duration-300 shadow-sm
                text-center px-12 placeholder:text-slate-300 placeholder:font-medium
              "
            />
            
            {/* Badge de raccourci à droite */}
            <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 items-center gap-1 px-2 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-400 pointer-events-none">
              <span className="text-xs">⌘</span>K
            </div>
          </div>

          <p className="mt-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Appuyez sur <span className="text-slate-600">Ctrl + K</span> pour rechercher rapidement
          </p>
        </div>
      </div>

      {/* 3. CATEGORIES : Cards avec bordures légères */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Link href="#" className="group no-underline">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-codeo-green/20 transition-all h-full">
              <div className="bg-codeo-green/10 p-4 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 transition-colors group-hover:bg-codeo-green/20">
                <FileCode className="h-7 w-7 text-codeo-green" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-codeo-green transition-colors">
                Guide de démarrage
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Apprenez à transformer votre première UI en code React ou Vue en moins de 60 secondes.
              </p>
            </div>
          </Link>

          <Link href="#" className="group no-underline">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-codeo-green/20 transition-all h-full">
              <div className="bg-codeo-green/10 p-4 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 transition-colors group-hover:bg-codeo-green/20">
                <Video className="h-7 w-7 text-codeo-green" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-codeo-green transition-colors">
                Maîtrise V-AST
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Tutoriels avancés pour optimiser la reconnaissance des composants et la structure du code.
              </p>
            </div>
          </Link>

          <Link href="#" className="group no-underline">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-codeo-green/20 transition-all h-full">
              <div className="bg-codeo-green/10 p-4 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 transition-colors group-hover:bg-codeo-green/20">
                <ShieldCheck className="h-7 w-7 text-codeo-green" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-codeo-green transition-colors">
                Compte & Crédits
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Tout savoir sur la gestion de vos scans, l'abonnement Pro et la sécurisation de vos assets.
              </p>
            </div>
          </Link>
        </div>

        {/* 4. POPULAR ARTICLES */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight text-center sm:text-left">Articles populaires</h2>
          <div className="grid gap-3">
            {[
              { q: "Optimiser vos screenshots pour un scan parfait", desc: "Les bonnes pratiques de résolution et de cadrage." },
              { q: "Configuration de l'export Next.js & Tailwind", desc: "Comment intégrer directement le code dans votre projet." },
              { q: "Utilisation des variables de design (Tokens)", desc: "Paramétrer l'IA pour utiliser vos propres couleurs et typos." }
            ].map((item, i) => (
              <Link key={i} href="#" className="group flex items-center justify-between p-6 bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-200 rounded-2xl transition-all no-underline">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-codeo-green transition-colors mb-1">{item.q}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-none">{item.desc}</p>
                </div>
                <ChevronRight className="size-5 text-slate-300 group-hover:text-codeo-green transition-all group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 5. FINAL CTA */}
      <div className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-slate-950 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden border border-white/5">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Vous n'avez pas trouvé <br/> votre réponse ?</h2>
            <p className="text-slate-400 mb-10 max-w-xl mx-auto font-medium text-lg">
              Nos ingénieurs support sont disponibles 24/7 pour vous aider sur vos exports les plus complexes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="h-16 px-10 bg-codeo-green hover:bg-codeo-green/90 text-white font-black rounded-2xl text-lg shadow-xl shadow-codeo-green/20 border-none transition-transform hover:-translate-y-1">
                <Mail className="mr-2 h-5 w-5" /> Contacter le support
              </Button>
              <Button variant="outline" className="h-16 px-10 border-white/10 bg-white/5 text-white hover:bg-white/10 font-black rounded-2xl text-lg transition-all">
                Consulter la FAQ
              </Button>
            </div>
          </div>
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-codeo-green blur-[120px] opacity-20 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}