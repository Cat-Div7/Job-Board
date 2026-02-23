export function attachJobEvents(container: HTMLElement): void {
  container.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    const actionEl = target.closest<HTMLElement>("[data-action]");
    if (!actionEl) return;

    const { action, id } = actionEl.dataset;

    if (action === "apply") {
      console.log("Apply job:", id);
    }

    if (action === "save") {
      console.log("Save job:", id);
    }
  });
}
