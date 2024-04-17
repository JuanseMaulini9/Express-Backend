import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";

//Configuration the .env file
dotenv.config();

//Create express APP
const app: Express = express();
const port = process.env.PORT || 8000;

//Define the first route of app
app.get("/hello", (req: Request, res: Response) => {
  //send Hello world
  res.send("WElcome to get route: Hello");
});

//Execute App and Listen Request to PORT
app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
