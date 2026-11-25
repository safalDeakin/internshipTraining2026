import { ListSection } from "./component/ListSection";
import { useEffect, useState, type ReactNode } from "react";
// import "./component/style.css";

type MasterDetailsProps<T extends object, ID> = {
  items: T[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  detailContentBuilder: (selectedId: ID) => ReactNode;
  listItemBuilder: (item: T) => ReactNode;
  getId: (item: T) => ID;
  title: string;
  headerChildren: ReactNode;
};

export default function MasterDetailView<T extends object, ID>({
  items,
  searchQuery,
  detailContentBuilder,
  onSearchChange,
  listItemBuilder,
  getId,
  title,
  headerChildren,
}: MasterDetailsProps<T, ID>) {
  const [selectedId, setSelectedId] = useState<ID | undefined>(
    items.length > 0 ? getId(items[0]) : undefined,
  );

  useEffect(() => {
    if (selectedId === undefined && items.length > 0) {
      setSelectedId(getId(items[0]));
    }
  }, [items, selectedId, getId]);

  return (
    <div className="masterDetail-main">
      {/* LEFT SIDE List Section MySpace*/}
      <ListSection
        title={title}
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
      {selectedId ? (
        detailContentBuilder(selectedId)
      ) : (
        <p> Select Item To view Details</p>
      )}
      {/* RIGHT CONTENT ENDS*/}
    </div>
  );
}
