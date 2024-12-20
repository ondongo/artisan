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
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="#DD6A1F"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="#DD6A1F"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);
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
      <Link href="/" passHref>
        <Image src="/logo.png" width="150px" height="90px" />
      </Link>

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

      <Box display={["block", null, null, null, "none"]} onClick={onOpen}>
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </Box>

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
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent zIndex={999} minH={"100vh"}>
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
        display: { base: "none", md: "block" },
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
