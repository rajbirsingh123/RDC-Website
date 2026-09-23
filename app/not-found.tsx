import Link from "next/link";

export default function NotFound() {
  return (
    <main className="disclosures-section">
      <div className="container-xl">
        <div className="section-heading text-center">
          <p className="section-kicker">Page Not Found</p>
          <h1>We could not find that page.</h1>
          <p>The page may have moved, or the link may no longer be available.</p>
          <Link href="/" className="btn btn-primary mt-3">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
