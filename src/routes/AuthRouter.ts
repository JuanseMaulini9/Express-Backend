import express, { Request, Response } from "express";
import { AuthController } from "../controller/AuthController";
import { IUser } from "../domain/interfaces/IUser.interface";

// BCRYPT for passwords
import bcrypt from "bcrypt";
import { IAuth } from "../domain/interfaces/IAuth.interface";

let authRouter = express.Router();

authRouter.route("/auth/register").post(async (req: Request, res: Response) => {
  let { name, email, password, age } = req.body;
  let hashedPassword = "";

  if (name && password && email && age) {
    hashedPassword = bcrypt.hashSync(password, 8);

    let newUser: IUser = {
      name,
      email,
      password,
      age,
    };

    const controller: AuthController = new AuthController();

    const response: any = await controller.registerUser(newUser);

    return res.status(200).send(response);
  }
});

authRouter.route("/auth/login").post(async (req: Request, res: Response) => {
  let { email, password } = req.body;

  if (password && email) {
    const controller: AuthController = new AuthController();

    let auth: IAuth = {
      email,
      password,
    };

    const response: any = await controller.loginUser(auth);
    //Send to the client the response wich includes the jwt to authorized requests
    return res.status(200).send(response);
  }
});

export default authRouter;
