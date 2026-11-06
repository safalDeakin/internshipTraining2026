
import { useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { keyCardCmdService, keyCardQueryService } from "../../../application/services";
import { useSubscription } from "../../../application/useSubscription";

import type { RepoKeyCardContextType } from "./KeyCardContext";
import KeyCardContext from "./KeyCardContext";
import type { CardAction, CardFormType, KeyCard } from "../../../domain/KeyCard";



// Provider
export const RepoKeyCardProvider = ({ children }: { children: ReactNode }) => {

    //provider needs to log in, find an organization, or check authorization so ask for AuthService
    const queryService = keyCardQueryService;
    const cmdService = keyCardCmdService;

    const { data, loading, error } = useSubscription<KeyCard, string>(queryService);

    const [cards, setCards] = useState<KeyCard[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [activeForm, setActiveForm] = useState<CardFormType | null>(null)


    useEffect(() => {
        if (data.length === 0) return;

        setCards(data);

        setSelectedId((currentId) => {
            if (
                currentId &&
                data.some((card) => card.id === currentId)
            ) {
                return currentId;
            }

            return data[0].id;
        });
    }, [data]);

    const selectedCard = cards.find((card) => card.id === selectedId) ?? cards[0] ?? null

    const selectCard = (id: string) => {
        setSelectedId(id)
    }

    const createCard = () => {
        const template = cards[0];

        if (!template) {
            console.error("No KeyCard template available");
            return;
        }

        const number = 120 + cards.length + 1

        const newCard: KeyCard = {
            ...template,
            id: String(number),
            cardNumber: `C#${number}`,
            status: 'Inactive',
            currentHolder: '-',
            currentRoom: '-',
            reservationNo: '-',
            holderInformation: template.holderInformation.map((row) => ({
                ...row,
                value: '-',
            })),
        }
        setCards((current) => [...current, newCard])
        setSelectedId(newCard.id)
    }

    const performAction = (action: CardAction) => {
        setCards((current) =>
            current.map((card) => {
                if (card.id !== selectedId) return card

                if (action === 'issue') {
                    return { ...card, status: 'Active' }
                }

                if (action === 'lost') {
                    return { ...card, status: 'Lost' }
                }

                if (action === 'extend') {
                    const days = Number.parseInt(card.duration, 10) || 0
                    return {
                        ...card, duration: `${days + 1} Days`
                    }
                }

                if (action === 'return') {
                    return {
                        ...card,
                        status: 'Inactive',
                        returnInformation: card.returnInformation.map((row) =>
                            row.label === 'Return By' ? { ...row, value: card.currentHolder } : row,
                        ),
                    }
                }
                return { ...card, status: 'Reissued' }
            }),
        )
    }



    const create = async (data: KeyCard): Promise<boolean> => {
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

    const value = useMemo<RepoKeyCardContextType>(
        () => ({
            cards,
            selectedCard,
            selectedId,
            activeForm,
            selectCard,
            openForm: setActiveForm,
            closeForm: () => setActiveForm(null),
            createCard,
            performAction,
            create,
            remove,
        }),
        [cards, selectedCard, selectedId, activeForm],
    )


    if (loading) {
        return <div>Loading Key Cards...</div>;
    }

    if (error) {
        return <div>Unable to load Key Cards.</div>;
    }

    return (
        <KeyCardContext.Provider
            value={value}
        >
            {children}
        </KeyCardContext.Provider>
    );
};

export const useRepoKeyCardHook = () => {
    const context = useContext(KeyCardContext);

    if (!context) {
        throw new Error("must use inside provider");
    }
    return context;
}

