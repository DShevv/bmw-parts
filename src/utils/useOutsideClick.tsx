import { useEffect } from "react";

function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  onClick: () => void,
  debugName?: string
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;

      if (!ref.current || !target) {
        return;
      }

      const isInside = ref.current.contains(target);

      const isButton =
        target.nodeName === "BUTTON" ||
        target.parentNode?.nodeName === "BUTTON" ||
        target.parentNode?.parentNode?.nodeName === "BUTTON";

      const isInput =
        target.nodeName === "INPUT" ||
        target.classList.contains("input") ||
        target.closest("input");

      if (!isInside && !isButton && !isInput) {
        onClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [ref, onClick, debugName]);
}

export default useOutsideClick;
