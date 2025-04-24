/**
 * This code is partially based on dbousamra's Connections clone: https://github.com/dbousamra/connections.
 */
import * as React from 'react';
import {
  Alert,
  AlertTitle,
  Button,
    ChakraProvider,
  Circle,
  Flex,
  HStack,
    Heading,
    ListItem,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Modal,
    ModalBody,
    ModalContent,
    ModalCloseButton,
    ModalHeader,
    ModalOverlay,
  Stack,
    Text,
    UnorderedList,
} from '@chakra-ui/react';
import {
    ChevronDownIcon,
    StarIcon,
} from '@chakra-ui/icons';
import { useState, useRef, useEffect } from 'react';
import useMethods from 'use-methods';
import { gr_28_04_2025, gr_21_04_2025, gr_14_04_2025, gr_07_04_2025, gr_01_04_2025, gr_24_03_2025, gr_10_03_2025, gr_24_02_2025, gr_17_02_2025, gr_10_02_2025, gr_03_02_2025, gr_27_01_2025, gr_20_01_2025, gr_13_01_2025, gr_06_01_2025, gr_25_12_2024, gr_16_12_2024, gr_09_12_2024, gr_02_12_2024, gr_25_11_2024, gr_18_11_2024, gr_11_11_2024, gr_04_11_2024, gr_23_08_2024, gr_16_08_2024, gr_12_08_2024, gr_09_08_2024, gr_05_08_2024, gr_02_08_2024, gr_29_07_2024, gr_26_07_2024, gr_22_07_2024, gr_19_07_2024, gr_15_07_2024, gr_12_07_2024, gr_08_07_2024, gr_05_07_2024, gr_01_07_2024, gr_28_06_2024, gr_24_06_2024, gr_21_06_2024, gr_19_06_2024, gr_17_06_2024, gr_14_06_2024, gr_10_06_2024, gr_07_06_2024, gr_03_06_2024, gr_31_05_2024, gr_27_05_2024, gr_20_05_2024, gr_17_05_2024, gr_13_05_2024, gr_10_05_2024, gr_08_05_2024, gr_06_05_2024, gr_03_05_2024, gr_01_05_2024, gr_29_04_2024, gr_26_04_2024, gr_24_04_2024, gr_22_04_2024, gr_19_04_2024, gr_12_04_2024, gr_08_04_2024, gr_01_04_2024 } from './constants.ts'; //TOCHANGE

export type Group = {
  category: string;
  items: string[];
  difficulty: 1 | 2 | 3 | 4;
};

export type PuzzleImport = {
    puzzle_name: string;
    puzzle_difficulty: number;
    groups: Group[];
};


type Options = {
  groups: Group[];
};

type State = {
    difficulty: number,//Current puzzle's difficulty
    groups: Group[];//List of current puzzle groups
    complete: Group[];//All completed groups
    incomplete: Group[];//All non-completed groups
    items: string[];
    activeItems: string[];//Items currently selected
    mistakesRemaining: number;//Number of mistakes remaining
    oneAway: boolean,//Whether current guess is "One away" (3 out of 4 words in a category)
    guesses: string[][],//History of all guesses
    discoveredCategories: number[],//Store the order of discovered categories (only used to check if the guess is "perfect" (yellow -> purple), "reverse perfect" (purple -> yellow)...)
    alreadyGuessed: boolean,//Whether current guess was already guessed
    guessWasWrong: boolean,//Whether current guess was wrong
    isFinished: boolean,//Whether the game ended
    emojiFromGuesses: string[],//Store the value of guesses as emojis (colored circles)
    current_name: string,//Current puzzle's name
};

// Assign a color for each level of difficulty
const difficultyColor = (difficulty: 1 | 2 | 3 | 4): string => {
  return {
    1: '#fbd400',
    2: '#b5e352',
    3: '#729eeb',
    4: '#bc70c4',
  }[difficulty];
};

