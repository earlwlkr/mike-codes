"use client";

import { useMemo } from "react";

type AppErrorStateProps = {
  error: Error & { digest?: string };
  onRetry?: () => void;
  onReload?: () => void;
  variant?: "page" | "global";
};

export function AppErrorState({
  error,
  onRetry,
  onReload,
  variant = "page",
}: AppErrorStateProps) {
  const title = variant === "global" ? "The app hit a critical error" : "Something went wrong";
  const description =
    variant === "global"
      ? "A root-level error interrupted the app shell. You can retry first, then reload if it keeps happening."
      : "A runtime error interrupted this view. You can retry without reloading the whole app.";

  const digestLabel = useMemo(() => {
    return error.digest ? `Reference: ${error.digest}` : null;
  }, [error.digest]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6 text-slate-900 transition-colors dark:bg-[#080a0f] dark:text-slate-100">
      <div className="w-full max-w-lg rounded-2xl border border-slate-300 bg-white/90 p-6 shadow-xl shadow-slate-300/30 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 dark:shadow-emerald-950/20">
        <div className="space-y-3">
          <p className="font-mono text-xs tracking-[0.18em] text-amber-700 uppercase dark:text-amber-300">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-500 dark:bg-amber-400" />
            ERROR BOUNDARY
          </p>
          <h1 className="font-mono text-2xl leading-tight md:text-3xl">{title}</h1>
          <p className="text-sm text-slate-700 dark:text-slate-300">{description}</p>
          {digestLabel ? (
            <p className="font-mono text-xs tracking-[0.08em] text-slate-500 dark:text-slate-400">{digestLabel}</p>
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center justify-center rounded-md border border-emerald-600/40 bg-emerald-600/10 px-4 py-2 font-mono text-xs tracking-[0.12em] text-emerald-800 uppercase transition hover:border-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-500/50 dark:bg-emerald-500/10 dark:text-emerald-200 dark:hover:border-emerald-300 dark:hover:bg-emerald-300 dark:hover:text-emerald-950"
            >
              Retry view
            </button>
          ) : null}

          {onReload ? (
            <button
              type="button"
              onClick={onReload}
              className="inline-flex items-center justify-center rounded-md border border-slate-400/50 bg-slate-200/70 px-4 py-2 font-mono text-xs tracking-[0.12em] text-slate-700 uppercase transition hover:border-slate-500 hover:bg-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-700"
            >
              Reload app
            </button>
          ) : null}
        </div>
      </div>
    </main>
  );
}
