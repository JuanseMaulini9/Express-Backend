import { IKata } from "../domain/interfaces/IKata.interface";
import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IKataController } from "./interfaces";
import { LogSucces, LogWarning } from "../utils/logger";
import {
  getAllKatas,
  getKataById,
  updateKataById,
  deleteKataByID,
  createKata,
} from "../domain/orm/Kata.orm";

@Route("/api/katas")
@Tags("KatasController")
export class KatasController implements IKataController {
  /**
   * Endpoint to retreive the Katas in the Collection "Katas" of Db
   * @param {string}id Id of Kata to retreive (optional)
   * @returns All katas or Kata found by id
   */
  @Get("/")
  public async getKatas(
    @Query() page: number,
    limit: number,
    id?: string
  ): Promise<any> {
    let response: any;

    if (id) {
      LogSucces(`[/api/katas] GET KATA BY ID: ${id}`);
      response = await getKataById(id);
    } else {
      LogSucces("[/api/katas] GET ALL KATAS REQUEST");
      response = await getAllKatas(page, limit);
    }
    return response;
  }

  @Post("/")
  public async createKata(kata: IKata): Promise<any> {
    let response: any = "";

    if (kata) {
      LogSucces(`[/api/katas] Register New Kata: ${kata.name}`);
      await createKata(kata).then((r) => {
        LogSucces(`[/api/katas] Created Kata: ${kata.name}`);
        response = {
          message: `Kata created successfully: ${kata.name}`,
        };
      });
    } else {
      LogWarning("[/api/katas] Register needs Kata Entity");
      response = {
        message:
          "Kata not Registed: Please, provide a Kata Entity to create one",
      };
    }
    return response;
  }

  /**
   * Endpoint to delete the Katas in the Collection "Katas" of Db
   * @param {string}id Id of kata to delete (optional)
   * @returns message information if deletion
   */
  @Delete("/")
  public async deleteKata(@Query() id?: string): Promise<any> {
    let response: any;

    if (id) {
      LogSucces(`[/api/katas] DELETE KATA BY ID: ${id}`);
      await deleteKataByID(id).then(
        (r) =>
          (response = {
            message: `Kata with id ${id} deleted succesfully`,
          })
      );
    } else {
      LogWarning("[/api/katas] DELETE KATAS REQUEST WITHOUT ID");
      response = {
        message: "Provide an ID to remove from database",
      };
    }
    return response;
  }

  @Put("/")
  public async updateKata(@Query() id: string, kata: any): Promise<any> {
    let response: any;

    if (id) {
      LogSucces(`[/api/katas] UPDATE KATA BY ID: ${id}`);
      await updateKataById(id, kata).then(
        (r) =>
          (response = {
            message: `Kata with id ${id} updated succesfully`,
          })
      );
    } else {
      LogWarning("[/api/katas] UPDATED KATAS REQUEST WITHOUT ID");
      response = {
        message: "Provide an ID to updated an exist katas",
      };
    }
    return response;
  }
}
