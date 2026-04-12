import type { Metadata } from "next";

import { ProjectBoard } from "@/components/project-board";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "mike-codes",
  description: "Terminal board launcher for Mike's Vercel production apps.",
};

export default function Page() {
  return (
    <main id="main-content" className="min-h-svh text-foreground">
      <div className="mx-auto flex min-h-svh w-full max-w-6xl flex-col px-5 py-5 sm:px-8 sm:py-8 lg:px-10">
        <header className="animate-enter pb-8">
          <div className="max-w-3xl pt-6">
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl lg:text-6xl">
              mike-codes
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-foreground/65 sm:text-base">
              My &quot;I&apos;ll just whip up a quick tool&quot; apps need a control center too.
            </p>
          </div>
        </header>

        <ProjectBoard projects={projects} />
      </div>
    </main>
  );
}
