import type { Metadata } from "next";
import { CancelBooking } from "@/components/booking/CancelBooking";

export const metadata: Metadata = {
  title: "Change your consultation",
  robots: { index: false, follow: false },
};

export default async function CancelPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = "" } = await searchParams;
  return (
    <section className="shell-narrow section">
      <h1>Change your consultation</h1>
      <CancelBooking token={token} />
    </section>
  );
}
