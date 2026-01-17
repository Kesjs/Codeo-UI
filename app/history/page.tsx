'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Search, Filter, Download, Eye, Calendar, Clock, Image, Code } from 'lucide-react'

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterFramework, setFilterFramework] = useState('all')

  const conversions = [
    {
      id: 1,
      name: 'E-commerce Homepage',
      framework: 'React + Tailwind',
      status: 'completed',
      createdAt: '2024-01-15T10:30:00Z',
      processingTime: '2.3s',
      thumbnail: '/api/placeholder/300/200',
      codeLines: 245
    },
    {
      id: 2,
      name: 'Mobile App Dashboard',
      framework: 'Vue.js',
      status: 'completed',
      createdAt: '2024-01-14T15:45:00Z',
      processingTime: '1.8s',
      thumbnail: '/api/placeholder/300/200',
      codeLines: 189
    },
    {
      id: 3,
      name: 'Landing Page Redesign',
      framework: 'HTML + CSS',
      status: 'processing',
      createdAt: '2024-01-14T09:20:00Z',
      processingTime: 'Processing...',
      thumbnail: '/api/placeholder/300/200',
      codeLines: null
    },
    {
      id: 4,
      name: 'Admin Panel',
      framework: 'React + Bootstrap',
      status: 'completed',
      createdAt: '2024-01-13T14:15:00Z',
      processingTime: '3.1s',
      thumbnail: '/api/placeholder/300/200',
      codeLines: 312
    },
    {
      id: 5,
      name: 'Portfolio Website',
      framework: 'Vue.js',
      status: 'failed',
      createdAt: '2024-01-12T11:30:00Z',
      processingTime: 'Failed',
      thumbnail: '/api/placeholder/300/200',
      codeLines: null
    }
  ]

  const frameworks = ['all', 'React', 'Vue.js', 'HTML + CSS', 'Bootstrap', 'Tailwind']
  const statuses = ['all', 'completed', 'processing', 'failed']

  const filteredConversions = conversions.filter(conversion => {
    const matchesSearch = conversion.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || conversion.status === filterStatus
    const matchesFramework = filterFramework === 'all' || conversion.framework.includes(filterFramework)
    
    return matchesSearch && matchesStatus && matchesFramework
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'failed':
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

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
              <h1 className="text-2xl font-bold text-gray-900">History</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <div className="flex space-x-2">
                {statuses.map((status) => (
                  <Button
                    key={status}
                    variant={filterStatus === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus(status)}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Framework:</span>
              <div className="flex space-x-2">
                {frameworks.map((framework) => (
                  <Button
                    key={framework}
                    variant={filterFramework === framework ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterFramework(framework)}
                  >
                    {framework}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Conversions</p>
                <p className="text-2xl font-bold text-gray-900">48</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Code className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">42</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Processing</p>
                <p className="text-2xl font-bold text-blue-600">3</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Image className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Conversions List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Conversion</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Framework</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Processing Time</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Code Lines</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredConversions.map((conversion) => (
                  <tr key={conversion.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={conversion.thumbnail}
                          alt={conversion.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">{conversion.name}</h4>
                          <p className="text-sm text-gray-600">ID: #{conversion.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-700">{conversion.framework}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(conversion.status)}`}>
                        {conversion.status.charAt(0).toUpperCase() + conversion.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center text-sm text-gray-700">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {formatDate(conversion.createdAt)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-700">{conversion.processingTime}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-700">
                        {conversion.codeLines ? conversion.codeLines.toLocaleString() : '-'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredConversions.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No conversions found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredConversions.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600">
              Showing {filteredConversions.length} of {conversions.length} conversions
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
