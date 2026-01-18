'use client'

import { motion } from 'framer-motion'
import { Calendar, ExternalLink, Code2 } from 'lucide-react'

interface Project {
  id: string
  name: string
  thumbnail: string
  date: string
  frameworks: string[]
}

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

const getFrameworkIcon = (framework: string) => {
  switch (framework.toLowerCase()) {
    case 'react':
    case 'react native':
      return '⚛️'
    case 'vue':
      return '🟢'
    case 'angular':
      return '🅰️'
    case 'typescript':
      return '🔷'
    case 'tailwind':
      return '🎨'
    case 'html':
      return '🌐'
    case 'css':
      return '🎨'
    default:
      return '💻'
  }
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-slate-100 relative overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback image if thumbnail doesn't exist
            const target = e.target as HTMLImageElement
            target.src = `https://picsum.photos/seed/${project.id}/400/225.jpg`
          }}
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <button className="bg-codeo-green text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-codeo-green/90 transition-colors">
              <ExternalLink className="h-4 w-4" />
              Ouvrir
            </button>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 mb-2 line-clamp-1">
          {project.name}
        </h3>
        
        {/* Framework Badges */}
        <div className="flex flex-wrap gap-1 mb-3">
          {project.frameworks.map((framework) => (
            <span
              key={framework}
              className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
            >
              <span>{getFrameworkIcon(framework)}</span>
              <span>{framework}</span>
            </span>
          ))}
        </div>

        {/* Date */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(project.date)}</span>
          </div>
          <div className="flex items-center gap-1 text-codeo-green">
            <Code2 className="h-3 w-3" />
            <span>V-AST</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
