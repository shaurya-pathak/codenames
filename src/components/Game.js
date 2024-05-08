// src/components/Game.js
import React, {useState} from 'react';
import { Grid, GridItem, Box, Button, Text } from '@chakra-ui/react';
import TeamRoles from './TeamRoles';
import GameBoard from './GameBoard';
import GameOver from './GameOver';

const Game = ({
  redSpymaster,
  blueSpymaster,
  teamAssignments,
  currentPlayer,
  currentTurn, // Pass in the active team's name (e.g., 'red' or 'blue')
  onSubmitAction, // Add this callback for submission handling
  onJoinRedSpymaster,
  onJoinRedOperative,
  onJoinBlueSpymaster,
  onJoinBlueOperative,
  setRedSpymaster,
  setBlueSpymaster,
  words, // Pass the words from parent (App.js)
  wordAssignments, // Pass the word assignments from parent (App.js)
  setCurrentTurn, // Add this callback to update the current turn
  initializeWordAssignments, // Add this callback to initialize word assignments
}) => {
  // Filter out the red and blue teams based on assignments
  const redTeam = teamAssignments.filter(player => player.team === 'red' && player.name !== redSpymaster);
  const blueTeam = teamAssignments.filter(player => player.team === 'blue' && player.name !== blueSpymaster);

  // Check if the current player can interact with the board
  const isOnBoardTeam = teamAssignments.some(player => player.name === currentPlayer && (player.team === 'red' || player.team === 'blue'));

  // Conditional styles for game board glow
  const glowColor = currentTurn === 'red' ? 'rgba(255, 0, 0, 0.8)' : 'rgba(0, 0, 255, 0.8)';
  const boxShadow = currentTurn ? `0px 0px 20px 8px ${glowColor}` : '';

  const [gameOver, setGameOver] = useState(false);
  const [winningTeam, setWinningTeam] = useState('');

  const currentPlayerTeam = teamAssignments.find(player => player.name === currentPlayer)?.team;


  const handleCardSelected = (word, team) => {
    if (team === 'bomb') {
      // Bomb revealed, everyone loses
      setWinningTeam('bomb');
      setGameOver(true);
    } else if (team === 'red' && teamAssignments.filter(player => player.team === 'red').length === 8) {
      // All red cards revealed
      setWinningTeam('red');
      setGameOver(true);
    } else if (team === 'blue' && teamAssignments.filter(player => player.team === 'blue').length === 8) {
      // All blue cards revealed
      setWinningTeam('blue');
      setGameOver(true);
    }
    else if (team === currentTurn) {
      // stay on the same team's turn
    }
     else {
      // Switch to the other team's turn if needed
      setCurrentTurn(prev => (prev === 'red' ? 'blue' : 'red'));
    }
  };

  const handlePlayAgain = () => {
    setGameOver(false);
    setWinningTeam('');
    setRedSpymaster('');
    setBlueSpymaster('');
    setCurrentTurn('red');
    initializeWordAssignments();
    // Additional logic for resetting state variables as needed
  };

  return (
    <Grid templateColumns="1fr 3fr 1fr" gap={4} minH="400px" position="relative">
      <>
        {/* Left: Red Team Roles */}
        <GridItem>
          <TeamRoles
            teamName="Red"
            spymaster={redSpymaster}
            operative={redTeam.map(player => player.name).join(', ')}
            teamColor="red.600"
            onJoinSpymaster={onJoinRedSpymaster}
            onJoinOperative={onJoinRedOperative}
          />
        </GridItem>
        {/* Center: Game Board with glowing indicator */}
        <GridItem>
          <Box>
            <Box boxShadow={boxShadow} p={0} borderRadius="md">
              {isOnBoardTeam ? (
                <>
                  {/* Pass words and word assignments to GameBoard */}
                  <GameBoard
                    words={words}
                    wordAssignments={wordAssignments}
                    currentTurn={currentTurn}
                    onCardSelected={handleCardSelected}
                    currentPlayer={currentPlayer}
                    teamAssignments={teamAssignments}
                    isSpymaster={currentPlayer === redSpymaster || currentPlayer === blueSpymaster}
                    gameOver={gameOver}
                  />
                </>
              ) : (
                <Text textAlign="center" color="gray.400">
                  Join a team to interact with the GameBoard
                </Text>
              )}
            </Box>
            <Button mt={4} colorScheme="teal" onClick={onSubmitAction}>
              Finish Turn
            </Button>
          </Box>
        </GridItem>
        {/* Right: Blue Team Roles */}
        <GridItem>
          <TeamRoles
            teamName="Blue"
            spymaster={blueSpymaster}
            operative={blueTeam.map(player => player.name).join(', ')}
            teamColor="blue.600"
            onJoinSpymaster={onJoinBlueSpymaster}
            onJoinOperative={onJoinBlueOperative}
          />
        </GridItem>
      </>
  
      {/* Overlay the GameOver screen if the game is over */}
      {gameOver && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="10"
          bg="rgba(0, 0, 0, 0.8)"
          p={10}
          borderRadius="md"
          textAlign="center"
        >
          <GameOver
            winningTeam={winningTeam}
            currentPlayerTeam={currentPlayerTeam}
            onPlayAgain={handlePlayAgain}
          />
        </Box>
      )}
    </Grid>
  );
  
  
};

export default Game;
