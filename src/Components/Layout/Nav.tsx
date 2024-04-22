import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import INavItem from "../../Models/INavItem";

export default function NavLogin() {
  const removeAuth = useAuth().removeAuth;
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box position="sticky" top="0" left="0" zIndex="10" right="0">
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={{ base: "60px", md: "70px" }}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            <Image
              w={{ base: "4em", md: "5em" }}
              src="/images/Logo.svg"
              onClick={(ne) => navigate("/all-recipes")}
            />
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
          gap="unset"
        >
          <Avatar
            onClick={() => {
              removeAuth();
              navigate("/login");
            }}
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
            _hover={{
              textDecoration: "none",
              opacity: "0.6",
            }}
          />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const auth = useAuth().auth;
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  function getNavItems(): INavItem[] {
    if (auth?.isAdmin) {
      return _.filter(navItemsData, { desktop: true });
    }
    return _.filter(navItemsData, { adminOnly: false, desktop: true });
  }

  return (
    <Stack alignItems="center" direction={"row"} spacing={4}>
      {getNavItems().map((item) => (
        <Box key={item.label}>
          <Box
            as="a"
            p={2}
            href={item.href ?? "#"}
            fontSize={{ base: "1em", md: "1em" }}
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}
          >
            {item.label}
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  const auth = useAuth().auth;

  function getNavItems(): INavItem[] {
    if (auth?.isAdmin) {
      return navItemsData;
    }
    return _.filter(navItemsData, { adminOnly: false });
  }
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {getNavItems().map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: INavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const navItemsData: Array<INavItem> = [
  {
    label: "Рецепти",
    href: "/all-recipes",
    adminOnly: false,
    desktop: true,
  },
  {
    label: "Седмично меню",
    href: "/menu",
    adminOnly: false,
    desktop: true,
  },
  {
    label: "Любими",
    href: "/favourites",
    adminOnly: false,
    desktop: true,
  },
  {
    label: "21-дневно предизвикателство",
    href: "/challenge",
    adminOnly: false,
    desktop: true,
  },
  {
    label: "Какво имам в хладилника?",
    href: "/fridge-filter",
    adminOnly: false,
    desktop: false,
  },
  {
    label: "Админ панел",
    href: "/admin",
    adminOnly: true,
    desktop: true,
  },
];
