import { useContext } from "react";
import DrawerContext from "./DrawerContext";


export default function useDrawer() {
    const context = useContext(DrawerContext);

    if (!context) {
        throw new Error(
            "useDrawer must be used inside DrawerProvider"
        );
    }

    return context;
}
