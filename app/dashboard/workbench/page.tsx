'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast, Toaster } from 'sonner'
import {
  Sparkles, Zap, Upload, Download, Copy, Play, Settings, Monitor, Code2, Palette, ShieldCheck, Shield, Crown, Cpu, Activity, Clock, ChevronDown, CheckCircle, AlertCircle, X, ArrowRight, Loader2, Eye, EyeOff, Moon, Smartphone, GitBranch, Database, Server, Globe, Atom, Triangle, Square, Type, Users, BarChart3, Cloud, Lock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { usePlan } from '../layout'
import dynamic from 'next/dynamic'

// Lazy load Monaco Editor pour améliorer les performances
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-slate-400" />
        <p className="text-sm text-slate-400">Chargement de l'éditeur...</p>
      </div>
    </div>
  )
})

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
  seo: boolean
  typescript: boolean
  ssr: boolean
  multiFramework: boolean
  analytics: boolean
  teamCollaboration: boolean
  advancedAnalytics: boolean
  cloudDeployment: boolean
  endToEndEncryption: boolean
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
    frameworks: ['react', 'nextjs', 'vue', 'html', 'tailwind'] as FrameworkType[],
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
    frameworks: ['react', 'nextjs', 'vue', 'html', 'tailwind'] as FrameworkType[],
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
  const [generationProgress, setGenerationProgress] = useState(0)
  const [isConfigPanelCollapsed, setIsConfigPanelCollapsed] = useState(false)
  const [workbenchConfig, setWorkbenchConfig] = useState<WorkbenchConfig>({
    framework: 'react',
    styleEngine: 'tailwind',
    enableAnimations: false,
    enableAccessibility: false,
    enableSecurity: false,
    enableDesignSystem: false,
    darkMode: false,
    mobile: false,
    seo: false,
    typescript: false,
    ssr: false,
    multiFramework: false,
    analytics: false,
    teamCollaboration: false,
    advancedAnalytics: false,
    cloudDeployment: false,
    endToEndEncryption: false
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Memoization des calculs coûteux
  const frameworkOptions = useMemo(() =>
    config.frameworks.map(framework => ({
      value: framework,
      label: framework.charAt(0).toUpperCase() + framework.slice(1),
      icon: getFrameworkIcon(framework)
    })), [config.frameworks]
  )

  const styleEngineOptions = useMemo(() =>
    config.styleEngines.map(engine => ({
      value: engine,
      label: engine.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
    })), [config.styleEngines]
  )

  // Génération de code simulée avec progression
  const generateCode = async () => {
    if (!uploadedImage) {
      toast.error('Veuillez d\'abord uploader une image')
      return
    }

    setIsGenerating(true)
    setLogs([])
    setGeneratedCode('')
    setGenerationProgress(0)

    // Simuler les logs de génération avec progression
    for (let i = 0; i < config.logs.length; i++) {
      const progressStep = (i + 1) / config.logs.length * 100
      setGenerationProgress(progressStep)

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
    setGenerationProgress(100)
    setIsGenerating(false)
    setCurrentLog('')
    toast.success('Composant généré avec succès !')
  }

  // Upload d'image
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        toast.success('Image uploadée avec succès !')
      }
      reader.readAsDataURL(file)
    }
  }, [])

  // Gestion du drag & drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find(file => file.type.startsWith('image/'))

    if (imageFile) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        toast.success('Image déposée avec succès !')
      }
      reader.readAsDataURL(imageFile)
    } else {
      toast.error('Veuillez déposer une image valide')
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

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
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" onClick={copyCode}>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Code
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copier le code généré dans le presse-papiers</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" onClick={downloadCode}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Télécharger le fichier TypeScript</TooltipContent>
                  </Tooltip>
                  {(activePlan === 'pro' || activePlan === 'business') && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => toast.info('Intégration Git - Fonctionnalité à venir')}>
                          <GitBranch className="w-4 h-4 mr-2" />
                          Commit to Git
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Committer le code vers votre dépôt Git</TooltipContent>
                    </Tooltip>
                  )}
                </>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
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
                </TooltipTrigger>
                <TooltipContent>
                  {!uploadedImage
                    ? "Upload une image d'abord"
                    : isGenerating
                    ? "Génération en cours..."
                    : "Analyser l'image et générer le code"
                  }
                </TooltipContent>
              </Tooltip>
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

                <div
                  className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center transition-colors hover:border-codeo-green/50 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {uploadedImage ? (
                    <div className="relative w-full h-full">
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="max-w-full max-h-full object-contain rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center opacity-0 hover:opacity-100">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setUploadedImage(null)}
                          className="bg-white/90 hover:bg-white"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-500 dark:text-slate-400 mb-2">
                        Déposez une image ou cliquez pour uploader
                      </p>
                      <p className="text-sm text-slate-400 mb-4">
                        PNG, JPG, WebP jusqu'à 10MB
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="border-codeo-green text-codeo-green hover:bg-codeo-green/10"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choisir un fichier
                      </Button>
                    </div>
                  )}
                </div>

                {/* Logs de génération avec progression */}
                {isGenerating && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-slate-900 rounded-lg border border-slate-700"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-codeo-green animate-pulse" />
                        <span className="text-sm font-medium text-codeo-green">Génération en cours...</span>
                      </div>
                      <span className="text-sm text-slate-400">{Math.round(generationProgress)}%</span>
                    </div>

                    {/* Barre de progression */}
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-4 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-codeo-green to-green-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${generationProgress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>

                    {/* Timeline des logs */}
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {logs.map((log, index) => (
                        <motion.div
                          key={log.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 text-xs"
                        >
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                            log.type === 'success' ? 'bg-green-400' :
                            log.type === 'warning' ? 'bg-amber-400' :
                            log.type === 'error' ? 'bg-red-400' : 'bg-blue-400'
                          }`} />
                          <div className="flex-1">
                            <span className={`${
                              log.type === 'success' ? 'text-green-400' :
                              log.type === 'warning' ? 'text-amber-400' :
                              log.type === 'error' ? 'text-red-400' : 'text-slate-300'
                            }`}>
                              {log.message}
                            </span>
                            <div className="text-slate-500 text-[10px] mt-0.5">
                              {log.timestamp.toLocaleTimeString('fr-FR', {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                              })}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      {currentLog && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-start gap-3 text-xs"
                        >
                          <Loader2 className="w-3 h-3 animate-spin text-codeo-green mt-1.5 flex-shrink-0" />
                          <div className="flex-1">
                            <span className="text-codeo-green animate-pulse">{currentLog}</span>
                            <div className="text-slate-500 text-[10px] mt-0.5">En cours...</div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
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
                      <MonacoEditor
                        height="100%"
                        language="typescript"
                        value={generatedCode}
                        theme="vs-dark"
                        options={{
                          readOnly: true,
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: 'on',
                          roundedSelection: false,
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                        }}
                      />
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
          <motion.div
            className="bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700"
            initial={false}
            animate={{
              width: isConfigPanelCollapsed ? 48 : 320,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.8
              }
            }}
          >
            {/* Header avec bouton collapse */}
            <div className="border-b border-slate-200 dark:border-slate-700">
              {isConfigPanelCollapsed ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsConfigPanelCollapsed(!isConfigPanelCollapsed)}
                  className="w-full h-12 rounded-none hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center"
                >
                  <ChevronDown className="w-5 h-5 rotate-90" />
                </Button>
              ) : (
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Configuration
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsConfigPanelCollapsed(!isConfigPanelCollapsed)}
                      className="h-10 w-16 p-0 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center"
                    >
                      <ChevronDown className="w-5 h-5 -rotate-90" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {!isConfigPanelCollapsed && (
              <div className="p-4 space-y-5 overflow-y-auto max-h-[calc(100vh-200px)]">
                {/* État IA */}
                <div className="p-3 bg-gradient-to-br from-codeo-green/5 to-emerald-50 dark:from-codeo-green/10 dark:to-emerald-950/20 rounded-xl border border-codeo-green/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-codeo-green rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-codeo-green">{config.engine}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{config.status}</p>
                </div>

                {/* Options par plan - Starter */}
                {(activePlan === 'starter') && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Fonctionnalités de base</h4>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">Gratuit</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <div className="flex items-center gap-2">
                          <Moon className="w-3 h-3 text-slate-400" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">Mode sombre</span>
                        </div>
                        <Button
                          variant={workbenchConfig.darkMode ? "default" : "outline"}
                          size="sm"
                          onClick={() => setWorkbenchConfig(prev => ({ ...prev, darkMode: !prev.darkMode }))}
                          className="h-7 w-7 p-0"
                        >
                          {workbenchConfig.darkMode ? <Moon className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-3 h-3 text-slate-400" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">Mobile first</span>
                        </div>
                        <Button
                          variant={workbenchConfig.mobile ? "default" : "outline"}
                          size="sm"
                          onClick={() => setWorkbenchConfig(prev => ({ ...prev, mobile: !prev.mobile }))}
                          className="h-7 w-7 p-0"
                        >
                          {workbenchConfig.mobile ? <Smartphone className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <div className="flex items-center gap-2">
                          <Globe className="w-3 h-3 text-slate-400" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">SEO basique</span>
                        </div>
                        <Button
                          variant={workbenchConfig.seo ? "default" : "outline"}
                          size="sm"
                          onClick={() => setWorkbenchConfig(prev => ({ ...prev, seo: !prev.seo }))}
                          className="h-7 w-7 p-0"
                        >
                          {workbenchConfig.seo ? <Globe className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-3 h-3 text-slate-400" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">TypeScript</span>
                        </div>
                        <Button
                          variant={workbenchConfig.typescript ? "default" : "outline"}
                          size="sm"
                          onClick={() => setWorkbenchConfig(prev => ({ ...prev, typescript: !prev.typescript }))}
                          className="h-7 w-7 p-0"
                        >
                          {workbenchConfig.typescript ? <Code2 className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        </Button>
                      </div>
                    </div>
                    {/* Call to upgrade */}
                    <div className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg border border-amber-200/50 dark:border-amber-800/30">
                      <p className="text-xs text-amber-800 dark:text-amber-200 font-medium mb-2">
                        🔥 Débloquez des fonctionnalités avancées
                      </p>
                      <p className="text-[10px] text-amber-700 dark:text-amber-300 mb-2">
                        Animations, accessibilité, sécurité et + encore
                      </p>
                      <Button
                        size="sm"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs h-7"
                        onClick={() => toast.info("Upgrade vers Pro - Fonctionnalité à venir")}
                      >
                        Passer Pro - 49€
                      </Button>
                    </div>
                  </div>
                )}

                {/* Options Pro */}
                {(activePlan === 'pro' || activePlan === 'business') && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Options Pro</h4>
                      <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">Activé</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-amber-50/50 dark:hover:bg-amber-950/20">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Zap className="w-3 h-3 text-amber-500" />
                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Animations Framer Motion</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Interactions fluides et engagement utilisateur +40%</p>
                        </div>
                        <Button
                          variant={workbenchConfig.enableAnimations ? "default" : "outline"}
                          size="sm"
                          onClick={() => setWorkbenchConfig(prev => ({ ...prev, enableAnimations: !prev.enableAnimations }))}
                          className="h-7 w-7 p-0 ml-2 flex-shrink-0"
                        >
                          {workbenchConfig.enableAnimations ? <CheckCircle className="w-3 h-3 text-green-600" /> : <X className="w-3 h-3" />}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-amber-50/50 dark:hover:bg-amber-950/20">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <ShieldCheck className="w-3 h-3 text-amber-500" />
                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Accessibilité WCAG</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Conformité et inclusion pour tous vos utilisateurs</p>
                        </div>
                        <Button
                          variant={workbenchConfig.enableAccessibility ? "default" : "outline"}
                          size="sm"
                          onClick={() => setWorkbenchConfig(prev => ({ ...prev, enableAccessibility: !prev.enableAccessibility }))}
                          className="h-7 w-7 p-0 ml-2 flex-shrink-0"
                        >
                          {workbenchConfig.enableAccessibility ? <CheckCircle className="w-3 h-3 text-green-600" /> : <X className="w-3 h-3" />}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-amber-50/50 dark:hover:bg-amber-950/20">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Server className="w-3 h-3 text-amber-500" />
                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">SSR/SSG Optimisé</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Performance serveur et SEO avancé</p>
                        </div>
                        <Button
                          variant={workbenchConfig.ssr ? "default" : "outline"}
                          size="sm"
                          onClick={() => setWorkbenchConfig(prev => ({ ...prev, ssr: !prev.ssr }))}
                          className="h-7 w-7 p-0 ml-2 flex-shrink-0"
                        >
                          {workbenchConfig.ssr ? <CheckCircle className="w-3 h-3 text-green-600" /> : <X className="w-3 h-3" />}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-amber-50/50 dark:hover:bg-amber-950/20">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <GitBranch className="w-3 h-3 text-amber-500" />
                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Multi-framework</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Export React, Vue, Svelte, Angular</p>
                        </div>
                        <Button
                          variant={workbenchConfig.multiFramework ? "default" : "outline"}
                          size="sm"
                          onClick={() => setWorkbenchConfig(prev => ({ ...prev, multiFramework: !prev.multiFramework }))}
                          className="h-7 w-7 p-0 ml-2 flex-shrink-0"
                        >
                          {workbenchConfig.multiFramework ? <CheckCircle className="w-3 h-3 text-green-600" /> : <X className="w-3 h-3" />}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-amber-50/50 dark:hover:bg-amber-950/20">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Activity className="w-3 h-3 text-amber-500" />
                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Analytics intégré</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Tracking automatique des interactions</p>
                        </div>
                        <Button
                          variant={workbenchConfig.analytics ? "default" : "outline"}
                          size="sm"
                          onClick={() => setWorkbenchConfig(prev => ({ ...prev, analytics: !prev.analytics }))}
                          className="h-7 w-7 p-0 ml-2 flex-shrink-0"
                        >
                          {workbenchConfig.analytics ? <CheckCircle className="w-3 h-3 text-green-600" /> : <X className="w-3 h-3" />}
                        </Button>
                      </div>
                    </div>
                    {/* Pro benefits highlight */}
                    <div className="mt-3 p-2 bg-amber-50/50 dark:bg-amber-950/10 rounded-lg border border-amber-200/30 dark:border-amber-800/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="w-3 h-3 text-amber-600" />
                        <span className="text-xs font-medium text-amber-800 dark:text-amber-200">GPU Turbo activé</span>
                      </div>
                      <p className="text-[10px] text-amber-700 dark:text-amber-300">Génération 2.5x plus rapide</p>
                    </div>
                  </div>
                )}

                {/* Options Business */}
                {activePlan === 'business' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Entreprise</h4>
                      <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">Premium</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-50/50 dark:hover:bg-purple-950/20">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Shield className="w-3 h-3 text-purple-500" />
                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Sécurité Enterprise</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Audit automatique et conformité RGPD/SOC2</p>
                        </div>
                        <Button
                          variant={workbenchConfig.enableSecurity ? "default" : "outline"}
                          size="sm"
                          onClick={() => setWorkbenchConfig(prev => ({ ...prev, enableSecurity: !prev.enableSecurity }))}
                          className="h-7 w-7 p-0 ml-2 flex-shrink-0"
                        >
                          {workbenchConfig.enableSecurity ? <ShieldCheck className="w-3 h-3 text-green-600" /> : <X className="w-3 h-3" />}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-50/50 dark:hover:bg-purple-950/20">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Palette className="w-3 h-3 text-purple-500" />
                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Design System Avancé</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Tokens automatiques et composants partagés</p>
                        </div>
                        <Button
                          variant={workbenchConfig.enableDesignSystem ? "default" : "outline"}
                          size="sm"
                          onClick={() => setWorkbenchConfig(prev => ({ ...prev, enableDesignSystem: !prev.enableDesignSystem }))}
                          className="h-7 w-7 p-0 ml-2 flex-shrink-0"
                        >
                          {workbenchConfig.enableDesignSystem ? <Database className="w-3 h-3 text-green-600" /> : <X className="w-3 h-3" />}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-50/50 dark:hover:bg-purple-950/20">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="w-3 h-3 text-purple-500" />
                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Collaboration équipe</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Workspaces partagés et révisions temps réel</p>
                        </div>
                        <Button
                          variant={workbenchConfig.teamCollaboration ? "default" : "outline"}
                          size="sm"
                          onClick={() => setWorkbenchConfig(prev => ({ ...prev, teamCollaboration: !prev.teamCollaboration }))}
                          className="h-7 w-7 p-0 ml-2 flex-shrink-0"
                        >
                          {workbenchConfig.teamCollaboration ? <CheckCircle className="w-3 h-3 text-green-600" /> : <X className="w-3 h-3" />}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-50/50 dark:hover:bg-purple-950/20">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <BarChart3 className="w-3 h-3 text-purple-500" />
                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Analytics avancés</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Métriques équipe et rapports détaillés</p>
                        </div>
                        <Button
                          variant={workbenchConfig.advancedAnalytics ? "default" : "outline"}
                          size="sm"
                          onClick={() => setWorkbenchConfig(prev => ({ ...prev, advancedAnalytics: !prev.advancedAnalytics }))}
                          className="h-7 w-7 p-0 ml-2 flex-shrink-0"
                        >
                          {workbenchConfig.advancedAnalytics ? <CheckCircle className="w-3 h-3 text-green-600" /> : <X className="w-3 h-3" />}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-50/50 dark:hover:bg-purple-950/20">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Cloud className="w-3 h-3 text-purple-500" />
                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Déploiement cloud</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">CI/CD automatique et environnements staging</p>
                        </div>
                        <Button
                          variant={workbenchConfig.cloudDeployment ? "default" : "outline"}
                          size="sm"
                          onClick={() => setWorkbenchConfig(prev => ({ ...prev, cloudDeployment: !prev.cloudDeployment }))}
                          className="h-7 w-7 p-0 ml-2 flex-shrink-0"
                        >
                          {workbenchConfig.cloudDeployment ? <CheckCircle className="w-3 h-3 text-green-600" /> : <X className="w-3 h-3" />}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-50/50 dark:hover:bg-purple-950/20">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Lock className="w-3 h-3 text-purple-500" />
                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Chiffrement end-to-end</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">Sécurité maximale pour données sensibles</p>
                        </div>
                        <Button
                          variant={workbenchConfig.endToEndEncryption ? "default" : "outline"}
                          size="sm"
                          onClick={() => setWorkbenchConfig(prev => ({ ...prev, endToEndEncryption: !prev.endToEndEncryption }))}
                          className="h-7 w-7 p-0 ml-2 flex-shrink-0"
                        >
                          {workbenchConfig.endToEndEncryption ? <CheckCircle className="w-3 h-3 text-green-600" /> : <X className="w-3 h-3" />}
                        </Button>
                      </div>
                    </div>
                    {/* Business benefits highlight */}
                    <div className="mt-3 p-2 bg-purple-50/50 dark:bg-purple-950/10 rounded-lg border border-purple-200/30 dark:border-purple-800/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Crown className="w-3 h-3 text-purple-600" />
                        <span className="text-xs font-medium text-purple-800 dark:text-purple-200">V-AST Enterprise</span>
                      </div>
                      <p className="text-[10px] text-purple-700 dark:text-purple-300">IA spécialisée équipe + stats collaboratives</p>
                    </div>
                  </div>
                )}

                {/* Statistiques d'usage */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 dark:text-slate-400">Plan actuel</span>
                      <span className={`font-medium ${activePlan === 'business' ? 'text-purple-600' : activePlan === 'pro' ? 'text-codeo-green' : 'text-amber-600'}`}>{config.name}</span>
                    </div>
                    {activePlan !== 'starter' && (
                      <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        Générations illimitées
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </TooltipProvider>
  )
}
