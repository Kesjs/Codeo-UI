'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast, Toaster } from 'sonner'
import {
  Sparkles, Zap, Upload, Download, Copy, Play, Settings, Monitor, Code2, Palette, ShieldCheck, Cpu, Activity, Clock, ChevronDown, CheckCircle, AlertCircle, X, ArrowRight, Loader2, Eye, EyeOff, Moon, Smartphone, GitBranch, Database, Server, Globe, Atom, Triangle, Square, Type
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { usePlan } from '../layout'

// ── Types ────────────────────────────────────────────────
type PlanType = 'starter' | 'pro' | 'business'
type FrameworkType = 'react' | 'nextjs' | 'vue' | 'html' | 'tailwind'
type StyleEngine = 'tailwind' | 'css-modules' | 'styled-components'

interface WorkbenchConfig {
  framework: FrameworkType
  styleEngine: StyleEngine
  enableAnimations: boolean
  enableAccessibility: boolean
  enableSecurity: boolean
  enableDesignSystem: boolean
  darkMode: boolean
  mobile: boolean
}

interface GenerationLog {
  id: string
  message: string
  timestamp: Date
  type: 'info' | 'success' | 'warning' | 'error'
}

// ── Configurations par plan ──────────────────────────────
const planConfigs = {
  starter: {
    name: 'Starter',
    engine: 'V-AST Standard',
    status: 'Traitement classique',
    statusColor: 'text-amber-600',
    frameworks: ['react', 'html'] as FrameworkType[],
    styleEngines: ['tailwind'] as StyleEngine[],
    options: {
      enableAnimations: false,
      enableAccessibility: false,
      enableSecurity: false,
      enableDesignSystem: false
    },
    loadingMessage: 'Analyse de la structure en cours (File d\'attente Standard)...',
    logs: [
      'Réception de l\'image...',
      'Analyse des composants de base...',
      'Génération du code React...',
      'Application des styles Tailwind...',
      'Finalisation du composant...'
    ]
  },
  pro: {
    name: 'Pro',
    engine: 'V-AST Turbo v4.2',
    status: 'Priorité GPU Active',
    statusColor: 'text-codeo-green',
    frameworks: ['react', 'nextjs', 'vue', 'html'] as FrameworkType[],
    styleEngines: ['tailwind', 'css-modules', 'styled-components'] as StyleEngine[],
    options: {
      enableAnimations: true,
      enableAccessibility: true,
      enableSecurity: false,
      enableDesignSystem: false
    },
    loadingMessage: 'Calcul par grappe GPU... Finalisation en 3s.',
    logs: [
      'Réception de l\'image...',
      'Analyse avancée des patterns...',
      'Détection des interactions...',
      'Génération avec optimisation GPU...',
      'Ajout des états React...',
      'Optimisation des performances...',
      'Finalisation du composant...'
    ]
  },
  business: {
    name: 'Business',
    engine: 'V-AST Enterprise Custom',
    status: 'Instance Dédiée - Latence Zéro',
    statusColor: 'text-purple-600',
    frameworks: ['react', 'nextjs', 'vue', 'html'] as FrameworkType[],
    styleEngines: ['tailwind', 'css-modules', 'styled-components'] as StyleEngine[],
    options: {
      enableAnimations: true,
      enableAccessibility: true,
      enableSecurity: true,
      enableDesignSystem: true
    },
    loadingMessage: 'Alignement sur les patterns de votre Design System...',
    logs: [
      'Réception de l\'image...',
      'Analyse des patterns entreprise...',
      'Vérification de conformité sécurité...',
      'Synchronisation avec le Design System...',
      'Génération avec optimisation GPU...',
      'Ajout des états React et interactions...',
      'Scan de sécurité intégré...',
      'Finalisation du composant...'
    ]
  }
}

// ── Framework Icons ────────────────────────────────────────
const getFrameworkIcon = (framework: FrameworkType) => {
  const iconClass = 'w-4 h-4'
  switch (framework) {
    case 'react': return <Atom className={`${iconClass} text-blue-500`} />
    case 'nextjs': return <Globe className={`${iconClass} text-gray-900 dark:text-gray-100`} />
    case 'vue': return <Triangle className={`${iconClass} text-green-500`} />
    case 'html': return <Code2 className={`${iconClass} text-orange-500`} />
    case 'tailwind': return <Palette className={`${iconClass} text-cyan-500`} />
    default: return <Code2 className={`${iconClass} text-gray-400`} />
  }
}

export default function WorkbenchPage() {
  // Utilise le contexte global du plan
  const { activePlan, simulatedPlan, setSimulatedPlan, isDevMode } = usePlan()
  const config = planConfigs[activePlan]

  // États du Workbench
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [generatedCode, setGeneratedCode] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentLog, setCurrentLog] = useState<string>('')
  const [logs, setLogs] = useState<GenerationLog[]>([])
  const [showPreview, setShowPreview] = useState(false)
  const [workbenchConfig, setWorkbenchConfig] = useState<WorkbenchConfig>({
    framework: 'react',
    styleEngine: 'tailwind',
    enableAnimations: false,
    enableAccessibility: false,
    enableSecurity: false,
    enableDesignSystem: false,
    darkMode: false,
    mobile: false
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Génération de code simulée
  const generateCode = async () => {
    if (!uploadedImage) {
      toast.error('Veuillez d\'abord uploader une image')
      return
    }

    setIsGenerating(true)
    setLogs([])
    setGeneratedCode('')

    // Simuler les logs de génération
    for (let i = 0; i < config.logs.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800))
      const log: GenerationLog = {
        id: `${Date.now()}-${i}`,
        message: config.logs[i],
        timestamp: new Date(),
        type: i === config.logs.length - 1 ? 'success' : 'info'
      }
      setLogs(prev => [...prev, log])
      setCurrentLog(config.logs[i])
    }

    // Simuler la génération du code
    await new Promise(resolve => setTimeout(resolve, 1000))
    const mockCode = `// Composant généré avec ${config.engine}
import React from 'react'
${workbenchConfig.enableAnimations ? "import { motion } from 'framer-motion'" : ''}

export default function GeneratedComponent() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        Composant généré pour vous
      </h2>
      <p className="text-gray-600">
        Framework: ${workbenchConfig.framework} | 
        Style: ${workbenchConfig.styleEngine}
        ${workbenchConfig.enableAnimations ? ' | Animations: Oui' : ''}
        ${workbenchConfig.enableAccessibility ? ' | Accessibilité: Oui' : ''}
        ${workbenchConfig.enableSecurity ? ' | Sécurité: Oui' : ''}
      </p>
    </div>
  )
}`

    setGeneratedCode(mockCode)
    setIsGenerating(false)
    setCurrentLog('')
    toast.success('Composant généré avec succès !')
  }

  // Upload d'image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        toast.success('Image uploadée avec succès !')
      }
      reader.readAsDataURL(file)
    }
  }

  // Copier le code
  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode)
    toast.success('Code copié dans le presse-papiers !')
  }

  // Télécharger le code
  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/typescript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'generated-component.tsx'
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Fichier téléchargé !')
  }

  return (
    <TooltipProvider>
      <Toaster position="top-right" richColors closeButton duration={3000} />
      <div className="h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">

        {/* Toggle dev uniquement */}
        {isDevMode && (
          <div className="fixed top-16 right-6 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg px-4 py-2.5">
            <div className="flex items-center gap-3 text-sm font-medium">
              <Settings className="w-4 h-4 text-slate-500" />
              <Select value={simulatedPlan} onValueChange={(v) => setSimulatedPlan(v as PlanType)}>
                <SelectTrigger className="w-40 h-8 border-none focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">Starter</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Barre d'outils supérieure */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Titre et état IA */}
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Workbench</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Cpu className="w-4 h-4 text-codeo-green" />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {config.engine}
                  </span>
                  <span className={`text-sm font-medium ${config.statusColor}`}>
                    • {config.status}
                  </span>
                </div>
              </div>

              {/* Sélecteurs */}
              <div className="flex items-center gap-4">
                {/* Sélecteur de Framework */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Framework:</span>
                  <Select 
                    value={workbenchConfig.framework} 
                    onValueChange={(v) => setWorkbenchConfig(prev => ({ ...prev, framework: v as FrameworkType }))}
                    disabled={!config.frameworks.includes(workbenchConfig.framework)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {config.frameworks.map(framework => (
                        <SelectItem key={framework} value={framework}>
                          <div className="flex items-center gap-2">
                            {getFrameworkIcon(framework)}
                            <span className="capitalize">{framework}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sélecteur de Style Engine */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Style:</span>
                  <Select 
                    value={workbenchConfig.styleEngine} 
                    onValueChange={(v) => setWorkbenchConfig(prev => ({ ...prev, styleEngine: v as StyleEngine }))}
                    disabled={!config.styleEngines.includes(workbenchConfig.styleEngine)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {config.styleEngines.map(engine => (
                        <SelectItem key={engine} value={engine}>
                          <span className="capitalize">{engine.replace('-', ' ')}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {generatedCode && (
                <>
                  <Button variant="outline" size="sm" onClick={copyCode}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadCode}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </>
              )}
              <Button 
                onClick={generateCode} 
                disabled={!uploadedImage || isGenerating}
                className="bg-codeo-green hover:bg-codeo-green/90"
              >
                {isGenerating ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Génération...</>
                ) : (
                  <><Sparkles className="w-4 h-4 mr-2" /> Générer</>
                )}
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Espace principal */}
        <div className="flex-1 flex overflow-hidden">
          {/* Espace central - Split View */}
          <div className="flex-1 flex">
            {/* Gauche - Input Image */}
            <div className="w-1/2 border-r border-slate-200 dark:border-slate-700 p-6">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Input</h3>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                </div>

                <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center">
                  {uploadedImage ? (
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded" 
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="text-center p-8">
                      <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-500 dark:text-slate-400 mb-2">
                        Upload une image pour commencer
                      </p>
                      <p className="text-sm text-slate-400">
                        PNG, JPG, WebP jusqu'à 10MB
                      </p>
                    </div>
                  )}
                </div>

                {/* Logs de génération */}
                {isGenerating && (
                  <div className="mt-4 p-4 bg-slate-900 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-codeo-green animate-pulse" />
                      <span className="text-sm font-medium text-codeo-green">Génération en cours...</span>
                    </div>
                    <div className="space-y-1">
                      {logs.map((log) => (
                        <div key={log.id} className="flex items-center gap-2 text-xs text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>{log.message}</span>
                        </div>
                      ))}
                      {currentLog && (
                        <div className="flex items-center gap-2 text-xs text-codeo-green animate-pulse">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>{currentLog}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Droite - Output Code */}
            <div className="w-1/2 p-6">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Output</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={showPreview ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowPreview(false)}
                    >
                      <Code2 className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    <Button
                      variant={showPreview ? "outline" : "default"}
                      size="sm"
                      onClick={() => setShowPreview(true)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>

                <div className="flex-1 bg-slate-900 rounded-lg overflow-hidden">
                  {generatedCode ? (
                    showPreview ? (
                      <div className="p-6 h-full overflow-auto">
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                          <h2 className="text-2xl font-bold mb-4">Composant généré pour vous</h2>
                          <p className="text-gray-600">
                            Framework: {workbenchConfig.framework} | 
                            Style: {workbenchConfig.styleEngine}
                            {workbenchConfig.enableAnimations && ' | Animations: Oui'}
                            {workbenchConfig.enableAccessibility && ' | Accessibilité: Oui'}
                            {workbenchConfig.enableSecurity && ' | Sécurité: Oui'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <pre className="p-6 h-full overflow-auto text-sm text-slate-300">
                        <code>{generatedCode}</code>
                      </pre>
                    )
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <Code2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400">
                          Le code généré apparaîtra ici
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Panneau latéral droit - Configuration avancée */}
          <div className="w-80 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
              Configuration Avancée
            </h3>

            <div className="space-y-6">
              {/* Options de base */}
              <div>
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Options de génération
                </h4>
                <div className="space-y-3">
                  {/* Animations */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-600 dark:text-slate-400">
                      Animations Framer Motion
                    </label>
                    <Button
                      variant={workbenchConfig.enableAnimations ? "default" : "outline"}
                      size="sm"
                      onClick={() => setWorkbenchConfig(prev => ({ ...prev, enableAnimations: !prev.enableAnimations }))}
                      disabled={!config.options.enableAnimations}
                    >
                      {config.options.enableAnimations ? (
                        workbenchConfig.enableAnimations ? 'Activé' : 'Désactivé'
                      ) : (
                        <><ShieldCheck className="w-3 h-3 mr-1" />Pro</>
                      )}
                    </Button>
                  </div>

                  {/* Accessibilité */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-600 dark:text-slate-400">
                      Accessibilité (ARIA)
                    </label>
                    <Button
                      variant={workbenchConfig.enableAccessibility ? "default" : "outline"}
                      size="sm"
                      onClick={() => setWorkbenchConfig(prev => ({ ...prev, enableAccessibility: !prev.enableAccessibility }))}
                      disabled={!config.options.enableAccessibility}
                    >
                      {config.options.enableAccessibility ? (
                        workbenchConfig.enableAccessibility ? 'Activé' : 'Désactivé'
                      ) : (
                        <><ShieldCheck className="w-3 h-3 mr-1" />Pro</>
                      )}
                    </Button>
                  </div>

                  {/* Sécurité */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-600 dark:text-slate-400">
                      Vérification Sécurité
                    </label>
                    <Button
                      variant={workbenchConfig.enableSecurity ? "default" : "outline"}
                      size="sm"
                      onClick={() => setWorkbenchConfig(prev => ({ ...prev, enableSecurity: !prev.enableSecurity }))}
                      disabled={!config.options.enableSecurity}
                    >
                      {config.options.enableSecurity ? (
                        workbenchConfig.enableSecurity ? 'Activé' : 'Désactivé'
                      ) : (
                        <><ShieldCheck className="w-3 h-3 mr-1" />Business</>
                      )}
                    </Button>
                  </div>

                  {/* Design System */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-600 dark:text-slate-400">
                      Sync Design System
                    </label>
                    <Button
                      variant={workbenchConfig.enableDesignSystem ? "default" : "outline"}
                      size="sm"
                      onClick={() => setWorkbenchConfig(prev => ({ ...prev, enableDesignSystem: !prev.enableDesignSystem }))}
                      disabled={!config.options.enableDesignSystem}
                    >
                      {config.options.enableDesignSystem ? (
                        workbenchConfig.enableDesignSystem ? 'Activé' : 'Désactivé'
                      ) : (
                        <><ShieldCheck className="w-3 h-3 mr-1" />Business</>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Variantes */}
              <div>
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Variantes
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-600 dark:text-slate-400">
                      Mode Sombre
                    </label>
                    <Button
                      variant={workbenchConfig.darkMode ? "default" : "outline"}
                      size="sm"
                      onClick={() => setWorkbenchConfig(prev => ({ ...prev, darkMode: !prev.darkMode }))}
                    >
                      {workbenchConfig.darkMode ? <Moon className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-600 dark:text-slate-400">
                      Version Mobile
                    </label>
                    <Button
                      variant={workbenchConfig.mobile ? "default" : "outline"}
                      size="sm"
                      onClick={() => setWorkbenchConfig(prev => ({ ...prev, mobile: !prev.mobile }))}
                    >
                      {workbenchConfig.mobile ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Infos du plan */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Votre plan: {config.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activePlan === 'starter' && 'Accès aux fonctionnalités de base'}
                    {activePlan === 'pro' && 'Performances GPU et options avancées'}
                    {activePlan === 'business' && 'Sécurité entreprise et Design System'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
