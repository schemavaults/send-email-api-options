export {
  sendEmailRequestBodySchema,
  sendEmailRequestBodySchema as default,
  createSendEmailRequestBodySchema,
} from "./send-email-request-body-schema";
export type { SendEmailRequestBody } from "./send-email-request-body-schema";

export { emailTemplateIdSchema } from "./email-template-id-schema";

export { getSchemaVaultsMailApiKey, sendEmail } from "./send-email";

export {
  getSchemaVaultsMailingListId,
  sendEmailToMailingList,
} from "./send-email-to-mailing-list";
