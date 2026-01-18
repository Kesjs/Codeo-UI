'use client'

import { useState } from 'react'

interface TooltipProps {
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export default function Tooltip({ text, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(true)

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  }

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 -mt-1',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 -mb-1',
    left: 'left-full top-1/2 transform -translate-y-1/2 -ml-1',
    right: 'right-full top-1/2 transform -translate-y-1/2 -mr-1'
  }

  return (
    <div className={`absolute z-50 ${positionClasses[position]}`}>
      <div className="bg-white rounded-lg shadow-lg border border-slate-200 px-3 py-2 max-w-xs">
        <p className="text-sm text-slate-700">{text}</p>
      </div>
      <div className={`absolute w-2 h-2 bg-white border border-slate-200 transform rotate-45 ${arrowClasses[position]}`}></div>
    </div>
  )
}
