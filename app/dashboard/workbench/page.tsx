"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import {
  Sparkles,
  Zap,
  Upload,
  Download,
  Copy,
  Settings,
  Monitor,
  Code2,
  Palette,
  ShieldCheck,
  Cpu,
  Activity,
  Clock,
  Loader2,
  Eye,
  Moon,
  Smartphone,
  GitBranch,
  Database,
  Globe,
  Atom,
  Triangle,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePlan } from "../layout";

// ── Types ────────────────────────────────────────────────
type PlanType = "starter" | "pro" | "business";
type FrameworkType = "react" | "nextjs" | "vue" | "html" | "tailwind";
type StyleEngine = "tailwind" | "css-modules" | "styled-components";

interface WorkbenchConfig {
  framework: FrameworkType;
  styleEngine: StyleEngine;
  enableAnimations: boolean;
  enableAccessibility: boolean;
  enableSecurity: boolean;
  enableDesignSystem: boolean;
  darkMode: boolean;
  mobile: boolean;
}

interface GenerationLog {
  id: string;
  message: string;
  timestamp: Date;
  type: "info" | "success" | "warning" | "error";
}

// ── Configurations par plan ──────────────────────────────
const planConfigs = {
  starter: {
    name: "Starter",
    engine: "V-AST Standard",
    status: "Traitement classique",
    statusColor: "text-amber-600",
    frameworks: ["react", "html"] as FrameworkType[],
    styleEngines: ["tailwind"] as StyleEngine[],
    options: {
      enableAnimations: false,
      enableAccessibility: false,
      enableSecurity: false,
      enableDesignSystem: false,
    },
    logs: [
      " Analyse des formes géométriques...",
      " Détection des conteneurs principaux...",
      " Extraction de la palette de couleurs...",
      " Génération HTML sémantique...",
      " Application des styles Tailwind...",
      "✅ Finalisation du composant...",
    ],
  },
  pro: {
    name: "Pro",
    engine: "V-AST Turbo v4.2",
    status: "Priorité GPU Active",
    statusColor: "text-codeo-green",
    frameworks: ["react", "nextjs", "vue", "html"] as FrameworkType[],
    styleEngines: ["tailwind", "css-modules", "styled-components"] as StyleEngine[],
    options: {
      enableAnimations: true,
      enableAccessibility: true,
      enableSecurity: false,
      enableDesignSystem: false,
    },
    logs: [
      "🧠 Analyse deep learning des patterns UI...",
      "🎨 Extraction des tokens design...",
      "⚡ Optimisation Tailwind v4...",
      "🔧 Injection des hooks React...",
      "🎭 Ajout des micro-interactions...",
      "📊 Optimisation des performances...",
      "✨ Finalisation avec animations...",
    ],
  },
  business: {
    name: "Business",
    engine: "V-AST Enterprise Custom",
    status: "Instance Dédiée - Latence Zéro",
    statusColor: "text-purple-600",
    frameworks: ["react", "nextjs", "vue", "html"] as FrameworkType[],
    styleEngines: ["tailwind", "css-modules", "styled-components"] as StyleEngine[],
    options: {
      enableAnimations: true,
      enableAccessibility: true,
      enableSecurity: true,
      enableDesignSystem: true,
    },
    logs: [
      "Analyse des patterns entreprise...",
      "Vérification conformité design system...",
      "Calcul structure sémantique accessible...",
      "Scan de sécurité intégré...",
      "Synchronisation tokens design...",
      "Génération optimisée GPU...",
      "Injection hooks React avancés...",
      "Validation SEO et performance...",
      "Finalisation composant enterprise...",
    ],
  },
};

// ── Framework Icons ────────────────────────────────────────
const getFrameworkIcon = (framework: FrameworkType) => {
  const iconClass = "w-4 h-4";
  switch (framework) {
    case "react":
      return <Atom className={`${iconClass} text-blue-500`} />;
    case "nextjs":
      return <Globe className={`${iconClass} text-gray-900 dark:text-gray-100`} />;
    case "vue":
      return <Triangle className={`${iconClass} text-green-500`} />;
    case "html":
      return <Code2 className={`${iconClass} text-orange-500`} />;
    case "tailwind":
      return <Palette className={`${iconClass} text-cyan-500`} />;
    default:
      return <Code2 className={`${iconClass} text-gray-400`} />;
  }
};

