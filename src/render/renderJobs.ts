import type { Job } from "../@types/job";
import { getState } from "../state";

export function renderJobs(jobs: Job[]): string {
  return jobs
    .map((job) => {
      const saved = getState().savedJobs.has(job.id);
      return `
      <div class="w-full p-2">
        <div class="bg-white shadow-md rounded-lg overflow-hidden" id="${job.id}">
          <header class="px-4 py-2 border-b">
            <h2 class="text-lg font-semibold">${job.title}</h2>
          </header>
          <div class="p-4">
            <p class="mb-1"><strong>Company:</strong> ${job.company}</p>
            <p class="mb-1"><strong>Location:</strong> ${job.location}</p>
            <p class="mb-1"><strong>Type:</strong> ${job.type}</p>
            <p class="mb-2">${job.description}</p>
            <p class="text-sm text-gray-500"><em>Posted on: ${new Date(
              job.postedAt,
            ).toLocaleDateString()}</em></p>
          </div>
          <footer class="flex border-t">
            <a
            data-action="apply"
            data-id="${job.id}"
            class="flex-1 text-center py-2 hover:bg-gray-100 border-r"
            >
              Apply
            </a>

            <a
            data-action="save"
            data-id="${job.id}"
            class="flex-1 text-center py-2 ${
              saved ? "bg-blue-100" : "hover:bg-gray-100"
            }"
            >
            ${saved ? "Saved" : "Save"}
            </a>
          </footer>
        </div>
      </div>
    `;
    })
    .join("");
}
