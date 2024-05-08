// src/App.js
import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, VStack, useToast } from '@chakra-ui/react';
import CodenamesTitleCard from './components/CodenamesTitleCard';
import GameSetup from './components/GameSetup';
import HostScreen from './components/HostScreen';
import MemberScreen from './components/MemberScreen';
import Game from './components/Game';
import theme from './theme';

const defaultWords = [
  'Apple', 'Orange', 'Banana', 'Grape', 'Cherry', 'Peach', 'Plum', 'Berry', 'Fig', 'Kiwi',
  'Mango', 'Pear', 'Lemon', 'Lime', 'Melon', 'Papaya', 'Avocado', 'Tomato', 'Coconut',
  'Pineapple', 'Apricot', 'Pomegranate', 'Strawberry', 'Blackberry', 'Blueberry',
];

function App() {
  const [role, setRole] = useState('');
  const [gameId, setGameId] = useState('');
  const [hostName, setHostName] = useState('');
  const [playerList, setPlayerList] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [redSpymaster, setRedSpymaster] = useState('');
  const [blueSpymaster, setBlueSpymaster] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [teamAssignments, setTeamAssignments] = useState([]);
  const [currentTurn, setCurrentTurn] = useState('red');
  const [words, setWords] = useState([]);
  const [wordAssignments, setWordAssignments] = useState({});
  const toast = useToast(); // Initialize the Chakra UI toast hook

  useEffect(() => {
    if (isGameStarted) {
      initializeWordAssignments();
    }
  }, [isGameStarted]);

  const generateUniqueGameId = () => `game-${Math.floor(Math.random() * 10000)}`;

  const initializeWordAssignments = () => {
    // Shuffle the words
    let shuffledWords = [...defaultWords].sort(() => Math.random() - 0.5);

    // Determine word assignments
    const redWords = defaultWords.slice(0, 9); // 9 for the starting team
    const blueWords = defaultWords.slice(9, 17); // 8 for the other team
    const bombWord = defaultWords[17]; // 1 bomb/assassin
    const neutralWords = defaultWords.slice(18, 25); // Remaining 7 neutral words

    // Create a mapping for the GameBoard
    const assignments = {};
    redWords.forEach(word => (assignments[word] = 'red'));
    blueWords.forEach(word => (assignments[word] = 'blue'));
    assignments[bombWord] = 'bomb';
    neutralWords.forEach(word => (assignments[word] = 'neutral'));

    setWords(shuffledWords);
    setWordAssignments(assignments);
  };

  const handleCreateGame = (hostName) => {
    const newGameId = generateUniqueGameId();
    setGameId(newGameId);
    setHostName(hostName);
    setRole('host');
    setPlayerList([hostName]);
    setCurrentPlayer(hostName);
    //setTeamAssignments([{ name: hostName, team: 'red' }]); // Initialize host as Red spymaster
  };

  const handleJoinGame = (inputGameId, playerName) => {
    const gameInfo = {
      hostName: 'HostPlayer1',
      players: ['HostPlayer1', 'Player2', 'Player3', 'Player4', 'Player5'],
    };

    setGameId(inputGameId);
    setHostName(gameInfo.hostName);
    setPlayerList([...gameInfo.players, playerName]);
    setRole('member');
    setCurrentPlayer(playerName);
  };

  const startGameFunction = () => {
    setIsGameStarted(true);
  };

  const removeCurrentPlayerFromRoles = () => {
    const wasSpymaster = currentPlayer === redSpymaster || currentPlayer === blueSpymaster;

    // Remove current player from assignments
    setTeamAssignments(prev => prev.filter(player => player.name !== currentPlayer));
    if (currentPlayer === redSpymaster) setRedSpymaster('');
    if (currentPlayer === blueSpymaster) setBlueSpymaster('');

    // Trigger toast if the current player was a spymaster
    if (wasSpymaster) {
      toast({
        title: "Answers Shuffled",
        description: "The answers have been reshuffled to prevent cheating.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      initializeWordAssignments();
    }
  };

  const joinRedTeamAsSpymaster = () => {
    removeCurrentPlayerFromRoles();
    setRedSpymaster(currentPlayer);
    setTeamAssignments((prev) => [
      ...prev.filter((player) => player.team !== 'red'),
      { name: currentPlayer, team: 'red' },
    ]);
  };

  const joinRedTeamAsOperative = () => {
    removeCurrentPlayerFromRoles();
    setTeamAssignments((prev) => [
      ...prev,
      { name: currentPlayer, team: 'red' },
    ]);
  };

  const joinBlueTeamAsSpymaster = () => {
    removeCurrentPlayerFromRoles();
    setBlueSpymaster(currentPlayer);
    setTeamAssignments((prev) => [
      ...prev.filter((player) => player.team !== 'blue'),
      { name: currentPlayer, team: 'blue' },
    ]);
  };

  const joinBlueTeamAsOperative = () => {
    removeCurrentPlayerFromRoles();
    setTeamAssignments((prev) => [
      ...prev,
      { name: currentPlayer, team: 'blue' },
    ]);
  };
  const toggleTurn = () => {
    setCurrentTurn(prev => (prev === 'red' ? 'blue' : 'red'));
  };

  const onSubmitAction = () => {
    toggleTurn();
  }

  return (
    <ChakraProvider theme={theme}>
      <Box bg="gray.900" minH="100vh" color="white" p={5}>
        <VStack spacing={8} align="center" maxW="sm" mx="auto">
          <CodenamesTitleCard />
          {!isGameStarted && role === '' && <GameSetup onJoin={handleJoinGame} onCreate={handleCreateGame} />}
          {!isGameStarted && role === 'host' && <HostScreen gameId={gameId} playerList={playerList} onStartGame={startGameFunction} />}
          {!isGameStarted && role === 'member' && <MemberScreen gameId={gameId} hostName={hostName} playerList={playerList} />}
          {isGameStarted && (
            <Game
              redSpymaster={redSpymaster}
              blueSpymaster={blueSpymaster}
              teamAssignments={teamAssignments}
              currentPlayer={currentPlayer}
              onJoinRedSpymaster={joinRedTeamAsSpymaster}
              onJoinRedOperative={joinRedTeamAsOperative}
              onJoinBlueSpymaster={joinBlueTeamAsSpymaster}
              onJoinBlueOperative={joinBlueTeamAsOperative}
              setRedSpymaster={setRedSpymaster}
              setBlueSpymaster={setBlueSpymaster}
              currentTurn={currentTurn}
              onSubmitAction={onSubmitAction}
              words={words}
              wordAssignments={wordAssignments}
              setCurrentTurn={setCurrentTurn}
              initializeWordAssignments={initializeWordAssignments}
            />
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
