export type ProjectLink = {
  description: string;
  vercelProject: string;
  productionUrl: string;
};

const projectCatalog: ProjectLink[] = [
  {
    description: "Currency converter with multi-currency output plus a timezone conversion panel.",
    vercelProject: "currency",
    productionUrl: "https://currency-nine-peach.vercel.app",
  },
  {
    description: "Group expense tracker to split costs, balances, and analytics with shareable read-only links.",
    vercelProject: "smart-expense",
    productionUrl: "https://smart-expense-one.vercel.app",
  },
  {
    description: "Persona-based AI chat where you can pin, create, and chat with generated famous-person personas.",
    vercelProject: "verbose-disco",
    productionUrl: "https://verbose-disco-kappa.vercel.app",
  },
  {
    description: "Personal expense logger that parses natural-language entries with Gemini and stores data locally.",
    vercelProject: "spendi",
    productionUrl: "https://smart-expense-web.vercel.app",
  },
  {
    description: "Mobile-first color contest app: submit photos to match target colors and compete on leaderboards.",
    vercelProject: "colordi",
    productionUrl: "https://colordi-blond.vercel.app",
  },
  {
    description: "Multiplayer number-finding race game with join codes, lobby/countdown flow, and winner screen.",
    vercelProject: "numberdi",
    productionUrl: "https://numberdi.vercel.app",
  },
];

function normalizeProjects(input: ProjectLink[]): readonly ProjectLink[] {
  const seen = new Set<string>();

  const normalized = input.map((project) => {
    const key = project.vercelProject.trim().toLowerCase();

    if (seen.has(key)) {
      throw new Error(`Duplicate vercelProject key found: ${project.vercelProject}`);
    }

    seen.add(key);

    const parsedUrl = new URL(project.productionUrl);

    if (parsedUrl.protocol !== "https:") {
      throw new Error(`Only https URLs are allowed: ${project.productionUrl}`);
    }

    return {
      ...project,
      vercelProject: project.vercelProject.trim(),
      description: project.description.trim(),
      productionUrl: parsedUrl.toString(),
    };
  });

  return normalized.toSorted((a, b) => a.vercelProject.localeCompare(b.vercelProject));
}

export const projects = normalizeProjects(projectCatalog);
