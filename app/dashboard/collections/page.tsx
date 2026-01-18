"use client";

import { FolderIcon } from "@heroicons/react/24/outline";

interface Collection {
  id: number;
  name: string;
  items: number;
  updated: string;
}

export default function CollectionsPage() {
  const collections: Collection[] = [
    { id: 1, name: "Composants UI", items: 24, updated: "2h ago" },
    { id: 2, name: "Templates", items: 12, updated: "1j" },
    { id: 3, name: "Formulaires", items: 8, updated: "3j" },
    { id: 4, name: "Navigation", items: 5, updated: "1 sem." },
    { id: 5, name: "Tableaux", items: 7, updated: "2 sem." },
    { id: 6, name: "Modales", items: 3, updated: "3 sem." },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Collections</h1>
          <p className="text-slate-500">Organisez vos composants en collections</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-codeo-green hover:bg-codeo-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-codeo-green"
        >
          Nouvelle collection
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-slate-200">
          {collections.map((collection) => (
            <li key={collection.id}>
              <div className="px-4 py-4 flex items-center sm:px-6 hover:bg-slate-50">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FolderIcon className="h-10 w-10 text-codeo-green/70" aria-hidden="true" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-codeo-green truncate">{collection.name}</div>
                      <div className="flex items-center text-sm text-slate-500">
                        <span>{collection.items} {collection.items > 1 ? 'éléments' : 'élément'}</span>
                        <span className="mx-1">•</span>
                        <span>Mis à jour {collection.updated}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                    <div className="flex -space-x-1">
                      {[1, 2, 3].map((i) => (
                        <img
                          key={i}
                          className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                          src={`https://i.pravatar.cc/150?img=${i + 10}`}
                          alt=""
                        />
                      ))}
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 text-xs font-medium text-slate-500 ring-2 ring-white">
                        +2
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0">
                  <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
