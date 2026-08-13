const money = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0
});

const percent = new Intl.NumberFormat("en-CA", {
  style: "percent",
  maximumFractionDigits: 1
});

const form = document.querySelector("#mortgageForm");
const payment = document.querySelector("#payment");

// Ontario land transfer tax: published marginal-rate brackets.
// Estimate only -- always confirm with a lawyer/lender before closing.
function ontarioLandTransferTax(price) {
  const brackets = [
    [55000, 0.005],
    [250000, 0.01],
    [400000, 0.015],
    [2000000, 0.02],
    [Infinity, 0.025]
  ];
  let tax = 0;
  let prevCap = 0;
  for (const [cap, rate] of brackets) {
    if (price > prevCap) {
      tax += (Math.min(price, cap) - prevCap) * rate;
    }
    prevCap = cap;
  }
  return tax;
}

// CMHC-style mortgage default insurance premium schedule (percentage of the
// loan amount), based on loan-to-value. Required whenever the down payment
// is below 20%. Estimate only -- actual premiums are set by the insurer.
function insurancePremiumRate(loanToValuePct) {
  if (loanToValuePct <= 65) return 0.006;
  if (loanToValuePct <= 75) return 0.006;
  if (loanToValuePct <= 80) return 0.01;
  if (loanToValuePct <= 85) return 0.017;
  if (loanToValuePct <= 90) return 0.024;
  if (loanToValuePct <= 95) return 0.04;
  return null;
}

function updatePayment() {
  const priceInput = document.querySelector("#price");
  const downInput = document.querySelector("#down");
  const rateInput = document.querySelector("#rate");
  const yearsInput = document.querySelector("#years");
  if (!priceInput || !downInput || !rateInput || !yearsInput) return;

  const price = Number(priceInput.value) || 0;
  const down = Number(downInput.value) || 0;
  const annualRate = Number(rateInput.value) || 0;
  const years = Number(yearsInput.value) || 25;
  const principal = Math.max(price - down, 0);
  const months = Math.max(years * 12, 1);
  const monthlyRate = annualRate / 100 / 12;

  let monthly = principal / months;
  if (monthlyRate > 0) {
    monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  }

  const downPct = price > 0 ? down / price : 0;
  const loanToValuePct = price > 0 ? (principal / price) * 100 : 0;
  const totalInterest = Math.max(monthly * months - principal, 0);
  const ltt = ontarioLandTransferTax(price);

  if (payment) payment.textContent = `${money.format(monthly)} / month`;

  const downPctOut = document.querySelector("#downPct");
  if (downPctOut) downPctOut.textContent = percent.format(downPct);

  const cmhcOut = document.querySelector("#cmhcEstimate");
  if (cmhcOut) {
    if (downPct >= 0.2) {
      cmhcOut.textContent = "Not required (20%+ down)";
    } else {
      const rate = insurancePremiumRate(loanToValuePct);
      cmhcOut.textContent = rate === null
        ? "Down payment too low to insure"
        : `${money.format(principal * rate)} (added to loan)`;
    }
  }

  const lttOut = document.querySelector("#lttEstimate");
  if (lttOut) lttOut.textContent = `${money.format(ltt)} (Ontario, est.)`;

  const interestOut = document.querySelector("#totalInterest");
  if (interestOut) interestOut.textContent = money.format(totalInterest);
}

if (form && payment) {
  form.addEventListener("input", updatePayment);
  updatePayment();
}

const numberValue = (selector) => Number(document.querySelector(selector)?.value) || 0;
const textValue = (selector) => document.querySelector(selector)?.value || "";
const setText = (selector, value) => {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
};
// Briefly flashes/scales a value when it updates, so the calculator feels
// "live" as you type instead of numbers just silently swapping.
const pulseValue = (selector) => {
  const el = document.querySelector(selector);
  if (!el) return;
  el.classList.remove("value-pulse");
  // eslint-disable-next-line no-unused-expressions
  el.offsetWidth; // force reflow so the animation restarts every time
  el.classList.add("value-pulse");
};
const formatMoney = (value, maximumFractionDigits = 0) => new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits
}).format(Number.isFinite(value) ? value : 0);
const formatPercentValue = (value) => `${(Number.isFinite(value) ? value : 0).toFixed(2).replace(/\.00$/, "")}%`;

function paymentFrequencyDetails(frequency, monthlyPayment) {
  const details = {
    "monthly": { label: "Monthly", periods: 12, payment: monthlyPayment },
    "semi-monthly": { label: "Semi-Monthly", periods: 24, payment: monthlyPayment / 2 },
    "biweekly": { label: "Bi-Weekly", periods: 26, payment: monthlyPayment * 12 / 26 },
    "accelerated-biweekly": { label: "Accelerated Bi-Weekly", periods: 26, payment: monthlyPayment / 2 },
    "weekly": { label: "Weekly", periods: 52, payment: monthlyPayment * 12 / 52 },
    "accelerated-weekly": { label: "Accelerated Weekly", periods: 52, payment: monthlyPayment / 4 }
  };
  return details[frequency] || details.monthly;
}

function mortgagePayment(principal, annualRate, years, periodsPerYear = 12) {
  const totalPayments = Math.max(Math.round(years * periodsPerYear), 1);
  const periodicRate = annualRate / 100 / periodsPerYear;
  if (principal <= 0) return 0;
  if (periodicRate <= 0) return principal / totalPayments;
  return principal * (periodicRate * Math.pow(1 + periodicRate, totalPayments)) / (Math.pow(1 + periodicRate, totalPayments) - 1);
}

