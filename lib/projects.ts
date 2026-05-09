export type ProjectLink = {
  category: "Flagship" | "Momentum" | "Utility" | "Niche";
  description: string;
  lastUpdatedAt: string;
  vercelProject: string;
  productionUrl: string;
  categoryRank: number;
};

export const projectCategoryOrder = ["Flagship", "Momentum", "Utility", "Niche"] as const;

const projectCatalog: ProjectLink[] = [
  {
    category: "Flagship",
    categoryRank: 1,
    description: "NASA command center for exploring space activity, mission updates, and celestial events in one focused dashboard.",
    lastUpdatedAt: "2026-04-25T07:37:40+07:00",
    vercelProject: "comet-tracker",
    productionUrl: "https://comet-tracker.vercel.app",
  },
  {
    category: "Momentum",
    categoryRank: 2,
    description: "Travel journal for sharing anonymous location memories, browsing nearby stories, and revisiting moments on a map.",
    lastUpdatedAt: "2026-04-18T07:59:12+07:00",
    vercelProject: "rove-city",
    productionUrl: "https://rove-city.vercel.app",
  },
  {
    category: "Niche",
    categoryRank: 3,
    description: "Gentle emotional forecast with calm guidance for today, tonight, and tomorrow.",
    lastUpdatedAt: "2026-03-12T16:19:00+07:00",
    vercelProject: "emotiondi",
    productionUrl: "https://emotiondi.vercel.app",
  },
  {
    category: "Niche",
    categoryRank: 2,
    description: "Daily tarot ritual with a single-card reveal, reflective guidance, and readings you can share.",
    lastUpdatedAt: "2026-04-18T06:43:39+07:00",
    vercelProject: "tarotdi",
    productionUrl: "https://tarotdi.vercel.app",
  },
  {
    category: "Momentum",
    categoryRank: 1,
    description: "Trip planner that turns travel ideas into organized day-by-day itineraries you can revisit later.",
    lastUpdatedAt: "2026-04-18T07:59:12+07:00",
    vercelProject: "tripdi",
    productionUrl: "https://tripdi-five.vercel.app",
  },
  {
    category: "Utility",
    categoryRank: 2,
    description: "Quick converter for checking money amounts and time differences in one simple screen.",
    lastUpdatedAt: "2026-04-18T06:43:39+07:00",
    vercelProject: "currency",
    productionUrl: "https://currency-nine-peach.vercel.app",
  },
  {
    category: "Utility",
    categoryRank: 3,
    description: "Meetup planner where groups can share date options and vote on what works best.",
    lastUpdatedAt: "2026-04-25T14:10:26+07:00",
    vercelProject: "meetdi",
    productionUrl: "https://meetdi.vercel.app",
  },
  {
    category: "Flagship",
    categoryRank: 2,
    description: "Chat space for switching between helpful personas, saving favorites, and keeping conversations organized.",
    lastUpdatedAt: "2026-04-18T07:59:12+07:00",
    vercelProject: "persona",
    productionUrl: "https://verbose-disco-kappa.vercel.app/",
  },
  {
    category: "Momentum",
    categoryRank: 3,
    description: "Personal expense tracker where you can type spending naturally and review clear totals over time.",
    lastUpdatedAt: "2026-04-30T11:19:27+07:00",
    vercelProject: "spendi",
    productionUrl: "https://spendi-woad.vercel.app",
  },
  {
    category: "Flagship",
    categoryRank: 3,
    description: "Fast multiplayer number-order race with private rooms, countdowns, and winner results.",
    lastUpdatedAt: "2026-04-18T06:43:39+07:00",
    vercelProject: "numberdi",
    productionUrl: "https://numberdi.vercel.app",
  },
  {
    category: "Utility",
    categoryRank: 1,
    description: "Group expense splitter for tracking shared costs, balances, spending patterns, and read-only summaries.",
    lastUpdatedAt: "2026-04-18T07:59:12+07:00",
    vercelProject: "smart-expense",
    productionUrl: "https://smart-expense-one.vercel.app",
  },
  {
    category: "Niche",
    categoryRank: 1,
    description: "Color-matching photo contest where players chase target colors and climb the leaderboard.",
    lastUpdatedAt: "2026-04-18T06:43:38+07:00",
    vercelProject: "colordi",
    productionUrl: "https://colordi-blond.vercel.app",
  },
];

function normalizeProjects(input: ProjectLink[]): readonly ProjectLink[] {
  const seen = new Set<string>();
  const seenProductionUrls = new Set<string>();
  const validCategories = new Set(projectCategoryOrder);

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

    if (!validCategories.has(project.category)) {
      throw new Error(`Invalid category for ${project.vercelProject}: ${project.category}`);
    }

    if (!Number.isInteger(project.categoryRank) || project.categoryRank < 1) {
      throw new Error(`Invalid categoryRank for ${project.vercelProject}: ${project.categoryRank}`);
    }

    if (seenProductionUrls.has(normalizedUrl)) {
      throw new Error(`Duplicate production URL found: ${normalizedUrl}`);
    }

    seenProductionUrls.add(normalizedUrl);

    return {
      ...project,
      category: project.category,
      categoryRank: project.categoryRank,
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
