"use client";

export type Theme = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

export const themeStorageKey = "portfolio-theme";
const themeChangeEventName = "portfolio-theme-change";

export function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return theme;
}

export function getStoredTheme(): Theme {
  return (window.localStorage.getItem(themeStorageKey) as Theme | null) ?? "system";
}

export function applyTheme(theme: Theme): ResolvedTheme {
  const resolvedTheme = resolveTheme(theme);
  document.body.dataset.theme = resolvedTheme;
  window.dispatchEvent(new CustomEvent(themeChangeEventName, { detail: { theme, resolvedTheme } }));
  return resolvedTheme;
}

export function storeTheme(theme: Theme) {
  window.localStorage.setItem(themeStorageKey, theme);
}

export function subscribeToSystemThemeChange(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onChange);

  return () => {
    media.removeEventListener("change", onChange);
  };
}

export function subscribeToThemeChange(onChange: () => void) {
  window.addEventListener(themeChangeEventName, onChange);

  return () => {
    window.removeEventListener(themeChangeEventName, onChange);
  };
}
