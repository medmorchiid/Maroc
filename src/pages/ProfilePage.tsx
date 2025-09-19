import React from 'react';
import { User, MapPin, Trophy, Star, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProfilePage() {
  return (
    <main className="pt-24 pb-20">
      <div className="px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-amber-900 p-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-amber-800 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-amber-50" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Visiteur</h1>
                <p className="text-amber-200">Créez un compte pour sauvegarder votre progression</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <button className="w-full bg-amber-900 text-white py-3 rounded-lg hover:bg-amber-800 transition-colors">
              Se connecter / S'inscrire
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-xl shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-amber-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-amber-900">Mes circuits</h3>
                <p className="text-sm text-gray-600">Circuits sauvegardés et en cours</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-4 rounded-xl shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-amber-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-amber-900">Récompenses</h3>
                <p className="text-sm text-gray-600">Badges et succès débloqués</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-4 rounded-xl shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-amber-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-amber-900">Favoris</h3>
                <p className="text-sm text-gray-600">Lieux et circuits favoris</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-4 rounded-xl shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-amber-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-amber-900">Paramètres</h3>
                <p className="text-sm text-gray-600">Préférences et configuration</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}