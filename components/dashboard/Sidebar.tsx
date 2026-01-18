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
  Zap
} from 'lucide-react'
import Logo from '@/components/Logo'

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
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
    const dropzone = document.getElementById('dropzone')
    if (dropzone) dropzone.scrollIntoView({ behavior: 'smooth' })
    else router.push('/dashboard')
  }

  // Composant pour les en-têtes de section
  const SectionHeader = ({ title, isOpen, onToggle, icon: Icon }: { title: string, isOpen: boolean, onToggle: () => void, icon: any }) => (
    <button 
      onClick={onToggle}
      className={`w-full flex items-center justify-between px-4 py-5 text-[11px] font-black text-slate-900 uppercase tracking-[0.15em] hover:text-slate-600 transition-all duration-200 group hover:bg-codeo-green/5 rounded-xl ${isCollapsed ? 'lg:flex-col lg:justify-center' : ''}`}
    >
      <div className={`flex items-center ${isCollapsed ? 'lg:flex-col' : 'gap-2'}`}>
        <Icon className="h-4 w-4" />
        <span className={`transition-all duration-500 ease-out ${isCollapsed ? 'lg:opacity-0 lg:scale-90 lg:translate-x-2 lg:absolute' : 'lg:opacity-100 lg:scale-100 lg:translate-x-0 lg:relative'}`}>{title}</span>
      </div>
      <ChevronDown className={`h-4 w-4 transition-all duration-500 ease-out ${isOpen ? 'rotate-180' : ''} ${isCollapsed ? 'lg:opacity-0 lg:scale-90 lg:translate-x-2 lg:absolute' : 'lg:opacity-100 lg:scale-100 lg:translate-x-0 lg:relative'}`} />
    </button>
  )

  // Composant pour les items de navigation
  const NavItem = ({ item }: { item: any }) => (
    <Link
      href={item.href}
      onClick={(e) => {
        if (item.badge) {
          e.preventDefault();
          alert(`Fonctionnalité ${item.badge} disponible prochainement !`);
        }
      }}
      className={`
        flex items-center justify-between px-4 py-5 rounded-xl transition-all duration-200 no-underline group list-none
        ${item.current 
          ? 'bg-codeo-green/10 text-codeo-green font-bold shadow-sm shadow-codeo-green/5' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }
        ${item.badge ? 'cursor-not-allowed opacity-70' : ''}
        ${isCollapsed ? 'lg:flex-col lg:justify-center lg:items-center' : ''}
      `}
    >
      <div className={`flex items-center ${isCollapsed ? 'lg:flex-col' : 'gap-3'}`}>
        <item.icon className={`h-4 w-4 transition-colors ${item.current ? 'text-codeo-green' : 'text-slate-400 group-hover:text-slate-600'}`} />
        <span className={`text-[15px] font-medium leading-none transition-all duration-500 ease-out ${isCollapsed ? 'lg:opacity-0 lg:scale-90 lg:translate-x-2 lg:absolute' : 'lg:opacity-100 lg:scale-100 lg:translate-x-0 lg:relative'}`}>{item.name}</span>
      </div>
      {item.badge && (
        <span className={`text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded border
          ${item.badge === 'Bientôt' 
            ? 'bg-slate-100 text-slate-400 border-slate-200' 
            : 'bg-codeo-green/10 text-codeo-green border-codeo-green/20'}
        `}>
          {item.badge}
        </span>
      )}
    </Link>
  )

  return (
    <>
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

        {/* BOUTON DE RÉDUCTION - DESKTOP */}
        <div className="hidden lg:flex absolute top-4 -right-3 z-50">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-slate-50 transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-0"
            aria-label={isCollapsed ? 'Agrandir la barre latérale' : 'Réduire la barre latérale'}
          >
            <div className="relative w-4 h-4">
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isCollapsed ? 'opacity-0 -rotate-90' : 'opacity-100'}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
              </div>
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isCollapsed ? 'opacity-100' : 'opacity-0 rotate-90'}`}>
                <ChevronRight className="h-4 w-4 text-slate-700" />
              </div>
            </div>
          </button>
        </div>

        {/* ACTION : NOUVEAU PROJET */}
        <div className={`px-3 pb-6 pt-8 ${isCollapsed ? 'lg:px-2' : ''}`}>
          <button 
            onClick={handleNewProject}
            className={`w-full bg-codeo-green text-white rounded-xl px-4 py-3.5 font-black text-[11px] tracking-widest hover:shadow-xl hover:shadow-codeo-green/30 transition-all active:scale-[0.97] flex items-center justify-center gap-2 uppercase ${isCollapsed ? 'lg:flex-col' : ''}`}
          >
            <Plus className="h-4 w-4 stroke-[3px]" />
            <span className={`transition-all duration-500 ease-out ${isCollapsed ? 'lg:opacity-0 lg:scale-90 lg:translate-x-2 lg:absolute' : 'lg:opacity-100 lg:scale-100 lg:translate-x-0 lg:relative'}`}>Nouveau Projet</span>
          </button>
        </div>

        {/* NAVIGATION AREA (Invisible Scroll) */}
        <div className="flex-1 px-3 overflow-y-auto scrollbar-hide space-y-2">
          <style jsx cursor-auto>{`
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
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
              <div className="space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
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
              icon={Folder}
            />
            {openSections.library && (
              <div className="space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
                <NavItem item={{ name: 'Mes Composants', href: '/dashboard/components', icon: History, current: pathname === '/dashboard/components' }} />
                <NavItem item={{ name: 'Collections', href: '/dashboard/collections', icon: FolderKanban, current: pathname === '/dashboard/collections' }} />
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
              icon={Sparkles}
            />
            {openSections.inspiration && (
              <div className="space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
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
              icon={Terminal}
            />
            {openSections.infra && (
              <div className="space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
                <NavItem item={{ name: 'Équipe', href: '#', icon: Users, badge: 'Business' }} />
                <NavItem item={{ name: 'API & Webhooks', href: '#', icon: Terminal, badge: 'Pro' }} />
              </div>
            )}
          </div>
        </div>

        {/* FOOTER: PROFIL & DÉCONNEXION */}
        <div className={`p-6 border-t border-slate-100 bg-slate-50/50 ${isCollapsed ? 'lg:px-2' : ''}`}>
          {/* Icône profil en mode réduit */}
          <div className={`hidden lg:flex items-center justify-center mb-4 ${isCollapsed ? '' : 'lg:hidden'}`}>
            <div className="w-11 h-11 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm relative group">
              <User className="h-5 w-5 text-slate-400" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-codeo-green border-2 border-white rounded-full" />
            </div>
          </div>
          
          <div className={`flex items-center gap-4 mb-5 ${isCollapsed ? 'lg:hidden' : ''}`}>
            <div className="w-11 h-11 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm relative group">
              <User className="h-5 w-5 text-slate-400" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-codeo-green border-2 border-white rounded-full" />
            </div>
            <div className={`flex-1 min-w-0 transition-all duration-500 ease-out ${isCollapsed ? 'lg:opacity-0 lg:scale-90 lg:translate-x-2 lg:absolute' : 'lg:opacity-100 lg:scale-100 lg:translate-x-0 lg:relative'}`}>
              <p className="font-bold text-slate-900 text-base truncate leading-tight">Ken Kennedy</p>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="relative flex items-center">
                  <Sparkles className="h-3 w-3 text-codeo-green relative z-10 animate-pulse" />
                </div>
                <span className="text-[10px] font-black text-codeo-green uppercase tracking-tighter bg-codeo-green/5 px-2 py-0.5 rounded-full border border-codeo-green/10">Early Adopter</span>
              </div>
            </div>
          </div>
          
          {/* Bouton déconnexion en mode réduit */}
          <button
            onClick={handleLogout}
            className={`hidden lg:flex w-full items-center justify-center bg-red-500 text-white rounded-xl px-4 py-3 hover:shadow-lg hover:shadow-red-500/30 transition-all active:scale-[0.97] border-2 border-red-500 hover:border-red-600 mb-2 ${isCollapsed ? '' : 'lg:hidden'}`}
          >
            <LogOut className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold text-white bg-red-500 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30 rounded-xl transition-all border-2 border-red-500 hover:border-red-600 ${isCollapsed ? 'lg:hidden' : ''}`}
          >
            <LogOut className="h-4 w-4" />
            <span className={`transition-all duration-500 ease-out ${isCollapsed ? 'lg:opacity-0 lg:scale-90 lg:translate-x-2 lg:absolute' : 'lg:opacity-100 lg:scale-100 lg:translate-x-0 lg:relative'}`}>DÉCONNEXION</span>
          </button>
        </div>
      </aside>

      {/* Overlay Mobile */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  )
}