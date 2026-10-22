import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Poppins (latin subset, SIL Open Font License) is self-hosted so builds work offline.
const poppins = localFont({
  variable: "--font-poppins",
  src: [
    { path: "./fonts/poppins-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/poppins-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-700.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Sarah Jane E. Villanueva | UI Designer",
  description:
    "Portfolio of Sarah Jane E. Villanueva, a UI Designer and 4th year Computer Science student at Biliran Province State University.",
  openGraph: {
    title: "Sarah Jane E. Villanueva | UI Designer",
    description:
      "UI Designer and 4th year Computer Science student at Biliran Province State University.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eaedf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
};

// Runs before first paint: applies the saved (or system) theme and flags JS for scroll reveals.
const themeScript = `(function(){var d=document.documentElement;var t;try{t=localStorage.getItem("theme")}catch(e){}if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}d.dataset.theme=t;d.classList.add("js")})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
