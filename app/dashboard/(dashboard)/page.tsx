'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Dropzone from '@/components/dashboard/Dropzone'
import ProjectCard from '@/components/dashboard/ProjectCard'
import { motion } from 'framer-motion'

interface Project {
  id: string
  name: string
  thumbnail: string
  date: string
  frameworks: string[]
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Dashboard Analytics',
    thumbnail: '/images/dashboard-thumb.jpg',
    date: '2024-01-15',
    frameworks: ['React', 'TypeScript']
  },
  {
    id: '2',
    name: 'Landing Page E-commerce',
    thumbnail: '/images/ecommerce-thumb.jpg',
    date: '2024-01-10',
    frameworks: ['Next.js', 'Tailwind CSS']
  },
  // Ajoutez d'autres projets si nécessaire
]

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(true)

  useEffect(() => {
    // Simuler un chargement
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleFileSelected = (file: File) => {
    console.log('Fichier sélectionné:', file.name)
    // Ici, vous pouvez ajouter la logique pour traiter le fichier
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-codeo-green"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Bienvenue, Ken</h1>
        <p className="text-slate-500">
          {new Date().toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>

      {/* Zone de dépôt */}
      <div className="bg-gradient-to-r from-codeo-green/5 to-emerald-100/50 p-6 rounded-xl border border-slate-200">
        <Dropzone 
          onFileSelected={handleFileSelected}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          showOnboarding={showOnboarding}
        />
      </div>

      {/* Projets récents */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Projets récents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div onClick={() => router.push(`/dashboard/projects/${project.id}`)}>
                <ProjectCard
                  project={project}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
