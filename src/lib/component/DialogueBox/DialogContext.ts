import { createContext } from "react";
import type { DialogContextType } from "./Model";

export const DialogContext =
    createContext<DialogContextType | null>(null);