"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AI_ENDPOINT,
  CREATEURS,
  FAQ,
  MAISON,
  MORPHOLOGIES,
  SUPABASE_ANON_KEY,
  createurParSlug,
  maisonsPour,
  offreMaison,
  robesDe,
} from "@/lib/madamoon";
import { media as chemin } from "@/lib/chemin";

/*
 * Élise — conseillère de la maison.
 *
 * Le moteur reprend celui des versions précédentes : conversation libre
 * servie par la fonction Supabase, parcours guidé de morphologie, et repli
 * par mots-clés si l'IA ne répond pas.
 *
 * Ce qui change ici, c'est qu'elle sait d'où on l'a ouverte.
 *
 * Sur la page d'une maison, elle ne recommande que les robes de cette
 * maison. Et quand la maison n'a pas la coupe qui conviendrait — deux
 * d'entre elles ne travaillent que deux silhouettes — elle ne fait pas
 * semblant : elle le dit, et donne le classement des maisons qui l'ont.
 * Une conseillère qui vend ce qu'elle a sous la main n'est pas une
 * conseillère.
 *
 * Elle n'est pas une bulle de support. C'est le bouton « Trouver ma robe »
 * qui l'ouvre, depuis n'importe quelle page (événement « elise:ouvrir »,
 * dont le détail peut nommer la maison).
 */

type Option = { label: string; next?: string; href?: string };
type Message = { de: "elise" | "vous"; texte?: string; riche?: React.ReactNode };
type Historique = { role: "user" | "assistant"; content: string };

const ACCUEIL: Option[] = [
  { label: "Trouver ma coupe", next: "morpho" },
  { label: "Prendre rendez-vous", next: "rdv" },
  { label: "Questions pratiques", next: "faq" },
];

/* Repli hors ligne : orientation par mots-clés vers ce que nous savons. */
function reponseLocale(entree: string): { textes: string[]; options: Option[] } {
  const q = entree
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
  const a = (...mots: string[]) => mots.some((m) => q.includes(m));

  if (a("rendez", "rdv", "reserv", "essayage", "venir", "visite"))
    return {
      textes: [
        `Avec plaisir. Le showroom est privatisé pour vous pendant une heure, sur rendez-vous uniquement : lundi 12h–21h, du mardi au samedi 10h–19h, au ${MAISON.adresse}, Paris ${MAISON.codePostal}.`,
      ],
      options: [
        { label: "Prendre rendez-vous", href: "/rendez-vous" },
        { label: "Appeler la boutique", href: MAISON.telephoneHref },
      ],
    };
  if (a("prix", "tarif", "cout", "coute", "budget", "cher"))
    return {
      textes: [
        `Nos robes commencent à ${MAISON.prixDepart}, retouches comprises. Le sur-mesure se chiffre après l'essayage, selon la robe et le tissu.`,
      ],
      options: [{ label: "Prendre rendez-vous", next: "rdv" }],
    };
  if (a("horaire", "adresse", "ouvert", "situ", "metro", "acces"))
    return {
      textes: [
        `Le showroom vous reçoit sur rendez-vous uniquement : lundi de 12h à 21h, du mardi au samedi de 10h à 19h — ${MAISON.adresse}, ${MAISON.codePostal} ${MAISON.ville}.`,
      ],
      options: [
        { label: "Voir le showroom", href: "/showroom" },
        { label: "Prendre rendez-vous", next: "rdv" },
      ],
    };
  if (a("marque", "createur", "createurs", "maison", "watters", "casablanca", "olya", "angeola"))
    return {
      textes: [
        `Nos robes sont choisies chez ${CREATEURS.map((c) => c.nom).join(", ")}, avec un service de confection sur mesure.`,
      ],
      options: [
        ...CREATEURS.slice(0, 3).map((c) => ({
          label: c.nom,
          href: `/createurs/${c.slug}`,
        })),
        { label: "Voir le catalogue", href: "/robes" },
      ],
    };
  if (a("morpho", "silhouette", "coupe", "corps", "quelle robe", "robe pour moi"))
    return {
      textes: [
        "Chaque femme est unique. Le plus simple est un petit diagnostic ensemble, pour identifier les coupes qui vous mettront en valeur. On commence ?",
      ],
      options: [{ label: "Lancer le diagnostic", next: "q1" }],
    };
  if (a("merci", "super", "parfait"))
    return {
      textes: [
        "Avec grand plaisir. Je reste à votre écoute, et au plaisir de vous accueillir au showroom.",
      ],
      options: ACCUEIL,
    };
  const q0 = FAQ[0];
  if (a("delai", "quand", "mois", "date", "temps", "avance") && q0)
    return { textes: [q0.r], options: [{ label: "Prendre rendez-vous", next: "rdv" }] };
  return {
    textes: [
      "Je préfère vous répondre précisément plutôt que de m'avancer. Le mieux est d'en parler de vive voix avec la boutique — ou je peux vous guider ici sur votre silhouette, nos prix et la prise de rendez-vous.",
    ],
    options: [...ACCUEIL, { label: "Appeler la boutique", href: MAISON.telephoneHref }],
  };
}

