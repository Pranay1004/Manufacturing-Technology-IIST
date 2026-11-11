export type PersonType = "faculty" | "student" | "phd" | "staff";
export type Availability = "Open to roles" | "Open to internships" | "Research focused" | "Joining soon";

export type Project = {
  title: string;
  summary: string;
  status: "Concept" | "Ongoing" | "Completed";
};

export type ProfileSection = {
  title: string;
  body: string;
  items?: string[];
};

export type Person = {
  slug: string;
  type: PersonType;
  name: string;
  role: string;
  batch?: string;
  cohort?: "2024-2026" | "2025-2027" | "2026-2028";
  specialization: string;
  officialEmail: string;
  personalEmail?: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
  supervisor?: string;
  location?: string;
  availability: Availability;
  synopsis: string;
  skills: string[];
  skillGroups: Record<string, string[]>;
  projects: Project[];
  courses?: string[];
  researchInterests?: string[];
  seekingRoles?: string[];
  resumeUrl?: string;
  photoUrl?: string;
  sourceUrl?: string;
  admissionYear?: string;
  mode?: "Regular" | "Sponsored";
  internship?: string;
  internalGuide?: string;
  placedAt?: string;
  placedRole?: string;
  profileSections?: ProfileSection[];
};

export const programHighlights = [
  "Advanced manufacturing for aerospace and space applications",
  "Hands-on exposure to materials testing, characterization, and process equipment",
  "Coursework in additive, composite, joining, forming, CAD-CAM, and manufacturing systems",
  "ISRO-oriented case studies, internships, projects, and technical discussions",
];

export const facilities = [
  {
    name: "Advanced Manufacturing Studio",
    summary:
      "A flexible teaching and project space for additive manufacturing, subtractive workflows, process planning, metrology, and prototype validation.",
    capabilities: ["3D printing", "CNC planning", "Process mapping", "Prototype review"],
  },
  {
    name: "Composite Manufacturing and Testing Bay",
    summary:
      "A student-facing facility concept for composite layup, curing studies, coupons, quality inspection, and aerospace material discussion.",
    capabilities: ["Layup studies", "Coupon preparation", "NDT orientation", "Failure review"],
  },
  {
    name: "Forming, Joining, and Metallurgy Lab",
    summary:
      "A process-led environment for hot working, welding, deformation, microstructure study, and aerospace alloy manufacturing routes.",
    capabilities: ["Metal forming", "Welding", "Heat affected zone study", "Metallography"],
  },
  {
    name: "Manufacturing Systems and Quality Room",
    summary:
      "A planning and analytics space for scheduling, supply chain, facility layout, quality systems, and production decision modelling.",
    capabilities: ["Scheduling", "Quality systems", "Lean workflows", "Optimization"],
  },
];

export const industrialVisits = ["CMSE", "IISU", "VSSC", "LPSC"];

export const btechProjects = [
  {
    slug: "btech-2026-lightweight-tooling",
    owner: "B.Tech Project Team 01",
    program: "B.Tech",
    batch: "2026",
    specialization: "Lightweight tooling",
    title: "Lightweight tooling concept for composite layup",
    summary:
      "A reserved undergraduate project dossier for tooling design, fixture planning, and documentation around aerospace composite manufacturing.",
    status: "Concept" as const,
  },
  {
    slug: "btech-2026-metrology-fixture",
    owner: "B.Tech Project Team 02",
    program: "B.Tech",
    batch: "2026",
    specialization: "Metrology and inspection",
    title: "Inspection fixture and measurement workflow",
    summary:
      "A future undergraduate project slot for repeatable measurement planning, tolerance checks, and inspection-ready manufacturing records.",
    status: "Concept" as const,
  },
  {
    slug: "btech-2025-printer-process-window",
    owner: "B.Tech Project Team 03",
    program: "B.Tech",
    batch: "2025",
    specialization: "Additive manufacturing",
    title: "Polymer 3D printing process window study",
    summary:
      "A placeholder for undergraduate work on print parameter variation, dimensional accuracy, surface finish, and process documentation.",
    status: "Concept" as const,
  },
  {
    slug: "btech-2025-quality-dashboard",
    owner: "B.Tech Project Team 04",
    program: "B.Tech",
    batch: "2025",
    specialization: "Quality engineering",
    title: "Manufacturing quality dashboard prototype",
    summary:
      "A future project dossier for visualizing nonconformance categories, inspection checkpoints, and corrective action tracking.",
    status: "Concept" as const,
  },
];

export const curriculum = {
  vision:
    "To be the state-of-the-art centre for manufacturing, continuously expanding education, research, and technological development with special focus on aerospace applications.",
  mission:
    "Value added education in applied and advanced Manufacturing Science, Engineering and Technology, nurturing quality manpower for national capability in materials processing.",
  objective:
    "To impart knowledge and promote research on basic, applied, and advanced manufacturing processes, developing industry-aligned competencies with collaborations of ISRO.",
  coreValues: [
    "Support from state-of-the-art ISRO facilities",
    "Opportunities to work with challenging manufacturing projects in the space sector",
    "Interdisciplinary learning through innovative case studies in ISRO entities",
  ],
  semesters: [
    {
      title: "Semester 1",
      credits: 19,
      courses: [
        "AE601 Mathematical Methods in Aerospace Engineering",
        "AE641 Advanced Engineering Materials",
        "AE642 Subtractive and Computer Aided Manufacturing",
        "AE643 Manufacturing Planning and Control",
        "AE804 Machine Tools and Metrology Practice",
      ],
    },
    {
      title: "Semester 2",
      credits: 19,
      courses: [
        "AE644 Plasticity and Advanced Deformation Processes",
        "AE645 Additive Manufacturing and Smart Practices",
        "AE646 Composite Manufacturing Technology",
        "AE647 Advanced Welding Technology",
        "AE805 Materials Processing and Characterization Practice",
      ],
    },
    {
      title: "Semester 3",
      credits: 16,
      courses: ["AE853 Summer Internship", "AE852 Project Phase I"],
    },
    {
      title: "Semester 4",
      credits: 16,
      courses: ["AE852 Project Phase II"],
    },
  ],
  electives: [
    "Advanced Machining Processes",
    "Design for Manufacturing",
    "Digital Manufacturing and Automation",
    "Metrology and Computer Aided Inspection",
    "Micro/Nano Manufacturing",
    "Powder Metallurgy",
    "Advanced Operations Research",
    "Quality Engineering",
    "Industrial Engineering",
    "Total Quality Management",
    "Robot Mechanisms and Technology",
    "Smart Materials and Structures",
  ],
};

export const academicEvents = [
  {
    title: "Workshop on Advanced Control Systems: Theory, Innovation, and Industrial Applications",
    date: "29 June 2026 - 3 July 2026",
    scope: "Aerospace Engineering department event",
  },
  {
    title: "Mechanisms in Chandrayaan",
    date: "15 November 2023",
    scope: "Seminar and conference listing",
  },
  {
    title: "Challenges of Human and Robotic Space Exploration",
    date: "12 October 2023",
    scope: "Seminar and conference listing",
  },
  {
    title: "Introduction to Cantera",
    date: "13 August 2023",
    scope: "Seminar and conference listing",
  },
];

export const collaborations = [
  {
    partner: "Advanced Manufacturing Technology Development Centre, IIT Madras Research Park",
    summary:
      "MoU signed on 26 September 2025 to enhance academic and research collaboration, including internships/projects, joint initiatives, joint supervision, shared facilities, seminars/workshops, and academia-industry interactions.",
  },
  {
    partner: "Indian Institute of Technology Palakkad",
    summary:
      "General MoU signed on 19 August 2024 for student exchange, joint research supervision, collaborative laboratories, and academic interactions under the NEP framework.",
  },
  {
    partner: "National Institute of Technology Calicut",
    summary:
      "MoU signed on 28 November 2023 for academic and research collaboration, including student exchange, joint supervision, shared facilities, and academic interactions.",
  },
  {
    partner: "Liquid Propulsion Systems Centre, ISRO",
    summary:
      "Listed IIST collaboration covering EPS diagnostics for high vacuum facilities and laser holography-based surface profilometry studies.",
  },
];

const defaultStudentSections: ProfileSection[] = [
  {
    title: "Summary",
    body: "Short academic and professional summary to be updated by the profile owner after login.",
  },
  {
    title: "Previous experience",
    body: "Internships, industrial visits, workshops, technical teams, and relevant prior work can be listed here.",
    items: ["ISRO centre exposure", "Laboratory coursework", "Manufacturing documentation"],
  },
  {
    title: "Publications and reports",
    body: "Conference papers, journal submissions, posters, thesis reports, and approved technical notes can be added here.",
  },
];

const defaultPhdSections: ProfileSection[] = [
  {
    title: "Research summary",
    body: "Doctoral research summary to be refined by the scholar with objectives, methods, and current progress.",
  },
  {
    title: "Publications",
    body: "Journal papers, conference papers, preprints, posters, and manuscripts under review can be added here.",
  },
  {
    title: "Technical experience",
    body: "Experimental setups, simulations, characterization workflows, collaborations, and sponsored project work can be documented here.",
  },
];

export function formatResumeUrl(url: string | undefined): string | undefined {
  if (!url) return url;
  const githubRawRegex = /^https?:\/\/raw\.githubusercontent\.com\/([^\/]+)\/([^\/]+)\/([^\/]+)\/(.+)$/;
  const match = url.match(githubRawRegex);
  if (match) {
    const [, owner, repo, branch, path] = match;
    return `https://cdn.jsdelivr.net/gh/${owner}/${repo}@${branch}/${path}`;
  }
  return url;
}

