import { useEffect, useState, type ReactNode } from "react";
import RotateDeviceMessage from "./RotateDeviceMessage";
interface LandscapeGuardProps {
    children: ReactNode;
}
export default function LandscapeGuard({
    children,

}: LandscapeGuardProps) {
    const [isLandscape, setIsLandscape] = useState(() => {
        if (typeof window === "undefined") {
            return true;
        }
        return window.matchMedia("(orientation: landscape)").matches;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia("(orientation: landscape)");

        const handleOrientationChange = (event: MediaQueryListEvent) => {
            setIsLandscape(event.matches);
        };

        setIsLandscape(mediaQuery.matches);

        mediaQuery.addEventListener("change", handleOrientationChange);

        return () => {
            mediaQuery.removeEventListener("change", handleOrientationChange);
        };
    }, []);

    if (!isLandscape) {
        return <RotateDeviceMessage />;
    }

    return <>{children}</>;
}