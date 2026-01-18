'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft, UserPlus } from 'lucide-react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errorMsg) setErrorMsg(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)
    
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Les mots de passe ne correspondent pas')
      setLoading(false)
      return
    }

    try {
      // Simulation d'enregistrement
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push('/dashboard')
    } catch (error) {
      setErrorMsg('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-codeo-light-bg flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Styles de fixation pour autofill */}
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
            href="/login" 
            className="absolute top-6 left-6 group"
            title="Retour à la connexion"
          >
            <span className="flex items-center justify-center h-9 w-9 rounded-full bg-white shadow-sm border border-slate-200 group-hover:border-codeo-green/50 transition-all duration-300 group-hover:shadow-md group-hover:bg-slate-50">
              <ArrowLeft className="h-4 w-4 text-slate-500 group-hover:text-codeo-green transition-colors" />
            </span>
          </Link>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center size-12 bg-codeo-green/10 rounded-lg mb-4">
              <UserPlus className="size-6 text-codeo-green" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
              Créer un compte
            </h1>
            <p className="text-slate-500 text-xs font-medium">
              Rejoignez notre communauté dès maintenant
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Champ Nom complet */}
            <div className="space-y-2 group">
              <div className="flex items-center ml-1">
                <div className="w-6 flex justify-center text-slate-400 group-focus-within:text-codeo-green transition-colors duration-300">
                  <UserPlus className="size-4" />
                </div>
                <label htmlFor="name" className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 ml-2">
                  Nom complet
                </label>
              </div>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Alex Dupont"
                  className="h-12 pl-4 pr-4 w-full rounded-xl border border-white bg-white transition-all duration-150 text-slate-900 font-medium placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-white focus:ring-0 focus:ring-offset-0"
                />
              </div>
            </div>

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
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`h-12 pl-4 pr-12 w-full rounded-xl border border-white bg-white transition-all duration-150 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-white focus:ring-0 focus:ring-offset-0 ${!showPassword ? 'tracking-[0.3em]' : 'tracking-normal'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center text-slate-400 hover:text-codeo-green transition-colors"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1 ml-1">8 caractères minimum</p>
            </div>

            {/* Champ Confirmation mot de passe */}
            <div className="space-y-2 group">
              <div className="flex items-center justify-between ml-1">
                <div className="flex items-center">
                  <div className="w-6 flex justify-center text-slate-400 group-focus-within:text-codeo-green transition-colors duration-300">
                    <Lock className="size-4" />
                  </div>
                  <label htmlFor="confirmPassword" className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 ml-2">
                    Confirmer le mot de passe
                  </label>
                </div>
              </div>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`h-12 pl-4 pr-12 w-full rounded-xl border border-white bg-white transition-all duration-150 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-white focus:ring-0 focus:ring-offset-0 ${!showPassword ? 'tracking-[0.3em]' : 'tracking-normal'}`}
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-codeo-green focus:ring-codeo-green/50"
                  />
                </div>
                <label htmlFor="terms" className="ml-2 block text-xs text-slate-600">
                  J'accepte les{' '}
                  <Link href="/terms" className="text-codeo-green font-bold hover:underline">
                    conditions d'utilisation
                  </Link>{' '}
                  et la{' '}
                  <Link href="/privacy" className="text-codeo-green font-bold hover:underline">
                    politique de confidentialité
                  </Link>
                </label>
              </div>
            </div>

            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100"
              >
                {errorMsg}
              </motion.div>
            )}

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 bg-codeo-green hover:bg-[#069a00] text-white font-bold text-base rounded-lg shadow-md hover:shadow-lg shadow-codeo-green/20 transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Création en cours...
                </div>
              ) : 'Créer mon compte'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-slate-400">
              Vous avez déjà un compte ?{' '}
              <Link href="/login" className="text-codeo-green font-black hover:underline underline-offset-4">
                Se connecter
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center items-center gap-2 opacity-30 grayscale">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
            Enterprise Grade Security
          </span>
        </div>
      </motion.div>
    </div>
  )
}