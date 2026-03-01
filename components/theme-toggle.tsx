"use client";

import { IconMoonStars, IconSunHigh } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

const STORAGE_KEY = "mike-codes-theme";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  };

  return (
    <Button
      onClick={toggleTheme}
      size="sm"
      variant="outline"
      className="font-mono"
    >
      {theme === "dark" ? <IconSunHigh className="size-4" /> : <IconMoonStars className="size-4" />}
      <span suppressHydrationWarning>{theme === "dark" ? "Light" : "Dark"}</span>
    </Button>
  );
}
