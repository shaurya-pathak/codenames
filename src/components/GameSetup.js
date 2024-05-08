// src/components/GameSetup.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
  VStack,
} from '@chakra-ui/react';

const GameSetup = ({ onJoin, onCreate }) => {
  const [playerName, setPlayerName] = useState('');
  const [gameId, setGameId] = useState('');
  const toast = useToast();

  const handleCreateGame = () => {
    if (playerName.trim() === '') {
      toast({
        title: "Error",
        description: "Please enter your name.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    onCreate(playerName);
  };

  const handleJoinGame = () => {
    if (playerName.trim() === '' || gameId.trim() === '') {
      toast({
        title: "Error",
        description: "Please enter your name and a game ID to join.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    onJoin(gameId, playerName);
  };

  return (
    <Box minW="md" p={4} rounded="md" bg="gray.700" color="white">
      <Tabs isFitted variant="enclosed-colored">
        <TabList mb={4}>
          <Tab _selected={{ bg: 'primary', color: 'white' }} _hover={{ bg: 'gray.600', color: 'white' }} color="black">Create Game</Tab>
          <Tab _selected={{ bg: 'secondary', color: 'white' }} _hover={{ bg: 'gray.600', color: 'white' }} color="black">Join Game</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack spacing={4}>
              <Input
                placeholder="Enter Your Name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                bg="gray.600"
                color="white"
              />
              <Button bg="primary" onClick={handleCreateGame} color="white">Create New Game</Button>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4}>
              <Input
                placeholder="Enter Your Name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                bg="gray.600"
                color="white"
              />
              <Input
                placeholder="Enter Game ID"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                bg="gray.600"
                color="white"
              />
              <Button bg="secondary" onClick={handleJoinGame} color="white">Join Game</Button>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default GameSetup;
