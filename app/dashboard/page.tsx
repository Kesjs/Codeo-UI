'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/dashboard/Sidebar'
import Header from '@/components/dashboard/Header'
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
    date: '2024-01-14',
    frameworks: ['Vue', 'Tailwind']
  },
  {
    id: '3',
    name: 'Mobile App UI',
    thumbnail: '/images/mobile-thumb.jpg',
    date: '2024-01-13',
    frameworks: ['React Native']
  }
]

export default function Dashboard() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [projects, setProjects] = useState<Project[]>(mockProjects)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth/login')
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-codeo-light-bg overflow-hidden">
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <Header remainingScans={10} totalScans={10} />
          
          <main className="flex-1 p-8 overflow-y-auto">
            <Dropzone 
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
              showOnboarding={showOnboarding}
            />

            {/* Section Projets Récents */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Mes Projets Récents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>

            {/* Section Inspiration */}
            <section className="mt-12 pb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Inspiration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="relative group cursor-pointer">
                    <div className="aspect-video bg-slate-200 rounded-xl overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 opacity-50" />
                    </div>
                    <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-codeo-green text-white px-3 py-1 rounded-full text-sm font-medium">
                        Bientôt disponible
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
