import { attachJobEvents } from "./render/jobEvents";
import { renderJobs } from "./render/renderJobs";
import { fetchJobs } from "./services/jobService";
import { setState, subscribe, getState, toggleDarkMode, applyDarkMode } from "./state";
import { initRouter, registerRoute, resolveRoute } from "./router";
import { renderJobDetails } from "./render/renderJobDetail";

export async function initApp(app: HTMLDivElement) {
  // Apply persisted dark mode before any paint — prevents flash
  applyDarkMode();

  app.innerHTML = `
    <div class="min-h-screen bg-white dark:bg-gray-900 dark:text-white transition-colors duration-200">
      <div class="max-w-6xl mx-auto p-4">
        <header class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-bold">HireFlow</h1>
          <button
            id="dark-mode-toggle"
            class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition-colors text-sm font-medium"
            aria-label="Toggle dark mode"
          >
            <span id="dark-mode-icon"></span>
            <span id="dark-mode-label" class="ml-1"></span>
          </button>
        </header>

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
    const { jobs } = getState();
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

  const jobs = await fetchJobs();
  setState((state) => {
    state.jobs = jobs;
  });

  resolveRoute();
  initRouter();
}