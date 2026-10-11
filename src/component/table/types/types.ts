import type { ReactNode } from "react";

export interface TableColumn<T = any> {
    key: string;
    label: string;
    idealWidth: number;
    minWidth: number;
    priority: number;
    searchable?: boolean;
    render?: (item: T) => ReactNode;
}

export interface MsTableProps<T = any> {
    data: T[];
    columns: TableColumn<T>[];
    loading?: boolean;
    selectedItems?: number[];
    changedRowIds?: number[];
    showSearchBar?: boolean;
    searchType?: string;
    onSearchTypeChange?: (type: string) => void;
    onChange?: (value: string) => void;
    onToggleItem?: (id: number) => void;
}