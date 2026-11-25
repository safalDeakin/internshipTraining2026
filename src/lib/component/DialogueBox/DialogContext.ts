import { createContext } from "react";
import type { ReactNode } from "react";

export type DialogOptions = {
    content: ReactNode;
    title: string;
    width?: number;
    showHeader?: boolean | undefined;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
};

export type DialogContextType = {
    showDialog: <T = unknown>(
        options: DialogOptions
    ) => Promise<T | undefined>;

    closeDialog: () => void;
};

export type DialogState = Required<DialogOptions>;

export const DialogContext =
    createContext<DialogContextType | null>(null);