import { createContext } from "react";
import type { Item } from "../../../domain/lostfound";


export type RepoLostAndFountContextType = {
    data: Item[]
    selectedItem: Item | null
    selectedItemId: string
    selectItem: (selection: Item | string | null) => void;

    create: (data: Item) => Promise<boolean | DOMException>
    remove: (id: string) => Promise<boolean | DOMException>
};


//createContext allowed to share data with many compo
const LostAndFoundContext = createContext<RepoLostAndFountContextType | null>(null);
export default LostAndFoundContext;