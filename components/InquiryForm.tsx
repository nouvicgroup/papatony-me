"use client";

import { FormEvent, useRef, useState, useSyncExternalStore } from "react";
import { SelectField } from "@/components/SelectField";
import { TurnstileWidget } from "@/components/TurnstileWidget";
import type { Locale } from "@/lib/site";
import { turnstileConfigured } from "@/lib/turnstile";

interface InquiryFormProps {
  locale: Locale;
}

type FormStatus = "idle" | "invalid" | "not-configured" | "copied" | "copy-failed";

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
    note: "Only used to reply to you.",
    invalid: "Please fill in the required fields, and check the email address.",
    unavailable:
      "Your message is ready, but I have nowhere to receive it yet \u2014 no email or WhatsApp number is published. Nothing has been sent. Copy it and send it however you normally reach me.",
    copyAction: "Copy my message",
    copied:
      "Copied. Nothing was sent from this page \u2014 paste it wherever you're reaching me.",
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
    note: "Sert uniquement \u00e0 vous r\u00e9pondre.",
    invalid:
      "Merci de remplir les champs obligatoires et de v\u00e9rifier l\u2019adresse e-mail.",
    unavailable:
      "Votre message est pr\u00eat, mais il n\u2019y a pas encore o\u00f9 l\u2019envoyer \u2014 aucune adresse e-mail ni num\u00e9ro WhatsApp n\u2019est publi\u00e9. Rien n\u2019a \u00e9t\u00e9 envoy\u00e9. Copiez-le et transmettez-le par le canal que vous utilisez d\u2019habitude.",
    copyAction: "Copier mon message",
    copied:
      "Copi\u00e9. Rien n\u2019a \u00e9t\u00e9 envoy\u00e9 depuis cette page \u2014 collez le texte l\u00e0 o\u00f9 vous le joignez.",
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
  const formRef = useRef<HTMLFormElement>(null);
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const text = copy[locale];
  const prepared =
    status === "not-configured" || status === "copied" || status === "copy-failed";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity() || !intention) {
      setStatus("invalid");
      form.reportValidity();
      return;
    }
    // Only gates when Turnstile is actually configured; see lib/turnstile.ts.
    if (turnstileConfigured && !turnstileToken) {
      setStatus("invalid");
      return;
    }
    setStatus("not-configured");
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
    status === "invalid"
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
          className={status === "invalid" ? "form-status error" : "form-status"}
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
      <TurnstileWidget locale={locale} onToken={setTurnstileToken} />
      <div className="form-submit">
        <small>{text.note}</small>
        <button type="submit" disabled={!hydrated}>
          {text.submit}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  );
}
