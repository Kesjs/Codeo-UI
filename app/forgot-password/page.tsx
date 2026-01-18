'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, ArrowLeft, Lock, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    try {
      // Simulation d'envoi d'email
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } catch (error) {
      setErrorMsg('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-codeo-light-bg flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
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
          <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 p-8 md:p-10 relative overflow-hidden text-center">
            <div className="inline-flex items-center justify-center size-16 bg-green-100 rounded-full mb-6 mx-auto">
              <Check className="size-8 text-green-600" strokeWidth={3} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
              Email envoyé !
            </h1>
            <p className="text-slate-500 text-sm mb-8">
              Si un compte correspond à <span className="font-medium text-slate-700">{email}</span>, vous recevrez un email avec les instructions pour réinitialiser votre mot de passe.
            </p>
            
            <Button 
              onClick={() => router.push('/login')}
              className="w-full h-12 bg-codeo-green hover:bg-[#069a00] text-white font-bold text-base rounded-lg shadow-md hover:shadow-lg shadow-codeo-green/20 transition-all active:scale-[0.98]"
            >
              Retour à la connexion
            </Button>
          </div>
        </motion.div>
      </div>
    )
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
              <Lock className="size-6 text-codeo-green" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
              Mot de passe oublié ?
            </h1>
            <p className="text-slate-500 text-xs font-medium">
              Pas de panique, on va vous aider à le réinitialiser
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 group">
              <div className="flex items-center ml-1">
                <div className="w-6 flex justify-center text-slate-400 group-focus-within:text-codeo-green transition-colors duration-300">
                  <Mail className="size-4" />
                </div>
                <label htmlFor="email" className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 ml-2">
                  Email Professionnel
                </label>
              </div>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@entreprise.com"
                className="h-12 pl-4 pr-4 w-full rounded-xl border border-white bg-white transition-all duration-150 text-slate-900 font-medium placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-white focus:ring-0 focus:ring-offset-0"
              />
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
                  Envoi en cours...
                </div>
              ) : 'Envoyer les instructions'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-slate-400">
              Vous n'avez pas de compte ?{' '}
              <Link href="/register" className="text-codeo-green font-black hover:underline underline-offset-4">
                S'inscrire
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