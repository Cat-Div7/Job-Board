import { attachJobEvents } from "./render/jobEvents";
import { renderJobs } from "./render/renderJobs";
import { fetchJobs } from "./services/jobService";
import { setState, subscribe, getState } from "./state";

export async function initApp(app: HTMLDivElement) {
  app.innerHTML = `
    <div class="max-w-6xl mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6 text-center">
        HireFlow
      </h1>

      <div
        id="jobs"
        class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(350px,min(100%,1fr)))]"
      ></div>
    </div>
  `;

  const jobsContainer = document.querySelector<HTMLDivElement>("#jobs");

  if (!jobsContainer) return;

  attachJobEvents(jobsContainer);

  subscribe(() => {
    const { jobs } = getState();
    jobsContainer.innerHTML = renderJobs(jobs);
  });

  const jobs = await fetchJobs();

  setState((state) => {
    state.jobs = jobs;
  });
}
