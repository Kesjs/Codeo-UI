'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  ArrowLeft, Search, Code, Copy, Terminal, 
  Book, Zap, Globe, Shield, Check, ChevronRight 
} from 'lucide-react'
import Link from 'next/link'

export default function DocsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSection, setSelectedSection] = useState('getting-started')
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sections = [
    { id: 'getting-started', title: 'Démarrage', icon: Zap, desc: 'Guide rapide pour débuter' },
    { id: 'api-reference', title: 'Référence API', icon: Code, desc: 'Endpoints et paramètres' },
    { id: 'guides', title: 'Guides', icon: Book, desc: 'Tutoriels pas à pas' },
    { id: 'examples', title: 'Exemples', icon: Terminal, desc: 'Snippets prêts à l\'emploi' }
  ]

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- TOP NAVIGATION --- */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-lg hover:bg-[#07b300]/10 hover:text-[#07b300]">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-black tracking-tighter italic">Codeo <span className="text-[#07b300]">Docs</span></h1>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Rechercher dans la doc..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 rounded-lg border-slate-200 focus:outline-none focus:ring-0 focus:border-transparent"
              />
            </div>
            <Button className="bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg h-11 px-6 shadow-lg shadow-slate-800/20">
              <Globe className="h-4 w-4 mr-2" /> Clés API
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 md:py-12">
        {/* --- MAIN NAVIGATION CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setSelectedSection(section.id)}
              className={`p-6 rounded-xl border-2 text-left transition-all duration-300 ${
                selectedSection === section.id
                  ? 'border-[#07b300] bg-white shadow-xl shadow-[#07b300]/5 scale-[1.02]'
                  : 'border-white bg-white/50 hover:border-slate-200'
              }`}
            >
              <div className={`size-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                selectedSection === section.id ? 'bg-[#07b300] text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                <section.icon className="h-6 w-6" />
              </div>
              <h3 className="font-black text-slate-900">{section.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-tight mt-1">{section.desc}</p>
            </button>
          ))}
        </div>

        {/* --- DYNAMIC CONTENT AREA --- */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 md:p-12">
          
          {selectedSection === 'getting-started' && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-3xl font-black mb-8 tracking-tight">Introduction au <span className="text-[#07b300]">Vision Engine</span></h2>
              
              <div className="space-y-12">
                <Step number="1" title="Obtenez votre clé API">
                  <p className="text-slate-600 font-medium mb-4">Indispensable pour authentifier vos requêtes vers nos serveurs de rendu.</p>
                  <div className="bg-slate-900 rounded-lg p-5 flex items-center justify-between group">
                    <code className="text-[#07b300] font-mono text-sm tracking-wider">Authorization: Bearer YOUR_API_KEY</code>
                    <Copy className="size-4 text-slate-500 group-hover:text-white cursor-pointer transition-colors" />
                  </div>
                </Step>

                <Step number="2" title="Première conversion">
                  <p className="text-slate-600 font-medium mb-4">Envoyez une requête POST avec votre fichier image et le framework cible.</p>
                  <div className="bg-slate-900 rounded-lg p-6 relative group">
                    <pre className="text-slate-300 text-sm overflow-x-auto leading-relaxed">
                      <code>{`curl -X POST https://api.codeo.com/v1/convert \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "image=@screenshot.png" \\
  -F "framework=react"`}</code>
                    </pre>
                    <button 
                      onClick={() => copyToClipboard('curl -X POST...')}
                      className="absolute top-4 right-4 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      {copied ? <Check className="size-4 text-[#07b300]" /> : <Copy className="size-4 text-white" />}
                    </button>
                  </div>
                </Step>

                <Step number="3" title="Analysez la réponse">
                  <p className="text-slate-600 font-medium mb-4">L'API retourne un objet JSON contenant le code JSX et les classes Tailwind correspondantes.</p>
                  <div className="bg-[#07b300]/5 border border-[#07b300]/10 rounded-lg p-6">
                    <pre className="text-slate-700 text-sm italic">
                      <code>{`{ "status": "completed", "code": "<div className='bg-green-500'>...</div>" }`}</code>
                    </pre>
                  </div>
                </Step>
              </div>
            </div>
          )}

          {selectedSection === 'api-reference' && (
             <div className="animate-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-black mb-4">Référence API</h2>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 inline-block mb-10">
                  <code className="text-sm font-bold text-slate-600">Base URL : <span className="text-[#07b300]">https://api.codeo.com/v1</span></code>
                </div>

                <div className="space-y-6">
                   <Endpoint method="POST" path="/convert" desc="Convertit une capture d'écran en code de production" />
                   <Endpoint method="GET" path="/status/:id" desc="Récupère l'état d'avancement d'une conversion" />
                </div>
             </div>
          )}
        </div>

        {/* --- LIMITS SECTION --- */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <LimitCard title="Requêtes" value="100/min" icon={<Zap className="size-5" />} />
          <LimitCard title="Poids Max" value="10MB" icon={<Shield className="size-5" />} />
          <LimitCard title="Timeout" value="30s" icon={<Code className="size-5" />} />
        </div>
      </div>
    </div>
  )
}

// --- SUB-COMPONENTS ---

function Step({ number, title, children }: { number: string, title: string, children: React.ReactNode }) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0 size-10 rounded-lg bg-[#07b300] text-white flex items-center justify-center font-black shadow-lg shadow-[#07b300]/20">
        {number}
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-black mb-3 text-slate-900">{title}</h3>
        {children}
      </div>
    </div>
  )
}

function Endpoint({ method, path, desc }: { method: string, path: string, desc: string }) {
  return (
    <div className="p-6 rounded-lg border border-slate-100 hover:border-[#07b300]/30 transition-all flex flex-col md:flex-row md:items-center gap-4">
      <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
        method === 'POST' ? 'bg-[#07b300] text-white' : 'bg-slate-900 text-white'
      }`}>{method}</span>
      <code className="font-mono text-sm font-bold text-slate-700 flex-grow">{path}</code>
      <p className="text-sm text-slate-500 font-medium">{desc}</p>
      <ChevronRight className="size-4 text-slate-300 hidden md:block" />
    </div>
  )
}

function LimitCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-slate-50 rounded-lg text-[#07b300]">{icon}</div>
        <span className="font-bold text-slate-500">{title}</span>
      </div>
      <span className="text-xl font-black text-slate-900">{value}</span>
    </div>
  )
}