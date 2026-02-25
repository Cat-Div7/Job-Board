import { attachJobEvents } from "./render/jobEvents";
import { renderJobs } from "./render/renderJobs";
import { fetchJobs } from "./services/jobService";
import {
  setState,
  subscribe,
  getState,
  toggleDarkMode,
  applyDarkMode,
} from "./state";
import { initRouter, registerRoute, resolveRoute } from "./router";
import { renderJobDetails } from "./render/renderJobDetail";
import { getSavedJobs } from "./state/selectors";
import { renderLoading } from "./render/renderLoading";
import { renderError } from "./render/renderError";

export async function initApp(app: HTMLDivElement) {
  // Apply persisted dark mode before any paint — prevents flash
  applyDarkMode();

  app.innerHTML = `
    <div class="min-h-screen bg-white dark:bg-gray-900 dark:text-white transition-colors duration-200">
      <div class="max-w-6xl mx-auto p-4">
        <nav class="flex justify-between items-center mb-6">
          <a href="/" data-link class="text-2xl font-bold dark:text-white">
            HireFlow
          </a>
          <div class="flex gap-4 items-center">
            <a href="/saved" data-link class="hover:underline dark:text-gray-300">
              Saved Jobs
            </a>
            <button
              id="dark-mode-toggle"
              class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition-colors text-sm font-medium"
              aria-label="Toggle dark mode"
            >
              <span id="dark-mode-icon"></span>
              <span id="dark-mode-label"></span>
            </button>
          </div>
        </nav>

        <div id="view"></div>
      </div>
    </div>
  `;

  const view = document.querySelector<HTMLDivElement>("#view");
  if (!view) return;

  function updateToggleUI() {
    const { darkMode } = getState();
    const icon = document.querySelector<HTMLSpanElement>("#dark-mode-icon");
    const label = document.querySelector<HTMLSpanElement>("#dark-mode-label");
    if (icon) icon.textContent = darkMode ? "☀️" : "🌙";
    if (label) label.textContent = darkMode ? "Light" : "Dark";
  }

  updateToggleUI();

  document
    .querySelector<HTMLButtonElement>("#dark-mode-toggle")
    ?.addEventListener("click", () => {
      toggleDarkMode();
      updateToggleUI();
    });

  attachJobEvents(view);

  subscribe(() => {
    resolveRoute();
  });

  // Home Route
  registerRoute("/", () => {
    const { jobs, loading, error } = getState();

    if (loading) {
      view.innerHTML = renderLoading();
      return;
    }

    if (error) {
      view.innerHTML = renderError(error);
      return;
    }
    view.innerHTML = `
      <div class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(350px,min(100%,1fr)))]">
        ${renderJobs(jobs)}
      </div>
    `;
  });

  // Job Details Route
  registerRoute("/job/:id", (params) => {
    const { jobs } = getState();
    const job = jobs.find((j) => j.id === params?.id);

    if (!job) {
      view.innerHTML = "<h2 class='dark:text-white'>Job not found</h2>";
      return;
    }

    view.innerHTML = renderJobDetails(job);
  });

  // Svaved Jobs Route
  registerRoute("/saved", () => {
    const saved = getSavedJobs();

    if (!saved.length) {
      view.innerHTML = `
      <p class="text-center text-gray-500">
        No saved jobs yet
      </p>
    `;
      return;
    }

    view.innerHTML = `
    <div
      class="grid gap-4
      grid-cols-[repeat(auto-fill,minmax(350px,min(100%,1fr)))]"
    >
      ${renderJobs(saved)}
    </div>
  `;
  });

  // Set loading state before fetching jobs
  setState((state) => {
    state.loading = true;
    state.error = null;
  });

  try {
    const jobs = await fetchJobs();

    setState((state) => {
      state.jobs = jobs;
      state.loading = false;
    });
  } catch (err) {
    setState((state) => {
      state.loading = false;
      state.error = err instanceof Error ? err.message : "Unknown error";
    });
  }

  resolveRoute();
  initRouter();
}
