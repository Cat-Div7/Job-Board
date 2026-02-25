export function renderApplyModal(id: string) {
  return `
    <div
      id="apply-modal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow">
        <h2 class="text-lg font-bold mb-4">
          Apply for this job?
        </h2>

        <div class="flex gap-4">
          <button
            data-confirm-apply="${id}"
            class="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Apply
          </button>

          <button
            data-close-modal
            class="px-4 py-2 border rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  `;
}