import { attachJobEvents } from "./render/jobEvents";
import { renderJobs } from "./render/renderJobs";
import { fetchJobs } from "./services/jobService";
import { setState, subscribe, getState } from "./state";
import { registerRoute, resolveRoute } from "./router";

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

  const jobs = await fetchJobs();

  setState((state) => {
    state.jobs = jobs;
  });

  resolveRoute();
}
