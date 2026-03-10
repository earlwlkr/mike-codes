import { NextResponse } from "next/server";

import { projects } from "@/lib/projects";

export const dynamic = "force-dynamic";

type HealthState = "healthy" | "degraded" | "down";

async function checkProject(project: (typeof projects)[number]) {
  const startedAt = Date.now();

  try {
    const response = await fetch(project.productionUrl, {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
      headers: {
        "user-agent": "mike-codes-health-check",
      },
      signal: AbortSignal.timeout(8000),
    });

    const responseTimeMs = Date.now() - startedAt;
    const status = response.status;
    const ok = response.ok;
    const health: HealthState = ok ? "healthy" : status >= 500 ? "down" : "degraded";

    return {
      project: project.vercelProject,
      productionUrl: project.productionUrl,
      checkedAt: new Date().toISOString(),
      responseTimeMs,
      status,
      ok,
      health,
    };
  } catch (error) {
    return {
      project: project.vercelProject,
      productionUrl: project.productionUrl,
      checkedAt: new Date().toISOString(),
      responseTimeMs: Date.now() - startedAt,
      status: null,
      ok: false,
      health: "down" as const,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function GET() {
  const checks = await Promise.all(projects.map((project) => checkProject(project)));

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    summary: {
      healthy: checks.filter((check) => check.health === "healthy").length,
      degraded: checks.filter((check) => check.health === "degraded").length,
      down: checks.filter((check) => check.health === "down").length,
      total: checks.length,
    },
    checks,
  });
}
