import type { Job } from "./@types/job";

type AppState = {
  jobs: Job[];
  savedJobs: Set<string>;
};

const state: AppState = {
  jobs: [],
  savedJobs: new Set(),
};

const listeners = new Set<() => void>();

export function getState() {
  return state;
}

export function setState(
  updater: (state: AppState) => void
) {
  updater(state);
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => listeners.delete(listener);
}