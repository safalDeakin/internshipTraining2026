import type { ReactNode } from "react";

import { useViewportSize } from "../hooks/useViewportSize";
import { useOrientation } from "../hooks/useOrientation";

import RotateDeviceMessage from "./RotateDeviceMessage";

interface ResponsiveCalendarViewProps {
    timeline: ReactNode;
    // compact: ReactNode;   //This was for mobile card View
}

const COMPACT_WIDTH = 768;
const ROTATE_WIDTH = 600;

export default function ResponsiveCalendarView({
    timeline,
    // compact,
}: ResponsiveCalendarViewProps) {
    const { width } =
        useViewportSize();

    const orientation =
        useOrientation();

    const isPhone =
        width > 0 &&
        width < ROTATE_WIDTH;

    const isPhonePortrait =
        isPhone &&
        orientation === "portrait";

    const shouldRotate =
        width >= ROTATE_WIDTH &&
        width < COMPACT_WIDTH &&
        orientation === "portrait";


    return (
        <div className="w-full min-w-0">
            {shouldRotate ? (
                <RotateDeviceMessage />
            ) : isPhonePortrait ? (
                // compact  //This was for Card view 
                timeline
            ) : (
                timeline
            )}
        </div>
    );
}