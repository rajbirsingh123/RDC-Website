"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useHeaderShrink } from "@/hooks/useHeaderShrink";
import { ABOUT_LINKS, CALCULATOR_LINKS } from "@/data/nav";
import { MORTGAGE_NAV_ITEMS, mortgageHref } from "@/data/mortgages";
import { isActivePath } from "@/lib/nav/isActivePath";
import { LANGS, VISIBLE_LANGS, useLanguage } from "@/lib/i18n/LanguageContext";
import { T } from "@/lib/i18n/T";

function NavLink({ href, active, className, children }: { href: string; active: boolean; className: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={active ? `${className} active` : className} aria-current={active ? "page" : undefined}>
      {children}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname() || "/";
  const [hash, setHash] = useState("");
  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);
  const { lang, setLang } = useLanguage();
  const active = (href: string) => isActivePath(pathname, hash, href);
  const mortgageServicesActive = MORTGAGE_NAV_ITEMS.some((item) => active(mortgageHref(item.slug)));
  const calculatorsActive = CALCULATOR_LINKS.some((item) => active(item.href));
  const aboutActive = active("/about-us/") || ABOUT_LINKS.some((item) => active(item.href));
  const headerRef = useRef<HTMLElement>(null);
  useHeaderShrink(headerRef);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="top-strip">
        <div className="container-xl d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between gap-2">
          <div className="d-flex align-items-center gap-2">
            <a
              href="https://www.mortgagealliance.com/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="alliance-badge"
              aria-label="Mortgage Alliance member (opens mortgagealliance.com)"
            >
              <img src="/assets/mortgage-alliance-logo.svg" alt="Mortgage Alliance" />
            </a>
            <span>
              <T k="common_topstrip_license">Lic No: M25002134, Mortgage Alliance ON Lic No. 10530</T>
            </span>
          </div>
          <div className="d-flex flex-wrap align-items-center justify-content-center gap-3">
            <a href="tel:19056091818">
              <i className="bi bi-telephone-fill" /> 905-609-1818
            </a>
            <a href="mailto:info@royaldencapital.ca">
              <i className="bi bi-envelope-fill" /> info@royaldencapital.ca
            </a>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container-xl">
          <Link className="navbar-brand d-flex align-items-center gap-2" href="/" aria-label="Royal Den Capital home">
            <img src="/assets/rdc-logo.png" alt="Royal Den Capital logo" width={68} height={72} />
            <span>Royal Den Capital</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              <li className="nav-item">
                <NavLink href="/" active={active("/")} className="nav-link">
                  <T k="common_nav_home">Home</T>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink href="/full-service-mortgage-solution/" active={active("/full-service-mortgage-solution/")} className="nav-link">
                  <T k="common_nav_mortgages">Mortgage Solution</T>
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className={mortgageServicesActive ? "nav-link dropdown-toggle active" : "nav-link dropdown-toggle"}
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <T k="common_nav_mortgage_services">Mortgage Services</T>
                </a>
                <ul className="dropdown-menu mortgage-menu">
                  {MORTGAGE_NAV_ITEMS.map((item) => (
                    <li key={item.slug}>
                      <NavLink href={mortgageHref(item.slug)} active={active(mortgageHref(item.slug))} className="dropdown-item">
                        <T k={item.labelKey}>{item.fallbackLabel}</T>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className={calculatorsActive ? "nav-link dropdown-toggle active" : "nav-link dropdown-toggle"}
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <T k="common_nav_calculators">Calculators</T>
                </a>
                <ul className="dropdown-menu calculators-menu">
                  {CALCULATOR_LINKS.map((item) => (
                    <li key={item.href}>
                      <NavLink href={item.href} active={active(item.href)} className="dropdown-item">
                        <T k={item.labelKey ?? ""}>{item.fallbackLabel}</T>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <NavLink href="/events/" active={active("/events/")} className="nav-link">
                  Events
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  href="/about-us/"
                  className={aboutActive ? "nav-link dropdown-toggle active" : "nav-link dropdown-toggle"}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <T k="common_nav_about_us">About Us</T>
                </Link>
                <ul className="dropdown-menu">
                  {ABOUT_LINKS.map((item) => (
                    <li key={item.href}>
                      <NavLink href={item.href} active={active(item.href)} className="dropdown-item">
                        <T k={item.labelKey ?? ""}>{item.fallbackLabel}</T>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item ms-lg-2">
                <Link className="btn btn-gold" href="/apply/">
                  <T k="common_nav_lets_talk">Let&apos;s Talk</T>
                </Link>
              </li>
              <li className="nav-item ms-lg-2 lang-switcher-item dropdown">
                <button className="lang-switcher-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Select language">
                  <i className="bi bi-globe2" /> <span className="lang-switcher-current">{LANGS[lang].short}</span>
                </button>
                <ul className="dropdown-menu lang-switcher-menu dropdown-menu-end">
                  {VISIBLE_LANGS.map((code) => (
                    <li key={code}>
                      <button
                        type="button"
                        className={lang === code ? "dropdown-item lang-option is-active" : "dropdown-item lang-option"}
                        onClick={() => setLang(code)}
                      >
                        {LANGS[code].label}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
