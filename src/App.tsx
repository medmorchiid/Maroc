import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Map, Compass, Clock, Star, ChevronRight, Trophy, ScrollText, MapPin, ShoppingBag, User, Menu, X, Search, Home, Info, HelpCircle, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { HelpSystem } from './components/HelpSystem';
import { SplashScreen } from './components/SplashScreen';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { MapPage } from './pages/MapPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdventureTypePage } from './pages/AdventureTypePage';
import { GeneratedRoutePage } from './pages/GeneratedRoutePage';
import { ActivityDetailsPage } from './pages/ActivityDetailsPage';
import { ShopPage } from './pages/ShopPage';
import { DashboardPage } from './pages/DashboardPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { PaymentPage } from './pages/PaymentPage';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage';
import { TreasureHuntPage } from './pages/TreasureHuntPage';
import { TreasureHuntCompletePage } from './pages/TreasureHuntCompletePage';
import { ReservationManagementPage } from './pages/ReservationManagementPage';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [accountType, setAccountType] = useState<'individual' | 'group' | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => setIsMenuOpen(true),
    onSwipedLeft: () => setIsMenuOpen(false),
    trackMouse: true
  });

  const getCurrentTab = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    return path.slice(1);
  };

  return (
    <div className="min-h-screen bg-amber-50" {...swipeHandlers}>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-amber-900 shadow-lg">
          <div className="px-4 py-3 flex items-center justify-between">
            <button 
              onClick={toggleMenu} 
              className="p-2 hover:bg-amber-800 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
            <div className="flex items-center gap-2">
              <img 
                src="/logo.png" 
                alt="Maroc en sac à dos" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowHelp(true)} 
                className="p-2 hover:bg-amber-800 rounded-lg transition-colors"
              >
                <HelpCircle className="w-6 h-6 text-white" />
              </button>
              <button 
                onClick={() => setShowSignup(true)} 
                className="p-2 hover:bg-amber-800 rounded-lg transition-colors"
              >
                <User className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="px-4 pb-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Rechercher un parcours..." 
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/70" />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-0 z-50 bg-amber-900"
          >
            <div className="flex flex-col h-full">
              <div className="px-4 py-3 flex items-center justify-between border-b border-amber-800/30">
                <div className="flex items-center gap-3">
                  <img 
                    src="/logo.png" 
                    alt="Maroc en sac à dos" 
                    className="h-10 w-auto object-contain"
                  />
                  <span className="text-lg font-semibold text-white">Menu</span>
                </div>
                <button onClick={toggleMenu} className="p-2 hover:bg-amber-800 rounded-lg transition-colors">
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-6 px-4">
                <nav className="space-y-4">
                  <button 
                    onClick={() => {
                      navigate('/');
                      setIsMenuOpen(false);
                    }} 
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-amber-800/30 transition-colors text-white"
                  >
                    <Home className="w-6 h-6" />
                    <span>Accueil</span>
                  </button>
                  <button 
                    onClick={() => {
                      navigate('/explore');
                      setIsMenuOpen(false);
                    }} 
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-amber-800/30 transition-colors text-white"
                  >
                    <Compass className="w-6 h-6" />
                    <span>Explorer</span>
                  </button>
                  <button 
                    onClick={() => {
                      navigate('/map');
                      setIsMenuOpen(false);
                    }} 
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-amber-800/30 transition-colors text-white"
                  >
                    <MapPin className="w-6 h-6" />
                    <span>Carte</span>
                  </button>
                  <button 
                    onClick={() => {
                      navigate('/shop');
                      setIsMenuOpen(false);
                    }} 
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-amber-800/30 transition-colors text-white"
                  >
                    <ShoppingBag className="w-6 h-6" />
                    <span>Boutique</span>
                  </button>
                  <button 
                    onClick={() => {
                      navigate('/dashboard');
                      setIsMenuOpen(false);
                    }} 
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-amber-800/30 transition-colors text-white"
                  >
                    <ScrollText className="w-6 h-6" />
                    <span>Tableau de bord</span>
                  </button>
                  <button 
                    onClick={() => {
                      navigate('/reservations');
                      setIsMenuOpen(false);
                    }} 
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-amber-800/30 transition-colors text-white"
                  >
                    <ScrollText className="w-6 h-6" />
                    <span>Réservations</span>
                  </button>
                  <button 
                    onClick={() => {
                      navigate('/profile');
                      setIsMenuOpen(false);
                    }} 
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-amber-800/30 transition-colors text-white"
                  >
                    <User className="w-6 h-6" />
                    <span>Profil</span>
                  </button>
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      setShowHelp(true);
                    }} 
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-amber-800/30 transition-colors text-white"
                  >
                    <HelpCircle className="w-6 h-6" />
                    <span>Aide</span>
                  </button>
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/adventure-type" element={<AdventureTypePage />} />
        <Route path="/generated-route" element={<GeneratedRoutePage />} />
        <Route path="/activity-details" element={<ActivityDetailsPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/treasure-hunt" element={<TreasureHuntPage />} />
        <Route path="/treasure-hunt-complete" element={<TreasureHuntCompletePage />} />
        <Route path="/reservations" element={<ReservationManagementPage />} />
      </Routes>

      {/* Mobile Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-5 gap-1">
          <button 
            onClick={() => navigate('/')}
            className={`flex flex-col items-center gap-1 p-3 ${
              getCurrentTab() === 'home' ? 'text-amber-900' : 'text-gray-500'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Accueil</span>
          </button>
          <button 
            onClick={() => navigate('/explore')}
            className={`flex flex-col items-center gap-1 p-3 ${
              getCurrentTab() === 'explore' ? 'text-amber-900' : 'text-gray-500'
            }`}
          >
            <Compass className="w-6 h-6" />
            <span className="text-xs">Explorer</span>
          </button>
          <button 
            onClick={() => navigate('/map')}
            className={`flex flex-col items-center gap-1 p-3 ${
              getCurrentTab() === 'map' ? 'text-amber-900' : 'text-gray-500'
            }`}
          >
            <Map className="w-6 h-6" />
            <span className="text-xs">Carte</span>
          </button>
          <button 
            onClick={() => navigate('/shop')}
            className={`flex flex-col items-center gap-1 p-3 ${
              getCurrentTab() === 'shop' ? 'text-amber-900' : 'text-gray-500'
            }`}
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="text-xs">Boutique</span>
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className={`flex flex-col items-center gap-1 p-3 ${
              getCurrentTab() === 'profile' ? 'text-amber-900' : 'text-gray-500'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profil</span>
          </button>
        </div>
      </nav>

      {/* Help System */}
      <AnimatePresence>
        {showHelp && <HelpSystem isOpen={showHelp} onClose={() => setShowHelp(false)} />}
      </AnimatePresence>

      {/* Signup Modal */}
      <AnimatePresence>
        {showSignup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-end z-50 p-4"
          >
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-full bg-white rounded-t-2xl p-6"
            >
              <h2 className="text-2xl font-bold text-amber-900 mb-6">Créer un compte</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button 
                  onClick={() => setAccountType('individual')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                    accountType === 'individual' 
                      ? 'border-amber-600 bg-amber-50' 
                      : 'border-gray-200 hover:border-amber-200'
                  }`}
                >
                  <User className="w-8 h-8 text-amber-700" />
                  <span className="font-medium text-amber-900">Particulier</span>
                </button>
                
                <button 
                  onClick={() => setAccountType('group')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                    accountType === 'group' 
                      ? 'border-amber-600 bg-amber-50' 
                      : 'border-gray-200 hover:border-amber-200'
                  }`}
                >
                  <Users className="w-8 h-8 text-amber-700" />
                  <span className="font-medium text-amber-900">Groupe</span>
                </button>
              </div>

              {accountType === 'group' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de participants
                  </label>
                  <input 
                    type="number" 
                    min="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Minimum 2 personnes"
                  />
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button 
                  onClick={() => setShowSignup(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button className="flex-1 px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                  S'inscrire
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;