export default function Elise() {
  const route = usePathname();
  const [ouvert, setOuvert] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [ecrit, setEcrit] = useState(false);
  const [demarre, setDemarre] = useState(false);
  const [entree, setEntree] = useState("");
  /* La maison depuis laquelle on l'a ouverte. Elle vient de l'adresse de
   * la page, ou du bouton lui-même quand celui-ci la nomme. */
  const [maison, setMaison] = useState<string | null>(null);

  const liste = useRef<HTMLDivElement>(null);
  const minuteurs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const historique = useRef<Historique[]>([]);
  /* Le nœud lit la maison courante sans être recréé à chaque changement. */
  const maisonRef = useRef<string | null>(null);
  maisonRef.current = maison;

  const plusTard = (fn: () => void, ms: number) => {
    minuteurs.current.push(setTimeout(fn, ms));
  };

  useEffect(() => {
    const el = liste.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, ecrit, options]);

  useEffect(() => () => minuteurs.current.forEach(clearTimeout), []);

  useEffect(() => {
    document.documentElement.style.overflow = ouvert ? "hidden" : "";
  }, [ouvert]);

  useEffect(() => {
    const surTouche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    window.addEventListener("keydown", surTouche);
    return () => window.removeEventListener("keydown", surTouche);
  }, []);

  const dire = useCallback(
    (
      textes: (string | { plat: string; riche: React.ReactNode })[],
      opts: Option[],
      delai = 620
    ) => {
      setOptions([]);
      setEcrit(true);
      textes.forEach((t, i) => {
        plusTard(
          () => {
            const plat = typeof t === "string" ? t : t.plat;
            historique.current.push({ role: "assistant", content: plat });
            setMessages((m) => [
              ...m,
              typeof t === "string" ? { de: "elise", texte: t } : { de: "elise", riche: t.riche },
            ]);
            if (i === textes.length - 1) {
              setEcrit(false);
              setOptions(opts);
            }
          },
          delai * (i + 1)
        );
      });
    },
    []
  );

  /* ————————————————————————————— le verdict ————— */

  /*
   * Ce qu'Élise répond une fois la morphologie connue.
   *
   * Trois cas, et le troisième est le seul qui compte vraiment : quand la
   * maison consultée n'a rien dans les coupes conseillées, on ne rabat pas
   * sur ce qu'elle a — on nomme les maisons qui les travaillent.
   */
  const conclure = useCallback(
    (lettre: string) => {
      const m = MORPHOLOGIES.find((x) => x.lettre === lettre);
      if (!m) return;
      const nom = maisonRef.current;
      const offre = nom ? offreMaison(nom, lettre) : undefined;

      const carte = {
        plat: `${m.nom}. ${m.silhouette} L'objectif : ${m.objectif} Nos recommandations : ${m.coupes.join(" ")}`,
        riche: (
          <div>
            <p className="font-serif text-[1.375rem] leading-none text-encre">{m.nom}</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-plomb">{m.silhouette}</p>
            <p className="mention mt-4 text-brume">Nos recommandations</p>
            <ul className="mt-2 border-t border-fil pt-2">
              {m.coupes.map((c) => (
                <li key={c} className="flex gap-2.5 py-1 text-[13px] leading-relaxed">
                  <span className="text-accent">—</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        ),
      };

      /* Hors d'une maison : la sélection générale. */
      if (!offre) {
        dire(
          [
            carte,
            "Ce sont des pistes, jamais des règles : en boutique, on essaie aussi ce qui n'était pas prévu. Voulez-vous voir la sélection correspondante ?",
          ],
          [
            { label: "Voir mes recommandations", href: `/morphologies/${m.lettre.toLowerCase()}` },
            { label: "Prendre rendez-vous", next: "rdv" },
            { label: "Refaire le diagnostic", next: "q1" },
          ],
          720
        );
        return;
      }

      const siennes = [...offre.premieres, ...offre.secondes];

      /* La maison a de quoi répondre. */
      if (offre.premieres.length > 0) {
        dire(
          [
            carte,
            {
              plat: `Chez ${nom}, ${offre.premieres.length} robe${offre.premieres.length > 1 ? "s" : ""} correspond${offre.premieres.length > 1 ? "ent" : ""} : ${offre.premieres.map((r) => r.nom).join(", ")}.`,
              riche: (
                <div>
                  <p className="mention text-brume">Chez {nom}</p>
                  <ul className="mt-2 border-t border-fil pt-2">
                    {siennes.slice(0, 5).map((r) => (
                      <li key={r.slug} className="py-1.5">
                        <a
                          href={chemin(`/robes/${r.slug}`)}
                          className="text-[13px] leading-relaxed text-encre hover:text-accent"
                        >
                          <span className="font-serif text-[1.05rem]">{r.nom}</span>
                          <span className="text-plomb"> — {r.ligne.toLowerCase()}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            },
          ],
          [
            { label: `Toutes les robes ${nom}`, href: `/createurs/${offre.createur.slug}` },
            { label: "Voir les autres maisons", next: `classement:${m.lettre}` },
            { label: "Prendre rendez-vous", next: "rdv" },
          ],
          720
        );
        return;
      }

      /* La maison n'a pas la coupe. On le dit, et on classe les autres. */
      const autres = maisonsPour(m.lettre).filter((o) => o.createur.nom !== nom);
      dire(
        [
          carte,
          {
            plat: `${nom} ne travaille pas les coupes que je vous conseillerais en premier. Les maisons qui les ont, dans l'ordre : ${autres
              .map((o) => `${o.createur.nom} (${o.premieres.length})`)
              .join(", ")}.`,
            riche: (
              <div>
                <p className="text-[13.5px] leading-[1.75] text-encre">
                  Je préfère être franche : {nom} ne travaille pas les coupes que je vous
                  conseillerais en premier.
                  {siennes.length === 0
                    ? " Voici les maisons faites pour vous."
                    : siennes.length === 1
                      ? " Son autre robe vaut l'essai, mais voici d'abord les maisons faites pour vous."
                      : ` Ses ${siennes.length} autres robes valent l'essai, mais voici d'abord les maisons faites pour vous.`}
                </p>
                <p className="mention mt-4 text-brume">Dans l&apos;ordre</p>
                <ol className="mt-2 border-t border-fil pt-2">
                  {autres.map((o, i) => (
                    <li key={o.createur.slug} className="flex gap-3 py-1.5">
                      <span className="mention pt-1 text-brume">{String(i + 1).padStart(2, "0")}</span>
                      <a
                        href={chemin(`/createurs/${o.createur.slug}`)}
                        className="text-[13px] leading-relaxed text-encre hover:text-accent"
                      >
                        <span className="font-serif text-[1.05rem]">{o.createur.nom}</span>
                        <span className="text-plomb">
                          {" "}
                          — {o.premieres.length > 0
                            ? `${o.premieres.length} robe${o.premieres.length > 1 ? "s" : ""} dans vos coupes`
                            : `${o.secondes.length} robe${o.secondes.length > 1 ? "s" : ""} à essayer`}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            ),
          },
        ],
        [
          ...(autres[0]
            ? [
                {
                  label: `Voir ${autres[0].createur.nom}`,
                  href: `/createurs/${autres[0].createur.slug}`,
                },
              ]
            : []),
          { label: "Toute la sélection", href: `/morphologies/${m.lettre.toLowerCase()}` },
          { label: "Prendre rendez-vous", next: "rdv" },
        ],
        720
      );
    },
    [dire]
  );

  /* ————————————————————————————— le parcours ————— */

  const aller = useCallback(
    (noeud: string) => {
      const nom = maisonRef.current;
      switch (noeud) {
        case "root": {
          const combien = nom ? robesDe(nom).length : 0;
          dire(
            nom
              ? [
                  "Bonjour, je suis Élise, conseillère chez MADAMOON. Trouver la robe d'une vie, c'est mon métier — et ma plus grande joie.",
                  `Vous regardez ${nom} : ${combien} robe${combien > 1 ? "s" : ""} au showroom. Je pars de votre silhouette, et je vous dis franchement si la réponse est ailleurs.`,
                ]
              : [
                  "Bonjour, je suis Élise, conseillère chez MADAMOON. Trouver la robe d'une vie, c'est mon métier — et ma plus grande joie.",
                  "Parlez-moi de votre mariage, posez-moi vos questions, ou laissez-vous guider.",
                ],
            ACCUEIL
          );
          break;
        }

        case "morpho":
          dire(
            [
              "L'essentiel est de trouver la robe qui met en valeur votre silhouette tout en vous ressemblant.",
              "Connaissez-vous déjà votre morphologie ?",
            ],
            [
              { label: "Oui, je la connais", next: "choix" },
              { label: "Guidez-moi", next: "q1" },
            ]
          );
          break;

        case "choix":
          dire(
            ["Très bien. Laquelle est la vôtre ?"],
            MORPHOLOGIES.map((m) => ({ label: `En ${m.lettre}`, next: `res:${m.lettre}` }))
          );
          break;

        case "q1":
          dire(
            [
              "Je vous guide pas à pas.",
              "Comment décririez-vous vos épaules par rapport à vos hanches ?",
            ],
            [
              { label: "Plus étroites", next: "res:A" },
              { label: "Plus larges", next: "res:V" },
              { label: "Alignées", next: "q2" },
              { label: "Courbes généreuses", next: "res:O" },
            ]
          );
          break;

        case "q2":
          dire(
            ["Et votre taille, est-elle marquée ?"],
            [
              { label: "Oui, bien marquée", next: "q3" },
              { label: "Peu marquée", next: "res:H" },
            ]
          );
          break;

        case "q3":
          dire(
            ["Dernière question : vos courbes sont plutôt…"],
            [
              { label: "Prononcées", next: "res:8" },
              { label: "Douces, silhouette fine", next: "res:X" },
            ]
          );
          break;

        case "rdv":
          dire(
            [
              "Avec plaisir. Le showroom est entièrement privatisé pour vous pendant une heure — venez accompagnée de vos proches.",
              `Sur rendez-vous uniquement : lundi 12h–21h, du mardi au samedi 10h–19h, au ${MAISON.adresse}, Paris ${MAISON.codePostal}.`,
            ],
            [
              { label: "Prendre rendez-vous", href: "/rendez-vous" },
              { label: "Appeler", href: MAISON.telephoneHref },
              { label: "Écrire", href: MAISON.emailHref },
            ]
          );
          break;

        case "faq":
          dire(
            ["Bien sûr. Que souhaitez-vous savoir ? Vous pouvez aussi m'écrire librement."],
            FAQ.slice(0, 5).map((f, i) => ({ label: f.q.replace(/\s*\?$/, ""), next: `faq:${i}` }))
          );
          break;

        default: {
          if (noeud.startsWith("res:")) {
            conclure(noeud.slice(4));
          } else if (noeud.startsWith("classement:")) {
            const lettre = noeud.slice(11);
            const rang = maisonsPour(lettre);
            dire(
              [
                {
                  plat: `Les maisons pour cette morphologie : ${rang.map((o) => `${o.createur.nom} (${o.premieres.length})`).join(", ")}.`,
                  riche: (
                    <ol className="border-t border-fil pt-2">
                      {rang.map((o, i) => (
                        <li key={o.createur.slug} className="flex gap-3 py-1.5">
                          <span className="mention pt-1 text-brume">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <a
                            href={chemin(`/createurs/${o.createur.slug}`)}
                            className="text-[13px] leading-relaxed text-encre hover:text-accent"
                          >
                            <span className="font-serif text-[1.05rem]">{o.createur.nom}</span>
                            <span className="text-plomb">
                              {" "}
                              — {o.premieres.length} dans vos coupes, {o.secondes.length} à essayer
                            </span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  ),
                },
              ],
              [
                { label: "Toute la sélection", href: `/morphologies/${lettre.toLowerCase()}` },
                { label: "Prendre rendez-vous", next: "rdv" },
              ]
            );
          } else if (noeud.startsWith("faq:")) {
            const f = FAQ[Number(noeud.slice(4))];
            if (!f) return;
            dire(
              [f.r],
              [
                { label: "Prendre rendez-vous", next: "rdv" },
                { label: "Autre question", next: "faq" },
                { label: "Trouver ma coupe", next: "morpho" },
              ]
            );
          }
        }
      }
    },
    [conclure, dire]
  );

  /* Le bouton « Trouver ma robe », depuis n'importe quelle page.
   *
   * La maison vient du détail de l'événement quand le bouton la nomme, et
   * de l'adresse de la page sinon : ouvrir Élise depuis le menu, sur la
   * page d'une maison, doit filtrer tout autant. */
  useEffect(() => {
    const ouvrir = (e: Event) => {
      const detail = (e as CustomEvent<{ maison?: string }>).detail;
      const parRoute = route?.startsWith("/createurs/")
        ? createurParSlug(route.split("/")[2] ?? "")?.nom
        : undefined;
      setMaison(detail?.maison ?? parRoute ?? null);
      maisonRef.current = detail?.maison ?? parRoute ?? null;
      setOuvert(true);
      if (!demarre) {
        setDemarre(true);
        aller("root");
      }
    };
    window.addEventListener("elise:ouvrir", ouvrir);
    return () => window.removeEventListener("elise:ouvrir", ouvrir);
  }, [aller, demarre, route]);

  /* Texte libre → IA ; en cas d'échec, moteur local par mots-clés. */
  const demander = async (question: string) => {
    setOptions([]);
    setEcrit(true);
    try {
      const controleur = new AbortController();
      const minuteur = setTimeout(() => controleur.abort(), 20000);
      const res = await fetch(AI_ENDPOINT, {
        method: "POST",
        signal: controleur.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          apikey: SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ messages: historique.current.slice(-16) }),
      });
      clearTimeout(minuteur);
      if (!res.ok) throw new Error(`http_${res.status}`);
      const data = await res.json();
      const reponse = typeof data?.reply === "string" ? data.reply.trim() : "";
      if (!reponse) throw new Error("vide");
      historique.current.push({ role: "assistant", content: reponse });
      setEcrit(false);
      setMessages((m) => [...m, { de: "elise", texte: reponse }]);
      setOptions([{ label: "Prendre rendez-vous", next: "rdv" }]);
    } catch {
      const repli = reponseLocale(question);
      setEcrit(false);
      repli.textes.forEach((t) => historique.current.push({ role: "assistant", content: t }));
      setMessages((m) => [...m, ...repli.textes.map((t) => ({ de: "elise" as const, texte: t }))]);
      setOptions(repli.options);
    }
  };

  const envoyer = () => {
    const texte = entree.trim();
    if (!texte || ecrit) return;
    setEntree("");
    historique.current.push({ role: "user", content: texte });
    setMessages((m) => [...m, { de: "vous", texte }]);
    demander(texte);
  };

  const choisir = (o: Option) => {
    if (o.href) {
      if (o.href.startsWith("http") || o.href.startsWith("tel:") || o.href.startsWith("mailto:"))
        window.open(o.href, "_blank", "noopener");
      else window.location.href = chemin(o.href);
      return;
    }
    historique.current.push({ role: "user", content: o.label });
    setMessages((m) => [...m, { de: "vous", texte: o.label }]);
    if (o.next) aller(o.next);
  };

  return (
    <div
      role="dialog"
      aria-label="Élise, conseillère MADAMOON"
      aria-hidden={!ouvert}
      className={`verre fixed z-[80] flex flex-col border-fil transition-all duration-700 [transition-timing-function:var(--ease-rideau)] ${
        ouvert ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      } inset-0 md:inset-auto md:bottom-7 md:right-8 md:h-[min(620px,calc(100dvh-6rem))] md:w-[26rem] md:border`}
    >
      <div className="flex items-start justify-between border-b border-fil px-6 py-5">
        <div>
          <p className="font-serif text-[1.375rem] leading-none text-encre">Élise</p>
          <p className="mention mt-2.5 flex items-center gap-2 text-plomb">
            <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-accent" />
            {maison ? `Conseillère — ${maison}` : "Conseillère — MADAMOON"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOuvert(false)}
          tabIndex={ouvert ? 0 : -1}
          className="souligne legende text-encre"
        >
          Fermer
        </button>
      </div>

      <div ref={liste} data-lenis-prevent className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
        {messages.map((m, i) =>
          m.de === "elise" ? (
            <div key={i} className="max-w-[92%]">
              <p className="mention mb-1.5 text-brume">Élise</p>
              <div className="whitespace-pre-line text-[13.5px] font-light leading-[1.75] text-encre">
                {m.riche ?? m.texte}
              </div>
            </div>
          ) : (
            <div key={i} className="ml-auto max-w-[88%] border-r-2 border-action pr-4 text-right">
              <p className="mention mb-1.5 text-brume">Vous</p>
              <p className="text-[13.5px] font-light leading-[1.75] text-encre">{m.texte}</p>
            </div>
          )
        )}
        {ecrit && (
          <div className="flex items-center gap-1.5" aria-label="Élise écrit">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1 w-1 animate-bounce rounded-full bg-accent"
                style={{ animationDelay: `${i * 0.14}s` }}
              />
            ))}
          </div>
        )}
      </div>

      {options.length > 0 && (
        <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-fil px-6 py-3.5">
          {options.map((o) => (
            <button
              key={o.label}
              type="button"
              onClick={() => choisir(o)}
              tabIndex={ouvert ? 0 : -1}
              className="souligne legende text-left text-encre transition-colors duration-500 hover:text-accent"
            >
              {o.label}
            </button>
          ))}
        </div>
      )}

      <form
        className="flex items-center gap-3 border-t border-fil px-6 py-4"
        onSubmit={(e) => {
          e.preventDefault();
          envoyer();
        }}
      >
        <input
          type="text"
          value={entree}
          onChange={(e) => setEntree(e.target.value)}
          placeholder="Écrivez à Élise…"
          aria-label="Votre message pour Élise"
          enterKeyHint="send"
          tabIndex={ouvert ? 0 : -1}
          className="min-w-0 flex-1 bg-transparent py-1.5 text-[14px] font-light text-encre outline-none placeholder:text-brume"
        />
        <button
          type="submit"
          aria-label="Envoyer"
          disabled={!entree.trim() || ecrit}
          tabIndex={ouvert ? 0 : -1}
          className="legende shrink-0 text-encre transition-colors duration-500 enabled:hover:text-accent disabled:opacity-30"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
