/**
 * AI tutorials for South African business owners.
 *
 * Positioning matters here: SCA is an accounting practice, not an AI company.
 * These exist because clients are already pasting their figures into chatbots
 * and nobody has told them what is safe. That is an accountant's problem.
 *
 * Every tutorial is practical, South African, and honest about limits.
 */

export type TutorialStep = {
  title: string;
  detail: string;
  /** An example prompt the reader can copy. Optional. */
  prompt?: string;
};

export type Tutorial = {
  slug: string;
  title: string;
  subtitle: string;
  /** Shown on the page and on cards. May run long. */
  summary: string;
  /** Search-result description, kept under 160 characters. */
  metaDescription: string;
  /** The 40-60 word passage AI engines can quote. */
  answer: string;
  level: "Start here" | "Practical" | "For your accountant";
  minutes: number;
  forWho: string;
  steps: TutorialStep[];
  cautions?: string[];
  related?: string[];
};

export const tutorials: Tutorial[] = [
  {
    slug: "where-ai-helps-a-small-business",
    metaDescription:
      "Where AI genuinely helps a South African small business, and the three places it costs you money: arithmetic, tax figures and unchecked output.",
    title: "Where AI actually helps a small business",
    subtitle: "And the three places it will cost you money",
    summary:
      "An honest look at what AI tools do well for a South African small business — drafting, summarising, explaining, comparing — and where they are unreliable: arithmetic, current tax rates, and anything where being confidently wrong is expensive.",
    answer:
      "AI tools are good at drafting, summarising, explaining and comparing. They are unreliable at arithmetic, at anything requiring current South African tax rates, and at knowing what they do not know. Use them where a wrong answer is obvious and cheap to fix, not where it is invisible and expensive.",
    level: "Start here",
    minutes: 8,
    forWho: "Owners who keep hearing they should 'use AI' and want to know where to actually start.",
    steps: [
      {
        title: "Start with the writing you already avoid",
        detail:
          "Quotes, follow-up emails, job adverts, standard operating procedures, a policy for the staff handbook. These are jobs where a decent first draft in thirty seconds beats a perfect document you never write. You are the expert; the AI is the typist who never gets tired.",
        prompt:
          "Draft a short, polite follow-up email to a customer whose invoice is 30 days overdue. We have a good relationship and I want to keep it. Keep it under 120 words, South African English, no American phrases.",
      },
      {
        title: "Use it to explain things to you, not to decide things for you",
        detail:
          "Asking what a clause in a lease means, or what a term on your financial statements refers to, is a good use. Asking whether to sign the lease is not. The first is explanation, which it does well; the second is judgement about your circumstances, which it cannot have.",
        prompt:
          "Explain what this clause in a commercial lease means in plain English, and list the questions I should ask my attorney about it: [paste the clause].",
      },
      {
        title: "Turn long documents into something you will actually read",
        detail:
          "A 40-page supplier contract, a municipal notice, a long policy document. Ask for a summary and the three things that could hurt you. Then read those parts properly yourself.",
        prompt:
          "Summarise this document in 10 bullet points, then list anything that creates an obligation, a cost, or a deadline for me: [paste the document].",
      },
      {
        title: "Use it as a sounding board before a decision, not instead of one",
        detail:
          "Ask it to argue against your plan. 'Here is what I am thinking of doing. Give me the five strongest reasons this fails.' It is genuinely useful for finding the hole you have talked yourself past.",
        prompt:
          "I run a [type of business] in Amanzimtoti and I am thinking of [plan]. Give me the five strongest arguments against it, and what I would need to be true for it to work.",
      },
      {
        title: "Know the three places it costs you money",
        detail:
          "One: arithmetic and anything involving your actual figures — it will produce a number that looks right and is not. Two: current South African tax rates, thresholds and deadlines — these change with the Budget and the model may be working from old information. Three: anything you send to a client or SARS without reading it properly, because the mistakes are fluent and confident, which is exactly what makes them easy to miss.",
      },
    ],
    cautions: [
      "An AI answer about SARS rules may be a year out of date and will never say so. Confirm anything with a deadline or a rand figure attached.",
      "It cannot see your books. If it quotes a figure about your business, it made it up.",
    ],
    related: ["what-never-to-paste-into-ai", "ai-prompts-for-business-owners"],
  },

  {
    slug: "what-never-to-paste-into-ai",
    metaDescription:
      "What you must never paste into an AI chatbot, why POPIA still applies when you do, and how to get the same help without exposing client data.",
    title: "What you must never paste into an AI chatbot",
    subtitle: "Your obligations under POPIA do not pause because it is convenient",
    summary:
      "Practical rules for South African businesses using AI tools: what is safe to paste, what is not, why POPIA applies to information you hand to a chatbot, and how to get the same benefit without the risk.",
    answer:
      "Never paste identity numbers, tax numbers, banking details, employee records, customer lists or client financial data into a public AI chatbot. Under POPIA you remain responsible for personal information you hand to a third party. Remove identifying details first, or use a business tier with a no-training agreement.",
    level: "Start here",
    minutes: 7,
    forWho: "Anyone in your business who uses ChatGPT, Copilot, Gemini or similar at work.",
    steps: [
      {
        title: "Understand what you are agreeing to",
        detail:
          "On free consumer tiers, what you type may be used to improve the service, and staff at the provider may review it. That is a reasonable trade for asking how to word an email. It is not a reasonable trade for your payroll file. Business and enterprise tiers usually contract not to train on your data — read the terms rather than assuming.",
      },
      {
        title: "The never list",
        detail:
          "Identity numbers. Tax numbers. Banking details and card numbers. Employee records, salaries and disciplinary matters. Customer or patient lists. Anything covered by a confidentiality agreement. Your full financial statements before they are public. Passwords, obviously — but people still do it.",
      },
      {
        title: "Why POPIA makes this your problem",
        detail:
          "Under POPIA you are the responsible party for personal information you hold. Handing it to a third party does not transfer that responsibility, and a provider processing data overseas raises a section 72 transfer question. If a client's identity number ends up in a chatbot, that is your compliance problem, not the chatbot's.",
      },
      {
        title: "Strip it down instead",
        detail:
          "You almost never need the real details to get the answer. Replace names with 'the customer', identity numbers with 'ID', and real amounts with round numbers in the same proportion. You will get the same quality of help with none of the exposure.",
        prompt:
          "A customer owes us R[round number] since [month]. They have paid late twice before but always paid. Draft a firm but relationship-preserving letter of demand, South African context.",
      },
      {
        title: "Write it down for your staff",
        detail:
          "One page: which tools are approved, what may never be pasted, and who to ask when unsure. Most breaches are not malice, they are a junior trying to be efficient at 4pm. We can help you draft it as part of your HR policy pack.",
      },
    ],
    cautions: [
      "'Incognito' or 'temporary chat' modes limit history, not your POPIA obligations.",
      "A free tier that trains on your input is a poor place for anything you would not email to a stranger.",
    ],
    related: ["where-ai-helps-a-small-business", "ai-and-your-bookkeeping"],
  },

  {
    slug: "ai-prompts-for-business-owners",
    metaDescription:
      "AI prompts that work for South African business owners: chasing debtors, job adverts, SOPs, bank meetings and interrogating your own numbers.",
    title: "Prompts that actually work for a business owner",
    subtitle: "Copy these, change the details, get something useful",
    summary:
      "A working set of AI prompts for South African business owners: chasing debtors, writing job adverts and contracts of employment briefs, drafting SOPs, preparing for a bank meeting, and interrogating your own numbers safely.",
    answer:
      "A good business prompt states who you are, what you want, the constraints, and the format. Vague prompts produce generic American business writing; specific prompts produce something you can send. Always say 'South African English' and give the context of your industry and town.",
    level: "Practical",
    minutes: 10,
    forWho: "Owners and managers who have tried AI, got bland results, and given up.",
    steps: [
      {
        title: "The shape of a prompt that works",
        detail:
          "Four parts: who you are, what you want, the constraints, and the format. Most bad output is a missing constraint. 'Write a job advert' gets you American corporate filler. The version below gets you something you can post.",
        prompt:
          "You are writing for a [8-person panel beating shop] in [Amanzimtoti, KZN]. Write a job advert for a [qualified spray painter]. Requirements: [3 years experience, own transport, red seal preferred]. Tone: direct, no corporate jargon. South African English. Under 200 words. End with how to apply: WhatsApp [number].",
      },
      {
        title: "Chasing money without damaging the relationship",
        detail:
          "Ask for three escalating versions at once, so you have the next letter ready before you need it.",
        prompt:
          "Write three follow-up messages for an overdue invoice, escalating in firmness: a friendly reminder at 7 days, a firmer one at 30 days, and a final notice at 60 days before handover. South African English, professional, no threats we cannot carry out.",
      },
      {
        title: "Turning how you do things into a written procedure",
        detail:
          "Describe the task out loud, badly, in one paragraph. Ask for a numbered SOP. This is how a business stops depending on one person's memory.",
        prompt:
          "I am going to describe how we do something in a messy way. Turn it into a clear numbered standard operating procedure a new employee could follow, and list anything I left out that they would need to know: [describe the task].",
      },
      {
        title: "Preparing for a bank or funder meeting",
        detail:
          "Do not paste your statements. Describe the shape of the business in round numbers and ask what you will be asked.",
        prompt:
          "I run a [industry] business in South Africa, roughly [round turnover], [number] staff, trading [x] years. I am applying for [funding purpose]. What will the bank ask me, what documents will they want, and which three questions am I most likely to answer badly?",
      },
      {
        title: "Interrogating your own numbers, safely",
        detail:
          "Use it to work out what to ask, not to do the arithmetic. Bring the questions to your accountant, where they will be answered against your real figures.",
        prompt:
          "My gross margin dropped from around 40% to 32% over six months in a [industry] business. List the most likely causes in order of probability, and exactly what I should ask my accountant to check for each.",
      },
      {
        title: "Make it sound like you, not like a chatbot",
        detail:
          "Paste two things you have actually written and ask it to match your voice. Then ban the words you hate — most people start with 'delve', 'leverage', 'robust' and 'seamless'.",
        prompt:
          "Here are two emails I wrote. Match this voice for the next task. Do not use the words: delve, leverage, robust, seamless, elevate. [paste your emails]",
      },
    ],
    related: ["where-ai-helps-a-small-business", "what-never-to-paste-into-ai"],
  },

  {
    slug: "ai-and-your-bookkeeping",
    metaDescription:
      "What AI does reliably inside accounting software, what it cannot decide, and why a person still signs everything filed with SARS.",
    title: "AI and your bookkeeping: what it can and cannot do",
    subtitle: "Where automation genuinely saves hours, and where it invents numbers",
    summary:
      "What AI and automation actually do inside modern accounting software: bank feed matching, document capture, anomaly spotting and forecasting — and why the final answer still has to come from a person who is accountable for it.",
    answer:
      "In accounting software, AI reliably handles pattern work: matching bank transactions, reading invoices into the books, flagging duplicates and unusual amounts. It cannot decide how a transaction should be treated for tax, and a general chatbot cannot do your arithmetic reliably. Automation drafts; a person is accountable.",
    level: "For your accountant",
    minutes: 8,
    forWho: "Owners wondering whether AI replaces the bookkeeper, or makes them better.",
    steps: [
      {
        title: "What is already running in your books",
        detail:
          "If you are on cloud accounting, you are already using this. Bank feeds suggest matches from past behaviour. Document capture reads a supplier invoice and creates the bill with the PDF attached. Duplicate and anomaly detection flags the invoice captured twice. None of it is magic; all of it saves hours.",
      },
      {
        title: "What it does badly, and always will",
        detail:
          "Deciding whether something is capital or revenue. Whether an expense is deductible. Whether input VAT may be claimed. Whether that payment to a director is salary, a loan or a dividend. These are judgement calls with tax consequences, and the wrong answer only surfaces when SARS asks — by which time it is expensive.",
      },
      {
        title: "Never ask a chatbot to do arithmetic on your figures",
        detail:
          "Language models predict text, not sums. They produce numbers that look plausible and are wrong in ways you will not spot. Use the accounting system for calculation and the AI for explanation. If you want a chatbot's help with a spreadsheet, ask it for the formula, then let the spreadsheet compute.",
        prompt:
          "Give me the Excel formula to calculate a 13-week rolling cash flow from a column of weekly receipts and payments, and explain what each part does. Do not calculate any figures.",
      },
      {
        title: "Where it makes an accountant better",
        detail:
          "The hours saved on capture and matching go somewhere. In a well-run practice they go into the work that was always worth more: reviewing, explaining, forecasting and phoning you before a problem lands, instead of after.",
      },
      {
        title: "The rule that keeps you safe",
        detail:
          "Automation may draft; a person signs. Every return submitted to SARS is signed by someone who is accountable for it. That does not change because software is involved, and no AI tool takes on that liability.",
      },
    ],
    cautions: [
      "Software that promises to file your returns with no human review is selling you risk, not convenience.",
      "Ask any provider where your financial data is processed and stored, and whether it is used for training.",
    ],
    related: ["where-ai-helps-a-small-business", "what-never-to-paste-into-ai"],
  },

  {
    slug: "ai-for-the-annual-workload",
    metaDescription:
      "Using AI for year-end admin, SARS letters and drafting policies safely: redact first, and never rely on it for the answers.",
    title: "Using AI to survive your annual admin",
    subtitle: "Year end, audits, policies and the paperwork nobody wants to do",
    summary:
      "How to use AI to prepare for year end, respond to SARS correspondence, draft internal policies and get your paperwork in order — without handing over anything confidential or relying on it for the answers.",
    answer:
      "AI is most useful on the admin around compliance rather than compliance itself: building document checklists, drafting policies, turning your accountant's requests into a plan, and rehearsing what you will be asked. The submissions themselves belong with a registered practitioner.",
    level: "Practical",
    minutes: 7,
    forWho: "Owners facing year end, a verification, or a pile of policies they have been avoiding.",
    steps: [
      {
        title: "Turn the request list into a plan",
        detail:
          "Your accountant sends a list of what they need. Paste the list (not the documents) and ask for it to be turned into a sequenced plan with who does what and how long each takes.",
        prompt:
          "Turn this list of documents my accountant needs for year end into a practical checklist, grouped by where I would find each one (bank, filing cabinet, accounting system, staff), with the quickest ones first: [paste list].",
      },
      {
        title: "Draft the policies you keep postponing",
        detail:
          "Leave policy, disciplinary code, IT and AI use policy, petty cash rules. Ask for a draft against South African law, then have it checked. A checked draft is far cheaper than a document written from scratch.",
        prompt:
          "Draft a one-page acceptable use policy for AI tools for a small South African business, covering approved tools, what may never be entered, and who to ask. Plain English, suitable for staff who are not technical.",
      },
      {
        title: "Understand a SARS letter before you panic",
        detail:
          "Remove the reference numbers and personal details, then ask what it means and what the deadline implies. Then phone your accountant, knowing what you are talking about.",
        prompt:
          "Explain in plain English what this type of SARS letter means, what the deadline usually is, and what is normally required in response. I have removed the personal details: [paste the redacted body].",
      },
      {
        title: "Rehearse the conversation",
        detail:
          "Before a bank meeting, a verification or a difficult staff discussion, ask the AI to play the other side and push back hard. It is a surprisingly effective way to find out which answers you have not thought through.",
        prompt:
          "Play the role of a sceptical bank manager. I am asking for [purpose]. Interview me, one question at a time, and do not accept a vague answer.",
      },
    ],
    cautions: [
      "Redact before you paste: reference numbers, tax numbers and names come out first.",
      "A drafted policy is a draft. Employment documents that have never been checked are the ones that fail at the CCMA.",
    ],
    related: ["what-never-to-paste-into-ai", "ai-prompts-for-business-owners"],
  },
];

export const tutorialBySlug = (slug: string) => tutorials.find((t) => t.slug === slug);