export const people: Person[] = [
  {
    slug: "sooraj-v-s",
    type: "faculty",
    name: "Dr. Sooraj V. S",
    role: "Professor and Program Coordinator",
    specialization: "Additive & Subtractive Manufacturing, Space Payloads & Precision Engineering",
    officialEmail: "sooraj@iist.ac.in",
    location: "R-103, D4, Department of Aerospace Engineering",
    availability: "Research focused",
    synopsis:
      "Professor and Program Coordinator for Manufacturing Technology in the Department of Aerospace Engineering at IIST. Anchors advanced manufacturing research for space applications, small satellite microgravity payloads, precision subtractive tooling, and additive manufacturing. Led the mechanical design, development, and qualification of the ARIS payload flown on the PSLV-C45 PS4 orbital platform, earning the ISRO Team Excellence Award and national accolades from first Indian cosmonaut Wing Commander Rakesh Sharma.",
    skills: [
      "Additive Manufacturing",
      "Subtractive Manufacturing",
      "Space Payloads",
      "Precision Engineering",
      "Microgravity Experiments",
      "Topology Optimization",
      "CAD-CAM",
      "Advanced Grinding",
    ],
    skillGroups: {
      Research: [
        "Additive and subtractive manufacturing for space",
        "Microgravity experiments & small satellite payloads",
        "Eccentric Sleeve Grinding (ESG)",
        "Generative design and metallic lattice structures",
        "3D printing for biomedical instrumentation",
      ],
      Teaching: [
        "AE645 Additive Manufacturing and Smart Practices",
        "AE643 Manufacturing Planning and Control",
        "AE642 Subtractive and Computer Aided Manufacturing",
        "AE804 Machine Tools and Metrology Practice",
      ],
    },
    researchInterests: [
      "Additive and subtractive manufacturing for space, aerospace, and precision engineering",
      "Manufacturing design and processes for microgravity experiments (small spacecrafts and payloads)",
      "3D printing and prototyping for aerospace and bio-medical instrumentation",
      "Eccentric Sleeve Grinding (ESG) and smart re-configurable grinding systems",
      "Generative design and topology optimization for metallic lattice structures",
    ],
    courses: [
      "AE645 Additive Manufacturing and Smart Practices",
      "AE643 Manufacturing Planning and Control",
      "AE642 Subtractive and Computer Aided Manufacturing",
      "AE804 Machine Tools and Metrology Practice",
    ],
    projects: [
      {
        title: "Patent No. 502722 (Granted Jan 2024) — Reconfigurable Additive Grinding Wheel with Self-Adaptable Cooling",
        summary:
          "Granted Indian Patent (No. 502722, co-inventor Shri SarathBabu T. S.) covering a 3D-printed reconfigurable grinding wheel with in-situ self-generated cold air and adaptive lubrication for sustainable machining of Ti6Al4V and CFRPs (ISAMPE 2024 National Award).",
        status: "Completed",
      },
      {
        title: "Patent No. 346350 (Granted Sep 2020) — Resilient Elasto-Magnetic-Abrasive Spheres for Fine Finishing",
        summary:
          "Granted Indian Patent (No. 346350, with Dr. V. Radhakrishnan & Dr. Nirmala Rachel James) for flexible magnetic-elastomeric abrasive media enabling ultra-fine internal and complex aerospace surface finishing.",
        status: "Completed",
      },
      {
        title: "ASRG Funded Project (2023) — Additive Manufacturing for Space & Gaganyaan Technologies",
        summary:
          "Aero Space Research and Development Grant (ASRG) sponsored investigation advancing space-qualified additive manufacturing processes and structural demonstrators for human spaceflight and Gaganyaan mission systems.",
        status: "Ongoing",
      },
      {
        title: "ASRG Funded Project (2024) — Space Robotics & Design for Additive Manufacturing (DfAM)",
        summary:
          "Funded ASRG program focused on Design for Additive Manufacturing (DfAM), topology optimization of metallic lattice structures, and robotic smart manufacturing workflows for orbital hardware.",
        status: "Ongoing",
      },
      {
        title: "ARIS Payload on PSLV-C45 PS4 Orbital Platform & 4 Completed IIST–ISRO Projects",
        summary:
          "Led mechanical design, fabrication, and qualification of the ARIS payload flown on PSLV-C45 (ISRO Team Excellence Award), alongside four completed IIST–ISRO sponsored research projects and Eccentric Sleeve Grinding (ESG) development.",
        status: "Completed",
      },
    ],
    photoUrl: "/media/photos/sooraj-vs.webp",
    sourceUrl: "https://www.iist.ac.in/people-faculty-profile/sooraj-v-s",
    profileSections: [
      {
        title: "Granted Patents & Sponsored Projects",
        body: "Granted Indian Patent No. 502722 (Jan 24, 2024): Reconfigurable Grinding Wheel with In-built Cooling and Self-adaptable Lubrication System via Additive Manufacturing.\nGranted Indian Patent No. 346350 (Sep 8, 2020): Multipurpose Resilient Elasto-Magnetic-Abrasive Spheres for Fine Finishing of Surfaces.\n\nSponsored Research: Two active ASRG funded projects (2023 Additive Manufacturing for Gaganyaan; 2024 Space Robotics & DfAM), plus four completed IIST–ISRO collaborative projects.",
      },
      {
        title: "Education & Academic Honors",
        body: "Ph.D. in Aerospace Manufacturing, IIST (Guide: Prof. V. Radhakrishnan) · M.Tech in Manufacturing (Topper / Gold Medalist, NIT Calicut, 2008, ISTE National Award for Best M.Tech Thesis) · B.Tech (First Rank, University of Kerala, 2003).",
      },
      {
        title: "Fellowships, Awards & Recognitions",
        body: "ISRO Team Excellence Award for ARIS Payload on PSLV-C45 · IIST Space Science and Technology Excellence Certificate presented by Cosmonaut Wg Cdr Rakesh Sharma & Padma Bhushan Dr. B. N. Suresh · ISAMPE National Award for Smart Materials and Systems Technology Development (2024) · First Prize at IMTEX 2013 Academic Pavilion · Best Project Award in Aerospace Manufacturing (2025).",
      },
      {
        title: "IRINS & Academic Impact",
        body: "Publications, patent disclosures, and citations indexed on IRINS (ID: 55873). Contact: +91 (471) 2568449 | Office: R-103, D4.",
      },
    ],
  },
  {
    slug: "chakravarthy-p",
    type: "faculty",
    name: "Dr. Chakravarthy P.",
    role: "Professor",
    specialization: "Aerospace Materials, Metallurgy & Metal Forming",
    officialEmail: "chakravarthy@iist.ac.in",
    location: "R-121, Department of Aerospace Engineering",
    availability: "Research focused",
    synopsis:
      "Professor in the Department of Aerospace Engineering at IIST (formerly R&D Assistant Manager at Sundram Fasteners Ltd). Leading research in aerospace metallurgy, hot deformation and processing maps of titanium and aluminum alloys, flux-bounded TIG (FBTIG) welding of Inconel 600, electron beam welding of Monel 400, cryogenic deformation, and shape memory nanocomposites for space missions. Mentor of multiple national award-winning M.Tech and Ph.D. dissertations.",
    skills: [
      "Aerospace Metallurgy",
      "Hot Working & Plasticity",
      "Advanced Metal Forming",
      "FBTIG Welding",
      "Electron Beam Welding",
      "Powder Metallurgy",
      "Cryogenic Deformation",
      "Shape Memory Composites",
    ],
    skillGroups: {
      Research: [
        "Hot deformation of aerospace alloys (AA2219, AA2014, Ti6Al4V)",
        "FBTIG & Electron Beam welding of superalloys and refractory metals",
        "Shape memory polyurethene nanocomposites",
        "Cryogenic deformation & transformation-induced plasticity",
        "Processing maps and constitutive flow modeling",
      ],
      Teaching: [
        "AE641 Advanced Engineering Materials",
        "AE644 Plasticity and Advanced Deformation Processes",
        "AE647 Advanced Welding Technology",
        "AE805 Materials Processing and Characterization Practice",
      ],
    },
    researchInterests: [
      "Hot deformation, constitutive flow modeling, and processing maps of aerospace alloys",
      "Advanced welding techniques: Flux-Bounded TIG (FBTIG) and Electron Beam Welding (EBW)",
      "Theory of plasticity and formability limit diagrams of sintered steel and light alloys",
      "Cryogenic mechanical deformation and transformation-induced plasticity (TRIP) in steels",
      "Electro-active shape memory polymer nanocomposites for deployable space mechanisms",
    ],
    courses: [
      "AE641 Advanced Engineering Materials",
      "AE644 Plasticity and Advanced Deformation Processes",
      "AE647 Advanced Welding Technology",
      "AE805 Materials Processing and Characterization Practice",
    ],
    projects: [
      {
        title: "Flux Bounded TIG (FBTIG) Welding of Inconel 600 & Aluminum Alloys",
        summary:
          "Experimental and thermo-mechanical finite element studies on flux-assisted keyhole TIG welding, deepening weld penetration and minimizing HAZ micro-fissuring (Prof. Brahm Prakash Best Thesis Award guide; authored CRC Press book 'Flux Bounded TIG Welding Process').",
        status: "Completed",
      },
      {
        title: "Cryogenic Deformation & TRIP Behavior in Propulsion Engine Alloys",
        summary:
          "Constitutive flow modelling and processing map development for cryogenic deformation of ICSS 1218-321, AISI 202 braze joints, AA2219, and copper-beryllium alloys utilized in liquid propulsion stages (ICAMPS 2026).",
        status: "Ongoing",
      },
      {
        title: "IIST–ISRO Ablative Composites, Shape Memory Nanocomposites & Prepreg Processing",
        summary:
          "Sponsored IIST–ISRO materials processing studies covering electro-active shape memory polyurethane nanocomposites for deployable space structures and autoclave curing quality of carbon/epoxy prepregs (ICAMPS 2026 Best Poster Award).",
        status: "Ongoing",
      },
    ],
    photoUrl: "/media/photos/chakravarthy-p.webp",
    sourceUrl: "https://www.iist.ac.in/people-faculty-profile/chakravarthy-p",
    profileSections: [
      {
        title: "Publications, Book & Laboratory Leadership",
        body: "Authored Book: 'Flux Bounded Tungsten Inert Gas Welding Process: An Introduction' (CRC Press / Taylor & Francis, 2019, with M. Agilan & N. Neethu).\nLab In-Charge: Manufacturing Processes Lab and Material Characterization / Physical Metallurgy Lab supporting IIST–ISRO prototype development and metallurgical analysis.",
      },
      {
        title: "Education & Academic Background",
        body: "Ph.D. in Metallurgical and Materials Engineering, IIT Madras · M.Tech in Materials Science · B.E. in Production Engineering · Sundram Fasteners Ltd R&D Assistant Manager (2008-2010).",
      },
      {
        title: "Awards & Honors",
        body: "Prof. Brahm Prakash Best Thesis Award (Guide, IIM Trivandrum 2023) · Best Published Paper Award under Young Researcher Category (IIM 2023 & 2019) · ICAMPS 2026 Best Poster Award · NMD-ATM 2022 Best Oral Presentation Award · NIT Tiruchirappalli 2019 Best Paper Award.",
      },
      {
        title: "Academic Appointments & Guidance",
        body: "Professor (since 2022), Associate Professor (2016-2022), Assistant Professor (2010-2016) at IIST. Extensive supervision across M.Tech and PhD aerospace manufacturing programs. Office: R-121 | Email: chakravarthy@iist.ac.in.",
      },
    ],
  },
  {
    slug: "b-s-girish",
    type: "faculty",
    name: "Dr. B. S. Girish",
    role: "Associate Professor",
    specialization: "Manufacturing Systems, Operations Research & Quality Engineering",
    officialEmail: "girish@iist.ac.in",
    location: "R-120, Department of Aerospace Engineering",
    availability: "Research focused",
    synopsis:
      "Associate Professor in the Department of Aerospace Engineering at IIST (formerly Assistant Professor at NIT Calicut and Lecturer at TCE Madurai). Specializes in sequencing and scheduling in manufacturing and aerospace environments, multi-objective Pareto optimization, Just-in-Time (JIT) scheduling, cellular manufacturing, supply chain optimization, and heuristic/metaheuristic algorithms (PSO, Genetic Algorithms).",
    skills: [
      "Operations Research",
      "Production Scheduling",
      "Supply Chain Management",
      "Pareto Optimization",
      "Just-in-Time (JIT)",
      "Cellular Manufacturing",
      "Particle Swarm Optimization",
      "Quality Engineering",
    ],
    skillGroups: {
      Research: [
        "Sequencing and scheduling in manufacturing and aerospace systems",
        "Bi-objective Pareto optimization of earliness and tardiness",
        "Supply chain design and coordination",
        "Cellular manufacturing and machine-part cell formation",
        "Heuristic and metaheuristic algorithms (PSO, GA)",
      ],
      Teaching: [
        "AE801 Operations Research",
        "Manufacturing Planning and Control",
        "Supply Chain Management",
        "Facility Location and Layout Design",
        "Quality Engineering & TQM",
      ],
    },
    researchInterests: [
      "Sequencing and scheduling in aerospace component manufacturing and assembly job shops",
      "Pareto-based bi-objective optimization for total earliness and tardiness in JIT systems",
      "Supply chain management and network design for strategic aerospace logistics",
      "Cellular manufacturing systems and group technology",
      "Particle swarm optimization and nature-inspired algorithms for industrial scheduling",
    ],
    courses: [
      "Operations Research (AE801)",
      "Supply Chain Management",
      "Manufacturing Planning and Control",
      "Facility Location and Layout Design",
      "Optimization Techniques in Engineering",
    ],
    projects: [
      {
        title: "Bi-Objective Single-Machine & Flow Shop Scheduling Models",
        summary:
          "Development of Pareto-based heuristic algorithms minimizing total earliness and total tardiness for high-mix low-volume aerospace manufacturing schedules.",
        status: "Completed",
      },
      {
        title: "Particle Swarm Optimization for Multi-Routing Assembly Job Shops",
        summary:
          "Metaheuristic scheduling architecture addressing dynamic routings, machine disruptions, and assembly precedence constraints in aerospace manufacturing environments.",
        status: "Completed",
      },
      {
        title: "Supply Chain Coordination & Safety Stock Optimization for Space Programs",
        summary:
          "Mathematical models balancing procurement lead times, storage criticality, and lateness penalties for specialized alloy and component inventories.",
        status: "Ongoing",
      },
    ],
    photoUrl: "/media/photos/girish-bs.webp",
    sourceUrl: "https://www.iist.ac.in/people-faculty-profile/b-s-girish",
    profileSections: [
      {
        title: "Education & Academic Background",
        body: "Ph.D. in Industrial Engineering, Anna University, Chennai (2009) · M.E. in Manufacturing Technology, Regional Engineering College (REC / NIT) Tiruchirappalli (2003) · B.Tech in Production Engineering, Government Engineering College, Thrissur (2001).",
      },
      {
        title: "Awards & Honors",
        body: "Third Best Paper Award (PhD Scholar category) at ORSI-2023 & ICBAI-2023 (IISc Bangalore & IIM Bangalore) · 'Omega Best Reviewer 2018' Award from Elsevier Journal Omega: The International Journal of Management Science · Best Paper Award and Cash Prize at ICOREM-2009 (Anna University).",
      },
      {
        title: "Experience & Departmental Appointments",
        body: "Associate Professor in Aerospace Engineering at IIST (April 2010 onwards) · Assistant Professor in Mechanical Engineering, NIT Calicut (2009-2010) · Lecturer, Thiagarajar College of Engineering, Madurai (2003-2009). Office: R-120.",
      },
    ],
  },
  {
    slug: "rahul-m-r",
    type: "faculty",
    name: "Dr. Rahul M. R.",
    role: "Assistant Professor",
    specialization: "Alloy Design & Microstructure Informatics",
    officialEmail: "rahulmr@iist.ac.in",
    location: "Department of Aerospace Engineering",
    availability: "Research focused",
    synopsis:
      "Assistant Professor in the Department of Aerospace Engineering at IIST (formerly at IIT (ISM) Dhanbad). Specializes in alloy design and development via experimental and multi-scale simulation routes, microstructure informatics, thermo-mechanical processing, and solidification metallurgy for critical space hardware.",
    skills: [
      "Alloy Design",
      "Microstructure Informatics",
      "Thermo-Mechanical Processing",
      "Solidification Metallurgy",
      "ICME",
      "Welding Metallurgy",
    ],
    skillGroups: {
      Research: [
        "Alloy design & development (Experimental & Simulation)",
        "Microstructure informatics",
        "Thermo-mechanical processing",
        "Solidification and welding",
        "ICME and Materials informatics",
      ],
      Teaching: [
        "Heat Treatment Techniques",
        "Advanced Engineering Materials",
        "Joining of Materials",
        "Metal Forming Technology",
        "Welding Metallurgy",
      ],
    },
    researchInterests: [
      "Alloy design and development: Experimental and Simulation",
      "Microstructure Informatics",
      "Thermo-Mechanical processing",
      "Solidification and Welding",
      "ICME and Materials Informatics",
    ],
    courses: [
      "Heat Treatment Techniques",
      "Advanced Engineering Materials",
      "Joining of Materials",
      "Metal Forming Technology",
      "Welding Metallurgy",
    ],
    projects: [
      {
        title: "Alloy Design & Microstructure Informatics for Multiphase & High-Entropy Aerospace Alloys",
        summary:
          "Integrated computational materials engineering (ICME), CALPHAD, and machine learning frameworks paired with experimental thermo-mechanical processing to predict microstructure evolution and mechanical response (IGSTC Fellow, Univ. of Duisburg-Essen).",
        status: "Ongoing",
      },
      {
        title: "Solidification Metallurgy & Welding Phase Transformation Studies",
        summary:
          "Investigating non-equilibrium solidification pathways, grain refinement, and weld-zone microstructural stability in high-temperature structural alloys.",
        status: "Ongoing",
      },
    ],
    photoUrl: "/media/photos/rahul-mr.webp",
    sourceUrl: "https://www.iist.ac.in/people-faculty-profile/rahul-m-r",
    profileSections: [
      {
        title: "Fellowships & Honors",
        body: "Recipient of the IGSTC Paired Early Career Fellowship in Applied Research (University of Duisburg-Essen, Germany), Keshav Ranganath Award (IIT Madras Best Researcher), Sudarshan Bhat Memorial Prize for best thesis, and IIM-SJEF travel grant (THERMEC 2025, France).",
      },
    ],
  },
  {
    slug: "muhammed-rijas-a-staff",
    type: "staff",
    name: "Muhammed Rijas A.",
    role: "Technical Officer-C",
    specialization: "Welding, Forming & Laboratory Operations",
    officialEmail: "muhammedrijas@iist.ac.in",
    location: "Aerospace Engineering Laboratories",
    availability: "Research focused",
    synopsis:
      "Technical Officer-C in the Department of Aerospace Engineering at IIST. Anchors laboratory instrumentation, precision welding and forming equipment, technical support for advanced manufacturing trials, and experimental characterization workflows for aerospace student and faculty research.",
    skills: ["Lab Instrumentation", "Advanced Welding", "Metal Forming", "Process Setup", "Safety Compliance"],
    skillGroups: {
      Technical: ["Welding systems", "Metal forming rigs", "Metallography preparation", "Equipment calibration"],
      Operations: ["Laboratory management", "Safety engineering", "Experimental fixture setup", "Student guidance"],
    },
    projects: [
      {
        title: "Flux-Bounded TIG (FBTIG) & Advanced Welding Research on Aerospace Aluminum",
        summary:
          "Co-investigator on experimental FBTIG welding of aluminium alloys studying flux gap and particle size effects on weld penetration (Transactions of the Indian Institute of Metals), alongside instrumentation support for IIST–ISRO trials.",
        status: "Completed",
      },
      {
        title: "Aerospace Manufacturing Lab Operations & Process Setups",
        summary: "Supervising experimental rigs for welding, forming, and metallographic evaluation of refractory and high-strength aerospace alloys.",
        status: "Ongoing",
      },
    ],
    photoUrl: "/media/photos/muhammed-rijas.webp",
    sourceUrl: "https://www.iist.ac.in/node/2922",
    profileSections: [
      {
        title: "Department Role",
        body: "Staff Code: IN13194. Technical Officer-C, Department of Aerospace Engineering, IIST. Contact: +91-471-2568-494.",
      },
    ],
  },
];

