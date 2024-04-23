import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IAuthController } from "./interfaces";
import { LogError, LogSucces, LogWarning } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";

import { registerUser, loginUser, logoutUser } from "../domain/orm/User.orm";

@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {
  @Post("/register")
  public async registerUser(user: IUser): Promise<any> {
    let response: any = "";

    if (user) {
      LogSucces(`[/api/auth/register] Register New User: ${user}`);
      await registerUser(user).then((r) => {
        LogSucces(`[/api/auth/register] Created User: ${user}`);
        response = {
          message: `User created successfully: ${user.name}`,
        };
      });
    } else {
      LogWarning("[/api/auth/register] Register needs User Entity");
      response = {
        message: "Please, provide a User Entity to create one",
      };
    }
    return response;
  }
  @Post("/login")
  public async loginUser(auth: IAuth): Promise<any> {
    let response: any = "";

    if (auth) {
      LogSucces(`[/api/auth/login] Legged In User: ${auth.email}`);
      await loginUser(auth).then((r) => {
        LogSucces(`[/api/auth/login] Logged In User: ${auth.email}`);
        response = {
          message: `User Logged In successfully: ${auth.email}`,
          token: r.token, // JWT GENERATED FOR LOGGED USER
        };
      });
    } else {
      LogWarning(
        "[/api/auth/register] Register needs Auth Entity (email && password)"
      );
      response = {
        message: "Please, provide a email && Password to login",
      };
    }

    return response;
  }
  @Post("/logout")
  public async logoutUser(): Promise<any> {
    let response: any = "";
  }
}
