import {
    useCallback,
    useState,
    useRef,
    type ReactNode,
} from "react";

import { createPortal } from "react-dom";

import { DialogContext, type DialogOptions, type DialogState } from "./DialogContext";
import DialogContainer from "./DialogContainer";

type Props = {
    children: ReactNode;
};

export default function DialogProvider({ children }: Props) {

    const [dialog, setDialog] =
        useState<DialogState | null>(null);

    const resolver = useRef<
        ((result: unknown) => void) | null
    >(null);

    const closeDialog = useCallback((result?: unknown) => {

        resolver.current?.(result);

        resolver.current = null;
        setDialog(null);

    }, []);

    const showDialog = useCallback(
        <T,>(options: DialogOptions): Promise<T | undefined> => {

            // Resolve the previous dialog if another is opened.
            resolver.current?.(undefined);

            return new Promise<T | undefined>((resolve) => {

                resolver.current = resolve as (
                    result: unknown
                ) => void;

                setDialog({
                    title: options.title,
                    content: options.content,
                    width: options.width ?? -1,
                    showHeader: options.showHeader ?? true,
                    closeOnBackdrop: options.closeOnBackdrop ?? true,
                    closeOnEscape: options.closeOnEscape ?? true,
                });
            });
        },
        []
    );

    return (
        <DialogContext.Provider
            value={{ showDialog, closeDialog }}
        >
            {children}

            {dialog && createPortal(
                <DialogContainer
                    dialog={dialog}
                    onClose={closeDialog}
                />,
                document.body
            )}
        </DialogContext.Provider>
    );
}