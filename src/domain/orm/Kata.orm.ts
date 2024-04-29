import { kataEntity } from "../entities/Kata.entity";
import { LogError, LogSucces } from "../../utils/logger";
import { IKata } from "../interfaces/IKata.interface";
import dotenv from "dotenv";

dotenv.config();

/**
 * Method to obtain all Katas from Collection "Katas" in MongoDB
 */

export const getAllKatas = async (
  page: number,
  limit: number
): Promise<any[] | undefined> => {
  try {
    let kataModel = kataEntity();

    let response: any = {};

    await kataModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
      .then((katas: IKata[]) => {
        response.katas = katas;
      });

    await kataModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPage = page;
    });

    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Getting all katas: ${error}`);
  }
};

export const getKataById = async (id: string): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity();

    return await kataModel.findById(id);
  } catch (error) {
    LogError(`[ORM ERROR]: Getting kata by ID: ${error}`);
  }
};

export const deleteKataByID = async (id: string): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity();

    return await kataModel.deleteOne({ _id: id });
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting kata by ID: ${error}`);
  }
};

export const createKata = async (kata: IKata): Promise<IKata | undefined> => {
  try {
    let kataModel = kataEntity();

    return await kataModel.create(kata);
  } catch (error) {
    LogError(`[ORM ERROR]: Creating Kata: ${error}`);
  }
};

export const updateKataById = async (
  id: string,
  kata: IKata
): Promise<any | undefined> => {
  try {
    let kataModel = kataEntity();

    return await kataModel.findByIdAndUpdate(id, kata);
  } catch (error) {
    LogError(`[ORM ERROR]: Updating Kata ${id}: ${error}`);
  }
};
