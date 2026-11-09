import type { StaticImageData } from "next/image";

import profilePhoto from "@/public/images/profile.png";
import herbmedPoster from "@/public/images/projects/herbmed-poster.jpg";
import herbmedLogin from "@/public/images/projects/herbmed-login.png";
import herbmedHomepage from "@/public/images/projects/herbmed-homepage.png";
import votingLogin from "@/public/images/projects/voting-login.png";
import votingBallot from "@/public/images/projects/voting-ballot.png";
import scholarshipDesktop from "@/public/images/projects/scholarship project-desktop.png";
import scholarshipMobile from "@/public/images/projects/scholarship project-mobile.png";
import scholarshipInternal from "@/public/images/projects/scholarship project-internal programs.png";
import scholarshipInternalMobile from "@/public/images/projects/scholarship project-internal programs mobile.jpg";
import scholarshipExternal from "@/public/images/projects/scholarship project-external programs.png";
import scholarshipExternalMobile from "@/public/images/projects/scholarship project-external programs mobile.jpg";
// View-only documents live outside public/ so they have no direct, guessable download link.
import resumeView from "@/assets/resume/resume-view.png";
import certAiLiteracy from "@/assets/protected/certificates/ai-literacy-responsible-use.jpg";
import certCisco from "@/assets/protected/certificates/cisco-networking-basics.jpg";
import certCiscoCredential from "@/assets/protected/certificates/cisco-networking-basics-credential.jpg";
import certThesisSeminar from "@/assets/protected/certificates/bipsu-thesis-preparation-seminar.jpg";
import certGartner from "@/assets/protected/certificates/gartner-webinar.jpg";
import beyondRecognition from "@/assets/protected/beyond/academic-recognition.jpg";
import beyondCertificate from "@/assets/protected/beyond/academic-certificate.jpg";
import beyondMissBipsu from "@/assets/protected/beyond/pageant-miss-bipsu-2023.jpg";
import beyondRepresenting from "@/assets/protected/beyond/pageant-representing-bipsu.jpg";
import beyondMisterMiss from "@/assets/protected/beyond/pageant-mister-miss-suc-2023.jpg";
import beyondParade from "@/assets/protected/beyond/pageant-parade.jpg";
import beyondFashionShow from "@/assets/protected/beyond/pageant-fashion-show.jpg";
import beyondOnStage from "@/assets/protected/beyond/pageant-on-stage.jpg";
import beyondHulmaKultura from "@/assets/protected/beyond/school-hulma-kultura.jpg";
import beyondExhibit from "@/assets/protected/beyond/school-exhibit.jpg";
import beyondSteps from "@/assets/protected/beyond/school-steps-2025.jpg";
import beyondCulturalDance from "@/assets/protected/beyond/school-cultural-dance.jpg";
import beyondYouth from "@/assets/protected/beyond/youth-group.jpg";

// All portfolio content lives here so text can be updated without touching the layout.

