'use client'

import React from 'react'
import { ArrowRight, Calendar, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function BlogPage() {
  const posts = [
    {
      title: "L'IA peut-elle vraiment écrire du code propre ?",
      date: "14 Jan 2026",
      read: "5 min",
      cat: "Technologie",
      img: "https://placehold.co/600x400/0f172a/ffffff?text=AI+Vision"
    },
    {
      title: "Optimiser vos exports React avec Tailwind CSS",
      date: "10 Jan 2026",
      read: "8 min",
      cat: "Tutoriel",
      img: "https://placehold.co/600x400/0f172a/ffffff?text=React+Optim"
    }
  ]

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Bouton de retour */}
      <div className="container mx-auto px-6 pt-6">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-[#07b300] transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Retour à l'accueil
        </Link>
      </div>
      <main className="max-w-7xl mx-auto px-6 py-20">
        <header className="mb-20 text-center lg:text-left">
          <h1 className="text-6xl font-black tracking-tighter mb-4">Le <span className="text-[#07b300]">Blog.</span></h1>
          <p className="text-xl text-slate-500 font-medium">Actualités, guides et futur du développement IA.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {posts.map((post, i) => (
            <article key={i} className="group cursor-pointer">
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl transition-transform group-hover:-translate-y-2">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest">
                  {post.cat}
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-slate-400 text-sm font-bold mb-4">
                <span className="flex items-center gap-1.5"><Calendar className="size-4" /> {post.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="size-4" /> {post.read}</span>
              </div>
              
              <h2 className="text-3xl font-black mb-4 group-hover:text-[#07b300] transition-colors leading-tight">
                {post.title}
              </h2>
              
              <div className="flex items-center gap-2 text-[#07b300] font-black text-lg group-hover:gap-4 transition-all">
                Lire la suite <ArrowRight className="size-5" />
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}