function loanPrincipalFromPayment(paymentAmount, annualRate, years, periodsPerYear = 12) {
  const totalPayments = Math.max(Math.round(years * periodsPerYear), 1);
  const periodicRate = annualRate / 100 / periodsPerYear;
  if (paymentAmount <= 0) return 0;
  if (periodicRate <= 0) return paymentAmount * totalPayments;
  return paymentAmount * (1 - Math.pow(1 + periodicRate, -totalPayments)) / periodicRate;
}

function estimateMortgageInsurance(homePrice, downPayment) {
  const baseLoan = Math.max(homePrice - downPayment, 0);
  const loanToValuePct = homePrice > 0 ? (baseLoan / homePrice) * 100 : 0;
  const downPct = homePrice > 0 ? downPayment / homePrice : 0;
  if (baseLoan <= 0 || downPct >= 0.2) return 0;
  const rate = insurancePremiumRate(loanToValuePct);
  return rate === null ? 0 : baseLoan * rate;
}

function estimateLandTransferTax(price, province, isToronto) {
  if (province !== "ON") return 0;
  const ontarioTax = ontarioLandTransferTax(price);
  return ontarioTax + (isToronto ? ontarioTax : 0);
}

function buildAmortizationRows(principal, annualRate, years, termYears, frequency, paymentAmount) {
  const frequencyInfo = paymentFrequencyDetails(frequency, paymentAmount);
  const periodsPerYear = frequencyInfo.periods;
  const periodicRate = annualRate / 100 / periodsPerYear;
  const totalPayments = Math.max(Math.round(years * periodsPerYear), 1);
  const termPaymentLimit = Math.round(termYears * periodsPerYear);
  const startYear = new Date().getFullYear();
  let balance = principal;
  const yearlyRows = [];
  let yearPayment = 0;
  let yearPrincipal = 0;
  let yearInterest = 0;
  let termPayment = 0;
  let termPrincipal = 0;
  let termInterest = 0;
  let termBalance = principal;

  for (let i = 1; i <= totalPayments && balance > 0.01; i += 1) {
    const interestPaid = balance * periodicRate;
    const principalPaid = Math.min(paymentAmount - interestPaid, balance);
    balance = Math.max(balance - principalPaid, 0);
    yearPayment += principalPaid + interestPaid;
    yearPrincipal += principalPaid;
    yearInterest += interestPaid;
    if (i <= termPaymentLimit) {
      termPayment += principalPaid + interestPaid;
      termPrincipal += principalPaid;
      termInterest += interestPaid;
      termBalance = balance;
    }

    if (i % periodsPerYear === 0 || i === totalPayments || balance <= 0.01) {
      yearlyRows.push({
        label: String(startYear + yearlyRows.length),
        payment: yearPayment,
        principal: yearPrincipal,
        interest: yearInterest,
        balance
      });
      yearPayment = 0;
      yearPrincipal = 0;
      yearInterest = 0;
    }
  }

  return {
    rows: yearlyRows,
    term: { payment: termPayment, principal: termPrincipal, interest: termInterest, balance: termBalance }
  };
}

