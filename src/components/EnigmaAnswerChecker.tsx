import React from 'react';

interface EnigmaAnswerCheckerProps {
  stepId: number;
  userAnswer: string;
  onAnswerValidated: (isCorrect: boolean, points: number) => void;
}

export function EnigmaAnswerChecker({ stepId, userAnswer, onAnswerValidated }: EnigmaAnswerCheckerProps) {
  const validateAnswer = (answer: string, stepId: number): boolean => {
    const normalizedAnswer = answer.trim().toLowerCase();
    
    switch (stepId) {
      case 1: // Magasin de Design - Métiers
        const metiers = ['forgeron', 'boulanger', 'menuisier', 'potier', 'tisserand', 'maroquinier', 'bijoutier'];
        return metiers.some(metier => 
          normalizedAnswer.includes(metier) || metier.includes(normalizedAnswer)
        );
        
      case 2: // Applicateur de khôl
        return normalizedAnswer.includes('kharrat') || normalizedAnswer.includes('tourneur');
        
      case 3: // Personnalisation avec Aïcha
        return normalizedAnswer.includes('oui') || 
               normalizedAnswer.includes('terminé') || 
               normalizedAnswer.includes('fini') ||
               normalizedAnswer.includes('fait');
        
      case 4: // Chebakia - Pâtisserie
        const ramadanKeywords = ['ramadan', 'miel', 'sésame', 'fleur d\'oranger'];
        return ramadanKeywords.some(keyword => normalizedAnswer.includes(keyword)) &&
               ramadanKeywords.filter(keyword => normalizedAnswer.includes(keyword)).length >= 2;
        
      case 5: // Kaakella
        return (normalizedAnswer.includes('kaakella') || normalizedAnswer.includes('cardamome')) &&
               (normalizedAnswer.includes('cuisine') || 
                normalizedAnswer.includes('tajine') || 
                normalizedAnswer.includes('épice'));
        
      case 6: // Jus mystère
        return normalizedAnswer.includes('chehdia') && 
               normalizedAnswer.includes('orange') && 
               normalizedAnswer.includes('fraise');
        
      case 7: // Gerrab
        return normalizedAnswer.includes('eau') && 
               (normalizedAnswer.includes('fraîche') || normalizedAnswer.includes('froide'));
        
      default:
        return false;
    }
  };

  React.useEffect(() => {
    if (userAnswer.trim()) {
      const isCorrect = validateAnswer(userAnswer, stepId);
      const points = isCorrect ? 100 : 0;
      onAnswerValidated(isCorrect, points);
    }
  }, [userAnswer, stepId, onAnswerValidated]);

  return null; // Ce composant ne rend rien visuellement
}