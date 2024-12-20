import {
  Flex,
  Box,
  Button,
  Image,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Flex
      as="header"
      justify="space-between"
      align="center"
      px={4}
      py={3}
      bg="white"
      boxShadow="md"
      height={"80px"}
      borderRadius={"md"}
      width={"95%"}
  
    >
      {/* Logo */}
      <a href="/">
        <Image src="/logo.png" width="150px" height="90px" />
      </a>

      {/* Desktop Navigation */}
      <Flex
        as="nav"
        justify="center"
        align="center"
        gap={8}
        display={{ base: "none", md: "flex" }}
      >
        <NavItem
          title="Accueil"
          path="/"
          isActive={pathname === "/"}
          onClick={onClose}
        />
        <NavItem
          title="Analyse de devis"
          path="/demo"
          isActive={pathname === "/demo"}
          onClick={onClose}
        />
        <NavItem
          title="Recherche d’artisans"
          path="/recherche"
          isActive={pathname === "/recherche"}
          onClick={onClose}
        />
        <NavItem
          title="Blog"
          path="/blog"
          isActive={pathname === "/blog"}
          onClick={onClose}
        />
      </Flex>

      {/* Mobile Menu Button */}
      <IconButton
        aria-label="Menu"
        icon={<FiMenu />}
   
        ref={btnRef}
        onClick={onOpen}
        bg="transparent"
      />

      {/* Contact Button */}
      <Button
        colorScheme="orange"
        variant="solid"
        size="md"
        display={{ base: "none", md: "block" }}
      >
        Contact
      </Button>

      {/* Mobile Navigation Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay zIndex="1400" />
        <DrawerContent zIndex="1500">
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <NavItem
                title="Accueil"
                path="/"
                isActive={pathname === "/"}
                onClick={onClose}
              />
              <NavItem
                title="Analyse de devis"
                path="/demo"
                isActive={pathname === "/demo"}
                onClick={onClose}
              />
              <NavItem
                title="Recherche d’artisans"
                path="/recherche"
                isActive={pathname === "/recherche"}
                onClick={onClose}
              />
              <NavItem
                title="Blog"
                path="/blog"
                isActive={pathname === "/blog"}
                onClick={onClose}
              />
              <Button
                colorScheme="orange"
                variant="solid"
                size="md"
                width="100%"
                onClick={() => {
                  router.push("/contact");
                  onClose();
                }}
              >
                Contact
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

function NavItem({ title, path, isActive = false, onClick }) {
  const router = useRouter();
  return (
    <Box
      position="relative"
      cursor="pointer"
      onClick={() => {
        router.push(path);
     
      }}
      _after={{
        content: "''",
        position: "absolute",
        width: isActive ? "50%" : "0%",
        height: "4px",
        bg: "#DD6A1F",
        bottom: "-8px",
        left: "25%",
        transition: "width 0.3s ease",
        borderRadius: "10px",
      }}
      _hover={{
        _after: {
          width: "50%",
        },
      }}
    >
      <Text
        fontWeight={isActive ? "bold" : "normal"}
        color={isActive ? "#DD6A1F" : "black"}
      >
        {title}
      </Text>
    </Box>
  );
}

export default NavBar;
