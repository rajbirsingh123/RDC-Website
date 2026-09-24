"use client";

import { useState } from "react";
import { T } from "@/lib/i18n/T";

/**
 * Careers page's application form (#careerForm in the legacy site): name, email, phone, licence
 * status, experience, city, message. Builds a mailto: link client-side on submit, mirroring
 * legacy-site/script.js's #careerForm submit handler exactly (same subject/body format).
 */
export function CareerForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    licence: "",
    experience: "",
    city: "",
    message: "",
  });

  const update = (field: keyof typeof values) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setValues((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const applicantName = values.name || "Career applicant";
    const subject = encodeURIComponent(`Career application - ${applicantName}`);
    const body = encodeURIComponent(
      `Name: ${values.name}\n` +
        `Email: ${values.email}\n` +
        `Phone: ${values.phone}\n` +
        `City: ${values.city}\n` +
        `Licence Status: ${values.licence}\n` +
        `Experience: ${values.experience}\n\n` +
        `Why RDC:\n${values.message}`
    );
    window.location.href = `mailto:info@royaldencapital.ca?subject=${subject}&body=${body}`;
  };

  return (
    <form className="career-form" id="careerForm" onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label" htmlFor="careerName">
            <T k="cr_form_fullname">Full Name</T>
          </label>
          <input
            className="form-control form-control-lg"
            id="careerName"
            name="name"
            type="text"
            required
            value={values.name}
            onChange={update("name")}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="careerEmail">
            <T k="cr_form_email">Email</T>
          </label>
          <input
            className="form-control form-control-lg"
            id="careerEmail"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={update("email")}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="careerPhone">
            <T k="cr_form_phone">Phone</T>
          </label>
          <input
            className="form-control form-control-lg"
            id="careerPhone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={update("phone")}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="careerLicence">
            <T k="cr_form_licence">Licence Status</T>
          </label>
          <select
            className="form-select form-select-lg"
            id="careerLicence"
            name="licence"
            required
            value={values.licence}
            onChange={update("licence")}
          >
            <option value="">
              <T k="cr_opt_select_status">Select status</T>
            </option>
            <option value="Licensed Mortgage Agent">
              <T k="cr_opt_licensed_agent">Licensed Mortgage Agent</T>
            </option>
            <option value="Licensed Mortgage Broker">
              <T k="cr_opt_licensed_broker">Licensed Mortgage Broker</T>
            </option>
            <option value="Currently completing licensing">
              <T k="cr_opt_completing">Currently completing licensing</T>
            </option>
            <option value="Interested but not licensed yet">
              <T k="cr_opt_interested">Interested but not licensed yet</T>
            </option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="careerExperience">
            <T k="cr_form_experience">Experience</T>
          </label>
          <select
            className="form-select form-select-lg"
            id="careerExperience"
            name="experience"
            required
            value={values.experience}
            onChange={update("experience")}
          >
            <option value="">
              <T k="cr_opt_select_exp">Select experience</T>
            </option>
            <option value="New to mortgage industry">
              <T k="cr_opt_new">New to mortgage industry</T>
            </option>
            <option value="Less than 1 year">
              <T k="cr_opt_less1">Less than 1 year</T>
            </option>
            <option value="1-3 years">
              <T k="cr_opt_1to3">1-3 years</T>
            </option>
            <option value="3+ years">
              <T k="cr_opt_3plus">3+ years</T>
            </option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="careerCity">
            <T k="cr_form_city">City</T>
          </label>
          <input
            className="form-control form-control-lg"
            id="careerCity"
            name="city"
            type="text"
            placeholder="Oakville / GTA / Other"
            value={values.city}
            onChange={update("city")}
          />
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="careerMessage">
            <T k="cr_form_why">Why do you want to join RDC?</T>
          </label>
          <textarea className="form-control" id="careerMessage" name="message" rows={5} value={values.message} onChange={update("message")} />
        </div>
        <div className="col-12">
          <p className="career-form-note">
            <T k="cr_form_note">
              By applying, you agree to be contacted by Royal Den Capital about career opportunities. Please do not
              include sensitive client information.
            </T>
          </p>
        </div>
        <div className="col-12">
          <button className="btn btn-gold btn-lg w-100" type="submit">
            <T k="cr_form_submit">Send Career Application</T>
          </button>
        </div>
      </div>
    </form>
  );
}
