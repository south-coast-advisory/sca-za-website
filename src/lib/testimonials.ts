import { getServiceClient } from "@/lib/supabase";

export type Testimonial = {
  id: string;
  name: string;
  business: string | null;
  role: string | null;
  town: string | null;
  service: string | null;
  years_client: string | null;
  quote: string;
  featured: boolean;
};

/**
 * Approved testimonials only. Nothing a client submits appears on the website
 * until someone at SCA sets status = 'approved' in Supabase — see
 * supabase/schema.sql for why that matters.
 *
 * Returns an empty array when Supabase is not configured or the query fails,
 * so the site renders correctly with no proof rather than breaking. It never
 * invents one.
 */
export async function getApprovedTestimonials(limit = 6): Promise<Testimonial[]> {
  const supabase = getServiceClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("testimonials")
    .select("id,name,business,role,town,service,years_client,quote,featured")
    .eq("status", "approved")
    .order("featured", { ascending: false })
    .order("display_order", { ascending: true, nullsFirst: false })
    .order("approved_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("testimonials query failed", error.message);
    return [];
  }
  return (data ?? []) as Testimonial[];
}
