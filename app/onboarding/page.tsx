'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, CheckCircle, Code, Zap, Users, Palette } from 'lucide-react'

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedFramework, setSelectedFramework] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)

  const steps = [
    { id: 0, title: 'Welcome', icon: Users, description: 'Get started with Codeo' },
    { id: 1, title: 'Choose Framework', icon: Code, description: 'Select your preferred technology' },
    { id: 2, title: 'Set Preferences', icon: Palette, description: 'Customize your experience' },
    { id: 3, title: 'Define Role', icon: Users, description: 'Tell us how you\'ll use Codeo' }
  ]

  const frameworks = [
    { id: 'react', name: 'React', description: 'Build modern web applications' },
    { id: 'vue', name: 'Vue.js', description: 'Progressive JavaScript framework' },
    { id: 'angular', name: 'Angular', description: 'Full-featured framework' },
    { id: 'svelte', name: 'Svelte', description: 'Cybernetically enhanced web apps' }
  ]

  const roles = [
    { id: 'developer', name: 'Developer', description: 'Build and ship applications' },
    { id: 'designer', name: 'Designer', description: 'Create beautiful user interfaces' },
    { id: 'manager', name: 'Manager', description: 'Lead teams and projects' },
    { id: 'student', name: 'Student', description: 'Learn and explore' }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setIsCompleted(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    // Redirect to dashboard
    window.location.href = '/dashboard'
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Users className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Codeo
            </h2>
            <div className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Transform your screenshots into production-ready code with AI. Let's set up your preferences to get the best experience.
            </div>
            <Button onClick={handleNext} className="w-full">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )

      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Choose Your Framework
            </h2>
            <div className="text-gray-600 mb-8">
              Select the framework you'll be working with most often. We'll optimize your experience accordingly.
            </div>
            <div className="grid grid-cols-2 gap-4">
              {frameworks.map((framework) => (
                <button
                  key={framework.id}
                  onClick={() => setSelectedFramework(framework.id)}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    selectedFramework === framework.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-lg font-semibold mb-2">{framework.name}</div>
                  <div className="text-sm text-gray-600">{framework.description}</div>
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
              <Button onClick={handleNext} disabled={!selectedFramework}>
                Next
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Set Your Preferences
            </h2>
            <div className="text-gray-600 mb-8">
              Customize your Codeo experience. These settings help us personalize your workflow.
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Dark Mode</h3>
                  <p className="text-sm text-gray-600">Use dark theme across the app</p>
                </div>
                <button className="w-12 h-6 bg-gray-200 rounded-full relative transition-colors hover:bg-blue-500">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Auto-save</h3>
                  <p className="text-sm text-gray-600">Save work automatically</p>
                </div>
                <button className="w-12 h-6 bg-blue-500 rounded-full relative transition-colors">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transform translate-x-3"></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Notifications</h3>
                  <p className="text-sm text-gray-600">Email updates for your projects</p>
                </div>
                <button className="w-12 h-6 bg-blue-500 rounded-full relative transition-colors">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transform translate-x-3"></div>
                </button>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Define Your Role
            </h2>
            <div className="text-gray-600 mb-8">
              Tell us how you plan to use Codeo. This helps us tailor the experience to your needs.
            </div>
            <div className="grid grid-cols-2 gap-4">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    selectedRole === role.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-lg font-semibold mb-2">{role.name}</div>
                  <div className="text-sm text-gray-600">{role.description}</div>
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
              <Button onClick={handleComplete} disabled={!selectedRole}>
                Complete Setup
                <CheckCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Setup Complete!
            </h1>
            <div className="text-gray-600 mb-8">
              Your workspace is ready. You can now start converting screenshots to code.
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-700 mb-2">
                <strong>Framework:</strong> {frameworks.find(f => f.id === selectedFramework)?.name || 'Not selected'}
              </div>
              <div className="text-sm text-gray-700 mb-2">
                <strong>Role:</strong> {roles.find(r => r.id === selectedRole)?.name || 'Not selected'}
              </div>
              <div className="text-sm text-gray-700">
                <strong>Preferences:</strong> Dark mode, Auto-save, Notifications enabled
              </div>
            </div>
            <Button className="w-full" onClick={() => window.location.href = '/workspace'}>
              Go to Workspace
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index < currentStep 
                      ? 'bg-blue-500' 
                      : index === currentStep 
                        ? 'bg-blue-600' 
                        : 'bg-gray-300'
                  }`}>
                    {index < currentStep && (
                      <CheckCircle className="h-4 w-4 text-white" />
                    )}
                    <span className="text-xs font-medium text-white">
                      {index + 1}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-0.5 bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="icon" onClick={() => window.location.href = '/'}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 flex-1 text-center">
              {steps[currentStep]?.title}
            </h1>
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
