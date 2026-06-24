import { Link } from 'react-router-dom'
import { ArrowLeft, HardHat } from 'lucide-react'

export default function PrivacyPolicy() {
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

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-2">Adatkezelési tájékoztató</h1>
        <p className="text-muted text-sm mb-10 font-mono">Hatályos: 2026. január 1-től</p>

        <div className="space-y-8 text-[15px] leading-relaxed text-ink/85">
          <section>
            <h2 className="font-display font-bold text-xl mb-2">1. Az adatkezelő</h2>
            <p>
              Az adatkezelő a BÁKRI-BAU Építőipari Korlátolt Felelősségű Társaság (székhely: 7030 Paks, Petőfi utca 48.,
              adószám: 25886142-2-17). A weboldalon keresztül megadott adatokat az alábbiak szerint kezeljük.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-2">2. Kezelt adatok köre</h2>
            <p>
              A kapcsolatfelvételi űrlap kitöltése során a következő adatokat kérjük: név, e-mail cím, telefonszám,
              irányítószám, valamint az üzenet szövege és az opcionálisan feltöltött fényképek. Ezeket az adatokat
              kizárólag a megkeresés megválaszolása és az árajánlat elkészítése céljából rögzítjük.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-2">3. Az adatkezelés célja és jogalapja</h2>
            <p>
              Az adatkezelés célja a megrendelői megkeresések kezelése, árajánlat-készítés és a szerződéskötést
              megelőző kapcsolattartás. Jogalapja az érintett önkéntes hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont).
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-2">4. Az adatok megőrzési ideje</h2>
            <p>
              A megadott adatokat a megkeresés lezárásáig, illetve — szerződéskötés esetén — a számviteli és
              polgári jogi elévülési kötelezettségeknek megfelelő ideig kezeljük. Ezt követően az adatokat töröljük.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-2">5. Adatfeldolgozók és adattovábbítás</h2>
            <p>
              Az adatokat harmadik fél részére nem továbbítjuk, és marketing célra nem használjuk fel. Az adatok
              tárolásához kizárólag megbízható, megfelelő adatvédelmi garanciákkal rendelkező szolgáltatókat veszünk igénybe.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-2">6. Az érintett jogai</h2>
            <p>
              Az érintett jogosult tájékoztatást kérni adatai kezeléséről, kérheti azok helyesbítését, törlését,
              kezelésének korlátozását, valamint jogosult adathordozhatóságra és tiltakozásra. Ezen jogok
              gyakorlására vonatkozó kérelmét a info@bakribau.hu e-mail címre küldheti.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-2">7. Jogorvoslat</h2>
            <p>
              Amennyiben megítélése szerint a személyes adatok kezelése megsérti a vonatkozó jogszabályokat,
              panaszt tehet a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH), vagy bírósághoz fordulhat.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
