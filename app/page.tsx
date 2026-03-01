import type { Metadata } from "next";
import { IconArrowUpRight, IconTerminal2 } from "@tabler/icons-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "mike-codes",
  description: "Terminal board launcher for Mike's Vercel production apps.",
};

export default function Page() {
  return (
    <main className="min-h-svh bg-slate-100 text-slate-900 transition-colors dark:bg-[#080a0f] dark:text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 md:py-16">
        <header className="relative rounded-3xl border border-slate-300 bg-gradient-to-br from-emerald-100 to-sky-100 p-6 pr-24 transition-colors md:p-8 dark:border-emerald-500/30 dark:from-emerald-500/10 dark:to-sky-500/5">
          <div className="absolute top-6 right-6 md:top-8 md:right-8">
            <ThemeToggle />
          </div>
          <div className="space-y-3">
            <p className="font-mono text-xs tracking-[0.18em] text-emerald-700 uppercase dark:text-emerald-300">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              OPERATIONAL VIEW
            </p>
            <h1 className="font-mono text-3xl leading-tight md:text-5xl">
              Terminal Board
            </h1>
            <p className="max-w-3xl font-mono text-sm text-slate-700 md:text-base dark:text-slate-300">
              Fast launch interface with command-line flavor and high signal-to-noise.
            </p>
          </div>
        </header>

        <section className="overflow-hidden rounded-3xl border border-slate-300 bg-white/80 shadow-2xl shadow-slate-300/30 backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-emerald-950/20">
          <div className="grid grid-cols-[1fr_auto] border-b border-slate-300 bg-slate-100/90 px-4 py-3 font-mono text-xs tracking-[0.12em] text-slate-600 uppercase md:grid-cols-[220px_1fr_220px] md:px-6 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400">
            <span>Project</span>
            <span className="hidden md:block">Description</span>
            <span className="text-right">Action</span>
          </div>

          <ul>
            {projects.map((project) => (
              <li
                key={project.name}
                className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-slate-200 px-4 py-4 transition hover:bg-slate-100 md:grid-cols-[220px_1fr_220px] md:px-6 dark:border-slate-900 dark:hover:bg-slate-900/70"
              >
                <div>
                  <p className="font-mono text-base text-emerald-700 dark:text-emerald-300">{project.name}</p>
                  <p className="mt-1 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    {project.vercelProject}
                  </p>
                  <p className="mt-2 text-xs text-slate-600 md:hidden dark:text-slate-300">
                    {project.description}
                  </p>
                </div>

                <p className="hidden text-sm text-slate-700 md:block dark:text-slate-300">
                  {project.description}
                </p>

                <a
                  className="inline-flex items-center justify-center gap-1 rounded-md border border-emerald-600/40 bg-emerald-600/10 px-3 py-1.5 font-mono text-xs text-emerald-800 transition hover:border-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-500/50 dark:bg-emerald-500/10 dark:text-emerald-200 dark:hover:border-emerald-300 dark:hover:bg-emerald-300 dark:hover:text-emerald-950"
                  href={project.productionUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  OPEN
                  <IconArrowUpRight className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <footer className="flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-slate-500 uppercase dark:text-slate-400">
          <IconTerminal2 className="size-4 text-emerald-600 dark:text-emerald-400" />
          mike-codes
        </footer>
      </div>
    </main>
  );
}
