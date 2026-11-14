// ─────────────────────────────────────────────────────────────
//  Site-wide settings. Edit these and the whole site updates.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: 'Jesús A. Moreno López',
  shortName: 'Jesús A. Moreno López',
  role: 'Researcher at Fondazione Bruno Kessler',
  description:
    'Jesús A. Moreno López. Researcher at Fondazione Bruno Kessler. Interdisciplinary science and complexity.',
  photo: '/images/photo.png',

  // Contact address. It is NOT written into the HTML as plain text.
  // The <Email /> component stores it in two reversed parts and builds the link
  // in the browser, so most scraping bots do not find it.
  // Set both to '' to remove email from the site.
  emailUser: 'jmorenolopez',
  emailDomain: 'fbk.eu',

  // Leave empty ('') to hide. For example: 'jesusmoreno.bsky.social'
  bluesky: 'jeslop013.bsky.social',

  // Path to a public PDF in /public/cv/, for example '/cv/CV_Jesus_Moreno.pdf'.
  // Empty = no download link. Remove phone, birth date and personal email from the PDF first.
  cvPdf: '',

  links: [
    { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=0aDu28kAAAAJ' },
    { label: 'MoST (FBK)', href: 'https://most.fbk.eu/' },
    { label: 'Civic Digital Twins', href: 'https://github.com/fbk-most/civic-digital-twins' },
  ],
};

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'CV', href: '/cv/' },
  { label: 'Science', href: '/science/' },
  { label: 'Variety', href: '/variety/' },
];
