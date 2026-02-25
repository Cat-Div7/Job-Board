import { setState } from "../state";
import { showToast } from "../utils/toast";
import { renderApplyModal } from "./renderApplyModal";

export function attachJobEvents(container: HTMLElement): void {
  container.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    const actionEl = target.closest<HTMLElement>("[data-action]");
    if (!actionEl) return;

    const { action } = actionEl.dataset;
    const id = actionEl.dataset.id!;

    if (action === "apply") {
      console.log("Apply job:", id);
      document.body.insertAdjacentHTML("beforeend", renderApplyModal(id));
    }

    if (action === "save") {
      setState((state) => {
        if (state.savedJobs.has(id)) {
          state.savedJobs.delete(id);
          showToast("Removed from saved jobs");
        } else {
          state.savedJobs.add(id);
          showToast("Job saved");
        }
      });
    }
  });
}
