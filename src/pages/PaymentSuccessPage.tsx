import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Share2, Calendar, MapPin, User, Users, Phone, Mail, Compass, Clock, Trophy, Lock, Timer, Play } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { marrakechTreasureHunts } from '../data/marrakechRoutes';

export function PaymentSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { registrationData, activityType, totalPrice, bookingId } = location.state || {};
  
  // Fonction pour calculer le temps restant avant le début
  const getTimeUntilStart = (date: string, startTime: string) => {
    const reservationDateTime = new Date(`${date}T${startTime}:00`);
    const now = new Date();
    const timeDiff = reservationDateTime.getTime() - now.getTime();
    
    if (timeDiff <= 0) {
      return { isActive: true, timeLeft: '' };
    }
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    let timeLeft = '';
    if (days > 0) timeLeft += `${days}j `;
    if (hours > 0) timeLeft += `${hours}h `;
    if (minutes > 0) timeLeft += `${minutes}min`;
    
    return { isActive: false, timeLeft: timeLeft.trim() };
  };

  useEffect(() => {
    if (!registrationData) {
      navigate('/');
    }
  }, [registrationData, navigate]);

  const handleDownloadTicket = () => {
    // In a real app, this would generate and download a PDF ticket
    alert('Téléchargement du billet en cours...');
  };

  const handleShareBooking = async () => {
    try {
      await navigator.share({
        title: 'Ma réservation - Maroc en sac à dos',
        text: `J'ai réservé "${activityType === 'individual' ? 'une aventure individuelle' : 'une aventure en groupe'}" pour le ${new Date(registrationData?.date).toLocaleDateString('fr-FR')}`,
        url: window.location.origin
      });
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  if (!registrationData) {
    return null;
  }

  const bookingUrl = `${window.location.origin}/booking/${bookingId}`;
  const treasureHunt = marrakechTreasureHunts[0];
  const { isActive: isHuntActive, timeLeft } = getTimeUntilStart(
    registrationData?.date, 
    registrationData?.startTime || '09:00'
  );

  return (
    <main className="pt-24 pb-20 px-4">
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
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>
        <h1 className="text-3xl font-bold text-amber-900 mb-2">
          Réservation confirmée !
        </h1>
        <p className="text-amber-700 text-lg">
          Votre aventure vous attend
        </p>
      </motion.div>

      {/* Booking Details */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-amber-900">
            Détails de votre réservation
          </h2>
          <span className="text-sm font-mono text-gray-500">#{bookingId}</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
            <MapPin className="w-5 h-5 text-amber-700" />
            <div>
              <p className="font-medium text-amber-900">Le Trésor du Palais Bahia</p>
              <p className="text-sm text-amber-700">Marrakech, Médina</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
            {activityType === 'individual' ? (
              <User className="w-5 h-5 text-amber-700" />
            ) : (
              <Users className="w-5 h-5 text-amber-700" />
            )}
            <div>
              <p className="font-medium text-amber-900">
                {activityType === 'individual' ? 'Aventure Individuelle' : 'Aventure en Groupe'}
              </p>
              <p className="text-sm text-amber-700">
                {activityType === 'group' && `${registrationData.groupSize} participants`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
            <Calendar className="w-5 h-5 text-amber-700" />
            <div>
              <p className="font-medium text-amber-900">Date et heure</p>
              <p className="text-sm text-amber-700">
                {new Date(registrationData.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} à 9h00
              </p>
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4">
            <div className="flex justify-between text-lg font-bold text-amber-900">
              <span>Montant payé</span>
              <span>{totalPrice} Dh</span>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Treasure Hunt */}
      <div className="bg-gradient-to-br from-amber-900 to-amber-800 rounded-2xl shadow-lg p-6 mb-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center">
            <Compass className="w-6 h-6 text-amber-100" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Votre Aventure dans la Médina</h2>
            <p className="text-amber-200">Parcours authentique généré</p>
          </div>
        </div>

        <div className="bg-amber-800/50 rounded-xl p-4 mb-4">
          <h3 className="font-bold text-lg mb-2">{treasureHunt.title}</h3>
          <p className="text-amber-100 mb-3">{treasureHunt.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-300" />
              <span className="text-sm text-amber-100">{treasureHunt.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-300" />
              <span className="text-sm text-amber-100 capitalize">{treasureHunt.difficulty}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-amber-200">Étapes de votre aventure :</h4>
            {treasureHunt.steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-3 p-3 bg-amber-700/30 rounded-lg">
                <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-amber-100">{step.location}</p>
                  <p className="text-sm text-amber-200">⏱️ {step.enigma.timeLimit} minutes</p>
                </div>
                {!isHuntActive && (
                  <Lock className="w-4 h-4 text-amber-400" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={`p-4 rounded-xl ${
          isHuntActive 
            ? 'bg-green-600/20 border border-green-400/30' 
            : 'bg-amber-700/30 border border-amber-500/30'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            {isHuntActive ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-semibold text-green-100">Aventure activée !</span>
              </>
            ) : (
              <>
                <Timer className="w-5 h-5 text-amber-300" />
                <span className="font-semibold text-amber-100">Disponible dans : {timeLeft}</span>
              </>
            )}
          </div>
          <p className="text-sm text-amber-200">
            {isHuntActive 
              ? `Votre aventure est maintenant disponible ! Rendez-vous au Collège Mohammed V à Riad Laarouss pour récupérer votre sac à dos. Durée : 5 heures (fin automatique à ${new Date(new Date(registrationData?.date + 'T' + (registrationData?.startTime || '09:00')).getTime() + 5 * 60 * 60 * 1000).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })})`
              : `Votre aventure sera automatiquement activée le ${new Date(registrationData?.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} à ${registrationData?.startTime || '09:00'}.`
            }
          </p>
        </div>

        {isHuntActive && (
          <button
            onClick={() => navigate('/treasure-hunt', { state: { huntId: treasureHunt.id } })}
            className="w-full mt-4 bg-amber-600 text-white py-3 rounded-xl font-medium hover:bg-amber-500 transition-colors"
          >
            Commencer l'aventure
          </button>
        )}
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-4">
          Informations de contact
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-amber-700" />
            <span className="text-amber-900">
              {registrationData.firstName} {registrationData.lastName}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-amber-700" />
            <span className="text-amber-900">{registrationData.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-amber-700" />
            <span className="text-amber-900">{registrationData.phone}</span>
          </div>
        </div>
      </div>

      {/* QR Code */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-4 text-center">
          Votre billet électronique
        </h3>
        
        <div className="flex justify-center mb-4">
          <div className="bg-amber-50 p-4 rounded-xl">
            <QRCodeSVG
              value={bookingUrl}
              size={200}
              level="H"
              includeMargin
            />
          </div>
        </div>
        
        <p className="text-center text-sm text-gray-600 mb-4">
          Présentez ce QR code le jour de votre aventure
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleDownloadTicket}
            className="flex items-center justify-center gap-2 p-3 bg-amber-100 text-amber-900 rounded-lg hover:bg-amber-200 transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Télécharger</span>
          </button>
          
          <button
            onClick={handleShareBooking}
            className="flex items-center justify-center gap-2 p-3 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            <span>Partager</span>
          </button>
        </div>
      </div>

      {/* Group Participants */}
      {activityType === 'group' && registrationData.participantNames && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-4">
            Participants ({registrationData.groupSize})
          </h3>
          
          <div className="space-y-2">
            {registrationData.participantNames.map((name: string, index: number) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-amber-50 rounded-lg">
                <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                  <span className="text-amber-900 font-medium">{index + 1}</span>
                </div>
                <span className="text-amber-900">{name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Important Information */}
      <div className="bg-blue-50 rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          Informations importantes
        </h3>
        
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <span>Arrivez 15 minutes avant l'heure de début</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <span>Apportez une pièce d'identité valide</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <span>Portez des chaussures confortables</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <span>Annulation gratuite jusqu'à 24h avant</span>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        {isHuntActive ? (
          <button
            onClick={() => navigate('/treasure-hunt', { state: { huntId: treasureHunt.id } })}
            className="w-full bg-green-600 text-white py-4 rounded-xl text-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-6 h-6" />
            🎯 Commencer l'aventure maintenant
          </button>
        ) : (
          <button
            onClick={() => navigate('/')}
            className="w-full bg-amber-600 text-white py-4 rounded-xl text-lg font-medium hover:bg-amber-700 transition-colors"
          >
            Retour à l'accueil
          </button>
        )}
        
        <button
          onClick={() => navigate('/explore')}
          className="w-full border-2 border-amber-600 text-amber-600 py-4 rounded-xl text-lg font-medium hover:bg-amber-50 transition-colors"
        >
          Découvrir d'autres aventures
        </button>
      </div>
    </main>
  );
}