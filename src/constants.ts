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
