import { IKata } from "../../domain/interfaces/IKata.interface";
import { IUser } from "../../domain/interfaces/IUser.interface";
import { BasicResponse } from "../types";

export interface IHelloController {
  getMessage(name?: string): Promise<BasicResponse>;
}

export interface IUserController {
  // Read all Users for database || get User by ID
  getUsers(page: number, limit: number, id?: string): Promise<any>;

  // Get katas of user
  getKatas(page: number, limit: number, id: string): Promise<any>;

  //Delete User by ID
  deleteUser(id: string): Promise<any>;
  //Update user
  updateUser(id: string, user: any): Promise<any>;
}

export interface IAuthController {
  //register users
  registerUser(User: IUser): Promise<any>;
  //login user
  loginUser(auth: any): Promise<any>;
  //logout user
  logoutUser(): Promise<any>;
}

export interface IKataController {
  getKatas(page: number, limit: number, id?: string): Promise<any>;

  createKata(kata: IKata): Promise<any>;

  deleteKata(id: string): Promise<any>;

  updateKata(id: string, kata: IKata): Promise<any>;
}
