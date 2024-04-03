/**
 * This code is based on dbousamra's Connections clone: https://github.com/dbousamra/connections.
 */
import * as React from 'react';
import {
  Alert,
  AlertIcon,
  Button,
  ChakraProvider,
  Circle,
  Flex,
  HStack,
    Heading,
    ListItem,
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
import { useState } from 'react';
import useMethods from 'use-methods';
import { TODAY } from './constants.ts';

export type Group = {
  category: string;
  items: string[];
  difficulty: 1 | 2 | 3 | 4;
};

type Options = {
  groups: Group[];
};

type State = {
    groups: Group[];
    complete: Group[];
    incomplete: Group[];
    items: string[];
    activeItems: string[];
    mistakesRemaining: number;
    oneAway: boolean,
    guesses: string[][],
    alreadyGuessed: boolean,
    guessWasWrong: boolean,
    isFinished: boolean,
    emojiFromGuesses: string[],
};

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
                    if (state.incomplete.length === 0) {
                        state.isFinished = true;
                        this.getEmojiFromGuesses();
                    }
                    return
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
        console.log(state.isFinished);
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

const useGame = (options: Options) => {
    const initialState: State = {
      groups: options.groups,
    incomplete: options.groups,
    complete: [],
    items: shuffle(options.groups.flatMap((g) => g.items)),
    activeItems: [],
    mistakesRemaining: 4,
    oneAway: false,
    guesses: [],
    alreadyGuessed: false,
        guessWasWrong: false,
        isFinished: false,
        emojiFromGuesses: [],
  };

  const [state, fns] = useMethods(methods, initialState);

  return {
    ...state,
    ...fns,
  };
};

export const App = () => {
    const game = useGame({
        groups: TODAY,
    });

    const [isOpen, setIsOpen] = useState(true);
    const [isOpenResults, setIsOpenResults] = useState(true);

    const handleClose = () => setIsOpen(false);
    const handleCloseResults = () => setIsOpenResults(false);

    return (
        <ChakraProvider>
            <Flex direction="column" align="center" justify="center" minHeight="100vh">
                <Stack spacing={4} align="center">
                    <Heading size="3xl" fontFamily="Georgia" fontWeight="light" align='center'>
                        The French Connections
                    </Heading>
                    <Text fontWeight="semibold">Cr&eacute;e 4 groupes de 4 mots !</Text>
                    {game.oneAway && <Alert status='info' variant='left-accent' w={['368px', '448px', '528px', '624px']} animation={game.oneAway ? "fadeIn 0.5s ease" : "fadeOut 0.5s ease"}>
                        <AlertIcon />Presque...
                    </Alert>}
                    {game.alreadyGuessed && <Alert status='info' variant='left-accent' w={['368px', '448px', '528px', '624px']} animation={game.alreadyGuessed ? "fadeIn 0.5s ease" : "fadeOut 0.5s ease"}>
                        <AlertIcon />D&eacute;j&agrave; devin&eacute;...
                    </Alert>}
                    <Modal isOpen={isOpen} onClose={handleClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader fontWeight='bold' fontSize="2xl">R&egrave;gles du jeu</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Text fontWeight='bold'>Trouve des groupes de 4 mots qui partagent quelque chose en commun ! Un nouveau puzzle tous les lundis et vendredis.</Text>
                                <UnorderedList>
                                    <ListItem>S&eacute;lectionne 4 mots puis appuie sur le bouton "Valider" pour v&eacute;rifier si tu as raison.</ListItem>
                                    <ListItem>Trouve les groupes en faisant moins de 4 erreurs.</ListItem>
                                </UnorderedList>
                                <Text fontWeight='bold' mt='1rem'>Exemples de cat&eacute;gories :</Text>
                                <UnorderedList>
                                    <ListItem>SERPENTS : Boa, Vip&egrave;re, Crotale, Python </ListItem>
                                    <ListItem>FEU + _ : Rouge, Follet, Gr&eacute;geois, Sacr&eacute; </ListItem>
                                </UnorderedList>
                                <Text mt='1rem' mb='1rem'>Les cat&eacute;gories sont toujours plus sp&eacute;cifiques que "MOTS DE 4 LETTRES" ou "ADJECTIFS".</Text>
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
                            <Stack key={group.category} w={['368px', '448px', '528px', '624px']} h="80px" spacing={1} lineHeight={1} rounded="lg" align="center" justify="center" bg={difficultyColor(group.difficulty)} animation="fadeIn 0.75s ease">
                                <Text fontSize={["l", "xl"]} fontWeight="extrabold" textTransform="uppercase">{group.category}</Text>
                                <Text fontSize={["l", "xl"]} textTransform="uppercase">{group.items.join(', ')}</Text>
                            </Stack>
                        ))}
                        {chunk(game.items, 4).map((row, index) => (
                            <HStack key={index} justify="center" spacing={4}>
                                {row.map((item) => (
                                    <Button key={item} className={game.guessWasWrong ? 'shake-animation' : ''} w={['80px', '100px', '120px', '150px']} h="80px" bg="#efefe6" fontSize={["14px", "16px"]} fontWeight="extrabold" textTransform="uppercase" onClick={() => game.toggleActive(item)} isActive={game.activeItems.includes(item)} _active={{ bg: '#5a594e', color: 'white' }}>{item}</Button>
                                ))}
                            </HStack>
                        ))}
                    </Stack>
                    <HStack align="baseline">
                        <Text>Essais restants :</Text>
                        {[...Array(game.mistakesRemaining).keys()].map((_, index) => (
                            <Circle key={index} bg="gray.800" size="12px" />
                        ))}
                    </HStack>
                    <HStack>
                        <Button
                            colorScheme="black"
                            variant="outline"
                            rounded="full"
                            borderWidth="2px"
                            isDisabled={game.isFinished}
                            onClick={game.shuffle}
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
                        >
                            Valider
                        </Button>
                    </HStack>
                    {game.isFinished && <Modal isOpen={isOpenResults} onClose={handleCloseResults}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader fontWeight='bold' fontSize="2xl">{game.mistakesRemaining > 0 ? "R\u00E9sultats - Bravo !" : "R\u00E9sultats - Dommage..."}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Text mb='1rem'>The French Connections #1. Prochain puzzle le 08/04.</Text>
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