import { ViewIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import React from "react";

type ProfileModalProps = {
  children?: React.ReactNode;
  user: any;
};

const ProfileModal = ({ user, children }: ProfileModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            justifyContent="center"
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

            <Button>Follow</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
