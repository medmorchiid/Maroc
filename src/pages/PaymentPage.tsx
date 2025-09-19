import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Shield, CheckCircle, Clock, User, Users, Calendar, MapPin } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Carte bancaire',
    icon: '💳',
    description: 'Visa, Mastercard, American Express'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '🅿️',
    description: 'Paiement sécurisé via PayPal'
  },
  {
    id: 'bank',
    name: 'Virement bancaire',
    icon: '🏦',
    description: 'Virement bancaire direct'
  }
];

export function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { registrationData, activityType, totalPrice } = location.state || {};
  
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  // Redirect if no registration data
  useEffect(() => {
    if (!registrationData) {
      navigate('/');
    }
  }, [registrationData, navigate]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
      
      // Redirect to success page after 3 seconds
      setTimeout(() => {
        navigate('/payment-success', { 
          state: { 
            registrationData, 
            activityType, 
            totalPrice,
            bookingId: `MAR${Date.now()}`
          } 
        });
      }, 3000);
    }, 3000);
  };

  if (!registrationData) {
    return null;
  }

  if (paymentComplete) {
    return (
      <main className="pt-24 pb-20 px-4 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-amber-900 mb-2">Paiement réussi !</h2>
          <p className="text-amber-700">Redirection en cours...</p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20 px-4">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-amber-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-amber-900" />
        </button>
        <h1 className="text-2xl font-bold text-amber-900">
          Paiement
        </h1>
      </div>

      {/* Booking Summary */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-amber-900 mb-4">
          Récapitulatif de votre réservation
        </h2>
        
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
              <p className="font-medium text-amber-900">Date</p>
              <p className="text-sm text-amber-700">
                {new Date(registrationData.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="border-t border-amber-200 pt-4">
            <div className="flex justify-between text-xl font-bold text-amber-900">
              <span>Total à payer</span>
              <span>{totalPrice} Dh</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-4">
          Méthode de paiement
        </h3>
        
        <div className="space-y-3 mb-6">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-colors ${
                selectedMethod === method.id
                  ? 'border-amber-600 bg-amber-50'
                  : 'border-gray-200 hover:border-amber-200'
              }`}
            >
              <span className="text-2xl">{method.icon}</span>
              <div className="flex-1 text-left">
                <p className="font-medium text-amber-900">{method.name}</p>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ${
                selectedMethod === method.id
                  ? 'border-amber-600 bg-amber-600'
                  : 'border-gray-300'
              }`}>
                {selectedMethod === method.id && (
                  <div className="w-full h-full rounded-full bg-white scale-50" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Card Payment Form */}
        {selectedMethod === 'card' && (
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de carte
              </label>
              <input
                type="text"
                value={cardData.number}
                onChange={(e) => setCardData(prev => ({ ...prev, number: e.target.value }))}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date d'expiration
                </label>
                <input
                  type="text"
                  value={cardData.expiry}
                  onChange={(e) => setCardData(prev => ({ ...prev, expiry: e.target.value }))}
                  placeholder="MM/AA"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={cardData.cvv}
                  onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value }))}
                  placeholder="123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom sur la carte
              </label>
              <input
                type="text"
                value={cardData.name}
                onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nom complet"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>
          </form>
        )}
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 rounded-lg p-4 flex items-start gap-3 mb-6">
        <Shield className="w-5 h-5 text-green-600 mt-0.5" />
        <div>
          <p className="text-green-800 font-medium">Paiement 100% sécurisé</p>
          <p className="text-green-700 text-sm">
            Vos données bancaires sont chiffrées et protégées par SSL
          </p>
        </div>
      </div>

      {/* Payment Button */}
      <button
        onClick={selectedMethod === 'card' ? undefined : handlePayment}
        type={selectedMethod === 'card' ? 'submit' : 'button'}
        form={selectedMethod === 'card' ? undefined : undefined}
        disabled={isProcessing}
        className={`w-full py-4 rounded-xl text-lg font-medium transition-all shadow-lg ${
          isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-amber-600 hover:bg-amber-700'
        } text-white`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-5 h-5 animate-spin" />
            <span>Traitement en cours...</span>
          </div>
        ) : (
          `Payer ${totalPrice} Dh`
        )}
      </button>

      {selectedMethod === 'card' && (
        <form onSubmit={handlePayment} className="hidden">
          <button type="submit" ref={(btn) => {
            if (btn) {
              const payButton = document.querySelector('button[type="submit"]:not(.hidden)') as HTMLButtonElement;
              if (payButton) {
                payButton.onclick = (e) => {
                  e.preventDefault();
                  btn.click();
                };
              }
            }
          }} />
        </form>
      )}
    </main>
  );
}