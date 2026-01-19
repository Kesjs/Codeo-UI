'use client'

import { useState, createContext, useContext } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/dashboard/Sidebar'
import Header from '@/components/dashboard/Header'

// Contexte global pour le plan
const PlanContext = createContext<{
  activePlan: 'starter' | 'pro' | 'business'
  simulatedPlan: 'starter' | 'pro' | 'business'
  setSimulatedPlan: (plan: 'starter' | 'pro' | 'business') => void
  isDevMode: boolean
}>({
  activePlan: 'starter',
  simulatedPlan: 'starter',
  setSimulatedPlan: () => {},
  isDevMode: false
})

export const usePlan = () => useContext(PlanContext)

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Simulation dev toggle pour le plan
  const isDevMode = process.env.NODE_ENV === 'development'
  const [simulatedPlan, setSimulatedPlan] = useState<'starter' | 'pro' | 'business'>('starter')
  const activePlan = isDevMode ? simulatedPlan : 'starter'

  // Données factices pour le header selon le plan
  const getScanData = () => {
    switch (activePlan) {
      case 'starter':
        return { remainingScans: 8, totalScans: 10 }
      case 'pro':
        return { remainingScans: 47, totalScans: Infinity }
      case 'business':
        return { remainingScans: 142, totalScans: Infinity }
      default:
        return { remainingScans: 5, totalScans: 10 }
    }
  }

  const { remainingScans, totalScans } = getScanData()

  return (
    <PlanContext.Provider value={{ activePlan, simulatedPlan, setSimulatedPlan, isDevMode }}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header 
            remainingScans={remainingScans} 
            totalScans={totalScans}
            plan={activePlan}
            onMenuClick={() => setSidebarOpen(true)}
          />
          
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </PlanContext.Provider>
  )
}
