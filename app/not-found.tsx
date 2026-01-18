'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Zap, Construction, Home, Search, LifeBuoy } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col pt-16">
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="max-w-3xl w-full text-center">
          {/* Illustration 404 Stylisée */}
          <div className="relative mb-12">
            <h1 className="text-[12rem] md:text-[16rem] font-black text-slate-100 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 rotate-3 hover:rotate-0 transition-transform duration-500">
                <Construction className="size-20 text-[#07b300] mx-auto mb-4" />
                <div className="font-mono text-xs text-slate-400 bg-slate-50 p-3 rounded-xl border border-slate-100">
                   <span className="text-red-500">error</span>: page_not_found <br/>
                   <span className="text-[#07b300]">status</span>: 404_magic_missing
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-tight">
            Cette page a été <br /> <span className="text-[#07b300]">refactorisée à l'infini.</span>
          </h2>
          
          <p className="text-xl text-slate-500 font-medium mb-12 max-w-xl mx-auto">
            Désolé, l'URL que vous tentez d'atteindre n'existe plus ou a été déplacée dans une autre dimension de code.
          </p>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/" className="w-full sm:w-auto">
              <Button className="w-full h-14 px-8 bg-[#07b300] hover:bg-[#069a00] text-white font-black rounded-2xl shadow-xl shadow-[#07b300]/20 gap-2">
                <Home className="size-5" /> Retour à l'accueil
              </Button>
            </Link>
            
            <Link href="/support" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full h-14 px-8 border-slate-200 hover:bg-white hover:border-[#07b300] text-slate-700 font-black rounded-2xl transition-all gap-2">
                <LifeBuoy className="size-5" /> Besoin d'aide ?
              </Button>
            </Link>
          </div>
          
          {/* Quick Links Footer */}
          <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-wrap justify-center gap-x-8 gap-y-4">
             <QuickLink href="/docs" icon={<Search className="size-4" />} label="Docs" />
             <QuickLink href="/blog" icon={<Zap className="size-4" />} label="Blog" />
             <QuickLink href="/a-propos" icon={<Home className="size-4" />} label="Société" />
          </div>
        </div>
      </main>

      {/* Pas de footer ici car il est géré par le layout */}
    </div>
  )
}

function QuickLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 text-slate-400 hover:text-[#07b300] transition-colors group">
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      <span className="text-sm font-black uppercase tracking-tighter">{label}</span>
    </Link>
  )
}