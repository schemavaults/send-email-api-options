import {
  getAppEnvironment,
  getHardcodedApiServerDomain,
  SCHEMAVAULTS_MAIL_APP_DEFINITION,
  type SchemaVaultsAppEnvironment,
} from "@schemavaults/app-definitions";
import getSchemaVaultsMailApiKey from "./get-api-key";

export interface EmailTemplate {
  id: string;
  description: string;
}

export interface IListEmailTemplatesOpts {
  bearerToken?: string;
  mailServerUrl?: string;
  environment?: SchemaVaultsAppEnvironment;
}

export async function listEmailTemplates(
  opts: IListEmailTemplatesOpts = {},
): Promise<EmailTemplate[]> {
  let environment: SchemaVaultsAppEnvironment;
  if (opts.environment) {
    environment = opts.environment;
  } else {
    try {
      environment = getAppEnvironment();
    } catch {
      environment = "production";
    }
  }

  let bearerToken: string;
  if (opts.bearerToken && typeof opts.bearerToken === "string") {
    bearerToken = opts.bearerToken;
  } else {
    bearerToken = getSchemaVaultsMailApiKey();
  }

  const mail_server_url: string = getHardcodedApiServerDomain(
    SCHEMAVAULTS_MAIL_APP_DEFINITION.app_id,
    environment,
  ).domain;
  const endpoint: string = `${mail_server_url}/api/templates`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (!response.ok || response.status !== 200) {
    let errorMessage = "Error response while trying to list email templates!";
    try {
      const errBody = await response.json();
      if (
        typeof errBody === "object" &&
        !!errBody &&
        "message" in errBody &&
        typeof errBody.message === "string"
      ) {
        errorMessage = errBody.message;
      }
    } catch {
      // ignore JSON parse failure, fall back to default
    }
    throw new Error(errorMessage);
  }

  const responseBody = await response.json();
  if (typeof responseBody !== "object" || !responseBody) {
    throw new Error("Failed to parse JSON object from response!");
  }
  if (!("success" in responseBody) || !responseBody.success) {
    throw new Error("Failure indicated in response body!");
  }
  if (!("data" in responseBody) || !Array.isArray(responseBody.data)) {
    throw new Error("Missing 'data' array in response body!");
  }

  return responseBody.data as EmailTemplate[];
}

export default listEmailTemplates;
