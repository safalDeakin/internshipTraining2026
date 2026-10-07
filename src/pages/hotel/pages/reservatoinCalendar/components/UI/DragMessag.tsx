interface DragMessageProps {
    message: {
        type: "error" | "success";
        message: string;
    } | null;
}

export default function DragMessage({
    message,
}: DragMessageProps) {

    if (!message) {
        return null;
    }

    return (
        <div
            className={`fixed bottom-6 left-1/2 z-50
                -translate-x-1/2 rounded-lg
                px-4 py-3 text-sm font-medium
                shadow-lg
                ${message.type === "error"
                    ? "bg-red-600 text-white"
                    : "bg-green-600 text-white"
                }`}
        >
            {message.message}
        </div>
    );
}