/* ------------------------------------------------------------------
   Stock data + tiny store.
   In the live build this comes out of the database (WordPress custom
   post type or a small MySQL table). For this demo it lives in
   localStorage so the Stock Manager page can actually change what the
   public pages show.
------------------------------------------------------------------ */

const DEFAULT_STOCK = [
  {
    id: "golf",
    make: "Volkswagen", model: "Golf", trim: "1.6 TDI Match 5dr",
    year: 2015, mileage: 68400, engine: "1598 cc", gearbox: "Manual",
    fuel: "Diesel", doors: 5, colour: "Pure White",
    mot: "14 March 2027", history: "Full service history — 7 stamps",
    price: 7495, owners: 2, reg: "MA15 XXX",
    photos: ["golf-1.jpg", "golf-2.jpg"],
    sold: false, featured: true,
    blurb: "One of the best all-rounders we sell. Cambelt and water pump done at 62k, new front discs and pads fitted last month, and it drives absolutely faultlessly. Two former keepers, both local."
  },
  {
    id: "qashqai",
    make: "Nissan", model: "Qashqai", trim: "1.5 dCi Acenta Premium",
    year: 2016, mileage: 59100, engine: "1461 cc", gearbox: "Manual",
    fuel: "Diesel", doors: 5, colour: "Gun Metallic",
    mot: "21 January 2027", history: "Full main dealer history",
    price: 8950, owners: 1, reg: "MB16 XXX",
    photos: ["qashqai-1.jpg", "qashqai-2.jpg"],
    sold: false, featured: true,
    blurb: "One owner from new with a complete Nissan history. Panoramic roof, reversing camera and cruise control. Serviced, MOT'd and fully valeted in our own workshop before going on sale."
  },
  {
    id: "bmw",
    make: "BMW", model: "3 Series", trim: "320d Sport Saloon",
    year: 2017, mileage: 82300, engine: "1995 cc", gearbox: "Automatic",
    fuel: "Diesel", doors: 4, colour: "Alpine White",
    mot: "30 November 2026", history: "Full BMW service history",
    price: 11750, owners: 2, reg: "MC17 XXX",
    photos: ["bmwx-2.jpg", "bmwx-1.jpg", "bmw-2.jpg"],
    sold: false, featured: true,
    blurb: "Sport spec with the 8-speed automatic box, heated leather and sat nav. Motorway miles rather than town miles, and it shows — the interior is as good as you will find at this money."
  },
  {
    id: "astra",
    make: "Vauxhall", model: "Astra", trim: "1.4T SRi 5dr",
    year: 2014, mileage: 70200, engine: "1364 cc", gearbox: "Manual",
    fuel: "Petrol", doors: 5, colour: "Mint Green",
    mot: "17 April 2027", history: "Full service history — 6 stamps",
    price: 5495, owners: 3, reg: "MD64 XXX",
    photos: ["astra-1.jpg"],
    sold: true, featured: false,
    blurb: "Sold within the week — the turbo petrol SRi always goes quickly at this money. We usually have something similar coming through, so give us a ring and we will keep an eye out for you."
  },
  {
    id: "focus",
    make: "Ford", model: "Focus", trim: "1.6 Zetec 5dr",
    year: 2013, mileage: 74900, engine: "1596 cc", gearbox: "Manual",
    fuel: "Petrol", doors: 5, colour: "Moondust Silver",
    mot: "2 September 2026", history: "Service history — 6 stamps",
    price: 4295, owners: 3, reg: "ME13 XXX",
    photos: ["focus-1.jpg", "focus-2.jpg"],
    sold: false, featured: false,
    blurb: "Honest, cheap-to-run family hatch. Air conditioning ice cold, four matching tyres with plenty of tread, and a clean bill of health on the ramp. Ideal first car or second car."
  },
  {
    id: "corsa",
    make: "Vauxhall", model: "Corsa", trim: "1.2 SXi 3dr",
    year: 2013, mileage: 61750, engine: "1229 cc", gearbox: "Manual",
    fuel: "Petrol", doors: 3, colour: "Bright Yellow",
    mot: "8 June 2026", history: "Service history — 5 stamps",
    price: 3650, owners: 2, reg: "MF13 XXX",
    photos: ["corsa-3.jpg", "corsa-2.jpg", "corsa-1.jpg"],
    sold: false, featured: false,
    blurb: "Low insurance group and cheap tax to run — the reason these make such good first cars. Fresh service, four new tyres and an MOT with no advisories. Drives without a rattle."
  }
];

const STORE_KEY = "ng_stock_v1";

function loadStock() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return DEFAULT_STOCK.map(c => ({ ...c }));
    const saved = JSON.parse(raw);
    // keep the catalogue in sync with the code, only the flags persist
    return DEFAULT_STOCK.map(c => {
      const s = saved.find(x => x.id === c.id);
      return s ? { ...c, sold: !!s.sold, removed: !!s.removed, price: s.price ?? c.price } : { ...c };
    }).filter(c => !c.removed);
  } catch (e) {
    return DEFAULT_STOCK.map(c => ({ ...c }));
  }
}

function saveStock(list) {
  localStorage.setItem(STORE_KEY, JSON.stringify(
    list.map(c => ({ id: c.id, sold: !!c.sold, removed: !!c.removed, price: c.price }))
  ));
}

function resetStock() {
  localStorage.removeItem(STORE_KEY);
}

const money = n => "£" + n.toLocaleString("en-GB");
const miles = n => n.toLocaleString("en-GB") + " miles";
