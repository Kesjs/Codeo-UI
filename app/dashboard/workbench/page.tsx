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
  ChevronRight,
  Lock,
  FileCode2,
  Zap as ZapIcon,
  ChevronDown,
  Terminal,
  BarChart3,
  Bug,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  useTypeScript: boolean;
  componentName: string;
  includeComments: boolean;
  separateFiles: boolean;
  lazyLoading: boolean;
  bundleOptimization: boolean;
}

interface GenerationLog {
  id: string;
  message: string;
  timestamp: Date;
  type: "info" | "success" | "warning" | "error";
}

interface ConsoleLog {
  id: string;
  message: string;
  type: "info" | "success" | "warning" | "debug";
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
      separateFiles: false,
      performance: false,
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
      separateFiles: true,
      performance: false,
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
      separateFiles: true,
      performance: true,
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
  const [generationStartTime, setGenerationStartTime] = useState<number | null>(null);
  const [generationTime, setGenerationTime] = useState<string>("0.0");
  const [currentLog, setCurrentLog] = useState<string>("");
  const [logs, setLogs] = useState<GenerationLog[]>([]);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(true);
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);
  const [consoleTab, setConsoleTab] = useState<"metrics" | "logs" | "debug">("metrics");

  const [workbenchConfig, setWorkbenchConfig] = useState<WorkbenchConfig>({
    framework: "react",
    styleEngine: "tailwind",
    enableAnimations: false,
    enableAccessibility: false,
    enableSecurity: false,
    enableDesignSystem: false,
    darkMode: false,
    mobile: false,
    useTypeScript: false,
    componentName: "GeneratedComponent",
    includeComments: true,
    separateFiles: false,
    lazyLoading: false,
    bundleOptimization: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of console logs
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleLogs]);

  // Reset config when plan changes
  useEffect(() => {
    const defaultFramework = config.frameworks[0];
    const defaultStyleEngine = config.styleEngines[0];

    setWorkbenchConfig((prev) => ({
      ...prev,
      framework: config.frameworks.includes(prev.framework) ? prev.framework : defaultFramework,
      styleEngine: config.styleEngines.includes(prev.styleEngine) ? prev.styleEngine : defaultStyleEngine,
    }));
  }, [activePlan, config]);

  // Initial console logs
  useEffect(() => {
    setConsoleLogs([
      { id: "init-1", message: "[INFO] V-AST Engine initialized", type: "info" },
      { id: "init-2", message: "[DEBUG] Ready for image upload", type: "debug" },
    ]);
  }, []);

  // Simulated generation with dynamic logs
  const generateCode = async () => {
    if (!uploadedImage) {
      toast.error("Veuillez d'abord uploader une image");
      return;
    }

    setIsGenerating(true);
    setGenerationStartTime(Date.now());
    setLogs([]);
    setGeneratedCode("");
    setConsoleLogs((prev) => [...prev, { id: Date.now().toString(), message: "[INFO] Génération démarrée", type: "info" }]);

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

      setConsoleLogs((prev) => [
        ...prev,
        { id: log.id, message: `[${log.type.toUpperCase()}] ${log.message}`, type: log.type as ConsoleLog["type"] },
      ]);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const endTime = Date.now();
    const timeTaken = ((endTime - (generationStartTime || endTime)) / 1000).toFixed(1);
    setGenerationTime(timeTaken);

    const mockCode = `// Composant généré avec ${config.engine}
import React from 'react'
${workbenchConfig.enableAnimations ? "import { motion } from 'framer-motion'\n" : ""}

${workbenchConfig.useTypeScript ? `const ${workbenchConfig.componentName}: React.FC = () => {` : `export default function ${workbenchConfig.componentName}() {`}
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Composant généré pour vous</h2>
      <p className="text-gray-600">
        Framework: ${workbenchConfig.framework} | Style: ${workbenchConfig.styleEngine}
        ${workbenchConfig.enableAnimations ? " | Animations: Oui" : ""}
        ${workbenchConfig.enableAccessibility ? " | Accessibilité: Oui" : ""}
        ${workbenchConfig.enableSecurity ? " | Sécurité: Oui" : ""}
        ${workbenchConfig.lazyLoading ? " | Lazy Loading: Oui" : ""}
      </p>
    </div>
  )
}
${workbenchConfig.useTypeScript ? "}" : "}"}

${workbenchConfig.separateFiles ? "// CSS séparé simulé...\n/* styles.css */\n.component { ... }" : ""}
`;

    const linesOfCode = mockCode.split("\n").length;
    const bundleSize = (mockCode.length / 1024).toFixed(1);

    setGeneratedCode(mockCode);
    setConsoleLogs((prev) => [
      ...prev,
      { id: Date.now().toString(), message: "[SUCCESS] Code généré avec succès", type: "success" },
      { id: (Date.now() + 1).toString(), message: `[DEBUG] Temps: ${timeTaken}s | Lignes: ${linesOfCode} | Bundle: ~${bundleSize}KB`, type: "debug" },
    ]);

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
        setConsoleLogs((prev) => [...prev, { id: Date.now().toString(), message: "[INFO] Image uploadée et analysée", type: "info" }]);
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
    a.download = `${workbenchConfig.componentName}.tsx`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Fichier téléchargé !");
  };

  const linesOfCode = generatedCode ? generatedCode.split("\n").length : 0;
  const bundleSize = generatedCode ? (generatedCode.length / 1024).toFixed(1) : "0";

  const clearConsoleLogs = () => {
    setConsoleLogs([]);
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsConfigOpen(!isConfigOpen)}
              >
                <ChevronRight className={`w-4 h-4 transition-transform ${isConfigOpen ? "rotate-180" : ""}`} />
                Config
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsConsoleOpen(!isConsoleOpen)}
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${isConsoleOpen ? "rotate-180" : ""}`} />
                Console
              </Button>

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
                          setConsoleLogs([]);
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

        {/* Main area - Input & Output take full available height */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className={`flex-1 grid overflow-hidden ${isConfigOpen ? "grid-cols-[1fr_1fr_320px]" : "grid-cols-[1fr_1fr]"}`}>
            {/* Input Panel */}
            <div className="border-r border-slate-200 dark:border-slate-700 flex flex-col">
              <div className="p-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Input</h3>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </div>

              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
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

                {isGenerating && (
                  <div className="p-4 bg-slate-900 border-t border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-codeo-green animate-pulse" />
                      <span className="text-sm font-medium text-codeo-green">Génération en cours...</span>
                    </div>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
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
            </div>

            {/* Output Panel */}
            <div className={`border-r border-slate-200 dark:border-slate-700 flex flex-col ${!isConfigOpen && "border-r-0"}`}>
              <div className="p-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
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

              <div className="flex-1 bg-slate-900 overflow-hidden">
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
                            {workbenchConfig.lazyLoading && " | Lazy Loading: Oui"}
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
                    <motion.div key="empty" className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <Code2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400">Le code généré apparaîtra ici</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Config Sidebar - Collapsible with full scrollable accordions */}
            <div
              className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-l border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 ease-in-out overflow-hidden flex flex-col ${
                isConfigOpen ? "w-80" : "w-0"
              }`}
            >
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Configuration Avancée</h3>

                <div className="flex-1 overflow-y-auto pr-2">
                  <Accordion type="multiple" defaultValue={["architecture"]} className="space-y-4">
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
                              {config.options.enableAnimations ? (
                                workbenchConfig.enableAnimations ? "Activé" : "Désactivé"
                              ) : (
                                <>
                                  <Lock className="w-3 h-3 mr-1" /> Pro
                                </>
                              )}
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
                              {config.options.enableAccessibility ? (
                                workbenchConfig.enableAccessibility ? "Activé" : "Désactivé"
                              ) : (
                                <>
                                  <Lock className="w-3 h-3 mr-1" /> Pro
                                </>
                              )}
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
                              {config.options.enableSecurity ? (
                                workbenchConfig.enableSecurity ? "Activé" : "Désactivé"
                              ) : (
                                <>
                                  <Lock className="w-3 h-3 mr-1" /> Business
                                </>
                              )}
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
                              {config.options.enableDesignSystem ? (
                                workbenchConfig.enableDesignSystem ? "Activé" : "Désactivé"
                              ) : (
                                <>
                                  <Lock className="w-3 h-3 mr-1" /> Business
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Export & Code */}
                    <AccordionItem value="export" className="border border-slate-200 dark:border-slate-700 rounded-lg">
                      <AccordionTrigger className="px-4 py-3 hover:no-underline">
                        <div className="flex items-center gap-2">
                          <FileCode2 className="w-4 h-4" />
                          <span className="font-medium">Export & Code</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm text-slate-600 dark:text-slate-400">TypeScript</label>
                          <Button
                            variant={workbenchConfig.useTypeScript ? "default" : "outline"}
                            size="sm"
                            onClick={() => setWorkbenchConfig((prev) => ({ ...prev, useTypeScript: !prev.useTypeScript }))}
                          >
                            {workbenchConfig.useTypeScript ? "Activé" : "Désactivé"}
                          </Button>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Nom du composant</label>
                          <Input
                            value={workbenchConfig.componentName}
                            onChange={(e) => setWorkbenchConfig((prev) => ({ ...prev, componentName: e.target.value }))}
                            placeholder="GeneratedComponent"
                            className="h-8"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <label className="text-sm text-slate-600 dark:text-slate-400">Commentaires explicatifs</label>
                          <Button
                            variant={workbenchConfig.includeComments ? "default" : "outline"}
                            size="sm"
                            onClick={() => setWorkbenchConfig((prev) => ({ ...prev, includeComments: !prev.includeComments }))}
                          >
                            {workbenchConfig.includeComments ? "Activé" : "Désactivé"}
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <label className="text-sm text-slate-600 dark:text-slate-400">Fichiers séparés (CSS/JS)</label>
                          <Button
                            variant={workbenchConfig.separateFiles ? "default" : "outline"}
                            size="sm"
                            onClick={() => setWorkbenchConfig((prev) => ({ ...prev, separateFiles: !prev.separateFiles }))}
                            disabled={activePlan === "starter"}
                          >
                            {activePlan === "starter" ? (
                              <>
                                <Lock className="w-3 h-3 mr-1" /> Pro+
                              </>
                            ) : workbenchConfig.separateFiles ? (
                              "Activé"
                            ) : (
                              "Désactivé"
                            )}
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Performance (Business only) */}
                    {config.options.performance && (
                      <AccordionItem value="performance" className="border border-slate-200 dark:border-slate-700 rounded-lg">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                          <div className="flex items-center gap-2">
                            <ZapIcon className="w-4 h-4" />
                            <span className="font-medium">Performance</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 space-y-3">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="text-sm text-slate-600 dark:text-slate-400">Lazy Loading images</label>
                              <Button
                                variant={workbenchConfig.lazyLoading ? "default" : "outline"}
                                size="sm"
                                onClick={() => setWorkbenchConfig((prev) => ({ ...prev, lazyLoading: !prev.lazyLoading }))}
                              >
                                {workbenchConfig.lazyLoading ? "Activé" : "Désactivé"}
                              </Button>
                            </div>

                            <div className="flex items-center justify-between">
                              <label className="text-sm text-slate-600 dark:text-slate-400">Optimisation bundle</label>
                              <Button
                                variant={workbenchConfig.bundleOptimization ? "default" : "outline"}
                                size="sm"
                                onClick={() => setWorkbenchConfig((prev) => ({ ...prev, bundleOptimization: !prev.bundleOptimization }))}
                              >
                                {workbenchConfig.bundleOptimization ? "Activé" : "Désactivé"}
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
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
          </div>

          {/* Enhanced Console */}
          <div className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 ${isConsoleOpen ? "h-64" : "h-12"} overflow-hidden`}>
            <Tabs 
              value={consoleTab} 
              onValueChange={(v) => setConsoleTab(v as typeof consoleTab)} 
              className="h-full flex flex-col"
            >
              <div className="p-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="metrics"><BarChart3 className="w-4 h-4 mr-2" />Metrics</TabsTrigger>
                  <TabsTrigger value="logs"><Terminal className="w-4 h-4 mr-2" />Logs</TabsTrigger>
                  {config.options.performance && <TabsTrigger value="debug"><Bug className="w-4 h-4 mr-2" />Debug</TabsTrigger>}
                </TabsList>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={clearConsoleLogs}>
                    Clear
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-hidden">
                <TabsContent value="metrics" className="h-full p-4 m-0">
                  <div className="grid grid-cols-4 gap-3">
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3">
                      <div className="text-xs text-slate-500 dark:text-slate-400">Temps de génération</div>
                      <div className="text-lg font-medium text-slate-900 dark:text-white">{generationTime}s</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3">
                      <div className="text-xs text-slate-500 dark:text-slate-400">Lignes de code</div>
                      <div className="text-lg font-medium text-slate-900 dark:text-white">{linesOfCode}</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3">
                      <div className="text-xs text-slate-500 dark:text-slate-400">Bundle size (gzipped)</div>
                      <div className="text-lg font-medium text-codeo-green">~{bundleSize}KB</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3">
                      <div className="text-xs text-slate-500 dark:text-slate-400">Score SEO / Accessibilité</div>
                      <div className="text-lg font-medium text-slate-900 dark:text-white">{workbenchConfig.enableAccessibility ? "98/100" : "85/100"}</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="logs" className="h-full p-4 m-0 bg-slate-900 rounded-t-lg overflow-y-auto">
                  <div className="space-y-1 text-xs font-mono">
                    {consoleLogs.map((log) => (
                      <div
                        key={log.id}
                        className={`${
                          log.type === "success" ? "text-codeo-green" :
                          log.type === "warning" ? "text-amber-500" :
                          log.type === "debug" ? "text-slate-400" :
                          "text-slate-300"
                        }`}
                      >
                        {log.message}
                      </div>
                    ))}
                    <div ref={consoleEndRef} />
                  </div>
                </TabsContent>

                {config.options.performance && (
                  <TabsContent value="debug" className="h-full p-4 m-0 bg-slate-900 rounded-t-lg overflow-y-auto">
                    <div className="space-y-1 text-xs font-mono text-purple-400">
                      <div>[GPU] Utilisation: 87%</div>
                      <div>[MEMORY] Tokens consommés: ~2800</div>
                      <div>[SECURITY] Scan complet effectué</div>
                      <div>[DESIGN SYSTEM] 12 tokens synchronisés</div>
                    </div>
                  </TabsContent>
                )}
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}