function updateAdvancedPaymentCalculator(event) {
  const paymentForm = document.querySelector("#paymentCalculatorForm");
  if (!paymentForm) return;

  const propertyValueInput = document.querySelector("#paymentPropertyValue");
  if (propertyValueInput && numberValue("#paymentPropertyValue") < 0) {
    propertyValueInput.value = 0;
  }
  const homePrice = Math.max(numberValue("#paymentPropertyValue"), 0);
  const downPaymentInput = document.querySelector("#paymentDownPayment");
  const downPaymentPercentInput = document.querySelector("#paymentDownPaymentPercent");
  let downPayment = Math.min(Math.max(numberValue("#paymentDownPayment"), 0), homePrice);
  if (downPaymentPercentInput && downPaymentInput) {
    if (event?.target?.id === "paymentDownPaymentPercent") {
      const downPctInput = Math.min(Math.max(numberValue("#paymentDownPaymentPercent"), 0), 100);
      downPayment = Math.min(homePrice * (downPctInput / 100), homePrice);
      downPaymentInput.value = Math.round(downPayment);
      downPaymentPercentInput.value = String(downPctInput);
    } else {
      if (downPaymentInput.value !== "" && numberValue("#paymentDownPayment") !== downPayment) {
        downPaymentInput.value = Math.round(downPayment);
      }
      const downPctValue = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;
      downPaymentPercentInput.value = Number.isInteger(downPctValue) ? String(downPctValue) : downPctValue.toFixed(1);
    }
  }
  const rateInput = document.querySelector("#paymentInterestRate");
  if (rateInput && numberValue("#paymentInterestRate") < 0) {
    rateInput.value = 0;
  }
  const annualRate = Math.max(numberValue("#paymentInterestRate"), 0);
  const termYears = numberValue("#paymentTerm") || 5;
  const amortizationYears = numberValue("#paymentAmortization") || 25;
  const frequency = textValue("#paymentFrequency");
  const province = textValue("#paymentProvince");
  const isToronto = Boolean(document.querySelector("#paymentToronto")?.checked);
  const baseLoan = Math.max(homePrice - downPayment, 0);
  const insurance = estimateMortgageInsurance(homePrice, downPayment);
  const totalLoan = baseLoan + insurance;
  const monthlyPrincipalInterest = mortgagePayment(totalLoan, annualRate, amortizationYears, 12);
  const frequencyInfo = paymentFrequencyDetails(frequency, monthlyPrincipalInterest);
  const numberOfPayments = Math.round(amortizationYears * frequencyInfo.periods);
  const amortization = buildAmortizationRows(totalLoan, annualRate, amortizationYears, termYears, frequency, frequencyInfo.payment);
  const totalPaid = amortization.rows.reduce((sum, row) => sum + row.payment, 0);
  const totalInterest = Math.max(totalPaid - totalLoan, 0);
  const ltt = estimateLandTransferTax(homePrice, province, isToronto);
  const downPct = homePrice > 0 ? downPayment / homePrice : 0;

  setText("#paymentCalcPayment", formatMoney(frequencyInfo.payment));
  pulseValue("#paymentCalcPayment");
  setText("#paymentCalcFrequency", frequencyInfo.label);
  setText("#paymentCalcPrincipalInterest", formatMoney(frequencyInfo.payment));
  setText("#paymentCalcInsurance", formatMoney(insurance));
  setText("#paymentCalcHomePrice", formatMoney(homePrice));
  setText("#paymentCalcRate", formatPercentValue(annualRate));
  setText("#paymentCalcDown", `${formatMoney(downPayment)} (${percent.format(downPct)})`);
  setText("#paymentCalcTerm", `${termYears} ${termYears === 1 ? "Year" : "Years"}`);
  setText("#paymentCalcLoanCost", formatMoney(totalPaid));
  setText("#paymentCalcAmortization", `${amortizationYears} Years`);
  setText("#paymentCalcLoanAmount", formatMoney(totalLoan));
  setText("#paymentCalcInterest", formatMoney(totalInterest));
  setText("#paymentCalcCount", String(numberOfPayments));
  setText("#paymentCalcLtt", formatMoney(ltt));

  const body = document.querySelector("#paymentBreakdownBody");
  if (body) {
    const rows = amortization.rows.map((row) => `
      <tr>
        <th scope="row">${row.label}</th>
        <td>${formatMoney(row.payment, 2)}</td>
        <td>${formatMoney(row.principal, 2)}</td>
        <td>${formatMoney(row.interest, 2)}</td>
        <td>${formatMoney(row.balance, 2)}</td>
      </tr>
    `);
    rows.splice(Math.max(termYears, 1), 0, `
      <tr class="term-total">
        <th scope="row">Term Total</th>
        <td>${formatMoney(amortization.term.payment, 2)}</td>
        <td>${formatMoney(amortization.term.principal, 2)}</td>
        <td>${formatMoney(amortization.term.interest, 2)}</td>
        <td>${formatMoney(amortization.term.balance, 2)}</td>
      </tr>
    `);
    body.innerHTML = rows.join("");
  }
}

function minimumDownPayment(price) {
  if (price <= 500000) return price * 0.05;
  if (price <= 1500000) return 25000 + (price - 500000) * 0.1;
  return price * 0.2;
}

