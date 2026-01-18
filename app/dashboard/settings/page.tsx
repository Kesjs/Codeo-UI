'use client'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>
        <p className="text-slate-500">Gérez les préférences de votre compte</p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-slate-200">
          <h3 className="text-lg leading-6 font-medium text-slate-900">Profil</h3>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Informations personnelles et préférences
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium text-slate-700">
                Nom d'utilisateur
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 sm:text-sm">
                  codeo.app/
                </span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-slate-300 focus:ring-codeo-green focus:border-codeo-green sm:text-sm"
                  defaultValue="ken"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Adresse email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-codeo-green focus:border-codeo-green sm:text-sm"
                defaultValue="ken@example.com"
              />
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="timezone" className="block text-sm font-medium text-slate-700">
                Fuseau horaire
              </label>
              <select
                id="timezone"
                name="timezone"
                className="mt-1 block w-full bg-white border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-codeo-green focus:border-codeo-green sm:text-sm"
                defaultValue="Europe/Paris"
              >
                <option>Heure du Pacifique (PST)</option>
                <option>Heure des Rocheuses (MST)</option>
                <option>Heure du Centre (CST)</option>
                <option>Heure de l'Est (EST)</option>
                <option selected>Europe/Paris (CET)</option>
              </select>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-slate-50 text-right sm:px-6">
          <button
            type="button"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-codeo-green hover:bg-codeo-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-codeo-green"
          >
            Enregistrer
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-slate-200">
          <h3 className="text-lg leading-6 font-medium text-slate-900">Mot de passe</h3>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Mettez à jour votre mot de passe
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="current-password" className="block text-sm font-medium text-slate-700">
                Mot de passe actuel
              </label>
              <input
                type="password"
                name="current-password"
                id="current-password"
                autoComplete="current-password"
                className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-codeo-green focus:border-codeo-green sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-slate-700">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                name="new-password"
                id="new-password"
                autoComplete="new-password"
                className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-codeo-green focus:border-codeo-green sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700">
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                autoComplete="new-password"
                className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-codeo-green focus:border-codeo-green sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-slate-50 text-right sm:px-6">
          <button
            type="button"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-codeo-green hover:bg-codeo-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-codeo-green"
          >
            Mettre à jour le mot de passe
          </button>
        </div>
      </div>
    </div>
  )
}
