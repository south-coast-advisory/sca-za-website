/**
 * FAQ source of truth. Answers appear on the relevant service page AND in the
 * /faq hub, and are marked up as FAQPage schema wherever they are visible.
 *
 * Facts that change with Budget or SARS announcements carry `verify: true`.
 * Re-check those every February. See README-HANDOFF.md.
 */

export type Faq = {
  id: string;
  group: FaqGroup;
  q: string;
  a: string[];
  verify?: boolean;
};

export type FaqGroup =
  | "Choosing an accountant"
  | "Xero and switching software"
  | "Tax and SARS"
  | "Payroll and employees"
  | "Company and CIPC"
  | "Valuations and selling"
  | "Property"
  | "Working with SCA";

export const faqGroups: FaqGroup[] = [
  "Choosing an accountant",
  "Xero and switching software",
  "Tax and SARS",
  "Payroll and employees",
  "Company and CIPC",
  "Valuations and selling",
  "Property",
  "Working with SCA",
];

export const faqs: Faq[] = [
  // ── Choosing an accountant ──────────────────────────────────────────
  {
    id: "bookkeeper-vs-accountant",
    group: "Choosing an accountant",
    q: "What is the difference between a bookkeeper and an accountant?",
    a: [
      "A bookkeeper records what happened: invoices, payments, bank transactions and payroll entries. An accountant takes those records and turns them into financial statements, tax returns and advice about what to do next.",
      "Most small businesses need both. At South Coast Advisory the same team does the processing and the reporting, so nothing is lost in the handover.",
    ],
  },
  {
    id: "switch-accountant",
    group: "Choosing an accountant",
    q: "How do I change accountants without disrupting my business?",
    a: [
      "You give your new accountant written permission to request your records from the current one. Professional bodies expect an outgoing accountant to hand over your books, though they may hold back work you have not paid for.",
      "We then review what we receive, list anything outstanding at SARS and CIPC, and agree a start date. Most take-ons are done inside a month, and SARS deadlines carry on being met throughout.",
    ],
  },
  {
    id: "shoebox",
    group: "Choosing an accountant",
    q: "My paperwork is a mess and years behind. Will you still take me on?",
    a: [
      "Yes. Catching up on several years of records and outstanding returns is normal work for us, and it is usually cheaper than the penalties and interest of leaving it.",
      "We quote the catch-up separately from your monthly fee so you can see exactly what the clean-up costs.",
    ],
  },
  {
    id: "tax-practitioner-check",
    group: "Choosing an accountant",
    q: "How do I check that an accountant is registered?",
    a: [
      "Anyone who gives tax advice or completes returns for payment in South Africa must be registered with SARS as a tax practitioner and belong to a recognised controlling body such as SAICA or SAIPA.",
      "You can ask for the practitioner number and confirm membership with the controlling body directly. Ask us and we will give you ours in writing.",
    ],
  },

  // ── Xero ────────────────────────────────────────────────────────────
  {
    id: "xero-what-is-partner",
    group: "Xero and switching software",
    q: "What does it mean that you are a Xero partner?",
    a: [
      "Xero recognises accounting practices by the number of clients they support on Xero and the certification their staff hold. Partner status means our team is trained and assessed on Xero, and that we work in it every day rather than occasionally.",
      "In practice it means your books and our books are the same file. You are not emailing backups, and we are not working from a copy that is two months old.",
    ],
    verify: true,
  },
  {
    id: "xero-why-switch",
    group: "Xero and switching software",
    q: "Why switch from Pastel or Sage to Xero?",
    a: [
      "The practical differences are daily bank feeds, access from anywhere without a server, and your accountant seeing the same live data you do. Most owners notice that VAT and month-end stop being a scramble.",
      "Switching is not always right. If you have complex manufacturing or heavily customised reports, we will tell you to stay where you are.",
    ],
  },
  {
    id: "xero-migration-time",
    group: "Xero and switching software",
    q: "How long does moving to Xero take, and will I lose my history?",
    a: [
      "A straightforward small business is usually live within two to three weeks, most of which is waiting for bank feeds to activate.",
      "You do not lose history. We agree a conversion date, bring across balances and, where it is useful, transaction history. Your old system stays available as a read-only record.",
    ],
  },
  {
    id: "xero-cost",
    group: "Xero and switching software",
    q: "What does Xero cost in South Africa?",
    a: [
      "Xero publishes its South African subscription prices by plan, and they change from time to time, so we quote the current figure when we scope your setup rather than printing a price that goes stale.",
      "Our fee for setup, migration and training is quoted separately and once-off. The monthly Xero subscription can be billed to you directly or through us.",
    ],
    verify: true,
  },
  {
    id: "xero-payroll",
    group: "Xero and switching software",
    q: "Can Xero run South African payroll?",
    a: [
      "Xero's built-in payroll is not designed for South African PAYE, UIF, SDL and IRP5 requirements. We run payroll in a South African payroll system that integrates with Xero, so the journals land in your books automatically.",
      "You get compliant EMP201 and EMP501 submissions and a clean set of books, without double capturing.",
    ],
  },

  // ── Tax and SARS ────────────────────────────────────────────────────
  {
    id: "provisional-tax-who",
    group: "Tax and SARS",
    q: "Who has to pay provisional tax?",
    a: [
      "Companies are automatically provisional taxpayers. Individuals become provisional taxpayers when they earn income that is not subject to PAYE, such as business, rental or significant investment income, above the thresholds SARS sets.",
      "Provisional tax is not an extra tax. It is paying your expected annual tax in instalments: the first within six months of the start of your tax year, the second by the last day of the tax year, and an optional third top-up after year end.",
    ],
    verify: true,
  },
  {
    id: "vat-threshold",
    group: "Tax and SARS",
    q: "When must I register for VAT?",
    a: [
      "VAT registration becomes compulsory once your taxable turnover exceeds the threshold set in the VAT Act in any twelve-month period, and you may register voluntarily above a lower turnover figure.",
      "The thresholds are adjusted by National Treasury from time to time, so we confirm the current figures against your actual turnover before advising you to register. Registering too early creates admin you do not need; registering late creates penalties.",
    ],
    verify: true,
  },
  {
    id: "sars-penalties",
    group: "Tax and SARS",
    q: "What happens if my returns are late?",
    a: [
      "SARS charges administrative penalties for outstanding returns, and these recur monthly until the returns are filed. Interest runs on unpaid tax separately.",
      "Penalties can often be reduced or removed on request where there is a reasonable explanation, but only once the outstanding returns are actually filed. That is always the first step we take.",
    ],
  },
  {
    id: "records-how-long",
    group: "Tax and SARS",
    q: "How long must I keep my business records?",
    a: [
      "Tax legislation requires records supporting a return to be kept for five years from the date the return was submitted, and longer where an audit or objection is running. Company records under the Companies Act are generally kept for seven years.",
      "Digital copies are acceptable if they are complete and readable. Documents attached in Xero satisfy this, which is one of the practical reasons we put clients on it.",
    ],
    verify: true,
  },
  {
    id: "accountant-cost",
    group: "Working with SCA",
    q: "How much does an accountant cost in South Africa?",
    a: [
      "Fees depend on transaction volume, whether you are VAT registered, how many employees you have and how current your records are. A small business with clean books costs a fraction of one that needs years rebuilt.",
      "We quote a fixed monthly fee after a short review, so you know the figure before you commit. We will also tell you if you do not need us monthly.",
    ],
  },

  // ── Payroll ─────────────────────────────────────────────────────────
  {
    id: "emp201-late",
    group: "Payroll and employees",
    q: "What happens if I miss an EMP201 submission?",
    a: [
      "The EMP201 declaration and payment are due by the 7th of the month following the payroll month, or the last business day before the 7th when it falls on a weekend or public holiday.",
      "Late payment attracts a penalty on the amount due plus interest. The declaration must still be filed, so the fastest fix is to submit and pay, then deal with the penalty.",
    ],
    verify: true,
  },
  {
    id: "payroll-small-team",
    group: "Payroll and employees",
    q: "I only have two employees. Do I really need payroll software?",
    a: [
      "You need compliant payslips, PAYE and UIF calculations, EMP201 submissions, EMP501 reconciliations and IRP5 certificates, whether you have two employees or fifty. A spreadsheet rarely produces all of that correctly.",
      "For very small teams our payroll fee is modest, and it removes the risk of a reconciliation that does not balance at year end.",
    ],
  },
  {
    id: "irp5-when",
    group: "Payroll and employees",
    q: "When do my staff get their IRP5 certificates?",
    a: [
      "IRP5 certificates are produced from the annual EMP501 reconciliation after the end of the tax year in February, once SARS opens the submission period.",
      "Employees cannot file their own returns until the IRP5 data reaches SARS, so a late reconciliation holds up your whole team.",
    ],
  },
  {
    id: "uif-register",
    group: "Payroll and employees",
    q: "Must I register for UIF if I employ domestic or casual staff?",
    a: [
      "Employers must register for UIF and contribute for employees who work more than 24 hours a month, including domestic workers. Contributions are shared between employer and employee.",
      "We handle the registration and the monthly declarations along with your payroll.",
    ],
    verify: true,
  },
  {
    id: "employment-contract-required",
    group: "Payroll and employees",
    q: "Do I have to give employees written contracts?",
    a: [
      "Yes. The Basic Conditions of Employment Act requires employers to give employees written particulars of employment when they start work.",
      "Without a signed contract you are in a weak position in any dispute, and the CCMA will generally accept the employee's version of the terms.",
    ],
  },
  {
    id: "hr-vs-labour-lawyer",
    group: "Payroll and employees",
    q: "Do you handle CCMA cases?",
    a: [
      "We prepare and maintain the employment paperwork that a dispute turns on: contracts, policies, warnings and records. We do not represent employers at the CCMA.",
      "Where a matter needs representation we refer you to a labour specialist and give them a properly documented file.",
    ],
  },

  // ── Company and CIPC ────────────────────────────────────────────────
  {
    id: "cipc-annual-return",
    group: "Company and CIPC",
    q: "What is a CIPC annual return and what happens if I skip it?",
    a: [
      "Every registered company and close corporation must file an annual return with CIPC each year around the anniversary of its registration, with a fee based on turnover. It is separate from your tax return.",
      "Companies that do not file are placed in deregistration. A deregistered company loses its legal standing, which typically means frozen bank accounts and contracts that cannot be enforced. Reinstatement is possible but slow and more expensive than filing on time.",
    ],
  },
  {
    id: "beneficial-ownership",
    group: "Company and CIPC",
    q: "What is the beneficial ownership filing?",
    a: [
      "Companies must keep a register of the natural people who ultimately own or control the company and file it with CIPC, usually together with the annual return.",
      "It applies even where the shareholder is another company or a trust, in which case you must trace through to the actual individuals.",
    ],
    verify: true,
  },
  {
    id: "deregistered-company",
    group: "Company and CIPC",
    q: "My company was deregistered. Can it be restored?",
    a: [
      "Usually yes. Reinstatement requires an application to CIPC with supporting documents, proof that the company was operating, and the outstanding annual returns.",
      "We handle the application and bring the outstanding SARS returns up to date at the same time, because the two problems normally arrive together.",
    ],
  },

  // ── Valuations ──────────────────────────────────────────────────────
  {
    id: "valuation-cost",
    group: "Valuations and selling",
    q: "What does a business valuation cost?",
    a: [
      "It depends on the purpose and the state of your records. A valuation for an internal shareholder buy-out is lighter work than one that must withstand a court or a buyer's due diligence.",
      "We scope it first and quote a fixed fee, so the cost is known before we start.",
    ],
  },
  {
    id: "valuation-method",
    group: "Valuations and selling",
    q: "How do you value a small business?",
    a: [
      "For an owner-managed trading business we usually normalise earnings, remove owner-specific costs, and apply a multiple supported by the risk profile and the sector, then sanity-check it against net asset value and cash flow.",
      "The method follows the purpose. A valuation for a divorce, an estate, a bank and a trade buyer can legitimately produce different numbers, and the report explains why.",
    ],
  },
  {
    id: "sell-business-prepare",
    group: "Valuations and selling",
    q: "How far ahead should I prepare to sell my business?",
    a: [
      "Two to three years is ideal. Buyers pay for clean financial statements, contracts that survive your departure, and profits that are not dependent on the owner personally.",
      "A year of tidy books is worth more at the negotiating table than any amount of explaining.",
    ],
  },

  // ── Property ────────────────────────────────────────────────────────
  {
    id: "body-corporate-accounting",
    group: "Property",
    q: "What accounting must a body corporate do?",
    a: [
      "A body corporate must prepare annual financial statements, keep proper levy and expense records, budget for both administrative and reserve funds, and present these to owners at the annual general meeting.",
      "We prepare the statements and the AGM pack, and give trustees monthly reporting on arrears in between.",
    ],
    verify: true,
  },
  {
    id: "property-trust-account",
    group: "Property",
    q: "Are levies and rentals kept separate from your own money?",
    a: [
      "Yes. Money collected on behalf of a scheme or landlord is administered separately from the practice's own funds and reconciled monthly.",
      "Trustees and owners receive statements showing exactly what was collected, what was paid and what remains.",
    ],
  },

  // ── Working with SCA ────────────────────────────────────────────────
  {
    id: "where-are-you",
    group: "Working with SCA",
    q: "Where are you and do I have to come to the office?",
    a: [
      "Our office is in Amanzimtoti, and we work with businesses along the KZN South Coast from Durban South down to Scottburgh.",
      "Because your books are in the cloud, most clients deal with us by phone, email and video, and come in when it matters. You are welcome either way.",
    ],
  },
  {
    id: "virtual-cfo-worth",
    group: "Working with SCA",
    q: "When is a virtual CFO worth paying for?",
    a: [
      "When decisions are getting expensive: hiring, taking on debt, opening a second location, or pricing a big contract. At that point monthly management accounts and a forecast pay for themselves.",
      "Below that, solid bookkeeping and an annual planning conversation is usually enough, and we will say so.",
    ],
  },
  {
    id: "management-accounts-frequency",
    group: "Working with SCA",
    q: "How often should I look at management accounts?",
    a: [
      "Monthly if you have staff, stock or debt. Quarterly is enough for a stable business with simple operations.",
      "The value is in the comparison over time, not in any single month's figures.",
    ],
  },
];

export const faqById = (id: string) => faqs.find((f) => f.id === id);
export const faqsByIds = (ids: string[]) =>
  ids.map((id) => faqById(id)).filter((f): f is Faq => Boolean(f));
export const faqsInGroup = (group: FaqGroup) => faqs.filter((f) => f.group === group);