export const profile = {
  name: "Sarah Jane E. Villanueva",
  shortName: "Sarah Jane",
  role: "UI Designer",
  tagline: "UI Designer",
  intro:
    "A Computer Science student at Biliran Province State University with a passion for application design and crafting clean, user-friendly digital layouts.",
  photo: profilePhoto,
  email: "villanuevasarahjane59@gmail.com",
  instagram: { handle: "sara_jeyn", url: "https://www.instagram.com/sara_jeyn/" },
  // Rendered from assets/resume/resume.html; shown in the view-only viewer
  resume: resumeView,
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
    items: ["Python"],
  },
  {
    title: "Web Development",
    icon: "globe",
    description: "Building pages and web applications.",
    items: ["HTML", "CSS", "Next.js"],
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
  role?: string;
  type: string;
  description: string;
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
    type: "Team Project",
    description:
      "An e-voting system that serves as a new technology for voters, with the aim of improving the electoral process. I designed its interface, from the admin login screen to the \"Vote Wisely\" ballot for SK Chairman and SK Kagawad candidates.",
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
  {
    title: "BiPSU SRMS",
    subtitle: "Scholarship Record Management System with Eligibility Recommender",
    type: "Team Project",
    description:
      "A scholarship portal for Biliran Province State University where students can explore the available internal and external scholarship programs, check if they're eligible, and register or sign in to apply.",
    screens: [
      {
        caption: "Homepage",
        desktop: {
          src: scholarshipDesktop,
          alt: "BiPSU SRMS homepage with the university seal over a campus photo and the headline 'Scholarship Programs'",
        },
        mobile: {
          src: scholarshipMobile,
          alt: "BiPSU SRMS homepage on a phone with Register and Sign in buttons",
        },
      },
      {
        caption: "Internal Scholarships",
        desktop: {
          src: scholarshipInternal,
          alt: "BiPSU SRMS Internal Scholarships page with Academic, Affirmative Action and Sports scholarship cards",
        },
        mobile: {
          src: scholarshipInternalMobile,
          alt: "BiPSU SRMS Internal Scholarships page on a phone showing the Academic Scholarship card",
        },
      },
      {
        caption: "External Scholarships",
        desktop: {
          src: scholarshipExternal,
          alt: "BiPSU SRMS External Scholarships page with CHED Merit, CoScho and DOST scholarship cards",
        },
        mobile: {
          src: scholarshipExternalMobile,
          alt: "BiPSU SRMS External Scholarships page on a phone",
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
  extraDocument?: { label: string; image: StaticImageData };
};

export const certificates: Certificate[] = [
  {
    title: "Introduction to AI Literacy and Responsible Use",
    issuer: "CHED ACHIEVE × Mapúa University",
    kind: "Micro-credential",
    date: "September 14, 2026",
    image: certAiLiteracy,
  },
  {
    title: "Networking Basics",
    issuer: "Cisco Networking Academy",
    kind: "Course Completion",
    date: "May 17, 2026",
    image: certCisco,
    extraDocument: { label: "Credential", image: certCiscoCredential },
  },
  {
    title: "Thesis Preparation with the Use of Trending Tools and Industry Practices",
    issuer: "BiPSU Computer Science Society",
    kind: "Seminar-Workshop",
    date: "October 6–7, 2025",
    image: certThesisSeminar,
  },
  {
    title: "You're In A Relationship With A Machine, How Healthy Is It?",
    issuer: "Gartner",
    kind: "Webinar",
    date: "November 26, 2024",
    image: certGartner,
  },
];

export type BeyondItem = {
  image: StaticImageData;
  alt: string;
};

// Shown as images only, in this order: academic, pageant, school competition, youth.
// The alt text is never displayed; it is what screen readers announce.
export const beyondItems: BeyondItem[] = [
  {
    image: beyondRecognition,
    alt: "Sarah Jane in her school uniform holding a Certificate of Recognition, standing between two adults",
  },
  {
    image: beyondCertificate,
    alt: "Biliran Province State University Certificate of Recognition awarded to Sarah Jane E. Villanueva",
  },
  {
    image: beyondMissBipsu,
    alt: "Sarah Jane wearing a gold crown and a Miss BiPSU 2023 sash",
  },
  {
    image: beyondRepresenting,
    alt: "Sarah Jane and two others in BiPSU sashes holding the university flag",
  },
  {
    image: beyondMisterMiss,
    alt: "Mister and Miss SUC 2023 candidates on stage holding trophies and bouquets",
  },
  {
    image: beyondParade,
    alt: "Sarah Jane in a BiPSU sash on a parade float beside a tiger mascot",
  },
  {
    image: beyondFashionShow,
    alt: "Models in gowns and formal wear posing in front of a Fashion Show screen",
  },
  {
    image: beyondOnStage,
    alt: "Sarah Jane on stage in a school uniform and a Miss BiPSU sash",
  },
  {
    image: beyondHulmaKultura,
    alt: "Dance team in blue and yellow costumes holding a trophy on stage at the Hulma Kultura Dance Competition",
  },
  {
    image: beyondExhibit,
    alt: "Sarah Jane and two schoolmates in front of an exhibit wall of artworks",
  },
  {
    image: beyondSteps,
    alt: "Large group posing on stage under a STEPS 2025 STCS Dance Culmination screen",
  },
  {
    image: beyondCulturalDance,
    alt: "Sarah Jane in a yellow costume with her team in a gymnasium, holding a shield and a parasol",
  },
  {
    image: beyondYouth,
    alt: "Youth group in yellow shirts and face masks praying together inside a chapel",
  },
];

export const navItems = [
  { id: "home", label: "Home", icon: "home" },
  { id: "projects", label: "Projects", icon: "briefcase" },
  { id: "skills", label: "Skills", icon: "sparkles" },
  { id: "certificates", label: "Certificates", icon: "award" },
  { id: "about", label: "About", icon: "user" },
  { id: "education", label: "Education", icon: "cap" },
  { id: "beyond", label: "Beyond the Code", icon: "camera" },
  { id: "contact", label: "Contact", icon: "mail" },
] as const;
