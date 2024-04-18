import express, { Request, Response, Express } from "express";

import cors from "cors";
import helmet from "helmet";

// TODO: HTTPS

import routes from "../routes";

const server: Express = express();

// Define Server to use /api and use rootRouter from index.ts in routes
server.use("/api", routes);

// Statis server
server.use(express.static("public"));

// TODO: Mongoose Connection

// Security Config
server.use(helmet());
server.use(cors());

// Content Type
server.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
server.use(express.json({ limit: "50mb" }));

// Redirection Config
server.get("/", (req: Request, res: Response) => {
  res.redirect("/api");
});

export default server;