// Lab Staff & Technical Support
people.push({
  slug: "prakash-rs",
  type: "staff",
  name: "Shri Prakash R. S.",
  role: "Technical Officer - C",
  specialization: "Laboratory Operations, Experimental Rigs & Manufacturing Support",
  officialEmail: "prakashrs@iist.ac.in",
  location: "Department of Aerospace Engineering Laboratories",
  availability: "Research focused",
  synopsis:
    "Technical Officer - C in the Department of Aerospace Engineering at IIST (Staff Code: IN10120). Anchors laboratory operations, precision manufacturing machinery, machine tool calibration, student and scholar project fabrication, and experimental rig development. Co-inventor on granted Indian Patent No: 530958 for swirl-stabilized burner technology with aerospace faculty.",
  skills: [
    "Lab Operations",
    "Machine Tool Maintenance",
    "Experimental Rigs",
    "Precision Fabrication",
    "Combustion Setups",
    "Safety Compliance",
    "Metrology Practice",
  ],
  skillGroups: {
    Technical: [
      "Precision machine tools (lathes, milling, grinding)",
      "Experimental combustion and propulsion rigs",
      "Metrology and inspection calibration",
      "Tooling and fixture fabrication",
    ],
    Operations: [
      "Laboratory safety and protocols",
      "Preventive maintenance scheduling",
      "Student project hardware assistance",
      "Raw material inventory management",
    ],
  },
  projects: [
    {
      title: "Swirl Stabilized Liquid Fuel Burner with Multi-point Aerated Injector",
      summary:
        "Co-inventor on granted Indian Patent No: 530958, designing and manufacturing specialized aerated injection burner hardware for combustion studies.",
      status: "Completed",
    },
    {
      title: "Aerospace Manufacturing Studio Operations & Practice Setup",
      summary:
        "Supervising hands-on practice setups, metrology calibration, and fabrication fixtures for M.Tech AE804 and AE805 laboratory coursework.",
      status: "Ongoing",
    },
  ],
  photoUrl: "/media/photos/prakash-rs.webp",
  sourceUrl: "https://www.iist.ac.in/node/2902",
  profileSections: [
    {
      title: "Official Credentials",
      body: "Designation: Technical Officer - C · Staff Code: IN10120 · Department of Aerospace Engineering, Indian Institute of Space Science and Technology · Telephone: +91 (471) 2568489 · Email: prakashrs@iist.ac.in.",
    },
    {
      title: "Patents & Innovation",
      body: "Co-inventor on Indian Patent No: 530958 ('Swirl Stabilized Liquid Fuel Burner With Multi-point Aerated Injector'), contributing prototype machining, injector fixture development, and experimental rig integration.",
    },
    {
      title: "Laboratory & Student Support",
      body: "Provides direct hands-on support for M.Tech and PhD aerospace manufacturing thesis work, material characterization sample preparation, machine tool tooling setups, and workshop safety protocols.",
    },
  ],
});

