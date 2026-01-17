'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Mail, Lock, CheckCircle, Loader2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitted(true)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Arrière-plan avec motif */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#07b300_0.5px,transparent_0.5px)] [background-size:20px_20px] opacity-[0.1] -z-10" />
      
      <div className="w-full max-w-[380px] relative z-10">
        {/* Bouton Retour */}
        <div className="flex justify-start mb-4">
          <Link 
            href="/login" 
            className="group inline-flex items-center text-xs font-bold text-slate-500 hover:text-codeo-green transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5 transition-transform group-hover:-translate-x-1" />
            Back to Login
          </Link>
        </div>

        {/* Carte de contenu */}
        <div className="bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200 p-6 md:p-8">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center size-12 bg-codeo-green/10 rounded-lg mb-4">
                  <Lock className="size-6 text-codeo-green" />
                </div>
                <h1 className="text-2xl font-black text-slate-900 mb-1 tracking-tight">Forgot Password?</h1>
                <p className="text-xs text-slate-500 font-medium">
                  Enter your email to receive a reset link
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 ml-0.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-11 pl-10 rounded-lg border-slate-200 bg-slate-50/30 focus:bg-white focus:ring-1 focus:ring-codeo-green transition-all text-sm"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-codeo-green hover:bg-[#069a00] text-white font-bold text-sm rounded-lg shadow-md shadow-codeo-green/10 transition-all active:scale-[0.98]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center size-14 bg-green-50 rounded-full mb-4">
                <CheckCircle className="size-8 text-green-500" />
              </div>
              <h2 className="text-xl font-black text-slate-900 mb-2 tracking-tight">
                Check your Email
              </h2>
              <p className="text-xs text-slate-500 font-medium mb-6 leading-relaxed">
                We've sent a password reset link to <br />
                <span className="text-slate-900 font-bold">{email}</span>
              </p>
              
              <Button
                variant="outline"
                onClick={() => {
                  setIsSubmitted(false)
                  setEmail('')
                }}
                className="w-full h-10 rounded-lg border-slate-200 font-bold text-xs hover:bg-slate-50 transition-all"
              >
                Try another email
              </Button>
            </div>
          )}

          {/* Liens de bas de page */}
          <div className="mt-8 pt-6 border-t border-slate-50 text-center space-y-2">
            <p className="text-slate-400 font-bold text-[10px]">
              Remember your password?{' '}
              <Link href="/login" className="text-codeo-green font-black hover:underline ml-1">
                Sign In
              </Link>
            </p>
            <p className="text-slate-400 font-bold text-[10px]">
              Don't have an account?{' '}
              <Link href="/register" className="text-codeo-green font-black hover:underline ml-1">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}