import { Group } from './App';

/**
 *  é - &eacute; or \u00E9
    è - &egrave; or \u00E8
    ê - &ecirc; or \u00EA
    à - &agrave; or \u00E0
    â - &acirc; or \u00E2
    î - &icirc; or \u00EE
    ô - &ocirc; or \u00F4
    û - &ucirc; or \u00FB
    ç - &ccedil; or \u00E7
    ë - &euml; or \u00EB
    ï - &iuml; or \u00EF
    ü - &uuml; or \u00FC
    œ - &oelig; or \u0153
    æ - &aelig; or \u00E6
    « - &laquo; or \u00AB
    » - &raquo; or \u00BB
*/

export const TODAY: Group[] = [
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
