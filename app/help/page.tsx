'use client'

import React from 'react'
import { Search, MessageCircle, BookOpen, Video, Mail, ArrowLeft, Zap } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header / Nav */}
      <nav className="border-b border-slate-100 bg-white py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 font-black text-xl hover:opacity-80 transition-opacity">
            <ArrowLeft className="size-5" /> Codeo <span className="text-[#07b300]">Support</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#07b300]/5 to-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">
            Comment pouvons-nous <br /> <span className="text-[#07b300]">vous aider ?</span>
          </h1>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" />
            <Input
              type="search"
              placeholder="Rechercher une solution (ex: export React...)"
              className="pl-14 h-16 text-lg rounded-[1.5rem] shadow-2xl border-none ring-1 ring-slate-200 focus-visible:ring-2 focus-visible:ring-[#07b300] bg-white"
            />
          </div>
        </div>
      </div>

      {/* Main Content / Categories */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card: Premiers pas */}
          <Link href="#" className="group">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#07b300]/30 transition-all h-full">
              <div className="bg-[#07b300]/10 p-4 rounded-2xl w-14 h-14 flex items-center justify-center mb-6">
                <BookOpen className="h-7 w-7 text-[#07b300]" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-[#07b300] transition-colors">
                Premiers pas
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed">Découvrez comment convertir votre premier design en code en moins de 2 minutes.</p>
            </div>
          </Link>

          {/* Card: Tutoriels Vidéo */}
          <Link href="#" className="group">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#07b300]/30 transition-all h-full">
              <div className="bg-[#07b300]/10 p-4 rounded-2xl w-14 h-14 flex items-center justify-center mb-6">
                <Video className="h-7 w-7 text-[#07b300]" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-[#07b300] transition-colors">
                Tutoriels vidéo
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed">Apprenez visuellement à maîtriser toutes les fonctionnalités du Vision Engine.</p>
            </div>
          </Link>

          {/* Card: Support */}
          <Link href="#" className="group">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#07b300]/30 transition-all h-full">
              <div className="bg-[#07b300]/10 p-4 rounded-2xl w-14 h-14 flex items-center justify-center mb-6">
                <MessageCircle className="h-7 w-7 text-[#07b300]" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-[#07b300] transition-colors">
                Support 24/7
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed">Notre équipe technique est là pour vous aider, peu importe votre fuseau horaire.</p>
            </div>
          </Link>
        </div>

        {/* Popular Articles List */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">Articles populaires</h2>
          <div className="divide-y divide-slate-100">
            {[
              { q: "Comment installer l'extension Codeo ?", desc: "Guide complet pour Chrome et VS Code" },
              { q: "Exporter vers Next.js et Tailwind", desc: "Configuration des fichiers et des types" },
              { q: "Gérer vos crédits de conversion", desc: "Tout savoir sur les limites de votre abonnement" }
            ].map((item, i) => (
              <Link key={i} href="#" className="group block py-6 transition-all hover:px-4 rounded-xl hover:bg-slate-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-black text-lg text-slate-900 group-hover:text-[#07b300] transition-colors">{item.q}</h3>
                    <p className="text-slate-500 font-medium">{item.desc}</p>
                  </div>
                  <Zap className="size-5 text-slate-200 group-hover:text-[#07b300] transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">Vous ne trouvez pas votre bonheur ?</h2>
            <p className="text-white/60 mb-10 max-w-xl mx-auto font-medium text-lg">
              Notre équipe d'ingénieurs support est disponible pour répondre à vos questions techniques les plus complexes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button className="h-16 px-10 bg-[#07b300] hover:bg-[#069a00] text-white font-black rounded-2xl text-lg shadow-xl shadow-[#07b300]/20">
                <Mail className="mr-2 h-5 w-5" /> Contacter le support
              </Button>
              <Button variant="outline" className="h-16 px-10 border-white/20 text-black hover:bg-dark/10 font-black rounded-2xl text-lg">
                Consulter la FAQ
              </Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#07b300] blur-[120px] opacity-20" />
        </div>
      </div>
    </div>
  );
}