import { userEntity } from "../entities/User.entity";
import { LogError, LogSucces } from "../../utils/logger";

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

// TODO:
// GET USER BY ID
// GET USER BY EMAIL
// CREATE NEW USER
// UPDATE USER BY ID
