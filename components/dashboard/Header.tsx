'use client'

import { useState } from 'react'
import { Cpu, Zap, HelpCircle, Settings, Menu, Infinity } from 'lucide-react'
import Tooltip from './ui/Tooltip'

interface HeaderProps {
  remainingScans?: number
  totalScans?: number
  plan?: 'starter' | 'pro' | 'business'
  onMenuClick?: () => void
}

export default function Header({ remainingScans = 5, totalScans = 10, plan = 'starter', onMenuClick }: HeaderProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  // Détermine l'affichage selon le plan
  const getScansDisplay = () => {
    switch (plan) {
      case 'starter':
        return {
          text: `${remainingScans}/${totalScans}`,
          label: 'Scans IA',
          color: 'text-codeo-green',
          bgColor: 'bg-codeo-green/10',
          tooltip: 'Vos Scans IA restants. 1 scan = exports illimités pour ce design.'
        }
      case 'pro':
        return {
          text: 'Illimités',
          label: 'Scans IA',
          color: 'text-codeo-green',
          bgColor: 'bg-codeo-green/10',
          tooltip: 'Scans IA illimités avec GPU prioritaire. Profitez de la puissance V-AST Turbo !'
        }
      case 'business':
        return {
          text: 'Illimités',
          label: 'Scans IA',
          color: 'text-purple-600',
          bgColor: 'bg-purple-100',
          tooltip: 'Scans IA illimités avec instance dédiée. Performance maximale pour votre équipe.'
        }
      default:
        return {
          text: `${remainingScans}/${totalScans}`,
          label: 'Scans IA',
          color: 'text-codeo-green',
          bgColor: 'bg-codeo-green/10',
          tooltip: 'Vos Scans IA restants. 1 scan = exports illimités pour ce design.'
        }
    }
  }

  const scansDisplay = getScansDisplay()

  return (
    <header className="bg-white border-b border-slate-200 relative z-10">
      <div className="px-4 sm:px-6 py-2 h-16 flex items-center">
        <div className="w-full flex items-center justify-between">
          {/* Left side - Title */}
          <div className="flex items-center gap-3 flex-1 min-w-0 pl-12 lg:pl-0">
            <h1 className="text-lg font-bold text-slate-900 whitespace-nowrap overflow-hidden">
              Tableau de board - Codeo UI
            </h1>
            <div className="hidden sm:flex items-center gap-1 text-xs text-slate-500 ml-2">
              <Zap className="h-3 w-3" />
              <span>V-AST v1.0.0 actif</span>
            </div>
          </div>

          {/* Right side - Credits and actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Scans IA Badge */}
            <div className="relative ml-4">
              <div
                className={`${scansDisplay.bgColor} ${scansDisplay.color} px-3 py-1.5 rounded-lg font-medium text-sm cursor-help flex items-center gap-2`}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                {plan !== 'starter' && (
                  <Infinity className="h-4 w-4" />
                )}
                <div className="flex flex-col sm:flex-row items-center gap-0 sm:gap-2">
                  <span className="font-bold">{scansDisplay.text}</span>
                  <span className="text-xs sm:text-sm">{scansDisplay.label}</span>
                </div>
              </div>
              
              {showTooltip && (
                <Tooltip text={scansDisplay.tooltip} />
              )}
            </div>

            {/* Help Button */}
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors relative z-10">
              <HelpCircle className="h-5 w-5" />
            </button>

            {/* Settings Button */}
            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors relative z-10">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
