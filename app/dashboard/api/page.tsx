'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Terminal, 
  Key, 
  Webhook,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Code,
  Globe,
  Lock,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { usePlan } from '../layout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ApiKey {
  id: string
  name: string
  key: string
  lastUsed: string
  createdAt: string
  status: 'active' | 'revoked'
}

interface Webhook {
  id: string
  url: string
  events: string[]
  status: 'active' | 'inactive'
  lastTriggered: string
  createdAt: string
}

export default function ApiPage() {
  const { activePlan } = usePlan()
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Production API Key',
      key: 'codeo_live_sk_1234567890abcdefghijklmnopqrstuvwxyz',
      lastUsed: '2024-03-25T10:30:00Z',
      createdAt: '2024-01-15T09:00:00Z',
      status: 'active'
    },
    {
      id: '2',
      name: 'Development Key',
      key: 'codeo_test_sk_0987654321zyxwvutsrqponmlkjihgfedcba',
      lastUsed: '2024-03-20T14:20:00Z',
      createdAt: '2024-02-01T10:00:00Z',
      status: 'active'
    }
  ])

  const [webhooks, setWebhooks] = useState<Webhook[]>([
    {
      id: '1',
      url: 'https://api.example.com/webhooks/codeo',
      events: ['generation.completed', 'project.created'],
      status: 'active',
      lastTriggered: '2024-03-25T08:15:00Z',
      createdAt: '2024-02-10T12:00:00Z'
    }
  ])

  // Vérifier l'accès Pro ou Business
  if (activePlan === 'starter') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-codeo-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Terminal className="w-10 h-10 text-codeo-green" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Fonctionnalité Pro</h2>
          <p className="text-slate-600 mb-6">
            L'accès à l'API et aux webhooks est disponible avec les plans Pro et Business. 
            Passez à Pro pour intégrer Codeo UI dans vos applications.
          </p>
          <Button className="bg-codeo-green hover:bg-codeo-green/90">
            Passer à Pro
          </Button>
        </div>
      </div>
    )
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Vous pouvez ajouter un toast ici
  }

  const maskKey = (key: string) => {
    return key.substring(0, 20) + '...' + key.substring(key.length - 8)
  }

  const toggleKeyVisibility = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <div className="w-12 h-12 bg-codeo-green/10 rounded-xl flex items-center justify-center">
              <Terminal className="w-6 h-6 text-codeo-green" />
            </div>
            API & Webhooks
          </h1>
          <p className="text-slate-600 mt-2">
            Gérez vos clés API et configurez vos webhooks pour intégrer Codeo UI
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-slate-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Clés API actives</p>
              <p className="text-2xl font-bold text-slate-900">
                {apiKeys.filter(k => k.status === 'active').length}
              </p>
            </div>
            <Key className="w-8 h-8 text-codeo-green/30" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-slate-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Webhooks actifs</p>
              <p className="text-2xl font-bold text-slate-900">
                {webhooks.filter(w => w.status === 'active').length}
              </p>
            </div>
            <Webhook className="w-8 h-8 text-blue-500/30" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-slate-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Requêtes ce mois</p>
              <p className="text-2xl font-bold text-slate-900">1,247</p>
            </div>
            <Code className="w-8 h-8 text-purple-500/30" />
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="api-keys" className="space-y-6">
        <TabsList className="bg-white border border-slate-200 rounded-xl p-1">
          <TabsTrigger value="api-keys" className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            Clés API
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center gap-2">
            <Webhook className="w-4 h-4" />
            Webhooks
          </TabsTrigger>
          <TabsTrigger value="docs" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            Documentation
          </TabsTrigger>
        </TabsList>

        {/* API Keys Tab */}
        <TabsContent value="api-keys" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-900">Clés API</h2>
            <Button className="bg-codeo-green hover:bg-codeo-green/90">
              <Plus className="w-4 h-4 mr-2" />
              Créer une clé API
            </Button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-200">
            {apiKeys.map((apiKey, index) => (
              <motion.div
                key={apiKey.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900">{apiKey.name}</h3>
                      {apiKey.status === 'active' ? (
                        <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          Actif
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                          <AlertCircle className="w-3 h-3" />
                          Révoqué
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <code className="text-sm bg-slate-100 px-3 py-1.5 rounded font-mono">
                        {showKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        className="h-8 w-8 p-0"
                      >
                        {showKeys[apiKey.id] ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(apiKey.key)}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>Créée le {new Date(apiKey.createdAt).toLocaleDateString('fr-FR')}</span>
                      <span>•</span>
                      <span>Dernière utilisation : {new Date(apiKey.lastUsed).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Révoquer
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-1">Sécurité des clés API</h3>
                <p className="text-sm text-amber-800">
                  Ne partagez jamais vos clés API publiquement. Si une clé est compromise, révoquez-la immédiatement.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Webhooks Tab */}
        <TabsContent value="webhooks" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-900">Webhooks</h2>
            <Button className="bg-codeo-green hover:bg-codeo-green/90">
              <Plus className="w-4 h-4 mr-2" />
              Créer un webhook
            </Button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-200">
            {webhooks.map((webhook, index) => (
              <motion.div
                key={webhook.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="text-sm font-mono text-slate-900">{webhook.url}</code>
                      {webhook.status === 'active' ? (
                        <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          Actif
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                          Inactif
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {webhook.events.map((event) => (
                        <span
                          key={event}
                          className="text-xs bg-codeo-green/10 text-codeo-green px-2 py-1 rounded border border-codeo-green/20"
                        >
                          {event}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-slate-500">
                      Dernière exécution : {new Date(webhook.lastTriggered).toLocaleString('fr-FR')}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Tester
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Webhook className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Événements disponibles</h3>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-blue-800">
                  <div>• generation.completed</div>
                  <div>• project.created</div>
                  <div>• project.updated</div>
                  <div>• project.deleted</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Documentation Tab */}
        <TabsContent value="docs" className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Documentation API</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-codeo-green" />
                  Endpoint de base
                </h3>
                <code className="block bg-slate-100 px-4 py-2 rounded text-sm font-mono">
                  https://api.codeo.app/v1
                </code>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Authentification</h3>
                <p className="text-slate-600 mb-2">
                  Utilisez votre clé API dans l'en-tête Authorization :
                </p>
                <code className="block bg-slate-100 px-4 py-2 rounded text-sm font-mono">
                  Authorization: Bearer codeo_live_sk_...
                </code>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Exemple de requête</h3>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-x-auto">
{`curl https://api.codeo.app/v1/generations \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "image_url": "https://example.com/design.png",
    "framework": "react",
    "options": {
      "responsive": true,
      "dark_mode": false
    }
  }'`}
                </pre>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Voir la documentation complète
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
