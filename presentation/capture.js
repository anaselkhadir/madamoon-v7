/*
 * Les captures du site, pour la présentation.
 *
 * Chrome piloté plutôt que Chrome en ligne de commande : il faut
 * pouvoir sauter l'ouverture cinématique, basculer le thème, ouvrir
 * Élise et le menu — autant d'états qu'un simple « --screenshot » ne
 * sait pas atteindre.
 */
const puppeteer = require("puppeteer-core");
const fs = require("fs");

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SITE = process.env.SITE || "https://anaselkhadir.github.io/madamoon-v7";
const DOSSIER = "captures";

const ECRAN = { width: 1440, height: 900, deviceScaleFactor: 2 };
const TELEPHONE = { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true };

/* L'ouverture ne joue qu'une fois par session : on pose le drapeau
 * avant le premier rendu, comme le ferait une seconde visite. */
const SAUTER_OUVERTURE = () => {
  try { sessionStorage.setItem("madamoon.ouverture", "vue"); } catch (e) {}
};

async function poser(page, ecran, sombre) {
  await page.setViewport(ecran);
  await page.emulateMediaFeatures([
    { name: "prefers-color-scheme", value: sombre ? "dark" : "light" },
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
}

async function aller(page, chemin) {
  await page.evaluateOnNewDocument(SAUTER_OUVERTURE);
  await page.goto(SITE + chemin, { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1400));
  /* Les sections qui montent au défilement : on les révèle toutes,
   * sinon la capture d'une page entière en montre la moitié vide. */
  await page.evaluate(() => {
    document.querySelectorAll("[data-lever],[data-suite],[data-voile],[data-rideau]").forEach((e) => {
      e.setAttribute("data-vu", "");
      e.style.opacity = "1";
      e.style.transform = "none";
    });
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 500));
}

async function prendre(page, nom, options = {}) {
  const chemin = `${DOSSIER}/${nom}.png`;
  await page.screenshot({ path: chemin, ...options });
  const t = fs.statSync(chemin).size;
  console.log(`  ${nom}  ${(t / 1024).toFixed(0)} ko`);
}

(async () => {
  fs.mkdirSync(DOSSIER, { recursive: true });
  const navigateur = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--hide-scrollbars", "--disable-gpu", "--force-prefers-reduced-motion"],
  });
  const page = await navigateur.newPage();

  /* ————————————————————————————— grand écran ————— */
  console.log("── grand écran");
  await poser(page, ECRAN, false);

  const PAGES = [
    ["/", "web-accueil"],
    ["/robes/", "web-robes"],
    ["/robes/clover/", "web-fiche"],
    ["/coupes/", "web-coupes"],
    ["/coupes/sirene/", "web-coupe"],
    ["/morphologies/", "web-morphologies"],
    ["/morphologies/a/", "web-morphologie"],
    ["/createurs/olya-mak/", "web-maison"],
    ["/showroom/", "web-showroom"],
    ["/a-propos/", "web-lamaison"],
    ["/rendez-vous/", "web-rendezvous"],
    ["/coups-de-coeur/", "web-coeurs"],
    ["/en/", "web-anglais"],
    ["/en/body-shapes/a/", "web-anglais-morpho"],
  ];
  for (const [chemin, nom] of PAGES) {
    await aller(page, chemin);
    await prendre(page, nom);
  }

  /* Les sections de l'accueil, en pleine page puis découpées. */
  await aller(page, "/");
  await prendre(page, "web-accueil-entier", { fullPage: true });

  /* Une fiche robe entière, pour en tirer le détail. */
  await aller(page, "/robes/clover/");
  await prendre(page, "web-fiche-entier", { fullPage: true });

  await aller(page, "/morphologies/a/");
  await prendre(page, "web-morphologie-entier", { fullPage: true });

  /* ————————————————————————————— le mode sombre ————— */
  console.log("── mode sombre");
  await poser(page, ECRAN, true);
  await aller(page, "/robes/");
  await prendre(page, "web-sombre-robes");
  await aller(page, "/robes/clover/");
  await prendre(page, "web-sombre-fiche");
  await poser(page, ECRAN, false);

  /* ————————————————————————————— Élise ————— */
  console.log("── Élise");
  await aller(page, "/morphologies/a/");
  await page.evaluate(() => window.dispatchEvent(new CustomEvent("elise:ouvrir")));
  await new Promise((r) => setTimeout(r, 3000));
  await page.evaluate(async () => {
    const d = document.querySelector('[role=dialog][aria-label*="lise"]');
    const clic = async (t) => {
      const b = [...d.querySelectorAll("button")].find((x) => x.textContent.trim() === t);
      if (b) { b.click(); await new Promise((r) => setTimeout(r, 2200)); }
    };
    await clic("Trouver ma coupe");
    await clic("Guidez-moi");
    await clic("Plus étroites");
  });
  await new Promise((r) => setTimeout(r, 2500));
  await prendre(page, "web-elise");

  /* ————————————————————————————— le menu ————— */
  console.log("── le menu");
  await aller(page, "/robes/");
  await page.evaluate(() => {
    const b = [...document.querySelectorAll("button")].find((x) => /menu/i.test(x.textContent));
    if (b) b.click();
  });
  await new Promise((r) => setTimeout(r, 1500));
  await prendre(page, "web-menu");

  /* ————————————————————————————— téléphone ————— */
  console.log("── téléphone");
  await poser(page, TELEPHONE, false);
  const MOBILES = [
    ["/", "tel-accueil"],
    ["/robes/", "tel-robes"],
    ["/robes/clover/", "tel-fiche"],
    ["/morphologies/a/", "tel-morphologie"],
    ["/coups-de-coeur/", "tel-coeurs"],
    ["/rendez-vous/", "tel-rendezvous"],
    ["/showroom/", "tel-showroom"],
    ["/coupes/sirene/", "tel-coupe"],
  ];
  for (const [chemin, nom] of MOBILES) {
    await aller(page, chemin);
    await prendre(page, nom);
  }

  /* Le menu du téléphone. */
  await aller(page, "/robes/");
  await page.evaluate(() => {
    const b = [...document.querySelectorAll("button")].find((x) => /menu/i.test(x.textContent));
    if (b) b.click();
  });
  await new Promise((r) => setTimeout(r, 1500));
  await prendre(page, "tel-menu");

  /* Élise, sur téléphone. */
  await aller(page, "/");
  await page.evaluate(() => window.dispatchEvent(new CustomEvent("elise:ouvrir")));
  await new Promise((r) => setTimeout(r, 3200));
  await prendre(page, "tel-elise");

  /* Le mode sombre sur téléphone. */
  await poser(page, TELEPHONE, true);
  await aller(page, "/robes/clover/");
  await prendre(page, "tel-sombre");

  await navigateur.close();
  console.log("terminé");
})();
