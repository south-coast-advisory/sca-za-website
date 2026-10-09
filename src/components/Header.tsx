import Image from "next/image";
import Link from "next/link";
import { nav, site, telHref } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link href="/" aria-label={`${site.name} home`} className="site-header__logo">
          <Image
            src="/brand/logo-original.png"
            alt={`${site.legalName} logo`}
            width={373}
            height={108}
            priority
          />
        </Link>

        {/* One nav for both layouts: a disclosure on phones, a plain list above 880px. */}
        <details className="nav-disclosure">
          <summary aria-label="Main menu">Menu</summary>
          <nav aria-label="Main">
            <ul className="nav-list">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>

        <a href={telHref} className="header-phone">
          <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
          </svg>
          {site.phoneDisplay}
        </a>

        <div className="header-actions">
          <Link href={site.cta.href} className="btn btn-primary">
            Book a call
          </Link>
        </div>
      </div>
    </header>
  );
}
