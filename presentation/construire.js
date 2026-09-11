const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "ANVSLAB";
pres.company = "ANVSLAB";
pres.title = "MADAMOON — le nouveau site";
pres.subject = "Présentation de livraison, phase 1";

let n = require("./deck-a.js")(pres);
n = require("./deck-b.js")(pres, n);
n = require("./deck-c.js")(pres, n);

pres.writeFile({ fileName: "MADAMOON-nouveau-site.pptx" }).then(() => {
  console.log(`écrit — ${n} pages numérotées`);
});
