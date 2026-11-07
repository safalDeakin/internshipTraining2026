import { createContext } from "react";
import type { CardAction, CardFormType, KeyCard } from "../../../domain/KeyCard";



export type RepoKeyCardContextType = {
    cards: KeyCard[]
    selectedCard: KeyCard
    selectedId: string | null
    activeForm: CardFormType | null
    selectCard: (id: string) => void
    openForm: (form: CardFormType) => void
    closeForm: () => void
    createCard: () => void
    performAction: (action: CardAction) => void

    create: (data: KeyCard) => Promise<boolean | DOMException>
    remove: (id: string) => Promise<boolean | DOMException>
};


//createContext allowed to share data with many compo
const KeyCardContext = createContext<RepoKeyCardContextType | null>(null);
export default KeyCardContext;