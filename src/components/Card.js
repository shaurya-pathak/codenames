// src/components/Card.js
import React, { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';

const teamColors = {
  red: 'red.500',
  blue: 'blue.500',
  bomb: 'black',
  neutral: 'gray.400',
};

const Card = ({ word, team, revealed, currentTurn, isSpymaster, currentPlayerTeam, onCardSelected }) => {
  const [isRevealed, setIsRevealed] = useState(isSpymaster);

  useEffect(() => {
    // Update the revealed state if the parent component changes the `revealed` prop
    setIsRevealed(revealed);
  }, [revealed]);

  useEffect(() => {
    if (isSpymaster) {
      setIsRevealed(true);
    }
    else {
      setIsRevealed(false);
    }
  }, [isSpymaster]);

  const handleCardClick = () => {
    // Ensure the card is clickable only if it hasn't been revealed
    // and the current player belongs to the team whose turn it is
    if (
      !isRevealed &&
      currentPlayerTeam === currentTurn
    ) {
      setIsRevealed(true);
      onCardSelected();
    }
  };

  return (
    <Button
      height="100px"
      width="100%"
      bg={isRevealed ? teamColors[team] : 'gray.600'}
      onClick={handleCardClick}
      color="white"
      textAlign="center"
      variant="solid"
    >
      {word}
    </Button>
  );
};

export default Card;
