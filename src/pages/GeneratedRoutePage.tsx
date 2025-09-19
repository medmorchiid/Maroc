import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Clock, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export function GeneratedRoutePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedTypes = location.state?.types || [];

  const route = {
    title: "Circuit personnalisé",
    duration: "4-5 heures",
    stops: [
      {
        title: "Médina de Marrakech",
        type: "cultural",
        duration: "1h30",
        description: "Explorez les souks traditionnels"
      },
      {
        title: "Café des Épices",
        type: "culinary",
        duration: "1h",
        description: "Dégustation de thés et pâtisseries"
      },
      {
        title: "Mosquée Koutoubia",
        type: "spiritual",
        duration: "45min",
        description: "Visite du monument historique"
      }
    ].filter(stop => selectedTypes.includes(stop.type))
  };

  return (
    <main className="pt-24 pb-20 px-4">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-amber-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-amber-900" />
        </button>
        <h1 className="text-3xl font-bold text-amber-900">
          Votre Parcours
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-amber-700" />
            <span className="text-lg text-amber-950 font-medium">{route.duration}</span>
          </div>

          <div className="space-y-8">
            {route.stops.map((stop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-amber-900 font-bold text-lg">{index + 1}</span>
                  </div>
                  {index < route.stops.length - 1 && (
                    <div className="absolute top-8 bottom-0 left-1/2 w-0.5 bg-amber-200" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">{stop.title}</h3>
                  <p className="text-base text-amber-950 mb-3">{stop.description}</p>
                  <div className="flex items-center gap-2 text-base text-amber-700 font-medium">
                    <Clock className="w-5 h-5" />
                    <span>{stop.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-20 left-4 right-4">
        <button className="w-full bg-amber-600 text-white text-lg font-medium py-4 rounded-xl hover:bg-amber-700 transition-colors">
          Commencer l'aventure
        </button>
      </div>
    </main>
  );
}