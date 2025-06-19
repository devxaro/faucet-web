import { Service } from "typedi";
import { RequestSecurityType, RequestVerbType } from "@objects/Enums";
import { AbstractCrudService } from "./AbstractCrudService";
import { IAccount } from "src/interfaces/IAccount";

@Service()
export class AccountService extends AbstractCrudService<IAccount> {
  constructor() {
    super("accounts");
  }

  async connectAccount(address: string): Promise<IAccount> {
    const response = await this.makeRequest(
      `${this.modelName}/${address}/connect`,
      undefined,
      undefined,
      RequestSecurityType.Public,
      RequestVerbType.Get,
    );

    return response;
  }

  async getConnectedAccount(): Promise<IAccount> {
    const response = await this.makeRequest(
      `${this.modelName}`,
      undefined,
      undefined,
      RequestSecurityType.Protected,
      RequestVerbType.Get,
    );

    return response;
  }

  async claimRewards(): Promise<void> {
    await this.makeRequest(
      `${this.modelName}/claim`,
      undefined,
      undefined,
      RequestSecurityType.Protected,
      RequestVerbType.Get,
    );
  }
}
