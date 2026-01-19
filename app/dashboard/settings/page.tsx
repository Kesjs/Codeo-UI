'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  CreditCard, 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Users, 
  Palette, 
  Globe, 
  Zap,
  Database,
  Key,
  HelpCircle,
  LogOut
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { usePlan } from '../layout'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const { activePlan, simulatedPlan, setSimulatedPlan, isDevMode } = usePlan()

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'subscription', label: 'Abonnement', icon: CreditCard },
    { id: 'workbench', label: 'Workbench', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'team', label: 'Équipe', icon: Users },
    { id: 'appearance', label: 'Apparence', icon: Palette },
    { id: 'integrations', label: 'Intégrations', icon: Globe },
    { id: 'api', label: 'API & Clés', icon: Key },
    { id: 'support', label: 'Aide', icon: HelpCircle },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Informations personnelles</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nom complet</label>
                  <Input defaultValue="Ken Kennedy" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Adresse email</label>
                  <Input defaultValue="ken@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nom d'utilisateur</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm">
                      codeo.app/
                    </span>
                    <Input defaultValue="ken" className="rounded-l-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Rôle</label>
                  <Select defaultValue="early-adopter">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="early-adopter">Early Adopter</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Préférences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Langue</p>
                    <p className="text-sm text-slate-500">Choisissez votre langue préférée</p>
                  </div>
                  <Select defaultValue="fr">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Fuseau horaire</p>
                    <p className="text-sm text-slate-500">Définissez votre fuseau horaire</p>
                  </div>
                  <Select defaultValue="utc+1">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc+1">UTC+1</SelectItem>
                      <SelectItem value="utc+0">UTC+0</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )

      case 'subscription':
        return (
          <div className="space-y-6">
            <div className={`bg-gradient-to-br ${activePlan === 'business' ? 'from-purple-600 to-purple-800' : 'from-codeo-green to-emerald-700'} rounded-2xl p-8 text-white`}>
              <h3 className="text-2xl font-bold mb-2">Plan Actuel : {activePlan === 'starter' ? 'Starter' : activePlan === 'pro' ? 'Pro' : 'Business'}</h3>
              <p className="text-white/80 mb-6">
                {activePlan === 'starter' && '0€/mois • 10 scans • Traitement standard'}
                {activePlan === 'pro' && '49€/mois • Illimité scans • GPU prioritaire'}
                {activePlan === 'business' && '149€/mois • Illimité scans • Instance dédiée'}
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {activePlan === 'starter' ? '8' : activePlan === 'pro' ? '47' : '142'}
                  </div>
                  <div className="text-sm text-white/70">
                    {activePlan === 'starter' ? 'Scans ce mois' : 'Scans ce mois'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {activePlan === 'starter' ? '2' : '∞'}
                  </div>
                  <div className="text-sm text-white/70">
                    {activePlan === 'starter' ? 'Scans restants' : 'Scans restants'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {activePlan === 'starter' ? '1x' : activePlan === 'pro' ? '2.5x' : '3x'}
                  </div>
                  <div className="text-sm text-white/70">Vitesse</div>
                </div>
              </div>
              <Button className="bg-white text-codeo-green hover:bg-slate-100">
                {activePlan === 'starter' ? 'Passer Pro – 49 €' : activePlan === 'pro' ? 'Passer Business – 149 €' : 'Gérer l\'abonnement'}
              </Button>
            </div>

            {/* Toggle dev uniquement */}
            {isDevMode && (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Simulation de plan (Dev)</h3>
                <Select value={simulatedPlan} onValueChange={(v) => setSimulatedPlan(v as 'starter' | 'pro' | 'business')}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Historique des paiements</h3>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium">Abonnement {activePlan === 'starter' ? 'Starter' : activePlan === 'pro' ? 'Pro' : 'Business'}</p>
                      <p className="text-sm text-slate-500">15 Jan 2026</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {activePlan === 'starter' ? '0€' : activePlan === 'pro' ? '49€' : '149€'}
                      </p>
                      <p className="text-sm text-green-600">Payé</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'workbench':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Configuration du Workbench</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Framework par défaut</p>
                    <p className="text-sm text-slate-500">React, Next.js, Vue...</p>
                  </div>
                  <Select defaultValue="react">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="nextjs">Next.js</SelectItem>
                      <SelectItem value="vue">Vue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Style Engine</p>
                    <p className="text-sm text-slate-500">Tailwind, CSS Modules...</p>
                  </div>
                  <Select defaultValue="tailwind">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tailwind">Tailwind</SelectItem>
                      <SelectItem value="css-modules">CSS Modules</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Animations par défaut</p>
                    <p className="text-sm text-slate-500">Framer Motion activé</p>
                  </div>
                  <Button variant="outline" size="sm">Activé</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Accessibilité</p>
                    <p className="text-sm text-slate-500">ARIA et sémantique</p>
                  </div>
                  <Button variant="outline" size="sm">Activé</Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Préférences de génération</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Mode sombre par défaut</p>
                    <p className="text-sm text-slate-500">Générer les composants en dark mode</p>
                  </div>
                  <Button variant="outline" size="sm">Non</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Version mobile</p>
                    <p className="text-sm text-slate-500">Optimiser pour mobile first</p>
                  </div>
                  <Button variant="outline" size="sm">Non</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Optimisation SEO</p>
                    <p className="text-sm text-slate-500">Méta-tags et structure SEO</p>
                  </div>
                  <Button variant="outline" size="sm">Activé</Button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Préférences de notification</h3>
              <div className="space-y-4">
                {[
                  { title: 'Email', desc: 'Recevoir les notifications par email', enabled: true },
                  { title: 'Push', desc: 'Notifications push dans le navigateur', enabled: false },
                  { title: 'Génération terminée', desc: 'Quand un composant est généré', enabled: true },
                  { title: 'Mises à jour', desc: 'Nouvelles fonctionnalités et mises à jour', enabled: true },
                  { title: 'Facturation', desc: 'Rappels de paiement et factures', enabled: true },
                  { title: 'Sécurité', desc: 'Alertes de sécurité importantes', enabled: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                    <Button variant={item.enabled ? "default" : "outline"} size="sm">
                      {item.enabled ? 'Activé' : 'Désactivé'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'security':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Sécurité du compte</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">Authentification à deux facteurs</p>
                    <p className="text-sm text-slate-500">Ajoutez une couche de sécurité</p>
                  </div>
                  <Button variant="outline" size="sm">Configurer</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">Mot de passe</p>
                    <p className="text-sm text-slate-500">Dernier changement : il y a 30 jours</p>
                  </div>
                  <Button variant="outline" size="sm">Modifier</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">Sessions actives</p>
                    <p className="text-sm text-slate-500">3 appareils connectés</p>
                  </div>
                  <Button variant="outline" size="sm">Voir</Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Confidentialité</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Profil public</p>
                    <p className="text-sm text-slate-500">Rendre votre profil visible</p>
                  </div>
                  <Button variant="outline" size="sm">Non</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Analytics</p>
                    <p className="text-sm text-slate-500">Partager les données d'utilisation</p>
                  </div>
                  <Button variant="outline" size="sm">Oui</Button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'team':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Gestion de l'équipe</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">Membres actifs</p>
                    <p className="text-sm text-slate-500">7 / 10 membres</p>
                  </div>
                  <Button variant="outline" size="sm">Inviter</Button>
                </div>
                <div className="space-y-2">
                  {['Ken Kennedy (Admin)', 'Alice Martin (Membre)', 'Bob Dubois (Membre)'].map((member, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                      <span className="text-sm">{member}</span>
                      <Button variant="ghost" size="sm">Gérer</Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Thème et apparence</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Mode sombre</p>
                    <p className="text-sm text-slate-500">Interface sombre par défaut</p>
                  </div>
                  <Button variant="outline" size="sm">Système</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Compact mode</p>
                    <p className="text-sm text-slate-500">Interface plus compacte</p>
                  </div>
                  <Button variant="outline" size="sm">Non</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Animations</p>
                    <p className="text-sm text-slate-500">Animations et transitions</p>
                  </div>
                  <Button variant="outline" size="sm">Activé</Button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'integrations':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Intégrations</h3>
              <div className="space-y-4">
                {[
                  { name: 'GitHub', desc: 'Connectez vos dépôts GitHub', connected: true },
                  { name: 'Figma', desc: 'Importez vos designs Figma', connected: false },
                  { name: 'VS Code', desc: 'Extension VS Code', connected: true },
                  { name: 'Slack', desc: 'Notifications Slack', connected: false },
                ].map((integration, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">{integration.name}</p>
                      <p className="text-sm text-slate-500">{integration.desc}</p>
                    </div>
                    <Button variant={integration.connected ? "default" : "outline"} size="sm">
                      {integration.connected ? 'Connecté' : 'Connecter'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'api':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Clés API</h3>
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-slate-900">Clé principale</p>
                    <Button variant="outline" size="sm">Régénérer</Button>
                  </div>
                  <code className="text-sm bg-slate-900 text-green-400 p-2 rounded block">
                    sk_live_1234567890abcdef...
                  </code>
                </div>
                <Button className="w-full">Créer une nouvelle clé</Button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Webhooks</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">Webhook URL</p>
                    <p className="text-sm text-slate-500">https://votre-app.com/webhook</p>
                  </div>
                  <Button variant="outline" size="sm">Tester</Button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'support':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Centre d'aide</h3>
              <div className="space-y-4">
                {[
                  { title: 'Documentation', desc: 'Guides et tutoriels complets', icon: '📚' },
                  { title: 'Support chat', desc: 'Discutez avec notre équipe', icon: '💬' },
                  { title: 'Email support', desc: 'support@codeo.app', icon: '📧' },
                  { title: 'Statut du service', desc: 'Vérifiez l état des services', icon: '🔍' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <p className="font-medium text-slate-900">{item.title}</p>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">→</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return <div>Sélectionnez une catégorie</div>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>
        <p className="text-slate-500">Gérez toutes les préférences de votre compte Codeo</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar des paramètres */}
        <div className="lg:w-80">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-codeo-green text-white font-medium'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Contenu principal */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
                            
