import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Share2 } from 'lucide-react';

interface AffiliateQRCodeProps {
  userId: string;
}

export function AffiliateQRCode({ userId }: AffiliateQRCodeProps) {
  const [copied, setCopied] = React.useState(false);
  
  const affiliateLink = `${window.location.origin}/register?ref=${userId}`;

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
        title: 'Maroc en sac à dos - Programme d\'affiliation',
        text: 'Rejoignez-moi sur Maroc en sac à dos et découvrez le Maroc autrement !',
        url: affiliateLink
      });
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-amber-900 mb-4">
        Votre lien d'affiliation
      </h2>
      
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
          Partagez ce lien et gagnez une commission de 10% sur chaque inscription !
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
  );
}