import type { ReactNode } from "react";

export type DialogOptions = {
    content: ReactNode;
    width?: number | string;
    showCloseButton?: boolean;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
};

export type DialogContextType = {
    showDialog: <T = unknown>(
        options: DialogOptions
    ) => Promise<T | undefined>;

    closeDialog: (result?: unknown) => void;
};

export type DialogState = Required<DialogOptions>;