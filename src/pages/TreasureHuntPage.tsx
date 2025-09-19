import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Star, Camera, Share2, Home, Compass, CheckCircle, Award, Clock, Copy, Check } from 'lucide-react';

export function TreasureHuntPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { huntId, completedSteps, totalSteps } = location.state || {};
  const [copied, setCopied] = useState(false);

  const achievements = [
    { icon: Trophy, title: "Explorateur Expert", description: "Toutes les étapes complétées" },
    { icon: Star, title: "Détective Culturel", description: "Énigmes résolues avec brio" },
    { icon: Camera, title: "Collectionneur de Souvenirs", description: "Moments capturés" },
    { icon: Award, title: "Ambassadeur du Patrimoine", description: "Mission accomplie" }
  ];

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'J\'ai terminé ma chasse au trésor !',
        text: `Je viens de terminer "${huntId}" avec Maroc en sac à dos ! Une expérience incroyable à travers le patrimoine marocain.`,
        url: window.location.origin
      });
    } catch (err) {
      // Silently handle share cancellation or unavailability
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <main className="pt-24 pb-20 px-4 min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
      {/* Success Header */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <Trophy className="w-12 h-12 text-white" />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-amber-900 mb-3"
        >
          Félicitations !
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-amber-700 mb-2"
        >
          Vous avez terminé votre chasse au trésor
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 text-amber-600"
        >
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">{completedSteps || totalSteps}/{totalSteps} étapes complétées</span>
        </motion.div>
      </motion.div>

      {/* Stats Card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-6"
      >
        <h2 className="text-xl font-bold text-amber-900 mb-4">Votre Performance</h2>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-amber-50 rounded-xl">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-6 h-6 text-amber-700" />
            </div>
            <p className="text-2xl font-bold text-amber-900">3h 45m</p>
            <p className="text-sm text-amber-700">Temps total</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Star className="w-6 h-6 text-green-700" />
            </div>
            <p className="text-2xl font-bold text-green-900">100%</p>
            <p className="text-sm text-green-700">Réussite</p>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-6 h-6 text-blue-700" />
            </div>
            <p className="text-2xl font-bold text-blue-900">850</p>
            <p className="text-sm text-blue-700">Points</p>
          </div>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-6"
      >
        <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
          <Award className="w-6 h-6" />
          Badges Débloqués
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl"
              >
                <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <p className="font-medium text-amber-900 text-sm">{achievement.title}</p>
                  <p className="text-xs text-amber-700">{achievement.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Photo Gallery Preview */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-6"
      >
        <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
          <Camera className="w-6 h-6" />
          Vos Souvenirs
        </h2>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&q=80&w=300",
            "https://images.unsplash.com/photo-1553165558-b07f3b13f211?auto=format&fit=crop&q=80&w=300",
            "https://images.unsplash.com/photo-1539020140153-e479b8c6e278?auto=format&fit=crop&q=80&w=300"
          ].map((image, index) => (
            <div key={index} className="aspect-square rounded-lg overflow-hidden">
              <img
                src={image}
                alt={`Souvenir ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        <p className="text-sm text-amber-700 text-center">
          3 photos capturées pendant votre aventure
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="space-y-4"
      >
        <button
          onClick={handleShare}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 rounded-xl text-lg font-medium hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg"
        >
          <Share2 className="w-6 h-6" />
          <span>Partager mon succès</span>
        </button>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/explore')}
            className="flex items-center justify-center gap-2 border-2 border-amber-600 text-amber-600 py-3 rounded-xl font-medium hover:bg-amber-50 transition-colors"
          >
            <Compass className="w-5 h-5" />
            <span>Nouvelles aventures</span>
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 border-2 border-amber-600 text-amber-600 py-3 rounded-xl font-medium hover:bg-amber-50 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Accueil</span>
          </button>
        </div>
      </motion.div>

      {/* Celebration Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="fixed inset-0 pointer-events-none"
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              y: 100, 
              x: Math.random() * window.innerWidth,
              rotate: 0 
            }}
            animate={{ 
              opacity: [0, 1, 0], 
              y: -100, 
              rotate: 360 
            }}
            transition={{ 
              duration: 3, 
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 5
            }}
            className="absolute text-2xl"
          >
            {['🎉', '🏆', '⭐', '🎊'][Math.floor(Math.random() * 4)]}
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}