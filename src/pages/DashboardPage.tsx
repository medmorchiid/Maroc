import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Package, CreditCard, TrendingUp, ChevronRight, Calendar, UserPlus } from 'lucide-react';
import { AffiliateQRCode } from '../components/AffiliateQRCode';

interface DashboardStat {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
}

interface Referral {
  id: number;
  name: string;
  date: string;
  commission: number;
  status: 'pending' | 'paid';
}

interface Reservation {
  id: number;
  customerName: string;
  date: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const stats: DashboardStat[] = [
  {
    title: "Filleuls actifs",
    value: "24",
    change: "+12%",
    icon: Users
  },
  {
    title: "Commandes",
    value: "156",
    change: "+23%",
    icon: Package
  },
  {
    title: "Revenus",
    value: "4,320 Dh",
    change: "+18%",
    icon: CreditCard
  },
  {
    title: "Taux de conversion",
    value: "3.2%",
    change: "+5%",
    icon: TrendingUp
  }
];

const referrals: Referral[] = [
  {
    id: 1,
    name: "Mohammed A.",
    date: "2024-03-15",
    commission: 120,
    status: 'pending'
  },
  {
    id: 2,
    name: "Sara B.",
    date: "2024-03-14",
    commission: 85,
    status: 'paid'
  },
  {
    id: 3,
    name: "Karim C.",
    date: "2024-03-13",
    commission: 230,
    status: 'pending'
  }
];

const reservations: Reservation[] = [
  {
    id: 1,
    customerName: "Ahmed M.",
    date: "2024-03-20",
    amount: 1200,
    status: 'confirmed'
  },
  {
    id: 2,
    customerName: "Fatima R.",
    date: "2024-03-22",
    amount: 850,
    status: 'pending'
  },
  {
    id: 3,
    customerName: "Youssef K.",
    date: "2024-03-25",
    amount: 1500,
    status: 'confirmed'
  }
];

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'referrals' | 'reservations'>('referrals');
  // Temporary user ID for demonstration
  const userId = 'demo123';

  return (
    <main className="pt-24 pb-20 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-amber-900 mb-2">
          Tableau de Bord
        </h1>
        <p className="text-amber-950">
          Gérez vos parrainages et réservations
        </p>
      </div>

      <div className="mb-8">
        <AffiliateQRCode userId={userId} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-4 rounded-xl shadow-md"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <Icon className="w-4 h-4 text-amber-700" />
                </div>
                <span className="text-sm text-amber-950">{stat.title}</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-xl font-bold text-amber-900">{stat.value}</span>
                <span className="text-sm text-green-600">{stat.change}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('referrals')}
            className={`flex-1 px-4 py-3 text-center font-medium ${
              activeTab === 'referrals' 
                ? 'text-amber-900 border-b-2 border-amber-900' 
                : 'text-gray-500'
            }`}
          >
            Parrainages
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={`flex-1 px-4 py-3 text-center font-medium ${
              activeTab === 'reservations' 
                ? 'text-amber-900 border-b-2 border-amber-900' 
                : 'text-gray-500'
            }`}
          >
            Réservations
          </button>
        </div>

        <div className="p-4">
          {activeTab === 'referrals' ? (
            <div className="space-y-4">
              {referrals.map((referral, index) => (
                <motion.div
                  key={referral.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-amber-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
                      <UserPlus className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-900">{referral.name}</h3>
                      <p className="text-sm text-amber-700">{referral.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-amber-900">{referral.commission} Dh</p>
                    <span className={`text-sm ${
                      referral.status === 'paid' ? 'text-green-600' : 'text-amber-600'
                    }`}>
                      {referral.status === 'paid' ? 'Payé' : 'En attente'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {reservations.map((reservation, index) => (
                <motion.div
                  key={reservation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-amber-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-900">{reservation.customerName}</h3>
                      <p className="text-sm text-amber-700">{reservation.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-amber-900">{reservation.amount} Dh</p>
                    <span className={`text-sm ${
                      reservation.status === 'confirmed' 
                        ? 'text-green-600' 
                        : reservation.status === 'pending'
                        ? 'text-amber-600'
                        : 'text-red-600'
                    }`}>
                      {reservation.status === 'confirmed' ? 'Confirmé' : 
                       reservation.status === 'pending' ? 'En attente' : 'Annulé'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}