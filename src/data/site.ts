/* ──────────────────────────────────────────────────────────────────────────
   SITE — biography, contact details, the PDF and interface wording.
   Edit text here; components read everything from this file.
   ────────────────────────────────────────────────────────────────────────── */
import type { L } from "./projects";

export const site = {
  name: { el: "Δήμητρα Μαργιώλα", en: "Dimitra Margiola" } as L,
  /** The two lines of the large name on the first screen (set in capitals). */
  heroLines: { el: ["ΔΗΜΗΤΡΑ", "ΜΑΡΓΙΩΛΑ."], en: ["DIMITRA", "MARGIOLA."] },
  role: { el: "Γραφίστρια", en: "Graphic designer" } as L,
  disciplines: { el: "Οπτική ταυτότητα, έντυπο, ψηφιακό", en: "Visual identity, editorial, digital" } as L,
  intro: {
    el: "Μινιμαλιστική αισθητική με χειροποίητη πινελιά: ταυτότητες, συσκευασίες, έντυπα και αφίσες.",
    en: "Minimal form with a handmade touch: identities, packaging, print and posters.",
  } as L,

  bio: [
    {
      el: "Ονομάζομαι Δήμητρα Μαργιώλα και είμαι τελειόφοιτη στο Τμήμα Γραφιστικής και Οπτικής Επικοινωνίας του Πανεπιστημίου Δυτικής Αττικής. Έχω ολοκληρώσει την πρακτική μου άσκηση, όπως και την πτυχιακή μου εργασία.",
      en: "I’m Dimitra Margiola, a final-year student in the Department of Graphic Design and Visual Communication at the University of West Attica. I have completed both my internship and my graduation thesis.",
    },
    {
      el: "Κατά τη διάρκεια των σπουδών μου εξειδικεύτηκα σε θέματα οπτικής επικοινωνίας και δημιουργικού σχεδιασμού. Μέσα από τις εργασίες και τα projects ανέπτυξα δεξιότητες στον σχεδιασμό λογοτύπων, αφισών, εντύπων, ψηφιακού περιεχομένου και στο branding.",
      en: "During my studies I specialised in visual communication and creative design. Through coursework and projects I developed skills in designing logos, posters, printed matter, digital content and brands.",
    },
    {
      el: "Λατρεύω τη μινιμαλιστική αισθητική και τη χειροποίητη προσέγγιση στη γραφιστική.",
      en: "I love a minimal aesthetic and a handmade approach to graphic design.",
    },
  ] as L[],
  /** The line set large at the top of the About section. */
  belief: {
    el: "Πιστεύω πως η απλότητα, όταν συνδυάζεται με την ανθρώπινη πινελιά, δημιουργεί τα πιο δυνατά brands.",
    en: "I believe simplicity, joined with a human touch, makes the strongest brands.",
  } as L,

  facts: [
    {
      label: { el: "Σπουδές", en: "Education" },
      value: { el: "Πανεπιστήμιο Δυτικής Αττικής, Τμήμα Γραφιστικής και Οπτικής Επικοινωνίας", en: "University of West Attica, Graphic Design and Visual Communication" },
      when: "2021–2027",
    },
    {
      label: { el: "Εμπειρία", en: "Experience" },
      value: { el: "Πρακτική άσκηση, At Care: posts για τα social media συμπληρωμάτων διατροφής και άλλων προϊόντων", en: "Internship, At Care: social media posts promoting dietary supplements and other products" },
      when: { el: "Νοε–Δεκ 2025", en: "Nov–Dec 2025" },
    },
    {
      label: { el: "Πτυχιακή", en: "Thesis" },
      value: { el: "AFILTRARISTO, ταυτότητα για wine bar με αφιλτράριστα κρασιά", en: "AFILTRARISTO, an identity for an unfiltered-wine bar" },
      when: "2026",
    },
  ] as { label: L; value: L; when: string | L }[],

  skills: [
    { el: "Λογότυπα", en: "Logos" },
    { el: "Branding", en: "Branding" },
    { el: "Συσκευασία", en: "Packaging" },
    { el: "Αφίσες", en: "Posters" },
    { el: "Έντυπα", en: "Print" },
    { el: "Ψηφιακό περιεχόμενο", en: "Digital content" },
  ] as L[],

  contact: {
    email: "demmymargiola@gmail.com",
    /** Shown as written; `phoneHref` is the dialable international form. */
    phone: "698 780 8030",
    phoneHref: "tel:+306987808030",
  },

  pdf: {
    /** File in /public. The download is saved under `downloadName`. */
    file: "Dimitra-Margiola-Portfolio-2026.pdf",
    downloadName: "Dimitra-Margiola-Portfolio-2026.pdf",
    sizeLabel: "47 MB",
  },

  seo: {
    title: { el: "Δήμητρα Μαργιώλα — Γραφίστρια", en: "Dimitra Margiola — Graphic Designer" } as L,
    description: {
      el: "Portfolio της γραφίστριας Δήμητρας Μαργιώλα: οπτική ταυτότητα, συσκευασία, έντυπο, αφίσες και ψηφιακός σχεδιασμός.",
      en: "Portfolio of graphic designer Dimitra Margiola: visual identity, packaging, editorial, posters and digital design.",
    } as L,
  },
};

/** Interface wording. */
export const ui = {
  work: { el: "Έργα", en: "Work" },
  about: { el: "Σχετικά", en: "About" },
  contact: { el: "Επικοινωνία", en: "Contact" },
  menu: { el: "Μενού", en: "Menu" },
  close: { el: "Κλείσιμο", en: "Close" },
  seeWork: { el: "Δες τα έργα", en: "See the work" },
  selectedWork: { el: "Επιλεγμένα έργα", en: "Selected work" },
  viewProject: { el: "Δες το project", en: "View project" },
  viewPdf: { el: "Δες το PDF", en: "View PDF" },
  downloadPdf: { el: "Λήψη PDF", en: "Download PDF" },
  originalPortfolio: { el: "Το πρωτότυπο portfolio", en: "The original portfolio" },
  pdfNote: {
    el: "Όλο το portfolio σε 18 σελίδες, όπως σχεδιάστηκε.",
    en: "The complete portfolio in 18 pages, as designed.",
  },
  category: { el: "Κατηγορία", en: "Category" },
  context: { el: "Πλαίσιο", en: "Context" },
  year: { el: "Έτος", en: "Year" },
  deliverables: { el: "Παραδοτέα", en: "Deliverables" },
  next: { el: "Επόμενο", en: "Next" },
  allWork: { el: "Όλα τα έργα", en: "All work" },
  email: { el: "Email", en: "Email" },
  phone: { el: "Τηλέφωνο", en: "Phone" },
  sayHello: { el: "Γεια σου.", en: "Say hello." },
  writeMe: { el: "Στείλε μου email", en: "Email me" },
  backToTop: { el: "Επάνω", en: "Back to top" },
  openImage: { el: "Άνοιγμα σε πλήρες μέγεθος", en: "Open full size" },
  previous: { el: "Προηγούμενη", en: "Previous" },
  nextImage: { el: "Επόμενη", en: "Next" },
  skills: { el: "Δεξιότητες", en: "Skills" },
  notFound: { el: "Η σελίδα δεν βρέθηκε.", en: "Page not found." },
  home: { el: "Αρχική", en: "Home" },
  language: { el: "Γλώσσα", en: "Language" },
  skip: { el: "Μετάβαση στο περιεχόμενο", en: "Skip to content" },
  mailSubject: { el: "Γεια σου Δήμητρα", en: "Hello Dimitra" },
} satisfies Record<string, L>;
