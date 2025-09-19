import React from 'react';
import { MapPin, Star, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const destinations = [
  {
    id: 1,
    title: "Médina de Marrakech",
    image: "https://images.unsplash.com/photo-1553165558-b07f3b13f211?auto=format&fit=crop&q=80&w=800",
    description: "Explorez les souks animés et découvrez l'artisanat local",
    duration: "4-5 heures",
    difficulty: "Facile",
    location: "Marrakech"
  },
  {
    id: 2,
    title: "Vallée de l'Ourika",
    image: "https://images.unsplash.com/photo-1565014904681-e6662d3b7a39?auto=format&fit=crop&q=80&w=800",
    description: "Randonnée dans les montagnes de l'Atlas",
    duration: "1 jour",
    difficulty: "Moyen",
    location: "Atlas"
  },
  {
    id: 3,
    title: "Essaouira",
    image: "https://images.unsplash.com/photo-1572206912757-5a78ff4d79be?auto=format&fit=crop&q=80&w=800",
    description: "Ville côtière historique et port de pêche",
    duration: "2-3 jours",
    difficulty: "Facile",
    location: "Côte Atlantique"
  }
];

export function ExplorePage() {
  return (
    <main className="pt-24 pb-20">
      <div className="px-4 mb-8 text-center">
        <h1 className="text-3xl font-bold text-amber-900 mb-3">
          Explorer le Maroc
        </h1>
        <p className="text-lg text-amber-950">
          Découvrez des expériences uniques à travers le pays
        </p>
      </div>
      
      <div className="px-4 space-y-6">
        {destinations.map((destination, index) => (
          <motion.div
            key={destination.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform hover:scale-[1.02]"
          >
            <div className="relative h-48">
              <img
                src={destination.image}
                alt={destination.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="flex items-center gap-2 text-amber-200 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{destination.location}</span>
                </div>
                <h2 className="text-white text-xl font-bold">{destination.title}</h2>
              </div>
            </div>

            <div className="p-4">
              <p className="text-amber-950 mb-4">{destination.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-amber-700" />
                  </div>
                  <span className="text-amber-950">{destination.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <Star className="w-4 h-4 text-amber-700" />
                  </div>
                  <span className="text-amber-950">{destination.difficulty}</span>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-amber-900 text-white py-3 rounded-xl hover:bg-amber-800 transition-colors">
                <span>Voir les circuits</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}