/**
 * Klubdata — ret navne, kampe og tekster her.
 * Offentlige sider viser kun navne. Numre og licenser vises i medlemsportalen.
 */
window.LLC_DATA = {
  coaches: [
    { name: "Olsen", role: "SoMe" },
    { name: "Værnet & Souary", role: "Bødlerne" },
    { name: "Daae", role: "Fitness" },
  ],

  squad: [
    { name: "Souary", pos: "Målmand", number: 1, license: "6", since: 2016 },
    { name: "Rost", pos: "Wing Back", number: 13, license: "1", since: 2016 },
    { name: "Fønss", pos: "Forsvar", number: 77, license: "3", since: 2016, captain: true },
    { name: "Bisgaard", pos: "Midtbane", number: 6, license: "4", since: 2016 },
    { name: "Værnet", pos: "Angreb", number: 9, license: "10", since: 2016 },
    { name: "Daae", pos: "Wing Back", number: 7, license: "5", since: 2016 },
    { name: "Hammerum", pos: "Midtbane", number: 24, license: "7", since: 2016 },
    { name: "Olsen", pos: "Angreb", number: 11, license: "13", since: 2016 },
    { name: "Zeko", pos: "Midtbane", number: 5, license: "11", since: 2016 },
    { name: "Balthzer", pos: "Angreb", number: 12, license: "25", since: 2020 },
    { name: "Mikkelsen", pos: "Forsvar", number: 52, license: "26", since: 2022 },
    { name: "Prip", pos: "Midtbane", number: 8, license: "28", since: 2022 },
    { name: "Rostrup", pos: "Midtbane", number: 14, license: "31", since: 2024 },
    { name: "Poulsen", pos: "Angreb", number: 39, license: "32", since: 2024 },
    { name: "Lium", pos: "Midtbane", number: 46, license: "30", since: 2024 },
    { name: "Ropstad", pos: "Angreb", number: 17, license: "33", since: 2026 },
  ],

  hallOfFame: [
    {
      year: "2016",
      title: "Stifterne",
      text: "Tolv venner, ét lokomotiv og en kold dag i december. Klubben blev stiftet 9. december 2016 og har skovlet kul lige siden.",
    },
    {
      year: "2018",
      title: "Første puljeskift",
      text: "Oprykning i C-rækken. Blå trøje, hvide bukser — klasikeren.",
    },
    {
      year: "2021",
      title: "7–2 over FC Skumtoget",
      text: "Sæsonens brag i Valby Idrætspark. Et resultat der stadig bliver nævnt, når der skal mindes om, at toget kan køre.",
    },
    {
      year: "2018",
      title: "Første Award Show",
      text: "Galla i sort og rødt. Årets Spiller, Mål, Assist og Lars blev uddelt under røde lamper.",
    },
    {
      year: "2026",
      title: "De stribede",
      text: "Nye spillertrøjer i rød og sort lodret stribe. Jernbane-DNA på ærmet. Banen er den samme. Toget har skiftet spor.",
    },
  ],

  kits: [
    { id: "blue", name: "Klasikeren", years: "2016–2018", shirt: "Blå/Hvid", shorts: "Hvid", note: "Den første rigtige trøje." },
    { id: "yellow", name: "Gul", years: "2016–2022", shirt: "Gul", shorts: "Sort", note: "Synlig i efterårsmørket på kunstgræs." },
    { id: "whiteblue", name: "Den Stramme", years: "2022–2026", shirt: "Hvid med blå", shorts: "Hvid", note: "...et statement." },
    { id: "redblue", name: "Den kontroversielle", years: "2022–2026", shirt: "Rød med blå", shorts: "Hvid", note: "Trøje Gate 6.7" },
    { id: "current", name: "Striberne", years: "2026–", shirt: "Rød/sort stribe", shorts: "Sort", note: "Nuværende hjemmebane." },
  ],

  fixtures: [
    { season: "forar", round: 1, date: "2026-04-10", time: "17:30", home: true, opponent: "Stribberne", venue: "Valby Idrætspark 7, Kunst 41", result: "4–3" },
    { season: "forar", round: 3, date: "2026-04-26", time: "10:00", home: true, opponent: "FC Sailing Lads", venue: "Valby Idrætspark 7, Kunst 40", result: null, note: "UHT" },
    { season: "forar", round: 4, date: "2026-05-04", time: "20:30", home: false, opponent: "FBK", venue: "Kløvermarken 7, Kunst 42", result: "2–0" },
    { season: "forar", round: 5, date: "2026-05-10", time: "12:20", home: true, opponent: "Absalons Boldklub af 2012", venue: "Valby Idrætspark 7, Kunst 41", result: "4–2" },
    { season: "forar", round: 6, date: "2026-05-16", time: "11:10", home: false, opponent: "A-holdet", venue: "Kløvermarken 7, Kunst 43", result: "4–4" },
    { season: "forar", round: 7, date: "2026-05-23", time: "12:00", home: true, opponent: "Valby Fulbo 1.", venue: "Valby Idrætspark 7, Kunst 41", result: "1–3" },
    { season: "forar", round: 8, date: "2026-05-31", time: "10:00", home: false, opponent: "Svaneke Boldklub", venue: "Valby Idrætspark 7, Kunst 42", result: "1–2" },
    { season: "forar", round: 10, date: "2026-06-14", time: "11:10", home: false, opponent: "Stribberne", venue: "Valby Idrætspark 7, Kunst 40", result: "0–3" },
    { season: "forar", round: 11, date: "2026-06-19", time: "17:30", home: true, opponent: "Skurvognen FC", venue: "Valby Idrætspark 7, Kunst 41", result: "0–3", note: "HHT" },
    { season: "forar", round: 2, date: "2026-06-26", time: "18:40", home: false, opponent: "Skurvognen FC", venue: "Valby Idrætspark 7, Kunst 40", result: "1–3" },
    { season: "efterar", round: 12, date: "2026-08-16", time: "12:20", home: false, opponent: "FC Sailing Lads", venue: "Udgået", result: null, cancelled: true, note: "Hold trukket" },
    { season: "efterar", round: 13, date: "2026-08-25", time: "21:00", home: true, opponent: "FBK", venue: "Valby Idrætspark 7, Kunst 40", result: null },
    { season: "efterar", round: 14, date: "2026-08-29", time: "12:00", home: false, opponent: "Absalons Boldklub af 2012", venue: "Valby Idrætspark 7, Kunst 40", result: null },
    { season: "efterar", round: 16, date: "2026-09-12", time: "12:00", home: false, opponent: "Valby Fulbo 1.", venue: "Valby Idrætspark 7, Kunst 40", result: null },
    { season: "efterar", round: 17, date: "2026-09-19", time: "13:10", home: true, opponent: "Svaneke Boldklub", venue: "Valby Idrætspark 7, Kunst 42", result: null },
    { season: "efterar", round: 18, date: "2026-09-27", time: "12:20", home: false, opponent: "UD Retiraos", venue: "Valby Idrætspark 7, Kunst 43", result: null },
    { season: "efterar", round: 9, date: "2026-09-30", time: "17:30", home: true, opponent: "UD Retiraos", venue: "Valby Idrætspark 7, Kunst 40", result: null },
    { season: "efterar", round: 15, date: "2026-10-04", time: "11:10", home: true, opponent: "A-holdet", venue: "Valby Idrætspark 7, Kunst 42", result: null },
  ],

  table: [
    { pos: 1, team: "Valby Fulbo 1.", p: 12, w: 8, d: 2, l: 2, gf: 34, ga: 15, pts: 26 },
    { pos: 2, team: "A-holdet", p: 12, w: 8, d: 1, l: 3, gf: 47, ga: 37, pts: 25 },
    { pos: 3, team: "Lokomotiv LarsbertoCarlos", p: 9, w: 5, d: 1, l: 3, gf: 21, ga: 19, pts: 16 },
    { pos: 4, team: "Stribberne", p: 11, w: 4, d: 2, l: 5, gf: 33, ga: 34, pts: 14 },
    { pos: 5, team: "Skurvognen FC", p: 12, w: 4, d: 1, l: 7, gf: 24, ga: 36, pts: 13 },
    { pos: 6, team: "Svaneke Boldklub", p: 10, w: 4, d: 0, l: 6, gf: 23, ga: 29, pts: 12 },
    { pos: 7, team: "FBK", p: 9, w: 3, d: 2, l: 4, gf: 34, ga: 26, pts: 11 },
    { pos: 8, team: "UD Retiraos", p: 7, w: 3, d: 2, l: 2, gf: 16, ga: 12, pts: 11 },
    { pos: 9, team: "Absalons Boldklub af 2012", p: 10, w: 1, d: 1, l: 8, gf: 20, ga: 44, pts: 4 },
    { pos: 10, team: "FC Sailing Lads", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
  ],

  events: [
    { date: "2026-08-25", time: "21:00", title: "Kamp: FBK", place: "Valby Idrætspark 7, Kunst 40", kind: "kamp" },
    { date: "2026-08-29", time: "12:00", title: "Kamp: Absalons Boldklub af 2012", place: "Valby Idrætspark 7, Kunst 40", kind: "kamp" },
    { date: "2026-09-12", time: "12:00", title: "Kamp: Valby Fulbo 1.", place: "Valby Idrætspark 7, Kunst 40", kind: "kamp" },
    { date: "2026-09-12", time: "19:00", title: "Generalforsamling", place: "Klubhuset", kind: "møde" },
    { date: "2026-09-19", time: "13:10", title: "Kamp: Svaneke Boldklub", place: "Valby Idrætspark 7, Kunst 42", kind: "kamp" },
    { date: "2026-09-27", time: "12:20", title: "Kamp: UD Retiraos", place: "Valby Idrætspark 7, Kunst 43", kind: "kamp" },
    { date: "2026-09-30", time: "17:30", title: "Kamp: UD Retiraos", place: "Valby Idrætspark 7, Kunst 40", kind: "kamp" },
    { date: "2026-10-04", time: "11:10", title: "Kamp: A-holdet", place: "Valby Idrætspark 7, Kunst 42", kind: "kamp" },
    { date: "2026-11-21", time: "18:30", title: "Award Show 2026", place: "Valby, hemmelig adresse følger", kind: "event" },
    { date: "2026-12-09", time: "19:00", title: "10 års jubilæum", place: "Valby", kind: "event" },
  ],

  instagram: [
    { caption: "Natten på kunstgræs. Striberne i arbejde.", date: "18. aug", tone: "kamp", src: "assets/img/hero-night.jpg" },
    { caption: "Award Show — pokalen bliver hentet frem.", date: "22. nov", tone: "award", src: "assets/img/award-trophy.jpg" },
    { caption: "Ud af tunellen. Fuld damp.", date: "10. aug", tone: "kamp", src: "assets/img/udgang.jpg" },
    { caption: "Omklædningen før braget.", date: "24. aug", tone: "kamp", src: "assets/img/omklaedning.jpg" },
    { caption: "Galla. Sort dug, røde servietter.", date: "22. nov", tone: "award", src: "assets/img/gala-bord.jpg" },
    { caption: "Valby efter regn.", date: "3. aug", tone: "hjemme", src: "assets/img/valby-dusk.jpg" },
  ],

  gallery: [
    { title: "Valby under lys", cat: "kamp", year: "2026", tone: "night", src: "assets/img/hero-night.jpg" },
    { title: "Pres i feltet", cat: "kamp", year: "2026", tone: "action", src: "assets/img/match-action.jpg" },
    { title: "Holdet går ud", cat: "kamp", year: "2026", tone: "tunnel", src: "assets/img/udgang.jpg" },
    { title: "Striberne på knagen", cat: "kamp", year: "2026", tone: "kit", src: "assets/img/kit-closeup.jpg" },
    { title: "Lokomotiv-mærket", cat: "kamp", year: "2026", tone: "badge", src: "assets/img/lokomotiv-bold.jpg" },
    { title: "Bold i dug", cat: "kamp", year: "2026", tone: "ball", src: "assets/img/bold-grass.jpg" },
    { title: "Pokalen", cat: "award", year: "2025", tone: "trophy", src: "assets/img/award-trophy.jpg" },
    { title: "Award-bordet", cat: "award", year: "2025", tone: "gala", src: "assets/img/gala-bord.jpg" },
    { title: "Trøjerne gennem tiden", cat: "historie", year: "2016", tone: "history", src: "assets/img/historiske-trojer.jpg" },
    { title: "Valby Idrætspark", cat: "hjemmebane", year: "2026", tone: "pitch", src: "assets/img/valby-dusk.jpg" },
    { title: "Navnet forpligter", cat: "historie", year: "2016", tone: "train", src: "assets/img/lokomotiv-bold.jpg" },
    { title: "Omklædningen", cat: "kamp", year: "2026", tone: "bench", src: "assets/img/omklaedning.jpg" },
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
