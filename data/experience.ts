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
    company: "Amazon",
    role: "Software Development Manager",
    startDate: "YYYY-MM", // e.g., "2022-01"
    endDate: "Present",
    location: "Location",
    description: "Brief description of your role and team focus",
    achievements: [
      "Key achievement or impact with metrics (e.g., 'Reduced latency by 40%')",
      "Leadership accomplishment (e.g., 'Led team of 8 engineers')",
      "Technical initiative (e.g., 'Architected new microservice architecture')",
    ],
    technologies: ["AWS", "TypeScript", "React", "Python", "etc"],
    // logo: "/logos/amazon.png" // Uncomment and add logo to /public/logos/
  },
  {
    id: 2,
    company: "Previous Company",
    role: "Your Role",
    startDate: "YYYY-MM",
    endDate: "YYYY-MM",
    location: "Location",
    description: "Brief description of your role",
    achievements: [
      "Achievement 1",
      "Achievement 2",
      "Achievement 3",
    ],
    technologies: ["Tech1", "Tech2", "Tech3"],
  },
  {
    id: 3,
    company: "Another Company",
    role: "Your Role",
    startDate: "YYYY-MM",
    endDate: "YYYY-MM",
    location: "Location",
    description: "Brief description of your role",
    achievements: [
      "Achievement 1",
      "Achievement 2",
    ],
    technologies: ["Tech1", "Tech2"],
  },
  {
    id: 4,
    company: "Earlier Company",
    role: "Your Role",
    startDate: "YYYY-MM",
    endDate: "YYYY-MM",
    location: "Location",
    description: "Brief description of your role",
    achievements: [
      "Achievement 1",
      "Achievement 2",
    ],
    technologies: ["Tech1", "Tech2"],
  },
  // Add more positions as needed
];
