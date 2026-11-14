// ─────────────────────────────────────────────────────────────
//  All CV content lives here. Edit this file to update the CV page.
//  Source: CV_Jesus_Moreno.pdf. Text is short on purpose (STE style).
//  Dates: `start` and optional `end` (years). No `end` = ongoing.
// ─────────────────────────────────────────────────────────────

// Formats a date range: 2020 / 2020 – 2024 / 2024 – present
export const span = (x: { start: number; end?: number }) =>
  x.end === undefined ? `${x.start} – present` : x.end === x.start ? `${x.start}` : `${x.start} – ${x.end}`;

// A project is current when it has no end year, or ends this year or later.
export const isCurrent = (x: { end?: number }) => x.end === undefined || x.end >= new Date().getFullYear();

// ── Research themes (front page). `figure` = file in src/figures/ without .svg.
//    Unused figures: 'fuze', 'tracing'. Remove or reorder entries freely.
export const themes = [
  {
    title: 'Urban mobility',
    text: 'Agent-based models of how people move in cities, and of the effect of transport policy.',
    figure: 'mimos',
    links: [{ label: 'Next4Mob', href: '/cv/#next4mob' }],
  },
  {
    title: 'Epidemics',
    text: 'How mobility and contacts spread disease, and which interventions stop it.',
    figure: 'critical',
    links: [
      { label: 'Sci. Rep. 2025', href: 'https://doi.org/10.1038/s41598-025-86759-5' },
      { label: 'Sci. Adv. 2021', href: 'https://doi.org/10.1126/sciadv.abd8750' },
    ],
  },
  {
    title: 'Cooperation with AI',
    text: 'Theory and experiments on how AI agents change human cooperation.',
    figure: 'cooperation',
    links: [
      { label: 'ChaLueCo', href: '/cv/#chalueco' },
      { label: 'J. R. Soc. Interface 2024', href: 'https://doi.org/10.1098/rsif.2024.0212' },
    ],
  },
  {
    title: 'Digital twins & uncertainty',
    text: 'Civic digital twins with sensitivity and uncertainty analysis, to support policy decisions.',
    figure: 'digitaltwin',
    links: [
      { label: 'BDT', href: '/cv/#bdt' },
      { label: 'HARMONIE', href: '/cv/#harmonie' },
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  start: number;
  end?: number; // leave out while the project runs
  role: string;
  where: string;
  summary: string;
  link?: string;
};

export const projects: Project[] = [
  {
    id: 'chalueco',
    title: 'ChaLueCo: I Chat thus I Cooperate. Humans and AIs in Complex Environments',
    start: 2024,
    role: 'Co-Principal Investigator',
    where: 'IFISC (CSIC-UIB). Funded by Fundación COTEC (20 000 €)',
    summary:
      'AI agents now communicate with humans. We study how AI bots can increase human cooperation. We use theory and experiments.',
  },
  {
    id: 'bdt',
    title: 'BDT: Bologna Digital Twin',
    start: 2023,
    role: 'Researcher',
    where: 'MoST (FBK)',
    summary:
      'The Municipality of Bologna promotes this project. The digital twin is a dynamic model of the city. Data from stakeholders and citizens feed the model. The model supports decisions on public policy.',
    link: 'https://fondazioneiu.it/progetto/gemello-digitale/',
  },
  {
    id: 'harmonie',
    title: 'HARMONIE',
    start: 2025,
    role: 'Researcher',
    where: 'MoST (FBK). EU-funded',
    summary:
      'HARMONIE gives cities tools to monitor and model air and noise pollution. The tools also estimate the short- and long-term health effects of urban policies.',
    link: 'https://harmonie-project.eu/',
  },
  {
    id: 'aixpa',
    title: 'AIxPA',
    start: 2024,
    role: 'Researcher',
    where: 'MoST (FBK)',
    summary:
      'AIxPA makes an AI solution for public administrations. It uses available data to support decisions and to make services more efficient. It obeys ethics and the law.',
    link: 'https://sites.fbk.eu/aixpa-en/',
  },
  {
    id: 'apasos',
    title: 'APASOS: A Physics Approach to Socio-technical Systems. From Theory to Data Analysis',
    start: 2022,
    role: 'Researcher',
    where: 'IFISC (CSIC-UIB)',
    summary: 'We use mathematics, computation, data and physics to model socio-technical systems.',
  },
  {
    id: 'siesta',
    title: 'SIESTA: Secure Interactive Environments for Sensitive Data Analytics',
    start: 2024,
    role: 'Researcher',
    where: 'IFISC (CSIC-UIB)',
    summary: 'SIESTA gives tools and methods to share sensitive data safely in the European Open Science Cloud.',
  },
  {
    id: 'next4mob',
    title: 'Next4Mob: Next Generation Tools for Advanced Mobility Solutions',
    start: 2021, end: 2025,
    role: 'Researcher',
    where: 'IFISC (CSIC-UIB)',
    summary:
      'We made urban mobility models. The main result is a tool for policy makers and transport planners. It measures the environmental and social effects of transport policies, also during rare high-impact events such as a pandemic.',
  },
  {
    id: 'pacss',
    title: 'PACSS: Physics Approach to Complexity in Socio-technical Systems',
    start: 2020, end: 2022,
    role: 'Researcher',
    where: 'IFISC (CSIC-UIB)',
    summary: 'We studied socio-technical systems with complex-systems models and large data sets.',
  },
  {
    id: 'emergence-paris',
    title: 'Emergence de la Ville de Paris',
    start: 2020, end: 2020,
    role: 'Intern',
    where: 'IPLESP (INSERM)',
    summary:
      'CompFlu: computational study of the virological, epidemiological and sociodemographic drivers of influenza.',
  },
];

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: string;
  doi?: string;
};

export const publications: Publication[] = [
  {
    title: 'Critical mobility in policy making for epidemic containment',
    authors: 'J. A. Moreno López, D. Mateo, A. Hernando, S. Meloni, J. J. Ramasco',
    venue: 'Scientific Reports',
    year: '2025',
    doi: '10.1038/s41598-025-86759-5',
  },
  {
    title: 'An Agent-Based Journey in Social Systems Research: Motivations & Applications',
    authors: 'J. A. Moreno López, J. J. Ramasco, S. Meloni',
    venue: 'Doctoral thesis',
    year: '2025',
  },
  {
    title: 'Emergence of cooperation in the one-shot Prisoner’s dilemma through Discriminatory and Samaritan AIs',
    authors: 'F. Zimmaro, M. Miranda, J. M. Ramos Fernández, J. A. Moreno López, M. Reddel, V. Widler, A. Antonioni, T. A. Han',
    venue: 'Journal of the Royal Society Interface',
    year: '2024',
    doi: '10.1098/rsif.2024.0212',
  },
  {
    title: 'Anatomy of digital contact tracing: Role of age, transmission setting, adoption, and case detection',
    authors: 'J. A. Moreno López, B. Arregui García, P. Bentkowski, L. Bioglio, F. Pinotti, P.-Y. Boëlle, A. Barrat, V. Colizza, C. Poletto',
    venue: 'Science Advances',
    year: '2021',
    doi: '10.1126/sciadv.abd8750',
  },
];

export const positions = [
  { start: 2025, title: 'Researcher', where: 'Fondazione Bruno Kessler', note: 'Modeling and Simulation of Socio-Technical Systems (MoST). Civic Digital Twins framework.' },
  { start: 2024, end: 2025, title: 'Research Assistant', where: 'IFISC (CSIC-UIB)', note: '' },
  { start: 2020, end: 2024, title: 'Pre-doctoral Researcher', where: 'IFISC (CSIC-UIB)', note: '' },
  { start: 2020, end: 2020, title: 'Intern', where: 'IPLESP (INSERM)', note: 'Three months. Modeling and prevention of COVID-19.' },
];

export const education = [
  { start: 2020, end: 2025, title: 'PhD', where: 'IFISC (CSIC-UIB)', note: '“An Agent-Based Journey in Social Systems Research: Motivations & Applications”. Cum laude. Supervisors: Dr. José Javier Ramasco and Dr. Sandro Meloni.' },
  { start: 2019, end: 2020, title: 'Master’s Degree (M2) in Physics of Complex Systems', where: 'Universities Paris Diderot, Pierre et Marie Curie, Paris-Sud/Paris-Saclay', note: '' },
  { start: 2014, end: 2019, title: 'Undergraduate Degree in Physics (240 ECTS)', where: 'Universidad Complutense de Madrid', note: 'Specialized in Fundamental Physics.' },
];

export const talks = [
  { year: '2025', kind: 'Invited', title: 'Setting-Dependent ABMs for Infectious Disease Spreading: Dynamic Networks and Co-Evolution', where: 'Crossroads in Epi Modelling Workshop, Università Bocconi, Milano' },
  { year: '2025', kind: 'Invited junior', title: 'Data-driven agent-based models in epidemiology: insights on settings and transportation', where: 'EpiNext Satellite, CCS 2025, Siena' },
  { year: '2025', kind: 'Oral', title: 'Fair Urban Zones of Emissions (FUZE): Assessing impact, effectiveness and fairness of low emission zones via a Co-evolutionary ABM', where: 'CCS 2025, Siena' },
  { year: '2024', kind: 'Oral', title: 'Critical mobility in policy making for epidemic containment', where: 'CCS 2024, London & Exeter' },
  { year: '2023', kind: 'Oral', title: 'Housing and Transport: Analysing multidimensional inequalities from data and infrastructure in Madrid', where: 'CS3 2023, Santander' },
  { year: '2023', kind: 'Poster', title: 'Massive Agent-Based Models for Human Mobility and Urban Systems', where: '1st Spanish Congress on Mobility Research, Zaragoza' },
  { year: '2022', kind: 'Oral', title: 'Housing and Transport: Analysing multidimensional inequalities from data and infrastructure in Madrid', where: 'CCS 2022, Palma de Mallorca' },
  { year: '2021', kind: 'Oral', title: 'Critical Interventions: Mobility-Based Thresholds for Epidemic Containment', where: 'CCS 2021, Lyon' },
];

export const teaching = [
  { start: 2024, end: 2024, title: 'Master thesis co-supervision: Segregation in urban systems and mobility (Arnau Dolç)', where: 'Master in Physics of Complex Systems, IFISC' },
  { start: 2023, end: 2024, title: 'Medical Physics. Assistant teacher (30 h)', where: 'Medical Degree, Universitat de les Illes Balears' },
  { start: 2023, end: 2024, title: 'Physics Fundamentals. Lab teacher (30 h)', where: 'Telematics Engineering Degree, Universitat de les Illes Balears' },
];

export const skills = [
  { label: 'Languages', value: 'Spanish (native), English (native), Italian (intermediate), French (beginner)' },
  { label: 'Programming', value: 'Python, C++, LaTeX, Matlab' },
];

export const furtherEducation = [
  { year: 'Summer 2023', title: 'Complexity72h Workshop', where: 'IFISC, Spain', note: 'Interdisciplinary workshop. Teams do a project in 72 hours.' },
  { year: 'Summer 2022', title: 'Workshop on Quantitative Human Ecology', where: 'ICTP, Trieste (online)', note: '' },
  { year: 'Summer 2022', title: 'NetSci School 2022', where: 'Shanghai (online)', note: 'Higher-order interactions and statistical inference.' },
  { year: 'Summer 2022', title: 'SocioComplex 2022', where: 'IFISC, Spain', note: '' },
  { year: 'Summer 2022', title: 'X GEFENOL Summer School', where: 'IFISC, Spain', note: '' },
  { year: 'Summer 2017', title: 'Course in Game Theory Applied to the Analysis of Social Networks (75 h)', where: 'Faculty of Statistics, Universidad Complutense de Madrid', note: '' },
];

export const outreach = [
  { year: '2025', title: 'IFISC Poster Party Video', note: 'Director, editor, scriptwriter and actor.', href: 'https://youtu.be/Gl34kL1da8c' },
  { year: '2025', title: 'Entre Avui i Demà (radio show)', note: 'Three appearances: the physics of the colours black, white and pink.' },
  { year: '2024', title: 'IFISC Poster Party Video', note: 'Leading actor and scriptwriter.', href: 'https://youtu.be/MpCZEYmDxFs' },
  { year: '2024', title: 'Vocational Practices project', note: 'Event for high-school students. Complex systems and research.' },
  { year: '2023', title: 'IFISC Poster Party Video', note: 'Actor.', href: 'https://youtu.be/iKNVFjsZM2g' },
];

// Front page, "Outside work" cards. From the CV Hobbies section.
export const hobbies = [
  { icon: '🥁', title: 'Music', text: 'Drums and percussion, live and in concerts. Also guitar and bass.' },
  { icon: '🎾', title: 'Sports', text: 'Padel, football, volleyball.' },
  { icon: '🎭', title: 'Acting', text: 'Voice-overs, video, impressions.' },
  { icon: '📻', title: 'Outreach', text: 'Science videos for IFISC. Radio guest on Entre Avui i Demà.' },
];
