import express, { Request, Response } from "express";
import { AuthController } from "../controller/AuthController";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";

// BCRYPT for passwords
import bcrypt from "bcrypt";

// Middleware
import { verifyToken } from "../middlewares/verifyToken.middleware";

import bodyParser from "body-parser";

let jsonParser = bodyParser.json();

let authRouter = express.Router();

authRouter
  .route("/register")
  .post(jsonParser, async (req: Request, res: Response) => {
    let { name, email, password, age } = req?.body;
    let hashedPassword = "";

    if (name && password && email && age) {
      hashedPassword = bcrypt.hashSync(password, 8);

      let newUser: IUser = {
        name,
        email,
        password: hashedPassword,
        age,
        katas: [],
      };

      const controller: AuthController = new AuthController();

      const response: any = await controller.registerUser(newUser);

      return res.status(200).send(response);
    } else {
      return res.status(400).send({
        message: "[ERROR User Data missing]No user can be registed",
      });
    }
  });

authRouter
  .route("/login")
  .post(jsonParser, async (req: Request, res: Response) => {
    let { email, password } = req?.body;

    if (password && email) {
      const controller: AuthController = new AuthController();

      let auth: IAuth = {
        email,
        password,
      };

      const response: any = await controller.loginUser(auth);
      //Send to the client the response wich includes the jwt to authorized requests
      return res.status(200).send(response);
    } else {
      return res.status(400).send({
        message: "[ERROR User Data missing] No user can be logged",
      });
    }
  });

// Router Protected by Verify token middleware
authRouter
  .route("/me")
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain the ID of user to check it's data
    let id: any = req?.query.id;

    if (id) {
      // Controller: auth controller
      const controller: AuthController = new AuthController();

      // Obtain response from controller

      let response: any = await controller.userData(id);

      // if user is authorised
      return res.status(200).send(response);
    } else {
      return res.status(401).send({
        message: "You are not authorised to perform this action",
      });
    }
  });

export default authRouter;
