import type { Metadata } from "next";

import { ProjectBoard } from "@/components/project-board";
import { ThemeToggle } from "@/components/theme-toggle";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "mike-codes",
  description: "Terminal board launcher for Mike's Vercel production apps.",
};

export default function Page() {
  return (
    <main
      id="main-content"
      className="min-h-svh bg-slate-100 text-slate-900 transition-colors dark:bg-[#080a0f] dark:text-slate-100"
    >
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
        <ProjectBoard projects={projects} />
      </div>
    </main>
  );
}
