"use client";

import { useEffect } from "react";

/**
 * Starts the gated PDF without leaving the thank-you page. A second visit in
 * the same tab does not download it again; the link stays for a manual retry.
 */
export function StartDownload({ href, title }: { href: string | null; title: string }) {
  useEffect(() => {
    if (!href) return;
    const key = `sca-download:${href}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    window.location.href = href;
  }, [href]);

  if (!href) {
    return (
      <p>
        This download link has expired. Request <em>{title}</em> again and it will start straight
        away.
      </p>
    );
  }

  return (
    <p>
      If nothing happens,{" "}
      <a href={href} download>
        click here to download {title}
      </a>
      . The link works for ten minutes.
    </p>
  );
}
