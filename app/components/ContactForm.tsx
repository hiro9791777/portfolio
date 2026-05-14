"use client";

import { useActionState } from "react";
import {
  submitContactForm,
  type ContactFormState,
} from "../actions/contact";
import { ChevronRightIcon, EnvelopeIcon } from "./Icon";
import styles from "../page.module.css";

const initialContactFormState: ContactFormState = {
  status: "idle",
  message: "",
};

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) {
    return null;
  }

  return (
    <p className={styles["contact-form__error"]} aria-live="polite">
      {errors[0]}
    </p>
  );
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialContactFormState,
  );

  return (
    <div className={styles["contact-form-wrap"]}>
      <form
        key={state.submittedAt ?? "contact-form"}
        action={formAction}
        className={styles["contact-form"]}
        noValidate
      >
        <div className={styles["contact-form__field"]}>
          <label htmlFor="contact-name" className={styles["contact-form__label"]}>
            お名前
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            className={styles["contact-form__input"]}
            defaultValue={state.values?.name ?? ""}
            autoComplete="name"
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={
              state.errors?.name ? "contact-name-error" : undefined
            }
          />
          <div id="contact-name-error">
            <FieldError errors={state.errors?.name} />
          </div>
        </div>

        <div className={styles["contact-form__field"]}>
          <label htmlFor="contact-email" className={styles["contact-form__label"]}>
            メールアドレス
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className={styles["contact-form__input"]}
            defaultValue={state.values?.email ?? ""}
            autoComplete="email"
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={
              state.errors?.email ? "contact-email-error" : undefined
            }
          />
          <div id="contact-email-error">
            <FieldError errors={state.errors?.email} />
          </div>
        </div>

        <div className={styles["contact-form__field"]}>
          <label htmlFor="contact-message" className={styles["contact-form__label"]}>
            お問い合わせ内容
          </label>
          <textarea
            id="contact-message"
            name="message"
            className={`${styles["contact-form__input"]} ${styles["contact-form__textarea"]}`}
            defaultValue={state.values?.message ?? ""}
            rows={7}
            aria-invalid={Boolean(state.errors?.message)}
            aria-describedby={
              state.errors?.message ? "contact-message-error" : undefined
            }
          />
          <div id="contact-message-error">
            <FieldError errors={state.errors?.message} />
          </div>
        </div>

        <input
          className={styles["contact-form__honeypot"]}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />

        {state.message ? (
          <p
            className={`${styles["contact-form__status"]} ${
              state.status === "success"
                ? styles["contact-form__status--success"]
                : styles["contact-form__status--error"]
            }`}
            aria-live="polite"
          >
            {state.message}
          </p>
        ) : null}

        <button
          type="submit"
          className={`${styles.button} ${styles["button--primary"]} ${styles["contact-form__button"]}`}
          disabled={pending}
        >
          <span>
            <EnvelopeIcon aria-hidden="true" />
            {pending ? "送信中..." : "送信する"}
          </span>
          <span>
            <ChevronRightIcon
              className={styles.button__arrow}
              aria-hidden="true"
            />
          </span>
        </button>
      </form>

      <a
        href="mailto:hyanase4@gmail.com"
        className={styles["contact-form__mail-link"]}
      >
        メールで直接連絡する
      </a>
    </div>
  );
}
