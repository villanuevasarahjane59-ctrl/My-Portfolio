import type { StaticImageData } from "next/image";

import logoMark from "@/public/images/logo-mark.svg";
import profilePhoto from "@/public/images/profile.png";
import herbmedPoster from "@/public/images/projects/herbmed-poster.jpg";
import herbmedLogin from "@/public/images/projects/herbmed-login.png";
import herbmedHomepage from "@/public/images/projects/herbmed-homepage.png";
import votingLogin from "@/public/images/projects/voting-login.png";
import votingBallot from "@/public/images/projects/voting-ballot.png";
import certAiLiteracy from "@/public/images/certificates/ai-literacy-responsible-use.jpg";
import certCisco from "@/public/images/certificates/cisco-networking-basics.jpg";
import certThesisSeminar from "@/public/images/certificates/bipsu-thesis-preparation-seminar.jpg";
import certGartner from "@/public/images/certificates/gartner-webinar.jpg";

// All portfolio content lives here so text can be updated without touching the layout.

export const profile = {
  name: "Sarah Jane E. Villanueva",
  shortName: "Sarah Jane",
  role: "UI Designer",
  tagline: "UI Designer",
  logo: logoMark,
  intro:
    "A Computer Science student at Biliran Province State University with a passion for application design and crafting clean, user-friendly digital layouts.",
  photo: profilePhoto,
  email: "villanuevasarahjane59@gmail.com",
  instagram: { handle: "sarah_jeyn", url: "https://www.instagram.com/sarah_jeyn/" },
  // Generated from assets/resume/resume.html (no phone number, since it is public)
  resume: "/My-Resume.pdf",
  location: "Masagaosao, Kawayan, Biliran",
};

export const about = {
  paragraphs: [
    "Hi! I am a 4th year Computer Science student at Biliran Province State University with a passion for application design.",
    "I have experience in designing layouts, and I'm always looking for ways to learn and create better digital layout experiences.",
  ],
  facts: [
    { label: "Focus", value: "UI Design" },
    { label: "Degree", value: "BS Computer Science" },
  ],
};

export type EducationEntry = {
  level: string;
  school: string;
  program?: string;
  department?: string;
  address: string;
  period: string;
  current?: boolean;
};

export const education: EducationEntry[] = [
  {
    level: "Tertiary",
    school: "Biliran Province State University",
    program: "Bachelor of Science in Computer Science",
    department: "School of Technology and Computer Studies",
    address: "P.I. Garcia Street, Naval, Biliran",
    period: "4th Year · Present",
    current: true,
  },
  {
    level: "Senior High School",
    school: "Kawayan National High School",
    program: "General Academic Strand (GAS)",
    address: "Poblacion, Kawayan, Biliran",
    period: "S.Y. 2022–2023",
  },
  {
    level: "Junior High School",
    school: "Kawayan National High School",
    address: "Poblacion, Kawayan, Biliran",
    period: "S.Y. 2020–2021",
  },
  {
    level: "Elementary",
    school: "Kawayan Elementary School",
    address: "Masagaosao, Kawayan, Biliran",
    period: "S.Y. 2016–2017",
  },
];

export type SkillGroup = {
  title: string;
  icon: "pen" | "code" | "globe" | "file";
  description: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Design",
    icon: "pen",
    description: "Designing clear, user-friendly interfaces and layouts.",
    items: ["UI Design", "Layout Design"],
  },
  {
    title: "Programming",
    icon: "code",
    description: "Languages I use to bring ideas to life.",
    items: ["Java", "JavaScript"],
  },
  {
    title: "Web Development",
    icon: "globe",
    description: "Building pages and web applications.",
    items: ["HTML", "Next.js"],
  },
  {
    title: "Productivity",
    icon: "file",
    description: "Computer literate and proficient in Microsoft Office.",
    items: ["MS Word", "MS PowerPoint", "MS Publisher"],
  },
];

export type ProjectImage = {
  src: StaticImageData;
  alt: string;
};

// One screen of a project, shown in a desktop frame with a phone frame beside it.
// Without a dedicated `mobile` image, the phone frame shows the desktop image fitted to the screen.
export type ProjectScreen = {
  caption: string;
  desktop: ProjectImage;
  mobile?: ProjectImage;
  /** "cover" fills the desktop screen from the top (good for tall posters); default "contain" shows it whole. */
  desktopFit?: "cover" | "contain";
};

export type Project = {
  title: string;
  subtitle: string;
  year?: string;
  role: string;
  type: string;
  description: string;
  features: string[];
  tags: string[];
  screens: ProjectScreen[];
};

