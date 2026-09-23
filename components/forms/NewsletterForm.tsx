"use client";

import { T, useT } from "@/lib/i18n/T";

/** Newsletter signup — real POST to FormSubmit.co, no backend of our own. */
export function NewsletterForm() {
  const t = useT();
  return (
    <form className="newsletter-form" action="https://formsubmit.co/info@royaldencapital.ca" method="POST">
      <input type="hidden" name="_subject" value="Newsletter enroll" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input
        className="form-control form-control-lg"
        type="text"
        name="name"
        placeholder={t("home_newsletter_name_ph", "Name")}
        required
      />
      <input
        className="form-control form-control-lg"
        type="email"
        name="email"
        placeholder={t("home_newsletter_email_ph", "Email")}
        required
      />
      <button className="btn btn-gold btn-lg" type="submit">
        <T k="home_newsletter_signup">Sign Up</T>
      </button>
    </form>
  );
}
