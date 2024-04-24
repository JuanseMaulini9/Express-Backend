import { userEntity } from "../entities/User.entity";
import { LogError, LogSucces } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import { UserResponse } from "../types/UserResponse";

dotenv.config();
const secret = process.env.SECRETTEXT || "MYSECRETKEY";

/**
 * Method to obtain all Users from Collection "Users" in MongoDB
 */
//Get all Users
export const getAllUsers = async (
  page: number,
  limit: number
): Promise<any[] | undefined> => {
  try {
    let userModel = userEntity();

    let response: any = {};

    // Search all users(using pagination)
    await userModel
      .find()
      .select("name email age")
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
      .then((users: IUser[]) => {
        response.users = users;
      });

    // Count total documents in collection 'Users'

    await userModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPage = page;
    });

    return response;

    // return await userModel.find();
  } catch (error) {
    LogError(`[ORM ERROR]: Getting all users: ${error}`);
  }
};

//Get User by ID
export const getUserById = async (userId: string): Promise<any | undefined> => {
  try {
    let userModel = userEntity();

    // Search user By ID
    return await userModel.findById(userId).select("name email age");
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
export const registerUser = async (user: IUser): Promise<any | undefined> => {
  try {
    let userModel = userEntity();

    return await userModel.create(user);
  } catch (error) {
    LogError(`[ORM ERROR]: Creating user: ${error}`);
  }
};

export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
  try {
    let userModel = userEntity();

    let userFound: IUser | undefined;
    let token;

    await userModel
      .findOne({ email: auth.email })
      .then((user: IUser) => {
        userFound = user;
      })
      .catch((error) => {
        console.error(`[ERROR AUTHENTICATION IN ORM]: User not found`);
        throw new Error(
          `[ERROR AUTHENTICATION IN ORM]: User not found: ${error}`
        );
      });

    let validPassword = bcrypt.compareSync(auth.password, userFound!.password);

    if (!validPassword) {
      console.error(`[ERROR Authentication in ORM]: Password Not Valid`);
      throw new Error(`[ERROR AUTHENTICATION IN ORM]: Password Not Valid`);
    }

    token = jwt.sign({ email: userFound!.email }, secret, {
      expiresIn: "2h",
    });

    return {
      user: userFound,
      token: token,
    };
  } catch (error) {
    LogError(`[ORM ERROR]: Login User: ${error}`);
  }
};

export const logoutUser = async (): Promise<any | undefined> => {};

//Login User
