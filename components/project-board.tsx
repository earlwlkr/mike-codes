"use client";

import { useMemo, useState } from "react";
import { IconArrowUpRight, IconCopy, IconTerminal2 } from "@tabler/icons-react";

import type { ProjectLink } from "@/lib/projects";

type ProjectBoardProps = {
  projects: readonly ProjectLink[];
};

export function ProjectBoard({ projects }: ProjectBoardProps) {
  const [query, setQuery] = useState("");
  const [copiedProject, setCopiedProject] = useState<string | null>(null);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredProjects = useMemo(() => {
    if (!normalizedQuery) {
      return projects;
    }

    return projects.filter((project) => {
      return (
        project.vercelProject.toLowerCase().includes(normalizedQuery) ||
        project.description.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [projects, normalizedQuery]);

  const handleCopy = async (project: ProjectLink) => {
    try {
      await navigator.clipboard.writeText(project.productionUrl);
      setCopiedProject(project.vercelProject);
      window.setTimeout(() => setCopiedProject(null), 1400);
    } catch {
      setCopiedProject(null);
    }
  };

  const formatLastUpdated = (value: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(value));
  };

  return (
    <>
      <section className="rounded-2xl border border-slate-300 bg-white/70 p-4 shadow-sm backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/60">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="flex-1">
            <span className="mb-2 block font-mono text-[11px] tracking-[0.12em] text-slate-500 uppercase dark:text-slate-400">
              Filter projects
            </span>
            <input
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-emerald-400 dark:focus:ring-emerald-900/60"
              placeholder="Search by name or description"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <div className="font-mono text-xs tracking-[0.12em] text-slate-500 uppercase dark:text-slate-400">
            Showing {filteredProjects.length} / {projects.length}
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-300 bg-white/80 shadow-2xl shadow-slate-300/30 backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-emerald-950/20">
        <div className="grid grid-cols-[1fr_auto] border-b border-slate-300 bg-slate-100/90 px-4 py-3 font-mono text-xs tracking-[0.12em] text-slate-600 uppercase md:grid-cols-[220px_1fr_180px_140px] md:px-6 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400">
          <span>Project</span>
          <span className="hidden md:block">Description</span>
          <span className="hidden md:block">Updated</span>
          <span className="text-right">Actions</span>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="font-mono text-sm text-slate-500 dark:text-slate-400">
              No projects matched “{query.trim()}”.
            </p>
          </div>
        ) : (
          <ul>
            {filteredProjects.map((project) => (
              <li
                key={project.vercelProject}
                className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-slate-200 px-4 py-4 transition hover:bg-slate-100 md:grid-cols-[220px_1fr_180px_140px] md:px-6 dark:border-slate-900 dark:hover:bg-slate-900/70"
              >
                <div>
                  <p className="font-mono text-base text-emerald-700 dark:text-emerald-300">{project.vercelProject}</p>
                  <p className="mt-2 text-xs text-slate-600 md:hidden dark:text-slate-300">{project.description}</p>
                  <p className="mt-2 font-mono text-[11px] tracking-[0.08em] text-slate-500 uppercase md:hidden dark:text-slate-400">
                    Updated {formatLastUpdated(project.lastUpdatedAt)}
                  </p>
                </div>

                <p className="hidden text-sm text-slate-700 md:block dark:text-slate-300">{project.description}</p>

                <p className="hidden font-mono text-xs leading-5 text-slate-600 md:block dark:text-slate-400">
                  {formatLastUpdated(project.lastUpdatedAt)}
                </p>

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(project)}
                    className="inline-flex items-center justify-center gap-1 rounded-md border border-slate-400/50 bg-slate-200/70 px-3 py-1.5 font-mono text-xs text-slate-700 transition hover:border-slate-500 hover:bg-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-700"
                  >
                    {copiedProject === project.vercelProject ? "COPIED" : "COPY"}
                    <IconCopy className="size-3.5" />
                  </button>

                  <a
                    className="inline-flex items-center justify-center gap-1 rounded-md border border-emerald-600/40 bg-emerald-600/10 px-3 py-1.5 font-mono text-xs text-emerald-800 transition hover:border-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-500/50 dark:bg-emerald-500/10 dark:text-emerald-200 dark:hover:border-emerald-300 dark:hover:bg-emerald-300 dark:hover:text-emerald-950"
                    href={project.productionUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    OPEN
                    <IconArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-slate-500 uppercase dark:text-slate-400">
        <IconTerminal2 className="size-4 text-emerald-600 dark:text-emerald-400" />
        mike-codes
      </footer>
    </>
  );
}
