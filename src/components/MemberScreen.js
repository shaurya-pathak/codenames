// src/components/MemberScreen.js
import React from 'react';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';

const MemberScreen = ({ gameId, hostName, playerList }) => {
  return (
    <Box minW="md" p={4} boxShadow="xl" rounded="md" bg="gray.700" color="white">
      <VStack spacing={4}>
        <Heading>Member Screen</Heading>
        <Text>Game ID: {gameId}</Text>
        <Text>Host: {hostName}</Text>
        <Heading size="md">Players</Heading>
        <VStack spacing={1}>
          {playerList.map((player, index) => (
            <Text key={index}>{player}</Text>
          ))}
        </VStack>
        <Button bg="secondary">Ready Up</Button>
      </VStack>
    </Box>
  );
};

export default MemberScreen;
