import { useEffect, useState } from "react";

interface UseKeyboardNavigationProps {
    tableData: any[];
    hiddenColumnsLength: number;
    onToggleItem?: (id: number) => void;
    onExpandRow: (id: number) => void;
}

export const useKeyboardNavigation = ({
    tableData,
    hiddenColumnsLength,
    onToggleItem,
    onExpandRow,
}: UseKeyboardNavigationProps) => {
    const [focusedRowIndex, setFocusedRowIndex] = useState(-1);
    const [isKeyboardNavigation, setIsKeyboardNavigation] =
        useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                event.target instanceof HTMLInputElement ||
                event.target instanceof HTMLTextAreaElement
            ) {
                return;
            }

            if (tableData.length === 0) {
                return;
            }

            switch (event.key) {
                case "ArrowDown":
                    event.preventDefault();

                    setIsKeyboardNavigation(true);

                    setFocusedRowIndex(prev =>
                        Math.min(
                            prev + 1,
                            tableData.length - 1
                        )
                    );
                    break;

                case "ArrowUp":
                    event.preventDefault();

                    setIsKeyboardNavigation(true);

                    setFocusedRowIndex(prev =>
                        Math.max(prev - 1, 0)
                    );
                    break;

                case " ":
                    event.preventDefault();

                    if (
                        focusedRowIndex < 0 ||
                        focusedRowIndex >= tableData.length
                    ) {
                        return;
                    }

                    onToggleItem?.(
                        tableData[focusedRowIndex].id
                    );

                    break;

                case "Enter":
                    event.preventDefault();

                    if (
                        hiddenColumnsLength > 0 &&
                        focusedRowIndex >= 0 &&
                        focusedRowIndex < tableData.length
                    ) {
                        onExpandRow(
                            tableData[focusedRowIndex].id
                        );
                    }

                    break;

                case "Escape":
                    event.preventDefault();

                    setIsKeyboardNavigation(false);

                    break;
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [
        focusedRowIndex,
        tableData,
        hiddenColumnsLength,
        onToggleItem,
        onExpandRow,
    ]);

    return {
        focusedRowIndex,
        isKeyboardNavigation,
        setIsKeyboardNavigation,
    };
};