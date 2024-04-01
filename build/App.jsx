import { Alert, AlertIcon, Button, ChakraProvider, Circle, Flex, HStack, Heading, ListItem, Modal, ModalBody, ModalContent, ModalCloseButton, ModalHeader, ModalOverlay, Stack, Text, UnorderedList, } from '@chakra-ui/react';
import { useState } from 'react';
import useMethods from 'use-methods';
import { TODAY } from './constants';
const difficultyColor = (difficulty) => {
    return {
        1: '#fbd400',
        2: '#b5e352',
        3: '#729eeb',
        4: '#bc70c4',
    }[difficulty];
};
const chunk = (list, size) => {
    const chunkCount = Math.ceil(list.length / size);
    return new Array(chunkCount).fill(null).map((_c, i) => {
        return list.slice(i * size, i * size + size);
    });
};
const shuffle = (list) => {
    return list.sort(() => Math.random() - 0.5);
};
const methods = (state) => {
    return {
        toggleActive(item) {
            state.oneAway = false;
            if (state.activeItems.includes(item)) {
                state.activeItems = state.activeItems.filter((i) => i !== item);
            }
            else if (state.activeItems.length < 4) {
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
            for (let next_group of foundGroup) {
                console.log(next_group);
                if (next_group.matchingItems.length === 4) {
                    state.complete.push(next_group.group);
                    const incomplete = state.incomplete.filter((group) => group !== next_group.group);
                    state.incomplete = incomplete;
                    state.items = incomplete.flatMap((group) => group.items);
                    state.activeItems = [];
                    return;
                }
                else {
                    if (next_group.matchingItems.length === 3) {
                        state.oneAway = true;
                    }
                }
            }
            state.mistakesRemaining -= 1;
            state.activeItems = [];
            if (state.mistakesRemaining === 0) {
                state.complete = state.complete.concat(state.incomplete);
                state.incomplete = [];
                state.items = [];
            }
        },
    };
};
const useGame = (options) => {
    const initialState = {
        incomplete: options.groups,
        complete: [],
        items: shuffle(options.groups.flatMap((g) => g.items)),
        activeItems: [],
        mistakesRemaining: 4,
        oneAway: false,
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
    const handleClose = () => setIsOpen(false);
    return (<ChakraProvider>
        <Flex h="100vh" w="100vw" align="center" justify="center">
                <Stack spacing={4} align="center">
            <Heading size="3xl" fontFamily="Georgia" fontWeight="light">
            The French Connections
            </Heading>
                    <Text fontWeight="semibold">Cr&eacute;e 4 groupes de 4 mots !</Text>
            {game.oneAway && <Alert status='info' variant='left-accent'>
                <AlertIcon />Presque...</Alert>}
                    <Modal isOpen={isOpen} onClose={handleClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>R&egrave;gles du jeu</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Text fontWeight='bold' mb='1rem'>Trouve des groupes de 4 mots qui partagent quelque chose en commun !</Text>
                                <UnorderedList>
                                    <ListItem>S&eacute;lectionne 4 mots puis appuie sur le bouton "Valider" pour v&eacute;rifier si tu as raison.</ListItem>
                                    <ListItem>Trouve les groupes en faisant moins de 4 erreurs.</ListItem>
                                </UnorderedList>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
            <Stack>
            {game.complete.map((group) => (<Stack spacing={1} lineHeight={1} rounded="lg" align="center" justify="center" h="80px" w="624px" bg={difficultyColor(group.difficulty)}>
                <Text fontSize="xl" fontWeight="extrabold" textTransform="uppercase">
                    {group.category}
                </Text>
                <Text fontSize="xl" textTransform="uppercase">
                    {group.items.join(', ')}
                </Text>
                </Stack>))}

            {chunk(game.items, 4).map((row) => (<>
                <HStack>
                    {row.map((item) => (<Button w="150px" h="80px" bg="#efefe6" fontSize="16px" fontWeight="extrabold" textTransform="uppercase" onClick={() => game.toggleActive(item)} isActive={game.activeItems.includes(item)} _active={{
                    bg: '#5a594e',
                    color: 'white',
                }}>
                        {item}
                    </Button>))}
                </HStack>
                </>))}
            </Stack>
            <HStack align="baseline">
            <Text>Essais restants :</Text>
            {[...Array(game.mistakesRemaining).keys()].map(() => (<Circle bg="gray.800" size="12px"/>))}
            </HStack>
            <HStack>
            <Button colorScheme="black" variant="outline" rounded="full" borderWidth="2px" onClick={game.shuffle}>
                M&eacute;langer
            </Button>
            <Button colorScheme="black" variant="outline" rounded="full" borderWidth="2px" onClick={game.deselectAll}>
                D&eacute;selectionner tout
            </Button>
            <Button colorScheme="black" variant="outline" rounded="full" borderWidth="2px" isDisabled={game.activeItems.length !== 4} onClick={game.submit}>
                Valider
            </Button>
            </HStack>
        </Stack>
        </Flex>
    </ChakraProvider>);
};
