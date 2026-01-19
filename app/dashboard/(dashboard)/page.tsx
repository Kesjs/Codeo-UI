'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import CountUp from 'react-countup' // → npm install react-countup
import { 
  Sparkles, Zap, History, Layout, ArrowRight, ArrowUpRight, ShieldCheck 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProjectCard from '@/components/dashboard/ProjectCard'

// Types
interface Project {
  id: string
  name: string
  thumbnail: string
  date: string
  frameworks: string[]
  efficiency: number 
}

// Mock data (à remplacer par fetch réel)
const mockProjects: Project[] = [
  { id: '1', name: 'Système Analytics v2', thumbnail: '/images/dashboard-thumb.jpg', date: '15 Jan 2026', frameworks: ['React', 'Tailwind'], efficiency: 98 },
  { id: '2', name: 'Shopify Checkout UI', thumbnail: '/images/ecommerce-thumb.jpg', date: '10 Jan 2026', frameworks: ['Next.js'], efficiency: 94 },
]

// Valeurs dynamiques (à venir de l'API / context)
const user = { name: 'Ken', plan: 'starter' as 'starter' | 'pro' | 'business' }
const scansUsed = 8
const timeSaved = 14 // heures ce mois
const avgEfficiency = 96

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    // Déclenche l'animation des stats une fois chargé
    setTimeout(() => setInView(true), 800)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-5">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          className="relative size-20"
        >
          <div className="absolute inset-0 rounded-full border-4 border-codeo-green/20" />
          <div className="absolute inset-0 rounded-full border-4 border-t-codeo-green border-r-transparent animate-spin" />
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 font-bold text-sm animate-pulse uppercase tracking-widest"
        >
          Chargement de votre espace Codeo...
        </motion.p>
      </div>
    )
  }

  return (
    <div className="max-w-[1440px] mx-auto space-y-10 md:space-y-12 p-4 lg:p-8">
      
      {/* HEADER */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Heureux de vous revoir, {user.name} <span className="text-codeo-green">.</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 capitalize">
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </motion.header>

      {/* VALUE REALIZATION – 4 cartes stats */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.8, staggerChildren: 0.12 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
      >
        {/* Carte 1 – Plan actuel */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Ton plan
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              user.plan === 'starter' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50' :
              user.plan === 'pro' ? 'bg-codeo-green/20 text-codeo-green' :
              'bg-purple-100 text-purple-800 dark:bg-purple-900/50'
            }`}>
              {user.plan === 'starter' ? 'Starter' : user.plan === 'pro' ? 'Pro' : 'Business'}
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {user.plan === 'starter' ? '0 €' : user.plan === 'pro' ? '49 €' : '149 €'} /mois
          </p>
          {user.plan !== 'business' && (
            <Button variant="link" className="mt-3 p-0 text-codeo-green hover:text-codeo-green/80 text-sm font-bold">
              Upgrade {user.plan === 'starter' ? 'Pro' : 'Business'}
            </Button>
          )}
        </motion.div>

        {/* Carte 2 – Scans utilisés */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
        >
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
            Scans IA ce mois
          </h3>
          {user.plan === 'starter' ? (
            <div className="space-y-3">
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(scansUsed / 10) * 100}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-codeo-green"
                />
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-700 dark:text-slate-200">{scansUsed} / 10</span>
                <span className="text-slate-500 dark:text-slate-400">max</span>
              </div>
              {scansUsed >= 7 && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-codeo-green font-semibold"
                >
                  Plus que {10 - scansUsed} avant la limite !
                </motion.p>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3 text-3xl font-black text-codeo-green">
              <Zap className="size-8" fill="currentColor" /> Illimités
            </div>
          )}
        </motion.div>

        {/* Carte 3 – Temps économisé (Wahou) */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-gradient-to-br from-codeo-green/10 to-emerald-100 dark:from-codeo-green/20 dark:to-emerald-950 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-codeo-green/20"
        >
          <h3 className="text-sm font-black uppercase tracking-widest text-codeo-green mb-2">
            Temps économisé
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-slate-900 dark:text-white">
              <CountUp start={0} end={timeSaved} duration={2.2} separator=" " useEasing />
            </span>
            <span className="text-3xl font-bold text-slate-700 dark:text-slate-300">h</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            ce mois-ci grâce à Codeo
          </p>
        </motion.div>

        {/* Carte 4 – Efficacité moyenne */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
        >
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
            Efficacité IA
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-slate-900 dark:text-white">{avgEfficiency}</span>
            <span className="text-3xl font-bold text-slate-600 dark:text-slate-400">%</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Code propre & optimisé
          </p>
          {avgEfficiency >= 95 && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-bold">
              <ShieldCheck size={14} /> Excellent
            </div>
          )}
        </motion.div>
      </motion.section>

      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        
        {/* Colonne gauche – Projets */}
        <div className="lg:col-span-8 space-y-10">
          <section>
            <div className="flex items-center justify-between mb-6 px-1">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-codeo-green/10 rounded-xl flex items-center justify-center">
                  <History className="size-5 text-codeo-green" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">Générations récentes</h2>
              </div>
              <Button variant="ghost" className="text-slate-500 hover:text-codeo-green font-semibold">
                Voir tout <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer"
                  onClick={() => router.push(`/dashboard/projects/${project.id}`)}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Bannière Upgrade – adaptée Starter */}
          {user.plan === 'starter' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="bg-gradient-to-br from-codeo-green to-emerald-700 rounded-3xl p-8 text-white shadow-2xl shadow-codeo-green/20 relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 size-64 bg-white/10 rounded-full blur-3xl" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black mb-3">Tu mérites l’illimité</h3>
                  <p className="text-white/90 max-w-md">
                    Plus que 2 scans ce mois… Passe Pro pour des générations sans limite, Vue/Svelte et +18h de productivité/mois.
                  </p>
                </div>
                <Button className="bg-white text-codeo-green hover:bg-slate-100 rounded-2xl px-8 py-6 font-black text-lg shadow-lg">
                  Passer Pro – 49 € <ArrowUpRight className="ml-2 size-5" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Colonne droite */}
        <div className="lg:col-span-4 space-y-8">
          {/* Status Engine */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-7 shadow-sm"
          >
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 mb-6 flex items-center justify-between">
              Codeo Engine
              <span className="size-2.5 rounded-full bg-codeo-green animate-pulse" />
            </h3>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl flex items-center justify-center text-codeo-green">
                  <Zap className="size-6 fill-current" />
                </div>
                <div>
                  <p className="text-base font-black text-slate-900 dark:text-white">v4.2</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">Ultra-rapide • Stable</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <ShieldCheck className="size-5 text-codeo-green" />
                  Code sécurisé & optimisé
                </div>
              </div>
            </div>
          </motion.div>

          {/* Guide rapide */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-7 shadow-sm"
          >
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Layout className="size-5 text-codeo-green" /> En 3 étapes
            </h3>
            <ul className="space-y-6">
              {[
                { num: 1, title: "Capture", desc: "Prends ton design" },
                { num: 2, title: "Génère", desc: "IA ultra-rapide" },
                { num: 3, title: "Exporte", desc: "Code prêt à l’emploi" },
              ].map((step) => (
                <li key={step.num} className="flex gap-4">
                  <span className="text-lg font-black text-codeo-green/40 mt-0.5">{step.num}</span>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{step.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}