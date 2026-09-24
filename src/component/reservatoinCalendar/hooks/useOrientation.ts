import { useEffect, useState } from "react";

export type Orientation =
    | "portrait"
    | "landscape";

export function useOrientation(): Orientation {
    const getOrientation = (): Orientation => {
        if (typeof window === "undefined") {
            return "landscape";
        }

        return window.innerWidth >= window.innerHeight
            ? "landscape"
            : "portrait";
    };

    const [orientation, setOrientation] =
        useState<Orientation>(getOrientation);

    useEffect(() => {
        const handleResize = () => {
            setOrientation(getOrientation());
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

    return orientation;
}