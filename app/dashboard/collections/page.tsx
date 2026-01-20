'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FolderKanban, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Eye,
  Code2,
  Folder,
  Clock,
  User,
  Tag,
  ChevronRight,
  Image as ImageIcon,
  Layers,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface Collection {
  id: string
  name: string
  description: string
  items: number
  updated: string
  createdAt: string
  creator: {
    name: string
    avatar: string
  }
  color: string
  frameworks: string[]
  thumbnail?: string
  tags: string[]
}

export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<string>('recent')
  const [filterFramework, setFilterFramework] = useState<string>('all')

  // Données enrichies avec nouvelles propriétés
  const collections: Collection[] = [
    {
      id: '1',
      name: 'Composants UI',
      description: 'Collection de composants réutilisables pour interfaces modernes',
      items: 24,
      updated: '2h ago',
      createdAt: '2024-01-15',
      creator: {
        name: 'Ken Kennedy',
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      color: 'bg-gradient-to-br from-blue-500 to-purple-600',
      frameworks: ['React', 'Next.js', 'TypeScript'],
      tags: ['UI', 'Components', 'Design System'],
      thumbnail: undefined
    },
    {
      id: '2',
      name: 'Templates',
      description: 'Modèles de pages prêts à l\'emploi',
      items: 12,
      updated: '1j',
      createdAt: '2024-02-01',
      creator: {
        name: 'Ken Kennedy',
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      color: 'bg-gradient-to-br from-green-500 to-teal-600',
      frameworks: ['React', 'Vue'],
      tags: ['Templates', 'Pages'],
      thumbnail: undefined
    },
    {
      id: '3',
      name: 'Formulaires',
      description: 'Composants de formulaires avec validation',
      items: 8,
      updated: '3j',
      createdAt: '2024-02-10',
      creator: {
        name: 'Ken Kennedy',
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      color: 'bg-gradient-to-br from-orange-500 to-red-600',
      frameworks: ['React', 'TypeScript'],
      tags: ['Forms', 'Validation'],
      thumbnail: undefined
    },
    {
      id: '4',
      name: 'Navigation',
      description: 'Menus, sidebars et composants de navigation',
      items: 5,
      updated: '1 sem.',
      createdAt: '2024-02-20',
      creator: {
        name: 'Ken Kennedy',
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      color: 'bg-gradient-to-br from-indigo-500 to-blue-600',
      frameworks: ['React', 'Next.js'],
      tags: ['Navigation', 'Menu'],
      thumbnail: undefined
    },
    {
      id: '5',
      name: 'Tableaux',
      description: 'Composants de tableaux de données avec tri et filtres',
      items: 7,
      updated: '2 sem.',
      createdAt: '2024-03-01',
      creator: {
        name: 'Ken Kennedy',
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      color: 'bg-gradient-to-br from-pink-500 to-rose-600',
      frameworks: ['React', 'TypeScript'],
      tags: ['Tables', 'Data'],
      thumbnail: undefined
    },
    {
      id: '6',
      name: 'Modales',
      description: 'Dialogs, modales et overlays interactifs',
      items: 3,
      updated: '3 sem.',
      createdAt: '2024-03-10',
      creator: {
        name: 'Ken Kennedy',
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      color: 'bg-gradient-to-br from-yellow-500 to-amber-600',
      frameworks: ['React'],
      tags: ['Modals', 'Dialogs'],
      thumbnail: undefined
    },
  ]

  // Calcul des statistiques
  const totalItems = collections.reduce((sum, col) => sum + col.items, 0)
  const totalFrameworks = new Set(collections.flatMap(col => col.frameworks)).size

  // Filtrage et tri
  const filteredCollections = collections
    .filter(collection => {
      const matchesSearch = collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           collection.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           collection.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesFramework = filterFramework === 'all' || collection.frameworks.includes(filterFramework)
      return matchesSearch && matchesFramework
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.updated).getTime() - new Date(a.updated).getTime()
        case 'name':
          return a.name.localeCompare(b.name)
        case 'items':
          return b.items - a.items
        default:
          return 0
      }
    })

  const formatRelativeTime = (timeStr: string) => {
    return timeStr // On garde le format existant pour simplifier
  }

  return (
    <div className="space-y-6">
      {/* Header avec icône */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <div className="w-12 h-12 bg-codeo-green/10 rounded-xl flex items-center justify-center">
              <FolderKanban className="w-6 h-6 text-codeo-green" />
            </div>
            Collections
          </h1>
          <p className="text-slate-600 mt-2">
            Organisez et gérez vos composants en collections
          </p>
        </div>
        <Button className="bg-codeo-green hover:bg-codeo-green/90">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle collection
        </Button>
      </motion.div>

      {/* Statistiques en cartes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-slate-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Total collections</p>
              <p className="text-2xl font-bold text-slate-900">{collections.length}</p>
            </div>
            <FolderKanban className="w-8 h-8 text-codeo-green/30" />
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
              <p className="text-sm text-slate-600 mb-1">Total éléments</p>
              <p className="text-2xl font-bold text-slate-900">{totalItems}</p>
            </div>
            <Layers className="w-8 h-8 text-blue-500/30" />
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
              <p className="text-sm text-slate-600 mb-1">Frameworks</p>
              <p className="text-2xl font-bold text-slate-900">{totalFrameworks}</p>
            </div>
            <Code2 className="w-8 h-8 text-purple-500/30" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-slate-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Moyenne/collection</p>
              <p className="text-2xl font-bold text-slate-900">
                {Math.round(totalItems / collections.length)}
              </p>
            </div>
            <Sparkles className="w-8 h-8 text-amber-500/30" />
          </div>
        </motion.div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-codeo-green transition-colors duration-200 z-10 pointer-events-none" />
            <Input
              placeholder="Rechercher une collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-black/20 border border-black/10 transition-colors duration-200 hover:border-black/15"
            />
          </div>
          <Select value={filterFramework} onValueChange={setFilterFramework}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Tous les frameworks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les frameworks</SelectItem>
              <SelectItem value="React">React</SelectItem>
              <SelectItem value="Next.js">Next.js</SelectItem>
              <SelectItem value="Vue">Vue</SelectItem>
              <SelectItem value="TypeScript">TypeScript</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Plus récent</SelectItem>
              <SelectItem value="name">Nom (A-Z)</SelectItem>
              <SelectItem value="items">Nombre d'éléments</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grille de collections */}
      {filteredCollections.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Folder className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucune collection trouvée</h3>
          <p className="text-slate-600 mb-6">
            Aucune collection ne correspond à votre recherche ou filtre.
          </p>
          <Button variant="outline" onClick={() => { setSearchQuery(''); setFilterFramework('all') }}>
            Réinitialiser les filtres
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-codeo-green/30"
            >
              {/* Thumbnail avec couleur de fond */}
              <div className={`relative h-32 ${collection.color} overflow-hidden`}>
                {collection.thumbnail ? (
                  <img 
                    src={collection.thumbnail} 
                    alt={collection.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FolderKanban className="w-12 h-12 text-white/30" />
                  </div>
                )}
                {/* Actions au survol */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/90 hover:bg-white"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Voir
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/90 hover:bg-white"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Modifier
                  </Button>
                    </div>
                {/* Badge nombre d'éléments */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-slate-900 flex items-center gap-1">
                  <Layers className="w-3 h-3" />
                  {collection.items}
                      </div>
                    </div>

              {/* Contenu */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900 truncate mb-1">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                      {collection.description}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        Ouvrir
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="w-4 h-4 mr-2" />
                        Dupliquer
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Frameworks */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {collection.frameworks.map((framework, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-xs font-medium bg-slate-100 text-slate-700 px-2 py-1 rounded border border-slate-200"
                    >
                      <Code2 className="w-3 h-3" />
                      {framework}
                    </span>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {collection.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-codeo-green/10 text-codeo-green px-2 py-0.5 rounded border border-codeo-green/20"
                    >
                      <Tag className="w-2.5 h-2.5 inline mr-1" />
                      {tag}
                    </span>
                      ))}
                  {collection.tags.length > 3 && (
                    <span className="text-xs text-slate-500 px-2 py-0.5">
                      +{collection.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Footer avec créateur et date */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <img
                      src={collection.creator.avatar}
                      alt={collection.creator.name}
                      className="w-6 h-6 rounded-full border border-slate-200"
                    />
                    <span className="text-xs text-slate-600">
                      {collection.creator.name}
                      </span>
                    </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    {formatRelativeTime(collection.updated)}
                  </div>
                </div>
              </div>

              {/* Lien vers la collection */}
              <div className="absolute inset-0 cursor-pointer" />
            </motion.div>
          ))}
      </div>
      )}
    </div>
  )
}
