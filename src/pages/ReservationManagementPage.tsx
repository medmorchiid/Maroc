import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Calendar, Clock, Users, MapPin, Edit, Trash2, Mail, Phone, CheckCircle, XCircle, AlertCircle, Play, Timer } from 'lucide-react';

interface Reservation {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  startTime: string;
  endTime: string;
  groupSize: number;
  activityType: 'individual' | 'group';
  status: 'confirmed' | 'pending' | 'cancelled';
  totalPrice: number;
  teams?: Team[];
  specialRequests?: string;
}

interface Team {
  id: number;
  name: string;
  members: { name: string; email: string; }[];
  routeId: string;
}

const mockReservations: Reservation[] = [
  {
    id: 'MAR1703847234',
    customerName: 'Ahmed Benali',
    email: 'ahmed.benali@email.com',
    phone: '+212 6XX XXX XXX',
    date: '2024-03-25',
    startTime: '09:00',
    endTime: '14:00',
    groupSize: 6,
    activityType: 'group',
    status: 'confirmed',
    totalPrice: 1680,
    teams: [
      {
        id: 1,
        name: 'Équipe 1',
        members: [
          { name: 'Ahmed Benali', email: 'ahmed@email.com' },
          { name: 'Sara Alami', email: 'sara@email.com' },
          { name: 'Youssef Tazi', email: 'youssef@email.com' }
        ],
        routeId: 'route-1'
      },
      {
        id: 2,
        name: 'Équipe 2',
        members: [
          { name: 'Fatima Idrissi', email: 'fatima@email.com' },
          { name: 'Omar Benjelloun', email: 'omar@email.com' },
          { name: 'Aicha Mansouri', email: 'aicha@email.com' }
        ],
        routeId: 'route-2'
      }
    ]
  },
  {
    id: 'MAR1703847235',
    customerName: 'Marie Dubois',
    email: 'marie.dubois@email.com',
    phone: '+33 6XX XXX XXX',
    date: '2024-03-26',
    startTime: '14:30',
    endTime: '19:30',
    groupSize: 1,
    activityType: 'individual',
    status: 'pending',
    totalPrice: 450
  },
  {
    id: 'MAR1703847236',
    customerName: 'Hassan Alaoui',
    email: 'hassan.alaoui@email.com',
    phone: '+212 6XX XXX XXX',
    date: '2024-03-27',
    startTime: '10:00',
    endTime: '15:00',
    groupSize: 4,
    activityType: 'group',
    status: 'confirmed',
    totalPrice: 1120
  }
];

export function ReservationManagementPage() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleStartTreasureHunt = (reservation: Reservation) => {
    navigate('/treasure-hunt', { 
      state: { 
        huntId: 'marrakech-medina-adventure',
        reservationId: reservation.id,
        customerName: reservation.customerName
      } 
    });
  };

  const filteredReservations = reservations.filter(reservation =>
    reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return CheckCircle;
      case 'pending': return AlertCircle;
      case 'cancelled': return XCircle;
      default: return AlertCircle;
    }
  };

  const handleCancelReservation = (reservationId: string) => {
    setReservations(prev =>
      prev.map(reservation =>
        reservation.id === reservationId
          ? { ...reservation, status: 'cancelled' as const }
          : reservation
      )
    );
  };

  const handleResendEmails = (reservation: Reservation) => {
    // Simulate email sending
    alert(`Emails renvoyés pour la réservation ${reservation.id}`);
  };

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
          Gestion des Réservations
        </h1>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher par nom, email ou ID..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        />
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.map((reservation, index) => {
          const StatusIcon = getStatusIcon(reservation.status);
          
          return (
            <motion.div
              key={reservation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-amber-900">
                    {reservation.customerName}
                  </h3>
                  <p className="text-sm text-gray-600">#{reservation.id}</p>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reservation.status)}`}>
                  <StatusIcon className="w-4 h-4" />
                  <span className="capitalize">{reservation.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-700" />
                  <span className="text-sm text-amber-900">
                    {new Date(reservation.date).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span className="text-sm text-amber-900">
                    {reservation.startTime} - {reservation.endTime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-700" />
                  <span className="text-sm text-amber-900">
                    {reservation.groupSize} {reservation.groupSize > 1 ? 'personnes' : 'personne'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-amber-900">
                    {reservation.totalPrice} Dh
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">{reservation.email}</span>
              </div>

              {/* Teams Display */}
              {reservation.teams && reservation.teams.length > 0 && (
                <div className="mb-4 p-3 bg-amber-50 rounded-lg">
                  <h4 className="font-medium text-amber-900 mb-2">
                    Équipes ({reservation.teams.length})
                  </h4>
                  <div className="space-y-2">
                    {reservation.teams.map((team) => (
                      <div key={team.id} className="text-sm">
                        <span className="font-medium text-amber-800">{team.name}:</span>
                        <span className="text-amber-700 ml-2">
                          {team.members.map(m => m.name).join(', ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Start Button with Countdown */}
                {reservation.status === 'confirmed' && (() => {
                  const { isActive, timeLeft } = getTimeUntilStart(reservation.date, reservation.startTime);
                  
                  return (
                    <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                      {isActive ? (
                        <button
                          onClick={() => handleStartTreasureHunt(reservation)}
                          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                          <Play className="w-5 h-5" />
                          <span>Commencer le parcours</span>
                        </button>
                      ) : (
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Timer className="w-5 h-5 text-amber-700" />
                            <span className="font-medium text-amber-900">Parcours disponible dans :</span>
                          </div>
                          <div className="text-2xl font-bold text-amber-800 mb-2">
                            {timeLeft}
                          </div>
                          <div className="text-sm text-amber-600">
                            Début programmé le {new Date(reservation.date).toLocaleDateString('fr-FR')} à {reservation.startTime}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
                
                {/* Management Buttons */}
                <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedReservation(reservation);
                    setShowEditModal(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-900 rounded-lg hover:bg-amber-200 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Modifier</span>
                </button>
                
                {reservation.status !== 'cancelled' && (
                  <button
                    onClick={() => handleCancelReservation(reservation.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-900 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Annuler</span>
                  </button>
                )}
                
                {reservation.teams && (
                  <button
                    onClick={() => handleResendEmails(reservation)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Renvoyer emails</span>
                  </button>
                )}
              </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredReservations.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucune réservation trouvée
          </h3>
          <p className="text-gray-600">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedReservation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl w-full max-w-md p-6"
          >
            <h2 className="text-xl font-bold text-amber-900 mb-4">
              Modifier la réservation
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  defaultValue={selectedReservation.date}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heure de début
                </label>
                <select
                  defaultValue={selectedReservation.startTime}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="09:00">09:00</option>
                  <option value="09:30">09:30</option>
                  <option value="10:00">10:00</option>
                  <option value="14:00">14:00</option>
                  <option value="14:30">14:30</option>
                  <option value="15:00">15:00</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  // Handle save logic here
                  setShowEditModal(false);
                }}
                className="flex-1 px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Sauvegarder
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}