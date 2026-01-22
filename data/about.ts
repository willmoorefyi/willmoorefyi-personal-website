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
      "Write your first paragraph here. This is your chance to tell your story - what drives you, how you got into software engineering, what you're passionate about.",
      "Second paragraph (optional). You can expand on your career journey, your approach to problem-solving, or what you're currently focused on.",
      "Third paragraph (optional). Share your vision, what you're excited about in tech, or what you bring to the table."
    ]
  },
  skills: [
    {
      category: "Languages",
      items: ["TypeScript", "Python", "Java", "Go", "etc"]
    },
    {
      category: "Frontend",
      items: ["React", "Next.js", "Tailwind CSS", "etc"]
    },
    {
      category: "Backend",
      items: ["Node.js", "AWS", "Docker", "etc"]
    },
    {
      category: "Tools & Practices",
      items: ["Git", "CI/CD", "Agile", "etc"]
    }
  ],
  interests: [
    "Interest 1 (e.g., Open Source Contribution)",
    "Interest 2 (e.g., Photography)",
    "Interest 3 (e.g., Hiking)",
    "Interest 4 (e.g., Coffee)",
  ]
};
