export interface WorkSampleLink {
  url: string;
  label: string;
  icon: 'github' | 'external' | 'demo' | 'web';
}

export interface WorkSample {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  links?: WorkSampleLink[]; // Optional: Multiple links with labels and icons
  image?: string; // Optional: path to screenshot/image in /public folder
  category: string; // e.g., "Open Source", "Personal Project", "Professional Work"
}

export const workSamples: WorkSample[] = [
  {
    id: 1,
    title: "Duke Football Invitational Website",
    description: "Interactive fantasy football league website featuring weekly performance reports, team standings, and analytics for a 12-team league. Tracks 11 different awards including MVP and humorous categories, with sortable tables and responsive design. Generated from ESPN API data and deployed on AWS infrastructure.",
    technologies: ["Python", "ESPN API", "Jinja2", "AWS DynamoDB", "AWS S3", "CloudFront", "HTML/CSS/JavaScript"],
    links: [
      { url: "https://will.moore.fyi/duke-football-invitational/weekly-reports/index.html", label: "Live Site", icon: "web" },
      { url: "https://github.com/willmoorefyi/duke-football-invitiational-summary-generator", label: "Source Code", icon: "github" }
    ],
    category: "Personal Project"
  },
  {
    id: 2,
    title: "Personal Portfolio Website",
    description: "Modern, responsive portfolio website built with Next.js 16 static export, featuring dark mode, smooth animations, and optimized for AWS S3 static hosting. Showcases clean design principles and modern web development practices.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "AWS S3"],
    links: [
      { url: "https://will.moore.fyi", label: "Live Site", icon: "web" },
      { url: "https://github.com/willmoorefyi/willmoorefyi-personal-website", label: "Source Code", icon: "github" }
    ],
    category: "Personal Project"
  },
];
