'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, User, Mail, Camera, Save, Upload } from 'lucide-react'

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    company: 'Acme Corp',
    role: 'Frontend Developer',
    bio: 'Passionate about creating beautiful user interfaces and seamless user experiences.'
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // Save profile logic
    console.log('Saving profile:', formData)
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
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            </div>
            
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Picture Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                JD
              </div>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Profile Picture</h2>
              <p className="text-gray-600 mb-3">Upload a new avatar</p>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <Input
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter your first name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <Input
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter your last name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company
              </label>
              <Input
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Enter your company"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <Input
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                placeholder="Enter your role"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tell us about yourself"
            />
          </div>
        </div>

        {/* Account Statistics */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Account Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">48</div>
              <div className="text-sm text-gray-600">Total Conversions</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">12</div>
              <div className="text-sm text-gray-600">Projects Created</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">3</div>
              <div className="text-sm text-gray-600">Team Members</div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-red-200">
          <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
          <p className="text-gray-600 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="destructive">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  )
}