const chunk = <T,>(list: T[], size: number): T[][] => {
  const chunkCount = Math.ceil(list.length / size);
  return new Array(chunkCount).fill(null).map((_c: null, i: number) => {
    return list.slice(i * size, i * size + size);
  });
};

const shuffle = <T,>(list: T[]): T[] => {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
};

const methods = (state: State) => {
    return {
        update(newPuzzle: PuzzleImport) {
            state.difficulty = newPuzzle.groups.puzzle_difficulty;
            state.groups = newPuzzle.groups.groups;
            state.incomplete = newPuzzle.groups.groups;
            state.complete= [];
            state.items = shuffle(newPuzzle.groups.groups.flatMap((g) => g.items));
            state.activeItems = [];
            state.mistakesRemaining = 4;
            state.oneAway = false;
            state.guesses = [];
            state.discoveredCategories = [];
            state.alreadyGuessed = false;
            state.guessWasWrong = false;
            state.isFinished = false;
            state.emojiFromGuesses = [];
            state.current_name = newPuzzle.groups.puzzle_name;
        },

    toggleActive(item: string) {
        state.guessWasWrong = false;
        state.oneAway = false;
        state.alreadyGuessed = false;
        if (state.activeItems.includes(item)) {
        state.activeItems = state.activeItems.filter((i) => i !== item);
        } else if (state.activeItems.length < 4) {
        state.activeItems.push(item);
        }
    },

    shuffle() {
      shuffle(state.items);
    },

    deselectAll() {
      state.activeItems = [];
    },

    submit() {
        const foundGroup = state.incomplete.map((group) => ({
            group,
            matchingItems: group.items.filter((item) => state.activeItems.includes(item))
        }));
        
        const currentGuesses :string[] = [];
        for (let next_group of foundGroup) {
            if (next_group.matchingItems.length > 0) {
                for (let next_item of next_group.matchingItems) {
                    currentGuesses.push(next_item);
                }
            }
        }

        // If it was already guessed, push the alarm, if not store the guess
        for (let guess of state.guesses) {
            const sortedArr1 = guess.slice().sort();
            const sortedArr2 = currentGuesses.slice().sort();
            if (JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2)) {
                state.alreadyGuessed = true;
                break;
            }
        }
        if (!state.alreadyGuessed) {
            state.guesses.push(currentGuesses);

            for (let next_group of foundGroup) {
                if (next_group.matchingItems.length === 4) {
                    state.complete.push(next_group.group);
                    const incomplete = state.incomplete.filter((group) => group !== next_group.group);
                    state.incomplete = incomplete;
                    state.items = state.items.filter(item => !next_group.matchingItems.includes(item));//incomplete.flatMap((group) => group.items);
                    state.activeItems = [];
                    state.discoveredCategories.push(next_group.group.difficulty);

                    // Check if all categories were discovered. If yes, this is the end!
                    if (state.incomplete.length === 0) {
                        state.isFinished = true;
                        this.getEmojiFromGuesses();
                    }
                    return;
                } else {
                    if (next_group.matchingItems.length === 3) {
                        state.oneAway = true;
                    }
                }
            }

            state.guessWasWrong = true;
            state.mistakesRemaining -= 1;
        }

        state.activeItems = [];

        if (state.mistakesRemaining === 0) {
            state.complete = state.complete.concat(state.incomplete);
            state.incomplete = [];
            state.items = [];
            state.isFinished = true;
            this.getEmojiFromGuesses();
        }
    },

        getEmojiFromGuesses() {
            for (const guessList of state.guesses) {
                for (const guess of guessList) {
                    for (const grp of state.groups) {
                        if (grp.items.includes(guess)) {
                            switch (grp.difficulty) {
                                case 1:
                                    state.emojiFromGuesses.push('&#128993;');
                                    break;
                                case 2:
                                    state.emojiFromGuesses.push('&#128994;');
                                    break;
                                case 3:
                                    state.emojiFromGuesses.push('&#128309;');
                                    break;
                                case 4:
                                    state.emojiFromGuesses.push('&#128995;');
                                    break;
                                default:
                                    state.emojiFromGuesses.push('&#9633;');
                                    break;
                            }
                        }
                    }
                }
            }
        },
  };
};

