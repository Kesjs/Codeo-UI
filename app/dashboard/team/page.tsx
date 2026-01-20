'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  UserPlus, 
  Shield, 
  Mail,
  MoreVertical,
  Crown,
  UserCheck,
  UserX,
  Search,
  Filter
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { usePlan } from '../layout'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface TeamMember {
  id: string
  name: string
  email: string
  role: 'owner' | 'admin' | 'member' | 'viewer'
  avatar: string
  status: 'active' | 'pending' | 'inactive'
  joinedAt: string
}

export default function TeamPage() {
  const { activePlan } = usePlan()
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')

  // Vérifier l'accès Business
  if (activePlan !== 'business') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-codeo-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10 text-codeo-green" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Fonctionnalité Business</h2>
          <p className="text-slate-600 mb-6">
            La gestion d'équipe est disponible uniquement avec le plan Business. 
            Passez à Business pour inviter des membres et gérer les permissions.
          </p>
          <Button className="bg-codeo-green hover:bg-codeo-green/90">
            Passer à Business
          </Button>
        </div>
      </div>
    )
  }

  // Données mock pour l'équipe
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Ken Kennedy',
      email: 'ken@example.com',
      role: 'owner',
      avatar: 'https://i.pravatar.cc/150?img=12',
      status: 'active',
      joinedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Sarah Martin',
      email: 'sarah@example.com',
      role: 'admin',
      avatar: 'https://i.pravatar.cc/150?img=47',
      status: 'active',
      joinedAt: '2024-02-20'
    },
    {
      id: '3',
      name: 'Alex Chen',
      email: 'alex@example.com',
      role: 'member',
      avatar: 'https://i.pravatar.cc/150?img=33',
      status: 'active',
      joinedAt: '2024-03-10'
    },
    {
      id: '4',
      name: 'Marie Dubois',
      email: 'marie@example.com',
      role: 'viewer',
      avatar: 'https://i.pravatar.cc/150?img=28',
      status: 'pending',
      joinedAt: '2024-03-25'
    },
  ]

  const getRoleLabel = (role: string) => {
    const roles: Record<string, string> = {
      owner: 'Propriétaire',
      admin: 'Administrateur',
      member: 'Membre',
      viewer: 'Observateur'
    }
    return roles[role] || role
  }

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      owner: 'bg-purple-100 text-purple-700 border-purple-200',
      admin: 'bg-blue-100 text-blue-700 border-blue-200',
      member: 'bg-green-100 text-green-700 border-green-200',
      viewer: 'bg-slate-100 text-slate-700 border-slate-200'
    }
    return colors[role] || colors.viewer
  }

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === 'all' || member.role === roleFilter
    return matchesSearch && matchesRole
  })

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
              <Users className="w-6 h-6 text-codeo-green" />
            </div>
            Gestion d'équipe
          </h1>
          <p className="text-slate-600 mt-2">
            Gérez les membres de votre équipe et leurs permissions
          </p>
        </div>
        <Button className="bg-codeo-green hover:bg-codeo-green/90">
          <UserPlus className="w-4 h-4 mr-2" />
          Inviter un membre
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-slate-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Total membres</p>
              <p className="text-2xl font-bold text-slate-900">{teamMembers.length}</p>
            </div>
            <Users className="w-8 h-8 text-codeo-green/30" />
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
              <p className="text-sm text-slate-600 mb-1">Actifs</p>
              <p className="text-2xl font-bold text-slate-900">
                {teamMembers.filter(m => m.status === 'active').length}
              </p>
            </div>
            <UserCheck className="w-8 h-8 text-green-500/30" />
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
              <p className="text-sm text-slate-600 mb-1">En attente</p>
              <p className="text-2xl font-bold text-slate-900">
                {teamMembers.filter(m => m.status === 'pending').length}
              </p>
            </div>
            <Mail className="w-8 h-8 text-amber-500/30" />
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
              <p className="text-sm text-slate-600 mb-1">Administrateurs</p>
              <p className="text-2xl font-bold text-slate-900">
                {teamMembers.filter(m => m.role === 'admin' || m.role === 'owner').length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-blue-500/30" />
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-codeo-green transition-colors duration-200 z-10 pointer-events-none" />
            <Input
              placeholder="Rechercher par nom ou email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-black/20 border border-black/10 transition-colors duration-200 hover:border-black/15"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Tous les rôles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les rôles</SelectItem>
              <SelectItem value="owner">Propriétaire</SelectItem>
              <SelectItem value="admin">Administrateur</SelectItem>
              <SelectItem value="member">Membre</SelectItem>
              <SelectItem value="viewer">Observateur</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Team Members List */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-200">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                    />
                    {member.role === 'owner' && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                        <Crown className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{member.name}</h3>
                      {member.status === 'pending' && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                          En attente
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {member.email}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Membre depuis le {new Date(member.joinedAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getRoleColor(member.role)}`}>
                      {getRoleLabel(member.role)}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Modifier le rôle</DropdownMenuItem>
                        <DropdownMenuItem>Renvoyer l'invitation</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Retirer du groupe
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Permissions Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Niveaux de permissions</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p><strong>Propriétaire :</strong> Accès complet, gestion de l'abonnement</p>
              <p><strong>Administrateur :</strong> Gestion des membres et des projets</p>
              <p><strong>Membre :</strong> Création et modification de projets</p>
              <p><strong>Observateur :</strong> Consultation uniquement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
