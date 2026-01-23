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
    description: "Expanded scope to lead engineering organization responsible for all customer touchpoints: outbound communications (home energy reports, BDR alerts, engagement campaigns) and white-labeled web experiences embedded in utility platforms. Managed multiple US and international teams delivering comprehensive energy efficiency insights and engagement tools to millions of utility customers worldwide.",
    achievements: [
      "Directed engineering teams across all customer channels—outbound communications (email, print, SMS, calls) and white-labeled digital experiences for utility platforms",
      "Delivered integrated customer engagement strategy leveraging behavioral science across both direct communications and web experiences",
      "Managed distributed teams across US and international locations building scalable B2B2C SaaS products serving millions of customers",
      "Oversaw platform modernization and cloud migration while maintaining 24/7 service availability across utility territories",
      "Established engineering practices enabling rapid experimentation and delivery of statistically significant energy savings and grid stability improvements",
    ],
    technologies: ["Java", "JavaScript", "React", "Cloud Architecture", "Data Analytics", "Behavioral Science", "Multi-channel SaaS"],
    logo: "/logos/oracle.png"
  },
  {
    id: 3,
    company: "Oracle Energy and Water (formerly Opower)",
    role: "Senior Engineering Manager",
    startDate: "2019-03",
    endDate: "2020-08",
    location: "Arlington, Virginia",
    description: "Following Oracle acquisition, assumed responsibility for all outbound communications including home energy reports, behavioral demand response alerts, and customer engagement campaigns. Managed multiple engineering teams across the complete outbound delivery pipeline, building data-driven insights and experiences delivered via email, print, SMS, and calls to millions of utility customers.",
    achievements: [
      "Expanded scope post-acquisition to manage all outbound communications—home energy reports, BDR alerts, and engagement campaigns across utility portfolios",
      "Built and maintained systems generating personalized energy reports with behavioral science techniques that drove 2-5% average energy reductions",
      "Scaled multi-channel communication platform (email, print, SMS, calls) processing millions of customer touchpoints across utility territories",
      "Led technical decisions for pattern recognition and usage-disaggregation analysis platforms enabling insights without in-home devices",
      "Established engineering practices and architecture enabling rapid iteration and A/B testing of behavioral interventions at scale",
    ],
    technologies: ["Java", "JavaScript", "Data Analytics", "Behavioral Science", "Multi-channel Delivery", "Cloud Services"],
    logo: "/logos/oracle.png"
  },
  {
    id: 4,
    company: "Opower",
    role: "Engineering Manager - Behavioral Demand Response",
    startDate: "2015-09",
    endDate: "2019-03",
    location: "Arlington, Virginia",
    description: "Led engineering team responsible for Behavioral Demand Response (BDR) programs—using personalized nudges, insights, and timely alerts via text, email, and calls to encourage customers to voluntarily shift or reduce electricity use during peak demand periods. Delivered the largest BDR programs in the country across Exelon utility territories and Pacific Gas & Electric (PG&E).",
    achievements: [
      "Built and scaled the nation's largest Behavioral Demand Response programs serving Exelon and PG&E territories",
      "Delivered multi-channel alert systems (text, email, calls) that motivated customers to reduce peak demand without costly in-home devices",
      "Improved grid stability and resilience through cost-effective, scalable behavioral interventions during high-stress grid periods",
      "Developed platforms educating and motivating millions of customers to adjust energy habits (delaying laundry, adjusting thermostats) during peak times",
      "Established engineering practices enabling real-time delivery of personalized energy-saving recommendations at scale",
      "Bridged traditional energy reporting with direct load control through behavioral science and timely customer engagement",
    ],
    technologies: ["Java", "JavaScript", "Real-time Messaging", "SMS/Email Systems", "Data Analytics", "Behavioral Science", "Grid Operations"],
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
