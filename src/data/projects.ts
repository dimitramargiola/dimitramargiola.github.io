/* ──────────────────────────────────────────────────────────────────────────
   PROJECTS — the single source of truth for the portfolio.

   • Order of this array = order on the site (index, home sequence, "next project").
   • To add a project: copy an entry, give it a unique `slug`, put its images in
     /artwork/<slug>/ and run `npm run images`.
   • `src` values are image keys: "<folder>/<file name without extension>".
   • Every text field is bilingual: { el: "…", en: "…" }.
   • Gallery blocks (see `Block` below) decide the layout of each case study.
   ────────────────────────────────────────────────────────────────────────── */

export type L = { el: string; en: string };
export type Img = { src: string; alt: L; caption?: L };

export type Block =
  /** One image edge to edge across the viewport. */
  | { kind: "full"; image: Img; tone?: Tone }
  /** One image inside the page margins. `size` narrows it (wide = 12 cols, medium = 10, narrow = 8). */
  | { kind: "wide"; image: Img; tone?: Tone; size?: "wide" | "medium" | "narrow" }
  /** Several images in one row, all the same height (widths follow each image's proportions). */
  | { kind: "row"; images: Img[]; tone?: Tone; title?: L }
  /** One image beside a short text, on the left or right half of the grid. */
  | { kind: "offset"; image: Img; side: "left" | "right"; text: L; title?: L; tone?: Tone }
  /** A short passage set large: a quotation or a line from the work itself. */
  | { kind: "statement"; text: L; source?: L; tone?: Tone };

/** Background of a block: page white (default), light grey band, or black band. */
export type Tone = "paper" | "grey" | "ink";

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: L;
  context: L;
  year?: string;
  summary: L;
  description: L[];
  deliverables: L[];
  /** Image used in the index preview, the "next project" link and social cards. */
  cover: Img;
  /** Image used for the project in the home page sequence. */
  feature: Img;
  blocks: Block[];
};

const img = (src: string, el: string, en: string, caption?: L): Img => ({ src, alt: { el, en }, caption });

