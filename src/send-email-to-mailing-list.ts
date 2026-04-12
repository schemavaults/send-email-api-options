import type { SendEmailRequestBody } from "./send-email-request-body-schema";
import sendEmail, { type ISendEmailOpts } from "./send-email";
import { z } from "zod";

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
  mailingListId?: string;
}

function isUuid(val: unknown): val is string {
  return typeof val === "string" && z.string().safeParse(val).success;
}

export async function sendEmailToMailingList(
  opts: ISendEmailToMailingListOpts,
): Promise<void> {
  let to: string;
  if (typeof opts.mailingListId === "string") {
    to = opts.mailingListId;
  } else {
    to = getSchemaVaultsMailingListId();
  }
  if (!isUuid(to)) {
    throw new TypeError(
      "Failed to parse 'to' field as a mailing list ID (UUID)!",
    );
  }

  return await sendEmail({
    ...opts,
    body: {
      ...opts.body,
      to,
    },
  });
}

export default sendEmailToMailingList;
