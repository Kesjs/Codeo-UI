'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Users, Plus, Mail, Crown, Settings, Trash2, Search } from 'lucide-react'

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('member')

  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'owner',
      avatar: 'JD',
      status: 'active',
      joinedAt: '2024-01-01',
      lastActive: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      role: 'admin',
      avatar: 'SW',
      status: 'active',
      joinedAt: '2024-01-05',
      lastActive: '2024-01-14T15:45:00Z'
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@example.com',
      role: 'member',
      avatar: 'MC',
      status: 'active',
      joinedAt: '2024-01-10',
      lastActive: '2024-01-13T09:20:00Z'
    },
    {
      id: 4,
      name: 'Emma Davis',
      email: 'emma.davis@example.com',
      role: 'member',
      avatar: 'ED',
      status: 'pending',
      joinedAt: '2024-01-14',
      lastActive: null
    }
  ]

  const roles = [
    { id: 'owner', name: 'Owner', description: 'Full access to all settings' },
    { id: 'admin', name: 'Admin', description: 'Can manage team and billing' },
    { id: 'member', name: 'Member', description: 'Can create and edit projects' }
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'bg-purple-100 text-purple-800'
      case 'admin':
        return 'bg-blue-100 text-blue-800'
      case 'member':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'inactive':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleInvite = () => {
    console.log('Inviting:', inviteEmail, 'as', inviteRole)
    setShowInviteModal(false)
    setInviteEmail('')
    setInviteRole('member')
  }

  const handleRemoveMember = (memberId: number) => {
    console.log('Removing member:', memberId)
  }

  const handleRoleChange = (memberId: number, newRole: string) => {
    console.log('Changing role for member:', memberId, 'to', newRole)
  }

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Team</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <Button onClick={() => setShowInviteModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">4</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">3</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Crown className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">1</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Mail className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Seats Used</p>
                <p className="text-2xl font-bold text-gray-900">4/10</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Team Members List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Member</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Joined</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Last Active</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {member.avatar}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(member.role)}`}>
                        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-700">{formatDate(member.joinedAt)}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-700">
                        {member.lastActive ? formatDate(member.lastActive) : 'Never'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {member.role !== 'owner' && (
                          <select
                            value={member.role}
                            onChange={(e) => handleRoleChange(member.id, e.target.value)}
                            className="text-sm border border-gray-300 rounded px-2 py-1"
                          >
                            {roles.filter(r => r.id !== 'owner').map(role => (
                              <option key={role.id} value={role.id}>
                                {role.name}
                              </option>
                            ))}
                          </select>
                        )}
                        
                        {member.role !== 'owner' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMember(member.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invite Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Invite Team Member</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowInviteModal(false)}
                >
                  ×
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="colleague@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {roles.filter(r => r.id !== 'owner').map(role => (
                      <option key={role.id} value={role.id}>
                        {role.name} - {role.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowInviteModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleInvite}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Invitation
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Team Settings */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Settings</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Allow self-invitation</h3>
                <p className="text-sm text-gray-600">Team members can invite others</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Require approval</h3>
                <p className="text-sm text-gray-600">New members need approval</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Default role</h3>
                <p className="text-sm text-gray-600">Role for new members</p>
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
