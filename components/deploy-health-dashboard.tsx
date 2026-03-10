"use client";

import { useEffect, useMemo, useState } from "react";
import { IconActivityHeartbeat, IconLoader2, IconRefresh } from "@tabler/icons-react";

type HealthCheck = {
  project: string;
  productionUrl: string;
  checkedAt: string;
  responseTimeMs: number;
  status: number | null;
  ok: boolean;
  health: "healthy" | "degraded" | "down";
  error?: string;
};

type HealthPayload = {
  generatedAt: string;
  summary: {
    healthy: number;
    degraded: number;
    down: number;
    total: number;
  };
  checks: HealthCheck[];
};

const HEALTH_STYLES: Record<HealthCheck["health"], string> = {
  healthy: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  degraded: "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  down: "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300",
};

export function DeployHealthDashboard() {
  const [payload, setPayload] = useState<HealthPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async (mode: "initial" | "refresh" = "initial") => {
    if (mode === "initial") {
      setLoading(true);
    } else {
      setRefreshing(true);
    }

    try {
      setError(null);
      const response = await fetch(`/api/health?ts=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Health endpoint failed with ${response.status}`);
      }
      const json = (await response.json()) as HealthPayload;
      setPayload(json);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load deploy health.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const averageResponse = useMemo(() => {
    if (!payload?.checks.length) {
      return null;
    }

    const total = payload.checks.reduce((sum, check) => sum + check.responseTimeMs, 0);
    return Math.round(total / payload.checks.length);
  }, [payload]);

  return (
    <section className="rounded-3xl border border-slate-300 bg-white/80 p-5 shadow-sm backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/70">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-mono text-xs tracking-[0.16em] text-sky-700 uppercase dark:text-sky-300">
            Deploy health
          </p>
          <h2 className="mt-2 flex items-center gap-2 font-mono text-2xl">
            <IconActivityHeartbeat className="size-6 text-sky-600 dark:text-sky-400" />
            Production checks
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Live response snapshot across the Vercel apps listed on this board.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void load("refresh")}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 font-mono text-xs tracking-[0.12em] text-slate-700 uppercase transition hover:border-sky-500 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:text-sky-300"
        >
          {refreshing ? <IconLoader2 className="size-4 animate-spin" /> : <IconRefresh className="size-4" />}
          Refresh
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.12em] uppercase text-slate-500 dark:text-slate-400">
        <span>Healthy {payload?.summary.healthy ?? 0}</span>
        <span>Degraded {payload?.summary.degraded ?? 0}</span>
        <span>Down {payload?.summary.down ?? 0}</span>
        <span>Total {payload?.summary.total ?? 0}</span>
        {averageResponse !== null ? <span>Avg {averageResponse} ms</span> : null}
      </div>

      {loading ? (
        <div className="mt-6 flex items-center gap-2 font-mono text-sm text-slate-500 dark:text-slate-400">
          <IconLoader2 className="size-4 animate-spin" />
          Running health checks…
        </div>
      ) : error ? (
        <div className="mt-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
          {error}
        </div>
      ) : (
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {payload?.checks.map((check) => (
            <article
              key={check.project}
              className="rounded-2xl border border-slate-200 bg-slate-50/90 p-4 transition-colors dark:border-slate-900 dark:bg-slate-900/70"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-mono text-base text-slate-900 dark:text-slate-100">{check.project}</h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{check.productionUrl}</p>
                </div>
                <span className={`rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase ${HEALTH_STYLES[check.health]}`}>
                  {check.health}
                </span>
              </div>

              <dl className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-center justify-between gap-3">
                  <dt>Status</dt>
                  <dd className="font-mono">{check.status ?? "ERR"}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt>Response</dt>
                  <dd className="font-mono">{check.responseTimeMs} ms</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt>Checked</dt>
                  <dd className="font-mono text-xs">{new Date(check.checkedAt).toLocaleTimeString()}</dd>
                </div>
              </dl>

              {check.error ? (
                <p className="mt-3 text-xs text-rose-600 dark:text-rose-300">{check.error}</p>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
