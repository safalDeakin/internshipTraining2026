import { ReactNode, useCallback, useRef, useState } from "react";
import DrawerContext, { DrawerOptions } from "./DrawerContext";
import { createPortal } from "react-dom";
import DrawerContainer from "./DrawerContainer";


export default function DrawerProvider({
    children,
}: {
    children: ReactNode;
}) {


    const [isClosing, setIsClosing] = useState(false);
    const [drawer, setDrawer] =
        useState<Required<DrawerOptions> | null>(null);

    const resolver = useRef<
        ((result: unknown) => void) | null
    >(null);

    const closeDrawer = useCallback((result?: unknown) => {

        resolver.current?.(result);
        resolver.current = null;

        setIsClosing(true);

    }, []);

    const handleCloseComplete = useCallback(() => {

        setDrawer(null);
        setIsClosing(false);

    }, []);

    const openDrawer = useCallback(
        <T,>(
            options: DrawerOptions
        ): Promise<T | undefined> => {

            // Resolve the previous drawer if another is opened.
            resolver.current?.(undefined);

            return new Promise<T | undefined>((resolve) => {

                resolver.current = resolve as (
                    result: unknown
                ) => void;

                setDrawer({
                    title: options.title,
                    showHeader: options.showHeader ?? true,
                    content: options.content,
                    width: options.width ?? "100%",
                    closeOnBackdrop:
                        options.closeOnBackdrop ?? true,
                    closeOnEscape:
                        options.closeOnEscape ?? true,
                });
            });
        },
        []
    );


    return (
        <DrawerContext.Provider
            value={{
                openDrawer,
                closeDrawer,
            }}
        >
            {children}

            {drawer &&
                createPortal(
                    <DrawerContainer
                        isClosing={isClosing}
                        drawer={drawer}
                        onClose={closeDrawer}
                        onCloseComplete={handleCloseComplete}
                    />,
                    document.body
                )}
        </DrawerContext.Provider>
    );
}