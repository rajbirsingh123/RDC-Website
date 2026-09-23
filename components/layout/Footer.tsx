"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FOOTER_LINKS, FOOTER_SERVICES_FULL, FOOTER_SERVICES_SHORT } from "@/data/footer";
import { T } from "@/lib/i18n/T";

/** Routes using the short footer variant (matches the original site's per-page choice). */
const SHORT_VARIANT_PREFIXES = ["/careers", "/events", "/mortgages/"];

export function Footer() {
  const pathname = usePathname() || "/";
  const variant: "full" | "short" = SHORT_VARIANT_PREFIXES.some((prefix) => pathname.startsWith(prefix))
    ? "short"
    : "full";
  const services = variant === "full" ? FOOTER_SERVICES_FULL : FOOTER_SERVICES_SHORT;
  const introKey = variant === "full" ? "footer_intro_home" : "footer_intro_generic";
  const introFallback =
    variant === "full"
      ? "Royal Den Capital specializes in helping businesses secure the funding necessary for growth, expansion, and innovation."
      : "Royal Den Capital specializes in helping clients secure funding for homes, businesses, investments, and future growth.";

  return (
    <footer className="footer">
      <div className="container-xl">
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="footer-brand">
              <img src="/assets/rdc-logo.png" alt="Royal Den Capital logo" className="footer-logo" />
              <span>Royal Den Capital</span>
            </div>
            <p>
              <T k={introKey}>{introFallback}</T>
            </p>
            <small>
              <T k="footer_license_line">Lic No: M25002134, Mortgage Alliance ON Lic No. 10530 - Independently owned and operated</T>
            </small>
          </div>
          <div className="col-sm-6 col-lg-3">
            <h3>
              <T k="common_footer_services_heading">Services</T>
            </h3>
            {services.map((item) => (
              <Link key={item.labelKey} href={item.href}>
                <T k={item.labelKey}>{item.fallbackLabel}</T>
              </Link>
            ))}
          </div>
          <div className="col-sm-6 col-lg-2">
            <h3>
              <T k="common_footer_links_heading">Links</T>
            </h3>
            {FOOTER_LINKS.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.labelKey ? <T k={item.labelKey}>{item.fallbackLabel}</T> : item.fallbackLabel}
              </Link>
            ))}
          </div>
          <div className="col-lg-2">
            <h3>
              <T k="common_footer_head_office_heading">Head Office</T>
            </h3>
            <a href="tel:19056091818">905-609-1818</a>
            <a href="mailto:info@royaldencapital.ca">info@royaldencapital.ca</a>
            <a
              href="https://www.google.com/maps/place/Unit+1,+2483+Burnhamthorpe+Rd+W,+Oakville,+ON+L6M+4H1/"
              target="_blank"
              rel="noreferrer"
            >
              Unit 1, 2483 Burnhamthorpe Rd W, Oakville ON L6M 4H1
            </a>
            {variant === "full" && (
              <div className="social-row">
                <a href="http://instagram.com/royaldencapital" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <i className="bi bi-instagram" />
                </a>
                <a href="#" aria-label="Facebook">
                  <i className="bi bi-facebook" />
                </a>
                <a href="#" aria-label="LinkedIn">
                  <i className="bi bi-linkedin" />
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>Copyright (c) 2026 | Royal Den Capital. All Rights Reserved.</span>
            <div className="footer-legal-links">
              <Link href="/terms-and-conditions/">
                <T k="footer_terms">Terms &amp; Conditions</T>
              </Link>
              <span aria-hidden="true">|</span>
              <Link href="/privacy-policy/">
                <T k="footer_privacy">Privacy Policy</T>
              </Link>
            </div>
          </div>
          <a href="https://ardy.media/" target="_blank" rel="noopener noreferrer">
            Website Designed By: Ardy Media
          </a>
        </div>
      </div>
    </footer>
  );
}
