import { Button, Icon, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 10) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const bgColor = useColorModeValue("gray.300", "gray.700");
    const hoverBgColor = useColorModeValue("gray.400", "gray.600");

    return (
        <>
            {isVisible && (
                <Button
                    position="fixed"
                    bottom="4rem"
                    right="2rem"
                    bg={bgColor}
                    _hover={{ bg: hoverBgColor }}
                    zIndex={1000}
                    size="lg"
                    borderRadius="full"
                    onClick={scrollToTop}
                >
                    <Icon as={FaArrowUp} />
                </Button>
            )}
        </>
    );
};

export default ScrollToTopButton;