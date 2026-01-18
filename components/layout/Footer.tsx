'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Github, Twitter, Linkedin, Zap, Send, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setTimeout(() => setSubscribed(false), 3000)
  }
  
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        
        {/* TOP SECTION: BRAND + NEWSLETTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              {/* <div className="w-10 h-10 bg-[#07b300] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#07b300]/20 group-hover:rotate-6 transition-transform">
                <Zap className="size-6 fill-current" />
              </div> */}
              <span className="text-2xl font-black tracking-tighter text-slate-900">
                Code<span className="text-[#07b300]">o</span> U<span className="text-[#07b300]">I</span>
              </span>
            </Link>
            <p className="text-slate-500 text-lg max-w-sm leading-relaxed font-medium">
              L'IA qui transforme vos captures d'écran en composants de production. Accélérez votre workflow dès aujourd'hui.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <Link key={i} href="#" className="p-2.5 rounded-lg bg-slate-50 text-slate-400 hover:text-[#07b300] hover:bg-[#07b300]/10 transition-all border border-transparent hover:border-[#07b300]/20">
                  <Icon className="size-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 lg:p-8 border border-slate-100 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-black text-slate-900 mb-2">Restez à l'avant-garde</h3>
              <p className="text-slate-600 font-medium mb-6">Recevez nos dernières mises à jour sur le Vision Engine et nos nouveaux frameworks.</p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  required
                  placeholder="votre@email.com"
                  className="flex-grow h-14 px-6 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#07b300]/20 focus:border-[#07b300] transition-all font-medium text-slate-900"
                />
                <Button className="h-14 px-8 bg-[#07b300] hover:bg-[#069a00] text-white font-black rounded-xl transition-all shadow-lg shadow-[#07b300]/20">
                  {subscribed ? (
                    <span className="flex items-center gap-2"><CheckCircle2 className="size-5" /> Inscrit</span>
                  ) : (
                    <span className="flex items-center gap-2">S'abonner <Send className="size-4" /></span>
                  )}
                </Button>
              </form>
            </div>
            {/* Décoration subtile en arrière-plan */}
            <Zap className="absolute -right-8 -bottom-8 size-48 text-[#07b300]/5 rotate-12 pointer-events-none" />
          </div>
        </div>

        {/* MIDDLE SECTION: LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-12 border-t border-slate-100">
          {/* Colonne Produit */}
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Produit</h3>
            <ul className="space-y-4">
              <li><Link href="#workflow" className="text-slate-600 hover:text-[#07b300] font-bold transition-colors">Workflow</Link></li>
              <li><Link href="#how-it-works" className="text-slate-600 hover:text-[#07b300] font-bold transition-colors">Engine</Link></li>
              <li><Link href="#pricing" className="text-slate-600 hover:text-[#07b300] font-bold transition-colors">Tarifs</Link></li>
            </ul>
          </div>

          {/* Colonne Ressources */}
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Ressources</h3>
            <ul className="space-y-4">
              <li><Link href="/docs" className="text-slate-600 hover:text-[#07b300] font-bold transition-colors">Documentation</Link></li>
              <li><Link href="/help" className="text-slate-600 hover:text-[#07b300] font-bold transition-colors">Aide</Link></li>
              <li><Link href="/blog" className="text-slate-600 hover:text-[#07b300] font-bold transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Colonne Société */}
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Société</h3>
            <ul className="space-y-4">
              <li><Link href="/a-propos" className="text-slate-600 hover:text-[#07b300] font-bold transition-colors">À propos</Link></li>
              <li><Link href="/support" className="text-slate-600 hover:text-[#07b300] font-bold transition-colors">Support 24h/7</Link></li>
            </ul>
          </div>

          {/* Colonne Légal */}
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Légal</h3>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-slate-600 hover:text-[#07b300] font-bold transition-colors text-base">Confidentialité</Link></li>
              <li><Link href="/terms" className="text-slate-600 hover:text-[#07b300] font-bold transition-colors text-base">Mentions légales</Link></li>
            </ul>
          </div>
        </div>
        
        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-bold text-slate-400">
            &copy; {currentYear} Codeo Technologies. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-300 hover:border-codeo-green/50 hover:bg-codeo-green/10 hover:shadow-lg hover:shadow-codeo-green/20 hover:scale-105 transition-all duration-300 ease-out relative overflow-hidden group cursor-pointer">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-codeo-green/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                <div className="size-2 rounded-full bg-[#07b300] animate-pulse relative z-10 group-hover:bg-codeo-green transition-colors" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest relative z-10 hover:text-codeo-green transition-colors">Système Opérationnel</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer