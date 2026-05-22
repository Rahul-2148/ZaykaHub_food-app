import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Theme = "dark" | "light" | "system";

const THEME_STORAGE_KEY = "vite-ui-theme";

const resolveAppliedTheme = (theme: Theme): "dark" | "light" => {
  if (theme !== "system") {
    return theme;
  }

  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyThemeToDocument = (theme: Theme) => {
  if (typeof window === "undefined") {
    return;
  }

  const root = window.document.documentElement;
  const appliedTheme = resolveAppliedTheme(theme);

  root.classList.remove("light", "dark", "system");
  root.classList.add(appliedTheme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  loadThemeFromStorage: (storageKey: string, defaultTheme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light", // Default theme
      setTheme: (theme: Theme) => {
        applyThemeToDocument(theme);
        set({ theme });
      },
      loadThemeFromStorage: (storageKey: string, defaultTheme: Theme) => {
        const storedTheme = (localStorage.getItem(storageKey) as Theme) || defaultTheme;
        applyThemeToDocument(storedTheme);
        set({ theme: storedTheme });
      },
      initializeTheme: () => {
        if (typeof window !== "undefined") {
          const storedTheme = (localStorage.getItem(THEME_STORAGE_KEY) as Theme) || "light";
          applyThemeToDocument(storedTheme);
          set({ theme: storedTheme });
        }
      },
    }),
    {
      name: "theme-store", // Name of the storage key
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
);