/**
 * Long-form introductions for each library document.
 *
 * The 2014 Dial an Accountant library had one-line descriptions, which gave
 * search engines nothing to index and AI engines nothing to quote. These are
 * written to stand as content in their own right: what the document covers, who
 * it is for, and the specific South African terms someone would search for.
 */
export const documentIntros: Record<string, string[]> = {
  "sars-cipc-deadline-calendar": [
    "Almost every penalty we untangle for a new client started the same way: not an unwillingness to pay, but a date nobody was watching. SARS penalties for outstanding returns recur every month, quietly, until somebody files. By the time the letter arrives the amount has compounded into something that hurts.",
    "This calendar sets out every submission a South African business repeats each year — the monthly EMP201 for PAYE, UIF and SDL, VAT201 returns on your allocated category, the interim and annual EMP501 reconciliations, both provisional tax payments and the voluntary third, the ITR14 company return, the CIPC annual return with its beneficial ownership filing, and the COIDA return of earnings.",
    "Rather than a list of dates that expire, it explains how each due date is calculated from your own financial year end, VAT category and payroll cycle, so the calendar still works next year. It closes with the order to fix things in if you are already behind, and a month-by-month planner for a February year end.",
  ],

  "xero-migration-checklist": [
    "Moving accounting systems is the kind of project that either takes three weeks or eats six months, and the difference is almost entirely in the preparation. This checklist is the one we work through with clients migrating to Xero from Pastel, Sage Business Cloud, QuickBooks or a spreadsheet.",
    "It starts with the question most vendors skip: whether you should move at all. Then it covers choosing a conversion date that does not split a VAT period, the documents to have ready (trial balance, debtors and creditors age analyses, stock valuation, fixed asset register, the last VAT reconciliation), and designing a chart of accounts around how your business actually earns rather than copying the old one across.",
    "There is a realistic timeline showing where the calendar time genuinely goes — bank feed approval, not data conversion — and the five mistakes we see most often, including the one that causes the most damage: converting without reconciling opening balances to your last signed financial statements.",
  ],

  "month-end-close-checklist": [
    "A month-end close done in the wrong order produces figures that move after you have looked at them, which is worse than having no figures at all. This checklist sets out the close in seven stages, in the sequence that actually holds together: cash first, then what you are owed, then what you owe, then payroll, VAT, adjustments and review.",
    "Each stage is a list you can work down: bank and card reconciliations to the cent, debtors and creditors agreed to their control accounts, supplier statements reconciled, payroll journals agreed to the EMP201, the VAT control account reconciled to the return, depreciation posted, stock movement processed and gross margin sanity-checked.",
    "It ends with the five questions worth asking before you call a month closed, and a seven-working-day timetable you can hand to whoever does your processing. It is written for a South African small business using cloud accounting, and it is the same routine we run for clients on a monthly service.",
  ],

  "payroll-compliance-pack": [
    "Payroll is where small employers get into trouble quickest, because every month has a deadline and every year has a reconciliation that must balance to the cent. This pack covers what a South African employer must register for, declare, reconcile and retain.",
    "It starts with registration — PAYE, UIF with both SARS and the Department of Employment and Labour, SDL where your payroll exceeds the threshold, and COIDA with the Compensation Fund — then walks through the monthly run: new starters and terminations, taxable fringe benefits, the Employment Tax Incentive, the EMP201 by the 7th, and the UI-19 declaration.",
    "There is a section on what the Basic Conditions of Employment Act requires on a payslip, an explanation of how the twice-yearly EMP501 reconciliation ties your declarations, your payments and your employees' IRP5 certificates together, the annual COIDA return of earnings and the letter of good standing that depends on it, and how long each payroll record must be kept.",
  ],

  "vat-registration-decision-guide": [
    "VAT registration is a decision with consequences that run for years, and most owners make it either too late, under pressure from SARS, or too early, because someone told them it looked more professional. This guide sets out how to decide properly.",
    "It explains the two routes into the VAT system — compulsory registration once taxable turnover crosses the threshold in any twelve consecutive months, and voluntary registration above a lower figure — and why the backward-looking twelve-month test catches businesses that only watch their financial year. It includes a short worksheet for establishing your own position.",
    "Then it gets honest about the trade. Input VAT on qualifying purchases is real money back, and VAT-registered customers are indifferent to the VAT you charge them. But if you sell to the public your prices effectively rise, you file returns forever, you need a valid tax invoice for every input claim, and deregistering later is neither quick nor free. It closes with what SARS asks for at registration and what becomes routine the day you are a vendor.",
  ],

  "record-keeping-guide": [
    "Most businesses keep either far too much or dangerously little, because the rules sit in three different pieces of legislation and nobody reads all three. This guide puts the retention periods in one table, with the law that drives each one.",
    "It covers records supporting a tax return under the Tax Administration Act, company records and financial statements under the Companies Act, employment contracts and attendance records under the Basic Conditions of Employment Act, and VAT records and tax invoices under the VAT Act — including the rule that matters most in practice: where an audit, objection or dispute is running, everything connected to it is kept until the matter ends, regardless of the table.",
    "There is a section on whether digital copies are acceptable and what makes them acceptable, a ten-folder filing structure you can set up this week, what to do the day a SARS letter arrives, and what you may safely destroy — including the reminder that POPIA governs how you dispose of documents containing personal information, not only how you store them.",
  ],

  "bbbee-requirements-guide": [
    "B-BBEE generates more confusion among small business owners than any other compliance subject, largely because most of what they are told comes from someone selling a certificate. There is no legal obligation on a private business to hold a B-BBEE status and no penalty for not having one — but your customers are scored on what they buy from you, so a good level makes you easier to buy from.",
    "This guide starts by establishing whether you need anything at all, then sets out which category you fall into by turnover: Exempted Micro Enterprise under R10 million, Qualifying Small Enterprise between R10 million and R50 million, and Generic above that. It explains the deemed levels that most owners do not know about — a 100% black-owned EME or QSE is deemed a Level 1 contributor, and 51% or more black-owned is deemed Level 2, on the strength of a sworn affidavit alone, with no verification agency involved.",
    "It covers the affidavit route done properly, including the dtic template, the Commissioner of Oaths, the twelve-month validity, and the serious consequences of overstating ownership, which is fronting and a criminal offence. For businesses that are actually measured, it explains the five scorecard elements. It also covers what is changing: the draft amendments gazetted on 29 January 2026 proposing a Transformation Fund route and a substantially increased Enterprise and Supplier Development weighting, which were still proposals, not law, as at September 2026.",
  ],
};
