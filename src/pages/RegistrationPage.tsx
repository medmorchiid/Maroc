import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Users, Mail, Phone, MapPin, Calendar, CreditCard, Shield, Clock, UserPlus, Shuffle } from 'lucide-react';

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  groupSize?: number;
  participantNames?: string[];
  participantEmails?: string[];
  date: string;
  startTime: string;
  specialRequests: string;
  teams?: Team[];
}

interface Team {
  id: number;
  name: string;
  members: TeamMember[];
  routeId: string;
}

interface TeamMember {
  name: string;
  email: string;
}

export function RegistrationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const activityType = location.state?.activityType || 'individual';
  
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    groupSize: activityType === 'group' ? 2 : undefined,
    participantNames: activityType === 'group' ? ['', ''] : undefined,
    participantEmails: activityType === 'group' ? ['', ''] : undefined,
    date: '',
    startTime: '09:00',
    specialRequests: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showTeamDispatch, setShowTeamDispatch] = useState(false);

  const price = activityType === 'individual' ? 450 : 280;

  const handleInputChange = (field: keyof RegistrationData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleParticipantNameChange = (index: number, name: string) => {
    if (formData.participantNames) {
      const newNames = [...formData.participantNames];
      newNames[index] = name;
      setFormData(prev => ({
        ...prev,
        participantNames: newNames
      }));
    }
  };

  const handleParticipantEmailChange = (index: number, email: string) => {
    if (formData.participantEmails) {
      const newEmails = [...formData.participantEmails];
      newEmails[index] = email;
      setFormData(prev => ({
        ...prev,
        participantEmails: newEmails
      }));
    }
  };

  const handleGroupSizeChange = (size: number) => {
    const names = Array(size).fill('');
    const emails = Array(size).fill('');
    setFormData(prev => ({
      ...prev,
      groupSize: size,
      participantNames: names,
      participantEmails: emails
    }));
  };

  const generateTeams = () => {
    if (!formData.groupSize || !formData.participantNames || !formData.participantEmails) return;
    
    const teamSize = 3; // Maximum 3 personnes par équipe
    const numTeams = Math.ceil(formData.groupSize / teamSize);
    const teams: Team[] = [];
    
    for (let i = 0; i < numTeams; i++) {
      const startIndex = i * teamSize;
      const endIndex = Math.min(startIndex + teamSize, formData.groupSize);
      
      const teamMembers: TeamMember[] = [];
      for (let j = startIndex; j < endIndex; j++) {
        if (formData.participantNames[j] && formData.participantEmails[j]) {
          teamMembers.push({
            name: formData.participantNames[j],
            email: formData.participantEmails[j]
          });
        }
      }
      
      teams.push({
        id: i + 1,
        name: `Équipe ${i + 1}`,
        members: teamMembers,
        routeId: `route-${i + 1}`
      });
    }
    
    setFormData(prev => ({ ...prev, teams }));
    setShowTeamDispatch(true);
  };

  const availableTimeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis';
    if (!formData.email.trim()) newErrors.email = 'Email requis';
    if (!formData.phone.trim()) newErrors.phone = 'Téléphone requis';
    if (!formData.date) newErrors.date = 'Date requise';

    if (activityType === 'group') {
      if (!formData.groupSize || formData.groupSize < 2) {
        newErrors.groupSize = 'Minimum 2 participants';
      }
      if (formData.participantNames?.some(name => !name.trim())) {
        newErrors.participantNames = 'Tous les noms sont requis';
      }
      if (formData.participantEmails?.some(email => !email.trim())) {
        newErrors.participantEmails = 'Tous les emails sont requis';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Calculate total price
      const totalPrice = activityType === 'group' 
        ? price * (formData.groupSize || 1)
        : price;
      
      navigate('/payment', { 
        state: { 
          registrationData: formData, 
          activityType,
          totalPrice
        } 
      });
    }
  };

  const totalPrice = activityType === 'group' 
    ? price * (formData.groupSize || 1)
    : price;

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
          Inscription
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          {activityType === 'individual' ? (
            <User className="w-6 h-6 text-amber-700" />
          ) : (
            <Users className="w-6 h-6 text-amber-700" />
          )}
          <h2 className="text-xl font-semibold text-amber-900">
            {activityType === 'individual' ? 'Aventure Individuelle' : 'Aventure en Groupe'}
          </h2>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg">
          <p className="text-amber-900 font-medium">
            Prix: {price} Dh par personne
          </p>
          {activityType === 'group' && (
            <p className="text-amber-700 text-sm mt-1">
              Total: {totalPrice} Dh pour {formData.groupSize || 0} participants
            </p>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
            <MapPin className="w-5 h-5 text-amber-700" />
            <div>
              <p className="font-medium text-amber-900">Aventure dans la Médina de Marrakech</p>
              <p className="text-sm text-amber-700">Marrakech, Médina</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Informations personnelles
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prénom *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Votre prénom"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Votre nom"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="votre@email.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone *
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+212 6XX XXX XXX"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Group Information */}
        {activityType === 'group' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Informations du groupe
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de participants *
              </label>
              <select
                value={formData.groupSize || ''}
                onChange={(e) => handleGroupSizeChange(parseInt(e.target.value))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                  errors.groupSize ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Sélectionnez</option>
                {[2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num} personnes</option>
                ))}
              </select>
              {errors.groupSize && (
                <p className="text-red-500 text-sm mt-1">{errors.groupSize}</p>
              )}
            </div>

            {formData.participantNames && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Noms des participants *
                </label>
                <div className="space-y-3">
                  {formData.participantNames.map((name, index) => (
                    <div key={index} className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => handleParticipantNameChange(index, e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder={`Nom participant ${index + 1}`}
                      />
                      <input
                        type="email"
                        value={formData.participantEmails?.[index] || ''}
                        onChange={(e) => handleParticipantEmailChange(index, e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder={`Email participant ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
                {errors.participantNames && (
                  <p className="text-red-500 text-sm mt-1">{errors.participantNames}</p>
                )}
                {errors.participantEmails && (
                  <p className="text-red-500 text-sm mt-1">{errors.participantEmails}</p>
                )}
                
                {formData.groupSize && formData.groupSize > 3 && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                      <Shuffle className="w-5 h-5" />
                      Dispatching automatique en équipes
                    </h4>
                    <p className="text-blue-800 text-sm mb-3">
                      Votre groupe sera automatiquement divisé en équipes de 3 personnes maximum. 
                      Chaque équipe recevra un parcours personnalisé par email.
                    </p>
                    <button
                      type="button"
                      onClick={generateTeams}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <UserPlus className="w-4 h-4" />
                      Générer les équipes
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Team Dispatch Display */}
        {showTeamDispatch && formData.teams && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Équipes générées ({formData.teams.length})
            </h3>
            
            <div className="space-y-4">
              {formData.teams.map((team) => (
                <div key={team.id} className="p-4 bg-amber-50 rounded-lg">
                  <h4 className="font-medium text-amber-900 mb-2">{team.name}</h4>
                  <div className="space-y-2">
                    {team.members.map((member, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <div className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center">
                          <span className="text-amber-900 font-medium">{index + 1}</span>
                        </div>
                        <span className="text-amber-900">{member.name}</span>
                        <span className="text-amber-700">({member.email})</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-amber-600 mt-2">
                    📧 Parcours personnalisé envoyé par email
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-green-800 text-sm">
                ✅ Chaque équipe recevra un lien unique pour télécharger l'application et commencer son parcours personnalisé.
              </p>
            </div>
          </div>
        )}

        {/* Booking Details */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Détails de la réservation
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date souhaitée *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Heure de début *
            </label>
            <select
              value={formData.startTime}
              onChange={(e) => handleInputChange('startTime', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              {availableTimeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            <p className="text-sm text-amber-700 mt-1">
              ⏰ Durée du parcours : 5 heures (fin automatique)
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
              <Clock className="w-5 h-5 text-amber-700" />
              <div>
                <p className="font-medium text-amber-900">Horaires</p>
                <p className="text-sm text-amber-700">
                  Début : {formData.startTime} - Fin automatique après 5h
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
              <MapPin className="w-5 h-5 text-amber-700" />
              <div>
                <p className="font-medium text-amber-900">Point de départ</p>
                <p className="text-sm text-amber-700">
                  Collège Mohammed V, Riad Laarouss
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Demandes spéciales (optionnel)
            </label>
            <textarea
              value={formData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Allergies, besoins spéciaux, préférences..."
            />
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-amber-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Récapitulatif
          </h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-amber-900">
                {activityType === 'individual' ? 'Aventure individuelle' : `Aventure groupe (${formData.groupSize || 0} pers.)`}
              </span>
              <span className="font-medium text-amber-900">{totalPrice} Dh</span>
            </div>
            {formData.teams && formData.teams.length > 1 && (
              <div className="flex justify-between text-sm">
                <span className="text-amber-700">
                  Dispatching en {formData.teams.length} équipes
                </span>
                <span className="text-amber-700">Inclus</span>
              </div>
            )}
            <div className="border-t border-amber-200 pt-2">
              <div className="flex justify-between text-lg font-bold text-amber-900">
                <span>Total</span>
                <span>{totalPrice} Dh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-green-50 rounded-lg p-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <p className="text-green-800 font-medium">Paiement sécurisé</p>
            <p className="text-green-700 text-sm">
              Vos informations sont protégées et le paiement est entièrement sécurisé
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-amber-600 text-white py-4 rounded-xl text-lg font-medium hover:bg-amber-700 transition-colors shadow-lg"
        >
          Procéder au paiement - {totalPrice} Dh
        </button>
      </form>
    </main>
  );
}