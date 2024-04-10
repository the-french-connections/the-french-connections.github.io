import { Group } from './App';

/**
 *  � - &eacute; or \u00E9
    � - &egrave; or \u00E8
    � - &ecirc; or \u00EA
    � - &agrave; or \u00E0
    � - &acirc; or \u00E2
    � - &icirc; or \u00EE
    � - &ocirc; or \u00F4
    � - &ucirc; or \u00FB
    � - &ccedil; or \u00E7
    � - &euml; or \u00EB
    � - &iuml; or \u00EF
    � - &uuml; or \u00FC
    � - &oelig; or \u0153
    � - &aelig; or \u00E6
    � - &laquo; or \u00AB
    � - &raquo; or \u00BB
*/

export const gr_12_04_2024: Group[] = [
    {
        category: 'Avare',
        items: ['Rat', 'Usurier', 'Pingre', 'Ladre'],
        difficulty: 1,
    },
    {
        category: 'Monnaies',
        items: ['Franc', 'Livre', 'Euro', 'Couronne'],
        difficulty: 2,
    },
    {
        category: 'Prix Nobel',
        items: ['Litt\u00E9rature', 'Paix', 'Physique', 'Chimie'],
        difficulty: 3,
    },
    {
        category: 'Lois de probabilit\u00E9',
        items: ['Poisson', 'Uniforme', 'G\u00E9om\u00E9trique', 'Normale'],
        difficulty: 4,
    },
];

export const gr_08_04_2024: Group[] = [
  {
    category: 'Roi',
    items: ['Empereur', 'Monarque', 'Prince', 'Souverain'],
    difficulty: 1,
  },
  {
    category: 'Mascottes des maisons de Poudlard',
    items: ['Blaireau', 'Lion', 'Aigle', 'Serpent'],
    difficulty: 2,
  },
  {
    category: 'Pi\u00E8ces d\'\u00E9checs',
    items: ['Fou', 'Tour', 'Cavalier', 'Dame'],
    difficulty: 3,
  },
  {
    category: 'Petits fleuves fran\u00E7ais',
    items: ['Douve', 'Loup', 'Rat', 'Rance'],
    difficulty: 4,
  },
];

export const gr_01_04_2024: Group[] = [
  {
    category: 'Pour \u00E9crire une lettre',
    items: ['Timbre', 'Feuille', 'Plume', 'Encre'],
    difficulty: 1,
  },
  {
    category: 'M\u00E9t\u00E9o agr\u00E9able',
    items: ['Cl\u00E9ment', 'Doux', 'Frais', 'Ti\u00E8de'],
    difficulty: 2,
  },
  {
    category: 'Homophones de lettres',
    items: ['D\u00E9', 'Hache', 'Eau', 'Haine'],
    difficulty: 3,
  },
  {
    category: 'Ce que \u00AB C \u00BB peut signifier',
    items: ['Do', 'Carbone', 'Cent', 'Celsius'],
    difficulty: 4,
  },
];
