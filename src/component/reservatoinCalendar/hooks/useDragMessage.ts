import { useState } from "react";

export function useDragMessage() {
    const [dragMessage, setDragMessage] =
        useState<{
            type: "error" | "success";
            message: string;
        } | null>(null);

    const showDragMessage = (
        type: "error" | "success",
        message: string
    ) => {
        setDragMessage({
            type,
            message,
        });

        window.setTimeout(() => {
            setDragMessage(null);
        }, 2200);
    };

    return {
        dragMessage,
        showDragMessage,
    };
}