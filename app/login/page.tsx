'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Eye, EyeOff, Mail, Lock, Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const router = useRouter()
  
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    try {
      // TODO: Implémenter la logique de connexion
      console.log('Tentative de connexion avec:', formData.email)
      // Simulation de délai pour le chargement
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirection après connexion réussie
      router.push('/dashboard')
    } catch (error) {
      setErrorMsg('Échec de la connexion. Veuillez réessayer.')
      console.error('Erreur de connexion:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = (provider: 'github' | 'google') => {
    // TODO: Implémenter la connexion sociale
    console.log(`Tentative de connexion avec ${provider}`)
    setErrorMsg(`Connexion avec ${provider} non implémentée pour le moment.`)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Decor (Exactement comme Register) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#07b300_0.5px,transparent_0.5px)] [background-size:20px_20px] opacity-[0.1] -z-10" />
      
      <div className="w-full max-w-[380px] relative z-10">
        
        {/* Back Button */}
        <div className="flex justify-start mb-4">
          <Link 
            href="/" 
            className="group inline-flex items-center text-xs font-bold text-slate-500 hover:text-codeo-green transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200 p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-slate-900 mb-1 tracking-tight">Welcome Back</h1>
            <p className="text-xs text-slate-500 font-medium italic">Login to your <span className="text-codeo-green font-bold">Codeo</span> account</p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-0.5">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-11 pl-10 rounded-lg border-slate-200 bg-slate-50/30 focus:bg-white focus:ring-1 focus:ring-codeo-green transition-all text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-0.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Password</label>
                <Link href="/forgot-password" className="text-[10px] font-bold text-codeo-green hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="h-11 pl-10 rounded-lg border-slate-200 bg-slate-50/30 focus:bg-white focus:ring-1 focus:ring-codeo-green transition-all text-sm"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {errorMsg && (
              <p className="text-[11px] font-bold text-red-500 px-1 animate-pulse">
                {errorMsg}
              </p>
            )}

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-11 bg-codeo-green hover:bg-[#069a00] text-white font-bold text-sm rounded-lg shadow-md shadow-codeo-green/10 transition-all active:scale-[0.98]"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : 'Sign In'}
            </Button>
          </form>

          {/* Social Logins (Exactement le même bloc que Register) */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
              <span className="px-3 bg-white text-slate-300">Or use</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={() => handleSocialLogin('google')}
              variant="outline" 
              className="h-10 rounded-lg border-slate-200 font-bold text-xs gap-2"
            >
              <svg className="size-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </Button>
            <Button 
              onClick={() => handleSocialLogin('github')}
              variant="outline" 
              className="h-10 rounded-lg border-slate-200 font-bold text-xs gap-2"
            >
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-400 font-bold text-[11px]">
              New to Codeo?{' '}
              <Link href="/register" className="text-codeo-green font-black hover:underline ml-1">
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Secure Badge */}
        <div className="mt-6 flex justify-center items-center gap-1.5 opacity-40">
           <Sparkles className="size-3 text-slate-400" />
           <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">Secure AI Authentication</span>
        </div>
      </div>
    </div>
  )
}