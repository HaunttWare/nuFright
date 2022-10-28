import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";

type User = {
  id: string;
  name: string;
  photo: string;
};

const socket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
    pingTimeout: 60000,
  });

  io.on("connection", (socket: Socket) => {
    console.log("a user connected");

    socket.on("setup", (userData) => {
      socket.join(userData.id);
      socket.emit("connected");
    });

    socket.on("join chat", (chat) => {
      socket.join(chat);
      console.log("joined chat: " + chat);
    });

    socket.on("typing", (chatId) => {
      socket.in(chatId).emit("typing");
    });
    socket.on("stop typing", (chatId) => {
      socket.in(chatId).emit("stop typing");
    });

    socket.on("new message", (newMessageReceived) => {
      var chat = newMessageReceived.chat;

      if (!chat.users) return console.log("chat.users not defined");

      chat.users.forEach((user: User) => {
        if (user.id == newMessageReceived.senderId) return;

        socket.in(user.id).emit("message received", newMessageReceived);
      });
    });

    socket.off("setup", (userData) => {
      console.log("user disconnected");
      socket.leave(userData.id);
    });
  });
};

export default socket;
