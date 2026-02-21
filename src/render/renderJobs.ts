import type { Job } from "../@types/job";

export function renderJobs(jobs: Job[]): string {
  return jobs
    .map(
      (job) => `
      <div class="column is-one-third">
        <div class="card" id="${job.id}">
          <header class="card-header">
            <p class="card-header-title">${job.title}</p>
          </header>
          <div class="card-content">
            <div class="content">
              <p><strong>Company:</strong> ${job.company}</p>
              <p><strong>Location:</strong> ${job.location}</p>
              <p><strong>Type:</strong> ${job.type}</p>
              <p>${job.description}</p>
              <p><em>Posted on: ${new Date(job.postedAt).toLocaleDateString()}</em></p>
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item">Apply</a>
            <a href="#" class="card-footer-item">Save</a>
          </footer>
        </div>
      </div>
    `
    )
    .join("");
}