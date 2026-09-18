import Image from "next/image";
import Link from "next/link";
import { nav, site, telHref } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link href="/" aria-label={`${site.name} home`} className="site-header__logo">
          <Image
            src="/brand/logo.png"
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

        <div className="header-actions">
          <a href={telHref} className="label header-phone" style={{ textDecoration: "none", whiteSpace: "nowrap" }}>
            {site.phoneDisplay}
          </a>
          <Link href={site.cta.href} className="btn btn-primary">
            Book a call
          </Link>
        </div>
      </div>
    </header>
  );
}
