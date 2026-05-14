import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "お名前を入力してください。")
    .max(80, "お名前は80文字以内で入力してください。"),
  email: z
    .string()
    .trim()
    .min(1, "メールアドレスを入力してください。")
    .email("メールアドレスの形式で入力してください。"),
  message: z
    .string()
    .trim()
    .min(10, "お問い合わせ内容は10文字以上で入力してください。")
    .max(2000, "お問い合わせ内容は2000文字以内で入力してください。"),
});

export type ContactFormInput = z.infer<typeof contactSchema>;
export type ContactFormErrors = Partial<Record<keyof ContactFormInput, string[]>>;
