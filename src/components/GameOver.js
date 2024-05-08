// src/components/GameOver.js
import React from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

const GameOver = ({ winningTeam, currentPlayerTeam, onPlayAgain }) => {
  let message;

  if (winningTeam === 'bomb') {
    message = "The bomb has been revealed! Everyone loses!";
  } else if (winningTeam === currentPlayerTeam) {
    message = `Your team wins! Congratulations, ${winningTeam} team!`;
  } else {
    message = `Your team loses! The ${winningTeam} team wins!`;
  }

  return (
    <Box textAlign="center" p={10} bg="gray.800" color="white" borderRadius="md">
      <Heading as="h1" size="2xl" mb={4}>Game Over</Heading>
      <Text fontSize="xl" mb={4}>{message}</Text>
      <Button onClick={onPlayAgain} colorScheme="teal" size="lg">
        Play Again
      </Button>
    </Box>
  );
};

export default GameOver;
