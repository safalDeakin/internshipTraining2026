import {
    useEffect,
    useState,
} from "react";

interface ViewportSize {
    width: number;
    height: number;
}

function getViewportSize(): ViewportSize {
    if (typeof window === "undefined") {
        return {
            width: 0,
            height: 0,
        };
    }

    return {
        width: window.innerWidth,
        height: window.innerHeight,
    };
}

export function useViewportSize() {
    const [size, setSize] =
        useState<ViewportSize>(
            getViewportSize
        );

    useEffect(() => {
        const handleResize = () => {
            setSize(getViewportSize());
        };

        window.addEventListener(
            "resize",
            handleResize
        );

        return () => {
            window.removeEventListener(
                "resize",
                handleResize
            );
        };
    }, []);

    return size;
}