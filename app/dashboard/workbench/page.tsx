"use client";

// Import de React avec les types
import * as React from 'react';

// Types d'événements personnalisés
type InputChangeEvent = React.ChangeEvent<HTMLInputElement> & {
  target: {
    files?: FileList;
    value?: string;
    [key: string]: any;
  };
};

type DivDragEvent = React.DragEvent<HTMLDivElement> & {
  dataTransfer: {
    files: FileList;
    [key: string]: any;
  };
  [key: string]: any;
};

// Alias pour les hooks React
const {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback
} = React;
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import {
  Sparkles,
  Zap,
  Upload,
  Download,
  Copy,
  Play,
  Settings,
  Monitor,
  Code2,
  Palette,
  ShieldCheck,
  Shield,
  Crown,
  Cpu,
  Activity,
  Clock,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  X,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
  Moon,
  Smartphone,
  GitBranch,
  Database,
  Server,
  Globe,
  Atom,
  Triangle,
  Square,
  Type,
  Users,
  BarChart3,
  Cloud,
  Lock,
  Star,
  FileCode2,
  Zap as ZapIcon,
  Bug,
  Terminal
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { usePlan } from '../layout'
import dynamic from 'next/dynamic'

// Lazy load Monaco Editor pour améliorer les performances
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-slate-400" />
        <p className="text-sm text-slate-400">Chargement de l'éditeur...</p>
      </div>
    </div>
  )
})

// ── Types ────────────────────────────────────────────────
type PlanType = "starter" | "pro" | "business";
type FrameworkType = "react" | "nextjs" | "vue" | "html" | "tailwind";
type StyleEngine = "tailwind" | "css-modules" | "styled-components";

