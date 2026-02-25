export function renderLoading(): string {
  return `
    <div class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-blue-500"></div>
    </div>
  `;
}