import React from 'react';
import { motion } from 'framer-motion';
import { Map } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-50 bg-amber-900 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center px-6"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, ease: "linear" }}
          className="inline-block mb-4"
        >
          <Map className="w-16 h-16 text-amber-50" />
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-amber-50 mb-2"
        >
          Maroc en sac à dos
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-amber-100/70 text-sm"
        >
          Votre guide d'aventure au Maroc
        </motion.p>
      </motion.div>
    </motion.div>
  );
}