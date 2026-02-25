export function showToast(message: string) {
  const container =
    document.querySelector("#toast-container");

  if (!container) return;

  const toast = document.createElement("div");

  toast.className =
    "bg-gray-900 text-white px-4 py-2 rounded shadow animate-fade-in";

  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}