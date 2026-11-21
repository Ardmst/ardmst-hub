import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "No door here — Ardmst",
  robots: { index: false, follow: true },
};

/** The 404 page, in the theme: one line, one way back. */
export default function NotFound() {
  return (
    <>
      <header className="bar">
        <a className="bar__mark" href="/">
          ardmst
        </a>
        <nav className="bar__links" aria-label="Main">
          <button className="bar__theme" type="button" data-theme-toggle>
            <span className="bar__to-dark">Dark</span>
            <span className="bar__to-light">Light</span>
          </button>
        </nav>
      </header>
      <main className="lost">
        <h1 className="lost__title">No door here</h1>
        <p className="lead">This address is not one of the sites on ardmst.my.id.</p>
        <a className="button" href="/">
          Back to every door
        </a>
      </main>
    </>
  );
}