const useGame = (options: Options, difficulty: number, current_name: string) => {
    const initialState: State = {
        difficulty: difficulty,
        groups: options.groups,
        incomplete: options.groups,
        complete: [],
        items: shuffle(options.groups.flatMap((g) => g.items)),
        activeItems: [],
        mistakesRemaining: 4,
        oneAway: false,
        guesses: [],
        discoveredCategories: [],
        alreadyGuessed: false,
        guessWasWrong: false,
        isFinished: false,
        emojiFromGuesses: [],
        current_name: current_name,
    };

    const [state, fns] = useMethods(methods, initialState);

    return {
    ...state,
    ...fns,
    };
};

export const App = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const isNextPuzzle = currentMonth > 4 || (currentMonth === 4 && currentDay >= 28); //TOCHANGE


    const current_puzzle = isNextPuzzle ? gr_28_04_2025 : gr_21_04_2025; //TOCHANGE
    const ending_text = isNextPuzzle ? "The French Connections #65. Prochain puzzle lundi prochain." : "The French Connections #64. Prochain puzzle lundi prochain."; //TOCHANGE
    const all_groups_name = isNextPuzzle ? [gr_28_04_2025, gr_21_04_2025, gr_14_04_2025, gr_07_04_2025, gr_01_04_2025, gr_24_03_2025, gr_10_03_2025, gr_24_02_2025, gr_17_02_2025, gr_10_02_2025, gr_03_02_2025, gr_27_01_2025, gr_20_01_2025, gr_13_01_2025, gr_06_01_2025, gr_25_12_2024, gr_16_12_2024, gr_09_12_2024, gr_02_12_2024, gr_25_11_2024, gr_18_11_2024, gr_11_11_2024, gr_04_11_2024, gr_23_08_2024, gr_16_08_2024, gr_12_08_2024, gr_09_08_2024, gr_05_08_2024, gr_02_08_2024, gr_29_07_2024, gr_26_07_2024, gr_22_07_2024, gr_19_07_2024, gr_15_07_2024, gr_12_07_2024, gr_08_07_2024, gr_05_07_2024, gr_01_07_2024, gr_28_06_2024, gr_24_06_2024, gr_21_06_2024, gr_19_06_2024, gr_17_06_2024, gr_14_06_2024, gr_10_06_2024, gr_07_06_2024, gr_03_06_2024, gr_31_05_2024, gr_27_05_2024, gr_20_05_2024, gr_17_05_2024, gr_13_05_2024, gr_10_05_2024, gr_08_05_2024, gr_06_05_2024, gr_03_05_2024, gr_01_05_2024, gr_29_04_2024, gr_26_04_2024, gr_24_04_2024, gr_22_04_2024, gr_19_04_2024, gr_12_04_2024, gr_08_04_2024, gr_01_04_2024] :
        [gr_21_04_2025, gr_14_04_2025, gr_07_04_2025, gr_01_04_2025, gr_24_03_2025, gr_10_03_2025, gr_24_02_2025, gr_17_02_2025, gr_10_02_2025, gr_03_02_2025, gr_27_01_2025, gr_20_01_2025, gr_13_01_2025, gr_06_01_2025, gr_25_12_2024, gr_16_12_2024, gr_09_12_2024, gr_02_12_2024, gr_25_11_2024, gr_18_11_2024, gr_11_11_2024, gr_04_11_2024, gr_23_08_2024, gr_12_08_2024, gr_09_08_2024, gr_05_08_2024, gr_02_08_2024, gr_29_07_2024, gr_26_07_2024, gr_22_07_2024, gr_19_07_2024, gr_15_07_2024, gr_12_07_2024, gr_08_07_2024, gr_05_07_2024, gr_01_07_2024, gr_28_06_2024, gr_24_06_2024, gr_21_06_2024, gr_19_06_2024, gr_17_06_2024, gr_14_06_2024, gr_10_06_2024, gr_07_06_2024, gr_03_06_2024, gr_31_05_2024, gr_27_05_2024, gr_20_05_2024, gr_17_05_2024, gr_13_05_2024, gr_10_05_2024, gr_08_05_2024, gr_06_05_2024, gr_03_05_2024, gr_01_05_2024, gr_29_04_2024, gr_26_04_2024, gr_24_04_2024, gr_22_04_2024, gr_19_04_2024, gr_12_04_2024, gr_08_04_2024, gr_01_04_2024];

    const game = useGame({
        groups: current_puzzle.groups,
    },
        current_puzzle.puzzle_difficulty,
        current_puzzle.puzzle_name
    );

    const handleMenuItemClick = (puzzleImport: PuzzleImport) => {
        game.update({
            groups: puzzleImport,
        });
        setIsOpenResults(true);
    };

    const [isOpenRules, setIsOpenRules] = useState(true);
    const [isOpenResults, setIsOpenResults] = useState(true);

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const selectedItemRef = useRef(null);
  const menuListRef = useRef(null);
  
  // Trouver l'index de l'élément actuellement sélectionné
  const currentIndex = all_groups_name.findIndex(
    (item) => item.puzzle_name === game.current_name
  );
  
  useEffect(() => {
    // Quand le menu s'ouvre, faire défiler jusqu'à l'élément sélectionné
    if (isOpenDropdown && selectedItemRef.current && menuListRef.current) {
      setTimeout(() => {
        selectedItemRef.current.scrollIntoView({ 
          behavior: 'auto',
          block: 'center'
        });
      }, 100); // Petit délai pour s'assurer que le menu est complètement rendu
    }
  }, [isOpenDropdown]);

    const handleCloseRules = () => setIsOpenRules(false);
    const handleCloseResults = () => setIsOpenResults(false);

    const containsHtmlTags = (str) => /<[^>]*>/g.test(str);

    return (
        <ChakraProvider>
            <Flex direction="column" align="center" justify="center" minHeight="100vh">
                <Stack spacing={4} align="center">
                    <Heading size={["xl", "2xl", "3xl"]} fontFamily="Georgia" fontWeight="light" align='center'>
                        The French Connections
                    </Heading>
                    <Text fontWeight="semibold">Cr&eacute;e 4 groupes de 4 mots !</Text>
                    <HStack align="baseline">
                        <Menu isOpen={isOpenDropdown} onOpen={() => setIsOpenDropdown(true)} onClose={() => setIsOpenDropdown(false)}>
                            {({ isOpen }) => (
                                <>
                                    <MenuButton size={['sm', 'md', 'lg']} isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                                        {game.current_name}
                                    </MenuButton>
                                    <MenuList ref={menuListRef}
                                        fontSize={["xs", "s", "md"]}
                                        maxHeight="300px" // Set a max height
                                        overflowY="auto"   // Enable vertical scrolling
                                    >
                                        {all_groups_name.map((puzzleImport: PuzzleImport, index) => (
                                            <MenuItem key={index} ref={index === currentIndex ? selectedItemRef : null} onClick={() => handleMenuItemClick(puzzleImport)} backgroundColor={index === currentIndex ? "blue.100" : ""} fontWeight={index === currentIndex ? "bold" : "normal"}>
                                                {puzzleImport.puzzle_name}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </>
                            )}
                        </Menu>

                        {current_puzzle.puzzle_name != game.current_name && [...Array(5).keys()].map((_, index) => (
                            index < game.difficulty ? (
                                <StarIcon key={index} boxSize={['0.75em', '1em', '1.25em']} color="yellow.500" />
                            ) : (
                                    <StarIcon key={index} boxSize={['0.75em', '1em', '1.25em']} color="gray.300" />
                            )
                        ))}
                    </HStack>
                    {game.oneAway && <Alert status='info' variant='left-accent' w={['344px', '438px', '528px', '624px']} animation={game.oneAway ? "fadeIn 0.5s ease" : "fadeOut 0.5s ease"}>
                        <AlertTitle align='center' fontSize={["xs", "s", "md"]}>Presque...</AlertTitle>
                    </Alert>}
                    {game.alreadyGuessed && <Alert status='info' variant='left-accent' w={['344px', '438px', '528px', '624px']} animation={game.alreadyGuessed ? "fadeIn 0.5s ease" : "fadeOut 0.5s ease"}>
                        <AlertTitle align='center' fontSize={["xs", "s", "md"]}>D&eacute;j&agrave; devin&eacute;...</AlertTitle>
                    </Alert>}
                    <Modal isOpen={isOpenRules} onClose={handleCloseRules}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader fontWeight='bold' fontSize="2xl">R&egrave;gles du jeu</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Text fontWeight='bold'>Trouve des groupes de 4 mots qui partagent quelque chose en commun ! Un nouveau puzzle tous les lundis.</Text>
                                <UnorderedList>
                                    <ListItem>S&eacute;lectionne 4 mots puis appuie sur le bouton "Valider" pour v&eacute;rifier si tu as raison.</ListItem>
                                    <ListItem>Trouve les groupes en faisant moins de 4 erreurs.</ListItem>
                                </UnorderedList>
                                <Text fontWeight='bold' mt='1rem'>Exemples de cat&eacute;gories :</Text>
                                <UnorderedList>
                                    <ListItem>SERPENTS : Boa, Vip&egrave;re, Crotale, Python </ListItem>
                                    <ListItem>FEU + _ : Rouge, Follet, Gr&eacute;geois, Sacr&eacute; </ListItem>
                                </UnorderedList>
                                <Text mt='1rem' mb='1rem'>Les cat&eacute;gories sont toujours plus sp&eacute;cifiques que "MOTS DE 4 LETTRES" ou "ADJECTIFS". Pour les trouver, tu peux t'aider d'Internet, d'un dictionnaire ou le faire &agrave; plusieurs, le principal &eacute;tant que tu t'amuses.</Text>
                                <Text mb='1rem'>Chaque puzzle a une unique solution. Attention aux pi&egrave;ges... Chaque groupe correspond &agrave; une couleur : </Text>
                                <UnorderedList mb='1rem'>
                                    <ListItem>&#128993; : Facile</ListItem>
                                    <ListItem>&#128994; : Moyen</ListItem>
                                    <ListItem>&#128309; : Difficile</ListItem>
                                    <ListItem>&#128995; : Tr&egrave;s difficile</ListItem>
                                </UnorderedList>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                    <Stack maxWidth="624px">
                        {game.complete.map((group: Group) => (
                            <Stack key={group.category} w={['344px', '438px', '528px', '624px']} h={["56px", "64px", "72px", "80px"]} spacing={1} lineHeight={1} rounded="lg" align="center" justify="center" bg={difficultyColor(group.difficulty)} animation="appearFromCenter 0.75s ease forwards">
                                <Text fontSize={group.category.length > 45 ? ["xs", "xs", "sm", "md"] : group.category.length > 35 ? ["xs", "sm", "lg", "xl"] : ["sm", "md", "lg", "xl"]} fontWeight="extrabold" textTransform="uppercase">{group.category}</Text>
                                <Text fontSize={["sm", "md", "l", "xl"]} textTransform="uppercase">
                                    {containsHtmlTags(group.items[0]) ? (
                                            group.items.map((item) => (
                                                <span style={{ display: 'inline-block' }} dangerouslySetInnerHTML={{ __html: item }} />
                                            ))
                                    ) : (
                                       group.items.join(', ')
                                    )}
                                </Text>
                            </Stack>
                        ))}
                        {chunk(game.items, 4).map((row, index) => (
                            <HStack key={index} justify="center" spacing={[2, 3, 4]}>
                                {row.map((item) => (
                                    <Button key={item} className={game.guessWasWrong ? 'shake-animation' : ''} style={{ whiteSpace: "pre-line" }} w={['80px', '100px', '120px', '150px']} h={["56px", "64px", "72px", "80px"]} bg="#efefe6" fontSize={
                                        !item.includes('\n') && !item.includes('<a') && item.length > 17
                                            ? ["5.75px", "7px", "9px", "10px"]
                                            : item.includes('\n') || item.length > 12
                                                ? ["7.75px", "10.25px", "12.5px", "14px"]
                                                : ["9.5px", "12px", "14px", "16px"]
                                    } fontWeight="extrabold" textTransform="uppercase" onClick={() => game.toggleActive(item)} isActive={game.activeItems.includes(item)} _active={{ bg: '#5a594e', color: 'white' }} animation={game.guessWasWrong ? "shake 0.5s ease" : ""}>
                                        {containsHtmlTags(item) ? (
                                            <span dangerouslySetInnerHTML={{ __html: item }} />
                                        ) : (
                                            item
                                        )}
                                    </Button>
                                ))}
                            </HStack>
                        ))}
                    </Stack>
                    <HStack align="baseline">
                        <Text fontSize={["14px", "16px"]}>Essais restants :</Text>
                        {[...Array(4).keys()].map((_, index) => (
                            index < game.mistakesRemaining ? (
                                <Circle key={index} bg="gray.800" size="12px" />
                            ) : (
                                    <Circle key={index} bg="gray.300" size="12px" />
                            )
                        ))}
                    </HStack>
                    <HStack padding="1em">
                        <Button
                            colorScheme="black"
                            variant="outline"
                            rounded="full"
                            borderWidth="2px"
                            isDisabled={game.isFinished}
                            onClick={game.shuffle}
                            fontSize={["14px", "16px"]}
                            h={["30px", "40px"]}
                        >
                            M&eacute;langer
                        </Button>
                        <Button
                            colorScheme="black"
                            variant="outline"
                            rounded="full"
                            borderWidth="2px"
                            isDisabled={game.activeItems.length <= 0}
                            onClick={game.deselectAll}
                            fontSize={["14px", "16px"]}
                            h={["30px", "40px"]}
                        >
                            D&eacute;selectionner tout
                        </Button>
                        <Button
                            colorScheme="black"
                            variant="outline"
                            rounded="full"
                            borderWidth="2px"
                            isDisabled={game.activeItems.length !== 4}
                            onClick={game.submit}
                            fontSize={["14px", "16px"]}
                            h={["30px", "40px"]}
                        >
                            Valider
                        </Button>
                    </HStack>
                    {game.isFinished && <Modal isOpen={isOpenResults} onClose={handleCloseResults}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader fontWeight='bold' fontSize="2xl">
                                {game.mistakesRemaining === 4 && JSON.stringify(game.discoveredCategories) === JSON.stringify([4, 3, 2, 1]) ? "R\u00E9sultats : Arc-en-ciel invers\u00E9 !!" :
                                    game.mistakesRemaining === 4 && JSON.stringify(game.discoveredCategories) === JSON.stringify([1,2,3,4]) ? "R\u00E9sultats : Arc-en-ciel !" :
                                        game.mistakesRemaining === 4 ? "R\u00E9sultats - Parfait !" :
                                            game.mistakesRemaining === 3 ? "R\u00E9sultats - Incroyable !" :
                                                game.mistakesRemaining === 2 ? "R\u00E9sultats - Bravo !" :
                                                    game.mistakesRemaining === 1 ? "R\u00E9sultats - Bien !" : "Résultats - Dommage..."}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                {current_puzzle.puzzle_name == game.current_name && <Text mb='1rem'>{ending_text}</Text>}
                                <Text fontSize='4xl' align='center'>
                                {game.emojiFromGuesses.map((emoji: string, index: number) => (
                                    <React.Fragment key={index}>
                                        {String.fromCodePoint(parseInt(emoji.substring(2)))}
                                        {(index + 1) % 4 === 0 && <Text>{"\n"}</Text>}
                                    </React.Fragment>
                                ))}
                                </Text>
                            </ModalBody>
                        </ModalContent>
                    </Modal>}
                </Stack>
            </Flex>
        </ChakraProvider>
    );
};