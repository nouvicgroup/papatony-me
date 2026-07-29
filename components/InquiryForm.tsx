"use client";

import { FormEvent, useState, useSyncExternalStore } from "react";
import type { Locale } from "@/lib/site";

interface InquiryFormProps {
  locale: Locale;
}

type FormStatus = "idle" | "invalid" | "not-configured";

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
      "Your inquiry is ready, but online delivery is not yet connected. Please keep this page open and use the published contact channel once it appears.",
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
      "Votre demande est prête, mais l'envoi en ligne n'est pas encore connecté. Gardez cette page ouverte et utilisez le canal de contact publié dès qu'il sera disponible.",
  },
};

export function InquiryForm({ locale }: InquiryFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const text = copy[locale];

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

  return (
    <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
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
        <p
          className={status === "invalid" ? "form-status error" : "form-status"}
          role="alert"
        >
          {status === "invalid" ? text.invalid : text.unavailable}
        </p>
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
