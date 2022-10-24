import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentUser,
  selectFollowingList,
} from "../../store/user/user.selector";
import {
  IconButton,
  Image,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";

import { ViewIcon } from "@chakra-ui/icons";

import { setFollowingList, UserData } from "../../store/user/user.action";

type ProfileModalProps = {
  children?: React.ReactNode;
  user: UserData;
};

const ProfileModal = ({ user, children }: ProfileModalProps) => {
  const currentUser = useSelector(selectCurrentUser);
  const followingList = useSelector(selectFollowingList);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
          aria-label="View Profile"
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent height="410px">
          <ModalHeader fontSize="40px" display="flex" justifyContent="center">
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.photo}
              alt={user.name}
            />
            <Text fontSize={{ base: "28px", md: "30px" }}>
              Email: {user.email}
            </Text>

            <Button onClick={() => followUser(user)}>
              {followingList.find(
                (followingUser: UserData) => followingUser.id === user.id
              )
                ? "Unfollow"
                : "Follow"}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
