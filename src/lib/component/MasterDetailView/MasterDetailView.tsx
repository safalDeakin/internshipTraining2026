import { SearchBox } from "./component/SearchBox";
import ListArea from "./component/ListArea";
import { useEffect, useState, type ReactNode } from "react";
import './component/style.css';
import { ArrowRight } from "lucide-react";

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
    const [selectedId, setSelectedId] = useState<ID | undefined>(
        items.length > 0 ? getId(items[0]) : undefined
    );

    useEffect(() => {
        if (selectedId === undefined && items.length > 0) {
            setSelectedId(getId(items[0]));
        }
    }, [items, selectedId, getId]);

    return (
        <div className="main">
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
            <div className="detail-section">

                {selectedId ? detailContentBuilder(selectedId) : <p> Select Item To view Details</p>}
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

        <div className="list-section">
            {/* Header Section */}
            <div className="list-header">
                {/* Header Left Side */}
                <div className="list-title-group">
                    <ArrowRight
                        size={24}
                        strokeWidth={2}
                    />

                    <div className="list-title">
                        {title}
                    </div>
                </div>

                {/* Header Right Side */}
                {children}
            </div>
            {/* List Body. MySpace */}
            <div className="list-item-box">
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
        </div >
    );
} 
