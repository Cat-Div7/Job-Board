import type { Job } from "../@types/job";
import { getState } from "../state";

export function renderJobs(jobs: Job[]): string {
  return jobs
    .map((job) => {
      const saved = getState().savedJobs.has(job.id);
      return `
      <a href='/job/${job.id}' data-link>
        <div class="w-full p-2">
          <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-colors duration-200">
            <header class="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <h2 class="text-lg font-semibold dark:text-white">${job.title}</h2>
            </header>
            <div class="p-4">
              <p class="mb-1 dark:text-gray-300"><strong>Company:</strong> ${job.company}</p>
              <p class="mb-1 dark:text-gray-300"><strong>Location:</strong> ${job.location}</p>
              <p class="mb-1 dark:text-gray-300"><strong>Type:</strong> ${job.type}</p>
              <p class="mb-2 dark:text-gray-300">${job.description}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                <em>Posted on: ${new Date(job.postedAt).toLocaleDateString()}</em>
              </p>
            </div>
            <footer class="flex border-t border-gray-200 dark:border-gray-700">
              <a
                data-action="apply"
                data-id="${job.id}"
                class="flex-1 text-center py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 transition-colors"
              >
                Apply
              </a>
              <a
                data-action="save"
                data-id="${job.id}"
                class="flex-1 text-center py-2 transition-colors ${
                  saved
                    ? "bg-blue-100 dark:bg-blue-900 dark:text-blue-200"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                }"
              >
                ${saved ? "Saved" : "Save"}
              </a>
            </footer>
          </div>
        </div>
      </a>
    `;
    })
    .join("");
}