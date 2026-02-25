import type { Job } from "./@types/job";

type AppState = {
  jobs: Job[];
  savedJobs: Set<string>;
  darkMode: boolean;

  loading: boolean;
  error: string | null;

  search: string;
};

const state: AppState = {
  jobs: [],
  savedJobs: new Set(),
  darkMode: localStorage.getItem("darkMode") === "true",

  loading: false,
  error: null,

  search: "",
};

const listeners = new Set<() => void>();

export function getState() {
  return state;
}

export function setState(updater: (state: AppState) => void) {
  updater(state);
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function applyDarkMode() {
  if (state.darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function toggleDarkMode() {
  state.darkMode = !state.darkMode;
  localStorage.setItem("darkMode", String(state.darkMode));
  applyDarkMode();
  listeners.forEach((l) => l());
}
