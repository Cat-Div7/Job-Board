import type { Job } from "../@types/job";

export function renderJobs(jobs: Job[]): string {
  return jobs
    .map(
      (job) =>
        `
          <div id=${job.id} class="job-card">
            <h2>${job.title}</h2>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Type:</strong> ${job.type}</p>
            <p>${job.description}</p>
            <p><em>Posted on: ${new Date(job.postedAt).toLocaleDateString()}</em></p>
          </div>
        `,
    )
    .join("");
}