export const projects: Project[] = [
  {
    title: "HERBMED",
    subtitle: "Herbal Medicine Web Application",
    year: "2025",
    role: "UI Designer",
    type: "Solo Project",
    description:
      "A web application that combines tradition and science, helping people explore the healing power of herbs and discover natural remedies. I designed the user interface, from the glass-style login screen to the homepage and herbal remedy directory, with a fresh, nature-inspired look.",
    features: [
      "Detailed herbal profile pages",
      "Remedies organized by category, like Cold & Flu and Skin Allergy Relief",
      "Searchable herbal medicine directory",
      "Responsive layouts for desktop, tablet and mobile",
    ],
    tags: ["UI Design", "Web Application", "Responsive Layout"],
    screens: [
      {
        caption: "Project poster",
        desktopFit: "cover",
        desktop: {
          src: herbmedPoster,
          alt: "HERBMED project poster showing the app on desktop, tablet and mobile",
        },
      },
      {
        caption: "Login screen",
        desktop: {
          src: herbmedLogin,
          alt: "HERBMED login screen with a glass-style form over a leafy background",
        },      },
      {
        caption: "Homepage",
        desktop: {
          src: herbmedHomepage,
          alt: "HERBMED homepage with the headline 'Grow naturally where you are rooted'",
        },
      },
    ],
  },
  {
    title: "Voting System",
    subtitle: "E-Voting Desktop Application",
    role: "UI Designer",
    type: "Solo Project",
    description:
      "An e-voting system that serves as a new technology for voters, with the aim of improving the electoral process. I designed its interface, from the admin login screen to the \"Vote Wisely\" ballot for SK Chairman and SK Kagawad candidates.",
    features: [
      "Admin login with a show-password option",
      "Ballot for SK Chairman and SK Kagawad candidates",
      "Results table showing the votes for each candidate",
      "Vote count view to track who has voted",
    ],
    tags: ["UI Design", "Desktop Application", "E-Voting"],
    screens: [
      {
        caption: "Admin login",
        desktop: {
          src: votingLogin,
          alt: "Voting System admin login window with username and password fields and a gold Login button",
        },
      },
      {
        caption: "Ballot & results",
        desktop: {
          src: votingBallot,
          alt: "Voting System 'Vote Wisely' ballot with SK Chairman and SK Kagawad candidates and results tables",
        },
      },
    ],
  },
];

export type Certificate = {
  title: string;
  issuer: string;
  kind: string;
  date: string;
  image: StaticImageData;
  href: string;
  extraLink?: { label: string; href: string };
};

export const certificates: Certificate[] = [
  {
    title: "Introduction to AI Literacy and Responsible Use",
    issuer: "CHED ACHIEVE × Mapúa University",
    kind: "Micro-credential",
    date: "September 14, 2026",
    image: certAiLiteracy,
    href: "/certificates/ai-literacy-responsible-use.pdf",
  },
  {
    title: "Networking Basics",
    issuer: "Cisco Networking Academy",
    kind: "Course Completion",
    date: "May 17, 2026",
    image: certCisco,
    href: "/certificates/cisco-networking-basics.pdf",
    extraLink: {
      label: "Credential",
      href: "/certificates/cisco-networking-basics-credential.pdf",
    },
  },
  {
    title: "Thesis Preparation with the Use of Trending Tools and Industry Practices",
    issuer: "BiPSU Computer Science Society",
    kind: "Seminar-Workshop",
    date: "October 6–7, 2025",
    image: certThesisSeminar,
    href: "/certificates/bipsu-thesis-preparation-seminar.pdf",
  },
  {
    title: "You're In A Relationship With A Machine, How Healthy Is It?",
    issuer: "Gartner",
    kind: "Webinar",
    date: "November 26, 2024",
    image: certGartner,
    href: "/certificates/gartner-webinar.png",
  },
];

export const highlights = [
  { value: String(certificates.length), label: "Certificates", detail: "Courses, seminars and webinars" },
  {
    value: String(projects.length),
    label: projects.length === 1 ? "Featured Project" : "Featured Projects",
    detail: projects.map((p) => p.title).join(" & "),
  },
  {
    value: String(skillGroups.reduce((n, g) => n + g.items.length, 0)),
    label: "Skills & Tools",
    detail: "Design, code and productivity",
  },
];

export const navItems = [
  { id: "home", label: "Home", icon: "home" },
  { id: "projects", label: "Projects", icon: "briefcase" },
  { id: "skills", label: "Skills", icon: "sparkles" },
  { id: "certificates", label: "Certificates", icon: "award" },
  { id: "about", label: "About", icon: "user" },
  { id: "education", label: "Education", icon: "cap" },
  { id: "contact", label: "Contact", icon: "mail" },
] as const;
