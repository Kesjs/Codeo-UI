'use client'

import { motion, Variants } from 'framer-motion'
import { Calendar, ExternalLink, Code2, Atom, Circle, Square, Type, Triangle, Palette, Globe, Cpu, Database, Smartphone, Server, GitBranch } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  isPremium?: boolean;
  delay?: number;
}

const getFrameworkIcon = (framework: string) => {
  const baseClass = 'w-4 h-4 flex-shrink-0'
  const iconProps = {
    className: baseClass,
    'aria-hidden': true
  }

  switch (framework.toLowerCase()) {
    case 'react':
    case 'react native':
      return <Atom {...iconProps} className={`${baseClass} text-blue-500`} />
    case 'vue':
      return <Triangle {...iconProps} className={`${baseClass} text-green-500`} />
    case 'angular':
      return <Square {...iconProps} className={`${baseClass} text-red-500`} />
    case 'typescript':
      return <Type {...iconProps} className={`${baseClass} text-blue-600`} />
    case 'tailwind':
      return <Palette {...iconProps} className={`${baseClass} text-cyan-500`} />
    case 'html':
      return <Code2 {...iconProps} className={`${baseClass} text-orange-500`} />
    case 'css':
      return <Palette {...iconProps} className={`${baseClass} text-blue-400`} />
    case 'javascript':
      return <Code2 {...iconProps} className={`${baseClass} text-yellow-400`} />
    case 'node':
    case 'nodejs':
      return <Circle {...iconProps} className={`${baseClass} text-green-600`} />
    case 'next':
    case 'nextjs':
      return <Globe {...iconProps} className={`${baseClass} text-gray-900 dark:text-gray-100`} />
    case 'graphql':
      return <GitBranch {...iconProps} className={`${baseClass} text-pink-500`} />
    case 'mongodb':
      return <Database {...iconProps} className={`${baseClass} text-green-500`} />
    case 'express':
      return <Code2 {...iconProps} className={`${baseClass} text-gray-500`} />
    case 'react native':
      return <Smartphone {...iconProps} className={`${baseClass} text-blue-400`} />
    case 'docker':
      return <Server {...iconProps} className={`${baseClass} text-blue-500`} />
    case 'aws':
      return <Server {...iconProps} className={`${baseClass} text-orange-400`} />
    default:
      return <Code2 {...iconProps} className={`${baseClass} text-gray-400`} />
  }
}

// Animation pour les cartes standard (Staggered Slide & Blur)
const cardVariants: Variants = {
  offscreen: {
    y: 30,  // Augmenté de 10 à 30 pour un effet plus visible
    opacity: 0,
    filter: 'blur(8px)',  // Augmenté le flou initial
  },
  onscreen: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 120,  // Augmenté pour un effet plus dynamique
      damping: 12,     // Réduit pour plus de rebond
      delay: i * 0.1,  // Délai légèrement augmenté
    },
  }),
  hover: {
    y: -8,  // Effet de lévitation au survol
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
    },
  },
};

// Animation pour la bordure des cartes premium (Border Draw)
const borderVariants: Variants = {
  hidden: { 
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 1.2,  // Animation plus lente
      ease: [0.2, 0.8, 0.4, 1],  // Courbe d'animation personnalisée
    },
  },
  pulse: {
    scale: 1.02,  // Légère mise à l'échelle
    transition: {
      repeat: Infinity,
      repeatType: 'reverse',
      duration: 2,
      ease: 'easeInOut',
    },
  },
};

export default function ProjectCard({ 
  project, 
  onClick, 
  isPremium = false, 
  delay = 0 
}: ProjectCardProps) {
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
      initial="offscreen"
      whileInView="onscreen"
      whileHover="hover"
      viewport={{ once: true, margin: "-30% 0px" }}
      variants={cardVariants}
      custom={delay}
      className={cn(
        "group relative h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-codeo-green/30 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-codeo-green/30"
      )}
    >
      {/* Thumbnail */}
      <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
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
      <div className="p-3">
        <h3 className="font-medium text-sm text-slate-900 dark:text-slate-100 mb-1.5 line-clamp-1">
          {project.name}
        </h3>
        
        {/* Framework Badges */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {project.frameworks.map((framework) => {
            const icon = getFrameworkIcon(framework);
            return (
              <div
                key={framework}
                className="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-[11px] rounded-md border border-slate-200 dark:border-slate-700"
                title={framework}
              >
                <div className="flex items-center justify-center">
                  {icon}
                </div>
                <span className="font-medium">{framework}</span>
              </div>
            );
          })}
        </div>

        {/* Date */}
        <div className="flex items-center justify-between text-[11px] text-slate-500">
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
