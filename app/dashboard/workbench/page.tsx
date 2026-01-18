'use client'

export default function WorkbenchPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Workbench</h1>
        <p className="text-slate-500">Créez et éditez vos composants</p>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="h-[60vh] flex items-center justify-center bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
          <div className="text-center p-6">
            <div className="mx-auto h-12 w-12 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-slate-900">Aucun composant ouvert</h3>
            <p className="mt-1 text-sm text-slate-500">Commencez par sélectionner un composant ou créez-en un nouveau.</p>
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-codeo-green hover:bg-codeo-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-codeo-green"
              >
                Nouveau composant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
