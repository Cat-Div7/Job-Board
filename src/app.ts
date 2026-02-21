import { renderJobs } from "./render/renderJobs";
import { fetchJobs } from "./services/jobService";

export async function initApp() {
  // Initialize the app
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) return;

  app.innerHTML = `
  <h1>HireFlow</h1>
  <div id="jobs"></div>
  `;

  // Fetch and render jobs
  const jobsContainer = document.querySelector<HTMLDivElement>("#jobs");

  const jobs = await fetchJobs();
  if (jobsContainer) {
    jobsContainer.innerHTML = jobsContainer.innerHTML = renderJobs(jobs);
  }
}
