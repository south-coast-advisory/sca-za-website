/**
 * Service pages. One page per keyword cluster (see planning/sca-website-blueprint.html).
 * Copy is rewritten from SCA's own 2023 content — shorter, outcome-led, no duplication.
 */

export type Service = {
  slug: string;
  nav: string;
  title: string;          // <title>
  h1: string;
  description: string;    // meta description
  /** The 40-60 word passage AI engines can quote. */
  answer: string;
  includes: string[];
  steps: { step: string; detail: string }[];
  faqIds: string[];
  glossary: string[];
  related: string[];
  stage: "starting" | "growing" | "established" | "selling";
};

export const services: Service[] = [
  {
    slug: "accounting-bookkeeping",
    nav: "Accounting & bookkeeping",
    title: "Bookkeeping & Accounting Services, Amanzimtoti",
    h1: "Books that are current, reconciled and ready for SARS",
    description:
      "Monthly bookkeeping, management accounts and annual financial statements for businesses on the KZN South Coast. Run on Xero by a Xero Silver Partner in Amanzimtoti.",
    answer:
      "South Coast Advisory keeps your books current in Xero, reconciles your bank accounts monthly, and prepares annual financial statements. You get management accounts you can act on instead of a shoebox reconstructed once a year. Suited to owner-managed businesses on the KZN South Coast that have outgrown a spreadsheet.",
    includes: [
      "Monthly transaction processing and bank reconciliation",
      "Accounts payable and receivable management",
      "Monthly or quarterly management accounts",
      "Annual financial statements",
      "General ledger maintenance and journals",
      "Fixed asset register",
      "Year-end file ready for review or audit",
    ],
    steps: [
      { step: "Take on", detail: "We review your current system, agree a monthly cut-off date, and set up or clean up your Xero file." },
      { step: "Each month", detail: "You send or sync documents, we process and reconcile, then send management accounts." },
      { step: "Each year", detail: "We prepare the annual financial statements and hand the tax pack to our tax team." },
    ],
    faqIds: ["records-how-long", "shoebox", "bookkeeper-vs-accountant", "switch-accountant"],
    glossary: ["bank-reconciliation", "management-accounts", "afs", "general-ledger", "trial-balance"],
    related: ["tax", "payroll"],
    stage: "growing",
  },
  {
    slug: "tax",
    nav: "Tax",
    title: "Tax Practitioner Services, KZN South Coast",
    h1: "Tax returns filed correctly, on time, every time",
    description:
      "Company, individual and provisional tax returns, VAT and SARS disputes, handled by a registered tax practitioner in Amanzimtoti serving the KZN South Coast.",
    answer:
      "South Coast Advisory prepares and submits company, trust and individual tax returns, provisional tax (IRP6) and VAT returns, and deals with SARS on your behalf. We handle verifications, assessments and disputes, so you are not the one sitting in a SARS queue.",
    includes: [
      "Company income tax (ITR14) and individual returns (ITR12)",
      "Provisional tax calculations and IRP6 submissions",
      "VAT registration and monthly or bi-monthly VAT201 returns",
      "SARS verifications, objections and disputes",
      "Tax clearance and Approved International Transfer applications",
      "Registered representative and eFiling profile management",
    ],
    steps: [
      { step: "Review", detail: "We check your SARS profile, registrations and outstanding returns before anything else." },
      { step: "Bring current", detail: "Outstanding returns are brought up to date and any penalties are addressed." },
      { step: "Keep current", detail: "We diarise every deadline for your year-end and file ahead of it." },
    ],
    faqIds: ["provisional-tax-who", "vat-threshold", "sars-penalties", "tax-practitioner-check"],
    glossary: ["provisional-tax", "irp6", "itr14", "vat201", "efiling", "assessment-it34"],
    related: ["accounting-bookkeeping", "company-secretarial"],
    stage: "established",
  },
  {
    slug: "payroll",
    nav: "Payroll",
    title: "Payroll Services & EMP201 Submissions",
    h1: "Payroll that SARS never queries",
    description:
      "Outsourced payroll for South Coast employers: payslips, EMP201 and EMP501 submissions, IRP5 certificates, UIF and COIDA returns.",
    answer:
      "South Coast Advisory runs your monthly payroll, issues payslips, submits your EMP201 by the 7th, reconciles EMP501 twice a year and issues IRP5 certificates. UIF declarations and the annual COIDA return of earnings are handled in the same service, so all employment filings sit with one team.",
    includes: [
      "Monthly payroll processing and payslips",
      "PAYE, UIF and SDL calculations",
      "EMP201 monthly declarations",
      "Interim and annual EMP501 reconciliations",
      "IRP5 and IT3(a) certificates",
      "COIDA return of earnings (ROE)",
      "Leave records and payroll reports for management accounts",
    ],
    steps: [
      { step: "Set up", detail: "We load your employees, pay structures and benefits, and register you for PAYE, UIF or SDL if needed." },
      { step: "Each month", detail: "You approve changes, we run the payroll, send payslips and file the EMP201." },
      { step: "Twice a year", detail: "We reconcile the EMP501 and issue IRP5 certificates to your staff." },
    ],
    faqIds: ["emp201-late", "payroll-small-team", "irp5-when", "uif-register"],
    glossary: ["paye", "emp201", "emp501", "irp5", "uif", "sdl", "coida"],
    related: ["hr", "accounting-bookkeeping"],
    stage: "growing",
  },
  {
    slug: "company-secretarial",
    nav: "Company secretarial",
    title: "CIPC & Company Secretarial Services",
    h1: "Your company kept in good standing at CIPC",
    description:
      "Company registrations, CIPC annual returns, beneficial ownership filings, director changes and statutory records for South Coast businesses.",
    answer:
      "South Coast Advisory keeps your company compliant at CIPC: annual returns, beneficial ownership filings, director and address changes, share transfers and statutory registers. Missing an annual return can lead to deregistration, which freezes your bank account and contracts, so we diarise it for you.",
    includes: [
      "Company and close corporation registrations",
      "CIPC annual returns",
      "Beneficial ownership register and filing",
      "Director, auditor and registered address changes",
      "Share issues, transfers and certificates",
      "Statutory registers and minute books",
      "Deregistration and reinstatement applications",
    ],
    steps: [
      { step: "Check", detail: "We pull your CIPC record and list anything outstanding or incorrect." },
      { step: "Correct", detail: "Outstanding returns and filings are brought up to date." },
      { step: "Maintain", detail: "Your annual return and beneficial ownership filing are diarised each year." },
    ],
    faqIds: ["cipc-annual-return", "beneficial-ownership", "deregistered-company"],
    glossary: ["cipc", "annual-return", "beneficial-ownership", "moi", "public-officer"],
    related: ["tax", "business-valuations"],
    stage: "starting",
  },
  {
    slug: "advisory-cfo",
    nav: "Advisory & virtual CFO",
    title: "Virtual CFO & Business Advisory, KZN",
    h1: "The numbers conversation you are not having",
    description:
      "Management accounts, cash flow forecasting, budgets and board packs for owner-managed businesses on the KZN South Coast.",
    answer:
      "South Coast Advisory acts as an outsourced finance function: monthly management accounts, a rolling cash flow forecast, budget versus actual reporting and a quarterly review with Neil. It suits businesses too big for a bookkeeper alone but not yet able to employ a full-time financial manager.",
    includes: [
      "Monthly or quarterly management accounts with commentary",
      "13-week rolling cash flow forecast",
      "Budgets and budget versus actual reporting",
      "Pricing, margin and break-even analysis",
      "Funding applications and bank pack preparation",
      "Quarterly review meeting with the managing director",
    ],
    steps: [
      { step: "Baseline", detail: "We establish where the business actually stands today, in writing." },
      { step: "Forecast", detail: "We build the cash flow and budget model with you, not for you." },
      { step: "Review", detail: "Each quarter we compare plan to result and decide the next move." },
    ],
    faqIds: ["virtual-cfo-worth", "management-accounts-frequency"],
    glossary: ["management-accounts", "cash-flow-forecast", "working-capital", "break-even"],
    related: ["business-valuations", "accounting-bookkeeping"],
    stage: "established",
  },
  {
    slug: "business-valuations",
    nav: "Business valuations",
    title: "Business Valuation Services, Durban South",
    h1: "What your business is actually worth, and why",
    description:
      "Independent business valuations for sales, buy-outs, disputes, estates and funding, prepared by a chartered accountant in Amanzimtoti.",
    answer:
      "South Coast Advisory prepares independent business valuations for sales, shareholder buy-outs, divorce and estate matters, and funding applications. The report sets out the method used, the assumptions behind it and the resulting range, so it stands up to scrutiny from a buyer, a bank or a court.",
    includes: [
      "Valuation for sale, purchase or shareholder exit",
      "Estate and matrimonial valuations",
      "Funding and investor pack valuations",
      "Normalisation of owner earnings",
      "Written report with method, assumptions and range",
      "Pre-sale preparation: what to fix before you go to market",
    ],
    steps: [
      { step: "Scope", detail: "We agree the purpose of the valuation, because purpose determines method." },
      { step: "Analyse", detail: "We normalise three to five years of results and test the assumptions." },
      { step: "Report", detail: "You receive a written valuation you can hand to a buyer, bank or attorney." },
    ],
    faqIds: ["valuation-cost", "valuation-method", "sell-business-prepare"],
    glossary: ["ebitda", "normalised-earnings", "goodwill", "due-diligence"],
    related: ["advisory-cfo", "company-secretarial"],
    stage: "selling",
  },
  {
    slug: "hr",
    nav: "HR & employment",
    title: "HR & Employment Support for Small Businesses",
    h1: "Employment admin that keeps you out of the CCMA",
    description:
      "Employment contracts, policies, payroll-linked HR records and disciplinary support for small employers on the KZN South Coast.",
    answer:
      "South Coast Advisory helps small employers get the employment basics right: written contracts, workplace policies, accurate leave and payroll records, and a defensible paper trail for disciplinary matters. It is practical support for owners without an HR department, not legal representation.",
    includes: [
      "Employment contracts and letters of appointment",
      "Workplace policies and employee handbook",
      "Leave, overtime and attendance records",
      "Disciplinary and performance documentation",
      "Payroll-linked employee records",
      "Guidance on BCEA and Labour Relations Act basics",
    ],
    steps: [
      { step: "Audit", detail: "We check which employees have contracts and what is missing." },
      { step: "Document", detail: "Contracts and policies are issued and signed." },
      { step: "Maintain", detail: "Records stay current alongside your monthly payroll." },
    ],
    faqIds: ["employment-contract-required", "hr-vs-labour-lawyer"],
    glossary: ["bcea", "ccma", "uif"],
    related: ["payroll"],
    stage: "growing",
  },
  {
    slug: "property-management",
    nav: "Property management",
    title: "Property & Body Corporate Management",
    h1: "Trust accounting and administration for property owners",
    description:
      "Sectional title, home owners association and rental administration with proper trust accounting, on the KZN South Coast.",
    answer:
      "South Coast Advisory administers sectional title schemes, home owners associations and rental portfolios: levy collection, trust accounting, budgets, AGM packs and statutory returns. The accounting side is handled by the same practice that prepares the financial statements, so nothing falls between two service providers.",
    includes: [
      "Levy and rental collection with monthly statements",
      "Trust account administration and reconciliation",
      "Scheme budgets and levy calculations",
      "AGM notices, packs and minutes",
      "Annual financial statements for the scheme",
      "Arrears management and reporting to trustees",
    ],
    steps: [
      { step: "Take over", detail: "We take on the scheme's records, bank account and arrears position." },
      { step: "Run it", detail: "Levies are collected, creditors paid and trustees receive monthly reporting." },
      { step: "Account", detail: "Annual financial statements and the AGM pack are prepared in good time." },
    ],
    faqIds: ["body-corporate-accounting", "property-trust-account"],
    glossary: ["sectional-title", "body-corporate", "trust-account", "levy"],
    related: ["accounting-bookkeeping"],
    stage: "established",
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const stages = [
  { id: "starting", title: "Starting out", detail: "Registering the company, first SARS registrations, getting the books set up properly from day one." },
  { id: "growing", title: "Growing", detail: "Staff on payroll, VAT registered, and a bookkeeping load that has outgrown a spreadsheet." },
  { id: "established", title: "Established", detail: "You need management accounts, forecasts and someone to challenge the numbers with you." },
  { id: "selling", title: "Selling or exiting", detail: "Valuation, clean books, and a business that survives due diligence." },
] as const;
