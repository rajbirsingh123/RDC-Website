"use client";

import { useState } from "react";
import { T } from "@/lib/i18n/T";

/**
 * About Us page's contact form: name / company / phone / email / subject / message. Different
 * field set than the homepage/contact-us lead form (has "Company", no "Services Required"
 * dropdown), so it isn't a fit for <LeadForm/> — kept local to this page. Same mailto: handoff
 * pattern as LeadForm (no backend), matching the original static site.
 */
export function AboutContactForm() {
  const [values, setValues] = useState({ name: "", company: "", phone: "", email: "", subject: "", message: "" });

  const update = (field: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(values.subject || "Royal Den Capital inquiry");
    const body = encodeURIComponent(
      `Name: ${values.name}\nCompany: ${values.company}\nPhone: ${values.phone}\nEmail: ${values.email}\n\n${values.message}`
    );
    window.location.href = `mailto:info@royaldencapital.ca?subject=${subject}&body=${body}`;
  };

  return (
    <form className="lead-form row g-3" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <label className="form-label" htmlFor="name">
          <T k="au_form_name">Name</T>
        </label>
        <input id="name" name="name" className="form-control form-control-lg" type="text" required value={values.name} onChange={update("name")} />
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="company">
          <T k="au_form_company">Company</T>
        </label>
        <input id="company" name="company" className="form-control form-control-lg" type="text" value={values.company} onChange={update("company")} />
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="phone">
          <T k="au_form_phone">Phone</T>
        </label>
        <input id="phone" name="phone" className="form-control form-control-lg" type="tel" value={values.phone} onChange={update("phone")} />
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="email">
          <T k="au_form_email">Email</T>
        </label>
        <input id="email" name="email" className="form-control form-control-lg" type="email" required value={values.email} onChange={update("email")} />
      </div>
      <div className="col-12">
        <label className="form-label" htmlFor="subject">
          <T k="au_form_subject">Subject</T>
        </label>
        <input id="subject" name="subject" className="form-control form-control-lg" type="text" required value={values.subject} onChange={update("subject")} />
      </div>
      <div className="col-12">
        <label className="form-label" htmlFor="message">
          <T k="au_form_message">Message</T>
        </label>
        <textarea id="message" name="message" className="form-control" rows={5} value={values.message} onChange={update("message")} />
      </div>
      <div className="col-12">
        <button className="btn btn-gold btn-lg w-100" type="submit">
          <T k="au_form_send">Send</T>
        </button>
      </div>
    </form>
  );
}
