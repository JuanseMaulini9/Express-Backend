import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IUserController } from "./interfaces";
import { LogSucces, LogWarning } from "../utils/logger";

// ORM
import {
  deleteUserByID,
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
} from "../domain/orm/User.orm";

@Route("/api/users")
@Tags("UserController")
export class UserController implements IUserController {
  /**
   * Endpoint to retreive the Users in the Collection "Users" of Db
   * @param {string}id Id of user to retreive (optional)
   * @returns All user or user found by id
   */
  @Get("/")
  public async getUsers(
    @Query() page: number,
    limit: number,
    id?: string
  ): Promise<any> {
    let response: any;

    if (id) {
      LogSucces(`[/api/users] GET USER BY ID: ${id}`);
      response = await getUserById(id);
    } else {
      LogSucces("[/api/users] GET ALL USERS REQUEST");
      response = await getAllUsers(page, limit);
    }
    return response;
  }

  /**
   * Endpoint to delete the Users in the Collection "Users" of Db
   * @param {string}id Id of user to delete (optional)
   * @returns message information if deletion
   */
  @Delete("/")
  public async deleteUser(@Query() id?: string): Promise<any> {
    let response: any;

    if (id) {
      LogSucces(`[/api/users] DELETE USER BY ID: ${id}`);
      await deleteUserByID(id).then(
        (r) =>
          (response = {
            message: `User with id ${id} deleted succesfully`,
          })
      );
    } else {
      LogWarning("[/api/users] DELETE USER REQUEST WITHOUT ID");
      response = {
        message: "Provide an ID to remove from database",
      };
    }
    return response;
  }

  @Put("/")
  public async updateUser(@Query() id: string, user: any): Promise<any> {
    let response: any;

    if (id) {
      LogSucces(`[/api/users] UPDATE USER BY ID: ${id}`);
      await updateUserById(id, user).then(
        (r) =>
          (response = {
            message: `User with id ${id} updated succesfully`,
          })
      );
    } else {
      LogWarning("[/api/users] UPDATED USER REQUEST WITHOUT ID");
      response = {
        message: "Provide an ID to updated an exist user",
      };
    }
    return response;
  }
}
