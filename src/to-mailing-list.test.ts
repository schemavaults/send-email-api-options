import { describe, expect, test } from "bun:test";
import {
  type SendEmailRequestBody,
  createSendEmailRequestBodySchema,
} from "./send-email-request-body-schema";

const sendEmailRequestBodySchema = createSendEmailRequestBodySchema(true);

describe("Mailing List", () => {
  test("can parse a message to a mailing list successfully", () => {
    const parsed = sendEmailRequestBodySchema.safeParse({
      to: crypto.randomUUID(),
      subject: "Hello World!",
      message: {
        html: "<html><body><h1>Hello World!</h1></body></html>",
        text: "Hello World!",
      },
    } satisfies SendEmailRequestBody);
    expect(parsed.success).toBeTrue();
  });
});
