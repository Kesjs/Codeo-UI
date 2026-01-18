'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UploadCloud, X, CheckCircle } from 'lucide-react'
import Tooltip from './ui/Tooltip'

interface DropzoneProps {
  onFileSelected: (file: File) => void;
  isProcessing?: boolean;
  setIsProcessing?: (processing: boolean) => void;
  showOnboarding?: boolean;
}

export default function Dropzone({ 
  onFileSelected, 
  isProcessing = false, 
  setIsProcessing = () => {}, 
  showOnboarding = false 
}: DropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }, [])

  const processFile = useCallback((file: File) => {
    setUploadedFile(file)
    onFileSelected(file)
    
    if (setIsProcessing) {
      setIsProcessing(true)
      
      // Simuler un traitement
      let progress = 0
      const interval = setInterval(() => {
        progress += 5
        setProgress(Math.min(progress, 100))
        
        if (progress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            if (setIsProcessing) {
              setIsProcessing(false)
            }
          }, 500)
        }
      }, 100)
    }
  }, [onFileSelected, setIsProcessing])

  const handleFileUpload = (file: File) => {
    if (file.type.startsWith('image/')) {
      processFile(file)
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
    if (setIsProcessing) {
      setIsProcessing(false)
    }
    setProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div id="dropzone" className="relative max-w-2xl mx-auto">
      {/* Onboarding Tooltip */}
      <AnimatePresence>
        {showOnboarding && !uploadedFile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10"
          >
            <Tooltip text="C'est ici que tout commence ! Glissez votre design pour une analyse V-AST instantanée." />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dropzone Area */}
      <motion.div
        whileHover={{ scale: isProcessing ? 1 : 1.02 }}
        whileTap={{ scale: isProcessing ? 1 : 0.98 }}
        className={`
          relative bg-white rounded-2xl border-2 border-dashed transition-all duration-300
          ${isDragOver 
            ? 'border-codeo-green bg-codeo-green/5' 
            : isProcessing 
              ? 'border-codeo-green bg-codeo-green/5' 
              : 'border-slate-300 hover:border-codeo-green hover:bg-slate-50'
          }
          ${isProcessing ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!isProcessing ? () => fileInputRef.current?.click() : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isProcessing}
        />

        <div className="p-12">
          {!uploadedFile ? (
            <div className="text-center">
              <motion.div
                animate={isDragOver ? { scale: 1.1 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <UploadCloud className="h-16 w-16 mx-auto text-slate-400 mb-4" />
              </motion.div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Déposez votre capture d'écran UI ici
              </h3>
              <p className="text-slate-600 mb-4">
                ou cliquez pour parcourir
              </p>
              <p className="text-xs text-slate-400">
                Moteur V-AST v1.0.0 prêt
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* File Preview */}
              <div className="relative">
                <img
                  src={URL.createObjectURL(uploadedFile)}
                  alt="Uploaded preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                
                {/* Scanner Animation */}
                {isProcessing && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-codeo-green/20 to-transparent"
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{ height: '2px' }}
                  />
                )}

                {/* Remove Button */}
                {!isProcessing && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile()
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Processing Status */}
              <div className="text-center">
                {isProcessing ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-700">
                      Analyse V-AST v1.0.0 en cours...
                    </p>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-codeo-green"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p className="text-xs text-slate-500">{progress}%</p>
                  </div>
                ) : progress === 100 ? (
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Analyse terminée !</span>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
