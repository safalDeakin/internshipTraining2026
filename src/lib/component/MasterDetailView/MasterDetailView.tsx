import { ListHeader } from "./component/Header";
import { SearchBox } from "./component/SearchBox";
import ListArea from "./component/ListArea";
import { DetailSectionContainer } from "./component/DetailSectionContainer";
import { useState, type ReactNode } from "react";

type MasterDetailsProps<T extends object, ID> = {
    items: T[],
    searchQuery: string;
    onSearchChange: (value: string) => void;
    detailContentBuilder: (selectedId: ID) => ReactNode;
    listItemBuilder: (item: T) => ReactNode;
    getId: (item: T) => ID;
    title: string;
    headerChildren: ReactNode
};

export default function MasterDetailView<T extends object, ID>({
    items,
    searchQuery,
    detailContentBuilder,
    onSearchChange,
    listItemBuilder,
    getId,
    title,
    headerChildren
}: MasterDetailsProps<T, ID>) {
    const [selectedId, setSelectedId] =
        useState<ID>(getId(items[0]));

    return (
        <div className="flex min-h-screen bg-[#f6f6f6] text-[#4a4a4a]">
            {/* LEFT SIDE List Section MySpace*/}
            <ListSection title={title}
                items={items}
                selectedId={selectedId}
                onSelect={setSelectedId}
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                listItemBuilder={listItemBuilder}
                getId={getId}

            >
                {headerChildren}
            </ListSection>

            {/* RIGHT Detail Section CONTENT MySpace*/}
            <div>
                <DetailSectionContainer>

                    {selectedId ? detailContentBuilder(selectedId) : <p> Select Item To view Details</p>}
                </DetailSectionContainer>

            </div>

            {/* RIGHT CONTENT ENDS*/}
        </div >
    );
}



export function ListSection<T extends object, ID>({ title, items, searchQuery,
    selectedId, onSearchChange, onSelect, listItemBuilder, children,
    getId
}: {
    title: string,
    items: T[];
    searchQuery: string;
    selectedId: ID;
    onSearchChange: (value: string) => void;
    onSelect: (id: ID) => void;
    listItemBuilder: (item: T) => ReactNode;
    children: ReactNode;
    getId: (item: T) => ID;

}) {

    return (

        <aside className="m-2 w-80 min-h-screen bg-white px-3.75 pb-3.75 pt-5">
            <ListHeader title={title}>
                {children}
            </ListHeader>
            <div className="h-6" />
            {/* List Body. MySpace */}
            <div className="min-h-svh shrink-0 rounded border border-[#e1e7ed] bg-white p-2">
                <div className="p-2">
                    {/* Search MySpace*/}
                    <SearchBox searchQuery={searchQuery} onSearchChange={onSearchChange} />
                    <ListArea
                        getId={getId}
                        items={items}
                        selectedId={selectedId}
                        onSelect={onSelect}
                        itemBuilder={listItemBuilder}
                    />
                </div>
            </div>
        </aside >
    );
} 
