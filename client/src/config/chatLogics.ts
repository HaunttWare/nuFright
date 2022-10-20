import { UserData } from "../store/user/user.action";

export const getSenderName = (loggedUser: UserData | null, users: UserData[]) => {
  return users[0].id === loggedUser?.id ? users[1].name : users[0].name;
};

export const getSender = (loggedUser: UserData | null, users: UserData[]) => {
  return users[0].id === loggedUser?.id ? users[1] : users[0];
}

