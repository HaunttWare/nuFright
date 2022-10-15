import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";

const socket = (server: HttpServer) => {
  const io = new Server(server);

  let users: any = [];

  const addUser = (userId: string, socketId: string) => {
    !users.some((user: any) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const removeUser = (socketId: string) => {
    users = users.filter((user: any) => user.socketId !== socketId);
  };

  const getUser = (userId: string) => {
    return users.find((user: any) => user.userId === userId);
  };

  io.on("connection", (socket: Socket) => {
    console.log("a user connected");
    // take the user id and socket id from the socket
    socket.on("addUser", (userId: string) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });


    // send and get message
    socket.on("sendMessage", ({ conversationId, sender, receiverId, message }: any) => {
      const user = getUser(receiverId);
      io.to(user?.socketId).emit("getMessage", {
        conversationId,
        senderId: sender.id,
        sender,
        message,
      });
    });

    // when disconnect
    socket.on("disconnect", () => {
      console.log("user disconnected");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
};

export default socket;
