"use server";

import nodemailer from "nodemailer";
import {
  contactSchema,
  type ContactFormErrors,
  type ContactFormInput,
} from "@/lib/contactSchema";

const OWNER_EMAIL = "hyanase4@gmail.com";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: ContactFormErrors;
  values?: Partial<ContactFormInput>;
  submittedAt?: number;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const website = String(formData.get("website") ?? "");
  if (website) {
    return {
      status: "success",
      message: "お問い合わせを受け付けました。",
      submittedAt: Date.now(),
    };
  }

  const result = contactSchema.safeParse(values);
  if (!result.success) {
    return {
      status: "error",
      message: "入力内容を確認してください。",
      errors: result.error.flatten().fieldErrors,
      values,
    };
  }

  try {
    await sendContactMail(result.data);
  } catch (error) {
    console.error("Failed to send contact mail:", error);

    if (error instanceof Error && error.message === "SMTP_CONFIG_MISSING") {
      return {
        status: "error",
        message: "メール送信設定が未設定です。お手数ですが、メールで直接ご連絡ください。",
        values: result.data,
      };
    }

    return {
      status: "error",
      message: "送信に失敗しました。時間をおいてもう一度お試しください。",
      values: result.data,
    };
  }

  return {
    status: "success",
    message: "お問い合わせを受け付けました。内容を確認のうえ、ご連絡します。",
    submittedAt: Date.now(),
  };
}

async function sendContactMail(input: ContactFormInput) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const smtpFrom = process.env.SMTP_FROM ?? smtpUser;

  if (!smtpHost || !smtpUser || !smtpPassword || !smtpFrom) {
    throw new Error("SMTP_CONFIG_MISSING");
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  const subject = `【Portfolio】お問い合わせ: ${input.name}様`;
  const body = createContactMailBody(input);

  await transporter.sendMail({
    from: smtpFrom,
    to: OWNER_EMAIL,
    replyTo: input.email,
    subject,
    text: body,
  });

  await transporter.sendMail({
    from: smtpFrom,
    to: input.email,
    replyTo: OWNER_EMAIL,
    subject: "【Portfolio】お問い合わせを受け付けました",
    text: [
      `${input.name}様`,
      "",
      "お問い合わせありがとうございます。",
      "以下の内容でお問い合わせを受け付けました。",
      "内容を確認のうえ、ご連絡いたします。",
      "",
      body,
    ].join("\n"),
  });
}

function createContactMailBody(input: ContactFormInput) {
  return [
    "お問い合わせ内容",
    "",
    `お名前: ${input.name}`,
    `メールアドレス: ${input.email}`,
    "",
    "お問い合わせ内容:",
    input.message,
  ].join("\n");
}
