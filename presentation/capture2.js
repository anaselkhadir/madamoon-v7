/* Les états qui vivent dans le navigateur : le thème choisi et les
 * coups de cœur. Ils se posent avant le premier rendu, sans quoi la
 * page s'affiche claire et la liste vide. */
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SITE = "https://anaselkhadir.github.io/madamoon-v7";

const ECRAN = { width: 1440, height: 900, deviceScaleFactor: 2 };
const TELEPHONE = { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true };
const COEURS = ["uma", "trinity", "venus", "clover", "adularia", "solana"];

(async () => {
  const nav = await puppeteer.launch({
    executablePath: CHROME, headless: "new",
    args: ["--hide-scrollbars", "--disable-gpu", "--force-prefers-reduced-motion"],
  });
  const page = await nav.newPage();

  async function aller(chemin, { sombre = false, coeurs = false, ecran = ECRAN } = {}) {
    await page.setViewport(ecran);
    await page.evaluateOnNewDocument(
      (s, c, liste) => {
        try {
          sessionStorage.setItem("madamoon.ouverture", "vue");
          if (s) localStorage.setItem("madamoon.theme", "sombre");
          else localStorage.removeItem("madamoon.theme");
          if (c) localStorage.setItem("madamoon.coups-de-coeur", JSON.stringify(liste));
        } catch (e) {}
      },
      sombre, coeurs, COEURS
    );
    await page.goto(SITE + chemin, { waitUntil: "networkidle2", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 1600));
    await page.evaluate(() => {
      document.querySelectorAll("[data-lever],[data-suite],[data-voile],[data-rideau]").forEach((e) => {
        e.style.opacity = "1"; e.style.transform = "none";
      });
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 400));
  }

  async function prendre(nom, opts = {}) {
    await page.screenshot({ path: `captures/${nom}.png`, ...opts });
    console.log(`  ${nom}  ${(fs.statSync(`captures/${nom}.png`).size / 1024).toFixed(0)} ko`);
  }

  console.log("── mode sombre");
  await aller("/robes/", { sombre: true }); await prendre("web-sombre-robes");
  await aller("/robes/clover/", { sombre: true }); await prendre("web-sombre-fiche");
  await aller("/", { sombre: true }); await prendre("web-sombre-accueil");
  await aller("/robes/clover/", { sombre: true, ecran: TELEPHONE }); await prendre("tel-sombre");

  console.log("── les coups de cœur");
  await aller("/coups-de-coeur/", { coeurs: true }); await prendre("web-coeurs");
  await aller("/coups-de-coeur/", { coeurs: true, ecran: TELEPHONE }); await prendre("tel-coeurs");
  await aller("/robes/", { coeurs: true }); await prendre("web-robes-coeurs");

  console.log("── le menu");
  await aller("/robes/");
  await page.evaluate(() => {
    const b = [...document.querySelectorAll("button")].find((x) => /^menu$/i.test(x.textContent.trim()));
    if (b) b.click();
  });
  await new Promise((r) => setTimeout(r, 1800));
  await prendre("web-menu");
  await aller("/robes/", { ecran: TELEPHONE });
  await page.evaluate(() => {
    const b = [...document.querySelectorAll("button")].find((x) => /^menu$/i.test(x.textContent.trim()));
    if (b) b.click();
  });
  await new Promise((r) => setTimeout(r, 1800));
  await prendre("tel-menu");

  await nav.close();
  console.log("terminé");
})();
