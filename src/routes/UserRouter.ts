import express, { Request, Response } from "express";
import { UserController } from "../controller/UsersController";
import { LogInfo } from "../utils/logger";

// Router from express
let userRouter = express.Router();

// http://localhost:8000/api/users?id=662274736e36b945e7a29a82
userRouter
  .route("/")
  // GET:
  .get(async (req: Request, res: Response) => {
    // Obtain Query Param (ID)
    let id: any = req?.query.id;
    LogInfo(`Query Param: ${id}`);
    //Controller Instance to execute method
    const controller: UserController = new UserController();
    //Obtain Response
    const response = await controller.getUsers(id);
    //Send to the client the response
    return res.send(response);
  })
  // DELETE:
  .delete(async (req: Request, res: Response) => {
    // Obtain Query Param (ID)
    let id: any = req?.query.id;
    LogInfo(`Query Param: ${id}`);

    //Controller Instance to execute method
    const controller: UserController = new UserController();
    //Obtain Response
    const response = await controller.deleteUser(id);
    //Send to the client the response
    return res.send(response);
  })
  //POST
  .post(async (req: Request, res: Response) => {
    let name: any = req?.query?.name;
    let age: any = req?.query?.age;
    let email: any = req?.query?.email;

    //Controller Instance to execute method
    const controller: UserController = new UserController();

    let userDefautl = {
      name: name || "defautl",
      email: email || "default",
      age: age || 18,
    };
    //Obtain Response
    const response = await controller.createUser(userDefautl);
    //Send to the client the response
    return res.send(response);
  })
  .put(async (req: Request, res: Response) => {
    let id: any = req?.query.id;

    let name: any = req?.query?.name;
    let age: any = req?.query?.age;
    let email: any = req?.query?.email;
    LogInfo(`Query Param: ${id}, ${name}, ${email}, ${age}`);

    const controller: UserController = new UserController();

    let user = {
      name: name || "default",
      email: email || "default email",
      age: age || 20,
    };

    const response: any = await controller.updateUser(id, user);

    return res.send(response);
  });

export default userRouter;
