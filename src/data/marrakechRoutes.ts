import { TreasureHunt } from '../types';

export const marrakechTreasureHunts: TreasureHunt[] = [
  {
    id: 'marrakech-medina-adventure',
    title: 'Aventure dans la Médina de Marrakech',
    description: 'Embarquez pour une aventure authentique à travers la médina de Marrakech. Découvrez les artisans, goûtez aux spécialités locales et plongez dans la culture marocaine traditionnelle.',
    difficulty: 'medium',
    duration: '4-5 heures',
    steps: [
      {
        id: 1,
        location: 'Magasin de Design',
        puzzle: 'Dans ce lieu d\'art, chaque tableau cache un métier. Cherche le symbole que je t\'ai donné 🖼️. Quand tu le trouveras, tu découvriras quel est le métier qu\'il représente.',
        enigma: {
          question: 'Quel métier représente le symbole que vous avez trouvé dans le tableau ?',
          hints: [
            'Regardez attentivement tous les tableaux du magasin',
            'Cherchez le symbole identique à celui affiché dans l\'application',
            'Chaque symbole correspond à un métier traditionnel marocain'
          ],
          correctAnswer: 'forgeron|boulanger|menuisier|potier|tisserand',
          timeLimit: 20,
          points: 100
        },
        requiredItem: 'Sac à dos récupéré',
        coordinates: {
          lat: 31.6295,
          lng: -7.9811
        }
      },
      {
        id: 2,
        location: 'Magasin de Mohammed (près de Dars Dbagh)',
        puzzle: 'Dans ton sac à dos, tu trouveras un objet ancien… mais il est incomplet. Dans ce sachet n°2, il manque une pièce de ton objet. Rends-toi au magasin de Mohammed, près de Dars Dbagh avant Talaâ. Montre-lui le sachet : il te laissera récupérer la pièce manquante.',
        enigma: {
          question: 'Une fois toutes les pièces réunies, quel est le nom de l\'artisan qui fabrique cet applicateur de khôl ?',
          hints: [
            'Assemblez d\'abord toutes les pièces de l\'objet',
            'Prenez une photo de l\'objet complet',
            'Cet artisan travaille traditionnellement le bois au tour'
          ],
          correctAnswer: 'KHARRAT',
          timeLimit: 25,
          points: 150
        },
        requiredItem: 'Sachet n°2 avec objet incomplet',
        coordinates: {
          lat: 31.6285,
          lng: -7.9825
        }
      },
      {
        id: 3,
        location: 'Café Zaytoune',
        puzzle: 'Devant le Café Zaytoune, tu rencontreras une femme appelée Aïcha. Elle te remettra un petit sac. Dans ce sac, tu devras graver ton nom ou juste la première lettre de ton prénom. Ce sac t\'accompagnera pour la suite de l\'aventure.',
        enigma: {
          question: 'Avez-vous terminé la personnalisation de votre sac avec Aïcha ?',
          hints: [
            'Trouvez Aïcha devant le Café Zaytoune',
            'Gravez votre nom ou la première lettre de votre prénom',
            'Prenez une photo de votre réalisation'
          ],
          correctAnswer: 'oui',
          timeLimit: 30,
          points: 120
        },
        requiredItem: 'Petit sac à personnaliser',
        coordinates: {
          lat: 31.6275,
          lng: -7.9835
        }
      },
      {
        id: 4,
        location: 'Pâtisserie BELKBIR',
        puzzle: 'Rendez-vous à la pâtisserie la plus célèbre de Marrakech, Pâtisserie BELKBIR, connue pour ses délicieux gâteaux marocains. Goûtez le gâteau pour l\'apprécier pleinement.',
        enigma: {
          question: 'Quand les Marocains consomment-ils la chebakia et quels sont ses ingrédients principaux ?',
          hints: [
            'Goûtez d\'abord le gâteau traditionnel',
            'Pensez aux périodes religieuses importantes',
            'Les ingrédients incluent miel, sésame et fleur d\'oranger'
          ],
          correctAnswer: 'ramadan miel sésame',
          timeLimit: 25,
          points: 130
        },
        requiredItem: 'Dégustation de chebakia',
        coordinates: {
          lat: 31.6265,
          lng: -7.9845
        }
      },
      {
        id: 5,
        location: 'Magasin Savoir et Tradition',
        puzzle: 'À côté des Jardins Secrets, tu trouveras un magasin appelé Savoir et Tradition. Ta mission : découvrir un ingrédient spécial : le kaakella et nous envoyer une photo de celui-ci.',
        enigma: {
          question: 'Où et comment les Marocains utilisent-ils le kaakella ?',
          hints: [
            'Cherchez cet ingrédient dans le magasin Savoir et Tradition',
            'Prenez une photo du kaakella',
            'Cet ingrédient est utilisé dans la cuisine traditionnelle'
          ],
          correctAnswer: 'cuisine traditionnelle tajine',
          timeLimit: 20,
          points: 140
        },
        requiredItem: 'Photo du kaakella',
        coordinates: {
          lat: 31.6255,
          lng: -7.9855
        }
      },
      {
        id: 6,
        location: 'Jemaa el-Fna (Stand n°40)',
        puzzle: 'Rendez-vous chez les préparateurs de jus à Jemaa el-Fna, stand n°40. Ils te remettront un jus mixte spécial. Ta mission : goûter le jus et identifier correctement sa composition.',
        enigma: {
          question: 'Quels fruits composent ce jus spécial ?',
          hints: [
            'Goûtez attentivement le jus',
            'Il y a trois fruits principaux',
            'L\'un des fruits est typiquement marocain'
          ],
          correctAnswer: 'Chehdia + Orange + Fraise',
          timeLimit: 15,
          points: 110
        },
        requiredItem: 'Dégustation du jus',
        coordinates: {
          lat: 31.6258,
          lng: -7.9890
        }
      },
      {
        id: 7,
        location: 'Médina (Gerrab)',
        puzzle: 'Trouve n\'importe quel gerrab dans la médina. Ta mission : Prends une photo avec lui et donne-lui 5 DH que tu as trouvés dans ton sac.',
        enigma: {
          question: 'Que vend le gerrab ?',
          mediaHints: {
            audio: 'Écoutez le cri traditionnel du gerrab',
            video: 'Découvrez l\'histoire du métier de gerrab',
            ar: 'Explorez les outils du gerrab en 3D'
          },
          qrCode: 'GERRAB_WATER',
          miniGame: {
            question: 'Le gerrab porte traditionnellement :',
            options: ['Des gobelets en métal', 'Un panier', 'Des bijoux', 'Un livre'],
            correctAnswer: 0
          },
          hints: [
            'Cherchez un homme avec des gobelets métalliques',
            'Il porte souvent un costume traditionnel',
            'Son métier est lié à la soif des passants'
          ],
          correctAnswer: 'de l\'eau fraîche',
          timeLimit: 25,
          points: 160
        },
        requiredItem: '5 DH du sac',
        coordinates: {
          lat: 31.6280,
          lng: -7.9870
        }
      }
    ]
  }
];