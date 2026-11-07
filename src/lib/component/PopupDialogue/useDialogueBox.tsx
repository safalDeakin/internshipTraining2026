import { useContext } from "react";
import { DialogContext } from "./DialogContext";

export default function useDialogBox() {

    const context = useContext(DialogContext);

    if (!context) {
        throw new Error(
            "useDialog must be used inside DialogProvider"
        );
    }

    return context;
}