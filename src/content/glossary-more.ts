/**
 * Glossary, part two. Kept in a separate file so each stays readable; both are
 * merged in glossary.ts. Same rules: South African context, plain English,
 * every term linked to the service it belongs to.
 */
import type { Term } from "./glossary-types";

const t = (
  id: string,
  term: string,
  definition: string,
  extra: Partial<Term> = {},
): Term => ({ id, term, letter: term[0].toUpperCase(), definition, ...extra });

export const moreTerms: Term[] = [
  // ── Tax and SARS ────────────────────────────────────────────────────
  t("admin-penalty", "Administrative penalty", "A fixed monthly penalty SARS charges for an outstanding return. It repeats every month the return stays outstanding, so it grows quietly until the return is filed.", { service: "tax", related: ["assessment-it34"] }),
  t("auto-assessment", "Auto-assessment", "An assessment SARS issues automatically to some individual taxpayers from third-party data such as IRP5s and interest certificates. If it is wrong or incomplete, you must file a corrected return within the period SARS allows.", { service: "tax" }),
  t("diesel-rebate", "Diesel refund", "A refund of part of the fuel levy available to qualifying users such as farming, mining and offshore operations, claimed through the VAT system.", { service: "tax" }),
  t("dispute-objection", "Objection and appeal", "The formal route for disagreeing with a SARS assessment. An objection is lodged first, within the prescribed period; an appeal follows if the objection is disallowed.", { service: "tax", related: ["assessment-it34"] }),
  t("donations-tax", "Donations tax", "Tax on the value of property disposed of for no or inadequate consideration, payable by the donor, with an annual exemption for individuals.", { service: "tax" }),
  t("emp601", "EMP601", "The form used to adjust or reallocate amounts declared on employer returns when a correction is needed.", { service: "payroll", related: ["emp201", "emp501"] }),
  t("estimated-assessment", "Estimated assessment", "An assessment SARS raises on its own estimate when returns or supporting documents are not submitted. It is almost always higher than a correctly prepared return.", { service: "tax" }),
  t("input-vat", "Input VAT", "VAT you paid on qualifying business purchases, which a registered vendor may claim back. Valid tax invoices are the condition, not an optional extra.", { service: "tax", related: ["output-vat", "vat"] }),
  t("output-vat", "Output VAT", "VAT you charged your customers on sales. What you pay SARS is output VAT less input VAT.", { service: "tax", related: ["input-vat", "vat"] }),
  t("pay-arrangement", "Payment arrangement (deferral)", "A formal agreement with SARS to settle a tax debt in instalments. It requires up-to-date returns and a case for why full payment now is not possible.", { service: "tax" }),
  t("ptt", "Provisional taxpayer", "A person or company required to pay tax in advance during the year, because income is not fully covered by PAYE.", { service: "tax", related: ["provisional-tax", "irp6"] }),
  t("ringfenced-loss", "Ring-fenced loss", "An assessed loss from certain secondary trades that SARS restricts, so it can be set off only against future income from that same trade.", { service: "tax" }),
  t("sbc-rates", "Small business corporation rates", "A reduced sliding tax scale available to companies meeting SARS's ownership, turnover and activity tests. Many owner-managed companies qualify and never claim it.", { service: "tax", related: ["small-business-corporation"] }),
  t("section-12h", "Learnership allowance", "An additional tax deduction for registered learnership agreements, on top of the salary cost already deducted.", { service: "tax" }),
  t("section-18a", "Section 18A receipt", "A receipt from an approved public benefit organisation that allows the donor to claim the donation as a tax deduction, within limits.", { service: "tax" }),
  t("tax-year", "Year of assessment", "The tax year being assessed. For individuals it ends on the last day of February; for companies it ends on the company's own financial year end.", { service: "tax", related: ["year-end"] }),
  t("third-party-appointment", "Third-party appointment (AA88)", "A SARS instruction to your bank or employer to pay a tax debt out of your funds. It arrives without negotiation, which is why outstanding debt should be addressed early.", { service: "tax" }),
  t("verification", "Verification", "SARS checking the supporting documents behind a return before finalising an assessment. It is routine, not an accusation, but it has strict deadlines.", { service: "tax" }),

  // ── Payroll and employment ──────────────────────────────────────────
  t("basic-salary", "Basic salary vs cost to company", "Basic salary is the cash portion; cost to company adds the employer's contributions and benefits. Quoting one when the employee expects the other causes most pay disputes.", { service: "payroll" }),
  t("bcea-leave", "Annual leave entitlement", "The BCEA minimum is 21 consecutive days of paid annual leave per year, or one day for every 17 days worked. Contracts may be more generous, never less.", { service: "hr", related: ["bcea"] }),
  t("etinl", "Employment tax incentive (ETI)", "A reduction in the PAYE an employer pays over, available for qualifying younger employees, claimed through the EMP201.", { service: "payroll", related: ["emp201"] }),
  t("fringe-benefit", "Fringe benefit", "A non-cash benefit given to an employee, such as a company car, free accommodation or a low-interest loan. Most are taxable and must run through payroll.", { service: "payroll" }),
  t("garnishee", "Emoluments attachment order", "A court order requiring an employer to deduct a debt from an employee's salary. The employer must comply and account correctly for it.", { service: "payroll" }),
  t("nmw", "National minimum wage", "The legal minimum hourly rate, reviewed annually. Some sectors have their own determinations that set a higher floor.", { service: "hr", verify: true }),
  t("payslip", "Payslip", "The written statement an employer must give with each payment, showing earnings, deductions and the period. It is a legal requirement, not a courtesy.", { service: "payroll", related: ["bcea"] }),
  t("probation", "Probation", "An agreed initial period for assessing a new employee's suitability. It does not remove the right to a fair procedure before dismissal.", { service: "hr" }),
  t("retrenchment", "Retrenchment", "Dismissal for operational requirements. It has its own consultation process and severance rules, and getting the process wrong is what usually costs employers at the CCMA.", { service: "hr", related: ["ccma"] }),
  t("uif-ui19", "UI-19", "The monthly declaration of employees and their earnings submitted to the UIF. Without it, employees struggle to claim benefits.", { service: "payroll", related: ["uif"] }),

  // ── Company, CIPC and governance ────────────────────────────────────
  t("b-bbee-affidavit", "B-BBEE sworn affidavit", "A sworn statement of turnover and black ownership that lets an exempted micro enterprise or qualifying small enterprise prove its B-BBEE level without a verification certificate.", { service: "company-secretarial", verify: true }),
  t("business-rescue", "Business rescue", "A formal Companies Act process to rehabilitate a financially distressed company under a practitioner, as an alternative to liquidation.", { service: "advisory-cfo" }),
  t("company-types", "Pty Ltd, NPC, Inc", "A private company (Pty) Ltd limits shareholder liability; an Inc is a personal liability company where directors are jointly liable; an NPC is a non-profit company. The choice affects tax, liability and reporting.", { service: "company-secretarial" }),
  t("directors-duties", "Directors' duties", "Directors must act in good faith, in the company's best interests and with reasonable care. Failing to do so can make a director personally liable, including for tax debts.", { service: "company-secretarial" }),
  t("pis", "Public interest score (PIS)", "A score based on employees, turnover, third-party liabilities and shareholders that determines whether a company needs an audit, an independent review, or neither.", { service: "accounting-bookkeeping", related: ["audit-vs-review"] }),
  t("registered-office", "Registered office", "The address CIPC and SARS use for official correspondence. Notices sent there count as delivered, whether or not anyone reads them.", { service: "company-secretarial" }),
  t("solvency-liquidity", "Solvency and liquidity test", "The Companies Act test a company must pass before paying a dividend, buying back shares or making certain distributions: assets must exceed liabilities and the company must be able to pay its debts as they fall due.", { service: "company-secretarial" }),
  t("shareholders-agreement", "Shareholders' agreement", "The contract between shareholders covering control, deadlock, what happens on death or exit, and how shares are valued. The MOI governs the company; this governs the owners.", { service: "business-valuations", related: ["moi"] }),

  // ── Accounting, reporting and finance ───────────────────────────────
  t("amortisation", "Amortisation", "Spreading the cost of an intangible asset, such as software or a licence, across its useful life. The intangible equivalent of depreciation.", { service: "accounting-bookkeeping", related: ["depreciation"] }),
  t("assessed-loss", "Assessed loss", "A tax loss carried forward to set off against future taxable income, subject to the limits in the Income Tax Act.", { service: "tax" }),
  t("balance-sheet", "Balance sheet (statement of financial position)", "What the business owns and owes at a single date. It answers 'what is it standing on', where the income statement answers 'how did it do'.", { service: "accounting-bookkeeping" }),
  t("contribution-margin", "Contribution margin", "Selling price less the variable cost of producing it. It tells you what each sale contributes towards fixed costs and profit.", { service: "advisory-cfo", related: ["break-even"] }),
  t("cost-of-sales", "Cost of sales", "The direct cost of what you sold: stock, materials and direct labour. Gross profit is revenue less this figure.", { service: "accounting-bookkeeping", related: ["gross-margin"] }),
  t("current-ratio", "Current ratio", "Current assets divided by current liabilities. A quick read on whether the business can meet what falls due in the next year.", { service: "advisory-cfo", related: ["working-capital"] }),
  t("debtors-days", "Debtors days", "The average number of days customers take to pay. Cutting it is usually the cheapest source of cash a business has.", { service: "advisory-cfo", related: ["debtors"] }),
  t("gearing", "Gearing", "How much of the business is funded by debt rather than owners' funds. High gearing magnifies both profit and risk.", { service: "advisory-cfo" }),
  t("gross-margin", "Gross margin", "Gross profit as a percentage of sales. Watching it monthly catches pricing and stock problems long before the annual statements do.", { service: "advisory-cfo", related: ["cost-of-sales"] }),
  t("income-statement", "Income statement (profit and loss)", "Income less expenses over a period, ending in profit or loss. It shows performance, not cash.", { service: "accounting-bookkeeping" }),
  t("ifrs-sme", "IFRS for SMEs", "The reporting framework most owner-managed South African companies use, a simplified version of full IFRS.", { service: "accounting-bookkeeping" }),
  t("journal", "Journal entry", "A manual adjustment to the ledger, used for depreciation, accruals and corrections. Every journal should have a reason recorded with it.", { service: "accounting-bookkeeping", related: ["general-ledger"] }),
  t("provision", "Provision", "An amount set aside for a liability that is likely but not yet certain in amount or timing, such as leave pay or a warranty claim.", { service: "accounting-bookkeeping" }),
  t("retained-earnings", "Retained earnings", "Accumulated profit kept in the business rather than paid out. It is not cash, which is the misunderstanding that causes the most trouble.", { service: "accounting-bookkeeping" }),
  t("suspense-account", "Suspense account", "A holding account for transactions that cannot yet be allocated. A growing suspense balance is a reliable sign that bookkeeping has gone wrong.", { service: "accounting-bookkeeping" }),

  // ── Valuation and transactions ──────────────────────────────────────
  t("earn-out", "Earn-out", "Part of a sale price paid later, dependent on the business hitting agreed results. It bridges a gap between what a seller wants and a buyer will risk.", { service: "business-valuations" }),
  t("free-cash-flow", "Free cash flow", "Cash generated by operations after the investment needed to keep the business running. It is what a buyer is really buying.", { service: "business-valuations", related: ["ebitda"] }),
  t("multiple", "Earnings multiple", "The factor applied to normalised earnings to arrive at a value. It reflects risk, growth and how dependent the business is on the owner.", { service: "business-valuations", related: ["normalised-earnings", "ebitda"] }),
  t("net-asset-value", "Net asset value", "Assets less liabilities. A sensible valuation floor for asset-heavy businesses and a poor one for service businesses.", { service: "business-valuations" }),
  t("share-vs-asset-sale", "Share sale vs asset sale", "In a share sale the buyer takes the company, history and liabilities included. In an asset sale they take chosen assets and leave the shell. The tax outcomes differ sharply for both sides.", { service: "business-valuations", related: ["due-diligence"] }),
  t("warranties", "Warranties and indemnities", "Promises a seller makes about the state of the business, and cover for specific known risks. Most post-sale disputes start here.", { service: "business-valuations" }),

  // ── Property ────────────────────────────────────────────────────────
  t("hoa", "Home owners association (HOA)", "The body governing a private estate, funded by levies and run by an elected committee, with rules binding on owners.", { service: "property-management", related: ["levy"] }),
  t("reserve-fund", "Reserve fund", "A fund a community scheme must maintain for future maintenance and repairs, separate from the administrative fund used for day-to-day costs.", { service: "property-management", related: ["body-corporate"] }),
  t("csos", "CSOS", "The Community Schemes Ombud Service, which oversees sectional title schemes and HOAs and resolves disputes between owners and trustees.", { service: "property-management", verify: true }),
  t("trustees", "Trustees", "Owners elected to run a body corporate between general meetings. They carry fiduciary duties similar to company directors.", { service: "property-management", related: ["body-corporate"] }),

  // ── Xero and systems ────────────────────────────────────────────────
  t("api", "API integration", "A connection that lets two systems exchange data automatically, such as a payroll system posting journals into Xero without anyone retyping them.", { service: "accounting-bookkeeping" }),
  t("cloud-accounting", "Cloud accounting", "Accounting software running on the provider's servers and reached through a browser, so the books are the same file for you and your accountant, with no server to maintain.", { service: "accounting-bookkeeping", related: ["bank-feed"] }),
  t("two-factor", "Two-step authentication", "A second proof of identity, usually a code on your phone, required in addition to a password. Xero and SARS eFiling both require it, and it stops the great majority of account takeovers.", { service: "accounting-bookkeeping" }),
];
