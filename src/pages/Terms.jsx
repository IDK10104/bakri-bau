import { Link } from 'react-router-dom'
import { ArrowLeft, HardHat } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary-dark hover:text-primary mb-10">
          <ArrowLeft className="h-4 w-4" />
          Vissza a főoldalra
        </Link>

        <div className="flex items-center gap-2 mb-8">
          <span className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
            <HardHat className="h-5 w-5 text-white" strokeWidth={2.4} />
          </span>
          <span className="font-display font-bold text-lg">BÁKRI-BAU</span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-2">Általános szerződési feltételek</h1>
        <p className="text-muted text-sm mb-10 font-mono">Hatályos: 2026. január 1-től</p>

        <div className="space-y-8 text-[15px] leading-relaxed text-ink/85">
          <section>
            <h2 className="font-display font-bold text-xl mb-2">1. Általános rendelkezések</h2>
            <p>
              A jelen Általános Szerződési Feltételek (ÁSZF) a BÁKRI-BAU Építőipari Korlátolt Felelősségű Társaság
              (székhely: 7030 Paks, Petőfi utca 48., adószám: 25886142-2-17, a továbbiakban: „Vállalkozó") és a
              megrendelő (a továbbiakban: „Megrendelő") között létrejövő kivitelezési szerződésekre vonatkozó
              általános feltételeket tartalmazza.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-2">2. Árajánlat és szerződéskötés</h2>
            <p>
              A Vállalkozó a Megrendelő igényei és a helyszíni felmérés alapján írásos árajánlatot készít. Az
              árajánlat elfogadásával és a felek aláírásával jön létre az egyedi kivitelezési szerződés, amely
              tartalmazza a munka tartalmát, a határidőket és az ellenértéket.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-2">3. Teljesítés és ütemezés</h2>
            <p>
              A Vállalkozó vállalja, hogy a munkát a szerződésben rögzített ütemterv szerint, szakszerűen és a
              vonatkozó épitésügyi szabályoknak megfelelően végzi el. Az ütemtervtől eltérő, előre nem látható
              körülmények (időjárás, hatósági engedélyezés, alvállalkozói akadályoztatás) esetén a felek a
              határidőket írásban módosíthatják.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-2">4. Fizetési feltételek</h2>
            <p>
              A fizetés a szerződésben meghatározott ütemezés szerint, részszámlák alapján történik, a teljesítés
              igazolását követően. A végszámla a sikeres műszaki átadás-átvétel után válik esedékessé.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-2">5. Garancia</h2>
            <p>
              A Vállalkozó az elvégzett munkára a jogszabályban előírt jótállási és szavatossági időtartamra
              garanciát vállal. A garanciális hibákat a bejelentéstől számított ésszerű időn belül kijavítja.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-2">6. Felelősség</h2>
            <p>
              A Vállalkozó a kivitelezés során felelősségbiztosítással rendelkezik. A felek a szerződés teljesítése
              során egymással együttműködnek, az esetleges változásokról haladéktalanul tájékoztatják egymást.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-2">7. Vitás kérdések</h2>
            <p>
              A felek a jelen ÁSZF-ből vagy az egyedi szerződésekből eredő vitás kérdéseket elsősorban tárgyalás
              útján kívánják rendezni. Ennek eredménytelensége esetén a vitás ügyek elbírálására a magyar bíróságok
              rendelkeznek joghatósággal.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
