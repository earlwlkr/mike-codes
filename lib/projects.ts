export type ProjectLink = {
  description: string;
  lastUpdatedAt: string;
  vercelProject: string;
  productionUrl: string;
};

const projectCatalog: ProjectLink[] = [
  {
    description: "Currency converter with multi-currency output plus a timezone conversion panel.",
    lastUpdatedAt: "2026-03-07T20:08:47+07:00",
    vercelProject: "currency",
    productionUrl: "https://currency-nine-peach.vercel.app",
  },
  {
    description: "Group expense tracker to split costs, balances, and analytics with shareable read-only links.",
    lastUpdatedAt: "2026-03-01T11:03:09+07:00",
    vercelProject: "smart-expense",
    productionUrl: "https://smart-expense-one.vercel.app",
  },
  {
    description: "Persona-based AI chat where you can pin, create, and chat with generated famous-person personas.",
    lastUpdatedAt: "2026-03-07T20:08:46+07:00",
    vercelProject: "persona",
    productionUrl: "https://verbose-disco-kappa.vercel.app/",
  },
  {
    description: "Personal expense logger that parses natural-language entries with Gemini and stores data locally.",
    lastUpdatedAt: "2026-03-07T20:08:45+07:00",
    vercelProject: "spendi",
    productionUrl: "https://smart-expense-web.vercel.app",
  },
  {
    description: "Mobile-first color contest app: submit photos to match target colors and compete on leaderboards.",
    lastUpdatedAt: "2026-02-10T19:55:05+07:00",
    vercelProject: "colordi",
    productionUrl: "https://colordi-blond.vercel.app",
  },
  {
    description: "Multiplayer number-finding race game with join codes, lobby/countdown flow, and winner screen.",
    lastUpdatedAt: "2026-02-25T22:29:51+07:00",
    vercelProject: "numberdi",
    productionUrl: "https://numberdi.vercel.app",
  },
  {
    description: "AI trip planner that generates structured itineraries with Vercel AI Gateway and saves trips in Convex.",
    lastUpdatedAt: "2026-03-07T21:16:27+07:00",
    vercelProject: "tripdi",
    productionUrl: "https://tripdi-five.vercel.app",
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

    if (!parsedUrl.hostname) {
      throw new Error(`Invalid production URL hostname: ${project.productionUrl}`);
    }

    // Normalize to origin + pathname and drop hash/search to keep launcher links stable.
    const normalizedPath = parsedUrl.pathname.replace(/\/$/, "") || "/";
    const normalizedUrl = `${parsedUrl.origin}${normalizedPath}`;

    return {
      ...project,
      vercelProject: project.vercelProject.trim(),
      description: project.description.trim(),
      productionUrl: normalizedUrl,
    };
  });

  return normalized.toSorted((a, b) => a.vercelProject.localeCompare(b.vercelProject));
}

export const projects = normalizeProjects(projectCatalog);