interface StudentData {
  slug: string;
  name: string;
  roll: string;
  specialization: string;
  broadIdea: string;
  supervisor: string;
  internship: string;
  projectTitle: string;
  externalGuide?: string;
  photoUrl?: string;
  resumeUrl?: string;
  personalEmail?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  synopsis?: string;
  skills?: string[];
  skillGroups?: Record<string, string[]>;
  projects?: Project[];
  profileSections?: ProfileSection[];
}

const currentStudents: StudentData[] = [
  {
    slug: "aniket-balaji-parnale",
    name: "Aniket Balaji Parnale",
    roll: "SC25M141",
    specialization: "Quality Engineering",
    broadIdea: "MILP Autoclave Scheduling (CMSE, ISRO) & Friction Stir Welding",
    supervisor: "Dr. B. S. Girish",
    externalGuide: "Dr. P. Sasikumar (CMSE, ISRO)",
    internship: "Research Intern — Friction Stir Welding of AA1100 (IIST Aerospace Engg., Summer 2026 under Dr. P. Chakravarthy)",
    projectTitle: "Scheduling of Composite Manufacturing Processes for Aerospace Components (CMSE, ISRO)",
    photoUrl: "/media/photos/aniket.webp",
    resumeUrl: "/resumes/aniket.pdf",
    personalEmail: "parnaleaniket@gmail.com",
    linkedin: "https://www.linkedin.com/in/aniket-parnale",
    synopsis:
      "M.Tech scholar in Manufacturing Technology at IIST (B.Tech Mechanical Engineering, Government College of Engineering, Chandrapur; GATE ME 2024 qualified) with hands-on automotive production and quality assurance experience as a Graduate Apprenticeship Trainee at Tata Motors Passenger Vehicle, Pune (End-of-Line QA/QC & line balancing, Jan–Jul 2025) and Graduate Engineer Trainee at Skyline Projects, Pune. He also serves as a Teaching Assistant for CAD and Metrology Labs at IIST.\n\nFor his M.Tech thesis guided by Dr. B. S. Girish (IIST) and Dr. P. Sasikumar (CMSE, ISRO), he formulates Mixed-Integer Linear Programming (MILP) models in IBM CPLEX integrating 2D part packing, prepreg shelf-life constraints, and energy optimization for aerospace autoclave and oven curing. In parallel, his Summer 2026 research internship under Dr. P. Chakravarthy investigated Friction Stir Welding of 6 mm AA1100 plates with ASTM E8 tensile characterization (peak 92.85 MPa) and ASTM E384 Vickers microhardness mapping (Cpk = 4.83).",
    skills: ["MILP & IBM CPLEX", "Autoclave Scheduling", "Quality Engineering", "Line Balancing & QA/QC", "Friction Stir Welding", "MATLAB & Simulink", "PLC & SCADA", "SolidWorks", "ANSYS & Abaqus"],
    skillGroups: {
      "Scheduling & Operations": ["MILP", "IBM CPLEX", "Autoclave & Oven Scheduling", "Line Balancing", "QA/QC & Fault Diagnosis"],
      "CAD, CAE & Automation": ["MATLAB & Simulink", "SolidWorks", "AutoCAD", "Fusion 360", "Inventor", "ANSYS Fluent & Workbench", "Abaqus", "PLC & SCADA"],
      "Testing & Metallurgy": ["Friction Stir Welding (FSW)", "ASTM E8 Tensile Testing", "ASTM E384 Vickers Microhardness", "Optical Metallography"],
    },
    projects: [
      {
        title: "M.Tech Thesis — Scheduling of Composite Manufacturing Processes (CMSE, ISRO)",
        summary:
          "Formulating a 2D packing-aware Mixed-Integer Linear Programming (MILP) framework in IBM CPLEX under Dr. B. S. Girish and Dr. P. Sasikumar (CMSE, ISRO) to minimize tardiness, makespan, and curing energy under 1-month prepreg out-life constraints.",
        status: "Ongoing",
      },
      {
        title: "Summer Internship — Friction Stir Welding of AA1100 Aluminium (IIST)",
        summary:
          "Conducted vertical FSW trials (30 kN) on 6 mm AA1100 plates under Dr. P. Chakravarthy; tuned spindle/traverse parameters, executed ASTM E8 tensile tests (mean UTS 89.73 MPa, peak 92.85 MPa), ASTM E384 microhardness mapping (Cpk = 4.83), and optical metallography.",
        status: "Completed",
      },
      {
        title: "Industrial Experience — Tata Motors Passenger Vehicle & Skyline Projects (Pune)",
        summary:
          "Led End-of-Line vehicle quality inspection, fault diagnosis, QA/QC feedback loops, and line balancing as Graduate Apprenticeship Trainee at Tata Motors (Jan–Jul 2025) after site project execution at Skyline Projects (2024–2025).",
        status: "Completed",
      },
      {
        title: "3D Printing of 5-Stroke 6-Cylinder Rotary IC Engine & MeIOT System",
        summary:
          "Designed and 3D printed a 5-stroke 6-cylinder rotary IC engine demonstrator alongside an IoT-actuated mechanical monitoring architecture.",
        status: "Completed",
      },
    ],
    profileSections: [
      {
        title: "Experience & Summer Internship",
        body: "Research Intern — Friction Stir Welding, Dept. of Aerospace Engineering, IIST (Summer 2026, under Dr. P. Chakravarthy): Executed FSW parameter tuning, ASTM E8 tensile tests, ASTM E384 microhardness mapping, and metallography on 6 mm AA1100 plates.\n\nTeaching Assistant — IIST (Aug 2025 – Present): Instructing undergraduate CAD Lab and Metrology Lab Practices.\n\nGraduate Apprenticeship Trainee — Tata Motors Passenger Vehicle, Chikhali, Pune (Jan – Jul 2025): Line In-charge at End-of-Line Production overseeing final quality vehicle inspection, fault diagnosis, and line balancing.\n\nGraduate Engineer Trainee — Skyline Projects, Pune (Oct 2024 – Jan 2025): Site planning, material verification, and quality control.",
      },
      {
        title: "Education & Credentials",
        body: "M.Tech in Manufacturing Technology — IIST Thiruvananthapuram (2025 – 2027)\nB.Tech in Mechanical Engineering (NBA Accredited) — Government College of Engineering, Chandrapur (2020 – 2024, CGPA 7.64)\nQualified GATE Mechanical Engineering 2024 · Former President, MESA.",
      },
    ],
  },
  {
    slug: "anushyanth-a",
    name: "Anushyanth A",
    roll: "SC25M142",
    specialization: "CAD-CAM and CNC",
    broadIdea: "Repair Study on Friction Stir Welding of AA2219-T87 — VSSC",
    supervisor: "Dr. Chakravarthy P.",
    internship: "Research Intern at AMTDC, IIT Madras (Vision-based tool wear & dimensional measurement, Jun–Jul 2026)",
    projectTitle: "Repair Study on Friction Stir Welding of AA2219-T87 (VSSC)",
    photoUrl: "/media/photos/anushyanth.webp",
    resumeUrl: "/resumes/anushyanth.pdf",
    personalEmail: "anushyanth2003@gmail.com",
    linkedin: "https://www.linkedin.com/in/anushyanth-a-8a4481217",
    synopsis:
      "M.Tech scholar in Manufacturing Technology at IIST (B.E. Mechanical Engineering, Sri Venkateswara College of Engineering, Chennai) with prior industry experience as an Application Engineer at Kriatec Services Pvt. Ltd. (Mar 2024 – Jul 2025). At Kriatec, he developed GD&T-compliant CAD models and drawings, built CNC turning/milling simulations and post-processors in Hexagon Edgecam, and supported industrial CAM workflows.\n\nHis research portfolio bridges precision metrology and solid-state aerospace joining: he completed a summer research internship at AMTDC, IIT Madras (Jun–Jul 2026) building a vision-based tool wear and dimensional measurement system, and is conducting his M.Tech thesis at VSSC under Dr. Chakravarthy P. on repairing AA2219-T87 friction stir welds using Re-FSW, TIG, and Plug FSW.",
    skills: [
      "SolidWorks",
      "Creo Parametric",
      "Fusion 360",
      "Hexagon Edgecam",
      "CNC/CAM",
      "GD&T",
      "Ansys Workbench",
      "Abaqus",
      "MATLAB",
    ],
    skillGroups: {
      "CAD & CAM": [
        "SolidWorks",
        "Creo Parametric",
        "Fusion 360",
        "Hexagon Edgecam",
        "CNC/CAM Machining",
        "Post-Processor Modeling",
        "GD&T",
      ],
      "CAE & Simulation": ["Ansys Workbench", "Abaqus", "MATLAB & Simulink", "Finite-Element Stress Analysis"],
      "Welding & Metrology": [
        "Friction Stir Welding (Re-FSW / Plug FSW)",
        "TIG Repair Welding",
        "Vision-Based Tool Wear Detection",
        "Fixture Design",
      ],
    },
    projects: [
      {
        title: "Repair Study on Friction Stir Welding of AA2219-T87 — VSSC",
        summary:
          "M.Tech thesis guided by Dr. Chakravarthy P. evaluating room- and cryogenic-temperature tensile properties, microhardness, microstructure, and fractography of defective AA2219-T87 FSW joints repaired via Re-FSW, TIG, and Plug FSW.",
        status: "Ongoing",
      },
      {
        title: "Internship — Vision-Based Tool Wear & Dimensional Measurement (AMTDC, IIT Madras)",
        summary:
          "Research internship at AMTDC, IIT Madras (Jun–Jul 2026) designing and developing a vision-based optical inspection and measurement system for real-time tool wear detection and part metrology.",
        status: "Completed",
      },
      {
        title: "Design and Fabrication of an Electric Bike with Performance Optimization",
        summary:
          "Designed and fabricated a lightweight aerodynamic chassis validated through FEA stress, deformation, and virtual crash simulations in ANSYS alongside MATLAB Simulink trip-cycle battery optimization (2024).",
        status: "Completed",
      },
      {
        title: "Design and Fabrication of Quadcopter Drone",
        summary:
          "Designed and fabricated a multirotor quadcopter platform focusing on structural rigidity, low airframe weight, and propulsion integration (2023).",
        status: "Completed",
      },
    ],
    profileSections: [
      {
        title: "Experience & Summer Internship",
        body: "Application Engineer — Kriatec Services Pvt. Ltd. (Mar 2024 – Jul 2025): Developed CAD models and detailed GD&T technical drawings for CAM applications; simulated turning and milling operations using Hexagon Edgecam and developed CNC post-processor models; delivered customer technical support for CAM/CNC and authored e-learning technical courses.\n\nResearch Intern — Advanced Manufacturing Technology Development Centre (AMTDC), IIT Madras (Jun 2026 – Jul 2026): Designed and developed a vision-based measurement system for tool wear detection and dimensional measurement applications.",
      },
      {
        title: "Education",
        body: "M.Tech in Manufacturing Technology — Indian Institute of Space Science and Technology (IIST), Thiruvananthapuram (2025 – 2027)\nB.E. in Mechanical Engineering — Sri Venkateswara College of Engineering, Chennai (2020 – 2024)",
      },
      {
        title: "Certifications & Leadership",
        body: "Certifications: Geometric Dimensioning & Tolerancing (Learnew, AICTE evaluated) · Fixture Design (Learnew, AICTE evaluated) · Automation in Manufacturing (NPTEL).\nAchievements: Design Lead — National E Bike Challenge 2024 (Second Runner-up & Best Aesthetics Award) · Design Lead — SIEP E Bike Challenge 2023 (Best Future Award) · First Prize — Render Royal Inter-College Design Competition · Member of Bureau of Indian Standards.",
      },
    ],
  },
  {
    slug: "juveriya-sayyed",
    name: "Juveriya Sayyed",
    roll: "SC25M143",
    specialization: "Composite Manufacturing",
    broadIdea: "VSSC - DfAM - Auxetic Structures & CMSE Composites",
    supervisor: "Dr. Sooraj V. S",
    internship: "VSSC — Design for Additive Manufacturing (DfAM) of Auxetic Structures",
    projectTitle: "Composite Manufacturing & Structural Evaluation (CMSE)",
    skills: ["Composite Manufacturing", "DfAM & Auxetic Structures", "Aerospace Composites", "Process planning", "Technical documentation"],
    synopsis:
      "M.Tech scholar in Manufacturing Technology at IIST specializing in aerospace composite manufacturing and metamaterial structures under Dr. Sooraj V. S. Her academic focus bridges fiber-reinforced polymer processing with design for additive manufacturing (DfAM) methodologies for lightweight space structures.\n\nThrough her research and summer internship at Vikram Sarabhai Space Centre (VSSC) on DfAM of auxetic cellular architectures alongside her M.Tech thesis work with the Composites Entity (CMSE), she investigates process-structure relationships for high-stiffness aerospace hardware.",
    projects: [
      {
        title: "Composite Manufacturing & Structural Evaluation (CMSE)",
        summary:
          "M.Tech thesis research with CMSE guided by Dr. Sooraj V. S focusing on composite layup, curing workflows, and structural process integrity for space applications.",
        status: "Ongoing",
      },
      {
        title: "Summer Internship — DfAM of Auxetic Structures (VSSC)",
        summary:
          "Summer internship at Vikram Sarabhai Space Centre exploring design for additive manufacturing (DfAM) principles and mechanical behavior of negative-Poisson-ratio auxetic lattice geometries.",
        status: "Completed",
      },
    ],
  },
  {
    slug: "lakshmi-k",
    name: "Lakshmi K",
    roll: "SC25M144",
    specialization: "Incremental Forming",
    broadIdea: "Incremental Forming & Shock Tube High Strain Rate Deformation",
    supervisor: "Dr. Chakravarthy P.",
    internship: "M.Tech Research Internship in Molecular Dynamics Simulation (IIST) & Mechanical Engineering Intern at Nava Design",
    projectTitle: "High Strain Rate Forming Using Shock Tubes",
    photoUrl: "/media/photos/laxmi.webp",
    resumeUrl: "/resumes/laxmi.pdf",
    personalEmail: "lakshmikdev08@gmail.com",
    linkedin: "https://www.linkedin.com/in/lakshmi-k-756931229",
    synopsis:
      "M.Tech scholar in Manufacturing Technology at IIST with a B.Tech in Production Engineering from Government Engineering College, Thrissur. Her work combines continuum metal forming with atomistic physics, spanning single-point incremental sheet forming, CAD/CAM modeling (SolidWorks, AutoCAD, Creo), and CNC programming, backed by prior engineering internships at Nava Design & Innovation Pvt. Ltd. and HMT Machine Tools Limited.\n\nGuided by Dr. Chakravarthy P., her M.Tech research investigates high strain rate forming using shock tubes alongside her M.Tech research internship on Molecular Dynamics simulation—where she reconstructed an all-atom gas detonation forming model in LAMMPS and analyzed high-speed aluminium deformation, crystal defects, and fracture in OVITO.",
    skills: ["Incremental Forming", "LAMMPS", "OVITO", "Atomsk", "SolidWorks", "AutoCAD", "Creo", "Fusion 360", "CNC Programming", "Metrology", "MATLAB"],
    skillGroups: {
      "Simulation & Physics": ["LAMMPS", "OVITO", "Atomsk", "MATLAB"],
      "CAD & CAM": ["SolidWorks", "AutoCAD", "Creo", "Autodesk Fusion 360", "CNC G-Code"],
      "Manufacturing Processes": ["Incremental Forming", "Shock Tube Forming", "Metal Forming", "Metrology", "Production Planning"],
    },
    projects: [
      {
        title: "High Strain Rate Forming Using Shock Tubes & Incremental Sheet Forming",
        summary:
          "M.Tech thesis research guided by Dr. Chakravarthy P. studying deformation limits, thinning behavior, and strain-rate effects during shock-tube and incremental sheet forming of lightweight aerospace alloys.",
        status: "Ongoing",
      },
      {
        title: "Research Internship — All-Atom Molecular Dynamics Gas Detonation Forming (IIST)",
        summary:
          "Reconstructed and validated an all-atom gas detonation forming model in LAMMPS and analyzed aluminium deformation, dislocation defects, and fragmentation across high punch velocities in OVITO.",
        status: "Completed",
      },
      {
        title: "Industrial Internships — Nava Design & Innovation (2025) & HMT Machine Tools (2023)",
        summary:
          "Developed SolidWorks prototyping assemblies and vendor production workflows at Nava Design & Innovation Pvt. Ltd. (Mar–Jul 2025), following machining and QC training on CNC turning centers at HMT Machine Tools.",
        status: "Completed",
      },
      {
        title: "Formula Bharat 2023 Suspension Fabrication",
        summary: "Design, FEA stress analysis, and precision fabrication of suspension wishbones and uprights for a formula-style racecar.",
        status: "Completed",
      },
    ],
  },
  {
    slug: "shivam-ajay-saraswat",
    name: "Shivam Ajay Saraswat",
    roll: "SC25M145",
    specialization: "Mechanical Design & AM",
    broadIdea: "Metal 3D Printed Compliant Mechanisms (VSSC) & AMTDC CNC Systems",
    supervisor: "Dr. Sooraj V. S",
    internship: "VSSC (Compliant Mechanisms), AMTDC IIT Madras (CNC Dashboard) & DRDO ARDE (Servo Systems)",
    projectTitle: "Mathematical and Analytical Modelling of Metal 3D Printed Compliant Mechanism (VSSC)",
    photoUrl: "/media/photos/shivam.webp",
    resumeUrl: "/resumes/shivam.pdf",
    personalEmail: "shivamsaraswat551@gmail.com",
    linkedin: "https://www.linkedin.com/in/shivam-saraswat-705218238",
    synopsis:
      "M.Tech scholar in Manufacturing Technology at IIST (B.Tech Mechanical Engineering, MIT-WPU Pune) specializing in mechanical design, finite element simulation, and additive manufacturing. He combines multi-CAD and CAE proficiency (Creo, SolidWorks, Fusion 360, ANSYS, Abaqus, Simufact Additive) with industrial automation and controls engineering.\n\nHis applied research spans three national laboratories: conducting his M.Tech thesis at VSSC under Dr. Sooraj V. S on mathematical and analytical modeling of metal 3D printed compliant mechanisms, developing an OPC-UA CNC machine monitoring dashboard for Jyoti MTX 300 machines at AMTDC IIT Madras, and designing servo gun-laying kinematics at DRDO ARDE.",
    skills: ["Creo", "SolidWorks", "Fusion 360", "ANSYS Workbench", "Abaqus", "Simufact Additive", "3D Printing", "MATLAB & Simulink", "Compliant Mechanisms", "Python"],
    skillGroups: {
      "CAD & Design": ["Creo", "Fusion 360", "SolidWorks", "CATIA", "OnShape", "AutoCAD"],
      "CAE & Simulation": ["ANSYS Workbench", "Abaqus", "Simufact Additive"],
      "Programming & Tools": ["Python", "Java", "MATLAB", "Simulink", "Eclipse Milo"],
      "Core Competencies": ["Additive Manufacturing", "FEA & Structural Analysis", "Compliant Mechanisms", "Servo Systems"],
    },
    projects: [
      {
        title: "Metal 3D Printed Compliant Mechanisms (VSSC Thesis & Internship)",
        summary:
          "Mathematical, analytical, and FEA modeling of additively manufactured metallic flexure mechanisms for precision space payloads at VSSC under Dr. Sooraj V. S.",
        status: "Ongoing",
      },
      {
        title: "Internship — Industrial CNC Machine Dashboard (AMTDC, IIT Madras)",
        summary:
          "Designed and deployed an OPC-UA telemetry server via Eclipse Milo and live machine monitoring dashboard for Jyoti MTX 300 multi-axis CNC machining centers (2026).",
        status: "Completed",
      },
      {
        title: "Design Internship — Servo Mechanism for 2A42 Auto Cannon (DRDO ARDE)",
        summary:
          "Designed and analyzed a servo gun-laying mechanism for a 30mm auto cannon system using ANSYS structural simulations and MATLAB Simulink kinematic modeling (2023).",
        status: "Completed",
      },
      {
        title: "Random Positioning Machine for Microgravity Simulation",
        summary: "Multi-axis rotational simulator designed and analyzed via FEA to emulate microgravity environments for biological and material testing.",
        status: "Ongoing",
      },
    ],
  },
  {
    slug: "bishodeep-sardar",
    name: "Bishodeep Sardar",
    roll: "SC25M146",
    specialization: "Conventional Manufacturing",
    broadIdea: "GTAW of AA2014 Alloy (VSSC) & Incremental Forming",
    supervisor: "Dr. Chakravarthy P.",
    externalGuide: "Dr. Agilan (VSSC)",
    internship: "Mechanical properties and microstructure studies on gas tungsten arc welded AA2014 (VSSC)",
    projectTitle: "Incremental Forming & Aerospace Alloy Processing (IIST/VSSC)",
    synopsis:
      "M.Tech scholar in Manufacturing Technology at IIST specializing in conventional manufacturing processes, aerospace metallurgy, and fusion welding characterization under Dr. Chakravarthy P. His coursework and laboratory training center on weldability of high-strength aerospace aluminum alloys and formability mechanics.\n\nIn collaboration with Dr. Agilan at VSSC, his summer internship and research investigate mechanical properties and microstructural evolution in gas tungsten arc welded (GTAW) AA2014 alloy, alongside applied thesis work on incremental sheet forming of aerospace components.",
    projects: [
      {
        title: "Incremental Forming & Aerospace Alloy Processing (IIST/VSSC)",
        summary:
          "M.Tech project work guided by Dr. Chakravarthy P. investigating forming mechanics, tool-sheet interaction, and dimensional accuracy in metallic aerospace forming.",
        status: "Ongoing",
      },
      {
        title: "Summer Internship — GTAW of AA2014 Aluminum Alloy (VSSC)",
        summary:
          "Experimental investigation with Dr. Agilan (VSSC) evaluating microstructure zones, precipitate evolution, and tensile mechanical properties of gas tungsten arc welded AA2014 plates.",
        status: "Completed",
      },
    ],
  },
  {
    slug: "pranay-kumar-pandey",
    name: "Pranay Kumar Pandey",
    roll: "SC25M147",
    specialization: "Additive Manufacturing",
    broadIdea: "Ultrasonic Vibration-Assisted MIG-WAAM & Phase-Field Solidification",
    supervisor: "Dr. Sooraj V. S & Dr. Chakravarthy P.",
    externalGuide: "Dr. Venkateswaran C (VSSC, ISRO)",
    internship: "VSSC ISRO (TPS Glass Coatings, Ext: Dr. Venkateswaran C / Int: Dr. Chakravarthy P.), FOSSEE IIT Bombay & IIT Kharagpur",
    projectTitle: "Experimental and Numerical Investigations on Arc DED (Co-Guides: Dr. Sooraj V. S & Dr. Chakravarthy P.)",
    photoUrl: "/media/photos/pranay.webp",
    resumeUrl: "/resumes/pranay.pdf",
    personalEmail: "pranaypandey82@gmail.com",
    linkedin: "https://www.linkedin.com/in/pranay10",
    github: "https://github.com/Pranay1004",
    portfolio: "https://pandeyjii.vercel.app",
    synopsis:
      "M.Tech scholar in Manufacturing Technology at IIST (B.Tech Aerospace Engineering, GATE Aerospace AIR 651) conducting thesis research on Arc Directed Energy Deposition (Ultrasonic Vibration-Assisted MIG-WAAM) of austenitic stainless steel under internal co-guides Dr. Sooraj V. S and Dr. Chakravarthy P. His thesis couples macro-scale FEM/CFD thermal models with micro-scale Phase-Field Solidification Modelling (PFM), validated via Optical Microscopy, SEM, EBSD, and EDS.\n\nHis multi-institutional research span includes an internship at Vikram Sarabhai Space Centre (VSSC, ISRO) under external guide Dr. Venkateswaran C and internal guide Dr. Chakravarthy P. developing high-emissivity borosilicate glass TPS coatings and an in-house formulation toolbox (aero-toolbox); two stints at FOSSEE, IIT Bombay as Research Assistant and Summer Fellow in OpenFOAM CFD (National FOSSEE Emerging Talent Award 2025 & 1st Prize CFD Hackathon); and an Aeroengine Development Internship at IIT Kharagpur optimizing Variable Cycle Engine propulsion in GasTurb 14.",
    skills: ["Wire Arc Additive (WAAM)", "Phase-Field Modeling (PFM)", "Solidification Kinetics", "Ansys FEA & CFD", "OpenFOAM", "SolidWorks", "Thermal Protection Systems", "Python", "Simufact Additive"],
    skillGroups: {
      "Additive Manufacturing": ["MIG-WAAM", "Arc DED", "Ultrasonic-Assisted WAAM", "Solidification Control", "Simufact Additive"],
      "Modeling & Simulation": ["Phase-Field Solidification (PFM)", "Macro FEM/CFD", "OpenFOAM", "Ansys Fluent & Workbench", "GasTurb 14", "Abaqus"],
      "Design & Computing": ["SolidWorks", "Fusion 360", "Python", "C++", "GitHub", "Generative AI"],
    },
    projects: [
      {
        title: "M.Tech Thesis — Ultrasonic Vibration-Assisted MIG-WAAM & Phase-Field Modelling (IIST)",
        summary:
          "Internal Co-Guides: Dr. Sooraj V. S & Dr. Chakravarthy P. Parametric Arc DED investigation coupling ultrasonic vibration to refine columnar dendrites into equiaxed grains, uniting macro FEM/CFD models with micro-scale Phase-Field Solidification Modelling and SEM/EBSD/EDS validation.",
        status: "Ongoing",
      },
      {
        title: "Internship — Borosilicate Glass TPS Coatings & Formulation Toolbox (VSSC, ISRO)",
        summary:
          "External Guide: Dr. Venkateswaran C (VSSC, ISRO) · Internal Guide: Dr. Chakravarthy P. (IIST). Synthesized and thermally characterized high-emissivity borosilicate glass coatings on reusable silica TPS tiles in the Advanced Materials Group, and built an in-house computational glass formulation toolbox (aero-toolbox.vercel.app).",
        status: "Completed",
      },
      {
        title: "Research Assistant & Summer Fellowship — OpenFOAM CFD Modeling (FOSSEE, IIT Bombay)",
        summary:
          "Simulated non-Newtonian fluid flow across sinusoidal microchannels using custom OpenFOAM rheological solvers (2023 Fellowship), and mentored national cohorts while migrating CFD case studies to latest OpenFOAM releases (2025).",
        status: "Completed",
      },
      {
        title: "Aeroengine Development Internship — Variable Cycle Engine Optimization (IIT Kharagpur)",
        summary:
          "Conducted parametric and thermodynamic cycle analysis of Variable Cycle Engines in GasTurb 14 across take-off, subsonic, and supersonic flight regimes, optimizing bypass ratio, VABI geometry, and turbine entry temperature.",
        status: "Completed",
      },
    ],
    profileSections: [
      {
        title: "Research Experience & Internships",
        body: "Vikram Sarabhai Space Centre (VSSC), ISRO (Jun–Jul 2026) — Intern, Glass & Electronic Materials Division: Developed high-emissivity borosilicate glass coatings on porous silica TPS tiles and built the Aero-Toolbox formulation platform.\n\nFOSSEE, IIT Bombay (Mar–Jul 2025 & May–Aug 2023) — Research Assistant & Summer Fellow: OpenFOAM solver implementation for non-Newtonian microchannel flows, CFD case-study migration, and national intern mentorship.\n\nIIT Kharagpur (Jun–Jul 2024) — Aeroengine Development Intern: GasTurb 14 parametric thermodynamic cycle modeling for Variable Cycle Engines.",
      },
      {
        title: "Education & Honors",
        body: "M.Tech Manufacturing Technology — IIST Thiruvananthapuram (2025–2027)\nB.Tech Aerospace Engineering — Amity University Mumbai (2021–2025, CGPA 8.28)\n\nHonors: National FOSSEE Awards 2025 (Emerging Talent in Open Source Software) · GATE Aerospace 2025 (AIR 651) · 1st Prize FOSSEE CFD Hackathon · NASA Space Apps Global Qualifier · NPTEL Course Topper (IIT Kharagpur).",
      },
    ],
  },
  {
    slug: "abdullah-rishad",
    name: "Abdullah Rishad",
    roll: "SC25M179",
    specialization: "Smart Manufacturing",
    broadIdea: "WAAM of Titanium Shielding Design (L&T AMCoE) & AA7075 SCC Studies",
    supervisor: "Dr. Sooraj V. S",
    internship: "L&T AMCoE Precision Manufacturing Systems Centre (WAAM of Titanium Shielding, Jun–Jul 2026)",
    projectTitle: "GTAW of AA7075 & Stress Corrosion Cracking Studies (VSSC) / Titanium WAAM Shielding",
    photoUrl: "/media/photos/rishad.webp",
    resumeUrl: "/resumes/rishad.pdf",
    personalEmail: "rishadabdullahemo@gmail.com",
    linkedin: "https://www.linkedin.com/in/abdullah-rishad-721195162",
    synopsis:
      "M.Tech scholar in Manufacturing Technology at IIST (CGPA 8.92) and 1st Year M.Tech Student Representative, holding a B.Tech in Production Engineering from GEC Thrissur and prior industrial experience leading retail operations at Walkaroo (Coimbatore). His technical toolkit spans Fusion 360, Abaqus CAE, Simufact Additive, Ansys Fluent, CAPP, and CAM programming.\n\nGuided by Dr. Sooraj V. S, his research and industrial engagements pair his M.Tech thesis project at VSSC (ISRO) on GTAW of AA7075 and stress corrosion cracking (SCC) mitigation with his summer internship at L&T AMCoE Precision Manufacturing Systems Centre designing inert trailing shielding systems for Wire Arc Additive Manufacturing of Titanium alloys.",
    skills: ["Titanium WAAM", "Shielding Gas Design", "Abaqus CAE", "Fusion 360", "Simufact Additive", "Ansys Fluent", "CAPP & CAM", "Process Optimization", "Time Study"],
    skillGroups: {
      "Engineering Software": ["Fusion 360", "AutoCAD", "Abaqus CAE", "Simufact Additive", "Ansys Fluent", "MATLAB"],
      "Manufacturing Engineering": ["WAAM of Titanium", "Shielding Gas Design", "CAPP", "CAM Programming", "GTAW"],
      "Industrial Operations": ["Process Optimization", "Time Study", "Plant Layout Planning", "Operations Management"],
    },
    projects: [
      {
        title: "GTAW of AA7075 and Stress Corrosion Cracking Studies (VSSC, ISRO)",
        summary:
          "M.Tech thesis research examining weld joint integrity, heat-affected zone susceptibility, and stress corrosion cracking (SCC) resistance in aerospace AA7075 aluminum alloy.",
        status: "Ongoing",
      },
      {
        title: "Summer Internship — Shielding System for Titanium WAAM (L&T AMCoE, Coimbatore)",
        summary:
          "Designed trailing inert gas shielding fixtures at PES IC AMCoE, L&T Ltd (Jun–Jul 2026) to suppress oxidation and alpha-case embrittlement during Ti-6Al-4V wire arc additive deposition.",
        status: "Completed",
      },
      {
        title: "Industrial Internship — Thermal Power Operations (NLCIL, Neyveli) & Retail Operations (Walkaroo)",
        summary:
          "Completed plant engineering exposure at Neyveli New Thermal Power Station (May 2023) and managed central warehouse and multi-store engineering operations as Assistant Executive at Walkaroo (2024–2025).",
        status: "Completed",
      },
    ],
  }
];