function homePriceFromAffordableLoan(maxLoanWithInsurance, availableDownPayment) {
  let low = 0;
  let high = 3000000;
  for (let i = 0; i < 48; i += 1) {
    const mid = (low + high) / 2;
    const requiredDown = minimumDownPayment(mid);
    if (availableDownPayment < requiredDown) {
      high = mid;
      continue;
    }
    const baseLoan = Math.max(mid - availableDownPayment, 0);
    const insuredLoan = baseLoan + estimateMortgageInsurance(mid, availableDownPayment);
    if (insuredLoan <= maxLoanWithInsurance) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return low;
}

function updateAffordabilityCalculator() {
  const affordabilityForm = document.querySelector("#affordabilityCalculatorForm");
  if (!affordabilityForm) return;

  const applicantIncome = numberValue("#affordApplicantIncome");
  const coApplicantIncome = numberValue("#affordCoApplicantIncome");
  const monthlyDebt = numberValue("#affordMonthlyDebt");
  const heating = numberValue("#affordHeating");
  const amortizationYears = numberValue("#affordAmortization") || 25;
  const annualRate = numberValue("#affordInterestRate");
  const propertyTax = numberValue("#affordPropertyTax") / 12;
  const condoFees = numberValue("#affordCondoFees");
  const downPayment = numberValue("#affordDownPayment");
  const grossMonthlyIncome = (applicantIncome + coApplicantIncome) / 12;
  const housingCosts = propertyTax + heating + condoFees * 0.5;
  const maxByGds = grossMonthlyIncome * 0.39 - housingCosts;
  const maxByTds = grossMonthlyIncome * 0.44 - monthlyDebt - housingCosts;
  const maxMonthlyMortgage = Math.max(Math.min(maxByGds, maxByTds), 0);
  const maxLoanWithInsurance = loanPrincipalFromPayment(maxMonthlyMortgage, annualRate, amortizationYears, 12);
  const maxHomePrice = homePriceFromAffordableLoan(maxLoanWithInsurance, downPayment);
  const baseLoan = Math.max(maxHomePrice - downPayment, 0);
  const insurance = estimateMortgageInsurance(maxHomePrice, downPayment);
  const loanWithInsurance = baseLoan + insurance;
  const paymentWithInsurance = mortgagePayment(loanWithInsurance, annualRate, amortizationYears, 12);
  const totalMonthlyExpenses = paymentWithInsurance + monthlyDebt + housingCosts;
  const paymentCount = amortizationYears * 12;

  setText("#affordScenarioText", maxHomePrice > 0
    ? "Based on the information provided, this scenario should fit within common affordability guidelines."
    : "Based on the information provided, the current inputs do not leave enough room for a mortgage payment.");
  setText("#affordMaxHomePrice", formatMoney(maxHomePrice));
  pulseValue("#affordMaxHomePrice");
  setText("#affordMaxPayment", formatMoney(maxMonthlyMortgage));
  setText("#affordTotalExpenses", formatMoney(totalMonthlyExpenses));
  setText("#affordMonthlyMortgage", formatMoney(paymentWithInsurance));
  setText("#affordRate", formatPercentValue(annualRate));
  setText("#affordLoanAmount", formatMoney(baseLoan));
  setText("#affordAmortizationOut", `${amortizationYears} Years`);
  setText("#affordPaymentCount", String(paymentCount));
  setText("#affordMortgageWithInsurance", formatMoney(loanWithInsurance));
  setText("#affordPaymentWithInsurance", formatMoney(paymentWithInsurance));
  setText("#affordExpenseMortgage", formatMoney(paymentWithInsurance));
  setText("#affordExpenseDebt", formatMoney(monthlyDebt));
  setText("#affordHousingExpenses", formatMoney(housingCosts));
}

document.querySelector("#paymentCalculatorForm")?.addEventListener("input", updateAdvancedPaymentCalculator);
document.querySelector("#paymentCalculatorForm")?.addEventListener("change", updateAdvancedPaymentCalculator);
updateAdvancedPaymentCalculator();

document.querySelector("#affordabilityCalculatorForm")?.addEventListener("input", updateAffordabilityCalculator);
document.querySelector("#affordabilityCalculatorForm")?.addEventListener("change", updateAffordabilityCalculator);
updateAffordabilityCalculator();

document.querySelector(".lead-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const values = new FormData(event.currentTarget);
  const subjectValue = values.get("subject") || `Royal Den Capital inquiry - ${values.get("need")}`;
  const subject = encodeURIComponent(subjectValue);
  const body = encodeURIComponent(
    `Name: ${values.get("name") || ""}\nEmail: ${values.get("email") || ""}\nPhone: ${values.get("phone") || ""}\nNeed: ${values.get("need") || ""}\n\n${values.get("message") || ""}`
  );

  window.location.href = `mailto:info@royaldencapital.ca?subject=${subject}&body=${body}`;
});

document.querySelector("#careerForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const values = new FormData(event.currentTarget);
  const applicantName = values.get("name") || "Career applicant";
  const subject = encodeURIComponent(`Career application - ${applicantName}`);
  const body = encodeURIComponent(
    `Name: ${values.get("name") || ""}\n` +
    `Email: ${values.get("email") || ""}\n` +
    `Phone: ${values.get("phone") || ""}\n` +
    `City: ${values.get("city") || ""}\n` +
    `Licence Status: ${values.get("licence") || ""}\n` +
    `Experience: ${values.get("experience") || ""}\n\n` +
    `Why RDC:\n${values.get("message") || ""}`
  );

  window.location.href = `mailto:info@royaldencapital.ca?subject=${subject}&body=${body}`;
});

document.querySelector("#newsletterForm")?.addEventListener("submit", (event) => {
  if (event.currentTarget.action) return;

  event.preventDefault();
  const values = new FormData(event.currentTarget);
  const subject = encodeURIComponent("Newsletter enroll");
  const body = encodeURIComponent(`Name: ${values.get("name") || ""}\nEmail: ${values.get("email") || ""}`);
  window.location.href = `mailto:info@royaldencapital.ca?subject=${subject}&body=${body}`;
});

