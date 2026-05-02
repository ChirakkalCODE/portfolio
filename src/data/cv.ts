/**
 * Single Source of Truth — Lebenslauf
 * --------------------------------------------------------------------------
 * ALLE Texte für Webseite UND PDF kommen aus diesem File.
 * Eine Änderung hier landet beim nächsten `npm run build` in beiden Outputs.
 *
 * Was ich (Fesin) selbst noch ausfüllen muss → markiert mit TODO.
 */

export interface CVData {
  meta: {
    seekingRole: string;
    seekingFrom: string;        // z.B. "August 2026"
    location: string;           // z.B. "Region Basel"
  };
  personal: {
    firstName: string;
    lastName: string;
    birthYear: number;
    citizenship: string;
    permits: string[];
    address: { street: string; postcode: string; city: string };
    contact: {
      email: string;
      phone: string;
      website: string;
      github: string;
      linkedin?: string;
    };
  };
  positioning: {
    role: string;
    headlineHero: string;       // große H1 auf Webseite (HTML erlaubt: <em>)
    eyebrow: string;            // kleines Label über H1
    summary: string;            // 2-3 Sätze (HTML erlaubt: <strong>, <code>)
  };
  education: Array<{
    institution: string;
    degree: string;
    location: string;
    period: string;
    note?: string;
  }>;
  experience: Array<{
    organization: string;
    role: string;
    location: string;
    period: string;
    bullets: string[];
  }>;
  projects: Array<{
    name: string;
    role: string;
    period: string;
    tech: string[];
    problem: string;            // 1 Satz
    contribution: string;       // 2 Sätze
    learning: string;           // 1 Satz
    links?: { live?: string; github?: string };
  }>;
  skills: Array<{
    group: string;
    items: string[];
    where?: string;             // wo eingesetzt — für Webseiten-Stack-Sektion
  }>;
  languages: Array<{ name: string; level: string; native?: boolean }>;
  interests: string[];
  references?: Array<{
    name: string;
    role: string;
    email?: string;
    phone?: string;
    location?: string;
  }>;
}

