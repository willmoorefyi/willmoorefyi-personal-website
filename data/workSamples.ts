export interface WorkSample {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link?: string; // Optional: URL to live project or repository
  image?: string; // Optional: path to screenshot/image in /public folder
  category: string; // e.g., "Open Source", "Personal Project", "Professional Work"
}

export const workSamples: WorkSample[] = [
  {
    id: 1,
    title: "S3 Infrastructure Management Platform",
    description: "Built comprehensive tooling and monitoring services for managing the complete lifecycle of storage infrastructure across AWS's global regions. Platform provides fleet visibility, state management, and incident remediation capabilities for one of the world's largest cloud storage services.",
    technologies: ["Java", "AWS", "S3", "Distributed Systems", "Monitoring", "Automation"],
    category: "Professional Work"
  },
  {
    id: 2,
    title: "Behavioral Demand Response Platform",
    description: "Architected and delivered the nation's largest Behavioral Demand Response programs serving Exelon and PG&E territories. Multi-channel alert system (text, email, calls) that motivated millions of customers to reduce peak demand, improving grid stability through cost-effective behavioral interventions.",
    technologies: ["Java", "JavaScript", "Real-time Messaging", "SMS/Email Systems", "Data Analytics", "Behavioral Science"],
    category: "Professional Work"
  },
  {
    id: 3,
    title: "Home Energy Reports Platform",
    description: "Led development of personalized home energy reports using behavioral science techniques that drove 2-5% average energy reductions. Multi-channel platform processed millions of customer touchpoints (email, print, SMS) across utility territories, collectively eliminating billions of pounds of CO2 emissions.",
    technologies: ["Java", "JavaScript", "Data Analytics", "Behavioral Science", "Cloud Services"],
    category: "Professional Work"
  },
  {
    id: 4,
    title: "Duke Football Invitational Analytics Platform",
    description: "Comprehensive fantasy football analytics system with a 5-stage data pipeline that extracts data from ESPN leagues, processes statistics and awards, and generates interactive HTML reports. Features automated weekly summaries, 11 award categories, division strength analysis, and team performance tracking with sortable tables and responsive design. Deployed via AWS infrastructure with DynamoDB storage, S3 hosting, and CloudFront CDN.",
    technologies: ["Python", "ESPN API", "Pydantic", "Jinja2", "AWS DynamoDB", "AWS S3", "CloudFront", "HTML/CSS/JavaScript"],
    link: "https://will.moore.fyi/duke-football-invitational/weekly-reports/index.html",
    category: "Personal Project"
  },
  {
    id: 5,
    title: "Personal Portfolio Website",
    description: "Modern, responsive portfolio website built with Next.js 16 static export, featuring dark mode, smooth animations, and optimized for AWS S3 static hosting. Showcases clean design principles and modern web development practices.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "AWS S3"],
    link: "https://will.moore.fyi",
    category: "Personal Project"
  },
];
