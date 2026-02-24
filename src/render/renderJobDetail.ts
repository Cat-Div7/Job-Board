import type { Job } from "../@types/job";

export function renderJobDetails(job: Job): string {
  return `
    <div class="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-colors duration-200">
      <h2 class="text-2xl font-bold mb-4 dark:text-white">${job.title}</h2>

      <p class="dark:text-gray-300"><strong>Company:</strong> ${job.company}</p>
      <p class="dark:text-gray-300"><strong>Location:</strong> ${job.location}</p>
      <p class="dark:text-gray-300"><strong>Type:</strong> ${job.type}</p>

      <p class="mt-4 dark:text-gray-300">${job.description}</p>

      <a
        href="/"
        data-link
        class="inline-block mt-6 text-blue-600 dark:text-blue-400"
      >
        ← Back
      </a>
    </div>
  `;
}