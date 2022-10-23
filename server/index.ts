import path from "path";
import cors from "cors";
import express, { Request, Response } from "express";
import cookieSession from "cookie-session";
import { createServer } from "http";
import passport from "passport";
import "./routes/auth/passport";
import socket from "./socket/index";

import rootRouter from "./routes";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("client", "public")));

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 1000,
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

//create server and initialize socket
const server = createServer(app);
socket(server);

app.use("/api", rootRouter);

// route to handle all other endpoints and server index.html
app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.resolve("client", "public", "index.html"));
});

server.listen(PORT, () => {
  console.log(`⚡[server]: Server is running at http://localhost:${PORT}`);
});
