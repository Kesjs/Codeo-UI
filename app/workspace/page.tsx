'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Upload, Download, Copy, Settings, Play, Code, Image, Zap, Atom, Triangle, FileText, Palette, Box } from 'lucide-react'
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

export default function WorkspacePage() {
  const [selectedFramework, setSelectedFramework] = useState('react')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [generatedCode, setGeneratedCode] = useState(`// Your generated code will appear here
function WelcomeComponent() {
  return (
    <div className="p-6 bg-blue-50 rounded-lg">
      <h1 className="text-2xl font-bold text-blue-600">
        Welcome to Codeo
      </h1>
      <p className="text-gray-600 mt-2">
        Upload a screenshot to generate code instantly
      </p>
    </div>
  )
}`)

const frameworks = [
  { id: 'react', name: 'React', icon: Atom },
  { id: 'vue', name: 'Vue.js', icon: Triangle },
  { id: 'html', name: 'HTML/CSS', icon: FileText },
  { id: 'tailwind', name: 'Tailwind CSS', icon: Palette },
  { id: 'bootstrap', name: 'Bootstrap', icon: Box }
]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        // Simulate code generation
        setTimeout(() => {
          setGeneratedCode(`// Generated ${selectedFramework} code
import React from 'react'

function GeneratedComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Converted Design
          </h1>
          <p className="text-xl text-gray-600">
            This code was generated from your screenshot
          </p>
        </header>
        
        <main className="bg-white rounded-2xl shadow-xl p-8">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Features Section</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
                <p className="text-gray-600">Convert screenshots to code in seconds</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Clean Code</h3>
                <p className="text-gray-600">Production-ready, maintainable code</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Smart Recognition</h3>
                <p className="text-gray-600">AI-powered UI element detection</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default GeneratedComponent`)
        }, 2000)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode)
    // Show success message (you could add a toast notification here)
  }

  const handleDownloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `generated-code.${selectedFramework === 'html' ? 'html' : 'jsx'}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
              <h1 className="text-2xl font-bold text-gray-900">Workspace</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button size="sm">
                <Play className="h-4 w-4 mr-2" />
                Run Code
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Framework Selection */}
      <div className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Framework:</span>
            <div className="flex space-x-2">
              {frameworks.map((framework) => (
                <Button
                  key={framework.id}
                  variant={selectedFramework === framework.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFramework(framework.id)}
                  className="flex items-center space-x-2"
                >
                  <framework.icon className="w-4 h-4" />
                  <span>{framework.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex h-screen pt-20">
        {/* Left Panel - Image Upload */}
        <div className="w-1/2 border-r bg-white">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Design Input</h2>
              <p className="text-sm text-gray-600">Upload a screenshot to convert to code</p>
            </div>
            
            <div className="flex-1 p-6">
              {!selectedImage ? (
                <div className="h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-8">
                  <Upload className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Upload your screenshot
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 text-center">
                    Drag and drop an image here, or click to select
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button asChild>
                      <span>Choose Image</span>
                    </Button>
                  </label>
                  
                  <div className="mt-8 text-center">
                    <p className="text-xs text-gray-500 mb-2">Supported formats:</p>
                    <div className="flex justify-center space-x-4 text-xs text-gray-400">
                      <span>PNG</span>
                      <span>JPG</span>
                      <span>WEBP</span>
                      <span>GIF</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">Uploaded Image</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedImage(null)}
                    >
                      Remove
                    </Button>
                  </div>
                  
                  <div className="flex-1 border rounded-lg overflow-hidden">
                    <img
                      src={selectedImage}
                      alt="Uploaded design"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <Zap className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm text-blue-800">
                        AI is analyzing your design...
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 bg-white">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Generated Code</h2>
                <p className="text-sm text-gray-600">
                  {frameworks.find(f => f.id === selectedFramework)?.name} output
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleCopyCode}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownloadCode}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            
            <div className="flex-1">
              <MonacoEditor
                height="100%"
                defaultLanguage={selectedFramework === 'html' ? 'html' : 'javascript'}
                theme="vs-dark"
                value={generatedCode}
                onChange={(value: string | undefined) => setGeneratedCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
