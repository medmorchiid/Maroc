import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Landmark, Book, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdventureType {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const adventureTypes: AdventureType[] = [
  {
    id: 'cultural',
    title: 'Culturel',
    description: 'Découvrez l\'histoire, l\'art et le patrimoine du Maroc',
    icon: Landmark
  },
  {
    id: 'culinary',
    title: 'Dégustation',
    description: 'Explorez les saveurs et la gastronomie marocaine',
    icon: Coffee
  },
  {
    id: 'spiritual',
    title: 'Spirituel',
    description: 'Visitez les lieux sacrés et découvrez la spiritualité',
    icon: Book
  }
];

export function AdventureTypePage() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleType = (id: string) => {
    setSelectedTypes(prev => 
      prev.includes(id) 
        ? prev.filter(type => type !== id)
        : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selectedTypes.length > 0) {
      navigate('/generated-route', { state: { types: selectedTypes } });
    }
  };

  return (
    <main className="pt-24 pb-20 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-amber-900 mb-3">
          Choisissez votre aventure
        </h1>
        <p className="text-lg text-amber-950">
          Sélectionnez un ou plusieurs types d'aventures pour générer votre parcours personnalisé
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {adventureTypes.map((type, index) => {
          const Icon = type.icon;
          const isSelected = selectedTypes.includes(type.id);

          return (
            <motion.button
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleType(type.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                isSelected 
                  ? 'bg-amber-900 text-white shadow-lg scale-[1.02]' 
                  : 'bg-white text-amber-900 hover:bg-amber-50'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isSelected ? 'bg-amber-800' : 'bg-amber-100'
              }`}>
                <Icon className={`w-6 h-6 ${
                  isSelected ? 'text-white' : 'text-amber-900'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{type.title}</h3>
                <p className={`text-base ${
                  isSelected ? 'text-white' : 'text-amber-950'
                }`}>
                  {type.description}
                </p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                isSelected 
                  ? 'border-white bg-white' 
                  : 'border-amber-300'
              }`}>
                {isSelected && <div className="w-3 h-3 rounded-full bg-amber-900" />}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="fixed bottom-20 left-4 right-4">
        <button
          onClick={handleContinue}
          disabled={selectedTypes.length === 0}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-lg font-medium transition-all ${
            selectedTypes.length > 0
              ? 'bg-amber-600 text-white hover:bg-amber-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span>Générer mon parcours</span>
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </main>
  );
}