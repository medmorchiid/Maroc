import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FeaturedSlider } from '../components/FeaturedSlider';
import { marrakechTreasureHunts } from '../data/marrakechRoutes';
import { MapPin, Clock, Star } from 'lucide-react';

export function HomePage() {
  const selectedHunt = marrakechTreasureHunts[0];
  const navigate = useNavigate();

  return (
    <main className="pt-24 pb-20">
      {/* Featured Slider */}
      <div className="mb-8">
        <FeaturedSlider />
      </div>

      {/* Featured Hunt Card */}
      <div className="px-4 mb-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-48">
            <img 
              src="https://images.unsplash.com/photo-1553165558-b07f3b13f211?auto=format&fit=crop&q=80&w=800"
              alt="Médina de Marrakech"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h2 className="text-white text-xl font-bold">{selectedHunt.title}</h2>
              <div className="flex items-center gap-2 text-amber-200 mt-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Marrakech, Médina</span>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <p className="text-gray-600 text-sm mb-4">{selectedHunt.description}</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg">
                <Clock className="w-5 h-5 text-amber-700" />
                <div>
                  <p className="text-xs text-gray-600">Durée</p>
                  <p className="text-sm font-medium text-amber-900">{selectedHunt.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg">
                <Star className="w-5 h-5 text-amber-700" />
                <div>
                  <p className="text-xs text-gray-600">Difficulté</p>
                  <p className="text-sm font-medium text-amber-900 capitalize">{selectedHunt.difficulty}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate('/activity-details')}
              className="w-full bg-amber-900 text-white py-3 rounded-lg hover:bg-amber-800 transition-colors"
            >
              Commencer l'aventure
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}