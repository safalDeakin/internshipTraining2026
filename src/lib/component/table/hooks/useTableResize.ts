import { useEffect, useRef, useState } from "react";

export const useTableResize = () => {
    const [containerWidth, setContainerWidth] = useState(0);

    const tableWrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const wrapper = tableWrapperRef.current;

        if (!wrapper) return;

        const observer = new ResizeObserver((entries) => {
            const width = entries[0].contentRect.width;

            setContainerWidth(width);
        });

        observer.observe(wrapper);

        return () => {
            observer.disconnect();
        };
    }, []);

    return {
        containerWidth,
        tableWrapperRef,
    };
};