(function initLiveChatAssistant() {
  document.querySelectorAll("#chatButton, .chat-button").forEach((button) => button.remove());

  const storageKey = "rdcLiveChatSession";
  const expertEmail = "info@royaldencapital.ca";
  const expertPhone = "19056091818";
  const basePath = window.location.pathname.includes("/public/") ? "/public/" : "/";
  const state = {
    messages: [],
    qualification: {
      name: "",
      email: "",
      phone: "",
      need: "",
      timeline: ""
    },
    collecting: null
  };

  const quickReplies = [
    "I want to buy",
    "I need refinance",
    "Renewal help",
    "What down payment?",
    "Current rates",
    "Talk to expert"
  ];

  const loadState = () => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey) || "{}");
      if (Array.isArray(saved.messages)) state.messages = saved.messages;
      if (saved.qualification) state.qualification = { ...state.qualification, ...saved.qualification };
      if (saved.collecting) state.collecting = saved.collecting;
    } catch (error) {
      // Ignore storage issues; chat still works for the current page view.
    }
  };

  const saveState = () => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      // Session storage is optional.
    }
  };

  loadState();

  const widget = document.createElement("section");
  widget.className = "live-chat";
  widget.setAttribute("aria-label", "Royal Den Capital live chat assistant");
  widget.innerHTML = `
    <button class="chat-launcher" type="button" aria-label="Open live chat" aria-expanded="false">
      <i class="bi bi-chat-dots-fill"></i>
      <span>Live Chat</span>
    </button>
    <div class="chat-panel" hidden>
      <header class="chat-panel-header">
        <div>
          <span class="chat-status"><span aria-hidden="true"></span> Online assistant</span>
          <strong>Royal Den Capital</strong>
        </div>
        <button class="chat-icon-button" type="button" aria-label="Close live chat">
          <i class="bi bi-x-lg"></i>
        </button>
      </header>
      <div class="chat-messages" role="log" aria-live="polite"></div>
      <div class="chat-quick-replies" aria-label="Quick chat options"></div>
      <form class="chat-input-row">
        <label class="visually-hidden" for="liveChatInput">Type your message</label>
        <input id="liveChatInput" type="text" autocomplete="off" placeholder="Type your question...">
        <button type="submit" aria-label="Send message"><i class="bi bi-send-fill"></i></button>
      </form>
      <div class="chat-actions">
        <a href="tel:${expertPhone}"><i class="bi bi-telephone-fill"></i> Call now</a>
        <button type="button" data-chat-transfer><i class="bi bi-person-lines-fill"></i> Transfer to expert</button>
      </div>
    </div>
  `;
  document.body.appendChild(widget);

  const launcher = widget.querySelector(".chat-launcher");
  const panel = widget.querySelector(".chat-panel");
  const closeBtn = widget.querySelector(".chat-icon-button");
  const messagesEl = widget.querySelector(".chat-messages");
  const quickRepliesEl = widget.querySelector(".chat-quick-replies");
  const formEl = widget.querySelector(".chat-input-row");
  const inputEl = widget.querySelector("#liveChatInput");
  const transferBtn = widget.querySelector("[data-chat-transfer]");

  const addMessage = (sender, text, persist = true) => {
    const message = { sender, text, time: new Date().toISOString() };
    if (persist) {
      state.messages.push(message);
      state.messages = state.messages.slice(-60);
      saveState();
    }
    const bubble = document.createElement("div");
    bubble.className = `chat-message ${sender === "user" ? "from-user" : "from-bot"}`;
    const label = document.createElement("span");
    label.textContent = sender === "user" ? "You" : "RDC Assistant";
    const body = document.createElement("p");
    body.textContent = text;
    bubble.append(label, body);
    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  };

  const renderMessages = () => {
    messagesEl.innerHTML = "";
    state.messages.forEach((message) => addMessage(message.sender, message.text, false));
  };

  const renderQuickReplies = () => {
    quickRepliesEl.innerHTML = "";
    quickReplies.forEach((reply) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = reply;
      btn.addEventListener("click", () => handleUserMessage(reply));
      quickRepliesEl.appendChild(btn);
    });
  };

  const getMissingQualificationField = () => {
    const order = ["need", "timeline", "name", "phone", "email"];
    return order.find((field) => !state.qualification[field]);
  };

  const promptForField = (field) => {
    const prompts = {
      need: "To send this to the right expert, what are you looking for: purchase, refinance, renewal, equity takeout, commercial, or something else?",
      timeline: "What is your timeline: ASAP, 30-60 days, 3+ months, or just exploring?",
      name: "What is your name?",
      phone: "What phone number should the mortgage expert use?",
      email: "What email should we include with the chat transcript?"
    };
    state.collecting = field;
    saveState();
    addMessage("bot", prompts[field]);
  };

  const requestExpertTransfer = () => {
    const missing = getMissingQualificationField();
    if (missing) {
      promptForField(missing);
      return;
    }

    const transcript = state.messages
      .slice(-24)
      .map((message) => `${message.sender === "user" ? "Visitor" : "Assistant"}: ${message.text}`)
      .join("\n");
    const subject = `Website live chat - ${state.qualification.need || "Mortgage inquiry"}`;
    const leadSummary =
      `Please follow up with this website chat lead.\n\n` +
      `Name: ${state.qualification.name}\n` +
      `Phone: ${state.qualification.phone}\n` +
      `Email: ${state.qualification.email}\n` +
      `Need: ${state.qualification.need}\n` +
      `Timeline: ${state.qualification.timeline}\n` +
      `Page: ${window.location.href}\n\n` +
      `Chat transcript:\n${transcript}`;

    const handoffForm = document.createElement("form");
    handoffForm.method = "POST";
    handoffForm.action = `https://formsubmit.co/${expertEmail}`;
    handoffForm.hidden = true;

    const fields = {
      _subject: subject,
      _captcha: "false",
      _template: "table",
      _next: `${window.location.origin}${basePath}apply/thank-you/`,
      source: "Website live chat assistant",
      name: state.qualification.name,
      email: state.qualification.email,
      phone: state.qualification.phone,
      need: state.qualification.need,
      timeline: state.qualification.timeline,
      page: window.location.href,
      transcript,
      message: leadSummary
    };

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      handoffForm.appendChild(input);
    });

    document.body.appendChild(handoffForm);
    addMessage("bot", "Thanks. I am submitting this full chat to the Royal Den Capital team now.");
    handoffForm.submit();
  };

  const saveCollectedAnswer = (text) => {
    const field = state.collecting;
    if (!field) return false;
    state.qualification[field] = text.trim();
    state.collecting = null;
    saveState();

    const nextField = getMissingQualificationField();
    if (nextField) {
      promptForField(nextField);
    } else {
      addMessage("bot", "Thanks. I have the basics now. I can transfer this full chat to an expert, or you can call 905-609-1818 now.");
    }
    return true;
  };

  const getBotReply = (rawText) => {
    const text = rawText.toLowerCase();
    if (/\b(rate|rates|interest)\b/.test(text)) {
      return "Rates change often and depend on credit, down payment, property type, mortgage size, term, and insurer rules. I can qualify you first, then send the chat to an expert for accurate options.";
    }
    if (/\b(down|deposit|minimum)\b/.test(text)) {
      return "For many owner-occupied purchases in Canada, minimum down payment can start at 5% for the first $500k, then 10% on the portion above $500k, with 20% usually needed at $1M+. Exact rules depend on the file.";
    }
    if (/\b(pre.?approval|approve|approval|qualify|qualified)\b/.test(text)) {
      return "A pre-approval usually reviews income, credit, debts, down payment, and property goals. It helps estimate budget and hold a rate when available.";
    }
    if (/\b(refinance|equity|debt|consolidation)\b/.test(text)) {
      state.qualification.need = state.qualification.need || "Refinance / equity / debt consolidation";
      saveState();
      return "Refinancing can help access equity, consolidate higher-interest debt, or restructure payments. An expert will need your property value, mortgage balance, income picture, and goal.";
    }
    if (/\b(renew|renewal|maturity|matures)\b/.test(text)) {
      state.qualification.need = state.qualification.need || "Mortgage renewal";
      saveState();
      return "For renewals, it is smart to compare options before signing the lender's offer. Share your maturity date and current balance so an expert can review choices.";
    }
    if (/\b(first|buy|purchase|buyer|home)\b/.test(text)) {
      state.qualification.need = state.qualification.need || "Home purchase";
      saveState();
      return "For a purchase, the key first details are budget, down payment, income, debts, credit range, and timeline. I can collect those basics and pass the chat to a mortgage expert.";
    }
    if (/\b(commercial|business|construction|private|bridge)\b/.test(text)) {
      state.qualification.need = state.qualification.need || "Commercial or specialized financing";
      saveState();
      return "Commercial and specialized financing depends heavily on the property, use, cash flow, borrower profile, and exit plan. That should go to an expert after a few qualifying details.";
    }
    if (/\b(call|phone|email|contact|expert|agent|human|transfer|advisor|broker)\b/.test(text)) {
      return "Absolutely. I can transfer this full chat to a Royal Den Capital expert. I just need a few details first.";
    }
    if (/\b(hello|hi|hey|start)\b/.test(text)) {
      return "Hi, I can answer basic mortgage questions and collect the first details for an expert. What can I help with today?";
    }
    return "That is a good question for a mortgage expert. I can collect your basic details and transfer this whole chat so you do not have to repeat yourself.";
  };

  const handleUserMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addMessage("user", trimmed);
    inputEl.value = "";

    window.setTimeout(() => {
      if (saveCollectedAnswer(trimmed)) return;
      const reply = getBotReply(trimmed);
      addMessage("bot", reply);
      if (/expert|transfer|human|agent|advisor|broker|random|question/i.test(trimmed) || /good question for a mortgage expert/i.test(reply)) {
        const missing = getMissingQualificationField();
        if (missing) promptForField(missing);
      }
    }, 220);
  };

  const openChat = () => {
    panel.hidden = false;
    launcher.setAttribute("aria-expanded", "true");
    widget.classList.add("is-open");
    window.setTimeout(() => inputEl.focus(), 60);
  };

  const closeChat = () => {
    panel.hidden = true;
    launcher.setAttribute("aria-expanded", "false");
    widget.classList.remove("is-open");
  };

  launcher.addEventListener("click", () => {
    if (panel.hidden) openChat();
    else closeChat();
  });
  closeBtn.addEventListener("click", closeChat);
  transferBtn.addEventListener("click", requestExpertTransfer);
  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    handleUserMessage(inputEl.value);
  });

  renderMessages();
  renderQuickReplies();
  if (!state.messages.length) {
    addMessage("bot", "Hi, I am the Royal Den Capital assistant. I can answer basic mortgage questions, qualify your request, and transfer the full chat to an expert.");
  }

  const applyLink = document.createElement("a");
  applyLink.href = `${basePath}apply/`;
  applyLink.className = "chat-apply-link";
  applyLink.innerHTML = '<i class="bi bi-clipboard-check-fill"></i> Full application';
  widget.querySelector(".chat-actions").appendChild(applyLink);
})();

