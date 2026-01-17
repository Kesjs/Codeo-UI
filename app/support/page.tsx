'use client'

import { useState } from 'react'
import { Mail, MessageCircle, Phone, Clock, CheckCircle2, Send, ArrowLeft, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'normal'
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-xl w-full text-center p-12 bg-white rounded-[3rem] shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-500">
          <div className="bg-[#07b300]/10 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="h-12 w-12 text-[#07b300]" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Message reçu !</h1>
          <p className="text-slate-500 font-medium mb-10 text-lg">
            Notre équipe technique analyse déjà votre demande. <br />
            Réponse prévue sous <span className="text-[#07b300] font-bold">2 heures</span>.
          </p>
          <div className="flex flex-col gap-4">
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="bg-[#07b300] hover:bg-[#069a00] text-white font-black h-14 rounded-2xl shadow-xl shadow-[#07b300]/20"
            >
              Envoyer un autre message
            </Button>
            <Link href="/" className="w-full">
              <Button variant="ghost" className="w-full h-14 rounded-2xl font-bold text-slate-500">
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <nav className="border-b border-slate-100 bg-white py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/aide">
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-[#07b300]/10 hover:text-[#07b300]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="font-black text-xl tracking-tighter italic">Codeo <span className="text-[#07b300]">Support</span></span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-slate-50 to-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center bg-[#07b300]/10 text-[#07b300] text-[10px] font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            <Zap className="h-3 w-3 mr-2 fill-current" /> Assistance Prioritaire
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
            On ne vous laisse pas <br /> <span className="text-[#07b300]">sans réponse.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Un bug ? Une question sur l'API ? Notre équipe d'ingénieurs est sur le pont 24/7.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-5 gap-16">
          
          {/* Formulaire - Colonne de gauche (3/5) */}
          <div className="lg:col-span-3">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm ring-1 ring-slate-100">
              <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Ouvrir un ticket</h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Nom</label>
                    <Input name="name" onChange={handleChange} required className="h-14 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white" placeholder="Jean Dupont" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Email</label>
                    <Input type="email" name="email" onChange={handleChange} required className="h-14 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white" placeholder="jean@dev.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Sujet</label>
                  <Input name="subject" onChange={handleChange} required className="h-14 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white" placeholder="Problème avec l'export React..." />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Priorité</label>
                  <select name="priority" onChange={handleChange} className="w-full h-14 rounded-2xl border-slate-100 bg-slate-50 px-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#07b300]">
                    <option value="normal">Normale</option>
                    <option value="high">Haute (Bug bloquant)</option>
                    <option value="urgent">Urgente (Abonnement/Paiement)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Message</label>
                  <Textarea name="message" onChange={handleChange} required rows={6} className="rounded-[2rem] border-slate-100 bg-slate-50 focus:bg-white p-6" placeholder="Expliquez-nous tout..." />
                </div>
                
                <Button type="submit" className="w-full h-16 bg-[#07b300] hover:bg-[#069a00] text-white font-black rounded-[1.5rem] text-lg shadow-xl shadow-[#07b300]/20 transition-all active:scale-95">
                  <Send className="h-5 w-5 mr-3" /> Envoyer la demande
                </Button>
              </form>
            </div>
          </div>

          {/* Sidebar - Colonne de droite (2/5) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden">
               <h2 className="text-2xl font-black mb-8 relative z-10">Direct Contact</h2>
               <div className="space-y-10 relative z-10">
                  <ContactItem icon={<MessageCircle />} title="Chat Live" desc="Disponible dans votre dashboard" action="Lancer" color="text-[#07b300]" />
                  <ContactItem icon={<Mail />} title="Email" desc="support@codeo.ui" action="Copier" color="text-[#07b300]" />
                  <ContactItem icon={<Phone />} title="Urgence" desc="+33 1 23 45 67 89" action="Appeler" color="text-[#07b300]" />
               </div>
               <Zap className="absolute -bottom-10 -right-10 size-48 text-white/5 rotate-12" />
            </div>

            <div className="p-10 rounded-[3rem] border-2 border-slate-100 bg-white">
              <h3 className="font-black text-xl mb-4">Statut du Support</h3>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-3 w-3 rounded-full bg-[#07b300] animate-pulse" />
                <span className="font-bold text-slate-700 text-sm">Équipe en ligne</span>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Temps d'attente : ~4 mins</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContactItem({ icon, title, desc, action, color }: any) {
  return (
    <div className="flex items-start gap-4 group">
      <div className={`p-3 rounded-2xl bg-white/10 ${color} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div>
        <h3 className="font-black text-lg">{title}</h3>
        <p className="text-white/50 text-sm font-medium mb-2">{desc}</p>
        <button className={`text-xs font-black uppercase tracking-widest ${color} hover:underline`}>{action} →</button>
      </div>
    </div>
  )
}