import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Star, ChevronDown, Share2 } from 'lucide-react';
import { AffiliateModal } from '../components/AffiliateModal';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Tapis berbère traditionnel",
    description: "Tapis fait main avec des motifs géométriques traditionnels de l'Atlas",
    price: 1200,
    image: "https://images.pexels.com/photos/12366044/pexels-photo-12366044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Tapis",
    rating: 4.8
  },
  {
    id: 2,
    name: "Théière en cuivre ciselé",
    description: "Théière artisanale en cuivre avec gravures traditionnelles",
    price: 450,
    image: "https://images.pexels.com/photos/6487972/pexels-photo-6487972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Ustensiles",
    rating: 4.6
  },
  {
    id: 3,
    name: "Lanterne marocaine en fer forgé",
    description: "Lanterne artisanale avec motifs géométriques découpés",
    price: 380,
    image: "https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Décoration",
    rating: 4.7
  },
  {
    id: 4,
    name: "Tajine en terre cuite peint",
    description: "Tajine traditionnel décoré à la main",
    price: 280,
    image: "https://images.pexels.com/photos/7474209/pexels-photo-7474209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Ustensiles",
    rating: 4.9
  },
  {
    id: 5,
    name: "Pouf en cuir brodé",
    description: "Pouf artisanal en cuir avec broderies traditionnelles",
    price: 550,
    image: "https://images.pexels.com/photos/12191010/pexels-photo-12191010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Décoration",
    rating: 4.8
  },
  {
    id: 6,
    name: "Miroir encadré en bois",
    description: "Miroir avec cadre en bois sculpté à la main",
    price: 890,
    image: "https://images.pexels.com/photos/6207094/pexels-photo-6207094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Décoration",
    rating: 4.7
  }
];

const categories = ["Tous", "Tapis", "Ustensiles", "Décoration"];

export function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [showCategories, setShowCategories] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAffiliateModal, setShowAffiliateModal] = useState(false);

  const filteredProducts = selectedCategory === "Tous" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleShare = (product: Product) => {
    setSelectedProduct(product);
    setShowAffiliateModal(true);
  };

  return (
    <main className="pt-24 pb-20 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-amber-900 mb-2">
          Boutique Artisanale
        </h1>
        <p className="text-amber-950">
          Découvrez notre sélection d'artisanat marocain authentique
        </p>
      </div>

      {/* Category Filter */}
      <div className="relative mb-6">
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="w-full flex items-center justify-between p-3 bg-white rounded-lg shadow-md"
        >
          <span className="text-amber-900 font-medium">{selectedCategory}</span>
          <ChevronDown className={`w-5 h-5 text-amber-900 transition-transform ${
            showCategories ? 'rotate-180' : ''
          }`} />
        </button>

        {showCategories && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-10"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowCategories(false);
                }}
                className={`w-full p-3 text-left hover:bg-amber-50 transition-colors ${
                  selectedCategory === category ? 'bg-amber-100 text-amber-900' : 'text-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button 
                  onClick={() => handleShare(product)}
                  className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <Share2 className="w-5 h-5 text-amber-900" />
                </button>
                <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                  <Heart className="w-5 h-5 text-amber-900" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-amber-900 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center gap-1 mb-3">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <span className="text-sm text-amber-900">{product.rating}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-amber-900">{product.price} Dh</span>
                <button className="p-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showAffiliateModal && selectedProduct && (
          <AffiliateModal
            isOpen={showAffiliateModal}
            onClose={() => setShowAffiliateModal(false)}
            productId={selectedProduct.id}
            productName={selectedProduct.name}
          />
        )}
      </AnimatePresence>
    </main>
  );
}