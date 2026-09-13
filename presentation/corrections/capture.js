/* Les captures « après », au cadrage exact des captures de la première
 * présentation : mêmes écrans, mêmes ancres, mêmes décalages. */
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SITE = "https://anaselkhadir.github.io/madamoon-v7";
const ECRAN = { width: 1440, height: 900, deviceScaleFactor: 2 };
const TELEPHONE = { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true };
const pause = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const nav = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--hide-scrollbars", "--disable-gpu"] });

  async function ouvrir(ecran, chemin) {
    const page = await nav.newPage();
    await page.setViewport(ecran);
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }, { name: "prefers-color-scheme", value: "light" }]);
    if (ecran.isMobile) await page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1");
    await page.evaluateOnNewDocument(() => { try { sessionStorage.setItem("madamoon.ouverture", "vue"); } catch (e) {} });
    await page.goto(SITE + chemin + (chemin.includes("?") ? "&" : "?") + "v=" + Date.now(), { waitUntil: "networkidle2", timeout: 90000 });
    await pause(1800);
    return page;
  }
  async function vers(page, selecteur, decalage) {
    const ok = await page.evaluate((s, d) => {
      const els = [...document.querySelectorAll(s)].filter((e) => e.getBoundingClientRect().height > 0);
      const e = els[els.length > 1 && s.includes("trame") ? els.length - 1 : 0];
      if (!e) return false;
      window.scrollTo({ top: e.getBoundingClientRect().top + window.scrollY + d, behavior: "instant" });
      return true;
    }, selecteur, decalage);
    if (!ok) throw new Error("ancre absente : " + selecteur);
    await pause(900);
    await page.evaluate(() => window.dispatchEvent(new Event("scroll")));
    await pause(1600);
  }
  async function prendre(page, nom) {
    await page.screenshot({ path: `captures/${nom}.png` });
    console.log(`  ${nom}  ${(fs.statSync(`captures/${nom}.png`).size / 1024).toFixed(0)} ko`);
    await page.close();
  }
  async function section(ecran, chemin, nom, selecteur, decalage = -70) {
    const p = await ouvrir(ecran, chemin);
    if (selecteur) await vers(p, selecteur, decalage);
    await prendre(p, nom);
  }

  /* L'écran d'ordinateur */
  await section(ECRAN, "/", "ap-sec-morphologies", '[aria-labelledby="morphologies"]');
  await section(ECRAN, "/", "ap-sec-coupes", '[aria-labelledby="coupes"]');
  await section(ECRAN, "/", "ap-sec-createurs", '[aria-labelledby="createurs"]');
  await section(ECRAN, "/robes/clover/", "ap-sec-fiche-detail", '[aria-labelledby="fiche"]');
  await section(ECRAN, "/createurs/autres-createurs/", "ap-autres-createurs", null);

  /* Le téléphone */
  await section(TELEPHONE, "/robes/", "tel-ap-robes", null);
  await section(TELEPHONE, "/robes/", "tel-ap-tuiles", "#sirene .trame-tuiles", -120);
  await section(TELEPHONE, "/coupes/deux-en-un/", "tel-ap-grille", ".trame-tuiles", -330);
  await section(TELEPHONE, "/robes/meredith/", "tel-ap-meredith", "section[aria-label*='Autres vues']", -60);
  await section(TELEPHONE, "/robes/", "tel-ap-tessa", "#deux-en-un", -60);

  await nav.close();
  console.log("terminé");
})();
