/**
 * Xero knowledge base.
 *
 * Used by /xero, /xero/pricing and by Sandy (the voice assistant), so there is
 * one version of every Xero fact on this site.
 *
 * SOURCES (fetched 18 September 2026):
 *  - xero.com/za/pricing-plans      — plan names, rand prices, promotion
 *  - xero.com/za/partner-programme  — tiers, certification, partner benefits
 *  - xero.com/za/accounting-software — SA bank feeds, VAT tools, app ecosystem
 *
 * RE-CHECK: Xero announced a subscription price increase from 1 November 2026.
 * Update PLAN_PRICES and PRICES_AS_AT after that date, or the page is wrong.
 */

export const PRICES_AS_AT = "18 September 2026";
export const PRICE_CHANGE_NOTE =
  "Xero has announced a subscription price increase from 1 November 2026. We confirm the current figure when we quote your setup.";

export type XeroPlan = {
  name: string;
  monthly: string;
  suits: string;
  includes: string[];
  limits: string[];
};

export const plans: XeroPlan[] = [
  {
    name: "Starter",
    monthly: "R450",
    suits: "Sole proprietors and very small businesses with a handful of invoices a month.",
    includes: [
      "Bank reconciliation",
      "30-day cash flow forecast",
      "Mobile app",
      "SARS-compliant tax invoices",
    ],
    limits: [
      "Up to 20 invoices and quotes a month",
      "Up to 5 bills a month",
      "No multi-currency",
    ],
  },
  {
    name: "Standard",
    monthly: "R795",
    suits: "Most trading businesses on the South Coast. This is the plan we put clients on.",
    includes: [
      "Unlimited invoices, quotes and bills",
      "Automated bank reconciliation",
      "60-day cash flow forecast",
      "Customisable dashboards and budgets",
    ],
    limits: ["No multi-currency", "Expenses and Projects are paid add-ons"],
  },
  {
    name: "Premium",
    monthly: "R1 095",
    suits: "Businesses invoicing in other currencies, or wanting deeper analysis.",
    includes: [
      "Everything in Standard",
      "Multi-currency invoicing and payments",
      "180-day cash flow forecast",
      "KPI and ratio analysis, industry benchmarking",
      "Unlimited budgets",
    ],
    limits: ["Expenses and Projects are paid add-ons"],
  },
];

export const planPromotion =
  "Xero usually runs an introductory discount for the first few months on new subscriptions. We will tell you what is current when you sign up.";

/** What being a partner actually means — stated carefully, from Xero's own programme page. */
export const partnerFacts = [
  "The Xero partner programme runs from Bronze through Silver, Gold and Platinum. Status reflects how many clients a practice supports on Xero.",
  "Partner practices must have at least one member of staff complete Xero advisor certification, which Xero assesses.",
  "Silver status gives a practice Xero's practice management tools, discounted subscriptions for clients, a direct support line, and a listing in Xero's advisor directory.",
  "The programme is free to join. Partner status is earned through client work, not bought.",
];

/** South African specifics — the questions people actually ask. */
export const southAfricanFacts = [
  {
    q: "Which South African banks feed into Xero?",
    a: "Xero connects to the major South African banks, including FNB, Absa, Standard Bank and Nedbank, as well as international banks. Transactions import automatically each day for reconciliation.",
  },
  {
    q: "Does Xero handle VAT for SARS?",
    a: "Yes. Xero has built-in VAT tools that prepare return figures in line with SARS requirements, produces tax invoices in the required format, and reminds you of VAT deadlines. The VAT201 is still submitted on eFiling — we do that as part of your monthly service.",
  },
  {
    q: "Can Xero run South African payroll?",
    a: "Not on its own in the way South African employers need. PAYE, UIF, SDL, EMP201, EMP501 and IRP5 certificates are handled in a South African payroll system that integrates with Xero, such as SimplePay, so the payroll journals post straight into your books without recapturing.",
  },
  {
    q: "What else connects to Xero locally?",
    a: "The Xero app marketplace includes South African tools such as PayFast and Yoco for payments and SimplePay for payroll, plus hundreds of industry apps for stock, job costing and time tracking.",
  },
];

/** Feature grid. `icon` files are Xero's own product icons in /public/xero. */
export type XeroFeature = { name: string; detail: string; icon?: string };

