/**
 * Klubdata — ret navne, kampe og tekster her.
 * Offentlige sider viser kun navne. Numre og licenser vises i medlemsportalen.
 */
window.LLC_DATA = {
  coaches: [
    { name: "Mads Ravn", role: "Cheftræner" },
    { name: "Sofie Kjaer", role: "Assistenttræner" },
    { name: "Jonas Bæk", role: "Holdleder" },
  ],

  squad: [
    { name: "Emil Nørgaard", pos: "Målmand", number: 1, license: "DAI-2766-01", since: 2017 },
    { name: "Anders Holm", pos: "Målmand", number: 13, license: "DAI-2766-13", since: 2022 },
    { name: "Mikkel Frost", pos: "Forsvar", number: 2, license: "DAI-2766-02", since: 2016 },
    { name: "Nicolai Berg", pos: "Forsvar", number: 3, license: "DAI-2766-03", since: 2018 },
    { name: "Kasper Lund", pos: "Forsvar", number: 4, license: "DAI-2766-04", since: 2019 },
    { name: "Rasmus Dahl", pos: "Forsvar", number: 5, license: "DAI-2766-05", since: 2021 },
    { name: "Oliver Kruse", pos: "Midtbane", number: 6, license: "DAI-2766-06", since: 2016 },
    { name: "Victor Holmegaard", pos: "Midtbane", number: 8, license: "DAI-2766-08", since: 2017 },
    { name: "Frederik Storm", pos: "Midtbane", number: 10, license: "DAI-2766-10", since: 2018, captain: true },
    { name: "Mathias Vester", pos: "Midtbane", number: 14, license: "DAI-2766-14", since: 2023 },
    { name: "Christian Bode", pos: "Midtbane", number: 17, license: "DAI-2766-17", since: 2020 },
    { name: "Sebastian Tran", pos: "Angreb", number: 7, license: "DAI-2766-07", since: 2019 },
    { name: "Jonas Lind", pos: "Angreb", number: 9, license: "DAI-2766-09", since: 2016 },
    { name: "Alexander Pihl", pos: "Angreb", number: 11, license: "DAI-2766-11", since: 2024 },
    { name: "Tobias Skov", pos: "Angreb", number: 18, license: "DAI-2766-18", since: 2022 },
    { name: "Marcus Høeg", pos: "Utility", number: 21, license: "DAI-2766-21", since: 2025 },
  ],

  hallOfFame: [
    {
      year: "2016",
      title: "Stifterne",
      text: "Ni venner, ét lokomotiv og en mandag i december. Klubben blev stiftet 9. december 2016 og meldt ind i DAI Region Hovedstaden.",
    },
    {
      year: "2018",
      title: "Første puljeskift",
      text: "Oprykning i C-rækken og den første trøje, der ikke var lånt. Blå trøje, hvide bukser — klassikeren.",
    },
    {
      year: "2021",
      title: "7–2 over FC Skumtoget",
      text: "Sæsonens brag i Valby Idrætspark. Et resultat der stadig bliver nævnt, når der skal mindes om, at toget kan køre.",
    },
    {
      year: "2023",
      title: "Første Award Show",
      text: "Galla i sort og rødt. Årets Lokomotiv, Fair Play og «Mest forsinket til opvarmning» blev uddelt under røde lamper.",
    },
    {
      year: "2025",
      title: "De stribede",
      text: "Nye spillertrøjer i rød og sort lodret stribe. Jernbane-DNA på ærmet. Banen er den samme. Toget er skiftet spor.",
    },
  ],

  kits: [
    { id: "blue", name: "Klasiker", years: "2016–2018", shirt: "Blå", shorts: "Hvid", note: "Den første rigtige trøje." },
    { id: "whiteblue", name: "Hvid / blå", years: "2018–2020", shirt: "Hvid med blå", shorts: "Hvid", note: "Udebanen, der blev et statement." },
    { id: "yellow", name: "Gul", years: "2020–2022", shirt: "Gul", shorts: "Sort", note: "Synlig i efterårsmørket på kunstgræs." },
    { id: "redblue", name: "Rød / blå", years: "2022–2025", shirt: "Rød med blå", shorts: "Hvid", note: "Broen til de stribede." },
    { id: "current", name: "Striberne", years: "2025–", shirt: "Rød/sort stribe", shorts: "Sort", note: "Nuværende hjemmebane." },
  ],

  fixtures: [
    { date: "2026-08-31", time: "19:50", home: true, opponent: "Boca Boldisch", venue: "Valby Idrætspark 7", result: null },
    { date: "2026-09-07", time: "18:40", home: false, opponent: "Stiv Kuling", venue: "Udebane", result: null },
    { date: "2026-09-14", time: "20:10", home: true, opponent: "Ol’ Boca Lads", venue: "Valby Idrætspark 7", result: null },
    { date: "2026-09-21", time: "19:20", home: false, opponent: "Rohan FC", venue: "Udebane", result: null },
    { date: "2026-08-10", time: "19:50", home: true, opponent: "WIS", venue: "Valby Idrætspark 7", result: "2–1" },
    { date: "2026-08-17", time: "18:30", home: false, opponent: "Abacus Medicine", venue: "Udebane", result: "1–1" },
    { date: "2026-08-24", time: "20:00", home: true, opponent: "Knuden S & E", venue: "Valby Idrætspark 7", result: "3–0" },
  ],

  table: [
    { pos: 1, team: "Lokomotiv Larsbertocarlos", p: 3, w: 2, d: 1, l: 0, gf: 6, ga: 2, pts: 7 },
    { pos: 2, team: "Ol’ Boca Lads", p: 3, w: 2, d: 0, l: 1, gf: 8, ga: 5, pts: 6 },
    { pos: 3, team: "Rohan FC", p: 3, w: 1, d: 2, l: 0, gf: 4, ga: 3, pts: 5 },
    { pos: 4, team: "Boca Boldisch", p: 3, w: 1, d: 1, l: 1, gf: 5, ga: 5, pts: 4 },
    { pos: 5, team: "WIS", p: 3, w: 1, d: 0, l: 2, gf: 3, ga: 5, pts: 3 },
    { pos: 6, team: "Stiv Kuling", p: 3, w: 0, d: 0, l: 3, gf: 2, ga: 8, pts: 0 },
  ],

  events: [
    { date: "2026-08-28", time: "18:00", title: "Træning", place: "Valby Idrætspark, kunst 41", kind: "træning" },
    { date: "2026-08-31", time: "19:50", title: "Kamp: Boca Boldisch", place: "Valby Idrætspark 7", kind: "kamp" },
    { date: "2026-09-04", time: "18:00", title: "Træning", place: "Valby Idrætspark, kunst 41", kind: "træning" },
    { date: "2026-09-12", time: "19:00", title: "Generalforsamling", place: "Klubhuset", kind: "møde" },
    { date: "2026-11-21", time: "18:30", title: "Award Show 2026", place: "Valby, hemmelig adresse følger", kind: "event" },
    { date: "2026-12-09", time: "19:00", title: "10 års jubilæum", place: "Valby", kind: "event" },
  ],

  instagram: [
    { caption: "Natten på kunstgræs. Striberne i arbejde.", date: "18. aug", tone: "kamp" },
    { caption: "Award Show — pokalen bliver hentet frem.", date: "22. nov", tone: "award" },
    { caption: "Ud af tunellen. Fuld damp.", date: "10. aug", tone: "kamp" },
    { caption: "Omklædningen før braget.", date: "24. aug", tone: "kamp" },
    { caption: "Galla. Sort dug, røde servietter.", date: "22. nov", tone: "award" },
    { caption: "Valby efter regn.", date: "3. aug", tone: "hjemme" },
  ],

  gallery: [
    { title: "Valby under lys", cat: "kamp", year: "2026", tone: "night" },
    { title: "Pres i feltet", cat: "kamp", year: "2026", tone: "action" },
    { title: "Holdet går ud", cat: "kamp", year: "2026", tone: "tunnel" },
    { title: "Striberne på knagen", cat: "kamp", year: "2026", tone: "kit" },
    { title: "Lokomotiv-mærket", cat: "kamp", year: "2026", tone: "badge" },
    { title: "Bold i dug", cat: "kamp", year: "2026", tone: "ball" },
    { title: "Pokalen", cat: "award", year: "2025", tone: "trophy" },
    { title: "Award-bordet", cat: "award", year: "2025", tone: "gala" },
    { title: "Trøjerne gennem tiden", cat: "historie", year: "2016", tone: "history" },
    { title: "Valby Idrætspark", cat: "hjemmebane", year: "2026", tone: "pitch" },
    { title: "Navnet forpligter", cat: "historie", year: "2016", tone: "train" },
    { title: "Bænken i neon", cat: "hjemmebane", year: "2026", tone: "bench" },
  ],

  sponsors: [
    { name: "Bliv hovedsponsor", tier: "Hoved", blurb: "Logo på brystet og på forsiden. Skriv til os." },
    { name: "Banen", tier: "Guld", blurb: "Logo på ærmet og i kalenderen." },
    { name: "Vognen", tier: "Sølv", blurb: "Synlighed på web og i Award Show-programmet." },
    { name: "Skinne", tier: "Ven", blurb: "En kasse øl og et navn i årsskriftet. Det tæller." },
  ],

  shop: [
    { sku: "LLC-HOME-26", name: "Hjemmebane 25/26", price: "449 kr", tag: "Trøje" },
    { sku: "LLC-SCARF", name: "Halstørklæde", price: "179 kr", tag: "Merch" },
    { sku: "LLC-CAP", name: "Kasket", price: "149 kr", tag: "Merch" },
    { sku: "LLC-AWARD", name: "Award Show-plakat 2025", price: "89 kr", tag: "Print" },
  ],

  documents: [
    { title: "Vedtægter", date: "2024-03-12", file: "#", kind: "pdf" },
    { title: "Referat, generalforsamling 2025", date: "2025-03-18", file: "#", kind: "pdf" },
    { title: "Referat, bestyrelsesmøde maj 2026", date: "2026-05-06", file: "#", kind: "pdf" },
    { title: "Husorden, Valby Idrætspark", date: "2025-08-01", file: "#", kind: "pdf" },
    { title: "Trøje- og udstyrspolitik", date: "2025-07-20", file: "#", kind: "pdf" },
    { title: "Årsregnskab 2025", date: "2026-03-01", file: "#", kind: "pdf" },
  ],

  fines: [
    { player: "Jonas Lind", reason: "For sent til opvarmning", amount: 50, paid: false, date: "2026-08-10" },
    { player: "Alexander Pihl", reason: "Glemt indershirt", amount: 30, paid: true, date: "2026-08-10" },
    { player: "Emil Nørgaard", reason: "Gult kort, unødvendigt", amount: 40, paid: false, date: "2026-08-17" },
    { player: "Holdet", reason: "Tabt omklædning (fælles)", amount: 0, paid: true, date: "2026-08-17", note: "Pizza i stedet" },
    { player: "Marcus Høeg", reason: "Mobil på bænken", amount: 20, paid: false, date: "2026-08-24" },
  ],

  board: [
    {
      author: "Holdleder",
      date: "2026-08-24",
      title: "Kamp i aften — mødetid 19:10",
      body: "Kunst 7. Striberne er vasket. Tag sorte shorts og røde strømper. Boldpose hentes i containeren.",
    },
    {
      author: "Bestyrelsen",
      date: "2026-08-20",
      title: "Award Show 21. november",
      body: "Save the date. Nomineringer åbner 1. oktober. Tema: sort jakke, rødt slips — eller stribet trøje under jakken.",
    },
    {
      author: "Cheftræner",
      date: "2026-08-18",
      title: "Træning flyttet til torsdag",
      body: "Banen er optaget mandag. Torsdag 18:00, kunst 41. Besked er også lagt i Holdsport.",
    },
  ],
};
