export interface Enigma {
  question: string;
  mediaHints?: {
    audio: string;
    video: string;
    ar: string;
  };
  qrCode?: string;
  miniGame?: {
    question: string;
    options: string[];
    correctAnswer: number;
  };
  hints: string[];
  correctAnswer: string;
  timeLimit: number; // in minutes
  points: number;
}

export interface TreasureHuntStep {
  id: number;
  location: string;
  puzzle: string;
  enigma: Enigma;
  requiredItem: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface TreasureHunt {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  steps: TreasureHuntStep[];
}