const outgoingStudents = [
  {
    slug: "arun-binu",
    name: "Arun Binu",
    roll: "SC24M021",
    specialization: "Manufacturing Technology",
    personalEmail: "arunbinu2001@gmail.com",
    officialEmail: "arun.sc24m021@pg.iist.ac.in",
    linkedin: "https://linkedin.com/in/arun-binu-959284207",
    internship: "Optimization of Process Parameters for Powder Bed Fusion of H13 Steel",
    internalGuide: "Dr. B S Girish",
    placedAt: "Textron India Pvt. Ltd.",
    placedRole: "Engineer 1",
  },
  {
    slug: "pushpal-das",
    name: "Pushpal Das",
    roll: "SC24M022",
    specialization: "Manufacturing Technology",
    personalEmail: "pushpaldas08@gmail.com",
    officialEmail: "pushpal.sc24m022@pg.iist.ac.in",
    linkedin: "https://linkedin.com/in/pushpal-das-5b3018182",
    internship: "Study on Partial Vacuum Electron Welding and Investigation of HAZ Brittle Failure of Electron Welded ESR modified 15CDV6",
    internalGuide: "Dr. P Chakravarthy",
    placedAt: "Bharat Electronics Ltd.",
    placedRole: "Probationary Engineer",
  },
  {
    slug: "naisha-muhammed",
    name: "Naisha Muhammed",
    roll: "SC24M023",
    specialization: "Manufacturing Technology",
    personalEmail: "naishacadd@gmail.com",
    officialEmail: "naisha.sc24m023@pg.iist.ac.in",
    linkedin: "https://linkedin.com/in/naisha-muhammed",
    internship: "Wire Arc Additive Manufacturing of Mild Steel",
    internalGuide: "Dr. P Chakravarthy",
    placedAt: "Opting for higher studies",
    placedRole: undefined,
  },
  {
    slug: "t-v-divya",
    name: "T V Divya",
    roll: "SC24M024",
    specialization: "Manufacturing Technology",
    personalEmail: "divyarayar123@gmail.com",
    officialEmail: "divya.sc24m024@pg.iist.ac.in",
    linkedin: "https://linkedin.com/in/divya-t-v-0802771b2",
    internship: "Abrasive Flow Finishing",
    internalGuide: "Dr. B S Girish",
    placedAt: "Solar Defence",
    placedRole: "PGT",
  },
  {
    slug: "buddha-sai-dinesh",
    name: "Buddha Sai Dinesh",
    roll: "SC24M025",
    specialization: "Manufacturing Technology",
    personalEmail: "dbs20806@gmail.com",
    officialEmail: "dinesh.sc24m025@pg.iist.ac.in",
    linkedin: undefined,
    internship: "Environmental Cracking Resistance of High Strength Low Alloy Steels in 3.5% NaCl Solution, using Compact Tension Specimens",
    internalGuide: "Dr. V S Sooraj",
    placedAt: "Agnikul Cosmos",
    placedRole: "Associate - E",
  },
  {
    slug: "gayathri-v-krishna",
    name: "Gayathri V Krishna",
    roll: "SC24M026",
    specialization: "Manufacturing Technology",
    personalEmail: "gayathri.vkrish2000@gmail.com",
    officialEmail: "gayathri.sc24m026@pg.iist.ac.in",
    linkedin: "https://linkedin.com/in/gayathri-v-krishna",
    internship: "Studies on Wire Arc Additive Manufacturing of AA2319 Al-Cu Alloy",
    internalGuide: "Dr. V S Sooraj",
    placedAt: "IIT Madras",
    placedRole: "PhD Offer - July 2026",
  },
  {
    slug: "p-j-arjun",
    name: "P J Arjun",
    roll: "SC24M027",
    specialization: "Manufacturing Technology",
    personalEmail: "aaromalpj@gmail.com",
    officialEmail: "arjun.sc24m027@pg.iist.ac.in",
    linkedin: "https://linkedin.com/in/p-j-arjun-1036b01b7",
    resumeUrl: "/resumes/arjun.pdf",
    internship: "Preliminary Insights into the Comparative Behavior of Titanium Alloy Ti-6Al-4V with and without Boron Addition Produced by Laser Powder Bed Fusion",
    internalGuide: "Dr. V S Sooraj",
    placedAt: "Bharat Electronics Ltd.",
    placedRole: "Probationary Engineer",
  },
] as const;

