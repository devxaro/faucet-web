import { Service } from "typedi";
import { RequestSecurityType, RequestVerbType } from "@objects/Enums";
import { AbstractHttpRequest } from "@services/AbstractHttpRequest";

@Service()
export class AppService extends AbstractHttpRequest {
  readonly modelName = "app";
  constructor() {
    super();
  }

  async getConfig(): Promise<any> {
    const response = await this.makeRequest(
      `${this.modelName}/config`,
      undefined,
      undefined,
      RequestSecurityType.Public,
      RequestVerbType.Get,
    );

    return response;
  }
}
