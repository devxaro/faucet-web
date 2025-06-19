import { RequestSecurityType, RequestVerbType } from "@objects/Enums";
import { AbstractHttpRequest } from "../AbstractHttpRequest";
import { IDocs } from "src/interfaces/IDocs";
import { IQueryParams } from "src/interfaces/IQueryParams";

export class AbstractCrudService<T> extends AbstractHttpRequest {
  constructor(protected readonly modelName: string) {
    super();
  }

  async find(queryParams?: IQueryParams): Promise<IDocs<T>> {
    return this.makeRequest(
      `${this.modelName}`,
      undefined,
      queryParams,
      RequestSecurityType.Protected,
    );
  }

  async update(id: string, data: any): Promise<T> {
    return this.makeRequest(
      `${this.modelName}/${id}`,
      data,
      undefined,
      RequestSecurityType.Protected,
      RequestVerbType.Update,
    );
  }

  async create(data: any): Promise<T> {
    return this.makeRequest(
      `${this.modelName}`,
      data,
      undefined,
      RequestSecurityType.Protected,
      RequestVerbType.Post,
    );
  }

  async getById(id: string): Promise<T> {
    return this.makeRequest(
      `${this.modelName}/${id}`,
      undefined,
      undefined,
      RequestSecurityType.Protected,
      RequestVerbType.Get,
    );
  }

  async deleteById(id: string): Promise<T> {
    return this.makeRequest(
      `${this.modelName}/${id}`,
      undefined,
      undefined,
      RequestSecurityType.Protected,
      RequestVerbType.Delete,
    );
  }

  async activateById(id: string): Promise<T> {
    return this.makeRequest(
      `${this.modelName}/${id}/activate`,
      undefined,
      undefined,
      RequestSecurityType.Protected,
      RequestVerbType.Patch,
    );
  }

  async deactivateById(id: string): Promise<T> {
    return this.makeRequest(
      `${this.modelName}/${id}/deactivate`,
      undefined,
      undefined,
      RequestSecurityType.Protected,
      RequestVerbType.Patch,
    );
  }
}
