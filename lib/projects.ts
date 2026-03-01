export type ProjectLink = {
  name: string;
  vercelProject: string;
  productionUrl: string;
};

export const projects: ProjectLink[] = [
  {
    name: "currency",
    vercelProject: "currency",
    productionUrl: "https://currency-nine-peach.vercel.app",
  },
  {
    name: "smart-expense",
    vercelProject: "smart-expense",
    productionUrl: "https://smart-expense-one.vercel.app",
  },
  {
    name: "persona",
    vercelProject: "verbose-disco",
    productionUrl: "https://verbose-disco-kappa.vercel.app",
  },
  {
    name: "smart-expense-web",
    vercelProject: "smart-expense-web",
    productionUrl: "https://smart-expense-web.vercel.app",
  },
  {
    name: "colordi",
    vercelProject: "colordi",
    productionUrl: "https://colordi-blond.vercel.app",
  },
  {
    name: "numberdi",
    vercelProject: "numberdi",
    productionUrl: "https://numberdi.vercel.app",
  },
];
