// ─────────────────────────────────────────────────────────────
//  All CV content lives here. Edit this file to update the CV page.
//  `figure` refers to an SVG file in src/figures/ (without .svg).
// ─────────────────────────────────────────────────────────────

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  years: string;
  role: string;
  where: string;
  summary: string;
  highlights?: string[];
  figure: string;
  figureCaption: string;
  links?: { label: string; href: string }[];
  tags: string[];
};

export const projects: Project[] = [
  {
    id: 'mimos',
    title: 'MiMoS',
    subtitle: 'A microscopic mobility simulator for Valladolid',
    years: '2024 – present',
    role: 'Sole developer',
    where: 'Next4Mob project · IFISC (CSIC-UIB)',
    summary:
      'A multimodal agent-based transport digital twin of the Valladolid area (~400,000 inhabitants), built from scratch to evaluate the city’s planned low emission zone. Agents plan daily trips, choose modes and routes, learn from experience, and converge to a stochastic user equilibrium.',
    highlights: [
      'MATSim-inspired co-evolutionary model: Python pre-processing, C++ core.',
      'Discrete-event simulation of public transport (occupancy, FIFO boarding) and road traffic (queues, flow & storage capacity, gridlock detection).',
      'Hand-assembled multimodal network: 3,849 stops and 365 itineraries across buses, trains and rental bikes, plus OSM drive and bike networks.',
      'EMEP/EEA emissions module producing pollutant maps per road link and hour.',
    ],
    figure: 'mimos',
    figureCaption: 'Agents travel through a layered city: road, bus and bike networks, with transfers between modes.',
    links: [{ label: 'Paper in preparation', href: '' }],
    tags: ['agent-based models', 'transport', 'digital twin', 'C++'],
  },
  {
    id: 'fuze',
    title: 'FUZE',
    subtitle: 'Fair Urban Zones of Emissions',
    years: '2024 – present',
    role: 'Lead researcher',
    where: 'IFISC (CSIC-UIB)',
    summary:
      'Low emission zones cut pollution where they are drawn, but who pays for them, and who benefits? FUZE uses the MiMoS co-evolutionary model to assess the impact, effectiveness and fairness of low emission zones: how trips reshuffle, where emissions move, and how costs are distributed across the population.',
    figure: 'fuze',
    figureCaption: 'Schematic: emissions per road link inside and around a low emission zone, where traffic can be displaced to its edges.',
    links: [{ label: 'Talk at CCS 2025, Siena', href: '' }],
    tags: ['low emission zones', 'fairness', 'policy'],
  },
  {
    id: 'critical-mobility',
    title: 'Critical mobility',
    subtitle: 'Mobility thresholds for epidemic containment',
    years: '2021 – 2025',
    role: 'First author',
    where: 'IFISC (CSIC-UIB)',
    summary:
      'Mobility restrictions are one of the bluntest tools in epidemic response. Using data-driven models of how people move, we characterise the critical level of mobility below which an outbreak can be contained, and what that means for designing proportionate interventions.',
    figure: 'critical',
    figureCaption: 'Schematic: outbreak size as a function of mobility, with a critical threshold separating contained and uncontained regimes.',
    links: [{ label: 'Scientific Reports (2025)', href: 'https://doi.org/10.1038/s41598-025-86759-5' }],
    tags: ['epidemics', 'mobility', 'phase transitions'],
  },
  {
    id: 'contact-tracing',
    title: 'Anatomy of digital contact tracing',
    subtitle: 'Age, transmission setting, adoption and case detection',
    years: '2020 – 2021',
    role: 'First author',
    where: 'IPLESP (INSERM), Paris',
    summary:
      'During the first COVID-19 wave, we built an agent-based model with age-structured contacts across households, schools, workplaces and the community to ask when contact-tracing apps actually help: how their effect depends on who adopts them, where transmission happens, and how many cases are detected.',
    figure: 'tracing',
    figureCaption: 'A contact network across settings: app users (ringed) can be notified when a detected case is traced back through shared contacts.',
    links: [{ label: 'Science Advances (2021)', href: 'https://doi.org/10.1126/sciadv.abd8750' }],
    tags: ['COVID-19', 'contact tracing', 'networks'],
  },
  {
    id: 'cooperation-ai',
    title: 'Humans, AIs & cooperation',
    subtitle: 'ChaLueCo · I Chat thus I Cooperate',
    years: '2024 – present',
    role: 'Co-Principal Investigator',
    where: 'IFISC (CSIC-UIB) · funded by Fundación COTEC',
    summary:
      'Can AI agents make people cooperate more? Theoretical work shows that AIs following discriminatory or samaritan strategies can promote cooperation in one-shot Prisoner’s dilemmas. In ChaLueCo we take this to the lab: experiments that introduce conversational AI agents with diverse roles into cooperation dilemmas and measure their effect on group cooperation.',
    figure: 'cooperation',
    figureCaption: 'A population of humans and AI agents playing the Prisoner’s dilemma; AI strategies shape whether cooperation spreads.',
    links: [{ label: 'J. R. Soc. Interface (2024)', href: 'https://doi.org/10.1098/rsif.2024.0212' }],
    tags: ['game theory', 'AI', 'experiments'],
  },
  {
    id: 'civic-digital-twins',
    title: 'Civic digital twins',
    subtitle: 'HARMONIE · Bologna Digital Twin',
    years: '2025 – present',
    role: 'Researcher',
    where: 'MoST · Fondazione Bruno Kessler',
    summary:
      'Digital twins for cities are only as useful as their honesty about uncertainty. Within FBK’s open-source Civic Digital Twins framework, I work on the air & noise pollution twin for the Horizon Europe project HARMONIE, integrating partners’ emission, exposure, health and system-dynamics modules, and on Bologna’s digital twin, making sure the framework supports what-if scenarios, sensitivity and uncertainty analysis.',
    figure: 'digitaltwin',
    figureCaption: 'What-if analysis with uncertainty: a baseline and a policy scenario, each with its spread of plausible outcomes.',
    links: [
      { label: 'Civic Digital Twins on GitHub', href: 'https://github.com/fbk-most/civic-digital-twins' },
      { label: 'HARMONIE', href: 'https://harmonie-project.eu/' },
    ],
    tags: ['digital twins', 'uncertainty', 'air quality'],
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
    authors: 'J. A. Moreno López (supervisors: J. J. Ramasco, S. Meloni)',
    venue: 'Doctoral thesis, IFISC (CSIC-UIB)',
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

export const inPreparation: Publication[] = [
  { title: 'MiMoS: a Microscopic Mobility Simulator for urban policy evaluation', authors: 'J. A. Moreno López, J. J. Ramasco', venue: '', year: '' },
  { title: 'Fair Urban Emission Zones (FUZE): Impact evaluation of Low Emission Zones', authors: 'J. A. Moreno López et al.', venue: '', year: '' },
  { title: 'I Chat thus I Cooperate: the role of AI agents in human cooperation dilemmas', authors: 'J. A. Moreno López et al.', venue: '', year: '' },
  { title: 'Duplication-divergence inspired model for growing scientific collaboration networks', authors: 'J. García-Castillo, B. Arregui-García, J. A. Moreno López, A. Tugores, J. Fernández-Gracia', venue: '', year: '' },
];

export const positions = [
  { years: '2025 – present', title: 'Researcher', where: 'Fondazione Bruno Kessler · Modeling and Simulation of Socio-Technical Systems (MoST)', note: 'Civic digital twins, uncertainty & sensitivity analysis.' },
  { years: '2020 – 2025', title: 'Pre-doctoral Researcher, then Research Assistant', where: 'IFISC (CSIC-UIB), Palma de Mallorca', note: 'Agent-based models of mobility, epidemics and cooperation.' },
  { years: '2020', title: 'Intern', where: 'IPLESP (INSERM), Paris', note: 'Three months modelling digital contact tracing for COVID-19, which led to the Science Advances paper.' },
];

export const education = [
  { years: '2020 – 2025', title: 'PhD in Physics, cum laude', where: 'IFISC (CSIC-UIB)', note: '“An Agent-Based Journey in Social Systems Research: Motivations & Applications”. Supervisors: José Javier Ramasco & Sandro Meloni.' },
  { years: '2019 – 2020', title: 'M2 in Physics of Complex Systems', where: 'Université Paris Diderot · Pierre et Marie Curie · Paris-Sud/Paris-Saclay', note: '' },
  { years: '2014 – 2019', title: 'BSc in Physics', where: 'Universidad Complutense de Madrid', note: 'Specialised in fundamental physics.' },
];

export const talks = {
  invited: [
    { year: '2025', title: 'Setting-dependent ABMs for infectious disease spreading: dynamic networks and co-evolution', where: 'Crossroads in Epi Modelling Workshop, Università Bocconi, Milan' },
    { year: '2025', title: 'Data-driven agent-based models in epidemiology: insights on settings and transportation', where: 'Invited junior speaker, EpiNext satellite, CCS 2025, Siena' },
  ],
  contributed: [
    { year: '2025', title: 'Fair Urban Zones of Emissions (FUZE): impact, effectiveness and fairness of low emission zones via a co-evolutionary ABM', where: 'CCS 2025, Siena' },
    { year: '2024', title: 'Critical mobility in policy making for epidemic containment', where: 'CCS 2024, London & Exeter' },
    { year: '2023', title: 'Massive agent-based models for human mobility and urban systems (poster)', where: '1st Spanish Congress on Mobility Research, Zaragoza' },
    { year: '2023', title: 'Housing and transport: multidimensional inequalities from data and infrastructure in Madrid', where: 'CS3 2023, Santander (also CCS 2022, Palma de Mallorca)' },
    { year: '2021', title: 'Critical interventions: mobility-based thresholds for epidemic containment', where: 'CCS 2021, Lyon' },
  ],
};

export const teaching = [
  { years: '2024', title: 'MSc thesis co-supervision', where: 'IFISC', note: 'Segregation in urban systems and mobility.' },
  { years: '2023 – 2024', title: 'Medical Physics (30 h)', where: 'Universitat de les Illes Balears', note: 'Assistant teacher, 1st-year Medicine.' },
  { years: '2023 – 2024', title: 'Physics Fundamentals, lab (30 h)', where: 'Universitat de les Illes Balears', note: '1st-year Telematics Engineering.' },
];

export const otherProjects = [
  { name: 'AIxPA: AI for public administrations', where: 'FBK', years: '2025 – present' },
  { name: 'APASOS: A Physics Approach to Socio-technical Systems', where: 'IFISC', years: '2022 – 2025' },
  { name: 'SIESTA: Secure Interactive Environments for Sensitive Data Analytics (EOSC)', where: 'IFISC', years: '2024 – 2025' },
  { name: 'PACSS: Physics Approach to Complexity in Socio-technical Systems', where: 'IFISC', years: '2020 – 2022' },
  { name: 'CompFlu: computational approaches to influenza', where: 'INSERM', years: '2020' },
];

export const skills = [
  { label: 'Programming', value: 'Python (NumPy, NetworkX, OSMnx), C++, Matlab, LaTeX' },
  { label: 'Methods', value: 'Agent-based & discrete-event simulation, discrete choice, network science, sensitivity & uncertainty analysis, GIS/OSM data pipelines' },
  { label: 'Languages', value: 'Spanish (native), English (native), Italian (intermediate), French (beginner)' },
];
