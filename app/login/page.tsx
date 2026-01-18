'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Loader2, 
  Sparkles
} from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errorMsg) setErrorMsg(null)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)
    try {
      // Simulation de connexion
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push('/dashboard')
    } catch (error) {
      setErrorMsg('Identifiants incorrects. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-codeo-light-bg flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* 1. STYLES DE FIXATION (Chevauchement & Autofill) */}
      <style jsx global>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: #0f172a;
          -webkit-box-shadow: 0 0 0px 1000px white inset;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2307b300' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[400px] relative z-10"
      >
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 p-8 md:p-10 relative overflow-hidden">
          <Link 
            href="/" 
            className="absolute top-6 left-6 group"
            title="Retour à l'accueil"
          >
            <span className="flex items-center justify-center h-9 w-9 rounded-full bg-white shadow-sm border border-slate-200 group-hover:border-codeo-green/50 transition-all duration-300 group-hover:shadow-md group-hover:bg-slate-50">
              <ArrowLeft className="h-4 w-4 text-slate-500 group-hover:text-codeo-green transition-colors" />
            </span>
          </Link>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center size-12 bg-codeo-green/10 rounded-lg mb-4">
              <Lock className="size-6 text-codeo-green" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
              Prêt à créer ?
            </h1>
            <p className="text-slate-500 text-xs font-medium">
              Accédez à votre espace <span className="text-codeo-green font-bold">Codeo UI</span>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Champ Email */}
            <div className="space-y-2 group">
              <div className="flex items-center ml-1">
                <div className="w-6 flex justify-center text-slate-400 group-focus-within:text-codeo-green transition-colors duration-300">
                  <Mail className="size-4" />
                </div>
                <label htmlFor="email" className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 ml-2">
                  Email Professionnel
                </label>
              </div>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@entreprise.com"
                  className="h-12 pl-4 pr-4 w-full rounded-xl border border-white bg-white transition-all duration-150 text-slate-900 font-medium placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-white focus:ring-0 focus:ring-offset-0"
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div className="space-y-2 group">
              <div className="flex items-center justify-between ml-1">
                <div className="flex items-center">
                  <div className="w-6 flex justify-center text-slate-400 group-focus-within:text-codeo-green transition-colors duration-300">
                    <Lock className="size-4" />
                  </div>
                  <label htmlFor="password" className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 ml-2">
                    Mot de passe
                  </label>
                </div>
                <Link href="/forgot-password" className="text-[11px] font-bold text-codeo-green hover:underline">
                  Oublié ?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`h-12 pl-4 pr-12 w-full rounded-xl border border-white bg-white transition-all duration-150 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-white focus:ring-0 focus:ring-offset-0 ${!showPassword ? 'tracking-[0.3em] font-mono' : 'tracking-normal'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center text-slate-400 hover:text-codeo-green transition-colors"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {errorMsg && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100"
                >
                  {errorMsg}
                </motion.p>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-codeo-green hover:bg-[#069a00] text-white font-bold text-base rounded-lg shadow-md hover:shadow-lg shadow-codeo-green/20 transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? <Loader2 className="size-6 animate-spin mx-auto" /> : 'Se connecter'}
            </Button>
          </form>

          {/* Social Logins */}
          <div className="mt-10">
            <div className="relative mb-8 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <span className="relative px-4 bg-white text-[10px] font-black text-slate-400 uppercase tracking-widest">Accès rapide via</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  // Déclencher le next-toploader
                  const event = new Event('mousedown');
                  document.dispatchEvent(event);
                  // Rediriger après un court délai pour laisser le temps à l'animation de se lancer
                  setTimeout(() => {
                    window.location.href = '/api/auth/google';
                  }, 150);
                }}
                className="flex items-center justify-center h-14 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 transition-all group relative overflow-hidden"
              >
                <FcGoogle className="size-5 group-hover:scale-110 transition-transform" />
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-full"></span>
              </button>
              
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  // Déclencher le next-toploader
                  const event = new Event('mousedown');
                  document.dispatchEvent(event);
                  // Rediriger après un court délai
                  setTimeout(() => {
                    window.location.href = '/api/auth/github';
                  }, 150);
                }}
                className="flex items-center justify-center h-14 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 transition-all group relative overflow-hidden"
              >
                <FaGithub className="size-5 text-gray-800 group-hover:scale-110 transition-transform" />
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-full"></span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm font-medium text-slate-400">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-codeo-green font-black hover:underline underline-offset-4">
              S'inscrire gratuitement
            </Link>
          </p>
        </div>

        <div className="mt-10 flex justify-center items-center gap-2 opacity-30 grayscale">
          <Sparkles className="size-4 text-slate-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
            Enterprise Grade Security
          </span>
        </div>
      </motion.div>
    </div>
  )
}