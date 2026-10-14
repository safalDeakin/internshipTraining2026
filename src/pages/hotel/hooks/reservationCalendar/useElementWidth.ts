import {
    useEffect,
    useRef,
    useState,
} from "react";

export function useElementWidth<
    T extends HTMLElement
>() {
    const ref = useRef<T | null>(null);

    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const element = ref.current;

        if (!element) {
            return;
        }

        const updateSize = () => {
            const rect =
                element.getBoundingClientRect();

            setSize({
                width: rect.width,
                height: rect.height,
            });
        };

        updateSize();

        const observer =
            new ResizeObserver(updateSize);

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    return {
        ref,
        width: size.width,
        height: size.height,
    };
}