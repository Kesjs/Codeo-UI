'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { 
  Plus, 
  LayoutDashboard, 
  Sparkles, 
  User, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Folder, 
  FileText, 
  Code, 
  Users, 
  Terminal, 
  Cpu, 
  History,
  FolderKanban,
  Palette,
  Zap,
  Home,
  Briefcase,
  Settings,
  Globe,
  Key,
  HelpCircle,
  Activity
} from 'lucide-react'
import Logo from '@/components/Logo'
import { usePlan } from '@/app/dashboard/layout'

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { activePlan } = usePlan()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  // Gestion du dépliage des sections
  const [openSections, setOpenSections] = useState({
    generation: true,    // Seule la section principale est dépliée par défaut
    library: false,      // Fermées pour une interface plus épurée
    inspiration: false,   // Fermées pour une interface plus épurée
    infra: false         // Fermé par défaut
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => {
      // Crée un nouvel objet avec toutes les sections fermées
      const newState = Object.keys(prev).reduce((acc, key) => ({
        ...acc,
        [key]: false
      }), {} as typeof openSections);
      
      // Ouvre uniquement la section cliquée si elle était fermée
      return {
        ...newState,
        [section]: !prev[section]
      };
    });
  }

  const handleLogout = () => router.push('/login')

  const handleNewProject = () => {
    router.push('/dashboard/workbench')
  }

  // Fonction pour vérifier l'accès selon le badge et le plan
  const hasAccess = (badge: string | undefined, plan: string): boolean => {
    if (!badge) return true // Pas de badge = accès libre
    if (badge === 'Bientôt') return false // Toujours bloqué
    if (badge === 'Business' && plan === 'business') return true
    if (badge === 'Pro' && (plan === 'pro' || plan === 'business')) return true
    return false
  }

  // Composant pour les en-têtes de section
  const SectionHeader = ({ title, isOpen, onToggle, icon: Icon }: { title: string, isOpen: boolean, onToggle: () => void, icon: any }) => (
    <button
      onClick={onToggle}
      className={`w-full flex items-center justify-between px-3 py-2.5 text-[13px] font-semibold text-slate-600 hover:text-slate-900 transition-all duration-200 group hover:bg-codeo-green/5 rounded-lg ${isCollapsed ? 'lg:flex-col lg:justify-center' : ''}`}
    >
      <div className={`flex items-center ${isCollapsed ? 'lg:flex-col' : 'gap-2'}`}>
        <Icon className="h-4.5 w-4.5" />
        <span className={`transition-all duration-500 ease-out ${isCollapsed ? 'lg:opacity-0 lg:scale-90 lg:translate-x-2 lg:absolute' : 'lg:opacity-100 lg:scale-100 lg:translate-x-0 lg:relative'}`}>{title}</span>
      </div>
      <ChevronDown className={`h-4.5 w-4.5 transition-all duration-500 ease-out ${isOpen ? 'rotate-180' : ''} ${isCollapsed ? 'lg:opacity-0 lg:scale-90 lg:translate-x-2 lg:absolute' : 'lg:opacity-100 lg:scale-100 lg:translate-x-0 lg:relative'}`} />
    </button>
  )

  // Composant pour les items de navigation
  const NavItem = ({ item }: { item: any }) => {
    const itemHasAccess = hasAccess(item.badge, activePlan)
    const isBlocked = item.badge && !itemHasAccess
    
    return (
    <Link
      href={item.href}
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isBlocked) {
          e.preventDefault();
          alert(`Fonctionnalité ${item.badge} disponible prochainement !`);
        }
      }}
      className={`
        flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-200 no-underline group list-none relative
        ${item.current 
          ? 'bg-codeo-green text-white font-medium shadow-md shadow-codeo-green/25 border border-codeo-green/20' 
          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
        }
          ${isBlocked ? 'cursor-not-allowed opacity-70' : ''}
        ${isCollapsed ? 'lg:flex-col lg:justify-center lg:items-center' : ''}
      `}
    >
      {/* Indicateur actif */}
      {item.current && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
      )}
      <div className={`flex items-center ${isCollapsed ? 'lg:flex-col' : 'gap-3'}`}>
        <item.icon className={`h-4 w-4 transition-colors ${item.current ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
        <span className={`text-[14px] font-medium leading-none transition-all duration-500 ease-out ${isCollapsed ? 'lg:opacity-0 lg:scale-90 lg:translate-x-2 lg:absolute' : 'lg:opacity-100 lg:scale-100 lg:translate-x-0 lg:relative'}`}>{item.name}</span>
      </div>
      {item.badge && (
        <span className={`text-[10px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded border
          ${item.badge === 'Bientôt' 
            ? 'bg-slate-100 text-slate-400 border-slate-200' 
            : 'bg-codeo-green/10 text-codeo-green border-codeo-green/20'}
        `}>
          {item.badge}
        </span>
      )}
    </Link>
  )
  }

  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div className="relative">
        {/* Bouton Mobile - ANIMÉ */}
      <div className="lg:hidden fixed top-4 z-50 transition-all duration-500 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
           style={{ left: isMobileMenuOpen ? '12.5rem' : '1rem' }}>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg transition-all duration-300 hover:bg-slate-50 focus:outline-none focus:ring-0 focus:ring-transparent"
          aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-slate-700 transition-transform duration-300 hover:rotate-90" />
          ) : (
            <div className="relative h-6 w-6">
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100'}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
              </div>
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 -rotate-90'}`}>
                <X className="h-6 w-6" />
              </div>
            </div>
          )}
        </button>
      </div>

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 bg-white border-r border-slate-200 h-full flex flex-col
        transform transition-all duration-500 ease-[cubic-bezier(0.4, 0, 0.2, 1)]
        ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'lg:w-20' : 'lg:w-64'} w-64
      `}>
        {/* HEADER : LOGO & ENGINE STATUS - FIXÉ EN HAUT */}
        <div className={`border-b border-slate-200 bg-white sticky top-0 z-10 ${!isCollapsed ? 'h-24' : 'h-16'}`}>
          <div className={`px-5 ${!isCollapsed ? 'pt-5 pb-4' : 'pt-3 pb-1'}`}>
            <Link href="/" className="flex items-center justify-center no-underline transition-opacity hover:opacity-80">
              {!isCollapsed ? (
                <div className="text-xl font-black text-slate-900 tracking-tight text-center">
                  Code<span className="text-codeo-green">o</span> U<span className="text-codeo-green">I</span>
                </div>
              ) : (
                <div className="text-2xl font-black text-slate-900 tracking-tight w-full text-center">
                  <span className="text-codeo-green">C</span>o<span className="text-codeo-green">I</span>
                </div>
              )}
            </Link>
          </div>
          {!isCollapsed && (
            <div className="bg-slate-50 px-5 py-2 border-t border-slate-100">
              <div className="flex items-center justify-center gap-2">
                <div className="relative flex items-center justify-center h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-codeo-green animate-ping opacity-25" />
                  <span className="relative h-2 w-2 rounded-full bg-codeo-green" />
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">V-AST Neural Engine</p>
              </div>
            </div>
          )}
        </div>

        {/* BOUTON DE RÉDUCTION - DESKTOP - AMÉLIORÉ */}
        <div className="hidden lg:flex absolute top-6 -right-3 z-50">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`group w-8 h-8 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center 
              transition-all duration-300 hover:shadow-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-codeo-green/50
              border-2 border-slate-200 dark:border-slate-700 hover:border-codeo-green`}
            aria-label={isCollapsed ? 'Agrandir la barre latérale' : 'Réduire la barre latérale'}
          >
            <div className="relative w-5 h-5">
              {/* Flèche animée */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isCollapsed ? 'rotate-180' : ''}`}>
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-slate-600 dark:text-slate-300 group-hover:text-codeo-green transition-colors duration-200"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </div>
              {/* Indicateur de survol */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="bg-slate-900 text-white text-xs font-medium px-2 py-1 rounded whitespace-nowrap">
                  {isCollapsed ? 'Agrandir' : 'Réduire'}
                </div>
                <div className="w-2 h-2 bg-slate-900 absolute -top-1 left-1/2 -translate-x-1/2 rotate-45"></div>
              </div>
            </div>
          </button>
        </div>

        {/* ACTION : NOUVEAU PROJET */}
        <div className={`px-3 pb-4 pt-6 ${isCollapsed ? 'lg:px-2' : ''}`}>
          <button 
            onClick={handleNewProject}
            className={`w-full border border-codeo-green text-codeo-green bg-codeo-green/5 hover:bg-codeo-green/10 rounded-lg px-3 py-2.5 font-medium text-[13px] transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${isCollapsed ? 'lg:flex-col' : ''}`}
          >
            <Plus className="h-4 w-4" />
            <span className={`transition-all duration-500 ease-out ${isCollapsed ? 'lg:opacity-0 lg:scale-90 lg:translate-x-2 lg:absolute' : 'lg:opacity-100 lg:scale-100 lg:translate-x-0 lg:relative'}`}>Nouveau Projet</span>
          </button>
        </div>

        {/* NAVIGATION AREA (Invisible Scroll) */}
        <div className="flex-1 px-3 overflow-y-auto space-y-4 pt-8" style={{ 
          scrollbarWidth: 'none',  // Firefox
          msOverflowStyle: 'none', // IE/Edge
        }}>
          <style>{`
            .overflow-y-auto::-webkit-scrollbar { 
              display: none;  // Chrome/Safari/Opera
            }
          `}</style>
          
          {/* SECTION: GÉNÉRATION (Le Core Business) */}
          <div className="list-none">
            <SectionHeader 
              title="Génération" 
              isOpen={openSections.generation} 
              onToggle={() => toggleSection('generation')}
              icon={Zap}
            />
            {openSections.generation && (
              <div className="space-y-1 pl-3 ml-1 border-l-2 border-slate-200 dark:border-slate-700 animate-in fade-in slide-in-from-top-1 duration-200">
                <NavItem item={{ name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard, current: pathname === '/dashboard' }} />
                <NavItem item={{ name: 'Workbench', href: '/dashboard/workbench', icon: Cpu, current: pathname === '/dashboard/workbench' }} />
              </div>
            )}
          </div>

          {/* SECTION: BIBLIOTHÈQUE (Gestion des Assets) */}
          <div className="list-none">
            <SectionHeader 
              title="Ma Bibliothèque" 
              isOpen={openSections.library} 
              onToggle={() => toggleSection('library')}
              icon={FolderKanban}
            />
            {openSections.library && (
              <div className="space-y-1 pl-3 ml-1 border-l-2 border-slate-200 dark:border-slate-700 animate-in fade-in slide-in-from-top-1 duration-200">
                <NavItem item={{ name: 'Mes Composants', href: '/dashboard/components', icon: Code, current: pathname === '/dashboard/components' }} />
                <NavItem item={{ name: 'Collections', href: '/dashboard/collections', icon: Folder, current: pathname === '/dashboard/collections' }} />
                <NavItem item={{ name: 'Design System', href: '#', icon: Palette, badge: 'Bientôt' }} />
              </div>
            )}
          </div>

          {/* SECTION: INSPIRATION & MODÈLES */}
          <div className="list-none">
            <SectionHeader 
              title="V-AST Vault" 
              isOpen={openSections.inspiration} 
              onToggle={() => toggleSection('inspiration')}
              icon={Briefcase}
            />
            {openSections.inspiration && (
              <div className="space-y-1 pl-3 ml-1 animate-in fade-in slide-in-from-top-1 duration-200">
                <NavItem item={{ name: 'Templates IA', href: '#', icon: Sparkles, badge: 'Bientôt' }} />
              </div>
            )}
          </div>

          {/* SECTION: INFRASTRUCTURE (Scale & Pro) */}
          <div className="list-none">
            <SectionHeader 
              title="Infrastructure" 
              isOpen={openSections.infra} 
              onToggle={() => toggleSection('infra')}
              icon={Activity}
            />
            {openSections.infra && (
              <div className="space-y-1 pl-3 ml-1 border-l-2 border-slate-200 dark:border-slate-700 animate-in fade-in slide-in-from-top-1 duration-200">
                <NavItem item={{ name: 'Équipe', href: '/dashboard/team', icon: Users, badge: 'Business', current: pathname === '/dashboard/team' }} />
                <NavItem item={{ name: 'API & Webhooks', href: '/dashboard/api', icon: Terminal, badge: 'Pro', current: pathname === '/dashboard/api' }} />
              </div>
            )}
          </div>
        </div>

        {/* FOOTER: PROFIL & DÉCONNEXION */}
        <div className={`p-6 border-t border-slate-100 bg-slate-50/50 ${isCollapsed ? 'lg:px-2' : ''}`}>
          {/* Icône profil en mode réduit */}
          <button
            onClick={() => router.push('/dashboard/settings')}
            className={`hidden lg:flex items-center justify-center mb-4 w-full p-2 rounded-lg hover:bg-slate-100 transition-all cursor-pointer group ${isCollapsed ? '' : 'lg:hidden'}`}
          >
            <div className="w-11 h-11 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm relative group">
              <User className="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-codeo-green border-2 border-white rounded-full" />
            </div>
          </button>
          
          <button
            onClick={() => router.push('/dashboard/settings')}
            className={`w-full flex items-center gap-4 mb-4 p-3 rounded-xl hover:bg-slate-100 transition-all cursor-pointer group ${isCollapsed ? 'lg:hidden' : ''}`}
          >
            <div className="w-11 h-11 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm relative group">
              <User className="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-codeo-green border-2 border-white rounded-full" />
            </div>
            <div className={`flex-1 min-w-0 transition-all duration-500 ease-out text-left ${isCollapsed ? 'lg:opacity-0 lg:scale-90 lg:translate-x-2 lg:absolute' : 'lg:opacity-100 lg:scale-100 lg:translate-x-0 lg:relative'}`}>
              <div className="font-bold text-slate-900 text-base truncate leading-tight group-hover:text-codeo-green transition-colors">Ken Kennedy</div>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="relative flex items-center">
                  <Sparkles className="h-3 w-3 text-codeo-green relative z-10 animate-pulse" />
                </div>
                <span className="text-[10px] font-black text-codeo-green uppercase tracking-tighter bg-codeo-green/5 px-2 py-0.5 rounded-full border border-codeo-green/10">Early Adopter</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">Voir les paramètres →</div>
            </div>
          </button>
          
          {/* Bouton déconnexion en mode réduit */}
          <button
            onClick={handleLogout}
            className={`hidden lg:flex w-full items-center justify-center border border-red-200 text-red-500 bg-red-50/50 hover:bg-red-50 rounded-lg px-3 py-2.5 transition-all active:scale-[0.98] mb-2 ${isCollapsed ? '' : 'lg:hidden'}`}
          >
            <LogOut className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 bg-red-50/50 hover:bg-red-50 rounded-lg px-3 py-2.5 font-medium text-[13px] transition-all active:scale-[0.98] ${isCollapsed ? 'lg:hidden' : ''}`}
          >
            <LogOut className="h-4 w-4" />
            <span className={`transition-all duration-500 ease-out ${isCollapsed ? 'lg:opacity-0 lg:scale-90 lg:translate-x-2 lg:absolute' : 'lg:opacity-100 lg:scale-100 lg:translate-x-0 lg:relative'}`}>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Overlay Mobile */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
      </div>
    </>
  )
}