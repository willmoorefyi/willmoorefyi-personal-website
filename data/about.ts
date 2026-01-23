export interface AboutData {
  bio: {
    paragraphs: string[];
  };
  skills: {
    category: string;
    items: string[];
  }[];
  interests: string[];
}

export const aboutData: AboutData = {
  bio: {
    paragraphs: [
      "My path into software started with late-night LAN parties in the mid-90s—configuring mouse drivers in high memory and daisy-chaining desktop towers to play DOOM taught me how computers really work and sparked a fascination with building software that's stayed with me ever since.",
      "After Duke, I spent nearly a decade in consulting, where I learned a critical lesson: impressive projects often failed after my team left. Sustainable success requires building consensus, developing high-performing teams, and delivering through others—not just through individual technical prowess. That realization shaped my transition from individual contributor to engineering leader.",
      "At Opower, I discovered something equally transformative: software at scale can create real-world social impact. Leading the nation's largest Behavioral Demand Response programs, I saw how our platforms helped millions of customers reduce energy consumption, improve grid stability, and collectively eliminate billions of pounds of CO2 emissions. That experience—seeing technology drive measurable environmental and social good—fundamentally changed how I think about engineering leadership and remains a defining part of my career journey.",
      "Today at AWS, I lead three teams managing infrastructure for S3—the largest collection of hard drives serving customer traffic in the world. The scale and unique challenges of operating systems at this magnitude, while obsessing over our customers, creates continuous opportunities for growth that only exist at Amazon.",
      "My leadership philosophy is simple: do the right things, and do them consistently. Management is about people, and results are achieved by people. Along the way, I've learned that prioritizing harmony between work and family—coaching softball, being present—makes me a better leader and father."
    ]
  },
  skills: [
    {
      category: "Leadership & Management",
      items: ["Engineering Management", "Team Building", "Distributed Teams", "Agile/Scrum", "Technical Leadership"]
    },
    {
      category: "Cloud & Infrastructure",
      items: ["AWS", "S3", "Distributed Systems", "Cloud Architecture", "Infrastructure Management", "Monitoring & Observability"]
    },
    {
      category: "Languages & Frameworks",
      items: ["Java", "JavaScript", "TypeScript", "React", "Spring", "Node.js"]
    },
    {
      category: "Specializations",
      items: ["Behavioral Science", "Data Analytics", "SaaS Architecture", "Grid Operations", "Real-time Systems", "A/B Testing"]
    }
  ],
  interests: [
    "Youth Sports Coaching (Softball & Basketball)",
    "Family Time",
    "Fantasy Football",
    "Travel & Exploring Europe",
  ]
};
