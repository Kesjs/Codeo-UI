'use client'

import { useState } from 'react'
import { Cpu, Zap, HelpCircle, Settings, Menu } from 'lucide-react'
import Tooltip from './ui/Tooltip'

interface HeaderProps {
  remainingScans: number
  totalScans: number
  onMenuClick?: () => void
}

export default function Header({ remainingScans, totalScans, onMenuClick }: HeaderProps) {
  const [showTooltip, setShowTooltip] = useState(false)

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
                className="bg-codeo-green/10 text-codeo-green px-3 py-1.5 rounded-lg font-medium text-sm cursor-help"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <div className="flex flex-col sm:flex-row items-center gap-0 sm:gap-2">
                  <span className="font-bold">{remainingScans}/{totalScans}</span>
                  <span className="text-xs sm:text-sm">Scans IA</span>
                </div>
              </div>
              
              {showTooltip && (
                <Tooltip text="Vos Scans IA restants. 1 scan = exports illimités pour ce design." />
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
