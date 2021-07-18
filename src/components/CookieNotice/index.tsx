import {
  Fade,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useCookies } from "react-cookie";
import { BsCheck } from "react-icons/bs";
import { COOKIE_NOTICE_TEXT } from "./constants";

const CookieNotice = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(["hide_cookie_notice"]);
  const [open, setOpen] = React.useState(!cookies["hide_cookie_notice"]);

  const handleClose = () => {
    const expiration = new Date();
    expiration.setTime(expiration.getTime() + 1000 * 60 * 24 * 30);
    setCookie("hide_cookie_notice", "1", { path: "/", expires: expiration });
    setOpen(false);
  };

  const background = useColorModeValue("blackAlpha.800", "whiteAlpha.800");
  const foreground = useColorModeValue("whiteAlpha.800", "blackAlpha.800");
  const iconColor = useColorModeValue("whiteAlpha", "black");

  return (
    <Fade unmountOnExit in={open}>
      <Flex
        position="fixed"
        bottom="0"
        m="10px"
        alignItems="center"
        gridGap="5"
        borderRadius="5"
        p="3"
        color={foreground}
        bg={background}
      >
        <Text>{COOKIE_NOTICE_TEXT}</Text>
        <IconButton
          fontSize="md"
          variant="outline"
          borderRadius="50%"
          aria-label="Close cookie notice"
          onClick={handleClose}
          colorScheme={iconColor}
          icon={<BsCheck />}
        />
      </Flex>
    </Fade>
  );
};
export default CookieNotice;
