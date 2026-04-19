import { describe, expect, test } from "bun:test";
import {
  type SendEmailRequestBody,
  sendEmailRequestBodySchema,
} from "./send-email-request-body-schema";

describe("Example Message", () => {
  test("can parse a simple message successfully", () => {
    const parsed = sendEmailRequestBodySchema.safeParse({
      to: "support@schemavaults.com",
      subject: "Hello World!",
      message: {
        html: "<html><body><h1>Hello World!</h1></body></html>",
        text: "Hello World!",
      },
    } satisfies SendEmailRequestBody);
    expect(parsed.success).toBeTrue();
  });

  test("can parse a message with a 'from' sender successfully", () => {
    const parsed = sendEmailRequestBodySchema.safeParse({
      to: "support@schemavaults.com",
      subject: "Hello World!",
      message: {
        html: "<html><body><h1>Hello World!</h1></body></html>",
        text: "Hello World!",
      },
      from: "support@schemavaults.com",
    } satisfies SendEmailRequestBody);
    expect(parsed.success).toBeTrue();
  });

  test("can parse a message with 'dryRun: true'", () => {
    const parsed = sendEmailRequestBodySchema.safeParse({
      to: "support@schemavaults.com",
      subject: "Hello World!",
      message: {
        html: "<html><body><h1>Hello World!</h1></body></html>",
        text: "Hello World!",
      },
      dryRun: true,
    } satisfies SendEmailRequestBody);
    expect(parsed.success).toBeTrue();
  });

  test("rejects a non-boolean 'dryRun'", () => {
    const parsed = sendEmailRequestBodySchema.safeParse({
      to: "support@schemavaults.com",
      subject: "Hello World!",
      message: {
        html: "<html><body><h1>Hello World!</h1></body></html>",
        text: "Hello World!",
      },
      dryRun: "yes",
    });
    expect(parsed.success).toBeFalse();
  });
});
