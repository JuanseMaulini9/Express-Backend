import { userEntity } from "../entities/User.entity";
import { LogError, LogSucces } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Method to obtain all Users from Collection "Users" in MongoDB
 */
//Get all Users
export const getAllUsers = async (): Promise<any[] | undefined> => {
  try {
    let userModel = userEntity();

    // Search all users
    return await userModel.find();
  } catch (error) {
    LogError(`[ORM ERROR]: Getting all users: ${error}`);
  }
};

//Get User by ID
export const getUserById = async (userId: string): Promise<any | undefined> => {
  try {
    let userModel = userEntity();

    // Search user By ID
    return await userModel.findById(userId);
  } catch (error) {
    LogError(`[ORM ERROR]: Getting user by ID: ${error}`);
  }
};

//Deleted User by ID
export const deleteUserByID = async (id: string): Promise<any | undefined> => {
  try {
    let userModel = userEntity();

    return await userModel.deleteOne({ _id: id });
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting user by ID: ${error}`);
  }
};

//Create new user
export const createUser = async (user: any): Promise<any | undefined> => {
  try {
    let userModel = userEntity();

    return await userModel.create(user);
  } catch (error) {
    LogError(`[ORM ERROR]: Creating User: ${error}`);
  }
};

//Update User By ID
export const updateUserById = async (
  id: string,
  user: any
): Promise<any | undefined> => {
  try {
    let userModel = userEntity();

    return await userModel.findByIdAndUpdate(id, user);
  } catch (error) {
    LogError(`[ORM ERROR]: Updating User ${id}: ${error}`);
  }
};

//Register User
export const registerUser = async (user: IUser): Promise<any | undefined> => {};

export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
  try {
    let userModel = userEntity();

    userModel.findOne({ email: auth.email }, (err: any, user: IUser) => {
      if (err) {
        //Todo: return ERROR ---> Error while searching (500)
        return;
      }
      if (!user) {
        //Todo: return ERROR ---> Error User not found (404)
        return;
      }

      //Use Bcrypt to compare password
      let validPassword = bcrypt.compareSync(auth.password, user.password);

      if (!validPassword) {
        //Todo ---> NOT AUTHORIZED (401)
      }
      //todo: secret must be in .env
      let token = jwt.sign({ email: user.email }, "MYSECRETWORD", {
        expiresIn: "2h",
      });

      return token;
    });
  } catch (error) {
    LogError(`[ORM ERROR]: Login User: ${error}`);
  }
};

export const logoutUser = async (): Promise<any | undefined> => {};

//Login User
