import {
  Flex,
  Text,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  Box,
  Link,
} from "@chakra-ui/react";
import { HiBars2 } from "react-icons/hi2";
import { Link as RouterLink } from "react-router-dom";
import userAtom from "../atoms/userAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useShowToast from "../hooks/useShowToast";
import CreatePost from "./CreatePost";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const user = useRecoilValue(userAtom);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      localStorage.removeItem("user-threads");
      setUser(null);
    } catch (error) {
      showToast("Error", error, "error");
    }
  };

  return (
    <Flex
      justifyContent={"space-between"}
      zIndex={1}
      py={6}
      position={"fixed"}
      w={"full"}
      bg={
        colorMode === "dark"
          ? "rgba(16, 16, 16, 0.85)"
          : "rgba(255, 255, 255, 0.85)"
      }
      backdropFilter={"blur(28.5px)"}
    >
      <Box ml={"12%"}>
        <Link as={RouterLink} to="/">
          <Image
            cursor={"pointer"}
            alt="logo"
            w={6}
            src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
          />
        </Link>
      </Box>
      <Flex
        gap={16}
        justifyContent={"space-between"}
        display={{
          base: "none",
          md: "flex",
        }}
      >
        <Link as={RouterLink} to="/">
          <svg
            aria-label="Trang chủ"
            fill="currentColor"
            height="26"
            role="img"
            viewBox="0 0 26 26"
            width="26"
          >
            <title>Trang chủ</title>
            <path
              d="M2.25 12.8855V20.7497C2.25 21.8543 3.14543 22.7497 4.25 22.7497H8.25C8.52614 22.7497 8.75 22.5259 8.75 22.2497V17.6822V17.4997C8.75 15.1525 10.6528 13.2497 13 13.2497C15.3472 13.2497 17.25 15.1525 17.25 17.4997V17.6822V22.2497C17.25 22.5259 17.4739 22.7497 17.75 22.7497H21.75C22.8546 22.7497 23.75 21.8543 23.75 20.7497V12.8855C23.75 11.3765 23.0685 9.94815 21.8954 8.99883L16.1454 4.3454C14.3112 2.86095 11.6888 2.86095 9.85455 4.3454L4.10455 8.99883C2.93153 9.94815 2.25 11.3765 2.25 12.8855Z"
              fill="currentColor"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2.5"
            ></path>
          </svg>
        </Link>
        {user && <CreatePost />}
        <svg
          aria-label="Tìm kiếm"
          fill="transparent"
          height="26"
          role="img"
          viewBox="0 0 26 26"
          width="26"
        >
          <title>Tìm kiếm</title>
          <path
            clipRule="evenodd"
            d="M3.5 11.5C3.5 7.08172 7.08172 3.5 11.5 3.5C15.9183 3.5 19.5 7.08172 19.5 11.5C19.5 15.9183 15.9183 19.5 11.5 19.5C7.08172 19.5 3.5 15.9183 3.5 11.5ZM11.5 1C5.70101 1 1 5.70101 1 11.5C1 17.299 5.70101 22 11.5 22C13.949 22 16.2023 21.1615 17.9883 19.756L22.3661 24.1339C22.8543 24.622 23.6457 24.622 24.1339 24.1339C24.622 23.6457 24.622 22.8543 24.1339 22.3661L19.756 17.9883C21.1615 16.2023 22 13.949 22 11.5C22 5.70101 17.299 1 11.5 1Z"
            fill="currentColor"
            fillRule="evenodd"
          ></path>
        </svg>
        
        <svg
          aria-label="Thông báo"
          fill="transparent"
          height="26"
          role="img"
          viewBox="0 0 26 26"
          width="26"
        >
          <title>Thông báo</title>
          <path
            d="M2.5 9.85683C2.5 14.224 6.22178 18.5299 12.0332 22.2032C12.3554 22.397 12.7401 22.5909 13 22.5909C13.2703 22.5909 13.655 22.397 13.9668 22.2032C19.7782 18.5299 23.5 14.224 23.5 9.85683C23.5 6.11212 20.8698 3.5 17.4599 3.5C15.4847 3.5 13.9356 4.39792 13 5.74479C12.0851 4.40812 10.5257 3.5 8.5401 3.5C5.14059 3.5 2.5 6.11212 2.5 9.85683Z"
            stroke="currentColor"
            strokeWidth="2.5"
          ></path>
        </svg>
        {user && (
          <Link as={RouterLink} to={`/${user.username}`}>
            <svg
              aria-label="Trang cá nhân"
              fill="transparent"
              height="26"
              role="img"
              viewBox="0 0 26 26"
              width="26"
            >
              <title>Trang cá nhân</title>
              <circle
                cx="13"
                cy="7.25"
                r="4"
                stroke="currentColor"
                strokeWidth="2.5"
              ></circle>
              <path
                d="M6.26678 23.75H19.744C21.603 23.75 22.5 23.2186 22.5 22.0673C22.5 19.3712 18.8038 15.75 13 15.75C7.19625 15.75 3.5 19.3712 3.5 22.0673C3.5 23.2186 4.39704 23.75 6.26678 23.75Z"
                stroke="currentColor"
                strokeWidth="2.5"
              ></path>
            </svg>
          </Link>
        )}
      </Flex>
      <Menu>
        <MenuButton
          mr={"12%"}
          as={IconButton}
          aria-label="Options"
          icon={<HiBars2 />}
          variant="unstyled"
          size={24}
        />
        <MenuList p={0} boxShadow={"0 10.5px 21px rgba(0,0,0,.08)"}>
          <MenuItem
            bg={colorMode === "dark" ? "gray.dark" : "white"}
            borderBottom={"1px"}
            borderColor={colorMode === "dark" ? "gray" : "rgba(0, 0, 0, 0.15)"}
            fontWeight={"semibold"}
            py={3}
            borderTopRadius={"md"}
            onClick={toggleColorMode}
          >
            <Text>Chuyển giao diện</Text>
          </MenuItem>
          <MenuItem
            bg={colorMode === "dark" ? "gray.dark" : "white"}
            borderBottom={"1px"}
            borderColor={colorMode === "dark" ? "gray" : "rgba(0, 0, 0, 0.15)"}
            fontWeight={"semibold"}
            py={3}
          >
            <Text>Giới thiệu</Text>
          </MenuItem>
          <MenuItem
            bg={colorMode === "dark" ? "gray.dark" : "white"}
            borderBottom={"1px"}
            borderColor={colorMode === "dark" ? "gray" : "rgba(0, 0, 0, 0.15)"}
            fontWeight={"semibold"}
            py={3}
          >
            <Text>Báo cáo sự cố</Text>
          </MenuItem>
          <MenuItem
            bg={colorMode === "dark" ? "gray.dark" : "white"}
            fontWeight={"semibold"}
            py={3}
            borderBottomRadius={"md"}
            onClick={handleLogout}
          >
            <Text>Đăng xuất</Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Header;
