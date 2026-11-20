import type { CSSProperties } from "react";
import { LINKS, SITE } from "@/lib/site";

/**
 * ardmst.my.id: the door to every site. A server component, fully static.
 * Three parts: the name as a monument, the doors as display rows, the shared close.
 * No project demos here: the work is reached through the portfolio.
 */

/** The stagger index for entrances (75 ms a step, see theme.css). */
const step = (i: number) => ({ "--i": i }) as CSSProperties;

export default function Page() {
  return (
    <>
      <header className="bar">
        <a className="bar__mark" href="/">
          ardmst
        </a>
        <nav className="bar__links" aria-label="Main">
          <a href={SITE.portfolio}>Portfolio</a>
          <a href={SITE.github} target="_blank" rel="noopener">
            GitHub
          </a>
          <a href={`mailto:${SITE.email}`}>Email</a>
          <button className="bar__theme" type="button" data-theme-toggle aria-pressed="false">
            Dark
          </button>
        </nav>
      </header>

      <main>
        {/* The first screen: the portrait and the sentence stand on the name. */}
        <section className="hero" aria-labelledby="name">
          <div className="hero__top">
            <div className="hero__say">
              <p className="lead hero__lead">
                <span>{SITE.lead[0]}</span> <span>{SITE.lead[1]}</span>
              </p>
              <a className="button hero__go" href={SITE.portfolio}>
                See the portfolio
              </a>
            </div>
            <figure className="hero__portrait pic">
              <img
                src="/portrait-800.webp"
                srcSet="/portrait-480.webp 480w, /portrait-800.webp 800w"
                sizes="(max-width: 720px) 92vw, 34vw"
                width={800}
                height={1000}
                alt="Rifkhi Ardi Mustaqim in round glasses, photographed in black and white under a tree"
                fetchPriority="high"
                decoding="async"
              />
            </figure>
          </div>
          <div className="hero__name">
            <h1 id="name" className="monument">
              ARDMST
            </h1>
          </div>
        </section>

        {/* The doors. Each row carries its picture; on a mouse the pointer holds it larger. */}
        <section className="doors" id="doors" aria-labelledby="doors-title">
          <h2 id="doors-title" className="doors__title" data-rise>
            Every door, one page
          </h2>
          <nav className="rows" aria-label="Every site">
            {LINKS.map((link) => (
              <a
                key={link.href}
                className="row"
                href={link.href}
                {...(link.newTab ? { target: "_blank", rel: "noopener" } : {})}
                data-biro="preview"
                data-biro-src={link.picture.src}
                data-biro-alt={link.picture.alt}
                data-biro-ratio="16 / 10"
              >
                <span className="row__name" data-rise>
                  {link.name}
                </span>
                <span className="row__note" data-rise style={step(1)}>
                  {link.note}
                  {link.newTab ? <span className="sr-only"> (opens in a new tab)</span> : null}
                </span>
                <span className="row__pic pic" data-rise style={step(2)}>
                  <img src={link.picture.src} width={640} height={400} alt={link.picture.alt} loading="lazy" decoding="async" />
                </span>
              </a>
            ))}
          </nav>
        </section>
      </main>

      {/* The close: the invitation over the cropped name. The dropped letters come back once. */}
      <footer className="close" data-biro-ink="var(--field-1-ink)">
        <div className="close__top">
          <div className="close__ask">
            <h2 className="close__say" data-rise>
              Have something that needs building?
            </h2>
            <a className="button close__go" href={`mailto:${SITE.email}`} data-rise style={step(1)}>
              Write to me
            </a>
          </div>
          <ul className="close__links">
            <li data-rise style={step(1)}>
              <a href={SITE.github} target="_blank" rel="noopener">
                GitHub
              </a>
            </li>
            <li data-rise style={step(2)}>
              <a href={SITE.linkedin} target="_blank" rel="noopener">
                LinkedIn
              </a>
            </li>
            <li data-rise style={step(3)}>
              <a href={SITE.portfolio}>portofolio.ardmst.my.id</a>
            </li>
          </ul>
        </div>
        <div className="close__foot">
          <p className="close__derive" data-rise>
            <span className="sr-only">Ardi Mustaqim</span>
            <span aria-hidden="true">
              ARD<span className="close__drop">I</span> M<span className="close__drop">U</span>ST
              <span className="close__drop">AQIM</span>
            </span>
          </p>
          <div className="close__legal">
            <span>© 2026 {SITE.fullName}</span>
            <span>Set in Bebas Neue and EB Garamond</span>
          </div>
          <p className="monument" aria-hidden="true">
            ARDMST
          </p>
        </div>
      </footer>
    </>
  );
}
