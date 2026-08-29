/**
 * Medlemsdata der overskriver placeholders i data.js.
 * Bøder fra Holdsport-skærmbilledet + Vernergult og SoMe.
 * Dokumenter peger på filer i klubbens Google Drive.
 */
window.LLC_DATA = window.LLC_DATA || {};

window.LLC_DATA.fines = [
  { name: "50t-reglen", amount: 50, unit: "kr", note: "" },
  { name: "Ankomst efter kampstart", amount: 300, unit: "kr", note: "" },
  { name: "Dumt rødt kort", amount: 300, unit: "kr", note: "" },
  { name: "For sent til mødetid", amount: 50, unit: "kr", note: "" },
  { name: "For sent til mødetid 15 min", amount: 100, unit: "kr", note: "" },
  { name: "For sent til mødetid 30 min", amount: 250, unit: "kr", note: "" },
  { name: "Vernergult", amount: 75, unit: "kr", note: "Gult kort efter Verner-skalaen" },
  { name: "SoMe", amount: 100, unit: "kr/dag", note: "Manglende SoMe-indhold pr. dag" },
];

window.LLC_DATA.documents = [
  {
    title: "Referat, generalforsamling 2025",
    date: "2025-11-22",
    kind: "pdf",
    file: "https://drive.google.com/file/d/1F_x1D5dS4lnDnA7Dy3kAyBjVLB_P1QQ3/view",
  },
  {
    title: "Referat, generalforsamling 2024",
    date: "2024-11-23",
    kind: "pdf",
    file: "https://drive.google.com/file/d/1LTHAx9zlNia4KekVK-FbEM3unL4yL1aG/view",
  },
  {
    title: "Generalforsamling 2024 inkl. bilag",
    date: "2024-11-23",
    kind: "pdf",
    file: "https://drive.google.com/file/d/15LgqKiICqaQxdqolMxgIYttnx_7liOZW/view",
  },
  {
    title: "Referat, generalforsamling 2023",
    date: "2023-11-11",
    kind: "doc",
    file: "https://docs.google.com/document/d/1cR01kLvZEpsnTC9RYyE0vllUpWqg8AdIeGt0uXgtAz8/view",
  },
  {
    title: "Referat, generalforsamling 2022",
    date: "2022-11-26",
    kind: "pdf",
    file: "https://drive.google.com/file/d/1eX_LO_I08CBgAfIpqiRucLZovuQHUkAU/view",
  },
  {
    title: "Generalforsamling 2018",
    date: "2018-11-01",
    kind: "doc",
    file: "https://docs.google.com/document/d/1V85zcM9kCwvg8DPyrPaep-xNSFwu45NR/view",
  },
  {
    title: "Referat, generalforsamling 2017",
    date: "2017-11-25",
    kind: "pdf",
    file: "https://drive.google.com/file/d/1PQ98oBPIfdVjTUdKeU74t8yQnWmgDmDU/view",
  },
];
