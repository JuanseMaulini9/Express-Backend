import { BasicResponse } from "../types";

export interface IHelloController {
  getMessage(name?: string): Promise<BasicResponse>;
}

export interface IUserController {
  // Read all Users for database || get User by ID
  getUsers(id?: string): Promise<any>;
  //Delete User by ID
  deleteUser(id: string): Promise<any>;
  //Create new user
  createUser(user: any): Promise<any>;
  //Update user
  updateUser(id: string, user: any): Promise<any>;
}
