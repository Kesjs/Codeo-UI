'use client'

import { useEffect, useRef, useState, memo } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Play, Pause, Copy, Check, Terminal } from 'lucide-react'
import { 
  vscDarkPlus, 
  atomDark, 
  materialDark, 
  oneDark 
} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { twMerge } from 'tailwind-merge'

// Langages
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import html from 'react-syntax-highlighter/dist/cjs/languages/prism/markup'

SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('html', html)
SyntaxHighlighter.registerLanguage('vue', html) // approximation acceptable

interface CodeBlockProps {
  code: string
  framework?: 'html' | 'react' | 'vue'
  className?: string
  autoScroll?: boolean
}

const CodeBlock = memo(({ code, framework = 'html', className = '', autoScroll = false }: CodeBlockProps) => {
  const [isPaused, setIsPaused] = useState(!autoScroll)
  const [isCopied, setIsCopied] = useState(false)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollPos = useRef(0)

  // Reset scroll quand le code ou le framework change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollPos.current = 0
      scrollContainerRef.current.scrollTop = 0
    }
  }, [code, framework])

  // Animation auto-scroll
  useEffect(() => {
    let animationFrameId: number
    let lastTime = 0
    const scrollSpeed = 0.8

    const animate = (time: number) => {
      if (!lastTime) lastTime = time
      const deltaTime = time - lastTime
      lastTime = time

      if (!isPaused && scrollContainerRef.current) {
        const container = scrollContainerRef.current
        const maxScroll = container.scrollHeight - container.clientHeight

        if (scrollPos.current >= maxScroll - 10) {
          // Pause en bas puis reset
          setTimeout(() => {
            scrollPos.current = 0
            container.scrollTop = 0
          }, 2000)
          animationFrameId = requestAnimationFrame(animate)
          return
        }

        scrollPos.current += scrollSpeed * (deltaTime / 16)
        container.scrollTop = scrollPos.current
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    if (autoScroll && !isPaused) {
      animationFrameId = requestAnimationFrame(animate)
    }

    return () => cancelAnimationFrame(animationFrameId)
  }, [isPaused, autoScroll])

  const handleWheel = (e: React.WheelEvent) => {
    if (!isPaused) e.preventDefault()
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  // Thèmes prédéfinis par framework
  const getThemeForFramework = () => {
    if (framework === 'react') {
      return {
        ...vscDarkPlus,
        'code[class*="language-"]': {
          color: '#e1e4e8',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          backgroundColor: 'transparent', // Fond transparent
        },
        // Personnalisation légère pour React
        tag: { color: '#61dafb' }, // Bleu React pour les tags JSX
        'class-name': { color: '#60a5fa' }, // Bleu clair pour les classes
        string: { color: '#ffffff' }, // Blanc pour le contenu textuel
        pre: { backgroundColor: 'transparent' }, // Fond transparent
      }
    } else if (framework === 'vue') {
      return {
        ...atomDark,
        'code[class*="language-"]': {
          color: '#e1e4e8',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          backgroundColor: 'transparent', // Fond transparent
        },
        // Personnalisation légère pour Vue
        tag: { color: '#42b883' }, // Vert Vue pour les tags
        string: { color: '#06b6d4' }, // Cyan pour les strings
        pre: { backgroundColor: 'transparent' }, // Fond transparent
      }
    } else { // HTML
      return {
        ...materialDark,
        'code[class*="language-"]': {
          color: '#e1e4e8',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          backgroundColor: 'transparent', // Fond transparent
        },
        // Personnalisation légère pour HTML
        tag: { color: '#dc2626' }, // Rouge pour les tags HTML
        string: { color: '#059669' }, // Vert forêt pour les strings
        pre: { backgroundColor: 'transparent' }, // Fond transparent
      }
    }
  }

  const theme = getThemeForFramework()

  return (
    <div className={twMerge("relative group w-full h-[400px] md:h-full overflow-hidden bg-black/20 backdrop-blur-md rounded-xl border border-white/5", className)}>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Forcer la transparence complète pour tous les thèmes */
        .react-syntax-highlighter pre {
          background-color: transparent !important;
          background: transparent !important;
        }
        .react-syntax-highlighter code {
          background-color: transparent !important;
          background: transparent !important;
        }
        div[class*="react-syntax-highlighter"] pre {
          background-color: transparent !important;
          background: transparent !important;
        }
        div[class*="react-syntax-highlighter"] code {
          background-color: transparent !important;
          background: transparent !important;
        }
        /* Forcer la transparence sur tous les éléments pre possibles */
        pre {
          background-color: transparent !important;
          background: transparent !important;
        }
        pre[style] {
          background-color: transparent !important;
          background: transparent !important;
        }
      `}</style>

      {/* Header visible au hover */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-black/30 backdrop-blur-md border-b border-white/5 flex items-center justify-end px-4 z-40 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? "Lire le scroll automatique" : "Mettre en pause le scroll"}
            className="text-slate-400 hover:text-white transition-colors"
          >
            {isPaused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
          </button>
          <button
            onClick={handleCopy}
            aria-label="Copier le code"
            className="text-slate-400 hover:text-white transition-colors"
          >
            {isCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        onWheel={handleWheel}
        className="no-scrollbar font-mono text-sm overflow-y-auto h-[calc(100%-40px)] w-full pt-12 pb-12 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
      >
        <div className="px-6">
          <SyntaxHighlighter
            language={framework === 'react' ? 'tsx' : 'html'}
            style={theme}
            customStyle={{ 
              margin: 0, 
              padding: '1rem 0', 
              backgroundColor: 'transparent !important',
              fontSize: '0.875rem', 
              lineHeight: '1.7'
            }}
            showLineNumbers
            lineNumberStyle={{ color: '#2b303b', minWidth: '3em', paddingRight: '1em' }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  )
})

CodeBlock.displayName = 'CodeBlock'

export default CodeBlock