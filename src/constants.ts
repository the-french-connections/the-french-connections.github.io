import { PuzzleImport } from './App';

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
    � - or \u00B7
    � - &ugrave; \u00F9
*/

export const all_puzzles : PuzzleImport[] = [
{
    puzzle_name: '8 décembre 2025 - Raclette ou rien',
	puzzle_date: new Date('2025-12-08'),
    groups: [
        {
            category: 'Bobo au pied',
            items: ['cor', 'ampoule', 'cal', 'oeil-de-perdrix'],
            difficulty: 1,
        },
        {
            category: 'A de la cire',
            items: ['Oreille', 'bougie', 'sceau', 'musée Grévin'],
            difficulty: 2,
        },
        {
            category: 'S\'allume dans la voiture',
            items: ['Phare', 'Clignotant', 'voyant', 'warning'],
            difficulty: 3,
        },
        {
            category: 'Rouge',
            items: ['Feu', 'Voir', 'alerte', 'nez'],
            difficulty: 4,
        }
    ]
},
{
    puzzle_name: '1 décembre 2025 - Ninja !',
	puzzle_date: new Date('2025-12-01'),
    groups: [
        {
            category: 'Mignon',
            items: ['Mimi', 'Chou', 'Angélique', 'Craquant'],
            difficulty: 1,
        },
        {
            category: 'Au pluriel, mensonges',
            items: ['Salade', 'histoire', 'bêtise', 'craque'],
            difficulty: 2,
        },
        {
            category: 'Nains célèbres',
            items: ['Potiron', 'Joyeux', 'Mimie Mathy', 'Passepartout'],
            difficulty: 3,
        },
        {
            category: 'Dans Cendrillon',
            items: ['Citrouille', 'Fée', 'Prince', 'Chaussure'],
            difficulty: 4,
        }
    ]
},
{
    puzzle_name: '24 novembre 2025 - Professeurs de français',
	puzzle_date: new Date('2025-11-24'),
    groups: [
        {
            category: 'Prénoms',
            items: ['Guy', 'Violette', 'Clémentine', 'Pierre'],
            difficulty: 1,
        },
        {
            category: 'Domestique',
            items: ['laquais', 'boy', 'valet', 'serviteur'],
            difficulty: 2,
        },
        {
            category: 'Les petits amis de Caroline',
            items: ['Pitou', 'Kid', 'Noiraud', 'Boum'],
            difficulty: 3,
        },
        {
            category: 'Super _',
            items: ['man', 'marché', 'nova', 'sonique'],
            difficulty: 4,
        }
    ]
}, {
    puzzle_name: '16 novembre 2025 - Chocolatine',
	puzzle_date: new Date('2025-11-16'),
    groups: [
        {
            category: 'Apéro salé',
            items: ['canapé', 'toast', 'petit-four', 'tartine'],
            difficulty: 1,
        },
        {
            category: 'Facile',
            items: ['commode', 'pratique', 'simple', 'confortable'],
            difficulty: 2,
        },
        {
            category: 'S\'accroche au mur',
            items: ['\u00E9tagère', 'tableau', 'tête de sanglier', 'patère'],
            difficulty: 3,
        },
        {
            category: 'A glace',
            items: ['patin', 'armoire', 'pic', 'bac'],
            difficulty: 4,
        }
    ]
}];

