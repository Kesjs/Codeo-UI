'use client'

import Link from 'next/link'
import { HelpCircle, Globe, ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AuthHeader() {
  return (
    <header className="absolute top-0 left-0 w-full flex items-center justify-between p-6 md:px-10 z-50">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="size-8 bg-codeo-green rounded-lg flex items-center justify-center shadow-lg shadow-codeo-green/20 group-hover:scale-105 transition-transform">
          <span className="text-white font-black text-xl">C</span>
        </div>
        <span className="text-xl font-black tracking-tighter text-slate-900">
          CODEO<span className="text-codeo-green">.</span>
        </span>
      </Link>

      <div className="flex items-center gap-4 md:gap-8">
        <Link href="/docs" className="flex items-center gap-2 text-slate-500 hover:text-codeo-green transition-colors group">
          <HelpCircle className="size-4 text-slate-400 group-hover:text-codeo-green" />
          <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest">Support</span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 text-slate-500 outline-none">
            <Globe className="size-4 text-slate-400" />
            <span className="text-[10px] font-black uppercase tracking-widest">EN</span>
            <ChevronDown className="size-3 text-slate-300" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl border-slate-100 shadow-xl font-sans">
            <DropdownMenuItem className="text-xs font-bold cursor-pointer">Français (FR)</DropdownMenuItem>
            <DropdownMenuItem className="text-xs font-bold cursor-pointer">English (US)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}