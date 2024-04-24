import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IAuthController } from "./interfaces";
import { LogError, LogSucces, LogWarning } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";

import {
  registerUser,
  loginUser,
  logoutUser,
  getUserById,
} from "../domain/orm/User.orm";
import { AuthResponse, ErrorResponse } from "./types";

@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {
  @Post("/register")
  public async registerUser(user: IUser): Promise<any> {
    let response: any = "";

    if (user) {
      LogSucces(`[/api/auth/register] Register New User: ${user.email}`);
      await registerUser(user).then((r) => {
        LogSucces(`[/api/auth/register] Created User: ${user.email}`);
        response = {
          message: `User created successfully: ${user.name}`,
        };
      });
    } else {
      LogWarning("[/api/auth/register] Register needs User Entity");
      response = {
        message:
          "User not Registed: Please, provide a User Entity to create one",
      };
    }
    return response;
  }
  @Post("/login")
  public async loginUser(auth: IAuth): Promise<any> {
    let response: AuthResponse | ErrorResponse | undefined;

    if (auth) {
      LogSucces(`[/api/auth/login] Legged In User: ${auth.email}`);
      let data = await loginUser(auth);
      response = {
        token: data.token,
        message: `Welcome ${data.user.name}`,
      };
    } else {
      LogWarning(
        "[/api/auth/register] Register needs Auth Entity (email && password)"
      );
      response = {
        error: "[AUTH ERROR]: Email & password are needed",
        message: "Please, provide a email && Password to login",
      };
    }

    return response;
  }

  /**
   * Endpoint to retreive the User in the Collection "Users" of Db
   * Middleware: Validate token
   * In headers you must add the x-acces-token with a valid JWT
   * @param {string}id Id of user to retreive (optional)
   * @returns All user or user found by id
   */
  @Get("/me")
  public async userData(@Query() id: string): Promise<any> {
    let response: any;

    if (id) {
      LogSucces(`[/api/users] GET USER DATA BY ID: ${id}`);
      response = await getUserById(id);
      response.password = "";
    }

    return response;
  }

  @Post("/logout")
  public async logoutUser(): Promise<any> {
    let response: any = "";
  }
}
