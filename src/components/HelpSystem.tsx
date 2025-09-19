import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Map, Compass, Trophy, Star, MessageCircle, X, ChevronRight, ArrowLeft } from 'lucide-react';

interface HelpSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

const helpItems = [
  {
    icon: Map,
    title: "Navigation",
    description: "Utilisez la carte interactive pour localiser les points d'intérêt et suivre votre progression.",
    details: [
      "Zoom sur la carte pour voir les détails",
      "Appuyez sur les marqueurs pour plus d'informations",
      "Mode hors-ligne disponible",
      "Itinéraire guidé étape par étape"
    ]
  },
  {
    icon: Compass,
    title: "Énigmes",
    description: "Résolvez des énigmes passionnantes pour découvrir l'histoire et la culture de chaque lieu.",
    details: [
      "Indices progressifs disponibles",
      "Photos et textes d'aide",
      "Validation automatique des réponses",
      "Mode collaboration pour les groupes"
    ]
  },
  {
    icon: Trophy,
    title: "Récompenses",
    description: "Gagnez des points et débloquez des badges en complétant les étapes du parcours.",
    details: [
      "Badges exclusifs à collectionner",
      "Points bonus pour la rapidité",
      "Classement hebdomadaire",
      "Récompenses spéciales"
    ]
  },
  {
    icon: Star,
    title: "Progression",
    description: "Suivez votre progression et revenez plus tard pour terminer votre aventure.",
    details: [
      "Sauvegarde automatique",
      "Reprise du parcours",
      "Statistiques détaillées",
      "Historique des visites"
    ]
  },
  {
    icon: MessageCircle,
    title: "Assistance",
    description: "Besoin d'aide ? Utilisez le chat pour contacter notre équipe à tout moment.",
    details: [
      "Support 24/7",
      "Chat en direct",
      "FAQ interactive",
      "Assistance d'urgence"
    ]
  }
];

export function HelpSystem({ isOpen, onClose }: HelpSystemProps) {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-amber-900 z-50"
    >
      <AnimatePresence mode="wait">
        {selectedItem === null ? (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full flex flex-col"
          >
            <div className="px-4 py-3 flex items-center justify-between border-b border-amber-800/30">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-amber-50" />
                <h2 className="text-xl font-semibold text-amber-50">Guide</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-amber-800/50 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-amber-50" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {helpItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedItem(index)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-full flex items-center gap-4 p-4 bg-amber-800/30 rounded-xl text-left hover:bg-amber-800/50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center">
                          <Icon className="w-6 h-6 text-amber-50" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-amber-50 mb-1">{item.title}</h3>
                        <p className="text-sm text-amber-100/70 line-clamp-2">{item.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-amber-50/50 flex-shrink-0" />
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-8 p-4 bg-amber-800/30 rounded-xl">
                <h3 className="font-semibold text-amber-50 mb-3">Conseils pratiques</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-amber-100/70">
                    <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />
                    <span className="text-sm">Batterie chargée recommandée</span>
                  </li>
                  <li className="flex items-center gap-3 text-amber-100/70">
                    <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />
                    <span className="text-sm">Téléchargez la carte hors-ligne</span>
                  </li>
                  <li className="flex items-center gap-3 text-amber-100/70">
                    <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />
                    <span className="text-sm">Prévoyez de l'eau et des collations</span>
                  </li>
                  <li className="flex items-center gap-3 text-amber-100/70">
                    <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />
                    <span className="text-sm">Respectez les lieux historiques</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="h-full flex flex-col"
          >
            <div className="px-4 py-3 flex items-center justify-between border-b border-amber-800/30">
              <button
                onClick={() => setSelectedItem(null)}
                className="flex items-center gap-2 p-2 hover:bg-amber-800/50 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-amber-50" />
                <span className="text-amber-50">Retour</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-amber-800/50 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-amber-50" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center">
                    {selectedItem !== null && (() => {
                      const Icon = helpItems[selectedItem].icon;
                      return <Icon className="w-8 h-8 text-amber-50" />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-amber-50">
                      {helpItems[selectedItem].title}
                    </h2>
                    <p className="text-amber-100/70">
                      {helpItems[selectedItem].description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {helpItems[selectedItem].details.map((detail, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-amber-800/30 rounded-xl"
                    >
                      <p className="text-amber-50">{detail}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}