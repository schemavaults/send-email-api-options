import type { SchemaVaultsAppEnvironment } from "@schemavaults/app-definitions";
import type { SendEmailRequestBody } from "./send-email-request-body-schema";
import sendEmail, { type ISendEmailOpts } from "./send-email";

export function getSchemaVaultsMailingListId(): string {
  if (
    !process.env.SCHEMAVAULTS_MAILING_LIST_ID ||
    typeof process.env.SCHEMAVAULTS_MAILING_LIST_ID !== "string"
  ) {
    throw new Error(
      "Failed to load mailing list ID from environment variable 'SCHEMAVAULTS_MAILING_LIST_ID'",
    );
  }
  return process.env.SCHEMAVAULTS_MAILING_LIST_ID;
}

export interface ISendEmailToMailingListOpts extends Omit<
  ISendEmailOpts,
  "body"
> {
  body: Omit<SendEmailRequestBody, "to" | "cc" | "bcc">;
  bearerToken?: string;
  mailServerUrl?: string;
  environment?: SchemaVaultsAppEnvironment;
}

export async function sendEmailToMailingList(
  opts: ISendEmailOpts,
): Promise<void> {
  const to: string = getSchemaVaultsMailingListId();
  return await sendEmail({
    ...opts,
    body: {
      ...opts.body,
      to,
    },
  });
}

export default sendEmailToMailingList;
