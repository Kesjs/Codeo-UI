'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Bell, Shield, Palette, Globe, Save, Moon, Sun } from 'lucide-react'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
    security: true
  })

  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'UTC',
    theme: 'light',
    autoSave: true
  })

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: '24h',
    loginAlerts: true
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
  }

  const handlePreferenceChange = (key: string, value: string | boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const handleSecurityChange = (key: string, value: boolean | string) => {
    setSecurity(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    console.log('Saving settings:', { notifications, preferences, security })
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
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            </div>
            
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-6">
            <Bell className="h-5 w-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-600">Receive email updates about your account</p>
              </div>
              <button
                onClick={() => handleNotificationChange('email', !notifications.email)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.email ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.email ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Push Notifications</h3>
                <p className="text-sm text-gray-600">Receive push notifications in your browser</p>
              </div>
              <button
                onClick={() => handleNotificationChange('push', !notifications.push)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.push ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.push ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Marketing Emails</h3>
                <p className="text-sm text-gray-600">Receive product updates and offers</p>
              </div>
              <button
                onClick={() => handleNotificationChange('marketing', !notifications.marketing)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.marketing ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.marketing ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Security Alerts</h3>
                <p className="text-sm text-gray-600">Get notified about security events</p>
              </div>
              <button
                onClick={() => handleNotificationChange('security', !notifications.security)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.security ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.security ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-6">
            <Palette className="h-5 w-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={preferences.language}
                onChange={(e) => handlePreferenceChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select
                value={preferences.timezone}
                onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="PST">Pacific Time</option>
                <option value="CET">Central European</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <div className="flex space-x-2">
                <Button
                  variant={preferences.theme === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handlePreferenceChange('theme', 'light')}
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </Button>
                <Button
                  variant={preferences.theme === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handlePreferenceChange('theme', 'dark')}
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Auto-save</h3>
                <p className="text-sm text-gray-600">Automatically save your work</p>
              </div>
              <button
                onClick={() => handlePreferenceChange('autoSave', !preferences.autoSave)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.autoSave ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.autoSave ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-6">
            <Shield className="h-5 w-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Security</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
              <Button variant="outline" size="sm">
                {security.twoFactor ? 'Disable' : 'Enable'}
              </Button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout
              </label>
              <select
                value={security.sessionTimeout}
                onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1h">1 hour</option>
                <option value="24h">24 hours</option>
                <option value="7d">7 days</option>
                <option value="30d">30 days</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Login Alerts</h3>
                <p className="text-sm text-gray-600">Get notified of new login attempts</p>
              </div>
              <button
                onClick={() => handleSecurityChange('loginAlerts', !security.loginAlerts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  security.loginAlerts ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    security.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-red-200">
          <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Clear Cache</h3>
                <p className="text-sm text-gray-600">Clear all cached data</p>
              </div>
              <Button variant="outline" size="sm">
                Clear Cache
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Reset Settings</h3>
                <p className="text-sm text-gray-600">Reset all settings to default</p>
              </div>
              <Button variant="outline" size="sm">
                Reset Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
