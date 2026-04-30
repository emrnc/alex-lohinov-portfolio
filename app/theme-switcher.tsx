"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import {
  applyTheme as applyStoredTheme,
  getStoredTheme,
  storeTheme,
  subscribeToSystemThemeChange,
  type Theme,
} from "./theme";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const syncTheme = (nextTheme: Theme) => {
      applyStoredTheme(nextTheme);
      setTheme(nextTheme);
    };

    const handleMediaChange = () => {
      syncTheme(getStoredTheme());
    };

    syncTheme(getStoredTheme());
    const unsubscribe = subscribeToSystemThemeChange(handleMediaChange);

    return () => {
      unsubscribe();
    };
  }, []);

  const onThemeChange = (nextTheme: Theme) => {
    storeTheme(nextTheme);
    applyStoredTheme(nextTheme);
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
