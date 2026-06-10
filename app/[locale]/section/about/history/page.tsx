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
          <p>
            Հarтаsheni himnaкan dprocjы himnadrvats e 1826 tvakannin ev
            apahovum e Shirakи marзi krtutjyan hnagoyn hastatututjunneritc meyi
            pokharaky:
          </p>
          <p>
            Dprocji shenky karucvats e Italiayi Belluno qarajaghki bnakichneri
            finansakan ev kamavor ajakchutjyan masin, inchi vkajagrutjunn e
            &laquo;Dalla gente Bellunese alla comunit&agrave; di Hartasen&raquo;
            hushatakhtaky, vory ajsоr el cucadrvats e dprocji nersum:
          </p>
          <p>
            Hartasheni himnaкan dprocjы est. 1826 tvakannits sharchan aysi
            nstатsavayri bolor shijanakneri glatsat krtutjyan ev bnakichneri
            hamar:
          </p>
          <p>
            Aысоr dprocjы sharumakanum e gorcel Shirakи marзi Hartasheni
            gyughum, apahovelov ushakertнerin koгноч krtutjуn ev zarutsums:
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
