function normalize(pathname: string): string {
  return pathname.replace(/index\.html$/, "").replace(/\/+$/, "") || "/";
}

/** Mirrors the old initActiveNav's compare logic: exact path match, hash-aware. */
export function isActivePath(currentPathname: string, currentHash: string, href: string): boolean {
  if (!href || href === "#" || href.startsWith("#")) return false;

  let url: URL;
  try {
    url = new URL(href, "https://example.com" + currentPathname);
  } catch {
    return false;
  }

  if (normalize(url.pathname) !== normalize(currentPathname)) return false;
  if (url.hash && url.hash !== currentHash) return false;
  return true;
}
