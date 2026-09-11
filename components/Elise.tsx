"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AI_ENDPOINT,
  CREATEURS,
  MAISON,
  MORPHOLOGIES,
  SUPABASE_ANON_KEY,
  createurParSlug,
  maisonsPour,
  offreMaison,
} from "@/lib/madamoon";
import { media as chemin } from "@/lib/chemin";
import { langueDe, versLangue, type Langue } from "@/lib/langue";
import { t } from "@/lib/textes";
import {
  bas,
  faq,
  morphoCoupes,
  morphoNom,
  morphoObjectif,
  morphoSilhouette,
  robeLigne,
} from "@/lib/contenu";

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
 * d'entre elles ne travaillent que deux coupes — elle ne fait pas
 * semblant : elle le dit, et donne le classement des maisons qui l'ont.
 * Une conseillère qui vend ce qu'elle a sous la main n'est pas une
 * conseillère.
 *
 * Elle n'est pas une bulle de support. C'est le bouton « Trouver ma robe »
 * qui l'ouvre, depuis n'importe quelle page (événement « elise:ouvrir »,
 * dont le détail peut nommer la maison).
 *
 * Elle parle la langue de la page où elle s'ouvre : ses répliques
 * viennent du dictionnaire, ses liens passent par « versLangue », et la
 * langue accompagne la question envoyée au service.
 */

type Option = { label: string; next?: string; href?: string };
type Message = { de: "elise" | "vous"; texte?: string; riche?: React.ReactNode };
type Historique = { role: "user" | "assistant"; content: string };

const accueil = (l: Langue): Option[] => {
  const T = t(l).elise;
  return [
    { label: T.trouverMaCoupe, next: "morpho" },
    { label: T.prendreRendezvous, next: "rdv" },
    { label: T.questionsPratiques, next: "faq" },
  ];
};

/*
 * Repli hors ligne : orientation par mots-clés vers ce que nous savons.
 *
 * Les deux langues sont dans la même liste. Une cliente anglophone peut
 * très bien écrire « rdv » — elle a lu le site français avant — et une
 * francophone « price ». Séparer les tables n'aurait servi personne.
 */
function reponseLocale(entree: string, l: Langue): { textes: string[]; options: Option[] } {
  const T = t(l).elise;
  const M = MAISON;
  const q = entree
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const a = (...mots: string[]) => mots.some((m) => q.includes(m));

  if (
    a("rendez", "rdv", "reserv", "essayage", "venir", "visite",
      "appoint", "book", "fitting", "visit")
  )
    return {
      textes: [T.localRdv(M.adresse, M.codePostal)],
      options: [
        { label: T.prendreRendezvous, href: "/rendez-vous" },
        { label: T.appeler, href: M.telephoneHref },
      ],
    };
  if (
    a("prix", "tarif", "cout", "coute", "budget", "cher",
      "price", "cost", "expensive", "how much")
  )
    return {
      textes: [T.localPrix(M.prixDepart)],
      options: [{ label: T.prendreRendezvous, next: "rdv" }],
    };
  if (
    a("horaire", "adresse", "ouvert", "situ", "metro", "acces",
      "hour", "open", "address", "where", "located", "access")
  )
    return {
      textes: [T.localHoraires(M.adresse, M.codePostal, M.ville)],
      options: [
        { label: T.voirShowroom, href: "/showroom" },
        { label: T.prendreRendezvous, next: "rdv" },
      ],
    };
  if (
    a("marque", "createur", "createurs", "maison", "watters", "casablanca", "olya", "angeola",
      "brand", "designer", "label", "house")
  )
    return {
      textes: [T.localCreateurs(CREATEURS.map((c) => c.nom).join(", "))],
      options: [
        ...CREATEURS.slice(0, 3).map((c) => ({
          label: c.nom,
          href: `/createurs/${c.slug}`,
        })),
        { label: T.voirCatalogue, href: "/robes" },
      ],
    };
  if (
    a("morpho", "silhouette", "coupe", "corps", "quelle robe", "robe pour moi",
      "shape", "figure", "body", "cut", "which dress", "dress for me")
  )
    return {
      textes: [T.localDiagnostic],
      options: [{ label: T.lancerDiagnostic, next: "q1" }],
    };
  if (a("merci", "super", "parfait", "thank", "great", "perfect"))
    return { textes: [T.localMerci], options: accueil(l) };
  const q0 = faq(l)[0];
  if (
    a("delai", "quand", "mois", "date", "temps", "avance", "how long", "when", "month", "ahead") &&
    q0
  )
    return { textes: [q0.r], options: [{ label: T.prendreRendezvous, next: "rdv" }] };
  return {
    textes: [T.localDefaut],
    options: [...accueil(l), { label: T.appeler, href: M.telephoneHref }],
  };
}

