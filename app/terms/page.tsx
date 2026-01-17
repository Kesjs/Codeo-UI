'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, FileText, Shield, Users, CreditCard, Zap, Gavel, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function TermsPage() {
  const sections = [
    {
      title: '1. Acceptation des conditions',
      content: `En accédant et en utilisant Codeo UI, vous acceptez d'être lié par les présentes conditions. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.`
    },
    {
      title: '2. Description du service',
      content: `Codeo est un service propulsé par l'IA qui convertit des captures d'écran UI en code. Nous fournissons des outils pour automatiser la génération de composants React/Tailwind à partir de designs visuels.`
    },
    {
      title: '3. Comptes Utilisateurs',
      content: `• Vous devez avoir au moins 13 ans pour utiliser ce service.
• Vous êtes responsable de la confidentialité de votre compte.
• Codeo se réserve le droit de suspendre tout compte violant ces règles.`
    },
    {
      title: '4. Propriété Intellectuelle',
      content: `5.1. Le service et son contenu original restent la propriété exclusive de Codeo.
5.2. Vous détenez la propriété exclusive du code généré via notre service pour vos projets.
5.3. Vous nous accordez une licence limitée pour analyser vos inputs anonymisés afin d'améliorer la précision de notre Vision Engine.`
    },
    {
      title: '5. Services Payants',
      content: `• Codeo propose des plans gratuits et des abonnements payants.
• Les abonnements sont facturés à l'avance (mensuel ou annuel).
• Sauf mention contraire, les frais sont non remboursables.`
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group transition-all">
            <Button variant="ghost" size="icon" className="rounded-xl group-hover:bg-[#07b300]/10">
              <ArrowLeft className="h-5 w-5 group-hover:text-[#07b300]" />
            </Button>
            <span className="font-black text-xl tracking-tighter">Codeo <span className="text-[#07b300]">Terms</span></span>
          </Link>
          <div className="hidden sm:block">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Version 1.0.0</span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Hero Card */}
        <div className="bg-white rounded-[3rem] border border-slate-100 p-8 md:p-12 mb-8 shadow-sm text-center">
          <div className="w-20 h-20 bg-[#07b300]/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
            <Gavel className="h-10 w-10 text-[#07b300]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
            Conditions <span className="text-[#07b300]">Générales.</span>
          </h1>
          <p className="text-slate-500 font-medium mb-10 max-w-xl mx-auto text-lg">
            Dernière mise à jour : 16 Janvier 2026. Lisez attentivement nos règles d'utilisation pour profiter au mieux de Codeo.
          </p>

          {/* Quick Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Shield />, label: "Sécurité" },
              { icon: <Users />, label: "Utilisateurs" },
              { icon: <CreditCard />, label: "Facturation" },
              { icon: <FileText />, label: "Légal" }
            ].map((item, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-2">
                <div className="text-[#07b300]">{item.icon}</div>
                <span className="text-sm font-black">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-[3rem] border border-slate-100 p-8 md:p-12 space-y-12">
          {sections.map((section, index) => (
            <div key={index} className="group border-b border-slate-50 pb-10 last:border-0 last:pb-0">
              <h3 className="text-2xl font-black text-slate-900 mb-6 group-hover:text-[#07b300] transition-colors flex items-center gap-3">
                <span className="text-slate-200 group-hover:text-[#07b300]/20 transition-colors">#</span>
                {section.title}
              </h3>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-line text-lg">
                  {section.content}
                </p>
              </div>
            </div>
          ))}

          {/* Legal Help Box */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-black mb-2">Des questions juridiques ?</h3>
                <p className="text-white/60 font-medium">Notre équipe est là pour clarifier nos conditions avec vous.</p>
              </div>
              <div className="flex gap-4">
                <Button className="bg-[#07b300] hover:bg-[#069a00] text-white font-black rounded-xl h-12 px-6">
                  Contactez-nous
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 font-black rounded-xl h-12 px-6">
                  Télécharger PDF
                </Button>
              </div>
            </div>
            <Zap className="absolute -right-8 -top-8 size-48 text-white/5 rotate-12" />
          </div>
        </div>

        {/* Final Links */}
        <div className="mt-12 flex flex-wrap justify-center gap-8">
           <Link href="/confidentialite" className="flex items-center gap-2 text-slate-400 hover:text-[#07b300] font-bold text-sm transition-colors">
              <CheckCircle2 className="size-4" /> Politique de confidentialité
           </Link>
           <Link href="/mentions-legales" className="flex items-center gap-2 text-slate-400 hover:text-[#07b300] font-bold text-sm transition-colors">
              <CheckCircle2 className="size-4" /> Mentions Légales
           </Link>
        </div>
      </div>
    </div>
  )
}