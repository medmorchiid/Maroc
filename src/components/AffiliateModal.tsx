import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Share2, X } from 'lucide-react';

interface AffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  productName: string;
}

export function AffiliateModal({ isOpen, onClose, productId, productName }: AffiliateModalProps) {
  const [copied, setCopied] = useState(false);
  
  const affiliateLink = `${window.location.origin}/shop/product/${productId}?ref=${localStorage.getItem('userId') || 'guest'}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(affiliateLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: productName,
        text: `Découvrez ${productName} sur Maroc en sac à dos`,
        url: affiliateLink
      });
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl w-full max-w-md"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-amber-900">Partager et Gagner</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-amber-50 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-amber-900" />
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="bg-amber-50 p-4 rounded-xl mb-4">
              <QRCodeSVG
                value={affiliateLink}
                size={200}
                level="H"
                className="mx-auto"
                includeMargin
              />
            </div>
            <p className="text-amber-950 mb-2">
              Partagez ce produit et gagnez une commission de 10% sur chaque vente !
            </p>
            <p className="text-sm text-gray-600">
              Le QR code et le lien contiennent automatiquement votre code de parrainage
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center justify-center gap-2 p-3 bg-amber-100 text-amber-900 rounded-lg hover:bg-amber-200 transition-colors"
            >
              <Copy className="w-5 h-5" />
              <span>{copied ? 'Lien copié !' : 'Copier le lien'}</span>
            </button>

            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 p-3 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span>Partager</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}