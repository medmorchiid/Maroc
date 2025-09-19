import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, User, Clock, Star, MapPin, Camera, ChevronRight, Calendar, Shield, Award } from 'lucide-react';

interface ActivityOption {
  type: 'individual' | 'group';
  title: string;
  description: string;
  price: number;
  duration: string;
  maxParticipants?: number;
  features: string[];
  icon: React.ElementType;
}

const activityOptions: ActivityOption[] = [
  {
    type: 'individual',
    title: 'Aventure Individuelle',
    description: 'Explorez à votre rythme avec un guide personnel et une expérience sur mesure',
    price: 450,
    duration: '4-5 heures',
    features: [
      'Guide personnel dédié',
      'Itinéraire personnalisable',
      'Photos professionnelles incluses',
      'Accès prioritaire aux sites',
      'Collations et thé inclus'
    ],
    icon: User
  },
  {
    type: 'group',
    title: 'Aventure en Groupe',
    description: 'Partagez cette expérience unique avec vos amis ou en famille',
    price: 280,
    duration: '4-5 heures',
    maxParticipants: 8,
    features: [
      'Guide expérimenté pour le groupe',
      'Activités de groupe interactives',
      'Photos de groupe incluses',
      'Réductions pour groupes',
      'Collations partagées'
    ],
    icon: Users
  }
];

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&q=80&w=800",
    caption: "Palais Bahia - Architecture mauresque"
  },
  {
    url: "https://images.unsplash.com/photo-1553165558-b07f3b13f211?auto=format&fit=crop&q=80&w=800",
    caption: "Médina de Marrakech - Souks traditionnels"
  },
  {
    url: "https://images.unsplash.com/photo-1539020140153-e479b8c6e278?auto=format&fit=crop&q=80&w=800",
    caption: "Jardin Majorelle - Oasis de tranquillité"
  },
  {
    url: "https://images.unsplash.com/photo-1572206912757-5a78ff4d79be?auto=format&fit=crop&q=80&w=800",
    caption: "Artisanat local - Savoir-faire traditionnel"
  }
];

export function ActivityDetailsPage() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<'individual' | 'group' | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleContinue = () => {
    if (selectedOption) {
      navigate('/registration', { 
        state: { 
          activityType: selectedOption,
          activityTitle: "Le Trésor du Palais Bahia",
          activityLocation: "Marrakech, Médina"
        } 
      });
    }
  };

  return (
    <main className="pt-24 pb-20">
      {/* Header */}
      <div className="px-4 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-amber-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-amber-900" />
          </button>
          <h1 className="text-2xl font-bold text-amber-900">
            Le Trésor du Palais Bahia
          </h1>
        </div>
        
        <div className="flex items-center gap-4 text-amber-700 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Marrakech, Médina</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm">3-4 heures</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm">4.8/5</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="px-4 mb-6">
        <div className="relative h-48 rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&q=80&w=800"
            alt="Palais Bahia"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white text-sm">
              Embarquez pour une aventure fascinante à travers les monuments historiques de Marrakech
            </p>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="px-4 mb-8">
        <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
          <Camera className="w-5 h-5" />
          Galerie Photos
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {galleryImages.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative aspect-square rounded-xl overflow-hidden"
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-xs font-medium">{image.caption}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Activity Options */}
      <div className="px-4 mb-8">
        <h2 className="text-xl font-bold text-amber-900 mb-4">
          Choisissez votre expérience
        </h2>
        <div className="space-y-4">
          {activityOptions.map((option, index) => {
            const Icon = option.icon;
            const isSelected = selectedOption === option.type;

            return (
              <motion.button
                key={option.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedOption(option.type)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                  isSelected 
                    ? 'border-amber-600 bg-amber-50 shadow-lg' 
                    : 'border-gray-200 bg-white hover:border-amber-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isSelected ? 'bg-amber-600' : 'bg-amber-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      isSelected ? 'text-white' : 'text-amber-700'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-amber-900">
                        {option.title}
                      </h3>
                      <div className="text-right">
                        <span className="text-xl font-bold text-amber-900">
                          {option.price} Dh
                        </span>
                        <p className="text-sm text-gray-600">par personne</p>
                      </div>
                    </div>
                    
                    <p className="text-amber-950 mb-3">{option.description}</p>
                    
                    <div className="flex items-center gap-4 mb-3 text-sm text-amber-700">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{option.duration}</span>
                      </div>
                      {option.maxParticipants && (
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>Max {option.maxParticipants} pers.</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      {option.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
                          <span className="text-sm text-amber-950">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Additional Info */}
      <div className="px-4 mb-8">
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <h3 className="text-lg font-semibold text-amber-900 mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Informations importantes
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-amber-700 mt-0.5" />
              <div>
                <p className="font-medium text-amber-900">Aventure dans la Médina de Marrakech</p>
                <p className="text-sm text-gray-600">Annulation gratuite jusqu'à 24h avant</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-amber-700 mt-0.5" />
              <div>
                <p className="font-medium text-amber-900">Garantie qualité</p>
                <p className="text-sm text-gray-600">Guides certifiés et expérience garantie</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-700 mt-0.5" />
              <div>
                <p className="font-medium text-amber-900">Durée</p>
                <span className="text-sm">4-5 heures</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-20 left-4 right-4">
        <button
          onClick={handleContinue}
          disabled={!selectedOption}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-lg font-medium transition-all ${
            selectedOption
              ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span>Continuer</span>
          <ChevronRight className="w-6 h-6" />
        </button>
        {!selectedOption && (
          <p className="text-center text-amber-700 text-sm mt-2">
            Embarquez pour une aventure authentique à travers la médina de Marrakech
          </p>
        )}
      </div>

      {/* Image Modal */}
      {selectedImageIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImageIndex(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[selectedImageIndex].url}
              alt={galleryImages[selectedImageIndex].caption}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
              <p className="text-white text-center font-medium">
                {galleryImages[selectedImageIndex].caption}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}