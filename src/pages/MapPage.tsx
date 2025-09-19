import React from 'react';
import { Map as MapIcon, Navigation2 } from 'lucide-react';

export function MapPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="px-4 mb-6">
        <h1 className="text-2xl font-bold text-amber-900 mb-2">Carte Interactive</h1>
        <p className="text-gray-600">Explorez les destinations et circuits disponibles</p>
      </div>

      <div className="relative h-[calc(100vh-13rem)] bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-amber-100 rounded-full mb-4">
            <MapIcon className="w-8 h-8 text-amber-700" />
          </div>
          <h2 className="text-lg font-semibold text-amber-900 mb-2">Carte en cours de chargement</h2>
          <p className="text-gray-600 text-sm">
            La carte interactive sera bientôt disponible
          </p>
        </div>

        <button className="absolute bottom-6 right-6 p-4 bg-amber-900 text-white rounded-full shadow-lg">
          <Navigation2 className="w-6 h-6" />
        </button>
      </div>
    </main>
  );
}