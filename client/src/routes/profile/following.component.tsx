import axios from "axios";
import React from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFollowingList, UserData } from "../../store/user/user.action";
import {
  selectCurrentUser,
  selectFollowingList,
} from "../../store/user/user.selector";

import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";

const Following = () => {
  const currentUser = useSelector(selectCurrentUser);
  const followingList = useSelector(selectFollowingList);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const toast = useToast();

  const followUser = async (userToFollow: UserData) => {
    try {
      const { data } = await axios.post(`/api/user/follow/${userToFollow.id}`, {
        currentUserId: currentUser.id,
        isFollowing: true,
      });
      if (data.isFollowing === true) {
        dispatch(setFollowingList([...followingList, userToFollow]));
        toast({
          title: "User followed",
          description: `You are now following ${userToFollow.name}`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      } else {
        dispatch(
          setFollowingList(
            followingList.filter(
              (user: UserData) => user.id !== userToFollow.id
            )
          )
        );
        toast({
          title: "User unfollowed",
          description: `You are no longer following ${userToFollow.name}`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      w={{ base: "100%", md: "80%", lg: "60%" }}
      m={{ base: "0 auto", md: "0 auto", lg: "0 auto" }}
    >
        <Flex
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        mb="1rem"
      >
        <Button
          leftIcon={<FaArrowLeft />}
          onClick={() => navigate(-1)}
          variant="ghost"
          bg="gray.100"
          color="gray.800"
        >
          Back
        </Button>
      </Flex>
      <Text fontSize="2xl" fontWeight="bold" mb="2" textAlign="center" color="white">
        Following
      </Text>
      {followingList.length > 0 ? (
        followingList.map((user: UserData) => (
          <Flex
            key={user.id}
            backgroundColor="#1a1a1a"
            borderRadius="10px"
            padding="15px"
            alignItems="center"
            marginX="auto"
            marginBottom="10px"
          >
            <Image
              src={user.photo}
              borderRadius="50%"
              width="50px"
              height="50px"
            />

            <Flex flexDirection="column" marginLeft="10px">
              <Text color="white" fontSize="20px">
                {user.name}
              </Text>
              <Text color="gray.500" fontSize="15px">
                {user.email}
              </Text>
            </Flex>
            <Flex
              flexDirection={["column", "row"]}
              marginLeft="auto"
              alignItems="center"
            >
              <Button
                colorScheme="red"
                onClick={() => followUser(user)}
                marginRight={["0px", "10px"]}
                marginBottom={["10px", "0px"]}
                size={["sm", "md"]}
              >
                Unfollow
              </Button>
              <Button
                colorScheme="blue"
                size={["sm", "md"]}
                onClick={() => navigate("/chats")}
              >
                Message
              </Button>
            </Flex>
          </Flex>
        ))
      ) : (
        <Text textAlign="center" fontSize="2xl" fontWeight="bold">
          You are not following anyone
        </Text>
      )}
    </Box>
  );
};

export default Following;
