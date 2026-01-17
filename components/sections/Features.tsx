'use client'

import React from 'react'
import { 
  Zap, Code, Image as ImageIcon, Upload, Download, Terminal 
} from 'lucide-react'

type Framework = 'html' | 'react' | 'vue'

const Features = () => {
  return (
    <section id="features" className="py-24 bg-codeo-light-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Fonctionnalités puissantes
          </h2>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto">
            Découvrez comment notre outil peut transformer votre flux de travail
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: 'Multi-Framework', 
              description: 'Générez du code pour React, Vue, ou HTML pur en un clic.', 
              icon: Code,
              color: 'bg-blue-100 text-blue-600'
            },
            { 
              title: 'Prêt pour la production', 
              description: 'Code optimisé et prêt à l\'emploi dans vos projets.', 
              icon: Terminal,
              color: 'bg-green-100 text-green-600'
            },
            { 
              title: 'Intégration facile', 
              description: 'Copiez-collez simplement le code généré dans votre projet.', 
              icon: Download,
              color: 'bg-purple-100 text-purple-600'
            },
          ].map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
