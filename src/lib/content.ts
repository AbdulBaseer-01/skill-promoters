/**
 * Single source of content for the site.
 *
 * Every fact below is taken from the existing website (skillpromoters.co):
 * home, Our Mission (/who-we-are), Core Team, Fern Heights, Asian Suncity
 * (/high-rise-towers-kondapur), Other Projects and Initiatives pages.
 * Add new projects, figures or contacts here only once they are verified.
 */

export const company = {
  name: "Skill Promoters Pvt. Ltd.",
  shortName: "Skill Promoters",
  group: "Skill Group",
  tagline: "A world of possibilities",
  established: 1994,
  city: "Hyderabad",
  state: "Telangana",
  email: "info@skillpromoters.co",
  office: {
    label: "Head Office",
    lines: ["City Center Mall, Level 6", "Road No. 1 & 10, Banjara Hills", "Hyderabad, Telangana 500034"],
  },
  social: [
    { label: "Facebook", href: "https://www.facebook.com/SkillPromoters/" },
    { label: "X (Twitter)", href: "https://twitter.com/skill_promoters" },
  ],
  existingSite: "https://www.skillpromoters.co",
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Projects", href: "#projects" },
  { label: "Initiatives", href: "#initiatives" },
  { label: "Contact", href: "#contact" },
] as const;

export const stats = [
  { value: 1994, suffix: "", label: "Established", note: "Founded in Hyderabad", count: false },
  { value: 30, suffix: "+", label: "Years of experience", note: "Across three decades of development", count: true },
  { value: 100, suffix: "+", label: "Projects completed", note: "Residential, commercial and housing", count: true },
] as const;

export type FeaturedProject = {
  id: string;
  index: string;
  name: string;
  category: string;
  location: string;
  summary: string;
  href?: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: "sarath-city",
    index: "01",
    name: "Sarath City Capital Mall",
    category: "Retail / Commercial",
    location: "Hyderabad",
    summary:
      "A major retail destination in Hyderabad, defined by a sweeping glazed facade and a perforated screen that wraps the building's edge.",
  },
  {
    id: "fern-heights",
    index: "02",
    name: "Fern Heights",
    category: "Residential",
    location: "Lakdikapul, Hyderabad",
    summary:
      "An upscale gated community on the grounds of Fern Villa, a residence once gifted by the 7th Nizam of Hyderabad to his grandson — now reimagined as modern residential living.",
    href: "https://www.skillpromoters.co/fernheights",
  },
  {
    id: "asian-suncity",
    index: "03",
    name: "Asian Suncity",
    category: "Commercial / Workspace",
    location: "Kondapur, Hyderabad",
    summary:
      "Residential towers and an IT park near Sarath City Capital Mall — a workspace hub alongside high-rise living.",
    href: "https://www.skillpromoters.co/high-rise-towers-kondapur",
  },
];

export const fernHeightsFacts = [
  { value: "68", label: "Exclusive apartments" },
  { value: "10", label: "Residential levels" },
  { value: "02", label: "Parking levels" },
] as const;

export const fernHeightsAmenities = [
  "Indoor swimming pool",
  "Gym",
  "Jogging track",
  "Play area",
  "Banquet",
  "Indoor games",
  "Intercom",
  "24×7 security",
];

/** From the "Other Projects" page of the existing site. */
export const portfolioIndex = [
  { name: "City Center Mall", location: "Banjara Hills" },
  { name: "Skill Arcade", location: "Srinagar Colony" },
  { name: "Skill Legacy", location: "Barkatpura" },
  { name: "Skill Splendour", location: "Lakdikapul" },
  { name: "Skill Spectrum", location: "Himayath Nagar" },
  { name: "Skill Estate", location: "Humayun Nagar" },
  { name: "Skill Abode", location: "Lakdikapul" },
  { name: "Skill Residency", location: "Barkatpura" },
  { name: "Skill Presidency", location: "Masab Tank" },
  { name: "Skill Prestige", location: "Surya Nagar Colony" },
  { name: "Skill Western Province", location: "Moinabad" },
  { name: "Skill Ashiyana", location: "Malakpet" },
  { name: "Skill Imperial", location: "Hyderabad" },
  { name: "Skill Sapphire", location: "Lingampally" },
  { name: "Skill Classic", location: "Hyderabad" },
  { name: "Apex Residency", location: "Anand Nagar" },
] as const;

export const services = [
  {
    index: "01",
    title: "Preconstruction Consultation",
    body:
      "Early guidance on site, context, planning and feasibility — so every development begins with clear decisions, not assumptions.",
    image: "/images/hyderabad-aerial.webp",
    alt: "Aerial view over Hyderabad's dense residential neighbourhoods",
    w: 1440,
    h: 810,
  },
  {
    index: "02",
    title: "Architectural Design & Modelling",
    body:
      "Design development and visual modelling that resolve form, layout and facade before a single foundation is poured.",
    image: "/images/asian-suncity-tower-render.webp",
    alt: "Architectural render of residential towers at Asian Suncity, Kondapur",
    w: 1600,
    h: 2001,
  },
  {
    index: "03",
    title: "Construction Project Management",
    body:
      "Coordinated execution on site — schedules, teams and quality held together from groundwork through to completion.",
    image: "/images/asian-suncity-clubhouse-construction.webp",
    alt: "Clubhouse building under construction with scaffolding at Asian Suncity",
    w: 767,
    h: 1020,
  },
] as const;

/** "What we do" list from the Our Mission page. */
export const developmentTypes = [
  "Shopping malls",
  "Commercial complexes",
  "Multi-level residential",
  "Real estate & housing",
  "Land & site development",
  "Infrastructure",
] as const;

export const initiatives = [
  {
    index: "A",
    name: "Luxury Hotel",
    location: "Kondapur",
    status: "Coming soon",
    href: "https://www.skillpromoters.co/hotel-kondapur",
  },
  {
    index: "B",
    name: "Commercial Complex",
    location: "Kondapur",
    status: "Coming soon",
    href: "https://www.skillpromoters.co/commercial-complex",
  },
] as const;

export const milestones = [
  {
    year: "1994",
    title: "Skill is founded",
    body: "A first-generation corporation promoted by technocrat entrepreneurs, established in Hyderabad to serve the construction and residential industry.",
  },
  {
    year: "Growth",
    title: "From builder to developer",
    body: "Skill and its group affiliates grow into a complete construction and real estate development company — shopping malls, commercial complexes and housing.",
  },
  {
    year: "2017–18",
    title: "A second generation joins",
    body: "Two executive directors, both civil engineers, join to lead projects and planning across the group.",
  },
  {
    year: "Today",
    title: "100+ projects completed",
    body: "Commercial, residential and housing projects envisioned, planned, developed, managed and executed.",
  },
] as const;

export const leadership = [
  { name: "Syed Mohammed Aslam", role: "Co-Founder & CEO" },
  { name: "Syed Naveeduddin Ahmed", role: "Co-Founder & COO" },
  { name: "Syed Basheeruddin Faayez", role: "Executive Director" },
  { name: "Syed Mohammed Akram", role: "Executive Director" },
] as const;

export const enquiryTypes = [
  "Development enquiry",
  "Leasing enquiry",
  "Residential — Fern Heights",
  "Careers",
  "General enquiry",
] as const;
