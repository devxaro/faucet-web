import { Service } from "typedi";
import { IDocs } from "@interfaces/IDocs";
import { IGame } from "@interfaces/IGame";
import { IWinner } from "@interfaces/IWinner";
import { RequestSecurityType, RequestVerbType } from "@objects/Enums";
import { AbstractCrudService } from "./AbstractCrudService";

@Service()
export class GameService extends AbstractCrudService<IGame> {
  constructor() {
    super("games");
  }

  async processGame(payload: IGame): Promise<void> {
    await this.makeRequest(
      this.modelName,
      payload,
      undefined,
      RequestSecurityType.Signed,
      RequestVerbType.Post,
    );
  }

  async getWinners(): Promise<IDocs<IWinner>> {
    const response = await this.makeRequest(
      `${this.modelName}/winners`,
      undefined,
      undefined,
      RequestSecurityType.Public,
      RequestVerbType.Get,
    );

    return response;
  }
}