const incomingStudents = Array.from({ length: 12 }, (_, index) => ({
  slug: `incoming-2026-${index + 1}`,
  name: `Incoming Scholar ${String(index + 1).padStart(2, "0")}`,
  specialization: "Profile opens after joining",
}));

const phdScholars = [
  ["preeti", "Preeti", "Space Payload Prototyping", "Dr. Sooraj V. S", "2025", "Sponsored"],
  ["ashish-zachariah", "Ashish Zachariah", "Metal Additive Manufacturing", "Dr. Sooraj V. S", "2024", "Regular"],
  ["akhil-a-i", "Akhil A I", "Space Manufacturing Research", "Dr. Sooraj V. S", "2023", "Regular"],
  ["mohan-j", "Mohan J", "Aerospace Manufacturing Systems", "Dr. Sooraj V. S", "2021", "Sponsored"],
  ["ciju-paul", "Ciju Paul", "Aerospace Alloy Processing", "Dr. Chakravarthy P.", "2025", "Sponsored"],
  ["muhammed-rijas-a", "Muhammed Rijas A", "Welding and Forming of Refractory Alloys", "Dr. Chakravarthy P.", "2025", "Sponsored"],
  ["bishwajyoti-dutta-majumdar", "Bishwajyoti Dutta Majumdar", "Metallurgy and Materials Processing", "Dr. Chakravarthy P.", "2024", "Sponsored"],
  ["santhosh-kumar-k", "Santhosh Kumar K", "Aerospace Materials Research", "Dr. Chakravarthy P.", "2021", "Sponsored"],
  ["gokul-baiju", "Gokul Baiju", "Manufacturing Systems and Scheduling", "Dr. B. S. Girish", "2025", "Regular"],
  ["sona-babu", "Sona Babu", "Manufacturing Scheduling", "Dr. B. S. Girish", "2022", "Regular"],
] as const;