export const cv: CVData = {
  meta: {
    seekingRole: 'Praktikum / Lernender-Position Software-Entwicklung',
    // TODO: konkretes Startdatum eintragen (z.B. "Juli 2026")
    seekingFrom: '[TODO: Datum]',
    location: 'Region Basel · Remote möglich',
  },

  personal: {
    firstName: 'Fesin',
    lastName: 'Chirakkal',
    birthYear: 2006,
    citizenship: 'Österreich',
    permits: ['Ausweis C (Schweiz)', 'Führerausweis Kat. B'],
    address: {
      street: 'Steinrebenstrasse 40',
      postcode: '4153',
      city: 'Reinach BL',
    },
    contact: {
      email: 'c.fesin2006@gmail.com',
      phone: '+41 76 666 56 84',
      website: 'chirakkalcode.github.io/portfolio',
      github: 'github.com/ChirakkalCODE',
      // TODO: LinkedIn-URL eintragen (z.B. "linkedin.com/in/fesin-chirakkal")
      linkedin: undefined,
    },
  },

  positioning: {
    role: 'Lernender Informatiker · IMS Basel',
    eyebrow: 'Lernender Informatiker · IMS Basel',
    headlineHero: 'Lernender, der nebenbei <em>liefert</em>.',
    summary:
      'Ich bin <strong>Fesin</strong>, 20, in Ausbildung zur ' +
      '<code>BM &amp; EFZ Informatik</code> an der IMS Basel. ' +
      'Daneben baue ich seit 2025 als Co-Founder von ' +
      '<strong>NXT Vision Studio</strong> Webseiten und Automatisierungen ' +
      'für KMU — als Beweis, dass ich neben der Schule eigenständig ' +
      'Projekte umsetze.',
  },

  education: [
    {
      institution: 'Informatikmittelschule Basel-Stadt',
      degree: 'Berufsmaturität (BM) & Eidg. Fähigkeitszeugnis (EFZ) Informatik',
      location: 'Basel',
      period: '2024 → Juli 2027',
      note: 'Abschluss geplant Juli 2027',
    },
    {
      institution: 'Sekundarschule Reinach',
      degree: 'Niveau P',
      location: 'Reinach BL',
      period: 'bis Juli 2022',
    },
  ],

  experience: [
    {
      organization: 'NXT Vision Studio',
      role: 'Co-Founder · IT Lead',
      location: 'Basel / Remote',
      period: '2025 → heute',
      bullets: [
        'Mitgründer eines digitalen Studios mit Fokus auf Web, KI-Automatisierung und Growth-Systeme für KMU.',
        'Technische Leitung aller Kundenprojekte: Konzept, Entwicklung, Deployment und laufende Optimierung.',
        'Aufbau von KI-gestützten Automatisierungen (Lead-Nurturing, ManyChat-Chatbots, CRM-Integration).',
        'Implementierung von Tracking-Infrastruktur: GA4, Google Tag Manager, Meta Pixel.',
        'Aktive Kundenbetreuung in drei Branchen: Fitness-Fashion, Gastronomie, Luxusgüter.',
      ],
    },
    {
      organization: 'Snithan Fahrschule',
      role: 'Webprojekt (Freelance)',
      location: 'Münchenstein BL',
      period: 'März 2025 → heute',
      bullets: [
        'Planung und Umsetzung einer kompletten Kundenwebseite — von Konzept bis Deployment.',
        'Responsives Webdesign für Desktop, Tablet und Mobile.',
        'Umsetzung mit HTML, CSS, JavaScript und React.',
      ],
    },
    {
      organization: 'Aumatt Seniorenzentrum',
      role: 'Hotellerie-Fachkraft (Praktikum)',
      location: 'Reinach BL',
      period: 'Juli 2023 → August 2023',
      bullets: [
        'Betreuung der Senioren, Teamarbeit und organisatorische Unterstützung.',
      ],
    },
    {
      organization: 'Jump Factory',
      role: 'All-Rounder',
      location: 'Basel-Stadt',
      // TODO: konkreten Zeitraum eintragen (im CV unklar formuliert)
      period: '[TODO: Zeitraum]',
      bullets: [
        'Gästebetreuung, Service und organisatorische Aufgaben in einem dynamischen Freizeitbetrieb.',
      ],
    },
  ],

  projects: [
    {
      name: 'Snithan Fahrschule',
      role: 'Freelance · Konzept, Entwicklung, Deployment',
      period: 'März 2025 → heute',
      tech: ['React', 'JavaScript', 'CSS'],
      // TODO: 1 Satz — was war konkret zu lösen?
      problem: '[TODO: Was war zu lösen? 1 Satz, kein Marketing.]',
      // TODO: 2 Sätze — Tech + Entscheidung
      contribution: '[TODO: Was hast du konkret gebaut? Welche Tech, warum diese Wahl? 2 Sätze.]',
      // TODO: 1 ehrlicher Satz
      learning: '[TODO: 1 ehrlicher Satz. Was war neu/schwierig?]',
      links: {
        // TODO: Live-Link oder undefined lassen
        live: undefined,
        // TODO: GitHub-Link oder undefined lassen
        github: undefined,
      },
    },
    {
      name: 'Fitness-Fashion Brand',
      role: 'NXT Vision Studio · Web + Tracking',
      period: '2025',
      tech: ['Framer', 'GA4', 'Meta Pixel', 'ManyChat'],
      problem: '[TODO: Was war zu lösen? 1 Satz.]',
      contribution: '[TODO: Was hast du konkret gebaut? 2 Sätze.]',
      learning: '[TODO: 1 ehrlicher Satz.]',
      links: { live: undefined, github: undefined },
    },
    {
      name: 'Kaffee-Bar',
      role: 'NXT Vision Studio · Web + CRM',
      period: '2025',
      tech: ['Framer', 'CRM', 'GA4'],
      problem: '[TODO: Was war zu lösen? 1 Satz.]',
      contribution: '[TODO: Was hast du konkret gebaut? 2 Sätze.]',
      learning: '[TODO: 1 ehrlicher Satz.]',
      links: { live: undefined, github: undefined },
    },
    {
      name: 'Luxury / Zigarren',
      role: 'NXT Vision Studio · Brand + KI',
      period: '2025',
      tech: ['Framer', 'KI-Automation'],
      problem: '[TODO: Was war zu lösen? 1 Satz.]',
      contribution: '[TODO: Was hast du konkret gebaut? 2 Sätze.]',
      learning: '[TODO: 1 ehrlicher Satz.]',
      links: { live: undefined, github: undefined },
    },
  ],

  skills: [
    {
      group: 'Programmiersprachen',
      items: ['Python', 'Java', 'JavaScript', 'PHP', 'C#'],
      // TODO: konkrete Schul-/Lern-Projekte eintragen
      where: 'IMS Basel (Schulprojekte und Module). [TODO: konkrete Beispiele eintragen, z.B. "Java für Modul 226"]',
    },
    {
      group: 'Web & UI',
      items: ['HTML', 'CSS', 'React', 'Framer', 'Figma'],
      where: 'Snithan Fahrschule, NXT Vision Studio Kunden-Webseiten.',
    },
    {
      group: 'Daten & Versionierung',
      items: ['MySQL', 'Git', 'GitHub'],
      // TODO: wo MySQL konkret eingesetzt?
      where: 'Git in allen eigenen Projekten und Schulabgaben. [TODO: MySQL-Einsatz nennen]',
    },
    {
      group: 'Marketing-Tech',
      items: ['GA4', 'Google Tag Manager', 'Meta Pixel', 'ManyChat'],
      where: 'Tracking- und Automation-Setup für NXT Vision Studio Kunden.',
    },
    {
      group: 'Methoden',
      items: ['No-Code / Low-Code', 'Responsive Design', 'UI/UX'],
      where: 'Querschnittlich in allen Studio-Projekten.',
    },
  ],

  languages: [
    { name: 'Deutsch', level: 'Muttersprache', native: true },
    { name: 'Malayalam', level: 'Muttersprache', native: true },
    { name: 'Englisch', level: 'C1 — sehr gute Kenntnisse' },
    { name: 'Français', level: 'B1 — gute Kenntnisse' },
  ],

  interests: [
    'Thai-Boxen — Shogun Team Basel, seit 2025',
    'Volleyball — VBC Arlesheim-Binningen, seit 2018',
    'Badminton im Verein KCSC Sports',
  ],

  references: [
    {
      name: 'Merwin Mudavamkunnel',
      role: 'IT-Mentor',
      email: 'merwingeee@gmail.com',
      phone: '+41 76 470 66 00',
      location: 'Liestal',
    },
  ],
};

/**
 * Build-Datum — wird bei jedem `npm run build` neu ausgewertet,
 * weil Astro-Frontmatter zur Build-Zeit läuft.
 */
export const lastBuildDate = new Date();

export function formatBuildDate(d: Date = lastBuildDate): string {
  return d.toLocaleDateString('de-CH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
