"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "system" | "light" | "dark";

const storageKey = "portfolio-theme";

function resolveTheme(theme: Theme) {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return theme;
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const storedTheme = (window.localStorage.getItem(storageKey) as Theme | null) ?? "system";

    const applyTheme = (nextTheme: Theme) => {
      document.body.dataset.theme = resolveTheme(nextTheme);
      setTheme(nextTheme);
    };

    const handleMediaChange = () => {
      const currentTheme = (window.localStorage.getItem(storageKey) as Theme | null) ?? "system";
      applyTheme(currentTheme);
    };

    applyTheme(storedTheme);
    media.addEventListener("change", handleMediaChange);

    return () => {
      media.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const onThemeChange = (nextTheme: Theme) => {
    window.localStorage.setItem(storageKey, nextTheme);
    document.body.dataset.theme = resolveTheme(nextTheme);
    setTheme(nextTheme);
  };

  return (
    <div className="theme-switcher" role="group" aria-label="Theme switcher">
      <button
        className={`theme-button ${theme === "system" ? "is-active" : ""}`}
        type="button"
        aria-label="Use system theme"
        onClick={() => onThemeChange("system")}
      >
        <Monitor aria-hidden="true" />
      </button>
      <button
        className={`theme-button ${theme === "light" ? "is-active" : ""}`}
        type="button"
        aria-label="Use light theme"
        onClick={() => onThemeChange("light")}
      >
        <Sun aria-hidden="true" />
      </button>
      <button
        className={`theme-button ${theme === "dark" ? "is-active" : ""}`}
        type="button"
        aria-label="Use dark theme"
        onClick={() => onThemeChange("dark")}
      >
        <Moon aria-hidden="true" />
      </button>
    </div>
  );
}
