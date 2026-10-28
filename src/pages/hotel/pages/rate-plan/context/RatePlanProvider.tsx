
import { useState, type ReactNode } from "react";
import { RatePlanContext } from "../context/RatePlanContext";
import { RatePlanStore } from "../store/RatePlanStore";

interface Props {
    children: ReactNode;
}

export function RatePlanProvider({ children }: Props) {
    const [store] = useState(() => new RatePlanStore());

    return (
        <RatePlanContext.Provider value={store}>
            {children}
        </RatePlanContext.Provider>
    );
}
