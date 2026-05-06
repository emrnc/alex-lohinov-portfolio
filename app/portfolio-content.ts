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
    title: "Portfolio companies overview",
    image: "/project-portfolio-overview.jpg",
    darkImage: "/project-portfolio-overview-dark.jpg",
    width: 3200,
    height: 1800,
  },
  {
    title: "Portfolio theme menu",
    image: "/project-portfolio-menu.jpg",
    darkImage: "/project-portfolio-menu-dark.jpg",
    width: 1592,
    height: 1060,
  },
  {
    title: "Portfolio brand visual",
    image: "/project-portfolio-visual.jpg",
    width: 1576,
    height: 1060,
  },
];
