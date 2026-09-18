/**
 * Glossary: definitions written for South African rules, one anchor per term,
 * marked up as DefinedTerm. Each entry links to the service page it belongs to,
 * which is what turns the glossary into internal link equity rather than filler.
 */

import type { Term } from "./glossary-types";
import { moreTerms } from "./glossary-more";

export type { Term };

const t = (
  id: string,
  term: string,
  definition: string,
  extra: Partial<Term> = {},
): Term => ({ id, term, letter: term[0].toUpperCase(), definition, ...extra });

const baseTerms: Term[] = [
  t("accrual-basis", "Accrual basis", "Recording income when it is earned and expenses when they are incurred, rather than when cash moves. It shows what a month actually cost, even if the invoice is paid later.", { service: "accounting-bookkeeping", related: ["cash-basis"] }),
  t("afs", "Annual financial statements (AFS)", "The yearly set of accounts for a business: balance sheet, income statement, cash flow statement and notes. Banks, SARS and buyers all work from them.", { service: "accounting-bookkeeping", matters: "Your tax return is built from these, so errors here repeat everywhere." }),
  t("annual-return", "Annual return (CIPC)", "A yearly filing confirming a company or close corporation is still active, submitted to CIPC with a fee based on turnover. It is not a tax return.", { service: "company-secretarial", matters: "Skipping it leads to deregistration, which can freeze bank accounts and contracts." }),
  t("assessment-it34", "Assessment (IT34)", "SARS's formal statement of what it calculates you owe, or are owed, after processing a return. The company version is the IT34C.", { service: "tax" }),
  t("audit-vs-review", "Audit vs independent review", "An audit is the higher level of assurance and is compulsory for some companies based on their public interest score; an independent review is a lighter engagement for smaller companies. Many owner-managed companies need neither.", { service: "accounting-bookkeeping" }),
  t("bank-feed", "Bank feed", "A daily automatic import of bank transactions into accounting software such as Xero, replacing manual capture from statements.", { service: "accounting-bookkeeping", related: ["bank-reconciliation"] }),
  t("bank-reconciliation", "Bank reconciliation", "Matching every transaction in the accounting records to the bank statement so the two agree exactly. It is the check that nothing is missing, duplicated or invented.", { service: "accounting-bookkeeping" }),
  t("bcea", "BCEA", "The Basic Conditions of Employment Act, which sets minimum standards for working hours, leave, notice and written particulars of employment.", { service: "hr", also: "Basic Conditions of Employment Act" }),
  t("beneficial-ownership", "Beneficial ownership", "The natural people who ultimately own or control a company, even when the shares are held by another company or a trust. The register must be filed with CIPC.", { service: "company-secretarial" }),
  t("body-corporate", "Body corporate", "The legal entity made up of all owners in a sectional title scheme, responsible for common property, levies and insurance, and run by elected trustees.", { service: "property-management", related: ["sectional-title", "levy"] }),
  t("break-even", "Break-even point", "The level of sales at which total income equals total costs. Below it you are funding the business; above it you are building it.", { service: "advisory-cfo" }),
  t("capital-gains-tax", "Capital gains tax (CGT)", "Tax on the profit made when an asset is sold, included in taxable income at an inclusion rate that differs for individuals, companies and trusts.", { service: "tax" }),
  t("cash-basis", "Cash basis", "Recording income and expenses only when money actually moves. Simple, but it hides money owed to you and by you.", { service: "accounting-bookkeeping", related: ["accrual-basis"] }),
  t("cash-flow-forecast", "Cash flow forecast", "A forward projection of money in and money out, usually weekly for the next 13 weeks. Profitable businesses fail on cash, not on profit.", { service: "advisory-cfo" }),
  t("ccma", "CCMA", "The Commission for Conciliation, Mediation and Arbitration, which resolves disputes between employers and employees.", { service: "hr", also: "Commission for Conciliation, Mediation and Arbitration" }),
  t("chart-of-accounts", "Chart of accounts", "The list of categories transactions are recorded against. A chart designed around how you actually run the business makes reports useful; a generic one makes them noise.", { service: "accounting-bookkeeping" }),
  t("cipc", "CIPC", "The Companies and Intellectual Property Commission, the registrar of companies in South Africa.", { service: "company-secretarial", also: "Companies and Intellectual Property Commission" }),
  t("coida", "COIDA", "The Compensation for Occupational Injuries and Diseases Act. Employers submit an annual return of earnings and contribute to the fund that covers workplace injuries.", { service: "payroll", also: "Return of Earnings, ROE" }),
  t("creditors", "Creditors (accounts payable)", "Money your business owes to suppliers. Tracking it is what stops a healthy-looking bank balance from being spent twice.", { service: "accounting-bookkeeping" }),
  t("debtors", "Debtors (accounts receivable)", "Money owed to your business by customers. Ageing debtors are the most common cause of a cash squeeze in a growing business.", { service: "accounting-bookkeeping" }),
  t("depreciation", "Depreciation", "Spreading the cost of an asset across the years it is used, rather than expensing it all at once. SARS allows its own wear-and-tear rates, which often differ from the accounting rate.", { service: "accounting-bookkeeping" }),
  t("dividends-tax", "Dividends tax", "Tax withheld when a company distributes profit to its shareholders, paid over to SARS by the company rather than the shareholder.", { service: "tax" }),
  t("due-diligence", "Due diligence", "A buyer's detailed examination of a business before purchase: financials, contracts, tax compliance, staff and legal exposure.", { service: "business-valuations" }),
  t("ebitda", "EBITDA", "Earnings before interest, tax, depreciation and amortisation. A rough proxy for operating cash generation, often used as the base for a valuation multiple.", { service: "business-valuations", also: "Earnings before interest, tax, depreciation and amortisation" }),
  t("efiling", "SARS eFiling", "SARS's online platform for registering, filing returns and making payments. Your registered representative controls who has access to your profile.", { service: "tax" }),
  t("emp201", "EMP201", "The monthly employer declaration of PAYE, UIF and SDL, due by the 7th of the following month, or the last business day before it.", { service: "payroll", related: ["paye", "uif", "sdl"] }),
  t("emp501", "EMP501", "The employer reconciliation that matches monthly EMP201 declarations, actual payments and the IRP5 certificates issued to employees. Submitted twice a year.", { service: "payroll", related: ["irp5"] }),
  t("fixed-asset-register", "Fixed asset register", "The schedule of what the business owns, when it was bought, what it cost and what it is now worth after depreciation.", { service: "accounting-bookkeeping" }),
  t("general-ledger", "General ledger", "The complete record of every transaction, organised by account. Every report in your accounts is ultimately a view of it.", { service: "accounting-bookkeeping" }),
  t("goodwill", "Goodwill", "The part of a business's value that is not in its physical assets: reputation, customer relationships, systems and position. It is what a buyer pays extra for.", { service: "business-valuations" }),
  t("irp5", "IRP5", "The annual tax certificate showing what an employee earned and what was deducted. Employees cannot complete their own returns until the employer submits this data.", { service: "payroll" }),
  t("irp6", "IRP6", "The provisional tax return used to declare and pay estimated tax during the year.", { service: "tax", related: ["provisional-tax"] }),
  t("it3a", "IT3(a)", "A certificate similar to an IRP5, issued where amounts were paid but no employees' tax was deducted.", { service: "payroll" }),
  t("itr14", "ITR14", "The annual income tax return for companies. The individual equivalent is the ITR12.", { service: "tax" }),
  t("levy", "Levy", "The monthly contribution owners pay to a body corporate or home owners association for common expenses and reserves.", { service: "property-management", related: ["body-corporate"] }),
  t("management-accounts", "Management accounts", "Internal financial reports, usually monthly or quarterly, produced quickly so decisions can be made on current information rather than last year's audited numbers.", { service: "advisory-cfo" }),
  t("moi", "MOI", "The Memorandum of Incorporation, the founding document setting out how a company is governed, who may do what, and how shares work.", { service: "company-secretarial", also: "Memorandum of Incorporation" }),
  t("normalised-earnings", "Normalised earnings", "Profit adjusted to remove one-off items and owner-specific costs, so a buyer can see what the business would earn under normal ownership.", { service: "business-valuations" }),
  t("paye", "PAYE", "Pay As You Earn: employees' tax withheld from salaries by the employer and paid to SARS monthly.", { service: "payroll", also: "Pay As You Earn" }),
  t("provisional-tax", "Provisional tax", "Paying estimated income tax in instalments during the tax year rather than in one amount afterwards. Companies are provisional taxpayers automatically; individuals become provisional taxpayers when they earn income outside PAYE.", { service: "tax", related: ["irp6"] }),
  t("public-officer", "Public officer", "The person SARS holds responsible for a company's tax affairs. Every company must appoint one, and SARS will not deal with anyone else on the company's tax matters.", { service: "tax" }),
  t("sdl", "SDL", "The Skills Development Levy, payable by employers whose annual payroll exceeds the threshold, declared on the EMP201.", { service: "payroll", also: "Skills Development Levy" }),
  t("sectional-title", "Sectional title", "Ownership of a defined section of a building plus a share of the common property, governed by the Sectional Titles Schemes Management Act.", { service: "property-management" }),
  t("small-business-corporation", "Small business corporation (SBC)", "A company meeting SARS's ownership and turnover requirements, taxed on a reduced sliding scale instead of the flat company rate.", { service: "tax" }),
  t("tax-clearance", "Tax compliance status (TCS)", "SARS's confirmation that your tax affairs are in order, issued as a PIN that a third party can use to verify your status. Tenders and many contracts require it.", { service: "tax" }),
  t("trial-balance", "Trial balance", "A summary of every ledger account balance at a point in time, used to check that the books balance before statements are prepared.", { service: "accounting-bookkeeping" }),
  t("trust-account", "Trust account", "A bank account holding money belonging to clients, such as levies or rental collections, kept separate from the practice's own funds and reconciled monthly.", { service: "property-management" }),
  t("turnover-tax", "Turnover tax", "A simplified tax for very small businesses, calculated on turnover instead of profit, which replaces income tax, and in some cases VAT and dividends tax.", { service: "tax" }),
  t("uif", "UIF", "The Unemployment Insurance Fund. Employers and employees each contribute a percentage of remuneration, and employers must also submit monthly declarations of their staff.", { service: "payroll", also: "Unemployment Insurance Fund" }),
  t("vat", "VAT", "Value-Added Tax charged on most goods and services. Registered vendors charge VAT on sales, claim it on qualifying purchases and pay the difference to SARS.", { service: "tax", also: "Value-Added Tax", related: ["vat201"] }),
  t("vat201", "VAT201", "The VAT return submitted for each tax period, usually every two months for smaller vendors and monthly above a turnover threshold.", { service: "tax", related: ["vat"] }),
  t("working-capital", "Working capital", "Current assets less current liabilities: the money tied up in running the business day to day. Growth consumes it, which is why profitable businesses can run out of cash.", { service: "advisory-cfo" }),
  t("year-end", "Financial year end", "The date a business's financial year closes. It determines your tax deadlines, provisional tax dates and when statements are prepared.", { service: "tax" }),
];

/** The whole glossary: core terms plus the extended set in glossary-more.ts. */
export const terms: Term[] = [...baseTerms, ...moreTerms];

export const termById = (id: string) => terms.find((x) => x.id === id);
export const termsByIds = (ids: string[]) =>
  ids.map((id) => termById(id)).filter((x): x is Term => Boolean(x));

export const alphabet = Array.from(new Set(terms.map((x) => x.letter))).sort();
export const termsSorted = [...terms].sort((a, b) => a.term.localeCompare(b.term));
