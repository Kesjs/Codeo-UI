"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-codeo-green/20 animate-bounce"></div>
        <span className="text-codeo-green font-medium">Chargement...</span>
      </div>
    </div>
  );
}
