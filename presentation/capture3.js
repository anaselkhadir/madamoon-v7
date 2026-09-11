/* Les sections, saisies à l'écran plutôt que découpées dans une page
 * de treize mille pixels. On défile jusqu'à l'ancre, on laisse le site
 * révéler la section lui-même, et l'on prend l'écran. */
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SITE = "https://anaselkhadir.github.io/madamoon-v7";
const ECRAN = { width: 1440, height: 900, deviceScaleFactor: 2 };

(async () => {
  const nav = await puppeteer.launch({
    executablePath: CHROME, headless: "new",
    args: ["--hide-scrollbars", "--disable-gpu"],
  });
  const page = await nav.newPage();
  await page.setViewport(ECRAN);
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);

  async function aller(chemin) {
    await page.evaluateOnNewDocument(() => {
      try { sessionStorage.setItem("madamoon.ouverture", "vue"); } catch (e) {}
    });
    await page.goto(SITE + chemin, { waitUntil: "networkidle2", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 1600));
  }

  async function section(nom, selecteur, decalage = -90) {
    const trouve = await page.evaluate((s, d) => {
      const e = document.querySelector(s);
      if (!e) return false;
      window.scrollTo({ top: e.getBoundingClientRect().top + window.scrollY + d, behavior: "instant" });
      return true;
    }, selecteur, decalage);
    if (!trouve) { console.log(`  ${nom} — ancre absente (${selecteur})`); return; }
    /* Deux temps : le premier laisse l'observateur déclencher, le
     * second laisse l'animation se terminer. */
    await new Promise((r) => setTimeout(r, 2200));
    await page.screenshot({ path: `captures/${nom}.png` });
    console.log(`  ${nom}  ${(fs.statSync(`captures/${nom}.png`).size / 1024).toFixed(0)} ko`);
  }

  await aller("/");
  await section("sec-silhouette", '[aria-labelledby="silhouette"]', -70);
  await section("sec-coupes", '[aria-labelledby="coupes"]', -70);
  await section("sec-createurs", '[aria-labelledby="createurs"]', -70);
  await section("sec-avis", '[aria-labelledby="avis"]', -70);
  await section("sec-showroom", '[aria-labelledby="showroom"]', 0);

  await aller("/robes/clover/");
  await section("sec-fiche-detail", '[aria-labelledby="fiche"]', -70);
  await section("sec-fiche-vues", "section[aria-label*='Autres vues']", -70);

  await aller("/morphologies/a/");
  await section("sec-morpho-reconnaitre", '[aria-labelledby="reconnaitre"]', -70);
  await section("sec-morpho-scene", '[aria-labelledby="coupes"]', -70);
  await section("sec-morpho-modeles", '[aria-labelledby="modeles"]', -70);
  await section("sec-morpho-questions", '[aria-labelledby="questions"]', -70);
  await section("sec-morpho-audela", '[aria-labelledby="au-dela"]', -70);

  await aller("/createurs/olya-mak/");
  await section("sec-maison-morpho", '[aria-labelledby="ses-morphologies"]', -70);

  await aller("/rendez-vous/");
  await section("sec-calendrier", "#calendrier", -70);

  await aller("/showroom/");
  await section("sec-showroom-visite", "section.gouttiere.mt-\\[clamp\\(3rem\\,5\\.5vw\\,5rem\\)\\]", -120);

  await nav.close();
  console.log("terminé");
})();