export const features: XeroFeature[] = [
  { name: "Bank reconciliation", detail: "Daily feeds matched against your records, so the books are current rather than six weeks old.", icon: "bank-rec.svg" },
  { name: "Bank feeds", detail: "Transactions arrive automatically from FNB, Absa, Standard Bank, Nedbank and others.", icon: "feature-bank-feeds.svg" },
  { name: "Invoicing", detail: "Send a SARS-compliant invoice from your phone and see when it was opened.", icon: "invoicing.svg" },
  { name: "Quotes", detail: "Turn an accepted quote into an invoice without capturing it twice.", icon: "quotes.svg" },
  { name: "Pay bills", detail: "Approve and schedule what you owe, with the supplier document attached.", icon: "pay-bills.svg" },
  { name: "Payments", detail: "Let customers pay an invoice online through PayFast or Yoco and watch it reconcile.", icon: "payments.svg" },
  { name: "Expenses", detail: "Staff photograph a slip and it lands in the books with the image attached.", icon: "expenses.svg" },
  { name: "Inventory", detail: "Track stock items, quantities and cost of sales without a separate spreadsheet.", icon: "inventory.svg" },
  { name: "Fixed assets", detail: "A register that calculates depreciation instead of a spreadsheet nobody updates.", icon: "fixed-assets.svg" },
  { name: "VAT and sales tax", detail: "VAT return figures prepared from the ledger, in line with SARS requirements.", icon: "sales-tax.svg" },
  { name: "Multi-currency", detail: "Invoice and pay in other currencies with automatic revaluation (Premium plan).", icon: "multi-currency.svg" },
  { name: "Purchase orders", detail: "Commit spend properly before the supplier invoice arrives.", icon: "purchase-orders.svg" },
  { name: "Reporting", detail: "Management reports you can actually read, refreshed from live data.", icon: "reporting.svg" },
  { name: "Dashboard", detail: "Cash in, cash out and what you are owed, on one screen.", icon: "dashboard.svg" },
  { name: "Performance dashboard", detail: "Track the few numbers that actually drive your business.", icon: "business-performance-dashboard.svg" },
  { name: "Files", detail: "Contracts and invoices attached to the transaction they belong to, which satisfies SARS record-keeping.", icon: "files.svg" },
  { name: "Contacts and smart lists", detail: "Segment customers by what they buy and what they owe you.", icon: "contacts.svg" },
  { name: "Projects", detail: "Track time and cost per job to see which work is actually profitable.", icon: "projects.svg" },
  { name: "Payroll integration", detail: "South African payroll posting straight into your ledger through SimplePay.", icon: "payrun.svg" },
  { name: "Search", detail: "Find any transaction, contact or document in seconds.", icon: "search.svg" },
  { name: "Security", detail: "Two-step authentication and a full audit trail of who changed what, and when.", icon: "security.svg" },
  { name: "Mobile app", detail: "Your cash position and your debtors, wherever you are.", icon: "mobile.svg" },
];

/** The migration sequence. A real sequence, so numbering it is honest. */
export const migrationSteps = [
  {
    title: "Review what you have",
    detail:
      "We look at your current system, your chart of accounts and what genuinely needs to come across. If Xero is the wrong move for your business, we say so at this point.",
  },
  {
    title: "Convert the data",
    detail:
      "We agree a conversion date, bring across opening balances and the history worth having, then reconcile the opening position against your last signed figures.",
  },
  {
    title: "Connect the plumbing",
    detail:
      "Bank feeds, payroll integration, invoice templates and document storage. Most of the calendar time is the bank approving feeds, not our work.",
  },
  {
    title: "Train your team",
    detail:
      "Whoever raises invoices and captures costs is trained on the parts they use, and keeps a short written procedure for their own job.",
  },
];

export const migratingFrom = [
  {
    from: "Pastel (Sage 50cloud / Partner)",
    note: "The most common move we handle. Balances and customer, supplier and item lists convert; we agree how much transaction history is worth bringing.",
  },
  {
    from: "Sage Business Cloud / Sage One",
    note: "A straightforward conversion. The biggest change your team notices is bank feeds replacing manual capture.",
  },
  {
    from: "QuickBooks",
    note: "Converts cleanly. We map the chart of accounts to something that reports usefully for your business rather than copying the old one.",
  },
  {
    from: "Spreadsheets or a shoebox",
    note: "Often the easiest of all, because there is nothing to unpick. We set the structure up correctly from day one.",
  },
];
