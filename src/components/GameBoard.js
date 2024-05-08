// src/components/GameBoard.js
import React, { useEffect, useState } from 'react';
import { Grid } from '@chakra-ui/react';
import Card from './Card';

const GameBoard = ({ words, wordAssignments, currentTurn, currentPlayer, onCardSelected, teamAssignments, isSpymaster, gameOver }) => {
  const [revealedCards, setRevealedCards] = useState({});

  // Reset all cards' revealed state when the game ends
  useEffect(() => {
    if (gameOver) {
      setRevealedCards({});
    }
  }, [gameOver]);

  const handleCardClick = (word, team) => {
    setRevealedCards(prev => ({ ...prev, [word]: true }));
    onCardSelected(word, team);
  };

  const currentPlayerTeam = teamAssignments.find(player => player.name === currentPlayer)?.team;

  return (
    <Grid rounded="md" minW="750px" templateColumns="repeat(5, 1fr)" gap={4} p={4} bg="gray.700" color="white">
      {words.map((word, index) => (
        <Card
          key={index}
          word={word}
          team={wordAssignments[word] || 'neutral'}
          revealed={revealedCards[word] || false}
          currentTurn={currentTurn}
          currentPlayerTeam={currentPlayerTeam}
          onCardSelected={() => handleCardClick(word, wordAssignments[word] || 'neutral')}
          isSpymaster={isSpymaster}
        />
      ))}
    </Grid>
  );
};

export default GameBoard;
