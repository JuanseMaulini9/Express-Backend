import express, { Request, Response } from "express";
import { KatasController } from "../controller/KatasController";
import { LogInfo } from "../utils/logger";

import bodyParser from "body-parser";

let jsonParser = bodyParser.json();

import { verifyToken } from "../middlewares/verifyToken.middleware";
import { IKata, KataLevel } from "../domain/interfaces/IKata.interface";

// Router from express
let kataRouter = express.Router();

// http://localhost:8000/api/users?id=662274736e36b945e7a29a82
kataRouter
  .route("/")
  // GET:
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain Query Param (ID)
    let id: any = req?.query.id;

    let page: any = req?.query.page || 1;
    let limit: any = req?.query.limit || 10;

    LogInfo(`Query Param: ${id}`);
    //Controller Instance to execute method
    const controller: KatasController = new KatasController();
    //Obtain Response
    const response = await controller.getKatas(page, limit, id);
    //Send to the client the response
    return res.status(200).send(response);
  })
  // DELETE:
  .delete(verifyToken, async (req: Request, res: Response) => {
    // Obtain Query Param (ID)
    let id: any = req?.query.id;
    LogInfo(`Query Param: ${id}`);

    //Controller Instance to execute method
    const controller: KatasController = new KatasController();
    //Obtain Response
    const response = await controller.deleteKata(id);
    //Send to the client the response
    return res.status(200).send(response);
  })

  .put(jsonParser, verifyToken, async (req: Request, res: Response) => {
    let id: any = req?.query.id;

    let name: string = req.body.name;
    let description: string = req.body.description || "";
    let level: KataLevel = req.body.level || KataLevel.BASIC;
    let intents: number = req.body.intents || 0;
    let stars: number = req.body.stars || 0;
    let creator: string = req.body.creator;
    let solution: string = req.body.solution || "";
    let participants: string[] = req.body.participants || [];

    if (
      name &&
      description &&
      level &&
      intents >= 0 &&
      stars >= 0 &&
      creator &&
      solution &&
      participants.length >= 0
    ) {
      const controller: KatasController = new KatasController();

      let kata: IKata = {
        name,
        description,
        level,
        intents,
        stars,
        creator,
        solution,
        participants,
      };

      const response: any = await controller.updateKata(id, kata);

      return res.status(200).send(response);
    } else {
      return res.status(400).send({
        message:
          "[ERROR] Updating Kata. You need to send all attributes of kata to update it",
      });
    }
  })
  .post(jsonParser, verifyToken, async (req: Request, res: Response) => {
    let name: string = req.body.name;
    let description: string = req.body.description || "Default description";
    let level: KataLevel = req.body.level || KataLevel.BASIC;
    let intents: number = req.body.intents || 0;
    let stars: number = req.body.stars || 1;
    let creator: string = req.body.creator;
    let solution: string = req.body.solution || "Default solution";
    let participants: string[] = req.body.participants || [];

    if (
      name &&
      description &&
      level &&
      intents >= 0 &&
      stars >= 0 &&
      creator &&
      solution &&
      participants.length >= 0
    ) {
      const controller: KatasController = new KatasController();

      let kata: IKata = {
        name,
        description,
        level,
        intents,
        stars,
        creator,
        solution,
        participants,
      };

      const response: any = await controller.createKata(kata);

      return res.status(201).send(response);
    } else {
      return res.status(400).send({
        message:
          "[ERROR] Creating Kata. You need to send all attributes of kata to update it",
      });
    }
  });

export default kataRouter;
