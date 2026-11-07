
import { useContext, useMemo, useState, type ReactNode } from "react";
import { LostandFoundCmdService, LostandFoundQueryService } from "../../../application/services";
import { useSubscription } from "../../../application/useSubscription";

import type { Item } from "../../../domain/lostfound";
import type { RepoLostAndFountContextType } from "./LostAndFoundContext";
import LostAndFoundContext from "./LostAndFoundContext";


// Provider
export const RepoLostAndFoundProvider = ({ children }: { children: ReactNode }) => {

    //provider needs to log in, find an organization, or check authorization so ask for AuthService
    const queryService = LostandFoundQueryService;
    const cmdService = LostandFoundCmdService;

    const { data } = useSubscription<Item, string>(queryService);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const selectItem = (selection: Item | string | null) => {
        if (typeof selection === "string") {
            setSelectedItem(data.find((item) => String(item.id) === selection) ?? null);
        } else {
            setSelectedItem(selection);
        }
    };



    const create = async (data: Item): Promise<boolean> => {
        try {
            return await cmdService.create(data);
        } catch (error) {
            alert(`Id:${data.id} Already Exist`);
            console.log(error)
            return false;
        }
    }

    const remove = async (ID: string): Promise<boolean> => {
        try {
            return await cmdService.delete(ID)
        } catch (error) {
            console.log(error)
            alert(`Id:${ID} Not Found`);
            return false;
        }
    }

    const value = useMemo<RepoLostAndFountContextType>(
        () => ({
            data,
            create,
            remove,
            selectedItem,
            selectedItemId: String(selectedItem?.id ?? ""),
            selectItem,
        }),
        [data, selectedItem],
    )

    return (
        <LostAndFoundContext.Provider
            value={value}
        >
            {children}
        </LostAndFoundContext.Provider>
    );
};

export const useRepoLostAndFoundHook = () => {
    const context = useContext(LostAndFoundContext);

    if (!context) {
        throw new Error("must use inside provider");
    }
    return context;
}

