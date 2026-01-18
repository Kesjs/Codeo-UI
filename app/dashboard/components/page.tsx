'use client'

export default function ComponentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mes composants</h1>
          <p className="text-slate-500">Gérez votre bibliothèque de composants</p>
        </div>
        <div className="flex space-x-3">
          <select className="block w-full rounded-md border-slate-300 shadow-sm focus:border-codeo-green focus:ring-codeo-green sm:text-sm">
            <option>Tous les frameworks</option>
            <option>React</option>
            <option>Vue</option>
            <option>Angular</option>
          </select>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-codeo-green hover:bg-codeo-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-codeo-green"
          >
            Nouveau
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="group relative">
                <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
                </div>
                <div className="mt-2 flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-slate-900">Composant {item}</h3>
                    <p className="text-xs text-slate-500">Modifié il y a {item} jour{item > 1 ? 's' : ''}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                    React
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <button className="p-2 text-white bg-black/50 rounded-full hover:bg-black/70">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button className="p-2 text-white bg-black/50 rounded-full hover:bg-black/70">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button className="p-2 text-white bg-black/50 rounded-full hover:bg-black/70">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
