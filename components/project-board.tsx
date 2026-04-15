"use client";

import { useEffect, useRef, useState } from "react";
import { IconCheck, IconCopy, IconExternalLink } from "@tabler/icons-react";

import type { ProjectLink } from "@/lib/projects";

type ProjectBoardProps = {
  projects: readonly ProjectLink[];
};

export function ProjectBoard({ projects }: ProjectBoardProps) {
  const [copiedProject, setCopiedProject] = useState<string | null>(null);
  const [copyErrorProject, setCopyErrorProject] = useState<string | null>(null);
  const copyResetTimeoutRef = useRef<number | null>(null);
  const copyErrorResetTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyResetTimeoutRef.current) {
        window.clearTimeout(copyResetTimeoutRef.current);
      }

      if (copyErrorResetTimeoutRef.current) {
        window.clearTimeout(copyErrorResetTimeoutRef.current);
      }
    };
  }, []);

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
    }).format(timestamp);
  };

  const formatLastUpdatedLong = (value: string) => {
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

  const formatHost = (value: string) => new URL(value).hostname.replace(/^www\./, "");

  return (
    <section className="animate-enter-delay flex-1">
      <p className="sr-only" role="status" aria-live="polite">
        {copiedProject
          ? `Copied URL for ${copiedProject}`
          : copyErrorProject
            ? `Unable to copy URL for ${copyErrorProject}`
            : ""}
      </p>

      <div className="border-y border-black/10 dark:border-white/10">
        {projects.length === 0 ? (
          <div className="py-14 text-sm text-foreground/50">No projects yet.</div>
        ) : (
          <>
            <div className="grid gap-3 py-3 md:hidden">
              {projects.map((project, index) => (
                <article
                  key={project.vercelProject}
                  className="rounded-2xl border border-black/10 bg-black/[0.015] p-4 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <div className="mb-2 text-[11px] font-semibold tracking-[0.18em] text-foreground/35 uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <a
                    href={project.productionUrl}
                    rel="noreferrer"
                    target="_blank"
                    className="group/cell inline-flex min-w-0 max-w-full items-center gap-1.5 text-left text-foreground no-underline outline-offset-2 transition-colors duration-200 hover:text-[var(--accent-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page-background)]"
                    aria-label={`Open ${project.vercelProject} in a new tab`}
                  >
                    <span className="min-w-0 truncate text-base font-semibold tracking-[-0.02em] underline-offset-2 group-hover/cell:underline">
                      {project.vercelProject}
                    </span>
                    <IconExternalLink className="size-4 shrink-0 opacity-50 transition-opacity group-hover/cell:opacity-80" aria-hidden />
                  </a>
                  <span className="mt-1 block truncate text-xs text-foreground/40">{formatHost(project.productionUrl)}</span>
                  <p className="mt-3 text-sm leading-6 text-foreground/65">{project.description}</p>
                  <p className="mt-3 text-xs leading-5 text-foreground/45">
                    Updated {formatLastUpdatedLong(project.lastUpdatedAt)}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleCopy(project)}
                      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-black/10 px-3 text-sm text-foreground/70 transition hover:border-black/20 hover:bg-black/4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-strong)] dark:border-white/10 dark:hover:border-white/20 dark:hover:bg-white/6"
                      aria-label={`Copy URL for ${project.vercelProject}`}
                    >
                      {copiedProject === project.vercelProject ? (
                        <>
                          Copied
                          <IconCheck className="size-3.5" />
                        </>
                      ) : copyErrorProject === project.vercelProject ? (
                        "Retry"
                      ) : (
                        <>
                          Copy
                          <IconCopy className="size-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[44rem] border-collapse text-left">
                <caption className="sr-only">Vercel projects with descriptions, last updated dates, and actions</caption>
                <colgroup>
                  <col className="w-12" />
                  <col className="w-56" />
                  <col />
                  <col className="w-36" />
                </colgroup>
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10">
                    <th
                      scope="col"
                      className="py-3 pr-3 text-[11px] font-semibold tracking-[0.18em] text-foreground/45 uppercase"
                    >
                      No.
                    </th>
                    <th
                      scope="col"
                      className="py-3 pr-5 text-[11px] font-semibold tracking-[0.18em] text-foreground/45 uppercase"
                    >
                      Project
                    </th>
                    <th
                      scope="col"
                      className="py-3 pr-5 text-[11px] font-semibold tracking-[0.18em] text-foreground/45 uppercase"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3 pr-5 text-right text-[11px] font-semibold tracking-[0.18em] text-foreground/45 uppercase md:table-cell"
                    >
                      Updated
                    </th>
                    <th
                      scope="col"
                      className="py-3 pl-3 text-right text-[11px] font-semibold tracking-[0.18em] text-foreground/45 uppercase"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr
                      key={project.vercelProject}
                      className="group border-t border-black/10 transition-colors first:border-t-0 hover:bg-black/4 dark:border-white/10 dark:hover:bg-white/6"
                    >
                      <td className="align-top py-4 pr-3 text-xs font-semibold tracking-[0.18em] text-foreground/30 md:align-middle">
                        {String(index + 1).padStart(2, "0")}
                      </td>
                      <td className="min-w-0 max-w-[14rem] p-0 align-top md:align-middle">
                        <a
                          href={project.productionUrl}
                          rel="noreferrer"
                          target="_blank"
                          className="group/cell block min-w-0 py-4 pr-5 text-left text-foreground no-underline outline-offset-2 transition-colors duration-200 hover:text-[var(--accent-strong)] group-hover:text-[var(--accent-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page-background)]"
                          aria-label={`Open ${project.vercelProject} in a new tab`}
                        >
                          <span className="inline-flex min-w-0 max-w-full items-center gap-1.5">
                            <span className="min-w-0 truncate text-base font-semibold tracking-[-0.02em] underline-offset-2 group-hover/cell:underline">
                              {project.vercelProject}
                            </span>
                            <IconExternalLink className="size-4 shrink-0 opacity-50 transition-opacity group-hover/cell:opacity-80" aria-hidden />
                          </span>
                          <span className="mt-1 block truncate text-xs text-foreground/40">
                            {formatHost(project.productionUrl)}
                          </span>
                        </a>
                      </td>
                      <td className="min-w-0 align-top py-4 pr-5 text-sm leading-6 text-foreground/65 md:align-middle">
                        {project.description}
                      </td>
                      <td className="hidden align-top py-4 pr-5 text-sm tabular-nums text-foreground/45 md:table-cell md:align-middle md:text-right">
                        <time dateTime={project.lastUpdatedAt} title={formatLastUpdatedLong(project.lastUpdatedAt)}>
                          {formatLastUpdated(project.lastUpdatedAt)}
                        </time>
                      </td>
                      <td className="align-top py-4 pl-3 md:align-middle">
                        <div className="flex flex-nowrap items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopy(project)}
                            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-black/10 px-3 text-sm text-foreground/70 transition hover:border-black/20 hover:bg-black/4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-strong)] dark:border-white/10 dark:hover:border-white/20 dark:hover:bg-white/6"
                            aria-label={`Copy URL for ${project.vercelProject}`}
                          >
                            {copiedProject === project.vercelProject ? (
                              <>
                                Copied
                                <IconCheck className="size-3.5" />
                              </>
                            ) : copyErrorProject === project.vercelProject ? (
                              "Retry"
                            ) : (
                              <>
                                Copy
                                <IconCopy className="size-3.5" />
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
