import { notFound } from "next/navigation";
import { Link } from "../../../../../i18n/navigation";
import { SiteShell } from "../../../../components";
import { sections } from "../../../../data";

export default async function LeadershipPage() {
  const section = sections.find((s) => s.slug === "staff");
  const page = section?.links.find((p) => p.slug === "leadership");

  if (!section || !page) {
    notFound();
  }

  return (
    <SiteShell>
      <section className="subhero subhero--compact">
        <div>
          <Link href={`/section/${section.slug}`}>{section.title}</Link>
          <h1>{page.title}</h1>
        </div>
      </section>

      <section className="section-wrap">
        <div className="leadership-grid" style={{ gridTemplateColumns: "1fr" }}>

          {/* ── Տнőрен ── */}
          <div className="leader-card" style={{ maxWidth: 560 }}>
            <div className="leader-body">
              <p className="director-role">Տնօրեն</p>
              <h2 className="leader-name">Ալվարդ Նուրիբեկի Մաթևոսյան</h2>

              <div className="leader-details">
                <div className="leader-detail-row">
                  <span className="leader-detail-label">Կրթություն</span>
                  <span>Բարձրագույն</span>
                </div>
                <div className="leader-detail-row">
                  <span className="leader-detail-label">Էլ․ հասցե</span>
                  <span>
                    <a href="mailto:hartashen.shirak@gmail.com">
                      hartashen.shirak@gmail.com
                    </a>
                  </span>
                </div>
                <div className="leader-detail-row">
                  <span className="leader-detail-label">Հեռախոսահամար</span>
                  <span>
                    <a href="tel:+37496362744">+374 96 36-27-44</a>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </SiteShell>
  );
}
