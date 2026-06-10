import { notFound } from "next/navigation";
import { Link } from "../../../../../i18n/navigation";
import { SiteShell } from "../../../../components";
import { sections } from "../../../../data";

export default async function HistoryPage() {
  const section = sections.find((s) => s.slug === "about");
  const page = section?.links.find((p) => p.slug === "history");

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
        <div className="history-prose">
        </div>
      </section>
    </SiteShell>
  );
}
