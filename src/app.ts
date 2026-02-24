import { attachJobEvents } from "./render/jobEvents";
import { renderJobs } from "./render/renderJobs";
import { fetchJobs } from "./services/jobService";
import { setState, subscribe, getState } from "./state";
import { initRouter, registerRoute, resolveRoute } from "./router";
import { renderJobDetails } from "./render/renderJobDetail";

export async function initApp(app: HTMLDivElement) {
  app.innerHTML = `
    <div class="max-w-6xl mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6 text-center">
        HireFlow
      </h1>

      <div id="view"></div>
    </div>
  `;

  const view = document.querySelector<HTMLDivElement>("#view");

  if (!view) return;

  attachJobEvents(view);
  subscribe(() => {
    resolveRoute();
  });

  // Home Route (Jobs displayer)
  registerRoute("/", () => {
    const { jobs } = getState();

    view.innerHTML = `
    <div
      class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(350px,min(100%,1fr)))]"
    >
      ${renderJobs(jobs)}
    </div>
  `;
  });

  // Job Details Route
  registerRoute("/job/:id", (params) => {
    const { jobs } = getState();

    const job = jobs.find((j) => j.id === params?.id);

    if (!job) {
      view.innerHTML = "<h2>Job not found</h2>";

      return;
    }

    view.innerHTML = renderJobDetails(job);
  });

  // Fetch Jobs data
  const jobs = await fetchJobs();

  setState((state) => {
    state.jobs = jobs;
  });

  resolveRoute();
  initRouter();
}
