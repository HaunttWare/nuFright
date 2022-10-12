import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import passport from "passport";
import cookieSession from "cookie-session";
import { createServer } from "http";
import { Server } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from "./sockets";
import "./routes/auth/passport";

import rootRouter from "./routes";
import { Socket } from "engine.io";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("client", "public")));

app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api", rootRouter);

const httpServer = createServer(app);
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
  >(httpServer);

io.on("connection", (socket) => {
  console.log(socket.id);
})



// route to handle all other endpoints and server index.html
app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.resolve("client", "public", "index.html"));
});

httpServer.listen(PORT, () => {
  console.log(`⚡[server]: Server is running at http://localhost:${PORT}`);
});
