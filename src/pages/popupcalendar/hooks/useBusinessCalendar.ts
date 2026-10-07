
import {
  useState,
  useCallback,
  useEffect,
} from "react";

export function useBusinessCalendar() {

  // Dialog state
  const [isOpen, setIsOpen] = useState(false);


  // Dialog actions
  const openDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);



  // Modal behavior
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDialog();
      }
    };

    // Prevent page scrolling while dialog is open
    document.body.style.overflow = "hidden";

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [closeDialog, isOpen]);


  return {
    closeDialog,
    isOpen,
    openDialog,
  };
}