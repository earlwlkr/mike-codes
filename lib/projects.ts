export type ProjectLink = {
  description: string;
  lastUpdatedAt: string;
  vercelProject: string;
  productionUrl: string;
};

const projectCatalog: ProjectLink[] = [
  {
    description: "Live comet observation dashboard powered by NASA/JPL nightly visibility and orbit data.",
    lastUpdatedAt: "2026-03-25T22:12:45+07:00",
    vercelProject: "comet-tracker",
    productionUrl: "https://comet-tracker.vercel.app",
  },
  {
    description: "Location-based social travel journal for posting photos, exploring memories, and browsing the city map.",
    lastUpdatedAt: "2026-03-28T21:27:08+07:00",
    vercelProject: "rove-city",
    productionUrl: "https://rove-city.vercel.app",
  },
  {
    description: "Ambient emotional forecast app with calm daily guidance across today, tonight, and tomorrow.",
    lastUpdatedAt: "2026-03-12T16:19:00+07:00",
    vercelProject: "emotiondi",
    productionUrl: "https://emotiondi.vercel.app",
  },
  {
    description: "Mystic tarot-of-the-day app with ritual card reveals, reflections, and shareable readings.",
    lastUpdatedAt: "2026-03-14T20:59:20+07:00",
    vercelProject: "tarotdi",
    productionUrl: "https://tarotdi.vercel.app",
  },
  {
    description: "AI trip planner that generates structured itineraries with Vercel AI Gateway and saves trips in Convex.",
    lastUpdatedAt: "2026-03-08T22:13:07+07:00",
    vercelProject: "tripdi",
    productionUrl: "https://tripdi-five.vercel.app",
  },
  {
    description: "Currency converter with multi-currency output plus a timezone conversion panel.",
    lastUpdatedAt: "2026-03-29T15:06:51+07:00",
    vercelProject: "currency",
    productionUrl: "https://currency-nine-peach.vercel.app",
  },
  {
    description: "Persona-based AI chat where you can pin, create, and chat with generated famous-person personas.",
    lastUpdatedAt: "2026-03-07T13:08:42Z",
    vercelProject: "persona",
    productionUrl: "https://verbose-disco-kappa.vercel.app/",
  },
  {
    description: "Personal expense logger that parses natural-language entries with Gemini and stores data locally.",
    lastUpdatedAt: "2026-03-28T22:33:11+07:00",
    vercelProject: "spendi",
    productionUrl: "https://spendi-woad.vercel.app",
  },
  {
    description: "Multiplayer number-finding race game with join codes, lobby/countdown flow, and winner screen.",
    lastUpdatedAt: "2026-03-01T11:03:25+07:00",
    vercelProject: "numberdi",
    productionUrl: "https://numberdi.vercel.app",
  },
  {
    description: "Group expense tracker to split costs, balances, and analytics with shareable read-only links.",
    lastUpdatedAt: "2026-03-28T14:30:33+07:00",
    vercelProject: "smart-expense",
    productionUrl: "https://smart-expense-one.vercel.app",
  },
  {
    description: "Mobile-first color contest app: submit photos to match target colors and compete on leaderboards.",
    lastUpdatedAt: "2026-02-10T19:54:53+07:00",
    vercelProject: "colordi",
    productionUrl: "https://colordi-blond.vercel.app",
  },
];

function normalizeProjects(input: ProjectLink[]): readonly ProjectLink[] {
  const seen = new Set<string>();
  const seenProductionUrls = new Set<string>();

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
    const parsedLastUpdated = new Date(project.lastUpdatedAt);

    if (!Number.isFinite(parsedLastUpdated.getTime())) {
      throw new Error(`Invalid lastUpdatedAt timestamp: ${project.lastUpdatedAt}`);
    }

    if (seenProductionUrls.has(normalizedUrl)) {
      throw new Error(`Duplicate production URL found: ${normalizedUrl}`);
    }

    seenProductionUrls.add(normalizedUrl);

    return {
      ...project,
      vercelProject: project.vercelProject.trim(),
      description: project.description.trim(),
      lastUpdatedAt: project.lastUpdatedAt.trim(),
      productionUrl: normalizedUrl,
    };
  });

  return normalized.toSorted((a, b) => {
    const dateDelta = new Date(b.lastUpdatedAt).getTime() - new Date(a.lastUpdatedAt).getTime();

    if (dateDelta !== 0) {
      return dateDelta;
    }

    return a.vercelProject.localeCompare(b.vercelProject);
  });
}

export const projects = normalizeProjects(projectCatalog);
