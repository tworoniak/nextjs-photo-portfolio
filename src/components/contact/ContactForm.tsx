"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import type { ContactPayload } from "@/app/api/contact/route";
import styles from "./ContactForm.module.scss";

const PROJECT_TYPES = [
  "Concert Photography",
  "Editorial / Promotional",
  "Event Coverage",
  "Licensing / Publication",
  "Other",
];

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload: ContactPayload = {
      name: data.get("name") as string,
      email: data.get("email") as string,
      projectType: data.get("projectType") as string,
      subject: data.get("subject") as string,
      message: data.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error ?? "Something went wrong.");
      }

      setState("success");
      form.reset();
    } catch (err) {
      setState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (state === "success") {
    return (
      <div className={styles.success}>
        <p className={styles.successTitle}>Message sent.</p>
        <p className={styles.successBody}>
          Thanks for reaching out — I&apos;ll be in touch soon.
        </p>
        <button className={styles.resetLink} onClick={() => setState("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.row}>
        <Input label="Name" name="name" required placeholder="Your name" autoComplete="name" />
        <Input label="Email" name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
      </div>

      <div className={styles.field}>
        <label htmlFor="projectType" className={styles.selectLabel}>
          Project type
        </label>
        <select id="projectType" name="projectType" className={styles.select} defaultValue="">
          <option value="" disabled>Select a type</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <Input label="Subject" name="subject" required placeholder="e.g. Concert photography inquiry" />

      <TextArea
        label="Message"
        name="message"
        required
        placeholder="Tell me about your project, event date, venue, and any other details."
        rows={6}
      />

      {state === "error" && (
        <p className={styles.formError} role="alert">{errorMessage}</p>
      )}

      <div role="status" aria-live="polite" aria-atomic="true" className={styles.srOnly}>
        {state === "loading" && "Sending message…"}
      </div>

      <Button type="submit" size="lg" loading={state === "loading"}>
        Send message
      </Button>
    </form>
  );
}
