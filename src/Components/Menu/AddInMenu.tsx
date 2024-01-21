import {
  Box,
  Image,
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DayEnum } from "../../Models/DayEnum";
import ApiService from "../Services/ApiService";
import _ from "lodash";

export default function AddInMenu(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [menu, setMenu] = useState<number[]>();
  const recipeKey = props?.recipeKey;
  const size = props?.size;

  useEffect(() => {
    ApiService.getWeeklyMenu().then((menu): any => {
      setMenu(
        _.map(
          menu.filter((i) => i._from.endsWith("/" + recipeKey)),
          "day"
        ) as number[]
      );
    });
  }, [recipeKey]);

  function isLoading(): boolean {
    return menu === undefined;
  }

  function handleSubmit(event: any): void {
    if (menu !== undefined) {
      ApiService.setWeeklyMenu(menu, recipeKey);
    }
    onClose();
  }

  function setColor(day: DayEnum) {
    if (menu?.includes(day) && menu !== undefined) {
      return "red";
    }
    return "yellow";
  }

  function toggleInMenu(day: DayEnum): void {
    if (menu?.includes(day)) {
      let filteredMenu = menu.filter((item) => item !== day);
      setMenu(filteredMenu);
    } else if (menu !== undefined) {
      setMenu([...menu, day]);
    }
  }

  return (
    <Link onClick={onOpen}>
      <Flex alignItems="center" fontSize={size === "mobile" ? "0.7em" : "1em"}>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Добави към седмичното меню за:</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Button
                my="0.5em"
                mr={3}
                size="sm"
                colorScheme={setColor(1)}
                isDisabled={isLoading()}
                onClick={(e) => toggleInMenu(1)}
              >
                Понеделник
              </Button>
              <Button
                my="0.5em"
                mr={3}
                size="sm"
                colorScheme={setColor(2)}
                isDisabled={isLoading()}
                onClick={(e) => toggleInMenu(2)}
              >
                Вторник
              </Button>
              <Button
                my="0.5em"
                mr={3}
                size="sm"
                colorScheme={setColor(3)}
                isDisabled={isLoading()}
                onClick={(e) => toggleInMenu(3)}
              >
                Сряда
              </Button>
              <Button
                my="0.5em"
                mr={3}
                size="sm"
                colorScheme={setColor(4)}
                isDisabled={isLoading()}
                onClick={(e) => toggleInMenu(4)}
              >
                Четвъртък
              </Button>
              <Button
                my="0.5em"
                mr={3}
                size="sm"
                colorScheme={setColor(5)}
                isDisabled={isLoading()}
                onClick={(e) => toggleInMenu(5)}
              >
                Петък
              </Button>
              <Button
                my="0.5em"
                mr={3}
                size="sm"
                colorScheme={setColor(6)}
                isDisabled={isLoading()}
                onClick={(e) => toggleInMenu(6)}
              >
                Събота
              </Button>
              <Button
                my="0.5em"
                mr={3}
                size="sm"
                colorScheme={setColor(7)}
                isDisabled={isLoading()}
                onClick={(e) => toggleInMenu(7)}
              >
                Неделя
              </Button>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="green" mr={3} onClick={handleSubmit}>
                Запис
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Image src="/images/icons/menu50.png" w="20px" h="20px"></Image>
        <Box pl="0.5em">Добави към меню</Box>
      </Flex>
    </Link>
  );
}
