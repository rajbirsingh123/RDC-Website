"use client";

import { useState } from "react";
import { T, useT } from "@/lib/i18n/T";

export interface LeadFormOption {
  key: string;
  fallback: string;
}

export const NEED_OPTIONS: LeadFormOption[] = [
  { key: "home_opt_select", fallback: "Select Options" },
  { key: "home_opt_first_time", fallback: "First Time Buyers" },
  { key: "home_opt_next_house", fallback: "Buy Your Next House" },
  { key: "home_opt_second_mortgage", fallback: "Second Mortgage" },
  { key: "home_opt_transfer", fallback: "Transfer Your Mortgage" },
  { key: "home_opt_refinance", fallback: "Refinance Your Mortgage" },
  { key: "home_opt_renew", fallback: "Renew Your Mortgage" },
  { key: "home_opt_investment", fallback: "Investment Property" },
  { key: "home_opt_bridge", fallback: "Bridge Financing" },
  { key: "home_opt_newcomers", fallback: "Newcomers to Canada" },
  { key: "home_opt_heloc", fallback: "Home Equity Line of Credit (HELOC)" },
  { key: "home_opt_preconstruction", fallback: "Pre-construction Business Expansion Mortgage" },
];

export interface LeadFormFieldKeys {
  name: LeadFormOption;
  email: LeadFormOption;
  phone: LeadFormOption;
  services: LeadFormOption;
  subject: LeadFormOption;
  message: LeadFormOption;
  submit: LeadFormOption;
}

const DEFAULT_FIELD_KEYS: LeadFormFieldKeys = {
  name: { key: "home_form_name", fallback: "Your Name" },
  email: { key: "home_form_email", fallback: "Your Email" },
  phone: { key: "home_form_phone", fallback: "Your Phone" },
  services: { key: "home_form_services", fallback: "Services Required" },
  subject: { key: "home_form_subject", fallback: "Subject" },
  message: { key: "home_form_message", fallback: "Your message (optional)" },
  submit: { key: "home_form_submit", fallback: "Submit" },
};

/**
 * Contact form: real POST to FormSubmit.co, same pattern as NewsletterForm/ApplyWizard (no
 * backend of our own). `fieldKeys` and `needOptions` let a page reuse this component with its
 * own i18n keys/copy (e.g. contact-us uses cu_form_* keys and a different services list) without
 * duplicating markup.
 */
export function LeadForm({
  fieldKeys = DEFAULT_FIELD_KEYS,
  needOptions = NEED_OPTIONS,
}: {
  fieldKeys?: LeadFormFieldKeys;
  needOptions?: LeadFormOption[];
}) {
  const t = useT();
  const [values, setValues] = useState({ name: "", email: "", phone: "", need: "", subject: "", message: "" });

  const update = (field: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((prev) => ({ ...prev, [field]: event.target.value }));

  return (
    <form
      className="lead-form row g-3"
      action="https://formsubmit.co/info@royaldencapital.ca"
      method="POST"
    >
      <input type="hidden" name="_subject" value={values.subject || `Royal Den Capital inquiry - ${values.need}`} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value={typeof window !== "undefined" ? `${window.location.origin}/apply/thank-you/` : "/apply/thank-you/"} />
      <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
      <div className="col-md-6">
        <label className="form-label" htmlFor="name">
          <T k={fieldKeys.name.key}>{fieldKeys.name.fallback}</T>
        </label>
        <input id="name" name="name" className="form-control form-control-lg" type="text" required value={values.name} onChange={update("name")} />
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="email">
          <T k={fieldKeys.email.key}>{fieldKeys.email.fallback}</T>
        </label>
        <input id="email" name="email" className="form-control form-control-lg" type="email" required value={values.email} onChange={update("email")} />
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="phone">
          <T k={fieldKeys.phone.key}>{fieldKeys.phone.fallback}</T>
        </label>
        <input id="phone" name="phone" className="form-control form-control-lg" type="tel" value={values.phone} onChange={update("phone")} />
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="need">
          <T k={fieldKeys.services.key}>{fieldKeys.services.fallback}</T>
        </label>
        <select id="need" name="need" className="form-select form-select-lg" required value={values.need} onChange={update("need")}>
          {needOptions.map((option) => (
            <option key={option.key} value={option.key === needOptions[0].key ? "" : t(option.key, option.fallback)}>
              {t(option.key, option.fallback)}
            </option>
          ))}
        </select>
      </div>
      <div className="col-12">
        <label className="form-label" htmlFor="subject">
          <T k={fieldKeys.subject.key}>{fieldKeys.subject.fallback}</T>
        </label>
        <input id="subject" name="subject" className="form-control form-control-lg" type="text" required value={values.subject} onChange={update("subject")} />
      </div>
      <div className="col-12">
        <label className="form-label" htmlFor="message">
          <T k={fieldKeys.message.key}>{fieldKeys.message.fallback}</T>
        </label>
        <textarea id="message" name="message" className="form-control" rows={5} value={values.message} onChange={update("message")} />
      </div>
      <div className="col-12">
        <button className="btn btn-gold btn-lg w-100" type="submit">
          <T k={fieldKeys.submit.key}>{fieldKeys.submit.fallback}</T>
        </button>
      </div>
    </form>
  );
}
