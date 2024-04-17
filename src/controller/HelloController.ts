import { BasicResponse } from "./types";
import { IHelloController } from "./interfaces";
import { LogSucces } from "../utils/logger";

export class HelloController implements IHelloController {
  public async getMessage(name?: string): Promise<BasicResponse> {
    LogSucces("[api/hello] Get Request");
    return {
      message: `Hello ${name || "world"}`,
    };
  }
}
