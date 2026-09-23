"use client";

import { useEffect, useRef, useState } from "react";
import { T } from "@/lib/i18n/T";

const NEED_OPTIONS = [
  { value: "Home mortgage or refinance", key: "ap_opt_mortgage", fallback: "Home mortgage or refinance" },
  { value: "Business or commercial financing", key: "ap_opt_business", fallback: "Business or commercial financing" },
  { value: "Debt consolidation or equity takeout", key: "ap_opt_debt", fallback: "Debt consolidation or equity takeout" },
  { value: "Not sure yet / general inquiry", key: "ap_opt_notsure", fallback: "Not sure yet, just exploring" },
];

const PROPERTY_TYPE_OPTIONS = [
  { value: "House", key: "ap_prop_house", fallback: "A house" },
  { value: "Condo or apartment", key: "ap_prop_condo", fallback: "A condo or apartment" },
  { value: "Townhouse", key: "ap_prop_town", fallback: "A townhouse" },
  { value: "Other", key: "ap_prop_other", fallback: "Other" },
];

const CLOSING_OPTIONS = [
  { value: "As soon as possible", key: "ap_close_asap", fallback: "As soon as possible" },
  { value: "Within 1-3 months", key: "ap_close_1to3m", fallback: "Within 1-3 months" },
  { value: "In 3-6 months", key: "ap_close_3to6m", fallback: "In 3-6 months" },
  { value: "Just exploring my options", key: "ap_close_exploring", fallback: "Just exploring my options" },
];

const CREDIT_OPTIONS = [
  { value: "Excellent (750+)", key: "ap_credit_excellent", fallback: "Excellent (750+)" },
  { value: "Good (680-749)", key: "ap_credit_good", fallback: "Good (680-749)" },
  { value: "Fair (620-679)", key: "ap_credit_fair", fallback: "Fair (620-679)" },
  { value: "Not sure", key: "ap_credit_notsure", fallback: "I'm not sure" },
];

const TIMELINE_OPTIONS = [
  { value: "Ready now, within 30 days", key: "ap_opt_ready", fallback: "Ready now, within 30 days" },
  { value: "Within 1-3 months", key: "ap_opt_1to3m", fallback: "Within 1-3 months" },
  { value: "Just exploring my options", key: "ap_opt_exploring", fallback: "Just exploring my options" },
];

const AMOUNT_OPTIONS = [
  { value: "Under $100,000", key: "ap_amt1", fallback: "Under $100,000" },
  { value: "$100,000 - $500,000", key: "ap_amt2", fallback: "$100,000 - $500,000" },
  { value: "$500,000 - $1,000,000", key: "ap_amt3", fallback: "$500,000 - $1,000,000" },
  { value: "Over $1,000,000", key: "ap_amt4", fallback: "Over $1,000,000" },
];

const PROVINCE_OPTIONS = [
  { value: "Ontario", key: "ap_prov_on", fallback: "Ontario" },
  { value: "Alberta", key: "ap_prov_ab", fallback: "Alberta" },
  { value: "British Columbia", key: "ap_prov_bc", fallback: "British Columbia" },
  { value: "Manitoba", key: "ap_prov_mb", fallback: "Manitoba" },
  { value: "New Brunswick", key: "ap_prov_nb", fallback: "New Brunswick" },
  { value: "Newfoundland and Labrador", key: "ap_prov_nl", fallback: "Newfoundland and Labrador" },
  { value: "Nova Scotia", key: "ap_prov_ns", fallback: "Nova Scotia" },
  { value: "Prince Edward Island", key: "ap_prov_pe", fallback: "Prince Edward Island" },
  { value: "Quebec", key: "ap_prov_qc", fallback: "Quebec" },
  { value: "Saskatchewan", key: "ap_prov_sk", fallback: "Saskatchewan" },
];

type StepId = "need" | "propertyType" | "financials" | "closing" | "credit" | "timeline" | "amount" | "province" | "contact";

const MORTGAGE_FLOW: StepId[] = ["need", "propertyType", "financials", "closing", "credit", "province", "contact"];
const GENERIC_FLOW: StepId[] = ["need", "timeline", "amount", "province", "contact"];

interface Answers {
  need: string;
  propertyType: string;
  purchasePrice: string;
  downPayment: string;
  income: string;
  closing: string;
  credit: string;
  timeline: string;
  amount: string;
  province: string;
  name: string;
  email: string;
  phone: string;
}

const INITIAL_ANSWERS: Answers = {
  need: "",
  propertyType: "",
  purchasePrice: "",
  downPayment: "",
  income: "",
  closing: "",
  credit: "",
  timeline: "",
  amount: "",
  province: "Ontario",
  name: "",
  email: "",
  phone: "",
};

/** Multi-step "Let's Talk" application wizard. The mortgage path branches into deeper,
 *  mortgage-specific questions (property type, purchase price/down payment/income, closing
 *  timeline, credit band); every other "need" answer stays on the shorter generic path.
 *  Submission is a real POST to formsubmit.co (not mailto). */
