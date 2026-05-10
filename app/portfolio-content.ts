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

export type PortfolioProject = {
  title: string;
  shots: PortfolioShot[];
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

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "Accord",
    shots: [
      {
        title: "Accord companies workspace",
        image: "/project-accord-overview-20260510-2160p-v4.webp",
        darkImage: "/project-accord-overview-dark-20260510-2160p-v4.webp",
        width: 3840,
        height: 2160,
      },
      {
        title: "Accord theme menu",
        image: "/project-accord-menu-20260510-2160p-v4.webp",
        darkImage: "/project-accord-menu-dark-20260510-2160p-v4.webp",
        width: 3840,
        height: 2160,
      },
      {
        title: "Accord brand visual",
        image: "/project-accord-logo-20260510-2160p-v4.webp",
        width: 3840,
        height: 2160,
      },
    ],
  },
  {
    title: "Pascal",
    shots: [
      {
        title: "Pascal editor workspace",
        image: "/project-pascal-overview-20260510-2160p-v4.webp",
        darkImage: "/project-pascal-overview-dark-20260510-2160p-v4.webp",
        width: 3840,
        height: 2160,
      },
      {
        title: "Pascal command menu",
        image: "/project-pascal-command-menu-20260510-2160p-v4.webp",
        darkImage: "/project-pascal-command-menu-dark-20260510-2160p-v4.webp",
        width: 3840,
        height: 2160,
      },
      {
        title: "Pascal slash menu",
        image: "/project-pascal-slash-menu-20260510-2160p-v4.webp",
        darkImage: "/project-pascal-slash-menu-dark-20260510-2160p-v4.webp",
        width: 3840,
        height: 2160,
      },
      {
        title: "Pascal brand visual",
        image: "/project-pascal-logo-20260510-2160p-v4.webp",
        width: 3840,
        height: 2160,
      },
    ],
  },
];
