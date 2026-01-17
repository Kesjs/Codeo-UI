"use client";

import { CodeoLoader } from "@/components/CodeoLoader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="text-center">
        <CodeoLoader className="scale-150" />
        
      </div>
    </div>
  );
}