people.push(
  ...currentStudents.map((s): Person => ({
    slug: s.slug,
    type: "student",
    name: s.name,
    role: `M.Tech Scholar, ${s.roll}`,
    batch: "2025-2027",
    cohort: "2025-2027",
    specialization: s.specialization,
    officialEmail: `${s.name.split(" ")[0].toLowerCase()}.${s.roll.toLowerCase()}@pg.iist.ac.in`,
    personalEmail: s.personalEmail ?? `${s.slug.replaceAll("-", ".")}@gmail.com`,
    portfolio: s.portfolio ?? `https://${s.slug}.portfolio.example`,
    linkedin: s.linkedin ?? `https://www.linkedin.com/in/${s.slug}`,
    github: s.github,
    photoUrl: s.photoUrl,
    resumeUrl: s.resumeUrl,
    availability: "Open to roles",
    supervisor: s.supervisor,
    synopsis: s.synopsis ?? `Outgoing M.Tech Manufacturing Technology scholar building aerospace-oriented manufacturing depth through coursework, lab work, process planning, and applied thesis research. Specializing in ${s.specialization} with active research focus on ${s.broadIdea || s.specialization}.\n\nConducted applied summer internship research on ${s.internship} alongside core M.Tech thesis investigations on ${s.projectTitle}, supervised by ${s.supervisor}${s.externalGuide ? ` and ${s.externalGuide}` : ""}.`,
    skills: s.skills ?? [s.specialization, "Process planning", "Technical documentation", "Aerospace manufacturing"],
    skillGroups: s.skillGroups ?? {
      Core: [s.specialization, "Materials and processes", "Design for manufacturing"],
      Tools: ["CAD", "Process sheets", "Inspection planning"],
      Professional: ["Technical writing", "Project reviews", "Presentation"],
    },
    projects: s.projects ?? [
      {
        title: s.projectTitle,
        summary: `M.Tech thesis work: ${s.projectTitle}. Guided by ${s.supervisor}${s.externalGuide ? ` and ${s.externalGuide}` : ""}.`,
        status: "Ongoing",
      },
      ...(s.internship && s.internship !== s.projectTitle
        ? [
            {
              title: `Summer Internship — ${s.internship}`,
              summary: `Applied internship research & engineering execution covering ${s.internship}.`,
              status: "Completed" as const,
            },
          ]
        : []),
    ],
    seekingRoles: [
      "Additive Manufacturing Engineer",
      "Composite Engineer",
      "Welding Engineer",
      "Production Engineer",
      "Quality Engineer",
      "Operations Engineer",
      "Graduate Engineer Trainee",
      "Smart Manufacturing Engineer",
    ],
    profileSections: s.profileSections ?? [
      {
        title: "Summer Internship",
        body: `Summer Internship Project: ${s.internship}.`
      },
      ...defaultStudentSections.filter(sec => sec.title !== "Summary")
    ],
  })),
  ...outgoingStudents.map((student): Person => ({
    slug: student.slug,
    type: "student",
    name: student.name,
    role: `M.Tech Scholar, ${student.roll}`,
    batch: "2024-2026",
    cohort: "2024-2026",
    specialization: student.specialization,
    officialEmail: student.officialEmail,
    personalEmail: student.personalEmail,
    linkedin: student.linkedin,
    resumeUrl: (student as { resumeUrl?: string }).resumeUrl,
    supervisor: student.internalGuide,
    internship: student.internship,
    internalGuide: student.internalGuide,
    placedAt: student.placedAt,
    placedRole: student.placedRole,
    availability: "Open to roles",
    synopsis:
      student.slug === "p-j-arjun"
        ? "M.Tech Manufacturing Technology (2024–2026, CGPA 9.26) scholar placed at Bharat Electronics Ltd. (BEL) as Probationary Engineer, holding a B.Tech in Mechanical Engineering (CGPA 9.74, KTU top 2% rank holder). First author of a peer-reviewed MDPI Coatings paper (2022) and NPTEL Silver Medalist across Manufacturing Systems & Process Technology courses from IIT Kanpur.\n\nConducted his M.Tech thesis project at CMSE, VSSC on path planning and thickness-control design for filament-wound liner-less composite tanks, alongside his MMA/MME VSSC summer internship comparing Laser Powder Bed Fusion (LPBF) Ti-6Al-4V with and without boron additions under Dr. V S Sooraj, and earlier composite tribology work at CSIR-NIIST."
        : `M.Tech Manufacturing Technology (2024–2026) scholar specializing in ${student.specialization}. Completed graduate coursework and laboratory training across additive manufacturing, aerospace metallurgy, precision machining, and manufacturing planning.\n\nThesis and internship research on "${student.internship}" guided by ${student.internalGuide}.${student.placedAt ? ` Placed at ${student.placedAt}${student.placedRole ? ` as ${student.placedRole}` : ""}.` : ""}`,
    skills:
      student.slug === "p-j-arjun"
        ? ["Laser Powder Bed Fusion", "Titanium Alloys (Ti-6Al-4V)", "Filament Winding Composites", "ANSYS FEA", "Abaqus", "Autodesk Fusion 360", "Inventor", "Microstructure Characterization"]
        : Array.from(new Set([student.specialization, "Process Analysis", "Aerospace Materials", "Process Planning"])),
    skillGroups: {
      Core: Array.from(new Set([student.specialization, "Process optimization", "Materials processing"])),
      Tools: ["CAD-CAM", "Data analysis", "Quality review"],
      Professional: ["Research writing", "Team coordination", "Industry communication"],
    },
    projects:
      student.slug === "p-j-arjun"
        ? [
            {
              title: "Path Planning & Thickness Control for Filament-Wound Liner-less Composite Tanks (CMSE, VSSC)",
              summary:
                "M.Tech project work carried out at CMSE, VSSC focusing on path planning and thickness-control design for manufacturing filament-wound liner-less aerospace composite pressure vessels.",
              status: "Completed",
            },
            {
              title: `Summer Internship — ${student.internship} (MMA/MME, VSSC)`,
              summary:
                `Comparative microstructure and mechanical evaluation of Laser Powder Bed Fusion (LPBF) Ti-6Al-4V with and without boron additions at VSSC (Jun–Aug 2025), guided by ${student.internalGuide}.`,
              status: "Completed",
            },
            {
              title: "Internship — Tribological & Mechanical Testing of Polymer Composites (CSIR-NIIST)",
              summary:
                "Experimental wear and mechanical characterization of nanoplatelet-reinforced polymer matrix composites at CSIR-NIIST, Pappanamcode.",
              status: "Completed",
            },
          ]
        : [
            {
              title: student.internship,
              summary: `Master's Thesis & Internship Project: ${student.internship}. Guided by ${student.internalGuide}.`,
              status: "Completed",
            },
          ],
    seekingRoles: ["Composite Engineer", "Welding Engineer", "Additive Manufacturing Engineer", "Production Engineer", "Quality Engineer", "Operations", "PGET", "Smart Manufacturing Engineer"],
    profileSections: [
      {
        title: "Master's Thesis & Internship Project",
        body: `Title: ${student.internship}\nInternal Guide: ${student.internalGuide}`,
      },
      ...(student.placedAt ? [{
        title: "Placement / Career Destination",
        body: `Placed at: ${student.placedAt}${student.placedRole ? ` (${student.placedRole})` : ""}`,
      }] : []),
      ...defaultStudentSections.filter(sec => sec.title !== "Summary")
    ],
  })),
  ...incomingStudents.map(({ slug, name, specialization }): Person => ({
    slug,
    type: "student",
    name,
    role: "M.Tech Scholar",
    batch: "2026-2028",
    cohort: "2026-2028",
    specialization,
    officialEmail: "to-be-updated@iist.ac.in",

    availability: "Joining soon",
    synopsis: "This profile will unlock when the 2026-2028 cohort joins the Manufacturing Technology program.",
    skills: ["Profile pending", "Joining August 2026"],
    skillGroups: { Status: ["Admission pending", "Profile locked"] },
    projects: [],
    seekingRoles: ["To be updated"],
    profileSections: [
      {
        title: "Profile locked",
        body: "Incoming students can add summary, skills, projects, resume, and custom sections after joining.",
      },
    ],
  })),
  ...phdScholars.map(([slug, name, specialization, supervisor, admissionYear, mode]): Person => ({
    slug,
    type: "phd",
    name,
    role: `PhD Scholar, ${admissionYear}`,
    specialization,
    supervisor,
    officialEmail: `${slug.replaceAll("-", ".")}@iist.ac.in`,
    linkedin: `https://www.linkedin.com/in/${slug}`,
    availability: "Research focused",
    admissionYear,
    mode,
    synopsis:
      `Doctoral researcher in Aerospace Engineering under ${supervisor}, listed on the IIST department PhD page. Public research details can be refined after the scholar claims the profile.`,
    skills: [specialization, "Research methods", "Publication writing", "Experimental planning"],
    skillGroups: {
      Research: [specialization, "Literature review", "Experimental design"],
      Communication: ["Journal manuscripts", "Conference presentations", "Technical reports"],
    },
    projects: [
      {
        title: specialization,
        summary: `Doctoral work under ${supervisor}, with public details to be updated by the scholar.`,
        status: "Ongoing",
      },
    ],
    seekingRoles: ["Postdoctoral research", "R&D scientist", "Faculty-track research"],
    profileSections: defaultPhdSections,
  })),
);



export function getPerson(slug: string) {
  return people.find(
    (person) =>
      person.slug === slug ||
      (slug === "prakash" && person.slug === "prakash-rs") ||
      (slug === "prakash-rs" && person.slug === "prakash")
  );
}

export function getPeopleByType(type: PersonType) {
  return people.filter((person) => person.type === type);
}
