export type SocialAction = {
  label: string;
  href: string;
};

export type PortfolioShot = {
  title: string;
  image: string;
  darkImage?: string;
  width: number;
  height: number;
};

export const bio = [
  "I am a Product Designer focused on shaping clear, scalable digital products from concept to interface.",
  "Beyond designing in Figma, I build interactive product flows that help teams validate ideas and decisions earlier.",
  "I care about thoughtful systems, clear interaction logic, and polished execution that makes complex products feel simple.",
];

export const actions: SocialAction[] = [
  { label: "GitHub", href: "https://github.com/emrnc" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/emrnc/" },
  { label: "Twitter", href: "https://x.com/alexlohinov" },
];

export const portfolioShots: PortfolioShot[] = [
  {
    title: "Accord companies workspace",
    image: "/project-accord-overview-20260510-2160p.webp",
    darkImage: "/project-accord-overview-dark-20260510-2160p.webp",
    width: 3840,
    height: 2160,
  },
  {
    title: "Accord theme menu",
    image: "/project-accord-menu-20260510-2160p.webp",
    darkImage: "/project-accord-menu-dark-20260510-2160p.webp",
    width: 3840,
    height: 2160,
  },
  {
    title: "Accord brand visual",
    image: "/project-accord-logo-20260510-2160p.webp",
    width: 3840,
    height: 2160,
  },
];