export const projects: Project[] = [
  {
    slug: "afiltraristo",
    number: "01",
    title: "Afiltraristo",
    category: { el: "Οπτική ταυτότητα", en: "Visual identity" },
    context: { el: "Πτυχιακή εργασία", en: "Graduation thesis" },
    year: "2026",
    summary: {
      el: "Ταυτότητα για ένα σύγχρονο wine bar με φυσικά, αφιλτράριστα κρασιά.",
      en: "An identity for a contemporary wine bar pouring natural, unfiltered wines.",
    },
    description: [
      {
        el: "Δημιουργία της εταιρικής ταυτότητας για το «AFILTRARISTO», ένα σύγχρονο wine bar αφιερωμένο σε φυσικά και αφιλτράριστα κρασιά, με σχεδιαστική φιλοσοφία που ακολουθεί τις αξίες του ίδιου του προϊόντος: την αυθεντικότητα, την ειλικρίνεια και την απουσία τεχνητών φίλτρων.",
        en: "A corporate identity for AFILTRARISTO, a contemporary wine bar devoted to natural and unfiltered wines. Its design philosophy follows the values of the product itself: authenticity, honesty and the absence of artificial filters.",
      },
    ],
    deliverables: [
      { el: "Λογότυπο και σήμα", en: "Logotype and mark" },
      { el: "Ετικέτες κρασιού", en: "Wine labels" },
      { el: "Επαγγελματικές κάρτες", en: "Business cards" },
      { el: "Σουβέρ", en: "Coasters" },
      { el: "Συσκευασία δώρου", en: "Gift bag" },
      { el: "Μπλουζάκι", en: "T-shirt" },
      { el: "Ιστοσελίδα", en: "Website" },
      { el: "Αφίσα πόλης", en: "City poster" },
    ],
    cover: img("afiltraristo/identity-cover", "Η κάρτα τίτλου της ταυτότητας AFILTRARISTO σε σκούρο πράσινο, με το σήμα του σταφυλιού", "The AFILTRARISTO identity title card in dark green, with the grape mark"),
    feature: img("afiltraristo/wine-bottles", "Τρία μπουκάλια κρασιού AFILTRARISTO με καψύλια σε μωβ, ροζ και φασκομηλί", "Three AFILTRARISTO wine bottles with purple, pink and sage capsules"),
    blocks: [
      { kind: "full", tone: "ink", image: img("afiltraristo/identity-cover", "Η κάρτα τίτλου της ταυτότητας AFILTRARISTO", "The AFILTRARISTO identity title card") },
      {
        kind: "row",
        title: { el: "Το σήμα σε τρεις αποχρώσεις", en: "The mark in three colourways" },
        images: [
          img("afiltraristo/grape-mark-red", "Το σήμα του σταφυλιού σε βαθύ κόκκινο", "The grape mark in deep red"),
          img("afiltraristo/grape-mark-rose", "Το σήμα του σταφυλιού σε ροζ", "The grape mark in rose"),
          img("afiltraristo/grape-mark-sage", "Το σήμα του σταφυλιού σε φασκομηλί", "The grape mark in sage"),
        ],
      },
      {
        kind: "wide",
        tone: "grey",
        image: img("afiltraristo/wine-bottles", "Τρία μπουκάλια κρασιού με τις ετικέτες AFILTRARISTO", "Three wine bottles wearing the AFILTRARISTO labels", {
          el: "Μία απόχρωση για κάθε κρασί: το χρώμα του καψυλιού επαναλαμβάνεται στο σήμα της ετικέτας.",
          en: "One colour per wine: each capsule colour returns in the mark on its label.",
        }),
      },
      {
        kind: "row",
        images: [
          img("afiltraristo/coasters", "Δύο στρογγυλά σουβέρ με το λογότυπο και το σήμα", "Two round coasters with the logotype and the mark", { el: "Σουβέρ", en: "Coasters" }),
          img("afiltraristo/business-cards", "Επαγγελματικές κάρτες, εμπρός και πίσω όψη", "Business cards, front and back", { el: "Επαγγελματικές κάρτες", en: "Business cards" }),
        ],
      },
      { kind: "statement", text: { el: "“Fresh perspective. No filters attached.”", en: "“Fresh perspective. No filters attached.”" }, source: { el: "Από την αφίσα της καμπάνιας", en: "From the campaign poster" } },
      {
        kind: "offset",
        side: "left",
        title: { el: "Στην πόλη", en: "In the city" },
        text: {
          el: "Η αφίσα της καμπάνιας μεταφέρει το μπουκάλι και το σήμα στον δρόμο, με διεύθυνση και λογαριασμούς κοινωνικών δικτύων στη βάση της.",
          en: "The campaign poster takes the bottle and the mark onto the street, with the address and social handles set at its foot.",
        },
        image: img("afiltraristo/city-poster", "Αφίσα AFILTRARISTO σε πλαίσιο στάσης λεωφορείου", "AFILTRARISTO poster in a street display case"),
      },
      {
        kind: "wide",
        size: "medium",
        image: img("afiltraristo/website", "Η αρχική σελίδα της ιστοσελίδας AFILTRARISTO σε φορητό υπολογιστή", "The AFILTRARISTO website home page on a laptop", {
          el: "Ιστοσελίδα: κατάλογος κρασιών, κρατήσεις, επικοινωνία.",
          en: "Website: wine list, reservations, contact.",
        }),
      },
      {
        kind: "row",
        tone: "grey",
        images: [
          img("afiltraristo/wine-bag", "Σκούρα συσκευασία δώρου για μπουκάλι κρασιού", "Dark gift bag for a single wine bottle", { el: "Συσκευασία δώρου", en: "Gift bag" }),
          img("afiltraristo/t-shirt", "Σκούρο μπλουζάκι με το σήμα του σταφυλιού", "Dark t-shirt printed with the grape mark", { el: "Μπλουζάκι", en: "T-shirt" }),
        ],
      },
    ],
  },
  {
    slug: "eleusis",
    number: "02",
    title: "Eleusis",
    category: { el: "Ετικέτα & συσκευασία", en: "Label & packaging" },
    context: { el: "Ανάθεση εργασίας", en: "Course assignment" },
    summary: {
      el: "Μπροστινή και πίσω ετικέτα για μια μπύρα pilsner με το όνομα ΕΛΕΥΣΙΣ.",
      en: "Front and back labels for a pilsner named ΕΛΕΥΣΙΣ.",
    },
    description: [
      {
        el: "Ανάθεση εργασίας: δημιουργία ετικέτας για μπύρα με το όνομα ΕΛΕΥΣΙΣ, σε μπροστινή και πίσω όψη.",
        en: "The brief: design a label for a beer named ΕΛΕΥΣΙΣ (Eleusis), front and back.",
      },
    ],
    deliverables: [
      { el: "Μπροστινή ετικέτα", en: "Front label" },
      { el: "Πίσω ετικέτα", en: "Back label" },
      { el: "Παρουσίαση μπουκαλιού", en: "Bottle presentation" },
    ],
    cover: img("eleusis/label-front", "Η μπροστινή ετικέτα ΕΛΕΥΣΙΣ με φωτογραφία λιμανιού και γερανών", "The ΕΛΕΥΣΙΣ front label over a photograph of a harbour with cranes"),
    feature: img("eleusis/bottle-front", "Μπουκάλι μπύρας ΕΛΕΥΣΙΣ σε ξύλινη επιφάνεια με έντονο φως", "ΕΛΕΥΣΙΣ beer bottle on a wooden surface in hard light"),
    blocks: [
      {
        kind: "row",
        tone: "grey",
        images: [
          img("eleusis/label-front", "Μπροστινή ετικέτα ΕΛΕΥΣΙΣ Pilsner", "ΕΛΕΥΣΙΣ Pilsner front label", { el: "Εμπρός όψη", en: "Front" }),
          img("eleusis/label-back", "Πίσω ετικέτα με κείμενο, συστατικά, QR και barcode", "Back label with text, ingredients, QR code and barcode", { el: "Πίσω όψη", en: "Back" }),
        ],
      },
      {
        kind: "statement",
        text: {
          el: "«Πρόκειται για ένα προϊόν βασισμένο σε ντόπια συνταγή που έφεραν οι Βαυαροί στα τέλη του 19ου αιώνα, χαμηλής ζύμωσης, με κυρίαρχο μπουκέτο τη βύνη, τον λυκίσκο και τα εσπεριδοειδή.»",
          en: "“A product based on a local recipe brought by the Bavarians at the end of the 19th century: bottom-fermented, with a bouquet led by malt, hops and citrus.”",
        },
        source: { el: "Από το κείμενο της πίσω ετικέτας", en: "From the back-label copy" },
      },
      {
        kind: "row",
        tone: "ink",
        images: [
          img("eleusis/bottle-front", "Το μπουκάλι από την μπροστινή πλευρά", "The bottle, front label facing"),
          img("eleusis/bottle-back", "Το μπουκάλι από την πίσω πλευρά", "The bottle, back label facing"),
        ],
      },
    ],
  },
  {
    slug: "cocktail-festival",
    number: "03",
    title: "Cocktail Festival",
    category: { el: "Αφίσα & εφαρμογές", en: "Poster & campaign" },
    context: { el: "Ανάθεση εργασίας", en: "Course assignment" },
    summary: {
      el: "Αφίσα για φεστιβάλ κοκτέιλ στην Τεχνόπολη και η τοποθέτησή της στην πόλη.",
      en: "A poster for a cocktail festival at Technopolis, and its life around the city.",
    },
    description: [
      {
        el: "Δημιουργία αφίσας και τοποθέτησή της σε διάφορους χώρους για την προβολή της: Φεστιβάλ Κοκτέιλ, Τεχνόπολη, Γκάζι, Αθήνα. Στάση λεωφορείου, banner, stand εισόδου και άλλες εφαρμογές.",
        en: "A poster for a cocktail festival at Technopolis in Gazi, Athens, placed across different settings to promote it: a bus shelter, banners, an entrance stand and more.",
      },
    ],
    deliverables: [
      { el: "Αφίσα", en: "Poster" },
      { el: "Στάση λεωφορείου", en: "Bus shelter" },
      { el: "Πινακίδα πεζοδρομίου", en: "A-frame sign" },
      { el: "Αψίδα εισόδου", en: "Entrance arch" },
      { el: "Roll-up banner", en: "Roll-up banner" },
    ],
    cover: img("cocktail-festival/poster", "Αφίσα Cocktail Festival με ποτήρι μαρτίνι και τρεις ελιές, 20–22 Ιουνίου 2025", "Cocktail Festival poster with a martini glass and three olives, 20–22 June 2025"),
    feature: img("cocktail-festival/poster", "Αφίσα Cocktail Festival με ποτήρι μαρτίνι και τρεις ελιές", "Cocktail Festival poster with a martini glass and three olives"),
    blocks: [
      {
        kind: "offset",
        side: "right",
        title: { el: "20–22 Ιουνίου 2025", en: "20–22 June 2025" },
        text: {
          el: "Ένα ποτήρι μαρτίνι σε ελεύθερη γραμμή, τρεις ελιές και ένας τίτλος σε δύο φωνές. Τεχνόπολη Δήμου Αθηναίων, Γκάζι.",
          en: "A martini glass in a loose line, three olives and a title in two voices. Technopolis, City of Athens, Gazi.",
        },
        image: img("cocktail-festival/poster", "Η αφίσα του Cocktail Festival", "The Cocktail Festival poster"),
      },
      {
        kind: "row",
        images: [
          img("cocktail-festival/bus-stop", "Η αφίσα σε στάση λεωφορείου", "The poster in a bus shelter", { el: "Στάση λεωφορείου", en: "Bus shelter" }),
          img("cocktail-festival/roll-up", "Roll-up banner του φεστιβάλ", "Festival roll-up banner", { el: "Roll-up", en: "Roll-up" }),
          img("cocktail-festival/wall-poster", "Η αφίσα σε τοίχο από τούβλα πάνω από παγκάκι", "The poster on a brick wall above a bench", { el: "Τοίχος", en: "Wall" }),
        ],
      },
      {
        kind: "row",
        tone: "grey",
        images: [
          img("cocktail-festival/a-frame", "Πινακίδα πεζοδρομίου με την αφίσα", "A-frame pavement sign with the poster", { el: "Πινακίδα πεζοδρομίου", en: "A-frame sign" }),
          img("cocktail-festival/entrance-arch", "Αψίδα εισόδου του φεστιβάλ ανάμεσα σε δέντρα", "Festival entrance arch among trees", { el: "Αψίδα εισόδου", en: "Entrance arch" }),
        ],
      },
    ],
  },
  {
    slug: "pillreminder",
    number: "04",
    title: "PillReminder",
    category: { el: "Εφαρμογή & λογότυπο", en: "App & logo" },
    context: { el: "Ψηφιακές Πολυμεσικές Διαδραστικές Εφαρμογές", en: "Digital Multimedia Interactive Applications" },
    year: "2025",
    summary: {
      el: "Εφαρμογή για την καταχώρηση φαρμάκων και την υπενθύμιση της λήψης τους.",
      en: "An app for logging medication and being reminded to take it.",
    },
    description: [
      {
        el: "Ανάθεση εργασίας: δημιουργία εφαρμογής και λογοτύπου. Το PillReminder είναι μια εφαρμογή για την καταχώρηση φαρμάκων και την υπενθύμιση για την κατανάλωσή τους.",
        en: "The brief: design an app and its logo. PillReminder is an app for registering medication and reminding you when to take it.",
      },
    ],
    deliverables: [
      { el: "Λογότυπο", en: "Logo" },
      { el: "Εικονίδιο εφαρμογής", en: "App icon" },
      { el: "Οθόνες εισαγωγής", en: "Onboarding screens" },
      { el: "Οθόνες εφαρμογής", en: "App screens" },
    ],
    cover: img("pillreminder/home-screen", "Το εικονίδιο PillReminder σε οθόνη κινητού δίπλα στο λογότυπο", "The PillReminder icon on a phone home screen beside the logo"),
    feature: img("pillreminder/screens-onboarding", "Τέσσερις οθόνες εισαγωγής της εφαρμογής PillReminder", "Four PillReminder onboarding screens"),
    blocks: [
      { kind: "wide", tone: "grey", image: img("pillreminder/home-screen", "Το εικονίδιο στην αρχική οθόνη και το λογότυπο PillReminder", "The icon on the home screen and the PillReminder logo") },
      {
        kind: "statement",
        text: { el: "«Για να μην ξεχάσεις ποτέ ξανά.»", en: "“So you never forget again.”" },
        source: { el: "Από τις οθόνες εισαγωγής", en: "From the onboarding screens" },
      },
      {
        kind: "wide",
        image: img("pillreminder/screens-onboarding", "Οθόνες εισαγωγής: καταγραφή δόσης, ιστορικό, υπενθυμίσεις, οργάνωση φαρμάκων", "Onboarding: dose logged, history, reminders, organising medication", {
          el: "Εισαγωγή: ιστορικό, υπενθυμίσεις, οργάνωση.",
          en: "Onboarding: history, reminders, organisation.",
        }),
      },
      {
        kind: "wide",
        image: img("pillreminder/screens-app", "Οθόνες εφαρμογής: ημερήσιο πρόγραμμα, νέο χάπι, ιστορικό λήψης, προφίλ", "App screens: daily schedule, new pill, intake history, profile", {
          el: "Ημερήσιο πρόγραμμα, προσθήκη χαπιού, ιστορικό λήψης, προφίλ.",
          en: "Daily schedule, adding a pill, intake history, profile.",
        }),
      },
    ],
  },
  {
    slug: "brochures",
    number: "05",
    title: "Brochures",
    category: { el: "Έντυπα & φυλλάδια", en: "Editorial & brochures" },
    context: { el: "Ανάθεση εργασίας", en: "Course assignments" },
    summary: {
      el: "Δύο τρίπτυχα: ένας οδηγός για τον Εθνικό Κήπο και μια αρχαιολογική έκθεση.",
      en: "Two tri-folds: a guide to the National Garden and an archaeological exhibition.",
    },
    description: [
      {
        el: "Δύο τρίπτυχα φυλλάδια. Το πρώτο συστήνει τον Εθνικό Κήπο της Αθήνας: το καφενείο, τις λίμνες, το Ζάππειο Μέγαρο, τον αθλητισμό και τον χάρτη του. Το δεύτερο συνοδεύει την αρχαιολογική έκθεση «Οι Αφροδίτες της Παλαιολιθικής Εποχής».",
        en: "Two tri-fold brochures. The first introduces the National Garden in Athens: its café, its ponds, the Zappeion, sport and a map. The second accompanies the archaeological exhibition “The Venuses of the Palaeolithic Era”.",
      },
    ],
    deliverables: [
      { el: "Τρίπτυχο Εθνικού Κήπου", en: "National Garden tri-fold" },
      { el: "Τρίπτυχο έκθεσης", en: "Exhibition tri-fold" },
    ],
    cover: img("editorial/venus-inside", "Εσωτερικό τριπτύχου με τις Αφροδίτες του Willendorf, της Dolní Věstonice και του Hohle Fels", "Inside of the tri-fold with the Venuses of Willendorf, Dolní Věstonice and Hohle Fels"),
    feature: img("editorial/venus-inside", "Εσωτερικό τριπτύχου για την έκθεση «Οι Αφροδίτες της Παλαιολιθικής Εποχής»", "Inside of the tri-fold for “The Venuses of the Palaeolithic Era”"),
    blocks: [
      {
        kind: "wide",
        image: img("editorial/national-garden-outside", "Τρίπτυχο Εθνικού Κήπου: καφενείο, χάρτης, εξώφυλλο", "National Garden tri-fold: café, map, cover", {
          el: "Εθνικός Κήπος — καφενείο, χάρτης, εξώφυλλο.",
          en: "National Garden — café, map, cover.",
        }),
      },
      {
        kind: "wide",
        image: img("editorial/national-garden-inside", "Τρίπτυχο Εθνικού Κήπου: λίμνες, Ζάππειο Μέγαρο, αθλητισμός", "National Garden tri-fold: ponds, Zappeion, sport", {
          el: "Λίμνες, Ζάππειο Μέγαρο, αθλητισμός.",
          en: "Ponds, the Zappeion, sport.",
        }),
      },
      {
        kind: "statement",
        tone: "ink",
        text: { el: "Οι Αφροδίτες της Παλαιολιθικής Εποχής", en: "The Venuses of the Palaeolithic Era" },
        source: { el: "Αρχαιολογική έκθεση, 3 Σεπτεμβρίου – 20 Δεκεμβρίου 2023", en: "Archaeological exhibition, 3 September – 20 December 2023" },
      },
      {
        kind: "wide",
        tone: "ink",
        image: img("editorial/venus-outside", "Εξωτερικό τριπτύχου της έκθεσης με εξώφυλλο και πληροφορίες", "Outside of the exhibition tri-fold with cover and visitor information"),
      },
      {
        kind: "wide",
        tone: "ink",
        image: img("editorial/venus-inside", "Εσωτερικό τριπτύχου: Willendorf, Dolní Věstonice, Hohle Fels", "Inside of the tri-fold: Willendorf, Dolní Věstonice, Hohle Fels"),
      },
    ],
  },
  {
    slug: "posters",
    number: "06",
    title: "Posters",
    category: { el: "Αφίσες", en: "Posters" },
    context: { el: "Ανάθεση εργασίας", en: "Course assignments" },
    summary: {
      el: "Αφίσες για θέατρο, βιβλίο και τον Εθνικό Κήπο.",
      en: "Posters for theatre, a book presentation and the National Garden.",
    },
    description: [
      {
        el: "Αφίσες οπτικής επικοινωνίας: μια παρουσίαση λογοτεχνικού βιβλίου, ο μονόλογος «Η μηχανή του Τούρινγκ» του Μπενουά Σολές και μια σειρά τριών αφισών για τον Εθνικό Κήπο με την ερώτηση «Εσύ έχεις πάει;».",
        en: "Visual communication posters: a literary book presentation, Benoît Solès’ monologue “The Turing Machine”, and a series of three posters for the National Garden asking “Have you been?”.",
      },
    ],
    deliverables: [
      { el: "Αφίσα παρουσίασης βιβλίου", en: "Book presentation poster" },
      { el: "Θεατρική αφίσα", en: "Theatre poster" },
      { el: "Σειρά τριών αφισών", en: "Series of three posters" },
    ],
    cover: img("posters/timeless-values", "Αφίσα «Αξίες διαχρονικές και πανανθρώπινες» με περιστέρι πάνω από νυχτερινό κτίριο", "“Timeless and universal values” poster with a dove over a building at night"),
    feature: img("posters/turing-machine", "Θεατρική αφίσα «Η μηχανή του Τούρινγκ» με τρεις κόκκινους δίσκους", "Theatre poster “The Turing Machine” with three red-rimmed dials"),
    blocks: [
      {
        kind: "row",
        tone: "grey",
        images: [
          img("posters/timeless-values", "Αφίσα παρουσίασης βιβλίου «Από την τέχνη στις αξίες»", "Book presentation poster “From art to values”", {
            el: "«Αξίες διαχρονικές και πανανθρώπινες» — παρουσίαση βιβλίου.",
            en: "“Timeless and universal values” — book presentation.",
          }),
          img("posters/turing-machine", "Θεατρική αφίσα «Η μηχανή του Τούρινγκ»", "Theatre poster “The Turing Machine”", {
            el: "«Η μηχανή του Τούρινγκ» — μονόλογος.",
            en: "“The Turing Machine” — a monologue.",
          }),
        ],
      },
      {
        kind: "statement",
        text: { el: "Εσύ έχεις πάει;", en: "Have you been?" },
        source: { el: "Πολιτισμικά μονοπάτια Αθήνας — σειρά αφισών για τον Εθνικό Κήπο", en: "Cultural paths of Athens — a poster series for the National Garden" },
      },
      {
        kind: "row",
        images: [
          img("posters/national-garden-sport", "Αφίσα «Εθνικός Κήπος και αθλητισμός» με ποδηλάτη", "“National Garden and sport” poster with a cyclist", { el: "Και αθλητισμός", en: "And sport" }),
          img("posters/national-garden-green", "Αφίσα «Εθνικός Κήπος και χώρος πρασίνου» με φοίνικες", "“National Garden and green space” poster with palm trees", { el: "Και χώρος πρασίνου", en: "And green space" }),
          img("posters/national-garden-history", "Αφίσα «Εθνικός Κήπος και σύγχρονη ιστορία» με το Ζάππειο", "“National Garden and modern history” poster with the Zappeion", { el: "Και σύγχρονη ιστορία", en: "And modern history" }),
        ],
      },
    ],
  },
  {
    slug: "at-care",
    number: "07",
    title: "At Care",
    category: { el: "Social media", en: "Social media" },
    context: { el: "Πρακτική άσκηση", en: "Internship" },
    year: "2025",
    summary: {
      el: "Posts για τα social media των BIO TONICS και KRAUTERHOF.",
      en: "Social media posts for BIO TONICS and KRAUTERHOF.",
    },
    description: [
      {
        el: "Η πρακτική μου άσκηση πραγματοποιήθηκε στην εταιρεία At Care, που διαθέτει συμπληρώματα διατροφής και άλλα προϊόντα. Η δουλειά μου ήταν η ανάδειξη των προϊόντων μέσα από posts στα social media.",
        en: "My internship took place at At Care, a company supplying dietary supplements and other products. My role was to bring the products forward through social media posts.",
      },
    ],
    deliverables: [
      { el: "Posts BIO TONICS", en: "BIO TONICS posts" },
      { el: "Posts KRAUTERHOF", en: "KRAUTERHOF posts" },
    ],
    cover: img("at-care/krauterhof-warming-balm", "Post KRAUTERHOF: χέρι παίρνει βάλσαμο από το βάζο", "KRAUTERHOF post: a hand taking balm from the jar"),
    feature: img("at-care/bio-tonics-curcumin", "Post BIO TONICS για το Curcumi Plus", "BIO TONICS post for Curcumi Plus"),
    blocks: [
      {
        kind: "row",
        title: { el: "BIO TONICS", en: "BIO TONICS" },
        images: [
          img("at-care/bio-tonics-curcumin", "Post BIO TONICS: κουρκουμάς με πιπερίνη", "BIO TONICS post: turmeric with piperine"),
          img("at-care/bio-tonics-lipotropin", "Post BIO TONICS: μεταβολισμός σε δράση", "BIO TONICS post: metabolism in action"),
          img("at-care/bio-tonics-tribulus", "Post BIO TONICS: βιολογικό εκχύλισμα Tribulus", "BIO TONICS post: organic Tribulus extract"),
        ],
      },
      {
        kind: "row",
        tone: "grey",
        title: { el: "KRAUTERHOF", en: "KRAUTERHOF" },
        images: [
          img("at-care/krauterhof-cooling-gel", "Post KRAUTERHOF: ψυκτικό φυτικό gel", "KRAUTERHOF post: cooling herbal gel"),
          img("at-care/krauterhof-warming-balm", "Post KRAUTERHOF: βάλσαμο με σφραγίδα Dermatest", "KRAUTERHOF post: balm with the Dermatest seal"),
          img("at-care/krauterhof-arnica", "Post KRAUTERHOF: αλοιφή άρνικας", "KRAUTERHOF post: arnica ointment"),
        ],
      },
    ],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
