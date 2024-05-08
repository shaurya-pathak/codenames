// src/components/TeamRoles.js
import React from 'react';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';

const TeamRoles = ({ teamName, spymaster, operative, teamColor, onJoinSpymaster, onJoinOperative }) => {
  return (
    <Box
      minW="300px"
      p={4}
      boxShadow="xl"
      rounded="md"
      bg={teamColor}
      color="white"
      textAlign="center"
    >
      <Heading size="md" mb={3}>{`${teamName} Team`}</Heading>
      <VStack spacing={2}>
        <Text><strong>Spymaster:</strong> {spymaster || 'None'}</Text>
        <Text><strong>Operative:</strong> {operative}</Text>
        <VStack spacing={2} mt={4}>
          {/* Button to join as spymaster if there's no existing spymaster */}
          {!spymaster && (
            <Button colorScheme="orange" onClick={onJoinSpymaster}>
              Join as Spymaster
            </Button>
          )}
          {/* Button to join as an operative */}
          <Button colorScheme="teal" onClick={onJoinOperative}>
            Join as Operative
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default TeamRoles;
