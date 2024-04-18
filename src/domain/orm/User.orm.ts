import { userEntity } from "../entities/User.entity";
import { LogError, LogSucces } from "@/utils/logger";

/**
 * Method to obtain all Users from Collection "Users" in MongoDB
 */
export const GetAllUsers = async (): Promise<any[] | undefined> => {
  try {
    let userModel = userEntity();

    // Search all users
    return await userModel.find({ isDeleted: false });
  } catch (error) {
    LogError(`[ORM ERROR]: Getting all users: ${error}`);
  }
};

// TODO:
// GET USER BY ID
// GET USER BY EMAIL
// CREATE NEW USER
// UPDATE USER BY ID
