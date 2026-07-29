"use client";

import { FormEvent, useRef, useState, useSyncExternalStore } from "react";
import { SelectField } from "@/components/SelectField";
import { TurnstileWidget } from "@/components/TurnstileWidget";
import type { Locale } from "@/lib/site";
import { turnstileConfigured } from "@/lib/turnstile";

interface InquiryFormProps {
  locale: Locale;
}

type FormStatus =
  | "idle"
  | "invalid"
  | "checking"
  | "not-configured"
  | "sent"
  | "blocked"
  | "copied"
  | "copy-failed";

function subscribeToHydration() {
  return () => {};
}

const copy = {
  en: {
    name: "Your name",
    email: "Email",
    organisation: "Company (optional)",
    intention: "What is this about",
    message: "What are you looking at?",
    options: [
      "Property or land",
      "A business or investment partnership",
      "An invitation to speak",
      "Leadership or training",
      "Ministry",
    ],
    choose: "Choose one",
    submit: "Review my message",
    checking: "Checking you are human\u2026",
    sent: "Sent. I\u2019ll reply to the address you gave.",
    blocked: "That check did not pass, so nothing was sent. Please try again.",
    note: "Only used to reply to you.",
    invalid: "Please fill in the required fields, and check the email address.",
    unavailable:
      "Your message is ready, but delivery from this page is temporarily unavailable. Nothing has been sent. Copy it below and send it through the channel you normally use to reach me.",
    copyAction: "Copy my message",
    copied:
      "Copied. Nothing was sent from this page; paste it wherever you're reaching me.",
    copyFailed:
      "Your browser blocked the copy. Select the text in the fields above and copy it by hand. Nothing has been sent.",
    labels: {
      name: "Name",
      email: "Email",
      organisation: "Organisation",
      intention: "About",
      message: "Details",
    },
  },
  fr: {
    name: "Votre nom",
    email: "E-mail",
    organisation: "Entreprise (facultatif)",
    intention: "De quoi s\u2019agit-il",
    message: "Qu\u2019avez-vous en vue ?",
    options: [
      "Un bien ou un terrain",
      "Une entreprise ou un partenariat d\u2019investissement",
      "Une invitation \u00e0 intervenir",
      "Leadership ou formation",
      "Minist\u00e8re",
    ],
    choose: "Choisissez",
    submit: "Relire mon message",
    checking: "V\u00e9rification en cours\u2026",
    sent: "Envoy\u00e9. Je r\u00e9pondrai \u00e0 l\u2019adresse indiqu\u00e9e.",
    blocked: "La v\u00e9rification n\u2019a pas abouti, rien n\u2019a \u00e9t\u00e9 envoy\u00e9. R\u00e9essayez.",
    note: "Sert uniquement \u00e0 vous r\u00e9pondre.",
    invalid:
      "Merci de remplir les champs obligatoires et de v\u00e9rifier l\u2019adresse e-mail.",
    unavailable:
      "Votre message est pr\u00eat, mais l\u2019envoi depuis cette page est momentan\u00e9ment indisponible. Rien n\u2019a \u00e9t\u00e9 envoy\u00e9. Copiez-le ci-dessous et transmettez-le par le canal que vous utilisez d\u2019habitude.",
    copyAction: "Copier mon message",
    copied:
      "Copi\u00e9. Rien n\u2019a \u00e9t\u00e9 envoy\u00e9 depuis cette page ; collez le texte l\u00e0 o\u00f9 vous le joignez.",
    copyFailed:
      "Votre navigateur a bloqu\u00e9 la copie. S\u00e9lectionnez le texte des champs ci-dessus et copiez-le \u00e0 la main. Rien n\u2019a \u00e9t\u00e9 envoy\u00e9.",
    labels: {
      name: "Nom",
      email: "E-mail",
      organisation: "Organisation",
      intention: "Sujet",
      message: "D\u00e9tails",
    },
  },
};

export function InquiryForm({ locale }: InquiryFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [intention, setIntention] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [resetSignal, setResetSignal] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const text = copy[locale];
  const prepared =
    status === "not-configured" ||
    status === "copied" ||
    status === "copy-failed";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity() || !intention) {
      setStatus("invalid");
      form.reportValidity();
      return;
    }
    if (turnstileConfigured && !turnstileToken) {
      setStatus("invalid");
      return;
    }

    setStatus("checking");
    const body = new FormData(form);
    body.set("cf-turnstile-response", turnstileToken);

    try {
      const response = await fetch("/api/inquiry", { method: "POST", body });
      if (!response.ok) {
        // Rejected — the spent token must be replaced before a retry.
        setResetSignal((n) => n + 1);
        setTurnstileToken("");
        setStatus("blocked");
        return;
      }
      const data = (await response.json()) as { delivered?: boolean };
      // "sent" only when the server actually delivered it.
      setStatus(data.delivered ? "sent" : "not-configured");
    } catch {
      setResetSignal((n) => n + 1);
      setTurnstileToken("");
      setStatus("blocked");
    }
  }

  async function copyInquiry() {
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const composed = [
      `${text.labels.name}: ${value("name")}`,
      `${text.labels.email}: ${value("email")}`,
      `${text.labels.organisation}: ${value("organisation") || "—"}`,
      `${text.labels.intention}: ${value("intention")}`,
      "",
      `${text.labels.message}:`,
      value("message"),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(composed);
      setStatus("copied");
    } catch {
      setStatus("copy-failed");
    }
  }

  const statusMessage =
    status === "sent"
      ? text.sent
      : status === "checking"
      ? text.checking
      : status === "blocked"
        ? text.blocked
        : status === "invalid"
      ? text.invalid
      : status === "copied"
        ? text.copied
        : status === "copy-failed"
          ? text.copyFailed
          : text.unavailable;

  return (
    <form
      className="inquiry-form"
      onSubmit={handleSubmit}
      noValidate
      ref={formRef}
    >
      <div className="form-grid">
        <label>
          <span>{text.name} *</span>
          <input name="name" autoComplete="name" required minLength={2} />
        </label>
        <label>
          <span>{text.email} *</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label>
        <span>{text.organisation}</span>
        <input name="organisation" autoComplete="organization" />
      </label>
      <SelectField
        label={`${text.intention} *`}
        name="intention"
        onChange={setIntention}
        options={text.options}
        placeholder={text.choose}
        value={intention}
      />
      <label>
        <span>{text.message} *</span>
        <textarea name="message" rows={6} required minLength={20} />
      </label>
      {status !== "idle" && (
        <div
          className={
            status === "invalid" || status === "blocked"
              ? "form-status error"
              : "form-status"
          }
          role="alert"
        >
          <p>{statusMessage}</p>
          {prepared && (
            <button className="copy-inquiry" onClick={copyInquiry} type="button">
              {text.copyAction}
            </button>
          )}
        </div>
      )}
      <TurnstileWidget
        locale={locale}
        onToken={setTurnstileToken}
        resetSignal={resetSignal}
      />
      <div className="form-submit">
        <small>{text.note}</small>
        <button type="submit" disabled={!hydrated || status === "checking"}>
          {text.submit}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  );
}
