import { setState } from "../state";
import { showToast } from "../utils/toast";

export function attachApplyEvents(container: HTMLElement) {
  container.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    const confirm =
      target.closest("[data-confirm-apply]");

    if (confirm) {
      const id =
        confirm.getAttribute(
          "data-confirm-apply"
        )!;

      setState((state) => {
        state.appliedJobs.add(id);
      });

      document
        .querySelector("#apply-modal")
        ?.remove();

      showToast("Application submitted");
    }

    if (target.closest("[data-close-modal]")) {
      document
        .querySelector("#apply-modal")
        ?.remove();
    }
  });
}