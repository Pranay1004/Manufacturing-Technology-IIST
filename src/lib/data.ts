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
        title: "ARIS Payload Development on PSLV-C45 Orbital Platform",
        summary:
          "Design, fabrication, structural-thermal qualification, and successful mission operations of the Advanced Retarding Potential Analyzer for Ionospheric Studies (ARIS) payload launched on the PSLV PS4 orbital stage.",
        status: "Completed",
      },
      {
        title: "Smart Additive Grinding Wheels & Eccentric Sleeve Grinding (ESG)",
        summary:
          "Development of 3D printed re-configurable grinding tools with in-situ self-generated cold air and adaptive lubrication for sustainable machining of Ti6Al4V and CFRPs (ISAMPE 2024 Award).",
        status: "Ongoing",
      },
      {
        title: "Metallic Lattice Interstage Structures for Launch Vehicles",
        summary:
          "Topology optimization, generative design, and LPBF additive manufacturing of lightweight metallic lattice structures for nano and small satellite launch vehicle interstages.",
        status: "Ongoing",
      },
    ],
    photoUrl: "/media/photos/sooraj-vs.webp",
    sourceUrl: "https://www.iist.ac.in/people-faculty-profile/sooraj-v-s",
    profileSections: [
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
        title: "Flux Bounded TIG (FBTIG) Welding of Inconel 600 Superalloys",
        summary:
          "Experimental investigation and thermo-mechanical finite element simulations on flux-assisted keyhole TIG welding, increasing penetration depth and minimizing HAZ micro-fissuring.",
        status: "Completed",
      },
      {
        title: "Cryogenic Deformation & TRIP Behavior in Cryogenic Engine Alloys",
        summary:
          "Constitutive modelling of cryogenic deformation behaviour of ICSS 1218-321 and AISI 202 braze joints utilized in liquid propulsion rocket cryogenic engines (ICAMPS 2026).",
        status: "Ongoing",
      },
      {
        title: "Processing and Mechanical Quality of Autoclave-Grade Carbon/Epoxy Prepregs",
        summary:
          "Influence of out-life, laminate thickness, and vacuum bagging strategies on laminate consolidation and void content for aerospace structural components (ICAMPS 2026 Best Poster Award).",
        status: "Ongoing",
      },
    ],
    photoUrl: "/media/photos/chakravarthy-p.webp",
    sourceUrl: "https://www.iist.ac.in/people-faculty-profile/chakravarthy-p",
    profileSections: [
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
        title: "Alloy Design & Microstructure Informatics for Aerospace Systems",
        summary: "Integrated computational materials engineering (ICME) and experimental thermo-mechanical processing for aerospace structural alloys.",
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
  portfolio?: string;
  synopsis?: string;
  skills?: string[];
  skillGroups?: Record<string, string[]>;
  projects?: Project[];
}

