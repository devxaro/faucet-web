import CryptoJS from "crypto-js";
import { RequestSecurityType, RequestVerbType } from "@objects/Enums";
import { getAccessToken } from "@utils/AuthUtils";
import { HttpClient } from "./HttpClient";

export class AbstractHttpRequest {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(import.meta.env.VITE_API_BASE_URL);
  }

  async makeRequest(
    resource: string,
    data: any = {},
    params: any = {},
    security?: RequestSecurityType,
    verb?: RequestVerbType,
  ) {
    const accessToken = getAccessToken();

    if (
      !accessToken &&
      (security === RequestSecurityType.Protected ||
        security === RequestSecurityType.Signed)
    ) {
      throw new Error("Missing token to process request");
    }

    if (
      security === RequestSecurityType.Protected ||
      security === RequestSecurityType.Signed
    ) {
      this.httpClient.setHeader("Authorization", `Bearer ${accessToken}`);
    }

    if (security === RequestSecurityType.Signed) {
      const timestamp = Date.now();
      params.timestamp = timestamp;
      const dataString = JSON.stringify({ ...data, timestamp });

      params.signature = this.sign(dataString);
    }

    return this.httpClient.request(resource, params, verb, data);
  }

  sign(message: any) {
    return CryptoJS.HmacSHA256(
      message,
      import.meta.env.VITE_HMAC_SECRET_KEY,
    ).toString(CryptoJS.enc.Hex);
  }
}
