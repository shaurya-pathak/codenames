// src/components/HostScreen.js
import React from 'react';
import { Box, Button, Heading, Text, VStack, useClipboard } from '@chakra-ui/react';

const HostScreen = ({ gameId, playerList, onStartGame }) => {
  const { hasCopied, onCopy } = useClipboard(gameId);

  return (
    <Box minW="md" p={4} boxShadow="xl" rounded="md" bg="gray.700" color="white">
      <VStack spacing={4}>
        <Heading>Share with your friends!</Heading>
        <Text>Game ID: {gameId}</Text>
        <Button onClick={onCopy}>{hasCopied ? "Copied!" : "Copy Game ID"}</Button>
        
        <Heading size="md">Players</Heading>
        <VStack spacing={1}>
          {playerList.map((player, index) => (
            <Text key={index}>{player}</Text>
          ))}
        </VStack>

        <Button onClick={onStartGame} bg="primary">Start Game</Button>
      </VStack>
    </Box>
  );
};

export default HostScreen;
