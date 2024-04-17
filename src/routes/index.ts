/**
 * Root Router
 * Redirections to Routers
 */

import express, { Request, Response } from "express";
import helloRouter from "./HelloRouter";
import { LogInfo } from "../utils/logger";

//Server Instance

let server = express();

//Router instance
let rootRouter = express.Router();

// Activate for request to http://localhost:8000/api
rootRouter.get("/hello", (req: Request, res: Response) => {
  LogInfo("GET: http://localhost:8000/api");
  res.send("Welcome to my api restul");
});

// Redirections to Routers & Controllers
server.use("/", rootRouter); // http://localhost:8000/api
server.use("/hello", helloRouter); // http://localhost:8000/api/hello --> HelloRouter

export default server;
