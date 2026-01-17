import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Search, Bell, User, Folder, Clock, TrendingUp, Users } from 'lucide-react'

export default function DashboardPage() {
  const recentProjects = [
    {
      id: 1,
      name: 'E-commerce Homepage',
      framework: 'React + Tailwind',
      createdAt: '2 hours ago',
      status: 'completed',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 2,
      name: 'Mobile App Dashboard',
      framework: 'Vue.js',
      createdAt: '1 day ago',
      status: 'completed',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 3,
      name: 'Landing Page Redesign',
      framework: 'HTML + CSS',
      createdAt: '3 days ago',
      status: 'processing',
      thumbnail: '/api/placeholder/300/200'
    }
  ]

  const stats = [
    { label: 'Total Projects', value: '12', icon: Folder, change: '+2 this week' },
    { label: 'Conversions', value: '48', icon: TrendingUp, change: '+12 this week' },
    { label: 'Team Members', value: '3', icon: Users, change: '+1 this month' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4 space-y-2">
            <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg">
              <Folder className="h-5 w-5" />
              <span>Projects</span>
            </Link>
            <Link href="/workspace" className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              <Plus className="h-5 w-5" />
              <span>New Project</span>
            </Link>
            <Link href="/billing" className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              <TrendingUp className="h-5 w-5" />
              <span>Billing</span>
            </Link>
            <Link href="/settings" className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
              <User className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </nav>

          <div className="p-4 mt-auto">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
              <h3 className="font-semibold mb-2">Upgrade to Pro</h3>
              <p className="text-sm mb-3">Get unlimited conversions and more features</p>
              <Button size="sm" variant="secondary" className="w-full">
                Upgrade Now
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/workspace">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Link>
              </Button>
              <Button variant="outline">
                <Clock className="h-4 w-4 mr-2" />
                View History
              </Button>
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Invite Team
              </Button>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentProjects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    <img 
                      src={project.thumbnail} 
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        project.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{project.framework}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{project.createdAt}</span>
                      <Button size="sm" variant="ghost">
                        Open
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {recentProjects.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Folder className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                <p className="text-gray-600 mb-4">Create your first project to get started</p>
                <Button asChild>
                  <Link href="/workspace">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Project
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
