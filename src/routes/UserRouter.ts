import express, { Request, Response } from "express";
import { UserController } from "../controller/UsersController";
import { LogInfo } from "../utils/logger";

import bodyParser from "body-parser";

let jsonParser = bodyParser.json();

import { verifyToken } from "../middlewares/verifyToken.middleware";

// Router from express
let userRouter = express.Router();

// http://localhost:8000/api/users?id=662274736e36b945e7a29a82
userRouter
  .route("/")
  // GET:
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain Query Param (ID)
    let id: any = req?.query.id;

    let page: any = req?.query.page || 1;
    let limit: any = req?.query.limit || 10;

    LogInfo(`Query Param: ${id}`);
    //Controller Instance to execute method
    const controller: UserController = new UserController();
    //Obtain Response
    const response = await controller.getUsers(page, limit, id);
    //Send to the client the response
    return res.status(200).send(response);
  })
  // DELETE:
  .delete(verifyToken, async (req: Request, res: Response) => {
    // Obtain Query Param (ID)
    let id: any = req?.query.id;
    LogInfo(`Query Param: ${id}`);

    //Controller Instance to execute method
    const controller: UserController = new UserController();
    //Obtain Response
    const response = await controller.deleteUser(id);
    //Send to the client the response
    return res.status(200).send(response);
  })

  .put(verifyToken, async (req: Request, res: Response) => {
    let id: any = req?.query.id;

    let name: any = req?.query?.name;
    let age: any = req?.query?.age;
    let email: any = req?.query?.email;

    LogInfo(`Query Param: ${id}, ${name}, ${email}, ${age}`);

    const controller: UserController = new UserController();

    let user = {
      name: name,
      email: email,
      age: age,
    };

    const response: any = await controller.updateUser(id, user);

    return res.status(200).send(response);
  });

userRouter
  .route("/katas")
  .get(verifyToken, async (req: Request, res: Response) => {
    let id: any = req?.query.id;

    let page: any = req?.query.page || 1;
    let limit: any = req?.query.limit || 10;

    const controller: UserController = new UserController();

    const response = await controller.getKatas(page, limit, id);

    return res.status(200).send(response);
  });

export default userRouter;
