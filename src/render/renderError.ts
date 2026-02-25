export function renderError(message: string): string {
  return `
    <div class="text-center py-20">
      <p class="text-red-500 font-semibold">
        ${message}
      </p>
    </div>
  `;
}