export default function WorkbenchPage() {
  const { activePlan, simulatedPlan, setSimulatedPlan, isDevMode } = usePlan();
  const config = planConfigs[activePlan];

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentLog, setCurrentLog] = useState<string>("");
  const [logs, setLogs] = useState<GenerationLog[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const [workbenchConfig, setWorkbenchConfig] = useState<WorkbenchConfig>({
    framework: "react",
    styleEngine: "tailwind",
    enableAnimations: false,
    enableAccessibility: false,
    enableSecurity: false,
    enableDesignSystem: false,
    darkMode: false,
    mobile: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset config quand le plan change (dev ou réel)
  useEffect(() => {
    const defaultFramework = config.frameworks[0];
    const defaultStyleEngine = config.styleEngines[0];

    setWorkbenchConfig((prev) => ({
      ...prev,
      framework: config.frameworks.includes(prev.framework) ? prev.framework : defaultFramework,
      styleEngine: config.styleEngines.includes(prev.styleEngine) ? prev.styleEngine : defaultStyleEngine,
    }));
  }, [activePlan, config]);

  // Génération simulée
  const generateCode = async () => {
    if (!uploadedImage) {
      toast.error("Veuillez d'abord uploader une image");
      return;
    }

    setIsGenerating(true);
    setLogs([]);
    setGeneratedCode("");

    for (let i = 0; i < config.logs.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const log: GenerationLog = {
        id: `${Date.now()}-${i}`,
        message: config.logs[i],
        timestamp: new Date(),
        type: i === config.logs.length - 1 ? "success" : "info",
      };
      setLogs((prev) => [...prev, log]);
      setCurrentLog(config.logs[i]);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const mockCode = `// Composant généré avec ${config.engine}
import React from 'react'
${workbenchConfig.enableAnimations ? "import { motion } from 'framer-motion'" : ""}

export default function GeneratedComponent() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Composant généré pour vous</h2>
      <p className="text-gray-600">
        Framework: ${workbenchConfig.framework} | 
        Style: ${workbenchConfig.styleEngine}
        ${workbenchConfig.enableAnimations ? " | Animations: Oui" : ""}
        ${workbenchConfig.enableAccessibility ? " | Accessibilité: Oui" : ""}
        ${workbenchConfig.enableSecurity ? " | Sécurité: Oui" : ""}
      </p>
    </div>
  )
}`;

    setGeneratedCode(mockCode);
    setIsGenerating(false);
    setCurrentLog("");
    toast.success("Composant généré avec succès !");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        toast.success("Image uploadée avec succès !");
      };
      reader.readAsDataURL(file);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    toast.success("Code copié dans le presse-papiers !");
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: "text/typescript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-component.tsx";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Fichier téléchargé !");
  };

  return (
    <TooltipProvider>
      <Toaster position="top-right" richColors closeButton duration={3000} />
      <div className="h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
        {/* Dev toggle */}
        {isDevMode && (
          <div className="fixed top-16 right-6 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-lg px-4 py-2.5">
            <div className="flex items-center gap-3 text-sm font-medium">
              <Settings className="w-4 h-4 text-slate-500" />
              <Select value={simulatedPlan} onValueChange={(v) => setSimulatedPlan(v as PlanType)}>
                <SelectTrigger className="w-40 h-8 border-none focus:ring-0 bg-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">Starter</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-4 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Workbench</h1>
              <div className="flex items-center gap-2 mt-1">
                <Cpu className="w-4 h-4 text-codeo-green" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{config.engine}</span>
                <span className={`text-sm font-medium ${config.statusColor}`}>• {config.status}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {generatedCode && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Zap className="w-4 h-4 mr-2" />
                      Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <div className="px-2 py-1.5 text-sm font-medium">Actions Rapides:</div>
                    <div className="px-2 py-1 space-y-1">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Database className="w-4 h-4 mr-2" /> Sauvegarder
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="w-full justify-start">
                            <Download className="w-4 h-4 mr-2" /> Exporter
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right">
                          <Button variant="ghost" size="sm" className="w-full justify-start">
                            <Code2 className="w-4 h-4 mr-2" /> .tsx
                          </Button>
                          <Button variant="ghost" size="sm" className="w-full justify-start">
                            <Globe className="w-4 h-4 mr-2" /> .html
                          </Button>
                          <Button variant="ghost" size="sm" className="w-full justify-start">
                            <Palette className="w-4 h-4 mr-2" /> .vue
                          </Button>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <GitBranch className="w-4 h-4 mr-2" /> Partager
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Copy className="w-4 h-4 mr-2" /> Copier lien
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Star className="w-4 h-4 mr-2" /> Favoris
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => {
                          setGeneratedCode("");
                          setUploadedImage(null);
                          setLogs([]);
                        }}
                      >
                        <Sparkles className="w-4 h-4 mr-2" /> Nouveau
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <Button variant="outline" size="sm" onClick={copyCode}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Code
              </Button>
              <Button variant="outline" size="sm" onClick={downloadCode}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                onClick={generateCode}
                disabled={!uploadedImage || isGenerating}
                className="bg-codeo-green hover:bg-codeo-green/90"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Génération...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" /> Générer
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Zone principale : Input | Output | Config + Console en bas */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Panneaux principaux avec CSS Grid (plus stable que le double flex) */}
          <div className="flex-1 grid grid-cols-[1fr_1fr_320px] overflow-hidden">
            {/* Input Panel */}
            <div className="border-r border-slate-200 dark:border-slate-700 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Input</h3>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </div>

              <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center overflow-hidden">
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Uploaded" className="max-w-full max-h-full object-contain rounded-lg" />
                ) : (
                  <div className="text-center p-8">
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400 mb-2">Upload une image pour commencer</p>
                    <p className="text-sm text-slate-400">PNG, JPG, WebP jusqu'à 10MB</p>
                  </div>
                )}
              </div>

              {/* Logs génération */}
              {isGenerating && (
                <div className="mt-4 p-4 bg-slate-900 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-codeo-green animate-pulse" />
                    <span className="text-sm font-medium text-codeo-green">Génération en cours...</span>
                  </div>
                  <div className="space-y-1">
                    {logs.map((log) => (
                      <div key={log.id} className="flex items-center gap-2 text-xs text-slate-400">
                        <Clock className="w-3 h-3" />
                        <span>{log.message}</span>
                      </div>
                    ))}
                    {currentLog && (
                      <div className="flex items-center gap-2 text-xs text-codeo-green animate-pulse">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>{currentLog}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Output Panel */}
            <div className="border-r border-slate-200 dark:border-slate-700 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Output</h3>
                <div className="flex items-center gap-2">
                  <Button variant={showPreview ? "default" : "outline"} size="sm" onClick={() => setShowPreview(false)}>
                    <Code2 className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                  <Button variant={showPreview ? "outline" : "default"} size="sm" onClick={() => setShowPreview(true)}>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </div>

              <div className="flex-1 bg-slate-900 rounded-lg overflow-hidden">
                <AnimatePresence mode="wait">
                  {generatedCode ? (
                    showPreview ? (
                      <motion.div
                        key="preview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="p-6 h-full overflow-auto"
                      >
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                          <h2 className="text-2xl font-bold mb-4">Composant généré pour vous</h2>
                          <p className="text-gray-600">
                            Framework: {workbenchConfig.framework} | Style: {workbenchConfig.styleEngine}
                            {workbenchConfig.enableAnimations && " | Animations: Oui"}
                            {workbenchConfig.enableAccessibility && " | Accessibilité: Oui"}
                            {workbenchConfig.enableSecurity && " | Sécurité: Oui"}
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="code"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="p-6 h-full overflow-auto"
                      >
                        <pre className="text-sm text-slate-300">
                          <code>{generatedCode}</code>
                        </pre>
                      </motion.div>
                    )
                  ) : (
                    <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <Code2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400">Le code généré apparaîtra ici</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Config Sidebar */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl p-6 flex flex-col">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Configuration Avancée</h3>

              <Accordion type="multiple" defaultValue={["architecture"]} className="flex-1 space-y-4 overflow-y-auto">
                {/* Architecture */}
                <AccordionItem value="architecture" className="border border-slate-200 dark:border-slate-700 rounded-lg">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      <span className="font-medium">Architecture</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 space-y-3">
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Langage</label>
                      <Select
                        value={workbenchConfig.framework}
                        onValueChange={(v) => setWorkbenchConfig((prev) => ({ ...prev, framework: v as FrameworkType }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {config.frameworks.map((framework) => (
                            <SelectItem key={framework} value={framework}>
                              <div className="flex items-center gap-2">
                                {getFrameworkIcon(framework)}
                                <span className="capitalize">{framework}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Style Engine</label>
                      <Select
                        value={workbenchConfig.styleEngine}
                        onValueChange={(v) => setWorkbenchConfig((prev) => ({ ...prev, styleEngine: v as StyleEngine }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {config.styleEngines.map((engine) => (
                            <SelectItem key={engine} value={engine}>
                              <span className="capitalize">{engine.replace("-", " ")}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Raffinage */}
                <AccordionItem value="refinement" className="border border-slate-200 dark:border-slate-700 rounded-lg">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-medium">Raffinage</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 space-y-3">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-slate-600 dark:text-slate-400">Animations Framer Motion</label>
                        <Button
                          variant={workbenchConfig.enableAnimations ? "default" : "outline"}
                          size="sm"
                          onClick={() => setWorkbenchConfig((prev) => ({ ...prev, enableAnimations: !prev.enableAnimations }))}
                          disabled={!config.options.enableAnimations}
                        >
                          {config.options.enableAnimations ? (workbenchConfig.enableAnimations ? "Activé" : "Désactivé") : <>Pro</>}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm text-slate-600 dark:text-slate-400">Mode Sombre</label>
                        <Button
                          variant={workbenchConfig.darkMode ? "default" : "outline"}
                          size="sm"
                          onClick={() => setWorkbenchConfig((prev) => ({ ...prev, darkMode: !prev.darkMode }))}
                        >
                          {workbenchConfig.darkMode ? <Moon className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm text-slate-600 dark:text-slate-400">Version Mobile</label>
                        <Button
                          variant={workbenchConfig.mobile ? "default" : "outline"}
                          size="sm"
                          onClick={() => setWorkbenchConfig((prev) => ({ ...prev, mobile: !prev.mobile }))}
                        >
                          {workbenchConfig.mobile ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Qualité */}
                <AccordionItem value="quality" className="border border-slate-200 dark:border-slate-700 rounded-lg">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="font-medium">Qualité</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 space-y-3">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-slate-600 dark:text-slate-400">Accessibilité (ARIA)</label>
                        <Button
                          variant={workbenchConfig.enableAccessibility ? "default" : "outline"}
                          size="sm"
                          onClick={() => setWorkbenchConfig((prev) => ({ ...prev, enableAccessibility: !prev.enableAccessibility }))}
                          disabled={!config.options.enableAccessibility}
                        >
                          {config.options.enableAccessibility ? (workbenchConfig.enableAccessibility ? "Activé" : "Désactivé") : <>Pro</>}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm text-slate-600 dark:text-slate-400">Vérification Sécurité</label>
                        <Button
                          variant={workbenchConfig.enableSecurity ? "default" : "outline"}
                          size="sm"
                          onClick={() => setWorkbenchConfig((prev) => ({ ...prev, enableSecurity: !prev.enableSecurity }))}
                          disabled={!config.options.enableSecurity}
                        >
                          {config.options.enableSecurity ? (workbenchConfig.enableSecurity ? "Activé" : "Désactivé") : <>Business</>}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm text-slate-600 dark:text-slate-400">Sync Design System</label>
                        <Button
                          variant={workbenchConfig.enableDesignSystem ? "default" : "outline"}
                          size="sm"
                          onClick={() => setWorkbenchConfig((prev) => ({ ...prev, enableDesignSystem: !prev.enableDesignSystem }))}
                          disabled={!config.options.enableDesignSystem}
                        >
                          {config.options.enableDesignSystem ? (workbenchConfig.enableDesignSystem ? "Activé" : "Désactivé") : <>Business</>}
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="p-4 bg-slate-50/70 dark:bg-slate-900/70 backdrop-blur rounded-lg">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Votre plan: {config.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activePlan === "starter" && "Accès aux fonctionnalités de base"}
                    {activePlan === "pro" && "Performances GPU et options avancées"}
                    {activePlan === "business" && "Sécurité entreprise et Design System"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Console pleine largeur en bas */}
          <div className="h-32 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50">
            <div className="h-full p-4">
              <div className="grid grid-cols-4 gap-3 mb-3">
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-2">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Temps de génération</div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">2.3s</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-2">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Lignes de code</div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">127</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-2">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Optimisation</div>
                  <div className="text-sm font-medium text-codeo-green">98%</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-2">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Score SEO</div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">95/100</div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-lg p-3 h-16 overflow-y-auto">
                <div className="space-y-1 text-xs font-mono">
                  <div className="text-codeo-green">[INFO] V-AST Engine v4.2 initialized</div>
                  <div className="text-slate-400">[DEBUG] Image resolution: 1920x1080</div>
                  <div className="text-slate-400">[DEBUG] Color palette: 16 colors detected</div>
                  <div className="text-amber-500">[WARN] Large component detected - consider splitting</div>
                  <div className="text-codeo-green">[SUCCESS] React hooks optimized</div>
                  <div className="text-slate-400">[DEBUG] Bundle size: ~2.3KB gzipped</div>
                  <div className="text-codeo-green">[SUCCESS] ARIA labels generated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}