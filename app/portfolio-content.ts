export type SocialAction = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  description: string;
  image: string;
  darkImage?: string;
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

export const projects: Project[] = [
  {
    title: "Accord",
    description:
      "A minimal CRM design for teams that need a simple, focused way to manage companies, people, and sales workflows. I studied existing CRM products to reduce visual noise and shape a clear workspace inspired by Linear and Lightfield.",
    image: "/project-accord.png",
    darkImage: "/project-accord-dark.png",
  },
];
