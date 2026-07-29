"use client";

import { FormEvent, useRef, useState, useSyncExternalStore } from "react";
import type { Locale } from "@/lib/site";

interface InquiryFormProps {
  locale: Locale;
}

type FormStatus = "idle" | "invalid" | "not-configured" | "copied" | "copy-failed";

function subscribeToHydration() {
  return () => {};
}

const copy = {
  en: {
    name: "Full name",
    email: "Email address",
    organisation: "Organisation",
    intention: "Nature of inquiry",
    message: "Briefly describe the opportunity",
    choose: "Choose one",
    options: [
      "Property and real estate",
      "Enterprise or investment partnership",
      "Institutional or speaking invitation",
      "Leadership collaboration",
      "Ministry inquiry",
    ],
    submit: "Prepare inquiry",
    note: "Your information is used only to respond to this inquiry.",
    invalid: "Please complete the required fields with a valid email address.",
    unavailable:
      "Your inquiry is ready, but online delivery is not yet connected. Nothing has been sent. Copy the text below and keep it until the published contact channel appears.",
    copyAction: "Copy my inquiry",
    copied: "Copied. Nothing was sent from this page — paste it into the channel you use to reach Papa Tony.",
    copyFailed:
      "Copying was blocked by your browser. Select the text in the fields above and copy it manually. Nothing has been sent.",
    labels: {
      name: "Name",
      email: "Email",
      organisation: "Organisation",
      intention: "Nature of inquiry",
      message: "Opportunity",
    },
  },
  fr: {
    name: "Nom complet",
    email: "Adresse e-mail",
    organisation: "Organisation",
    intention: "Objet de la demande",
    message: "Décrivez brièvement l'opportunité",
    choose: "Choisir",
    options: [
      "Immobilier et foncier",
      "Partenariat d'entreprise ou d'investissement",
      "Invitation institutionnelle ou prise de parole",
      "Collaboration en leadership",
      "Demande liée au ministère",
    ],
    submit: "Préparer la demande",
    note: "Vos informations servent uniquement à répondre à cette demande.",
    invalid:
      "Veuillez remplir les champs obligatoires et saisir une adresse e-mail valide.",
    unavailable:
      "Votre demande est prête, mais l'envoi en ligne n'est pas encore connecté. Rien n'a été envoyé. Copiez le texte ci-dessous et conservez-le jusqu'à la publication du canal de contact.",
    copyAction: "Copier ma demande",
    copied:
      "Copié. Rien n'a été envoyé depuis cette page — collez le texte dans le canal que vous utilisez pour joindre Papa Tony.",
    copyFailed:
      "La copie a été bloquée par votre navigateur. Sélectionnez le texte des champs ci-dessus et copiez-le manuellement. Rien n'a été envoyé.",
    labels: {
      name: "Nom",
      email: "E-mail",
      organisation: "Organisation",
      intention: "Objet",
      message: "Opportunité",
    },
  },
};

export function InquiryForm({ locale }: InquiryFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
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
    if (!form.checkValidity()) {
      setStatus("invalid");
      form.reportValidity();
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
      <label>
        <span>{text.intention} *</span>
        <select name="intention" required defaultValue="">
          <option value="" disabled>
            {text.choose}
          </option>
          {text.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
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