export function ApplyWizard() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  const flow = answers.need === NEED_OPTIONS[0].value ? MORTGAGE_FLOW : GENERIC_FLOW;
  const totalSteps = flow.length;
  const stepId = flow[stepIndex];

  const isStepValid = (id: StepId) => {
    switch (id) {
      case "need":
        return Boolean(answers.need);
      case "propertyType":
        return Boolean(answers.propertyType);
      case "financials":
        return Boolean(answers.purchasePrice.trim() && answers.downPayment.trim() && answers.income.trim());
      case "closing":
        return Boolean(answers.closing);
      case "credit":
        return Boolean(answers.credit);
      case "timeline":
        return Boolean(answers.timeline);
      case "amount":
        return Boolean(answers.amount);
      case "province":
        return true;
      case "contact":
        return Boolean(answers.name.trim() && answers.email.trim() && answers.phone.trim());
      default:
        return false;
    }
  };

  const isCurrentStepValid = isStepValid(stepId);

  const selectOption = (field: keyof Answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => {
      setStepIndex((index) => Math.min(index + 1, totalSteps - 1));
    }, 220);
  };

  const setField = (field: keyof Answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!isCurrentStepValid || !formRef.current) return;
    setSubmitting(true);
    formRef.current.submit();
  };

  const progressPct = ((stepIndex + 1) / totalSteps) * 100;

  const renderOptions = (field: keyof Answers, options: { value: string; key: string; fallback: string }[]) => (
    <div className="apply-options apply-options-grid" data-field={field}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={answers[field] === option.value ? "apply-option is-selected" : "apply-option"}
          onClick={() => selectOption(field, option.value)}
        >
          <T k={option.key}>{option.fallback}</T>
        </button>
      ))}
    </div>
  );

  return (
    <div className="apply-wizard" id="applyWizard">
      <h1 className="visually-hidden">
        <T k="ap_page_h1">Apply for a Mortgage or Business Loan</T>
      </h1>
      <div className="apply-progress">
        <div className="apply-progress-bar" style={{ width: `${progressPct}%` }} />
      </div>
      <p className="apply-step-count">
        <span>{stepIndex + 1}</span>/{totalSteps}
      </p>

      <form
        id="applyForm"
        noValidate
        action="https://formsubmit.co/info@royaldencapital.ca"
        method="POST"
        ref={formRef}
      >
        <input type="hidden" name="_subject" value={`Royal Den Capital application - ${answers.need || "Inquiry"}`} />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value={typeof window !== "undefined" ? `${window.location.origin}/apply/thank-you/` : "/apply/thank-you/"} />
        <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
        <input type="hidden" name="What they need help with" value={answers.need} />
        <input type="hidden" name="Property type" value={answers.propertyType} />
        <input type="hidden" name="Target purchase price" value={answers.purchasePrice} />
        <input type="hidden" name="Down payment available" value={answers.downPayment} />
        <input type="hidden" name="Annual household income" value={answers.income} />
        <input type="hidden" name="Closing timeline" value={answers.closing} />
        <input type="hidden" name="Credit band" value={answers.credit} />
        <input type="hidden" name="Timeline" value={answers.timeline} />
        <input type="hidden" name="Approximate amount" value={answers.amount} />

        <fieldset className={stepId === "need" ? "apply-step is-active" : "apply-step"}>
          <h2>
            <T k="ap_step1_h1">What do you need help with?</T>
          </h2>
          {renderOptions("need", NEED_OPTIONS)}
        </fieldset>

        <fieldset className={stepId === "propertyType" ? "apply-step is-active" : "apply-step"}>
          <h2>
            <T k="ap_prop_h1">What type of property is it?</T>
          </h2>
          {renderOptions("propertyType", PROPERTY_TYPE_OPTIONS)}
        </fieldset>

        <fieldset className={stepId === "financials" ? "apply-step is-active" : "apply-step"}>
          <h2>
            <T k="ap_fin_h1">Tell us about the property</T>
          </h2>
          <p className="apply-step-lead">
            <T k="ap_fin_lead">Approximate values are fine &mdash; we&apos;ll refine these together.</T>
          </p>
          <div className="apply-fields-grid">
            <div className="apply-field">
              <label className="form-label" htmlFor="applyPurchasePrice">
                <T k="ap_purchase_price">Target Purchase Price</T>
              </label>
              <input
                id="applyPurchasePrice"
                name="Target Purchase Price"
                className="form-control form-control-lg"
                type="text"
                inputMode="numeric"
                placeholder="$500,000"
                value={answers.purchasePrice}
                onChange={(event) => setField("purchasePrice", event.target.value)}
              />
            </div>
            <div className="apply-field">
              <label className="form-label" htmlFor="applyDownPayment">
                <T k="ap_down_payment">Down Payment Available</T>
              </label>
              <input
                id="applyDownPayment"
                name="Down Payment Available"
                className="form-control form-control-lg"
                type="text"
                inputMode="numeric"
                placeholder="$50,000"
                value={answers.downPayment}
                onChange={(event) => setField("downPayment", event.target.value)}
              />
            </div>
            <div className="apply-field apply-field-span-2">
              <label className="form-label" htmlFor="applyIncome">
                <T k="ap_income">Annual Household Income</T>
              </label>
              <input
                id="applyIncome"
                name="Annual Household Income"
                className="form-control form-control-lg"
                type="text"
                inputMode="numeric"
                placeholder="$140,000"
                value={answers.income}
                onChange={(event) => setField("income", event.target.value)}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className={stepId === "closing" ? "apply-step is-active" : "apply-step"}>
          <h2>
            <T k="ap_close_h1">When are you looking to close?</T>
          </h2>
          {renderOptions("closing", CLOSING_OPTIONS)}
        </fieldset>

        <fieldset className={stepId === "credit" ? "apply-step is-active" : "apply-step"}>
          <h2>
            <T k="ap_credit_h1">How would you describe your credit?</T>
          </h2>
          {renderOptions("credit", CREDIT_OPTIONS)}
        </fieldset>

        <fieldset className={stepId === "timeline" ? "apply-step is-active" : "apply-step"}>
          <h2>
            <T k="ap_step2_h1">What&apos;s your timeline?</T>
          </h2>
          {renderOptions("timeline", TIMELINE_OPTIONS)}
        </fieldset>

        <fieldset className={stepId === "amount" ? "apply-step is-active" : "apply-step"}>
          <h2>
            <T k="ap_step3_h1">What&apos;s the approximate amount you&apos;re looking for?</T>
          </h2>
          {renderOptions("amount", AMOUNT_OPTIONS)}
        </fieldset>

        <fieldset className={stepId === "province" ? "apply-step is-active" : "apply-step"}>
          <h2>
            <T k="ap_step4_h1">Where is this for?</T>
          </h2>
          <div className="apply-field">
            <label className="form-label" htmlFor="applyProvince">
              <T k="ap_province">Province</T>
            </label>
            <select
              id="applyProvince"
              name="Province"
              className="form-select form-select-lg"
              value={answers.province}
              onChange={(event) => setField("province", event.target.value)}
            >
              {PROVINCE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.fallback}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <fieldset className={stepId === "contact" ? "apply-step is-active" : "apply-step"}>
          <h2>
            <T k="ap_step5_h1">Let&apos;s get you connected</T>
          </h2>
          <p className="apply-step-lead">
            <T k="ap_step5_lead">Last step &mdash; tell us how to reach you and a Royal Den Capital advisor will follow up.</T>
          </p>
          <div className="apply-field">
            <label className="form-label" htmlFor="applyName">
              <T k="ap_fullname">Full Name</T>
            </label>
            <input
              id="applyName"
              name="Full Name"
              className="form-control form-control-lg"
              type="text"
              required
              value={answers.name}
              onChange={(event) => setField("name", event.target.value)}
            />
          </div>
          <div className="apply-field">
            <label className="form-label" htmlFor="applyEmail">
              <T k="ap_email">Email</T>
            </label>
            <input
              id="applyEmail"
              name="Email"
              className="form-control form-control-lg"
              type="email"
              required
              value={answers.email}
              onChange={(event) => setField("email", event.target.value)}
            />
          </div>
          <div className="apply-field">
            <label className="form-label" htmlFor="applyPhone">
              <T k="ap_phone">Phone</T>
            </label>
            <input
              id="applyPhone"
              name="Phone"
              className="form-control form-control-lg"
              type="tel"
              required
              value={answers.phone}
              onChange={(event) => setField("phone", event.target.value)}
            />
          </div>
        </fieldset>
      </form>

      <div className="apply-nav">
        <button
          type="button"
          className="btn btn-outline-primary"
          style={{ visibility: stepIndex === 0 ? "hidden" : "visible" }}
          onClick={() => setStepIndex((index) => Math.max(0, index - 1))}
        >
          <T k="ap_back">Back</T>
        </button>
        <button
          type="button"
          className="btn btn-gold"
          style={{ display: stepIndex === totalSteps - 1 ? "none" : "inline-flex" }}
          disabled={!isCurrentStepValid}
          onClick={() => isCurrentStepValid && setStepIndex((index) => Math.min(totalSteps - 1, index + 1))}
        >
          <T k="ap_next">Next</T>
        </button>
        <button
          type="button"
          className="btn btn-gold apply-submit-btn"
          style={{ display: stepIndex === totalSteps - 1 ? "inline-flex" : "none" }}
          disabled={!isCurrentStepValid || submitting}
          onClick={handleSubmit}
        >
          {submitting ? "Submitting..." : <T k="ap_submit">Submit</T>}
        </button>
      </div>
      <p className="apply-privacy-note">
        <T k="ap_privacy">By submitting, you agree to be contacted by Royal Den Capital about your inquiry. We never sell your information.</T>
      </p>
    </div>
  );
}
