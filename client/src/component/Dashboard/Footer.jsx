import React from "react";
import { Box, Text, Link, Flex, useColorModeValue, Icon } from "@chakra-ui/react";
import {  RiLinkedinBoxFill, RiGithubFill } from "react-icons/ri";

const Footer = () => {
  const footerBgColor = useColorModeValue("gray.100", "gray.700");
  const iconColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box bg={footerBgColor} py={4}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        maxW="container.lg"
        mx="auto"
        px={4}
      >
        <Text fontSize="sm" color="gray.500">
          &copy; 2024 Mayur S Murarka. All rights reserved.
        </Text>
        <Flex alignItems="center">
          <Link mx={2} fontSize="sm" color="gray.500">
            Privacy Policy
          </Link>
          <Link mx={2} fontSize="sm" color="gray.500">
            Terms of Service
          </Link>
          <Box mx={2}>
          <Link href="https://www.linkedin.com/in/mayur-murarka-178703283" target="_blank" rel="noopener noreferrer">

            <Icon as={RiLinkedinBoxFill} boxSize={5} color={iconColor} />
            </Link>
          </Box>
          <Box mx={2}>
          <Link href="https://github.com/Mayur-Murarka" target="_blank" rel="noopener noreferrer">
            <Icon as={RiGithubFill} boxSize={5} color={iconColor} />
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
