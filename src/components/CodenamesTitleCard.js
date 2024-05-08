// src/components/CodenamesTitleCard.js
import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const CodenamesTitleCard = () => {
  return (
    <VStack minW="md" spacing={2} p={5} boxShadow="2xl" rounded="lg" bgColor="primary" align="center">
      <Heading fontSize="4xl" color="white">Codenames</Heading>
    </VStack>
  );
};

export default CodenamesTitleCard;
