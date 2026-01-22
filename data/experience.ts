export interface Experience {
  id: number;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  logo?: string; // Optional: path to company logo in /public folder
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Amazon Web Services (AWS)",
    role: "Software Development Manager - S3",
    startDate: "2022-05",
    endDate: "Present",
    location: "Arlington, Virginia",
    description: "Lead three engineering teams responsible for the complete lifecycle management of storage infrastructure across AWS's global regions. Build and operate critical platforms providing fleet visibility, state management, and incident remediation for one of the world's largest cloud storage services.",
    achievements: [
      "Manage three engineering teams delivering complete infrastructure lifecycle management—from initial deployment and capacity planning through retirement and consolidation",
      "Built automated tooling and monitoring services tracking hardware health and managing fleet operations across AWS's global regions",
      "Enable efficient scaling of storage infrastructure while maintaining continuous availability for millions of customers worldwide",
      "Optimize resource utilization across one of the world's largest cloud storage platforms, ensuring operational efficiency and cost-effectiveness",
      "Develop platforms foundational to S3's ability to deliver reliable, high-performance cloud storage at scale",
    ],
    technologies: ["Java", "AWS", "Distributed Systems", "S3", "Infrastructure Management", "Monitoring", "Automation", "Leadership"],
    logo: "/logos/aws.svg"
  },
  {
    id: 2,
    company: "Oracle Energy and Water (formerly Opower)",
    role: "Director of Engineering",
    startDate: "2020-08",
    endDate: "2022-05",
    location: "Arlington, Virginia",
    description: "Led engineering organization delivering customer-facing products for energy and water utilities. Managed multiple US and international teams building web applications and digital communications platforms on public cloud infrastructure.",
    achievements: [
      "Directed engineering organization with multiple distributed teams across US and international locations",
      "Delivered customer-facing SaaS products for utility companies serving millions of end customers",
      "Established engineering practices and processes for distributed team collaboration",
      "Oversaw migration and modernization of applications to public cloud infrastructure",
    ],
    technologies: ["Java", "JavaScript", "Cloud Architecture", "SaaS", "Team Leadership"],
    logo: "/logos/oracle.png"
  },
  {
    id: 3,
    company: "Oracle Energy and Water (formerly Opower)",
    role: "Senior Engineering Manager",
    startDate: "2019-03",
    endDate: "2020-08",
    location: "Arlington, Virginia",
    description: "Managed engineering teams building energy efficiency and customer engagement solutions for utility companies. Led development of web applications and digital communication platforms.",
    achievements: [
      "Managed multiple engineering teams delivering B2B2C applications",
      "Drove technical architecture decisions for scalable SaaS products",
      "Established agile development practices across distributed teams",
      "Improved team velocity and product delivery timelines",
    ],
    technologies: ["Java", "JavaScript", "React", "Cloud Services", "Agile"],
    logo: "/logos/oracle.png"
  },
  {
    id: 4,
    company: "Opower",
    role: "Engineering Manager",
    startDate: "2015-09",
    endDate: "2019-03",
    location: "Arlington, Virginia",
    description: "Managed software engineering teams developing energy efficiency and customer engagement platforms for utility companies. Led full-stack development teams building scalable web applications serving millions of utility customers.",
    achievements: [
      // INFERRED - Please review and edit:
      "Managed engineering teams building customer engagement platforms for energy utilities",
      "Delivered web applications supporting millions of utility customers nationwide",
      "Established engineering processes and best practices for team productivity",
      "Drove adoption of modern JavaScript frameworks and cloud technologies",
    ],
    technologies: ["Java", "JavaScript", "Web Applications", "SaaS", "Team Management"],
    logo: "/logos/opower.webp"
  },
  {
    id: 5,
    company: "Webs (Vistaprint)",
    role: "Principal Engineer",
    startDate: "2013-12",
    endDate: "2015-09",
    location: "Silver Spring, Maryland",
    description: "Principal Engineer on the digital team building scalable, performance-driven web platforms for next-generation Vistaprint products. Worked directly with product stakeholders utilizing agile methodologies, test-driven development, and modern technology stacks.",
    achievements: [
      "Architected and built scalable web platforms for Vistaprint digital products",
      "Led adoption of test-driven development practices across engineering teams",
      "Implemented modern Java and JavaScript technology stacks for high-performance applications",
      "Collaborated directly with product stakeholders using agile methodologies",
    ],
    technologies: ["Java", "JavaScript", "SQL", "NoSQL", "Agile", "TDD"],
    logo: "/logos/vistaprint.svg"
  },
  {
    id: 6,
    company: "TriTek Solutions (acquired by Perficient)",
    role: "Senior Project Manager / Lead Consultant",
    startDate: "2004-07",
    endDate: "2013-12",
    location: "Various client sites",
    description: "EMC Documentum Practice Lead for services delivery. Led enterprise consulting engagements for Fortune 500 companies implementing Enterprise Content Management (ECM) and Business Process Management (BPM) solutions. Extensive experience in application development, enterprise architecture, project management, and implementation of ECM systems including EMC Documentum, Documentum xCP, and IBM FileNet P8.",
    achievements: [
      "Served as Practice Lead for EMC Documentum services, managing multiple enterprise implementations",
      "Led teams of 12+ consultants across major implementations at Guy Carpenter, Bank of America, Northern Trust, MetLife, Express Scripts, MassMutual, and Citizens Bank",
      "Delivered ECM solutions managing 60M+ document migration at Guy Carpenter",
      "Architected and implemented Records Management, workflow automation, and document processing systems for Fortune 500 financial services and insurance companies",
      "Designed enterprise-wide FileNet P8 and Documentum implementation strategies and best practices",
      "Built high-volume document ingestion systems processing millions of documents for major financial institutions",
    ],
    technologies: [
      "EMC Documentum",
      "IBM FileNet P8",
      "Java",
      "JavaScript",
      "Spring",
      "ExtJS",
      "Oracle",
      "BPM",
      "ECM",
      "Agile/Scrum",
    ],
    logo: "/logos/tritek.jpg"
  },
];
