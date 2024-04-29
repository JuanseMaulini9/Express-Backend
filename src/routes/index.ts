/**
 * Root Router
 * Redirections to Routers
 */

import express, { Request, Response } from "express";
import helloRouter from "./HelloRouter";
import { LogInfo } from "../utils/logger";
import userRouter from "./UserRouter";
import authRouter from "./AuthRouter";
import kataRouter from "./KataRouter";

//Server Instance

let server = express();

//Router instance
let rootRouter = express.Router();

// Activate for request to http://localhost:8000/api
rootRouter.get("/", (req: Request, res: Response) => {
  LogInfo("GET: http://localhost:8000/api");
  res.send("Welcome to my api restul");
});

// Redirections to Routers & Controllers
server.use("/", rootRouter); // http://localhost:8000/api
server.use("/hello", helloRouter); // http://localhost:8000/api/hello --> HelloRouter
server.use("/users", userRouter); // http://localhost:8000/api/users --> UserRouter
server.use("/auth", authRouter); // http://localhost:8000/api/auth --> AuthRouter
server.use("/katas", kataRouter); // http://localhost:8000/api/katas --> KatasRouter

export default server;