(function initCookieConsent() {
  const storageKey = "rdcCookieConsent";
  const getStoredChoice = () => {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  };
  const setStoredChoice = (choice) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(choice));
    } catch (error) {
      // Continue silently if storage is unavailable; the choice still closes the banner.
    }
  };
  const existingChoice = getStoredChoice();
  if (existingChoice) return;

  const banner = document.createElement("section");
  banner.className = "cookie-banner";
  banner.setAttribute("aria-label", "Cookie notice");
  banner.innerHTML = `
    <div class="cookie-copy">
      <strong>Cookie Preferences</strong>
      <p>To ensure you have the best possible experience, we use cookies and similar technologies on our site. Some are necessary for helping our site run smoothly and securely, while optional cookies help us improve and customize your experience.</p>
    </div>
    <div class="cookie-actions">
      <button class="btn btn-outline-primary" type="button" data-cookie-manage>Manage Cookie Settings</button>
      <button class="btn btn-gold" type="button" data-cookie-accept>Accept All Cookies</button>
    </div>
    <form class="cookie-settings" hidden>
      <label>
        <input type="checkbox" checked disabled>
        <span>Necessary cookies</span>
      </label>
      <label>
        <input type="checkbox" name="analytics" checked>
        <span>Analytics cookies</span>
      </label>
      <label>
        <input type="checkbox" name="personalization" checked>
        <span>Personalization cookies</span>
      </label>
      <div class="cookie-actions">
        <button class="btn btn-outline-primary" type="button" data-cookie-save>Save Settings</button>
      </div>
    </form>
  `;

  document.body.appendChild(banner);

  const settings = banner.querySelector(".cookie-settings");
  const saveChoice = (choice) => {
    setStoredChoice({
      ...choice,
      necessary: true,
      savedAt: new Date().toISOString()
    });
    banner.remove();
  };

  banner.querySelector("[data-cookie-accept]").addEventListener("click", () => {
    saveChoice({ analytics: true, personalization: true });
  });

  banner.querySelector("[data-cookie-manage]").addEventListener("click", () => {
    const isHidden = settings.hidden;
    settings.hidden = !isHidden;
    banner.querySelector("[data-cookie-manage]").textContent = isHidden ? "Hide Settings" : "Manage Cookie Settings";
  });

  banner.querySelector("[data-cookie-save]").addEventListener("click", () => {
    saveChoice({
      analytics: settings.elements.analytics.checked,
      personalization: settings.elements.personalization.checked
    });
  });
})();

