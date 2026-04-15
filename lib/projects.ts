export type ProjectLink = {
  description: string;
  lastUpdatedAt: string;
  vercelProject: string;
  productionUrl: string;
};

const projectCatalog: ProjectLink[] = [
  {
    description: "NASA Signal Desk that unifies multiple live NASA API views with a catalog of built and planned mission data surfaces.",
    lastUpdatedAt: "2026-04-12T15:37:44+07:00",
    vercelProject: "comet-tracker",
    productionUrl: "https://comet-tracker.vercel.app",
  },
  {
    description: "Location-based social travel journal with anonymous posting, global feed, and interactive map memories.",
    lastUpdatedAt: "2026-04-11T16:16:26+07:00",
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
    description: "Tarot-of-the-day ritual app with single-card reveals, reflective guidance, and shareable daily readings.",
    lastUpdatedAt: "2026-04-07T20:55:27+07:00",
    vercelProject: "tarotdi",
    productionUrl: "https://tarotdi.vercel.app",
  },
  {
    description: "AI trip planner that generates structured itineraries with Vercel AI Gateway and saves trips in Convex.",
    lastUpdatedAt: "2026-04-07T20:55:27+07:00",
    vercelProject: "tripdi",
    productionUrl: "https://tripdi-five.vercel.app",
  },
  {
    description: "Compact utility for multi-currency amount conversion paired with timezone conversion in one screen.",
    lastUpdatedAt: "2026-04-07T20:55:27+07:00",
    vercelProject: "currency",
    productionUrl: "https://currency-nine-peach.vercel.app",
  },
  {
    description: "AI persona chat app with built-in/custom personas, pinned defaults, and per-persona chat history.",
    lastUpdatedAt: "2026-04-12T20:47:59+07:00",
    vercelProject: "persona",
    productionUrl: "https://verbose-disco-kappa.vercel.app/",
  },
  {
    description: "Personal expense tracker that parses natural-language entries via AI and stores data in IndexedDB.",
    lastUpdatedAt: "2026-04-11T16:14:57+07:00",
    vercelProject: "spendi",
    productionUrl: "https://spendi-woad.vercel.app",
  },
  {
    description: "Multiplayer number-order race game with join codes, lobby countdown, and ranked winner results.",
    lastUpdatedAt: "2026-04-12T21:32:06+07:00",
    vercelProject: "numberdi",
    productionUrl: "https://numberdi.vercel.app",
  },
  {
    description: "Group expense tracker to split costs, balances, and analytics with shareable read-only links.",
    lastUpdatedAt: "2026-04-07T20:55:46+07:00",
    vercelProject: "smart-expense",
    productionUrl: "https://smart-expense-one.vercel.app",
  },
  {
    description: "Mobile-first color contest app where players submit photos to match target colors and climb leaderboards.",
    lastUpdatedAt: "2026-04-07T20:55:46+07:00",
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
