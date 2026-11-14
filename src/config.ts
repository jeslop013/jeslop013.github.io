// ─────────────────────────────────────────────────────────────
//  Site-wide settings. Edit these and the whole site updates.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: 'Jesús A. Moreno López',
  shortName: 'Jesús Moreno',
  role: 'Researcher at Fondazione Bruno Kessler',
  tagline: 'Agent-based models of mobility, epidemics & cooperation.',
  description:
    'Jesús A. Moreno López — physicist building data-driven agent-based models and digital twins of cities, epidemics and human–AI cooperation.',
  location: 'Trento, Italy',
  photo: '/images/photo.png',

  // Public contact. (Phone number and personal email are deliberately left out.)
  email: 'jmorenolopez@fbk.eu',

  // Leave empty ('') to hide. Once you have it, e.g. 'jesusmoreno.bsky.social'
  bluesky: '',

  // Put a public PDF in /public/cv/ and write its path here to show a download button,
  // e.g. '/cv/CV_Jesus_Moreno.pdf'. Left empty for now: your current PDFs contain your phone number.
  cvPdf: '',

  links: [
    { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=0aDu28kAAAAJ' },
    { label: 'MoST · FBK', href: 'https://most.fbk.eu/' },
    { label: 'Civic Digital Twins', href: 'https://github.com/fbk-most/civic-digital-twins' },
    // { label: 'ORCID', href: 'https://orcid.org/0000-0000-0000-0000' },
    // { label: 'GitHub', href: 'https://github.com/your-username' },
  ],
};

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'CV', href: '/cv/' },
  { label: 'Science', href: '/science/' },
  { label: 'Variety', href: '/variety/' },
];
