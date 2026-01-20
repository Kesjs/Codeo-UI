'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { toast, Toaster } from 'sonner'
import { 
  Sparkles, Zap, History, Layout, ArrowRight, ArrowUpRight, ShieldCheck, UserCog,
  Search, ThumbsUp, ThumbsDown, Users, Clock, Activity, ChevronDown, Bell, CheckCircle, AlertCircle, X, ArrowUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import ProjectCard from '@/components/dashboard/ProjectCard'
import { usePlan } from '../layout'

// ── Types ────────────────────────────────────────────────
interface Project {
  id: string
  name: string
  thumbnail: string
  date: string
  frameworks: string[]
  efficiency: number 
}

// ── Mock projects ────────────────────────────────────────
const mockProjects: Project[] = [
  { id: '1', name: 'Système Analytics v2', thumbnail: '/images/dashboard-thumb.jpg', date: '15 Jan 2026', frameworks: ['React', 'Tailwind'], efficiency: 98 },
  { id: '2', name: 'Shopify Checkout UI', thumbnail: '/images/ecommerce-thumb.jpg', date: '10 Jan 2026', frameworks: ['Next.js'], efficiency: 94 },
  { id: '3', name: 'Dashboard Admin RH', thumbnail: '/images/admin-thumb.jpg', date: '05 Jan 2026', frameworks: ['Vue', 'Tailwind'], efficiency: 95 },
  { id: '4', name: 'Portfolio Moderne', thumbnail: '/images/portfolio-thumb.jpg', date: '20 Jan 2026', frameworks: ['HTML', 'Tailwind'], efficiency: 97 },
]

// ── Configurations par plan ──────────────────────────────
const planConfigs: Record<PlanType, PlanConfig> = {
  starter: {
    name: 'Starter',
    price: '0 €',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50',
    scansMax: 10,
    scansUsed: 8,
    timeSaved: 9,
    timeValue: 450, // 9h * 50€/h
    avgEfficiency: 92,
    showQuota: true,
    showUpsell: true,
    upsellTitle: 'Tu mérites l\'illimité',
    upsellText: 'Plus que 2 scans ce mois… Passe Pro pour des générations sans limite, Vue/Svelte et +18h de productivité/mois.',
    upsellButton: 'Passer Pro – 49 €',
    extraInsight: null,
    team: undefined,
    featureUsage: {
      codeGeneration: 45, // % d'utilisation
      codeReview: 30,
      refactoring: 15,
      documentation: 10
    },
    monthlyTrend: {
      timeSaved: [5, 6, 7, 8, 9],
      efficiency: [88, 89, 90, 91, 92]
    },
    userComparison: {
      timeSavedVsAvg: '+15%',
      efficiencyVsAvg: '+5%'
    }
  },
  pro: {
    name: 'Pro',
    price: '49 €',
    badgeColor: 'bg-codeo-green/20 text-codeo-green',
    scansMax: Infinity,
    scansUsed: 47,
    timeSaved: 18,
    timeValue: 900, // 18h * 50€/h
    avgEfficiency: 96,
    showQuota: false,
    showUpsell: true,
    upsellTitle: 'Prêt pour l\'équipe ?',
    upsellText: 'Ajoute SSO, jusqu\'à 10 users, entraînement IA personnalisé et support 24/7.',
    upsellButton: 'Passer Business – 149 €',
    extraInsight: '+24 % vs Starter (accès GPU prioritaire)',
    team: undefined,
    gpuUsage: {
      priorityAccess: true,
      speedBoost: '2.5x',
      gpuHours: 12
    },
    featureUsage: {
      codeGeneration: 65,
      codeReview: 45,
      refactoring: 30,
      documentation: 20
    },
    monthlyTrend: {
      timeSaved: [10, 12, 14, 16, 18],
      efficiency: [92, 93, 94, 95, 96]
    },
    userComparison: {
      timeSavedVsAvg: '+32%',
      efficiencyVsAvg: '+8%'
    }
  },
  business: {
    name: 'Business',
    price: '149 €',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50',
    scansMax: Infinity,
    scansUsed: 142,
    timeSaved: 42,
    timeValue: 2100, // 42h * 50€/h
    avgEfficiency: 98,
    showQuota: false,
    showUpsell: false,
    upsellTitle: '',
    upsellText: '',
    upsellButton: '',
    extraInsight: 'Équipe optimisée • Analyse sécurité avancée active',
    team: {
      activeUsers: 7,
      invitedUsers: 3,
      lastActivity: 'il y a 42 min',
      totalScans: 284,
      totalTimeSaved: 168,
    },
    gpuUsage: {
      priorityAccess: true,
      speedBoost: '3x',
      gpuHours: 45
    },
    securityMetrics: {
      vulnScans: 28,
      complianceChecks: 15,
      securityScore: 97
    },
    featureUsage: {
      codeGeneration: 85,
      codeReview: 70,
      refactoring: 55,
      documentation: 45
    },
    monthlyTrend: {
      timeSaved: [25, 30, 35, 40, 42],
      efficiency: [95, 96, 97, 97, 98]
    },
    userComparison: {
      timeSavedVsAvg: '+68%',
      efficiencyVsAvg: '+12%'
    }
  },
}

interface TeamStats {
  activeUsers: number;
  invitedUsers: number;
  lastActivity: string;
  totalScans: number;
  totalTimeSaved: number;
}

interface PlanConfig {
  name: string
  price: string
  badgeColor: string
  scansMax: number
  scansUsed: number
  timeSaved: number
  timeValue: number // Valeur monétaire du temps économisé (en €)
  avgEfficiency: number
  showQuota: boolean
  showUpsell: boolean
  upsellTitle: string
  upsellText: string
  upsellButton: string
  extraInsight: string | null
  team?: TeamStats
  // Nouvelles métriques
  featureUsage?: {
    codeGeneration: number
    codeReview: number
    refactoring: number
    documentation: number
  }
  gpuUsage?: {
    priorityAccess: boolean
    speedBoost: string
    gpuHours: number
  }
  securityMetrics?: {
    vulnScans: number
    complianceChecks: number
    securityScore: number
  }
  monthlyTrend?: {
    timeSaved: number[]
    efficiency: number[]
  }
  userComparison?: {
    timeSavedVsAvg: string
    efficiencyVsAvg: string
  }
}

type PlanType = 'starter' | 'pro' | 'business'

interface NotificationBellProps {
  showQuota: boolean;
  scansUsed: number;
  scansMax: number;
}

type NotificationType = 'update' | 'feature' | 'alert';

// Composant de notification
function NotificationBell({ showQuota, scansUsed, scansMax }: NotificationBellProps) {
  type NotificationItem = {
    id: number;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: 'update' | 'feature' | 'alert';
  };

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const initialNotifications = [
      {
        id: 1,
        title: 'Mise à jour disponible',
        message: 'Codeo Engine v4.3 – +15% précision sur designs complexes & Figma imports',
        time: 'À l\'instant',
        read: false,
        type: 'update' as const
      },
      {
        id: 2,
        title: 'Nouvelle fonctionnalité',
        message: 'Essayez notre nouvel outil de collaboration en temps réel',
        time: 'Aujourd\'hui',
        read: false,
        type: 'feature' as const
      }
    ]

    // Ajout d'une notification de quota pour le plan Starter
    if (showQuota && scansUsed >= 7) {
      initialNotifications.push({
        id: 3,
        title: 'Quota bientôt épuisé',
        message: `Il ne te reste que ${scansMax - scansUsed} scans ce mois.`,
        time: 'Aujourd\'hui',
        read: false,
        type: 'update'
      } as const)
    }

    return initialNotifications
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-muted-foreground"
              onClick={markAllAsRead}
            >
              Tout marquer comme lu
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 hover:bg-muted/50 cursor-pointer ${!notification.read ? 'bg-muted/30' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  {notification.type === 'update' && (
                    <div className="mt-0.5 rounded-full bg-blue-100 p-1.5 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  )}
                  {notification.type === 'feature' && (
                    <div className="mt-0.5 rounded-full bg-green-100 p-1.5 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  )}
                  {notification.type === 'alert' && (
                    <div className="mt-0.5 rounded-full bg-amber-100 p-1.5 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400">
                      <AlertCircle className="h-4 w-4" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Bell className="mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Aucune notification</p>
            </div>
          )}
        </div>
        {notifications.length > 0 && (
          <div className="border-t p-2 text-center">
            <Button variant="ghost" size="sm" className="text-xs">
              Voir toutes les notifications
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterFramework, setFilterFramework] = useState('all')

  // Simulation dev toggle
  const { activePlan, simulatedPlan, setSimulatedPlan, isDevMode } = usePlan() // ← remplace en prod par auth réelle

  const config = planConfigs[activePlan]

  // Fonction pour générer un graphique sparkline
  const renderSparkline = (data: number[], color: string) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    return (
      <div className="h-10 w-full flex items-end gap-px">
        {data.map((value, i) => {
          const height = ((value - min) / range) * 100 || 10;
          return (
            <div 
              key={i}
              className={`flex-1 rounded-t-sm ${color}`}
              style={{ height: `${Math.max(10, height)}%` }}
            />
          );
        })}
      </div>
    );
  };

  // Filtrage des projets
  const filteredProjects = mockProjects.filter(p => {
    const matchesName = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFramework = filterFramework === 'all' || p.frameworks.some(f => f.toLowerCase().includes(filterFramework.toLowerCase()))
    return matchesName && matchesFramework
  })

  // Feedback thumbs
  const handleFeedback = (projectId: string, type: 'up' | 'down') => {
    toast.success(type === 'up' ? "Super retour !" : "Merci pour ton honnêteté", {
      description: "Ça aide énormément à améliorer l'IA pour tout le monde.",
      duration: 4000,
    })
    // En prod : POST vers ton API
  }

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700)
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Vérifie si la touche est 'k' et si Ctrl (ou Cmd sur Mac) est pressé
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault(); // Empêche le comportement par défaut du navigateur
        searchInputRef.current?.focus(); // Met le focus sur l'input de recherche
      }
    };

    // Ajoute l'écouteur d'événement
    window.addEventListener('keydown', handleKeyDown);
    
    // Nettoie l'écouteur d'événement lors du démontage du composant
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
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
    <TooltipProvider>
      <Toaster position="top-right" richColors closeButton duration={3000} />
      <div className="max-w-[1440px] mx-auto space-y-10 p-4 lg:p-8 relative">

        {/* Toggle dev uniquement */}
        {isDevMode && (
          <div className="fixed top-16 right-6 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg px-4 py-2.5">
            <div className="flex items-center gap-3 text-sm font-medium">
              <UserCog size={16} className="text-slate-500" />
              <Select value={simulatedPlan} onValueChange={(v) => setSimulatedPlan(v as PlanType)}>
                <SelectTrigger className="w-40 h-8 border-none focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">Starter (Free)</SelectItem>
                  <SelectItem value="pro">Pro (49 €)</SelectItem>
                  <SelectItem value="business">Business (149 €)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* HEADER + Recherche */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center justify-between w-full">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Heureux de vous revoir, Ken <span className="text-codeo-green">.</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 capitalize">
                  {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          {/* Recherche + filtre */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-codeo-green transition-colors duration-200 z-10 pointer-events-none" />
              <Input
                ref={searchInputRef}
                placeholder="Rechercher un projet (nom, date...)"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 bg-white dark:bg-slate-900 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-black/20 border border-black/10 transition-colors duration-200 hover:border-black/15 shadow-sm"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
                  {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}
                </kbd>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
                  K
                </kbd>
              </div>
            </div>
            <Select value={filterFramework} onValueChange={setFilterFramework}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="React">React</SelectItem>
                <SelectItem value="Next.js">Next.js</SelectItem>
                <SelectItem value="Vue">Vue</SelectItem>
                <SelectItem value="Tailwind">Tailwind</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.header>

        {/* Stats Value Realization – reveal au scroll */}
        <StatsSection config={config} activePlan={activePlan} />

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Colonne gauche : Projets */}
          <div className="lg:col-span-8 space-y-10">
            <section>
              <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-codeo-green/10 rounded-xl flex items-center justify-center">
                    <History className="size-5 text-codeo-green" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
                    Générations récentes {filteredProjects.length > 0 && `(${activePlan === 'starter' ? Math.min(3, filteredProjects.length) + '/3' : filteredProjects.length})`}
                  </h2>
                </div>
                
                {activePlan === 'starter' ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {config.scansMax - config.scansUsed} crédits restants
                    </span>
                    <Button className="bg-codeo-green hover:bg-codeo-green/90 text-white font-semibold">
                      Générer plus <Sparkles className="ml-2 size-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    {activePlan === 'pro' && (
                      <Select>
                        <SelectTrigger className="w-[180px] bg-white dark:bg-slate-800">
                          <SelectValue placeholder="Tous les types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les types</SelectItem>
                          <SelectItem value="code">Code</SelectItem>
                          <SelectItem value="ui">Interface</SelectItem>
                          <SelectItem value="test">Tests</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                    <Button variant="ghost" className="text-slate-500 hover:text-codeo-green font-semibold">
                      Voir tout <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </div>
                )}
              </div>

              {activePlan === 'business' && (
                <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-900"></div>
                        ))}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">
                        <span className="font-medium">Équipe active :</span> {config.team?.activeUsers || 0} membres en ligne
                      </div>
                    </div>
                    <div className="relative">
                      <Input 
                        type="text" 
                        placeholder="Rechercher..." 
                        className="px-4 w-64 bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 focus-visible:ring-2 focus-visible:ring-codeo-green/50 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {filteredProjects.length === 0 ? (
                <div className="text-center py-16 text-slate-500 dark:text-slate-400">
                  Aucun projet ne correspond à ta recherche ou au filtre sélectionné.
                </div>
              ) : (
                <div className={`grid ${activePlan === 'business' ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'} gap-6`}>
                  {(activePlan === 'starter' ? filteredProjects.slice(0, 3) : filteredProjects).map((project, i) => (
                    <motion.div 
                      key={project.id} 
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <ProjectCard 
                        project={project} 
                        isPremium={activePlan === 'pro' || activePlan === 'business'}
                        delay={i}
                      />
                      {/* Feedback */}
                      <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button 
                          size="icon" variant="ghost" className="size-8 rounded-full hover:bg-green-50 hover:text-green-600"
                          onClick={() => handleFeedback(project.id, 'up')}
                        >
                          <ThumbsUp size={16} />
                        </Button>
                        <Button 
                          size="icon" variant="ghost" className="size-8 rounded-full hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleFeedback(project.id, 'down')}
                        >
                          <ThumbsDown size={16} />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </section>

            {/* Bannière upsell */}
            <AnimatePresence>
              {config.showUpsell && (
                <motion.div
                  key={`upsell-${activePlan}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-codeo-green to-emerald-700 rounded-3xl p-8 text-white shadow-2xl shadow-codeo-green/20 relative overflow-hidden"
                >
                  <div className="absolute -top-20 -right-20 size-64 bg-white/10 rounded-full blur-3xl" />
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black mb-3">{config.upsellTitle}</h3>
                      <p className="text-white/90 max-w-md">{config.upsellText}</p>
                    </div>
                    <Button className="bg-white text-codeo-green hover:bg-slate-100 rounded-2xl px-8 py-6 font-black text-lg shadow-lg whitespace-nowrap">
                      {config.upsellButton} <ArrowUpRight className="ml-2 size-5" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Colonne droite – Sidebar avec Accordion sur mobile */}
          <div className="lg:col-span-4">
            <Accordion type="single" collapsible defaultValue="engine" className="space-y-4 lg:space-y-8">
              
              {/* Engine */}
              <AccordionItem value="engine" className="border-none lg:border lg:rounded-2xl lg:bg-white lg:dark:bg-slate-900 lg:shadow-sm lg:p-7">
                <AccordionTrigger className="lg:hidden py-4 px-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-lg font-semibold">
                  Codeo Engine
                </AccordionTrigger>
                <AccordionContent className="lg:contents pt-0 lg:pt-0">
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-7 shadow-sm"
                  >
                    <h3 className="text-sm font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 mb-6 flex items-center justify-between">
                      Codeo Engine
                      <span className="size-2.5 rounded-full bg-codeo-green animate-pulse" />
                    </h3>
                    <div className="space-y-5">
                      <div className="flex items-center gap-4">
                        <div className="size-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl flex items-center justify-center text-codeo-green">
                          <Zap className="size-5 fill-current" />
                        </div>
                        <div>
                          <p className="text-base font-black text-slate-900 dark:text-white">v4.2</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 italic">Ultra-rapide • Stable</p>
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
                </AccordionContent>
              </AccordionItem>

              {/* Guide rapide */}
              <AccordionItem value="guide" className="border-none lg:border lg:rounded-2xl lg:bg-white lg:dark:bg-slate-900 lg:shadow-sm lg:p-7">
                <AccordionTrigger className="lg:hidden py-4 px-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-lg font-semibold">
                  Guide rapide
                </AccordionTrigger>
                <AccordionContent className="lg:contents pt-0 lg:pt-0">
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
                          <span className="text-base font-black text-codeo-green/40 mt-0.5">{step.num}</span>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{step.title}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{step.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AccordionContent>
              </AccordionItem>

              {/* Stats équipe – Business only */}
              {activePlan === 'business' && config.team && (
                <AccordionItem value="team" className="border-none lg:border lg:rounded-2xl lg:bg-white lg:dark:bg-slate-900 lg:shadow-sm lg:p-7">
                  <AccordionTrigger className="lg:hidden py-4 px-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-lg font-semibold">
                    Équipe Business
                  </AccordionTrigger>
                  <AccordionContent className="lg:contents pt-4 lg:pt-0">
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="bg-purple-50 dark:bg-purple-950/30 rounded-2xl p-6 shadow-sm border border-purple-100 dark:border-purple-900/40"
                    >
                      <h3 className="text-lg font-black text-purple-800 dark:text-purple-200 mb-6 flex items-center gap-2">
                        <Users size={20} /> Équipe ({config.team.activeUsers}/{config.team.activeUsers + config.team.invitedUsers})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-purple-100 dark:border-purple-900/30">
                          <div className="flex items-center gap-3 mb-2">
                            <Activity size={20} className="text-purple-600" />
                            <p className="text-sm font-semibold">Dernière activité</p>
                          </div>
                          <p className="text-xl font-black text-purple-800">{config.team.lastActivity}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-purple-100 dark:border-purple-900/30">
                          <div className="flex items-center gap-3 mb-2">
                            <Clock size={20} className="text-purple-600" />
                            <p className="text-sm font-semibold">Usage cumulé</p>
                          </div>
                          <p className="text-xl font-black text-purple-800">{config.team.totalScans} scans</p>
                          <p className="text-sm text-purple-600 font-medium">+{config.team.totalTimeSaved} h gagnées</p>
                        </div>
                      </div>
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

// ── Composant StatsSection avec reveal au scroll ─────────
function StatsSection({ config, activePlan }: { config: PlanConfig; activePlan: PlanType }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, staggerChildren: 0.15 }}
      className="grid grid-cols-1 gap-5 overflow-x-auto pb-4 scrollbar-hide sm:grid-cols-2 lg:grid-cols-4 lg:overflow-visible"
    >
      {/* Carte 1 – Plan */}
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div 
            variants={card}
            className="min-w-[240px] bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/50 p-5 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* En-tête avec badge POPULAIRE intégré */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-base font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">
                    {activePlan === 'business' ? 'Votre abonnement' : 'Ton plan'}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-baseline gap-1">
                      <p className="text-2xl font-black text-slate-900 dark:text-white">
                        {config.price}
                      </p>
                      <span className="text-sm font-medium text-slate-500">/mois</span>
                    </div>
                    {activePlan === 'business' && (
                      <span className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-800 dark:text-purple-200 text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                        POPULAIRE
                      </span>
                    )}
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${config.badgeColor}`}>
                  {config.name}
                </span>
              </div>
              
              {/* Contenu */}
              {activePlan !== 'business' ? (
                <div className="mt-3 space-y-3 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        {activePlan === 'starter' ? '10 scans/mois' : 'Scans illimités'}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {activePlan === 'starter' ? `${config.scansUsed} utilisés` : 'Sans restriction'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
                      <ShieldCheck className="w-4 h-4 text-green-500" />
                      <span className="text-sm">
                        {activePlan === 'starter' ? 'Sécurité' : 'Sécurité +'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span className="text-sm">
                        {activePlan === 'starter' ? 'GPU' : 'GPU 2.5x'}
                      </span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-2 text-codeo-green border-codeo-green hover:bg-codeo-green/5">
                    Upgrade {activePlan === 'starter' ? 'Pro' : 'Business'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="mt-3 space-y-3 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
                    <Users className="w-5 h-5 text-purple-500" />
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">Jusqu'à 10 utilisateurs</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">7 actifs actuellement</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
                      <ShieldCheck className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Sécurité</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span className="text-sm">GPU 3x</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>Détails de votre abonnement actuel</TooltipContent>
      </Tooltip>

      {/* Carte 2 – Scans */}
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div variants={card} className="min-w-[240px] bg-white dark:bg-slate-900 rounded-2xl border p-5 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-base font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">Scans IA ce mois</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-codeo-green/10 text-codeo-green">
                  <Zap size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">
                    {config.showQuota ? `${config.scansUsed}/${config.scansMax}` : 'Illimités'}
                  </p>
                  
                  {/* Ligne d'activité pour tous les plans */}
                  <div className="mt-1">
                    {activePlan === 'starter' ? (
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <Activity className="w-3.5 h-3.5 text-amber-500" />
                          <span>{config.scansUsed} utilisés ce mois</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Dernier scan il y a 12 min</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <Activity className="w-3.5 h-3.5 text-codeo-green" />
                          <span>{config.scansUsed} scans ce mois</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Dernier scan il y a 12 min</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Barre de progression pour le Starter */}
              {activePlan === 'starter' && (
                <div className="space-y-2">
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(config.scansUsed / config.scansMax) * 100}%` }}
                      transition={{ duration: 1.6, ease: 'easeOut' }}
                      className="h-full bg-codeo-green"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>{config.scansUsed} sur {config.scansMax} scans</span>
                    <span>max</span>
                  </div>
                </div>
              )}
              
              {/* Indicateur de tendance pour Pro et Business */}
              {(activePlan === 'pro' || activePlan === 'business') && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-center gap-2 p-2 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
                    <div className="flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-codeo-green" />
                      <div className="text-sm font-medium text-codeo-green">+24%</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">vs mois dernier</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>Utilisation de ton quota mensuel d'IA</TooltipContent>
      </Tooltip>

      {/* Carte 3 – Temps économisé et valeur */}
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div variants={card} className="min-w-[240px] bg-gradient-to-br from-codeo-green/10 to-emerald-100 dark:from-codeo-green/20 dark:to-emerald-950 rounded-2xl p-5 shadow-md border border-codeo-green/20">
            <h3 className="text-base font-black uppercase tracking-widest text-codeo-green mb-3">Temps & Valeur</h3>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-black text-slate-900 dark:text-white">9</div>
                <div className="text-sm font-medium text-slate-500 dark:text-slate-300">h</div>
              </div>
              <div className="text-3xl font-medium text-slate-300 dark:text-slate-600">•</div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-black text-codeo-green">450€</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">économisés</div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Économisé ce mois-ci • <span className="font-medium text-codeo-green">+15% vs moyenne</span>
              </p>
              <p className="text-xs mt-1.5 text-slate-600 dark:text-slate-300">
                <span className="font-medium">Équivalent à ~450€ de temps de développement</span>
              </p>
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>Détails sur le temps économisé et la valeur générée</TooltipContent>
      </Tooltip>


      {/* Carte 5 – Efficacité et comparaison */}
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div variants={card} className="min-w-[240px] bg-white dark:bg-slate-900 rounded-2xl border p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">Efficacité IA</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">{config.avgEfficiency}</span>
                  <span className="text-2xl font-bold text-slate-600 dark:text-slate-400">%</span>
                </div>
                {config.avgEfficiency >= 95 ? (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-bold">
                    <ShieldCheck size={12} /> Excellent
                  </div>
                ) : (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold">
                    <Activity size={12} /> Bon
                  </div>
                )}
              </div>
              
              {activePlan === 'pro' && config.gpuUsage && (
                <div className="text-right">
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 text-xs font-bold">
                    <Zap className="w-3 h-3" fill="currentColor" />
                    Turbo {config.gpuUsage.speedBoost}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{config.gpuUsage.gpuHours}h GPU/mois</div>
                </div>
              )}
              
              {activePlan === 'business' && config.securityMetrics && (
                <div className="text-right">
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs font-bold">
                    <ShieldCheck className="w-3 h-3" />
                    Sécurité {config.securityMetrics.securityScore}/100
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {config.team?.activeUsers || 0} membres actifs
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              {/* Indicateur de performance */}
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 mb-3">
                <span>Votre performance</span>
                <div className="flex items-center gap-1 font-medium">
                  {config.userComparison?.efficiencyVsAvg}
                  <span className="text-slate-400">vs moyenne</span>
                </div>
              </div>
              
              {/* Section spécifique au plan Starter */}
              {activePlan === 'starter' && (
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <span>Quota utilisé</span>
                      <span>{config.scansUsed}/{config.scansMax} scans</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-codeo-green h-2 rounded-full" 
                        style={{ width: `${(config.scansUsed / config.scansMax) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-medium">Astuce :</span> Passez Pro pour des générations illimitées et une vitesse 2.5x plus rapide
                  </div>
                </div>
              )}
              
              {/* Section spécifique au plan Pro */}
              {activePlan === 'pro' && config.gpuUsage && (
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <span>GPU utilisé</span>
                      <span>{config.gpuUsage.gpuHours}h / 20h</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-amber-500 h-2 rounded-full" 
                        style={{ width: `${(config.gpuUsage.gpuHours / 20) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span>Vitesse x{config.gpuUsage.speedBoost}</span>
                      <span>Priorité standard</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-medium">Bonus :</span> Vous économisez environ {config.timeValue}€/mois en temps de développement
                  </div>
                </div>
              )}
              
              {/* Section spécifique au plan Business */}
              {activePlan === 'business' && config.securityMetrics && (
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <span>Activité de l'équipe</span>
                      <span className="flex items-center gap-1 text-green-500">
                        <Activity className="w-3 h-3" />
                        {config.team?.activeUsers || 0} actifs
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span>{config.securityMetrics.vulnScans} scans sécurité</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-green-500">
                        <CheckCircle className="w-3.5 h-3.5" /> {config.securityMetrics.complianceChecks} vérifs
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-medium">Avantage :</span> Sécurité avancée avec {config.securityMetrics.complianceChecks} contrôles de conformité
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          {activePlan === 'starter' 
            ? 'Détails de votre efficacité et utilisation' 
            : activePlan === 'pro' 
              ? 'Statistiques avancées et utilisation GPU' 
              : 'Tableau de bord de l\'équipe et sécurité'}
        </TooltipContent>
      </Tooltip>
    </motion.section>
  )
}

const card = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}