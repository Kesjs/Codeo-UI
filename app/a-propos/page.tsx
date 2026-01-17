'use client'

import React from 'react'
import { Zap, Users, Target, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AproposPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Bouton de retour */}
      <div className="container mx-auto px-6 pt-6">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-[#07b300] transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Retour à l'accueil
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#07b300]/10 text-[#07b300] text-xs font-black uppercase tracking-widest mb-8">
            Notre Mission
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
            Réinventer la création <br /> 
            <span className="text-[#07b300]">de logiciels.</span>
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed">
            Codeo UI est né d'une frustration simple : le fossé entre le design et le code est trop large. 
            Nous utilisons l'IA pour combler ce vide et permettre aux créateurs de construire plus vite que jamais.
          </p>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: "Précision Visionnaire", 
                desc: "Notre Vision Engine ne se contente pas de copier, il comprend la structure profonde de vos UI.",
                icon: <Target className="size-8 text-[#07b300]" />
              },
              { 
                title: "Pour les Développeurs", 
                desc: "Pas de code 'poubelle'. Nous générons du code sémantique, propre et prêt pour la production.",
                icon: <Zap className="size-8 text-[#07b300]" />
              },
              { 
                title: "Éthique & Sécurité", 
                desc: "Vos designs vous appartiennent. Nous garantissons une confidentialité totale de vos données.",
                icon: <ShieldCheck className="size-8 text-[#07b300]" />
              }
            ].map((val, i) => (
              <div key={i} className="space-y-4">
                <div className="size-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
                  {val.icon}
                </div>
                <h3 className="text-2xl font-black">{val.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-6">Rejoignez l'aventure Codeo</h2>
            <p className="text-white/60 mb-10 max-w-xl mx-auto font-medium">
              Nous sommes une équipe passionnée par l'IA et le futur du web. 
              Construisons ensemble la prochaine génération d'outils.
            </p>
            <Link href="/">
              <Button className="h-16 px-10 bg-[#07b300] hover:bg-[#069a00] text-white font-black rounded-2xl text-lg transition-all">
                Démarrer maintenant <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
          <Zap className="absolute -right-10 -bottom-10 size-64 text-white/5 rotate-12" />
        </div>
      </section>
    </div>
  )
}