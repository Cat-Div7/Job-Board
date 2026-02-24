import type { Job } from "../@types/job";

export function renderJobDetails(job: Job): string {
  return `
    <div class="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-4">${job.title}</h2>

      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Type:</strong> ${job.type}</p>

      <p class="mt-4">${job.description}</p>

      <a
        href="/"
        data-link
        class="inline-block mt-6 text-blue-600"
      >
        ← Back
      </a>
    </div>
  `;
}