const currentStudents: StudentData[] = [
  {
    slug: "aniket-balaji-parnale",
    name: "Aniket Balaji Parnale",
    roll: "SC25M141",
    specialization: "Quality Engineering & Production Scheduling",
    broadIdea: "Quality Engineering & Production Scheduling",
    supervisor: "Dr. B. S. Girish",
    internship: "Friction Stir Welding",
    projectTitle: "Scheduling of Autoclave (CMSE)",
    photoUrl: "/media/photos/aniket.webp",
    synopsis:
      "M.Tech scholar in Manufacturing Technology at IIST specializing in quality engineering, statistical process control, and production scheduling. Conducting master's research on autoclave scheduling optimization with CMSE and friction stir welding parameter evaluation.",
    skills: ["Quality Engineering", "Production Scheduling", "Autoclave Scheduling", "Statistical Process Control", "Friction Stir Welding", "CAD-CAM", "Optimization"],
  },
  {
    slug: "anushyanth-a",
    name: "Anushyanth A",
    roll: "SC25M142",
    specialization: "Composite Manufacturing",
    broadIdea: "AMTDC IIT Madras - AM",
    supervisor: "Dr. Sooraj V. S",
    internship: "AMTDC - IIT Madras",
    projectTitle: "Repair welding of FSW joints (VSSC)",
  },
  {
    slug: "juveriya-sayyed",
    name: "Juveriya Sayyed",
    roll: "SC25M143",
    specialization: "CAD-CAM and CNC",
    broadIdea: "VSSC - DfAM- Auxetic Structures",
    supervisor: "Dr. Sooraj V. S",
    internship: "VSSC - DfAM",
    projectTitle: "CMSE - Composites",
  },
  {
    slug: "lakshmi-k",
    name: "Lakshmi K",
    roll: "SC25M144",
    specialization: "Incremental Forming & Molecular Dynamics",
    broadIdea: "Incremental Forming & Shock Tube High Strain Rate Deformation",
    supervisor: "Dr. Chakravarthy P.",
    internship: "Incremental Forming & High Strain Rate Deformation (IIST/VSSC)",
    projectTitle: "High strain rate forming using shock tubes",
    photoUrl: "/media/photos/laxmi.webp",
    resumeUrl: "/resumes/laxmi.pdf",
    personalEmail: "lakshmikdev08@gmail.com",
    linkedin: "https://www.linkedin.com/in/lakshmi-k-756931229",
    synopsis:
      "M.Tech scholar in Manufacturing Technology at IIST with a B.Tech in Production Engineering from GEC Thrissur. Specializes in advanced metal forming, single point incremental sheet forming, molecular dynamics simulations (LAMMPS, OVITO), CAD/CAM modeling (SolidWorks, AutoCAD, Creo), and CNC programming for aerospace components.",
    skills: ["Incremental Forming", "LAMMPS", "OVITO", "Atomsk", "SolidWorks", "AutoCAD", "Creo", "Fusion 360", "CNC Programming", "Metrology", "MATLAB"],
    skillGroups: {
      "Simulation & Physics": ["LAMMPS", "OVITO", "Atomsk", "MATLAB"],
      "CAD & CAM": ["SolidWorks", "AutoCAD", "Creo", "Autodesk Fusion 360", "CNC G-Code"],
      "Manufacturing Processes": ["Incremental Forming", "Metal Forming", "Metrology", "Production Planning"],
    },
    projects: [
      {
        title: "Incremental Sheet Forming of Aerospace Alloys",
        summary: "Toolpath generation, deformation limits, and thinning behavior in single point incremental forming of lightweight sheets.",
        status: "Ongoing",
      },
      {
        title: "Formula Bharat 2023 Suspension Fabrication",
        summary: "Design, FEA stress analysis, and precision fabrication of suspension wishbones and uprights for formula-style racecar.",
        status: "Completed",
      },
    ],
  },
  {
    slug: "shivam-ajay-saraswat",
    name: "Shivam Ajay Saraswat",
    roll: "SC25M145",
    specialization: "Mechanical Design & Additive Manufacturing",
    broadIdea: "Metal 3D Printed Compliant Mechanisms (VSSC) & AMTDC CNC Systems",
    supervisor: "Dr. Sooraj V. S",
    internship: "VSSC (Compliant Mechanisms) & AMTDC IIT Madras (CNC Dashboard)",
    projectTitle: "Mathematical and Analytical Modelling of Metal 3D Printed Compliant Mechanism (VSSC)",
    photoUrl: "/media/photos/shivam.webp",
    resumeUrl: "/resumes/shivam.pdf",
    personalEmail: "shivamsaraswat551@gmail.com",
    linkedin: "https://www.linkedin.com/in/shivam-saraswat-705218238",
    portfolio: "https://github.com/WILLSHAPER5-10-5",
    synopsis:
      "M.Tech scholar in Manufacturing Technology at IIST with research and industrial experience at VSSC (mathematical modeling of metal 3D printed compliant mechanisms), AMTDC IIT Madras (CNC machine dashboard using Eclipse Milo OPC-UA), and DRDO ARDE (servo laying system kinematics). Expert in CAD/CAE simulations and microgravity positioning systems.",
    skills: ["Creo", "SolidWorks", "Fusion 360", "ANSYS Workbench", "Abaqus", "Simufact Additive", "3D Printing (Cura/Prusa)", "MATLAB & Simulink", "Compliant Mechanisms", "Python"],
    skillGroups: {
      "CAD & Design": ["Creo", "Fusion 360", "SolidWorks", "CATIA", "OnShape", "AutoCAD"],
      "CAE & Simulation": ["ANSYS Workbench", "Abaqus", "Simufact Additive"],
      "Programming & Tools": ["Python", "Java", "MATLAB", "Simulink", "Eclipse Milo"],
      "Core Competencies": ["Additive Manufacturing", "FEA & Structural Analysis", "Compliant Mechanisms", "Servo Systems"],
    },
    projects: [
      {
        title: "Metal 3D Printed Compliant Mechanisms (VSSC)",
        summary: "Mathematical and analytical modelling of additively manufactured compliant flexures and mechanisms for space payloads at VSSC.",
        status: "Ongoing",
      },
      {
        title: "Industrial CNC Machine Dashboard (AMTDC IIT Madras)",
        summary: "OPC-UA server generation via Eclipse Milo and monitoring dashboard for Jyoti MTX 300 multi-axis CNC machines.",
        status: "Completed",
      },
      {
        title: "Random Positioning Machine for Microgravity Simulation",
        summary: "Multi-axis rotational simulator to emulate microgravity environments for biological and material testing.",
        status: "Ongoing",
      },
    ],
  },
  {
    slug: "bishodeep-sardar",
    name: "Bishodeep Sardar",
    roll: "SC25M146",
    specialization: "Conventional Manufacturing",
    broadIdea: "Mechanical properties and microstructure studies on gas tungsten arc welded AA2014 alloy",
    supervisor: "Dr. Chakravarthy P.",
    externalGuide: "Dr. Agilan (VSSC)",
    internship: "Mechanical properties and microstructure studies on gas tungsten arc welded AA2014",
    projectTitle: "Incremental Forming (IIST/VSSC)",
  },
  {
    slug: "pranay-kumar-pandey",
    name: "Pranay Kumar Pandey",
    roll: "SC25M147",
    specialization: "Wire Arc Additive Manufacturing (WAAM) & Multi-scale Modeling",
    broadIdea: "Ultrasonic Vibration-Assisted MIG-WAAM & Phase-Field Solidification",
    supervisor: "Dr. Chakravarthy P.",
    externalGuide: "Mr. C Venkateswaran",
    internship: "Experimental and Numerical Investigations on Arc DED (WAAM)",
    projectTitle: "Ultrasonic Vibration-Assisted MIG-WAAM & Phase-Field Solidification Modelling",
    photoUrl: "/media/photos/pranay.webp",
    resumeUrl: "/resumes/pranay.pdf",
    personalEmail: "pranaypandey82@gmail.com",
    linkedin: "https://www.linkedin.com/in/pranay10",
    portfolio: "https://pandeyjii.vercel.app",
    synopsis:
      "M.Tech scholar in Manufacturing Technology at IIST (B.Tech Aerospace Engineering). Thesis research on Arc Directed Energy Deposition (WAAM) of austenitic stainless steel, integrating ultrasonic vibration coupling to refine dendritic grain structures, multi-scale macro FEM/CFD thermal models, and micro-scale Phase-Field Solidification Modelling (PFM). Former Research Assistant at FOSSEE, IIT Bombay.",
    skills: ["Wire Arc Additive (WAAM)", "Phase-Field Modeling (PFM)", "Solidification Kinetics", "Ansys FEA & CFD", "SolidWorks", "Thermal Protection Systems", "Python", "Generative AI"],
    skillGroups: {
      "Additive Manufacturing": ["MIG-WAAM", "Arc DED", "Ultrasonic-Assisted WAAM", "Solidification Control"],
      "Modeling & Simulation": ["Phase-Field Solidification (PFM)", "Macro FEM/CFD", "Ansys Fluent", "Thermo-mechanical Analysis"],
      "Design & Computing": ["SolidWorks", "Python", "Generative AI", "C++"],
    },
    projects: [
      {
        title: "Ultrasonic Vibration-Assisted Arc DED of Stainless Steel",
        summary: "Parametric optimization and hybrid acoustic vibration coupling to refine columnar dendritic grains into equiaxed structures in WAAM.",
        status: "Ongoing",
      },
      {
        title: "Phase-Field Solidification Modeling (PFM)",
        summary: "Micro-scale phase-field numerical simulation capturing dendritic morphology, solute partitioning, and cooling rates during metal deposition.",
        status: "Ongoing",
      },
    ],
  },
  {
    slug: "abdullah-rishad",
    name: "Abdullah Rishad",
    roll: "SC25M179",
    specialization: "Smart Manufacturing & Titanium WAAM",
    broadIdea: "WAAM of Titanium Shielding Design (L&T AMCoE) & AA7075 SCC Studies",
    supervisor: "Dr. Sooraj V. S",
    internship: "L&T AMCoE Precision Manufacturing Systems Centre (WAAM of Titanium Shielding)",
    projectTitle: "Design of Shielding Systems for WAAM of Titanium Alloys & GTAW of AA7075",
    photoUrl: "/media/photos/rishad.webp",
    resumeUrl: "/resumes/rishad.pdf",
    personalEmail: "rishadabdullahemo@gmail.com",
    linkedin: "https://www.linkedin.com/in/abdullah-rishad-721195162",
    synopsis:
      "M.Tech scholar in Manufacturing Technology at IIST (CGPA 8.92) and 1st Year M.Tech Student Representative. Conducted industrial internship at L&T AMCoE Precision Manufacturing Systems Centre designing trailing shielding systems for WAAM of Titanium alloys. Research on GTAW of AA7075 and stress corrosion cracking (SCC) mitigation.",
    skills: ["Titanium WAAM", "Shielding Gas Design", "Abaqus CAE", "Fusion 360", "Simufact Additive", "Ansys Fluent", "CAPP & CAM", "Process Optimization", "Time Study"],
    skillGroups: {
      "Engineering Software": ["Fusion 360", "AutoCAD", "Abaqus CAE", "Simufact Additive", "Ansys Fluent", "MATLAB"],
      "Manufacturing Engineering": ["WAAM of Titanium", "Shielding Gas Design", "CAPP", "CAM Programming", "GTAW"],
      "Industrial Operations": ["Process Optimization", "Time Study", "Plant Layout Planning", "Operations Management"],
    },
    projects: [
      {
        title: "Shielding System for WAAM of Titanium Alloys (L&T AMCoE)",
        summary: "Trailing shield and chamber design to prevent atmospheric contamination and alpha-case embrittlement during wire arc deposition of Ti-6Al-4V.",
        status: "Ongoing",
      },
      {
        title: "GTAW of AA7075 and Stress Corrosion Cracking (SCC)",
        summary: "Investigation of weld joint integrity, heat affected zone susceptibility, and corrosion cracking resistance in aircraft aluminum alloys.",
        status: "Ongoing",
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
    photoUrl: s.photoUrl,
    resumeUrl: s.resumeUrl,
    availability: "Open to internships",
    supervisor: s.supervisor,
    synopsis: s.synopsis ?? `M.Tech Manufacturing Technology scholar building aerospace-oriented manufacturing depth through coursework, lab work, process planning, and applied project documentation. Specializing in ${s.specialization} with active research focus on ${s.broadIdea || s.specialization}.`,
    skills: s.skills ?? [s.specialization, "Process planning", "Technical documentation", "Aerospace manufacturing"],
    skillGroups: s.skillGroups ?? {
      Core: [s.specialization, "Materials and processes", "Design for manufacturing"],
      Tools: ["CAD", "Process sheets", "Inspection planning"],
      Professional: ["Technical writing", "Project reviews", "Presentation"],
    },
    projects: s.projects ?? [
      {
        title: s.projectTitle,
        summary: `M.Tech project work: ${s.projectTitle}. Guided by ${s.supervisor}${s.externalGuide ? ` and ${s.externalGuide}` : ""}.`,
        status: "Ongoing",
      }
    ],
    seekingRoles: ["COMPOSITE ENGINEER", "WELDING ENGINEER", "Additive Manufacturing Engineer", "Production Engineer", "Quality Engineer", "Operations", "PGET", "Smart Manufacturing Engineer"],
    profileSections: [
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
        ? "M.Tech Manufacturing Technology (2024-2026, CGPA 9.26) scholar placed at Bharat Electronics Ltd. (BEL) as Probationary Engineer. Researched Laser Powder Bed Fusion (LPBF) of Titanium Alloy Ti-6Al-4V with boron additions under Dr. V S Sooraj. First author of peer-reviewed review in MDPI Coatings (2022); KTU top 2% rank holder."
        : `M.Tech Manufacturing Technology (2024-2026) scholar specializing in ${student.specialization}. Thesis project: "${student.internship}" guided by ${student.internalGuide}.${student.placedAt ? ` Placed at ${student.placedAt}${student.placedRole ? ` as ${student.placedRole}` : ""}.` : ""}`,
    skills:
      student.slug === "p-j-arjun"
        ? ["Laser Powder Bed Fusion", "Titanium Alloys (Ti-6Al-4V)", "ANSYS FEA", "Abaqus", "Autodesk Fusion 360", "Inventor", "Microstructure Characterization"]
        : Array.from(new Set([student.specialization, "Process Analysis", "Aerospace Materials", "Process Planning"])),
    skillGroups: {
      Core: Array.from(new Set([student.specialization, "Process optimization", "Materials processing"])),
      Tools: ["CAD-CAM", "Data analysis", "Quality review"],
      Professional: ["Research writing", "Team coordination", "Industry communication"],
    },
    projects: [
      {
        title: student.internship,
        summary: `Master's Thesis Project: ${student.internship}. Guided by ${student.internalGuide}.`,
        status: "Completed",
      },
    ],
    seekingRoles: ["COMPOSITE ENGINEER", "WELDING ENGINEER", "Additive Manufacturing Engineer", "Production Engineer", "Quality Engineer", "Operations", "PGET", "Smart Manufacturing Engineer"],
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
