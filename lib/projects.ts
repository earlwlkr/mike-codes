export type ProjectLink = {
  category: "Flagship" | "Momentum" | "Utility" | "Niche";
  description: string;
  improvementIdeas: readonly [string, string, string];
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
    description: "Mission-control dashboard surfacing live NASA data across 16 dedicated views — from space weather and near-Earth objects to Mars weather and exoplanet discoveries.",
    improvementIdeas: [
      "Add alert presets for notable space weather and close-approach events.",
      "Let users pin favorite NASA feeds into a personalized watch board.",
      "Offer shareable weekly briefing pages with the biggest changes summarized.",
    ],
    lastUpdatedAt: "2026-04-25T07:37:40+07:00",
    vercelProject: "comet-tracker",
    productionUrl: "https://comet-tracker.vercel.app",
  },
  {
    category: "Momentum",
    categoryRank: 2,
    description: "Travel journal for sharing anonymous location memories, browsing nearby stories, and revisiting moments on a map.",
    improvementIdeas: [
      "Add private drafts with optional photos before publishing a memory.",
      "Create walkable story trails that connect nearby memories into routes.",
      "Introduce gentle moderation signals for duplicate or low-context posts.",
    ],
    lastUpdatedAt: "2026-04-18T07:59:12+07:00",
    vercelProject: "rove-city",
    productionUrl: "https://rove-city.vercel.app",
  },
  {
    category: "Niche",
    categoryRank: 3,
    description: "Gentle emotional forecast with calm guidance for today, tonight, and tomorrow.",
    improvementIdeas: [
      "Track check-ins over time so patterns are visible without feeling clinical.",
      "Let users tune the voice from practical to poetic.",
      "Add a short evening reflection that compares forecast and lived mood.",
    ],
    lastUpdatedAt: "2026-03-12T16:19:00+07:00",
    vercelProject: "emotiondi",
    productionUrl: "https://emotiondi.vercel.app",
  },
  {
    category: "Niche",
    categoryRank: 2,
    description: "Daily tarot ritual with a single-card reveal, reflective guidance, and readings you can share.",
    improvementIdeas: [
      "Add saved reading journals with optional private notes.",
      "Support three-card spreads for past, present, and next step.",
      "Offer deck themes that change the art direction without changing meanings.",
    ],
    lastUpdatedAt: "2026-04-18T06:43:39+07:00",
    vercelProject: "tarotdi",
    productionUrl: "https://tarotdi.vercel.app",
  },
  {
    category: "Momentum",
    categoryRank: 1,
    description: "Trip planner that turns travel ideas into organized day-by-day itineraries you can revisit later.",
    improvementIdeas: [
      "Add collaborative planning with comments on stops and days.",
      "Include packing, budget, and reservation checklists per trip.",
      "Generate map-first timeline exports for sharing or offline reference.",
    ],
    lastUpdatedAt: "2026-04-18T07:59:12+07:00",
    vercelProject: "tripdi",
    productionUrl: "https://tripdi-five.vercel.app",
  },
  {
    category: "Utility",
    categoryRank: 2,
    description: "Quick converter for checking money amounts and time differences in one simple screen.",
    improvementIdeas: [
      "Add favorite currency and time-zone pairs for repeat checks.",
      "Show rate freshness, source, and a small offline fallback state.",
      "Include meeting overlap hints for selected cities.",
    ],
    lastUpdatedAt: "2026-04-18T06:43:39+07:00",
    vercelProject: "currency",
    productionUrl: "https://currency-nine-peach.vercel.app",
  },
  {
    category: "Utility",
    categoryRank: 3,
    description: "Meetup planner where groups can share date options and vote on what works best.",
    improvementIdeas: [
      "Rank the strongest meeting slots automatically after votes arrive.",
      "Add calendar import and export so chosen times move cleanly.",
      "Support lightweight RSVP comments for constraints and preferences.",
    ],
    lastUpdatedAt: "2026-04-25T14:10:26+07:00",
    vercelProject: "meetdi",
    productionUrl: "https://meetdi.vercel.app",
  },
  {
    category: "Flagship",
    categoryRank: 2,
    description: "Chat space for switching between famous-figure personas, saving favorites, and keeping conversations organized.",
    improvementIdeas: [
      "Add a custom persona builder with guardrails for tone and source notes.",
      "Give users explicit memory controls per saved conversation.",
      "Offer exportable conversation packs for study, roleplay, or writing.",
    ],
    lastUpdatedAt: "2026-04-18T07:59:12+07:00",
    vercelProject: "persona",
    productionUrl: "https://verbose-disco-kappa.vercel.app/",
  },
  {
    category: "Momentum",
    categoryRank: 3,
    description: "Personal expense tracker where you can type spending naturally and review clear totals over time.",
    improvementIdeas: [
      "Add receipt capture with suggested merchant, amount, and category.",
      "Introduce budgets and soft alerts for categories trending high.",
      "Detect recurring expenses and surface month-over-month changes.",
    ],
    lastUpdatedAt: "2026-04-30T11:19:27+07:00",
    vercelProject: "spendi",
    productionUrl: "https://spendi-woad.vercel.app",
  },
  {
    category: "Flagship",
    categoryRank: 3,
    description: "Fast multiplayer number-order race with private rooms, countdowns, and winner results.",
    improvementIdeas: [
      "Add skill tiers, bots, and practice rounds for solo warmups.",
      "Support rematch queues and mini tournament rooms.",
      "Show round history with timing splits so close games feel legible.",
    ],
    lastUpdatedAt: "2026-04-18T06:43:39+07:00",
    vercelProject: "numberdi",
    productionUrl: "https://numberdi.vercel.app",
  },
  {
    category: "Utility",
    categoryRank: 1,
    description: "Group expense splitter for tracking shared costs, balances, spending patterns, and read-only summaries.",
    improvementIdeas: [
      "Suggest the fewest settle-up payments across the group.",
      "Attach receipts or notes to expenses for later verification.",
      "Add CSV export plus expiring read-only summary links.",
    ],
    lastUpdatedAt: "2026-04-18T07:59:12+07:00",
    vercelProject: "smart-expense",
    productionUrl: "https://smart-expense-one.vercel.app",
  },
  {
    category: "Niche",
    categoryRank: 1,
    description: "Color-matching photo contest where players chase target colors and climb the leaderboard.",
    improvementIdeas: [
      "Add a practice mode with instant feedback before submitting.",
      "Create rotating palette challenges and seasonal leaderboards.",
      "Improve accessibility with color-name hints and contrast-safe targets.",
    ],
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

    if (project.improvementIdeas.length !== 3) {
      throw new Error(`Expected exactly 3 improvement ideas for ${project.vercelProject}`);
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
      improvementIdeas: project.improvementIdeas.map((idea) => idea.trim()) as [string, string, string],
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
