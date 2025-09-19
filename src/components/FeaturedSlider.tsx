import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&q=80&w=800",
    title: "Palais Bahia",
    description: "Découvrez les secrets du magnifique Palais Bahia",
    location: "Médina, Marrakech"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c6e278?auto=format&fit=crop&q=80&w=800",
    title: "Jardin Majorelle",
    description: "Explorez les jardins enchanteurs de Majorelle",
    location: "Guéliz, Marrakech"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1553165558-b07f3b13f211?auto=format&fit=crop&q=80&w=800",
    title: "Médina",
    description: "Parcourez les ruelles mystérieuses de la Médina",
    location: "Médina, Marrakech"
  }
];

export function FeaturedSlider() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => paginate(1),
    onSwipedRight: () => paginate(-1),
    trackMouse: true
  });

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  return (
    <div className="relative overflow-hidden" {...swipeHandlers}>
      <div className="absolute inset-x-0 top-1/2 z-10 flex justify-between items-center px-4 -translate-y-1/2">
        <button
          onClick={() => paginate(-1)}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="relative aspect-[4/3] w-full"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {slides[currentSlide].title}
            </h2>
            <p className="text-white/90 mb-2">
              {slides[currentSlide].description}
            </p>
            <div className="flex items-center gap-2 text-amber-200">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{slides[currentSlide].location}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}