import type { LibraryDoc } from "./documents-types";

const UPDATED = "September 2026";

export const documentsTwo: LibraryDoc[] = [
  {
    slug: "payroll-compliance-pack",
    metaDescription:
      "What South African employers must register, declare and reconcile: PAYE, UIF, SDL, EMP201, EMP501, IRP5s and the COIDA return. Free PDF.",
    title: "The Payroll Compliance Pack",
    subtitle: "Everything an employer must do, monthly and annually",
    category: "Payroll",
    forWho: "Any employer with even one person on the payroll, including domestic employers.",
    summary:
      "What South African employers must register for, declare and reconcile: PAYE, UIF, SDL, EMP201, EMP501, IRP5 certificates, UI-19 declarations and the COIDA return of earnings.",
    youGet: [
      "The full registration checklist for a new employer",
      "A monthly payroll run checklist",
      "The twice-yearly reconciliation process explained",
      "What must appear on a legally compliant payslip",
    ],
    updated: UPDATED,
    pages: 4,
    sections: [
      {
        heading: "Registering as an employer",
        blocks: [
          {
            kind: "text",
            text: "Before the first payslip is issued, the registrations must exist. Doing this late creates backdated liabilities and penalties that are entirely avoidable.",
          },
          {
            kind: "checklist",
            items: [
              "PAYE registration with SARS",
              "UIF registration with SARS, and with the Department of Employment and Labour",
              "SDL registration with SARS, where your annual payroll exceeds the threshold",
              "COIDA registration with the Compensation Fund",
              "A registered representative appointed and verified on eFiling",
              "Employment contracts issued to every employee, as the BCEA requires",
            ],
          },
          {
            kind: "note",
            text: "Employers must contribute to UIF for employees working more than 24 hours a month, which includes domestic workers.",
          },
        ],
      },
      {
        heading: "The monthly payroll run",
        blocks: [
          {
            kind: "checklist",
            items: [
              "Capture new starters with their tax numbers and banking details",
              "Process terminations, including leave paid out and final pay",
              "Capture changes: increases, commission, overtime, bonuses, unpaid leave",
              "Process taxable fringe benefits — company cars, accommodation, low-interest loans",
              "Check that the Employment Tax Incentive is claimed for every qualifying employee",
              "Run the payroll and review the variance against last month before paying anyone",
              "Issue payslips to every employee",
              "Pay net salaries",
              "Submit the EMP201 and pay PAYE, UIF and SDL by the 7th",
              "Post the payroll journal into the accounting system",
              "Submit the UI-19 declaration of employees",
            ],
          },
        ],
      },
      {
        heading: "What must be on a payslip",
        blocks: [
          {
            kind: "text",
            text: "The BCEA requires a written statement with each payment. A bank transfer alone is not compliance.",
          },
          {
            kind: "bullets",
            items: [
              "The employer's name and address",
              "The employee's name and occupation",
              "The period the payment covers",
              "Remuneration in money, and the rate and hours where relevant",
              "Overtime, Sunday and public holiday pay shown separately",
              "Every deduction, itemised — PAYE, UIF, and anything else",
              "The actual amount paid",
            ],
          },
        ],
      },
      {
        heading: "The twice-yearly reconciliation",
        blocks: [
          {
            kind: "text",
            text: "The EMP501 reconciles three things that must agree: what you declared on your EMP201s, what you actually paid to SARS, and the IRP5 and IT3(a) certificates issued to employees. Where they disagree, SARS assumes the certificates are right and the payments are short.",
          },
          {
            kind: "checklist",
            items: [
              "Interim reconciliation after the August payroll, in the window SARS announces",
              "Annual reconciliation after the February payroll",
              "Agree total PAYE, UIF and SDL per the payroll to the EMP201s submitted",
              "Agree the EMP201s to the payments made, month by month",
              "Check every employee has a valid tax number",
              "Verify addresses and banking details on the certificates",
              "Submit, then distribute IRP5 certificates to employees",
            ],
          },
          {
            kind: "note",
            text: "Employees cannot file their own tax returns until this data reaches SARS. A late reconciliation is not just your problem.",
          },
        ],
      },
      {
        heading: "Annual COIDA return of earnings",
        blocks: [
          {
            kind: "bullets",
            items: [
              "Declares actual earnings for the past year and estimated earnings for the coming year.",
              "An assessment follows, which must be paid to stay in good standing.",
              "A letter of good standing is required for many contracts and tenders — and cannot be issued if the return is outstanding.",
              "Directors and members who earn remuneration are generally included.",
            ],
          },
        ],
      },
      {
        heading: "Records to keep, and for how long",
        blocks: [
          {
            kind: "bullets",
            items: [
              "Payroll records, EMP201s, EMP501s and certificates: keep for at least five years from submission.",
              "Employment contracts and personnel files: keep for the duration of employment and at least three years after it ends.",
              "Attendance and overtime records: keep for at least three years.",
              "Digital copies are acceptable provided they are complete and readable.",
            ],
          },
        ],
      },
    ],
  },

  {
    slug: "vat-registration-decision-guide",
    metaDescription:
      "Should you register for VAT? Compulsory and voluntary thresholds, what you gain, what you take on, and what SARS asks for. Free PDF guide.",
    title: "Should You Register for VAT?",
    subtitle: "A decision guide for South African business owners",
    category: "Tax and SARS",
    forWho: "Owners approaching the compulsory threshold, or considering registering voluntarily.",
    summary:
      "When VAT registration becomes compulsory, when voluntary registration is worth it, what changes the day you register, and the obligations people underestimate.",
    youGet: [
      "The compulsory and voluntary registration tests explained",
      "An honest list of what you gain and what you take on",
      "What SARS asks for at registration",
      "The compliance routine that starts the day you register",
    ],
    updated: UPDATED,
    pages: 4,
    sections: [
      {
        heading: "The two ways you become a vendor",
        blocks: [
          {
            kind: "text",
            text: "Registration is either compulsory or voluntary. Compulsory registration is triggered by taxable turnover in any twelve-month period exceeding the threshold in the VAT Act. Voluntary registration is available above a lower turnover figure, and in limited cases below it.",
          },
          {
            kind: "note",
            text: "The rand thresholds are set by National Treasury and are adjusted from time to time. Confirm the current figures before acting — we check them against your actual turnover as part of a review.",
          },
          {
            kind: "bullets",
            items: [
              "The compulsory test looks backwards over any twelve consecutive months, not at your financial year.",
              "It also applies forwards where you have a contractual obligation that will take you over the threshold.",
              "Registering late does not avoid the liability. SARS can register you from the date you should have registered, and charge the VAT you failed to collect.",
            ],
          },
        ],
      },
      {
        heading: "Work out your own position",
        blocks: [
          {
            kind: "checklist",
            items: [
              "Taxable turnover for the last 12 months: R______________",
              "Highest rolling 12-month turnover in the last 2 years: R______________",
              "Do I have a signed contract that will push me over the threshold? Yes / No",
              "What proportion of my customers are themselves VAT vendors? ______%",
              "Do I buy significant goods or services that carry VAT? Yes / No",
            ],
          },
        ],
      },
      {
        heading: "What you gain by registering",
        blocks: [
          {
            kind: "bullets",
            items: [
              "You can claim input VAT on qualifying business purchases, which is real money if you buy stock, equipment or services.",
              "Business customers do not care about your VAT, because they claim it back. Charging VAT to VAT vendors costs you nothing competitively.",
              "Registration is often treated as a credibility signal by larger customers and tender processes.",
            ],
          },
        ],
      },
      {
        heading: "What you take on",
        blocks: [
          {
            kind: "bullets",
            items: [
              "Your prices effectively rise for customers who cannot claim VAT back — the public, and small non-registered businesses. This is the decision that matters most if you sell to consumers.",
              "Returns every tax period, on time, forever. Late returns mean penalties and interest.",
              "Valid tax invoices become mandatory for every input claim. No valid invoice, no claim, regardless of whether you paid.",
              "Your record keeping must be good enough to survive a VAT verification, which is more common than an income tax audit.",
              "Deregistering later is not simple, and may trigger an exit charge on assets on hand.",
            ],
          },
        ],
      },
      {
        heading: "What SARS asks for at registration",
        blocks: [
          {
            kind: "checklist",
            items: [
              "Proof of the business bank account, in the entity's name",
              "Proof of address for the business",
              "Identity documents for the representative taxpayer",
              "Proof that you meet the turnover test — invoices, contracts or bank statements",
              "Company registration documents, where applicable",
              "A registered representative already verified on eFiling",
            ],
          },
        ],
      },
      {
        heading: "The day you register, this becomes routine",
        blocks: [
          {
            kind: "bullets",
            items: [
              "Every invoice you issue must meet the tax invoice requirements: the words 'tax invoice', your VAT number, the customer's details above the prescribed value, a serial number, the date, a description, and the VAT shown separately.",
              "Input VAT is blocked on entertainment, most motor cars and club subscriptions, regardless of business purpose.",
              "The VAT control account must be reconciled every period. A drifting VAT account is how verifications turn into assessments.",
              "Your VAT category determines your filing months, and SARS allocates it.",
            ],
          },
        ],
      },
    ],
  },

  {
    slug: "record-keeping-guide",
    metaDescription:
      "How long South African businesses must keep records under the Tax Administration Act, Companies Act, VAT Act and BCEA. Free PDF guide.",
    title: "What to Keep, and For How Long",
    subtitle: "A record-keeping guide for South African businesses",
    category: "Running the books",
    forWho: "Owners who are not sure what they may throw away, and are afraid to throw anything away.",
    summary:
      "What tax, company and employment law require you to retain, how long each category must be kept, whether digital copies are acceptable, and a practical filing structure that makes an audit painless.",
    youGet: [
      "Retention periods by record type",
      "The rules on digital copies and cloud storage",
      "A folder structure you can set up this week",
      "What to hand over if SARS asks",
    ],
    updated: UPDATED,
    pages: 4,
    sections: [
      {
        heading: "The three sets of rules",
        blocks: [
          {
            kind: "text",
            text: "Retention is governed by more than one law at once, and the longest period wins. Tax legislation, the Companies Act and employment legislation each impose their own minimums.",
          },
          {
            kind: "table",
            head: ["Record", "Minimum retention", "Driven by"],
            rows: [
              ["Records supporting a tax return", "5 years from the date the return was submitted", "Tax Administration Act"],
              ["Records where a return was not submitted", "5 years from the end of the period, and indefinitely while an audit or objection runs", "Tax Administration Act"],
              ["Company records, registers and minutes", "7 years", "Companies Act"],
              ["Annual financial statements", "7 years", "Companies Act"],
              ["Payroll records and certificates", "5 years", "Tax Administration Act"],
              ["Employment contracts and personnel files", "3 years after employment ends", "BCEA"],
              ["Attendance and overtime records", "3 years", "BCEA"],
              ["VAT records and tax invoices", "5 years", "VAT Act"],
            ],
          },
          {
            kind: "note",
            text: "Where an audit, objection, appeal or dispute is running, keep everything connected to it until the matter is finally resolved, whatever the table says.",
          },
        ],
      },
      {
        heading: "Digital copies are acceptable, with conditions",
        blocks: [
          {
            kind: "bullets",
            items: [
              "Electronic records are acceptable provided they are complete, readable and can be produced when asked for.",
              "They must be kept in a form that allows SARS to access and inspect them, and they should remain available for the full retention period.",
              "Attaching the source document to the transaction in your accounting system satisfies this and makes retrieval trivial. This is one of the practical arguments for cloud accounting.",
              "A photograph of a faded till slip taken on the day beats a blank slip found in a drawer three years later.",
            ],
          },
        ],
      },
      {
        heading: "A filing structure that works",
        blocks: [
          {
            kind: "text",
            text: "Organise by year, then by category. Every business we take on that already does this has a shorter, cheaper year end.",
          },
          {
            kind: "bullets",
            items: [
              "01 Bank — statements per account, per month",
              "02 Sales — invoices issued, credit notes, customer contracts",
              "03 Purchases — supplier invoices, supplier statements",
              "04 Payroll — payslips, EMP201s, EMP501s, IRP5s, contracts",
              "05 VAT — returns, working papers, VAT control reconciliations",
              "06 Tax — returns, assessments, SARS correspondence",
              "07 Company — CIPC filings, registers, minutes, share certificates",
              "08 Assets — purchase invoices, finance agreements, asset register",
              "09 Insurance and contracts — policies, leases, service agreements",
              "10 Year end — trial balance, financial statements, journals",
            ],
          },
        ],
      },
      {
        heading: "If SARS asks",
        blocks: [
          {
            kind: "checklist",
            items: [
              "Read the letter and diarise the deadline immediately — the periods are short and strictly applied",
              "Send exactly what was asked for, no more",
              "Keep a record of what you sent and when",
              "Where a document genuinely does not exist, say so in writing rather than staying silent",
              "Tell your accountant the day it arrives, not the week before the deadline",
            ],
          },
        ],
      },
      {
        heading: "What you may safely destroy",
        blocks: [
          {
            kind: "bullets",
            items: [
              "Records past every applicable retention period, provided no dispute or audit touches them.",
              "Duplicates, once you are certain the original or a complete digital copy exists.",
              "Destroy paper containing personal information securely — POPIA applies to disposal too, not just storage.",
            ],
          },
        ],
      },
    ],
  },
];
