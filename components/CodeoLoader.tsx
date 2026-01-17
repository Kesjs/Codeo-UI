"use client";

import { cn } from "@/lib/utils";

export function CodeoLoader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-end justify-center gap-4 h-40", className)}>
      {/* Conteneur "U" - Plus haut et plus étroit */}
      <div className="relative w-28 h-28 border-b-8 border-x-8 border-zinc-800 rounded-b-[50px] overflow-hidden flex justify-center">
        {/* Le "O" vert - Animation verticale synchronisée */}
        <div 
          className="absolute w-6 h-6 rounded-full bg-codeo-green z-10"
          style={{
            animation: 'ballMove 5s ease-in-out infinite',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            willChange: 'transform, opacity'
          }}
        />
      </div>

      {/* Barre verticale de droite (L'accent) */}
      <div 
        className="w-2.5 rounded-full bg-codeo-green origin-bottom"
        style={{
          animation: 'barPulse 4s ease-in-out infinite',
          height: '20%',
          marginTop: 'auto',
          willChange: 'height, opacity'
        }}
      />
    </div>
  );
}