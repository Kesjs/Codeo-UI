'use client'

import React from 'react'
import { ArrowLeft, Scale, Building2, Globe, Mail, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function MentionsLegales() {
  const sections = [
    {
      title: "1. Éditeur du Site",
      icon: <Building2 className="size-5" />,
      content: `Le site Codeo UI est édité par la société Codeo Technologies, Société par Actions Simplifiée (SAS) au capital de 10 000 €, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 123 456 789.
      
      Siège social : 123 rue de l'Innovation, 75001 Paris, France.
      Représentant légal : Direction Générale Codeo.`
    },
    {
      title: "2. Hébergement",
      icon: <Globe className="size-5" />,
      content: `Le site et les services Codeo sont hébergés par :
      Vercel Inc.
      440 N Barranca Ave #4133
      Covina, CA 91723
      États-Unis
      Site web : https://vercel.com`
    },
    {
      title: "3. Propriété Intellectuelle",
      icon: <ShieldCheck className="size-5" />,
      content: `L'ensemble de ce site, notamment les textes, logos, tableaux, graphismes, images et icônes, ainsi que le Vision Engine de Codeo, sont la propriété exclusive de Codeo Technologies.
      
      Toute reproduction, représentation, modification ou adaptation totale ou partielle du site est strictement interdite sans autorisation écrite préalable.`
    },
    {
      title: "4. Contactez-nous",
      icon: <Mail className="size-5" />,
      content: `Pour toute question concernant les mentions légales ou l'utilisation du service, vous pouvez nous contacter :
      • Par email : legal@codeo.ui
      • Par courrier : Codeo Technologies, 123 rue de l'Innovation, 75001 Paris.`
    }
  ]

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group transition-all">
            <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-black text-xl tracking-tighter">Codeo <span className="text-[#07b300]">Legal</span></span>
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Scale className="size-4 text-[#07b300]" /> Transparence & Droit
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">Mentions <span className="text-[#07b300]">Légales.</span></h1>
          <p className="text-slate-500 font-medium text-lg">Dernière mise à jour : Janvier 2026</p>
        </div>

        {/* Legal Grid */}
        <div className="grid gap-8">
          {sections.map((section, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-[#07b300]/20 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-[#07b300]">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-black tracking-tight">{section.title}</h2>
              </div>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-20 p-8 bg-[#07b300]/5 rounded-[2rem] border border-[#07b300]/10 text-center">
          <p className="text-slate-500 font-medium italic">
            "Le code est un outil puissant, la loi est son cadre."
          </p>
        </div>
      </main>
    </div>
  )
}