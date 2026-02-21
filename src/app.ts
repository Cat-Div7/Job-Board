import { renderJobs } from "./render/renderJobs";
import { fetchJobs } from "./services/jobService";

export async function initApp() {
  // Initialize the app
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) return;

  app.innerHTML = `
  <div class="max-w-6xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-center">HireFlow</h1>
    <div id="jobs" class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(350px,min(100%,1fr)))]"></div>
  </div>
`;

  // Fetch and render jobs
  const jobsContainer = document.querySelector<HTMLDivElement>("#jobs");

  const jobs = await fetchJobs();
  if (jobsContainer) {
    jobsContainer.innerHTML = renderJobs(jobs);
  }
}
