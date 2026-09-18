import type { LibraryDoc } from "./documents-types";

const UPDATED = "September 2026";

/**
 * B-BBEE guide.
 *
 * ACCURACY NOTE — this is the most volatile subject in the library:
 *  - Deemed levels and the EME/QSE thresholds below are the long-standing
 *    position under the Amended Codes of Good Practice.
 *  - On 29 January 2026 the dtic gazetted DRAFT amendments (Gazette 54032),
 *    open for comment to 30 March 2026, proposing a Transformation Fund route
 *    and a substantially increased ESD weighting. As at September 2026 those
 *    are proposals, not law, and the document says so.
 *  - Sector codes (construction, tourism, ICT, agriculture, property and
 *    others) set their own thresholds and scorecards.
 * Re-check before each republication, and after the amendments are finalised.
 */
export const documentsThree: LibraryDoc[] = [
  {
    slug: "bbbee-requirements-guide",
    metaDescription:
      "B-BBEE explained for small business: EME and QSE thresholds, deemed levels, sworn affidavits, the scorecard, and the 2026 draft changes.",
    title: "B-BBEE: What Your Business Actually Has to Do",
    subtitle: "Thresholds, affidavits, scorecards and what is changing",
    category: "Starting out",
    forWho:
      "Owner-managed businesses that keep being asked for a B-BBEE certificate and are not sure what they need, or whether they need anything at all.",
    summary:
      "Which B-BBEE category your business falls into by turnover, what evidence each one needs, how the deemed levels work for black-owned businesses, what the five scorecard elements measure, and what the 2026 draft amendments propose to change.",
    youGet: [
      "A decision table: EME, QSE or Generic, and what each must produce",
      "How deemed levels work, and who never needs a verification agency",
      "The affidavit route explained, including where businesses get it wrong",
      "The five scorecard elements, and what the 2026 draft amendments propose",
    ],
    updated: UPDATED,
    pages: 6,
    sections: [
      {
        heading: "Start here: do you need anything at all?",
        blocks: [
          {
            kind: "text",
            text: "B-BBEE is not a tax. There is no obligation on a private business to have a B-BBEE status, and no penalty for not having one. What there is, is commercial pressure: your customers are scored on what they buy from you, so a good level makes you easier to buy from. If you sell only to consumers, it may genuinely not matter. If you sell to corporates, government or anyone who tenders, it decides whether you are on the list.",
          },
          {
            kind: "checklist",
            items: [
              "Has a customer ever asked for a B-BBEE certificate or affidavit?",
              "Do you tender, or want to?",
              "Do you supply a company large enough to be scored itself?",
              "Are you trying to win work from a corporate supply chain?",
            ],
          },
          {
            kind: "text",
            text: "One yes and this is worth half an hour. No yeses and you can file this until something changes.",
          },
        ],
      },
      {
        heading: "Which category are you?",
        blocks: [
          {
            kind: "text",
            text: "Category is set by annual turnover under the generic Codes of Good Practice. Get this right first, because everything else follows from it.",
          },
          {
            kind: "table",
            head: ["Category", "Annual turnover", "What you must produce"],
            rows: [
              [
                "EME (Exempted Micro Enterprise)",
                "Under R10 million",
                "A sworn affidavit on the dtic template, signed before a Commissioner of Oaths. No verification agency, no scorecard.",
              ],
              [
                "QSE (Qualifying Small Enterprise)",
                "R10 million to R50 million",
                "If 51% or more black-owned: a sworn affidavit. Otherwise: verification against the QSE scorecard by an accredited agency.",
              ],
              [
                "Generic",
                "Over R50 million",
                "Verification against the full generic scorecard by an accredited agency. No affidavit route.",
              ],
            ],
          },
          {
            kind: "note",
            text: "Sector codes override these. Construction, tourism, ICT, agriculture, property and others set their own turnover thresholds and their own scorecards. If your industry has a sector code, use its thresholds, not these.",
          },
        ],
      },
      {
        heading: "Deemed levels: the part most owners do not know",
        blocks: [
          {
            kind: "text",
            text: "Small businesses do not have to earn points to have a level. Black-owned EMEs and QSEs are deemed to hold a level automatically, on the strength of an affidavit alone.",
          },
          {
            kind: "table",
            head: ["Your business", "Deemed level", "Evidence needed"],
            rows: [
              ["EME, 100% black-owned", "Level 1", "Sworn affidavit"],
              ["EME, 51% or more black-owned", "Level 2", "Sworn affidavit"],
              ["EME, less than 51% black-owned", "Level 4", "Sworn affidavit"],
              ["QSE, 100% black-owned", "Level 1", "Sworn affidavit"],
              ["QSE, 51% or more black-owned", "Level 2", "Sworn affidavit"],
              ["QSE, less than 51% black-owned", "Scored, not deemed", "QSE scorecard verification"],
            ],
          },
          {
            kind: "text",
            text: "This is why an EME should never be paying a verification agency. If someone is selling your under-R10-million business a B-BBEE certificate, ask them why an affidavit will not do.",
          },
        ],
      },
      {
        heading: "The affidavit route, done properly",
        blocks: [
          {
            kind: "checklist",
            items: [
              "Use the current dtic gazetted template for your category — EME or QSE, and the sector version if your industry has one",
              "State the correct annual turnover figure for the most recent financial year",
              "State the black ownership percentage accurately",
              "Sign in front of a Commissioner of Oaths — a police station or a bank will do this free",
              "Diarise the expiry: an affidavit is valid for 12 months from signature",
              "Give customers a copy proactively; it removes a reason not to buy from you",
            ],
          },
          {
            kind: "note",
            text: "A sworn affidavit is a legal statement under oath. Overstating black ownership or understating turnover to gain a better level is fronting, which is a criminal offence under the B-BBEE Act with serious penalties, including a ban on doing business with the state. This is not an area to be optimistic in.",
          },
        ],
      },
      {
        heading: "If you are measured: the five elements",
        blocks: [
          {
            kind: "text",
            text: "Generic entities, and QSEs that are not majority black-owned, are scored against a scorecard. The generic scorecard has five elements. Three of them carry a sub-minimum, and missing a sub-minimum discounts your level regardless of your total score.",
          },
          {
            kind: "table",
            head: ["Element", "What it measures", "Generic points"],
            rows: [
              ["Ownership", "Black ownership of the business, including net value", "25"],
              ["Management control", "Black representation among directors and managers", "19"],
              ["Skills development", "Spend on training black employees, and learnerships", "20"],
              ["Enterprise and supplier development", "Buying from black-owned suppliers, and developing small black-owned businesses", "40"],
              ["Socio-economic development", "Contributions benefiting black communities", "5"],
            ],
          },
          {
            kind: "note",
            text: "Point allocations and sub-minimums differ between the generic scorecard, the QSE scorecard and each sector code. Confirm the current allocation for your industry before planning around a number.",
          },
        ],
      },
      {
        heading: "What is changing, as at September 2026",
        blocks: [
          {
            kind: "text",
            text: "On 29 January 2026 the Department of Trade, Industry and Competition gazetted draft amendments to the Codes of Good Practice for public comment, which closed on 30 March 2026.",
          },
          {
            kind: "bullets",
            items: [
              "The headline proposal is a Transformation Fund route within Enterprise and Supplier Development, allowing contributions to the fund to count towards points.",
              "The ESD element's weighting is proposed to increase substantially, which would make supplier development the biggest single driver of a score.",
              "The proposals are draft. Until they are finalised and gazetted as amendments in force, the existing Codes apply.",
              "Separately, the Public Procurement Act 28 of 2024 and its regulations change how B-BBEE is applied in state procurement. If you tender, follow this closely.",
            ],
          },
          {
            kind: "note",
            text: "Because this area is actively changing, treat this section as a snapshot dated September 2026. Confirm the current position before making a decision that depends on it — we track it for clients.",
          },
        ],
      },
      {
        heading: "Practical ways a small business improves its level",
        blocks: [
          {
            kind: "bullets",
            items: [
              "Buy from black-owned suppliers where the price and quality are comparable. Procurement is the cheapest score improvement available to most businesses, because you are already spending the money.",
              "Ask every supplier for their affidavit or certificate and keep them on file. You cannot claim what you cannot evidence.",
              "Put training spend through a formal, recorded programme rather than ad hoc courses.",
              "Consider a learnership: it scores on skills development and often carries a tax deduction as well.",
              "Where ownership change is genuinely intended, structure it properly with advice. Arrangements that look like ownership but carry no real economic benefit are fronting.",
            ],
          },
        ],
      },
      {
        heading: "Keeping it current",
        blocks: [
          {
            kind: "checklist",
            items: [
              "Diarise the affidavit expiry 12 months from signature",
              "Re-check your category each year end — crossing R10 million or R50 million changes everything",
              "Check whether a sector code now applies to your industry",
              "Keep supplier affidavits and certificates on file as they are issued",
              "Watch for the finalisation of the 2026 amendments",
            ],
          },
        ],
      },
    ],
  },
];
