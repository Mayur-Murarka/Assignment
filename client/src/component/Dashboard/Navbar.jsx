import React from "react";
import {
  Box,
  Flex,
  Container,
  IconButton,
  useColorMode,
  useToast,
  Text,
  Button,
} from "@chakra-ui/react";
import {MoonIcon, SunIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };
  return (
    <Box
      py={2}
      bgGradient="linear(to-b, #4567b7, #6495ed)"
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Container maxW="container.lg">
        <Flex justify="space-between" align="center">
        <Box w="80%">
            <Text fontSize="lg" fontWeight="bold" color={colorMode === "light" ? "white" : "gray.800"}>
             Dashboard
            </Text>
          </Box>
          <Box>
            <Flex align="center">
              <IconButton
                aria-label="Toggle Theme"
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                bg="transparent"
                border="none"
                onClick={toggleColorMode}
              />
              
              <Button
                ml={2}
                variant="outline"
                onClick={handleLogout}
                 color="white"
                 _hover={{ bg: "whiteAlpha.200" }}        
                 _active={{ bg: "whiteAlpha.300" }}       
                 >
                Logout
              </Button>
              
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