// Scroll-reveal: fade + rise cards and headings into view as the user scrolls.
// Respects prefers-reduced-motion via CSS; degrades to "always visible" if
// IntersectionObserver isn't available.
(function initScrollReveal() {
  const targets = document.querySelectorAll(
    ".section-heading, .rate-card, .service-card, .mortgage-service-card, .feature-card, " +
    ".team-card, .hierarchy-node, .type-card, .goal-grid article, .industry-grid article, .doc-checklist li, " +
    ".renovation-panel, .renovation-grid article, .renovation-process article, " +
    ".mortgage-detail-card, .detail-two-up article, .detail-cta-panel, .related-mortgage-links a, " +
    ".compare-table-wrap, .image-stat, .cta-panel, .contact-form-panel, .contact-card, .consult-card, " +
    ".rate-comparison div, .home-link-panel a, .home-link-list a, .service-link-grid a, " +
    ".career-benefit-list section, .career-process-grid article, .career-standard-grid article, " +
    ".career-callout, .career-requirements, .career-form, .career-process-intro, " +
    ".career-event-gallery figure, .career-event-badge, .career-growth-points div, .career-teaser, " +
    ".knowledge-block, .knowledge-flow div, .formula-panel, .knowledge-diagram, .payment-map, " +
    ".decision-tree, .knowledge-help-list, " +
    ".check-list li, .partner-strip img, .accordion-item, .funding-band, " +
    ".calc-input-card, .calc-summary-card, .breakdown-card"
  );

  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  targets.forEach((el, index) => {
    // Anything already in (or just below) the initial viewport reveals
    // immediately with no delay -- only later, further-down content gets
    // the staggered rise-in, so nothing above the fold ever sits blank.
    const startsNearViewport = el.getBoundingClientRect().top < window.innerHeight * 1.15;
    if (startsNearViewport) {
      el.classList.add("is-visible");
      return;
    }
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min((index % 4) * 0.05, 0.15)}s`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.01, rootMargin: "0px 0px 80px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
})();

// Compact the sticky header (hides the top contact strip, tightens the
// navbar) once the page has scrolled past the hero, for a lighter, more
// app-like feel while browsing.
(function initHeaderShrink() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  let ticking = false;
  const applyState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 60);
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(applyState);
        ticking = true;
      }
    },
    { passive: true }
  );

  applyState();
})();

// Subtle parallax drift on the homepage hero photo as the visitor scrolls
// past it. Desktop/mouse only, and off entirely for prefers-reduced-motion.
(function initHeroParallax() {
  const hero = document.querySelector(".hero-section");
  if (!hero) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  let ticking = false;
  const update = () => {
    const offset = Math.max(-30, Math.min(30, hero.getBoundingClientRect().top * -0.08));
    hero.style.setProperty("--hero-parallax", `${offset}px`);
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );

  update();
})();

// Tiny pointer-following movement in the homepage hero. The values stay small
// so the section feels dimensional without distracting from the mortgage copy.
(function initHeroPointerMotion() {
  const hero = document.querySelector(".hero-section");
  if (!hero) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  let frame = null;
  let nextX = 0;
  let nextY = 0;

  const update = () => {
    hero.style.setProperty("--hero-shift-x", `${nextX * -8}px`);
    hero.style.setProperty("--hero-card-x", `${nextX * 5}px`);
    hero.style.setProperty("--hero-card-y", `${nextY * 5}px`);
    frame = null;
  };

  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    nextX = (event.clientX - rect.left) / rect.width - 0.5;
    nextY = (event.clientY - rect.top) / rect.height - 0.5;
    if (!frame) frame = requestAnimationFrame(update);
  });

  hero.addEventListener("mouseleave", () => {
    nextX = 0;
    nextY = 0;
    if (!frame) frame = requestAnimationFrame(update);
  });
})();

// Floating "back to top" button, injected once so every page gets it without
// per-page markup. Appears after the visitor scrolls a bit, smooth-scrolls
// back to the top on click.
(function initBackToTop() {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "back-to-top";
  btn.setAttribute("aria-label", "Back to top");
  btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
  document.body.appendChild(btn);

  let ticking = false;
  const applyState = () => {
    btn.classList.toggle("is-visible", window.scrollY > 480);
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(applyState);
        ticking = true;
      }
    },
    { passive: true }
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  applyState();
})();

// Count-up animation for headline stats (e.g. "25+", "95%"). Opt-in via
// data-count-to on the element; runs once, respects prefers-reduced-motion.
(function initCountUp() {
  const targets = document.querySelectorAll("[data-count-to]");
  if (!targets.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animate = (el) => {
    const end = parseFloat(el.dataset.countTo);
    const suffix = el.dataset.countSuffix || "";
    const decimals = parseInt(el.dataset.countDecimals || "0", 10);
    if (prefersReducedMotion || Number.isNaN(end)) {
      el.textContent = end.toFixed(decimals) + suffix;
      return;
    }
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (end * eased).toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (!("IntersectionObserver" in window)) {
    targets.forEach(animate);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  targets.forEach((el) => observer.observe(el));
})();

// Multi-step "Let's Talk" application wizard (public/apply/). Walks the
// visitor through a few quick qualifying questions, then hands the answers
// off the same way the rest of the site does: a mailto: link, no backend.
(function initApplyWizard() {
  const wizard = document.querySelector("#applyWizard");
  if (!wizard) return;

  const applyForm = document.querySelector("#applyForm");
  const steps = Array.from(wizard.querySelectorAll(".apply-step"));
  const totalSteps = steps.length;
  const progressBar = document.querySelector("#applyProgressBar");
  const stepNumEl = document.querySelector("#applyStepNum");
  const backBtn = document.querySelector("#applyBackBtn");
  const nextBtn = document.querySelector("#applyNextBtn");
  const submitBtn = document.querySelector("#applySubmitBtn");
  const provinceSelect = document.querySelector("#applyProvince");
  const nameInput = document.querySelector("#applyName");
  const emailInput = document.querySelector("#applyEmail");
  const phoneInput = document.querySelector("#applyPhone");
  const subjectField = document.querySelector("#applySubjectField");
  const nextField = document.querySelector("#applyNextField");
  // Hidden fields that carry the button-based answers into the real POST,
  // since the visible "options" are buttons, not native form fields.
  const hiddenFieldByKey = {
    need: document.querySelector("#applyNeedField"),
    timeline: document.querySelector("#applyTimelineField"),
    amount: document.querySelector("#applyAmountField")
  };

  const answers = { need: "", timeline: "", amount: "", province: provinceSelect?.value || "" };
  let currentStep = 1;

  const showStep = (stepNumber) => {
    steps.forEach((step) => {
      step.classList.toggle("is-active", Number(step.dataset.step) === stepNumber);
    });
    if (progressBar) progressBar.style.width = `${(stepNumber / totalSteps) * 100}%`;
    if (stepNumEl) stepNumEl.textContent = String(stepNumber);
    if (backBtn) backBtn.style.visibility = stepNumber === 1 ? "hidden" : "visible";
    if (nextBtn) nextBtn.style.display = stepNumber === totalSteps ? "none" : "inline-flex";
    if (submitBtn) submitBtn.style.display = stepNumber === totalSteps ? "inline-flex" : "none";
    updateNextState();
  };

  const currentAnswerIsValid = () => {
    if (currentStep === 4) return true; // select always has a value
    if (currentStep === 5) {
      return Boolean(nameInput?.value.trim() && emailInput?.value.trim() && phoneInput?.value.trim());
    }
    const fieldMap = { 1: "need", 2: "timeline", 3: "amount" };
    return Boolean(answers[fieldMap[currentStep]]);
  };

  function updateNextState() {
    if (!nextBtn) return;
    nextBtn.disabled = !currentAnswerIsValid();
  }

  steps.forEach((step) => {
    const options = step.querySelectorAll(".apply-option");
    if (!options.length) return;
    const field = step.querySelector(".apply-options")?.dataset.field;
    options.forEach((option) => {
      option.addEventListener("click", () => {
        options.forEach((o) => o.classList.remove("is-selected"));
        option.classList.add("is-selected");
        if (field) {
          answers[field] = option.dataset.value || "";
          if (hiddenFieldByKey[field]) hiddenFieldByKey[field].value = answers[field];
        }
        updateNextState();
        // Auto-advance shortly after picking an option, like a guided flow.
        window.setTimeout(() => {
          if (currentStep < totalSteps) {
            currentStep += 1;
            showStep(currentStep);
          }
        }, 220);
      });
    });
  });

  if (provinceSelect) {
    provinceSelect.addEventListener("change", () => {
      answers.province = provinceSelect.value;
    });
  }

  [nameInput, emailInput, phoneInput].forEach((input) => {
    input?.addEventListener("input", updateNextState);
  });

  backBtn?.addEventListener("click", () => {
    if (currentStep === 1) return;
    currentStep -= 1;
    showStep(currentStep);
  });

  nextBtn?.addEventListener("click", () => {
    if (!currentAnswerIsValid() || currentStep === totalSteps) return;
    currentStep += 1;
    showStep(currentStep);
  });

  submitBtn?.addEventListener("click", () => {
    if (!currentAnswerIsValid() || !applyForm) return;
    if (subjectField) subjectField.value = `Royal Den Capital application - ${answers.need || "Inquiry"}`;
    if (nextField) nextField.value = `${window.location.origin}/apply/thank-you/`;
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
    applyForm.submit();
  });

  showStep(currentStep);
})();