export default function Elise() {
  const route = usePathname();
  const langue = langueDe(route ?? "/");
  /* La table est un objet constant : elle ne fabrique aucune dépendance
   * nouvelle à chaque rendu. */
  const T = t(langue).elise;

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
      const coupes = morphoCoupes(m, langue);

      const carte = {
        plat: `${morphoNom(m, langue)}. ${morphoSilhouette(m, langue)} ${T.lObjectif} ${morphoObjectif(m, langue)} ${T.recommandationsPlat} ${coupes.join(" ")}`,
        riche: (
          <div>
            <p className="font-serif text-[1.375rem] leading-none text-encre">
              {morphoNom(m, langue)}
            </p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-plomb">
              {morphoSilhouette(m, langue)}
            </p>
            <p className="mention mt-4 text-brume">{T.nosRecommandations}</p>
            <ul className="mt-2 border-t border-fil pt-2">
              {coupes.map((c) => (
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
          [carte, T.pistes],
          [
            { label: T.voirRecommandations, href: `/morphologies/${m.lettre.toLowerCase()}` },
            { label: T.prendreRendezvous, next: "rdv" },
            { label: T.refaireDiagnostic, next: "q1" },
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
              plat: T.voiciCeQui(nom ?? "", offre.premieres.map((r) => r.nom).join(", ")),
              riche: (
                <div>
                  <p className="mention text-brume">{T.chezMaison(nom ?? "")}</p>
                  <ul className="mt-2 border-t border-fil pt-2">
                    {siennes.slice(0, 5).map((r) => (
                      <li key={r.slug} className="py-1.5">
                        <a
                          href={chemin(versLangue(`/robes/${r.slug}`, langue))}
                          className="text-[13px] leading-relaxed text-encre hover:text-accent"
                        >
                          <span className="font-serif text-[1.05rem]">{r.nom}</span>
                          <span className="text-plomb"> — {bas(robeLigne(r, langue), langue)}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            },
          ],
          [
            { label: T.toutesLesRobes(nom ?? ""), href: `/createurs/${offre.createur.slug}` },
            { label: T.autresMaisons, next: `classement:${m.lettre}` },
            { label: T.prendreRendezvous, next: "rdv" },
          ],
          720
        );
        return;
      }

      /* La maison n'a pas la coupe. On le dit, et on classe les autres.
       *
       * Le classement ne chiffre rien : la maison ne veut pas voir de
       * nombre de robes sur le site. On dit « dans vos coupes » ou « à
       * essayer », ce qui est de toute façon ce qui intéresse. */
      const autres = maisonsPour(m.lettre).filter((o) => o.createur.nom !== nom);
      dire(
        [
          carte,
          {
            plat: T.pasLesCoupes(nom ?? "", autres.map((o) => o.createur.nom).join(", ")),
            riche: (
              <div>
                <p className="text-[13.5px] leading-[1.75] text-encre">
                  {T.franche(nom ?? "")}
                  {T.saufQue(siennes.length)}
                </p>
                <p className="mention mt-4 text-brume">{T.dansLOrdre}</p>
                <ol className="mt-2 border-t border-fil pt-2">
                  {autres.map((o, i) => (
                    <li key={o.createur.slug} className="flex gap-3 py-1.5">
                      <span className="mention pt-1 text-brume">{String(i + 1).padStart(2, "0")}</span>
                      <a
                        href={chemin(versLangue(`/createurs/${o.createur.slug}`, langue))}
                        className="text-[13px] leading-relaxed text-encre hover:text-accent"
                      >
                        <span className="font-serif text-[1.05rem]">{o.createur.nom}</span>
                        <span className="text-plomb">
                          {" "}
                          — {o.premieres.length > 0 ? T.dansVosCoupes : T.aEssayer}
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
                  label: T.voirMaison(autres[0].createur.nom),
                  href: `/createurs/${autres[0].createur.slug}`,
                },
              ]
            : []),
          { label: T.touteLaSelection, href: `/morphologies/${m.lettre.toLowerCase()}` },
          { label: T.prendreRendezvous, next: "rdv" },
        ],
        720
      );
    },
    [T, dire, langue]
  );

  /* ————————————————————————————— le parcours ————— */

  const aller = useCallback(
    (noeud: string) => {
      const nom = maisonRef.current;
      const questions = faq(langue);
      switch (noeud) {
        case "root": {
          dire(
            nom ? [T.bonjour, T.vousRegardez(nom)] : [T.bonjour, T.invitation],
            accueil(langue)
          );
          break;
        }

        case "morpho":
          dire(
            [T.essentiel, T.connaissezMorpho],
            [
              { label: T.ouiJeLaConnais, next: "choix" },
              { label: T.guidezMoi, next: "q1" },
            ]
          );
          break;

        case "choix":
          dire(
            [T.laquelle],
            MORPHOLOGIES.map((m) => ({
              label: T.lettreLabel(m.lettre),
              next: `res:${m.lettre}`,
            }))
          );
          break;

        case "q1":
          dire(
            [T.pasAPas, T.epaulesHanches],
            [
              { label: T.plusEtroites, next: "res:A" },
              { label: T.plusLarges, next: "res:V" },
              { label: T.alignees, next: "q2" },
              { label: T.courbesGenereuses, next: "res:O" },
            ]
          );
          break;

        case "q2":
          dire(
            [T.tailleMarquee],
            [
              { label: T.ouiBienMarquee, next: "q3" },
              { label: T.peuMarquee, next: "res:H" },
            ]
          );
          break;

        case "q3":
          dire(
            [T.derniereQuestion],
            [
              { label: T.prononcees, next: "res:8" },
              { label: T.doucesFine, next: "res:X" },
            ]
          );
          break;

        case "rdv":
          dire(
            [T.rdvPrivatise, T.localRdv(MAISON.adresse, MAISON.codePostal)],
            [
              { label: T.prendreRendezvous, href: "/rendez-vous" },
              { label: T.appelerCourt, href: MAISON.telephoneHref },
              { label: T.ecrireCourt, href: MAISON.emailHref },
            ]
          );
          break;

        case "faq":
          dire(
            [T.faqIntro],
            questions
              .slice(0, 5)
              .map((f, i) => ({ label: f.q.replace(/\s*\?$/, ""), next: `faq:${i}` }))
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
                  plat: T.lesMaisonsPour(rang.map((o) => o.createur.nom).join(", ")),
                  riche: (
                    <ol className="border-t border-fil pt-2">
                      {rang.map((o, i) => (
                        <li key={o.createur.slug} className="flex gap-3 py-1.5">
                          <span className="mention pt-1 text-brume">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <a
                            href={chemin(versLangue(`/createurs/${o.createur.slug}`, langue))}
                            className="text-[13px] leading-relaxed text-encre hover:text-accent"
                          >
                            <span className="font-serif text-[1.05rem]">{o.createur.nom}</span>
                            <span className="text-plomb">
                              {" "}
                              — {o.premieres.length > 0 ? T.dansVosCoupes : T.aEssayer}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  ),
                },
              ],
              [
                { label: T.touteLaSelection, href: `/morphologies/${lettre.toLowerCase()}` },
                { label: T.prendreRendezvous, next: "rdv" },
              ]
            );
          } else if (noeud.startsWith("faq:")) {
            const f = questions[Number(noeud.slice(4))];
            if (!f) return;
            dire(
              [f.r],
              [
                { label: T.prendreRendezvous, next: "rdv" },
                { label: T.autreQuestion, next: "faq" },
                { label: T.trouverMaCoupe, next: "morpho" },
              ]
            );
          }
        }
      }
    },
    [T, conclure, dire, langue]
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
        body: JSON.stringify({ messages: historique.current.slice(-16), langue }),
      });
      clearTimeout(minuteur);
      if (!res.ok) throw new Error(`http_${res.status}`);
      const data = await res.json();
      const reponse = typeof data?.reply === "string" ? data.reply.trim() : "";
      if (!reponse) throw new Error("vide");
      historique.current.push({ role: "assistant", content: reponse });
      setEcrit(false);
      setMessages((m) => [...m, { de: "elise", texte: reponse }]);
      setOptions([{ label: T.prendreRendezvous, next: "rdv" }]);
    } catch {
      const repli = reponseLocale(question, langue);
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
      else window.location.href = chemin(versLangue(o.href, langue));
      return;
    }
    historique.current.push({ role: "user", content: o.label });
    setMessages((m) => [...m, { de: "vous", texte: o.label }]);
    if (o.next) aller(o.next);
  };

  return (
    <div
      role="dialog"
      aria-label={T.dialogue}
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
            {maison ? T.chezMaison(maison) : T.conseillere}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOuvert(false)}
          tabIndex={ouvert ? 0 : -1}
          className="souligne legende text-encre"
        >
          {t(langue).barre.fermer}
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
              <p className="mention mb-1.5 text-brume">{T.vous}</p>
              <p className="text-[13.5px] font-light leading-[1.75] text-encre">{m.texte}</p>
            </div>
          )
        )}
        {ecrit && (
          <div className="flex items-center gap-1.5" aria-label={T.ecrit}>
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
          placeholder={T.champ}
          aria-label={T.champLabel}
          enterKeyHint="send"
          tabIndex={ouvert ? 0 : -1}
          className="min-w-0 flex-1 bg-transparent py-1.5 text-[14px] font-light text-encre outline-none placeholder:text-brume"
        />
        <button
          type="submit"
          aria-label={T.envoyer}
          disabled={!entree.trim() || ecrit}
          tabIndex={ouvert ? 0 : -1}
          className="legende shrink-0 text-encre transition-colors duration-500 enabled:hover:text-accent disabled:opacity-30"
        >
          {T.envoyer}
        </button>
      </form>
    </div>
  );
}
