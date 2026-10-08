import { Breadcrumbs } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Book a Free Consultation, Amanzimtoti",
  description:
    "Choose a time for a free 20-minute phone consultation with South Coast Advisory: compliance, cash flow, reporting, and what to fix first.",
  path: "/book",
  cardTitle: "Book a free 20-minute consultation",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Book a consultation", path: "/book" },
];

export default function BookPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <section className="shell section">
        <Breadcrumbs trail={trail} />
        <h1>Book a free 20-minute consultation</h1>
        <p className="lede">
          Pick a time that suits you. Neil phones you then, looks at where the business stands on
          compliance, cash flow and reporting, and tells you what to fix first.
        </p>
        <div style={{ marginTop: "var(--space-8)" }}>
          <BookingWizard />
        </div>
      </section>
    </>
  );
}
