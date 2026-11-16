import { createContext, ReactNode } from "react";

export type DrawerOptions = {
    content: ReactNode;
    width?: string;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    showHeader?: boolean | undefined;
    title: string;
};

type DrawerContextType = {
    openDrawer: <T>(
        options: DrawerOptions
    ) => Promise<T | undefined>;

    closeDrawer: (result?: unknown) => void;
};


export const DrawerContext =
    createContext<DrawerContextType | null>(null);


export default DrawerContext;