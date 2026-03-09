"use client";

import { useEffect } from "react";

import { AppErrorState } from "@/components/app-error-state";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <AppErrorState error={error} onRetry={reset} onReload={() => window.location.reload()} />;
}
