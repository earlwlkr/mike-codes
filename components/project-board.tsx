"use client";

import { useRef, useState } from "react";
import { IconArrowUpRight, IconCopy, IconTerminal2 } from "@tabler/icons-react";

import type { ProjectLink } from "@/lib/projects";

type ProjectBoardProps = {
  projects: readonly ProjectLink[];
};

export function ProjectBoard({ projects }: ProjectBoardProps) {
  const [copiedProject, setCopiedProject] = useState<string | null>(null);
  const [copyErrorProject, setCopyErrorProject] = useState<string | null>(null);
  const copyResetTimeoutRef = useRef<number | null>(null);
  const copyErrorResetTimeoutRef = useRef<number | null>(null);

  const copyWithFallback = async (value: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = value;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      if (!successful) {
        throw new Error("Fallback clipboard copy failed");
      }
    } finally {
      document.body.removeChild(textArea);
    }
  };

  const handleCopy = async (project: ProjectLink) => {
    try {
      await copyWithFallback(project.productionUrl);
      setCopiedProject(project.vercelProject);
      setCopyErrorProject(null);
      if (copyResetTimeoutRef.current) {
        window.clearTimeout(copyResetTimeoutRef.current);
      }
      copyResetTimeoutRef.current = window.setTimeout(() => setCopiedProject(null), 1400);
      return;
    } catch {
      setCopiedProject(null);
      setCopyErrorProject(project.vercelProject);
      if (copyErrorResetTimeoutRef.current) {
        window.clearTimeout(copyErrorResetTimeoutRef.current);
      }
      copyErrorResetTimeoutRef.current = window.setTimeout(() => setCopyErrorProject(null), 2200);
    }
  };

  const formatLastUpdated = (value: string) => {
    const timestamp = new Date(value);
    if (!Number.isFinite(timestamp.getTime())) {
      return "Unknown";
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(timestamp);
  };

  return (
    <>
      <section className="overflow-hidden rounded-3xl border border-slate-300 bg-white/80 shadow-2xl shadow-slate-300/30 backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-emerald-950/20">
        <p className="sr-only" role="status" aria-live="polite">
          {copiedProject
            ? `Copied URL for ${copiedProject}`
            : copyErrorProject
              ? `Unable to copy URL for ${copyErrorProject}`
              : ""}
        </p>
        <div className="grid grid-cols-[1fr_auto] border-b border-slate-300 bg-slate-100/90 px-4 py-3 font-mono text-xs tracking-[0.12em] text-slate-600 uppercase md:grid-cols-[220px_1fr_180px_140px] md:px-6 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400">
          <span>Project</span>
          <span className="hidden md:block">Description</span>
          <span className="hidden md:block">Updated</span>
          <span className="text-right">Actions</span>
        </div>

        {projects.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="font-mono text-sm text-slate-500 dark:text-slate-400">
              No projects yet.
            </p>
          </div>
        ) : (
          <ul>
            {projects.map((project) => (
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
                    aria-label={`Copy URL for ${project.vercelProject}`}
                  >
                    {copiedProject === project.vercelProject
                      ? "COPIED"
                      : copyErrorProject === project.vercelProject
                        ? "FAILED"
                        : "COPY"}
                    <IconCopy className="size-3.5" />
                  </button>

                  <a
                    className="inline-flex items-center justify-center gap-1 rounded-md border border-emerald-600/40 bg-emerald-600/10 px-3 py-1.5 font-mono text-xs text-emerald-800 transition hover:border-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-500/50 dark:bg-emerald-500/10 dark:text-emerald-200 dark:hover:border-emerald-300 dark:hover:bg-emerald-300 dark:hover:text-emerald-950"
                    href={project.productionUrl}
                    rel="noreferrer"
                    target="_blank"
                    aria-label={`Open ${project.vercelProject} in a new tab`}
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
