export function renderError(message: string) {
  return `
    <div class="text-center py-20 space-y-4">
      <p class="text-red-500 text-lg">
        ${message}
      </p>

      <button
        data-retry
        class="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Retry
      </button>
    </div>
  `;
}