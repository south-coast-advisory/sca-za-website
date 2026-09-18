# Asking clients for a testimonial

Send this from Neil's own mailbox, individually, not as a bulk mailshot. A
personal note from the person who did the work gets a reply; a mass email does
not. Twenty sent one at a time will beat two hundred sent at once.

Link to send: **https://www.sca-za.com/share-your-experience**

---

## The email

**Subject:** A small favour, [First name]?

Dear [First name],

We have been looking after [business name] for [x] years now, and in all that
time I have never once asked you what you actually think of the service.

We are rebuilding our website, and the part I cannot write myself is the part
that matters most to someone deciding whether to trust us with their books: what
it is actually like to be our client.

If you have five minutes, would you write a few honest sentences here?

https://www.sca-za.com/share-your-experience

A few things worth saying, so there is no awkwardness:

- Honest is more useful than flattering. If something took longer than it should
  have, say so — I would rather know.
- Nothing goes on the website until I have sent you the exact wording and you
  have said yes.
- You can ask me to take it down at any time, and I will, without asking why.

If you would rather tell me over the phone, call me on 031 903 4787 and I will
write it up and send it to you to approve.

Thank you either way — for the review, and for the years.

Kind regards,
Neil Oberholzer
South Coast Advisory (Pty) Ltd
031 903 4787

---

## Who to ask first

Ask in this order. The first group replies quickly and gives you the strongest
material.

1. Clients you have rescued from something — a SARS mess, a deregistration, a
   payroll that had not reconciled in years.
2. Clients you moved onto Xero, who can speak to the before and after.
3. Long-standing clients of ten years or more. Longevity is its own proof.
4. Clients in a recognisable local industry — a trade, a restaurant, a body
   corporate — so readers can see someone like themselves.

Aim for six good ones. That is plenty.

## Also ask for a Google review

A testimonial on our own website builds confidence once someone is already
reading it. A Google review helps them find us in the first place, and it counts
towards local search rankings in a way our own website cannot.

When someone sends a testimonial, reply with thanks and the direct Google review
link for the practice. Some will do both.

## Approving what comes in

Submissions land in the `testimonials` table in Supabase with
`status = 'pending'`. Nothing appears on the website until someone changes it.

1. Open the row in the Supabase table editor.
2. Phone or email the client to confirm they sent it and are happy with the
   wording.
3. Record who confirmed it in `verified_by`.
4. Set `status` to `approved` and `approved_at` to now.
5. Optionally set `featured` to true and a `display_order` for the ones you want
   first.

The website picks up approved testimonials within the hour.

**Do not** invent, edit for flattery, or publish anything the client has not seen
in its final wording. Beyond the obvious ethics, a testimonial a client did not
approve is a POPIA problem as well as a trust problem.
