
import { createContext } from "react";
import type { RatePlanStore } from "../store/RatePlanStore";

export const RatePlanContext = createContext<RatePlanStore | null>(null);