interface WorkbenchConfig {
  framework: FrameworkType
  styleEngine: StyleEngine
  enableAnimations: boolean
  enableAccessibility: boolean
  enableSecurity: boolean
  enableDesignSystem: boolean
  darkMode: boolean
  mobile: boolean
  seo: boolean
  typescript: boolean
  ssr: boolean
  multiFramework: boolean
  analytics: boolean
  teamCollaboration: boolean
  advancedAnalytics: boolean
  cloudDeployment: boolean
  endToEndEncryption: boolean
  useTypeScript: boolean
  componentName: string
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
  // S'assurer que activePlan est une clé valide de planConfigs
  const config = activePlan in planConfigs 
    ? planConfigs[activePlan as keyof typeof planConfigs]
    : planConfigs.starter; // Valeur par défaut

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof planConfigs>("starter");
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStartTime, setGenerationStartTime] = useState<number | null>(null);
  const [generationTime, setGenerationTime] = useState<string>("0.0");
  const [currentLog, setCurrentLog] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [logs, setLogs] = useState<GenerationLog[]>([]);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(true);
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);
  const [consoleTab, setConsoleTab] = useState<"metrics" | "logs" | "debug">("metrics");

  const [generationProgress, setGenerationProgress] = useState(0);
  const [isConfigPanelCollapsed, setIsConfigPanelCollapsed] = useState(false);
  const [workbenchConfig, setWorkbenchConfig] = useState<WorkbenchConfig>({
    framework: "react",
    styleEngine: "tailwind",
    enableAnimations: false,
    enableAccessibility: false,
    enableSecurity: false,
    enableDesignSystem: false,
    darkMode: false,
    mobile: false,
    seo: false,
    typescript: false,
    ssr: false,
    multiFramework: false,
    analytics: false,
    teamCollaboration: false,
    advancedAnalytics: false,
    cloudDeployment: false,
    endToEndEncryption: false,
    useTypeScript: false,
    componentName: "",
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const consoleEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom of console logs
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleLogs]);

  // Reset config when plan changes
  useEffect(() => {
    const defaultFramework = config.frameworks[0];
    const defaultStyleEngine = config.styleEngines[0];

    setWorkbenchConfig((prev: WorkbenchConfig) => ({
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

    setIsGenerating(true)
    setLogs([])
    setGeneratedCode('')
    setGenerationProgress(0)

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

    const componentDeclaration = workbenchConfig.useTypeScript
      ? `const ${workbenchConfig.componentName}: React.FC = () => {`
      : `export default function ${workbenchConfig.componentName}() {`;

    const mockCode = `// Composant généré avec ${config.engine}
import React from 'react'
${workbenchConfig.enableAnimations ? "import { motion } from 'framer-motion'\n" : ""}

${componentDeclaration}
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Composant généré pour vous</h2>
      <p className="text-gray-600">
        Framework: ${workbenchConfig.framework} | Style: ${workbenchConfig.styleEngine}
        ${workbenchConfig.enableAnimations ? " | Animations: Oui" : ""}
        ${workbenchConfig.enableAccessibility ? " | Accessibilité: Oui" : ""}
        ${workbenchConfig.enableSecurity ? " | Sécurité: Oui" : ""}
        ${workbenchConfig.enableDesignSystem ? " | Design System: Oui" : ""}
        ${workbenchConfig.darkMode ? " | Mode sombre: Oui" : ""}
        ${workbenchConfig.mobile ? " | Mobile: Oui" : ""}
        ${workbenchConfig.seo ? " | SEO: Oui" : ""}
        ${workbenchConfig.typescript ? " | TypeScript: Oui" : ""}
        ${workbenchConfig.ssr ? " | SSR: Oui" : ""}
        ${workbenchConfig.multiFramework ? " | Multi-framework: Oui" : ""}
        ${workbenchConfig.analytics ? " | Analytics: Oui" : ""}
        ${workbenchConfig.teamCollaboration ? " | Collaboration: Oui" : ""}
        ${workbenchConfig.advancedAnalytics ? " | Analytics avancés: Oui" : ""}
        ${workbenchConfig.cloudDeployment ? " | Déploiement cloud: Oui" : ""}
        ${workbenchConfig.endToEndEncryption ? " | Chiffrement: Oui" : ""}
      </p>
      <div className="mt-4">
        <p className="text-sm text-gray-500">Généré avec Codeo UI - V-AST Engine</p>
      </div>
    </div>
  )
}`;

    setGeneratedCode(mockCode)
    setGenerationProgress(100)
    setIsGenerating(false)
    setCurrentLog('')
    toast.success('Composant généré avec succès !')
  }

  // Upload d'image
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        toast.success("Image uploadée avec succès !");
        setConsoleLogs((prev) => [...prev, { id: Date.now().toString(), message: "[INFO] Image uploadée et analysée", type: "info" }]);
      };
      reader.readAsDataURL(file);
    }
  }

  // Gestion du drag & drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    
    if (!files || files.length === 0) {
      toast.error('Aucun fichier trouvé');
      return;
    }
    
    // Convertir FileList en tableau et trouver la première image
    const filesArray = Array.from(files);
    const imageFile = filesArray.find((file) => {
      const fileType = file.type || '';
      return fileType.startsWith('image/');
    });

    if (imageFile) {
      const reader = new FileReader();
      
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setUploadedImage(e.target.result as string);
          toast.success('Image déposée avec succès !');
        }
      };
      
      reader.onerror = () => {
        toast.error('Erreur lors de la lecture du fichier');
      };
      
      // Lire directement le fichier image
      reader.readAsDataURL(imageFile);
    } else {
      toast.error('Veuillez déposer une image valide');
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    toast.success("Code copié dans le presse-papiers !");
  };

  const handleGenerate = useCallback(() => {
    if (!generatedCode) {
      toast.error("Aucun code à télécharger");
      return;
    }
    
    try {
      // Création d'un Blob avec le contenu du code généré
      const blob = new Blob(
        [new TextEncoder().encode(generatedCode)], 
        { type: 'text/typescript;charset=utf-8' }
      );
      
      // Création d'une URL pour le Blob
      const url = window.URL.createObjectURL(blob);
      
      // Création d'un élément <a> pour le téléchargement
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${workbenchConfig.componentName || 'component'}.tsx`;
      
      // Ajout de l'élément au DOM et déclenchement du clic
      document.body.appendChild(a);
      a.click();
      
      // Nettoyage
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success("Fichier téléchargé avec succès !");
    } catch (error) {
      console.error("Erreur lors du téléchargement du fichier :", error);
      toast.error("Erreur lors du téléchargement du fichier");
    }
  }, [generatedCode, workbenchConfig.componentName]);

  const linesOfCode = generatedCode ? generatedCode.split("\n").length : 0;
  const bundleSize = generatedCode ? (generatedCode.length / 1024).toFixed(1) : "0";

  const clearConsoleLogs = () => {
    setConsoleLogs([]);
  };

  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <header className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Workbench</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">V-AST Engine</span>
              <span className="text-sm font-medium text-codeo-green">• Ready</span>
            </div>
          </div>
          <button className="bg-codeo-green hover:bg-codeo-green/90 text-white px-4 py-2 rounded-lg">
            Generate Code
          </button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Welcome to Workbench
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Upload an image to generate React components with AI-powered analysis.
            </p>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center">
              <p className="text-slate-500 dark:text-slate-400">
                Drag & drop an image here, or click to browse
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}