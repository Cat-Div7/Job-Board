export function renderSkeleton(count = 6) {
  return Array(count)
    .fill(null)
    .map(
      () => `
      <div class="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-3">
        <div class="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        <div class="h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    `
    )
    .join("");
}