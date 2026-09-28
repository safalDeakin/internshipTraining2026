import { useEffect, useState } from "react";

import { useTableResize } from "../hooks/useTableResize";
import { useTableColumns } from "../hooks/useTableColumns";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";

import TableSearch from "./Table/TableSearch";
import TableHeader from "./Table/TableHeader";
import TableRow from "./Table/TableRow";
import SkeletonRows from "./Loading/SkeletonRows";

import type { MsTableProps } from "../types/types";

const MsTable = (props: MsTableProps) => {
    const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Show skeleton for 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const {
        containerWidth,
        tableWrapperRef,
    } = useTableResize();

    const {
        visibleColumns,
        hiddenColumns,
        columnWidths,
    } = useTableColumns(
        props.columns,
        containerWidth
    );

    const tableData = props.data ?? [];
    const selectedItems = props.selectedItems ?? [];

    const {
        focusedRowIndex,
        isKeyboardNavigation,
        setIsKeyboardNavigation,
    } = useKeyboardNavigation({
        tableData,
        hiddenColumnsLength: hiddenColumns.length,

        onToggleItem: props.onToggleItem,

        onExpandRow: (id) => {
            setExpandedRowId((current) =>
                current === id ? null : id
            );
        },
    });

    useEffect(() => {
        if (hiddenColumns.length === 0) {
            setExpandedRowId(null);
        }
    }, [hiddenColumns.length]);

    // Safe callback functions
    const handleSearchTypeChange = props.onSearchTypeChange ?? (() => { });

    const handleSearchChange = props.onChange ?? (() => { });

    return (
        <div
            ref={tableWrapperRef}
            className="table-wrapper"
            onMouseDown={() =>
                setIsKeyboardNavigation(false)
            }
        >
            {props.showSearchBar && (
                <TableSearch
                    searchType={props.searchType ?? "All"}
                    onSearchTypeChange={handleSearchTypeChange}
                    onChange={handleSearchChange}
                />
            )}

            <table className="item-table">

                <TableHeader
                    visibleColumns={visibleColumns}
                    hiddenColumnsCount={hiddenColumns.length}
                    columnWidths={columnWidths}
                    infoColumnWidth={40}
                />

                <tbody>

                    {isLoading ? (
                        <SkeletonRows
                            visibleColumns={visibleColumns}
                            hiddenColumnsCount={hiddenColumns.length}
                            columnWidths={columnWidths}
                        />
                    ) : tableData.length === 0 ? (
                        <tr>
                            <td
                                colSpan={
                                    visibleColumns.length +
                                    (
                                        hiddenColumns.length > 0
                                            ? 1
                                            : 0
                                    )
                                }
                                className="no-data"
                            >
                                No data available
                            </td>
                        </tr>
                    ) : (
                        tableData.map((item: any) => (
                            <TableRow
                                key={item.id}
                                item={item}
                                visibleColumns={visibleColumns}
                                hiddenColumns={hiddenColumns}
                                columnWidths={columnWidths}
                                selected={
                                    selectedItems.includes(item.id)
                                }
                                changed={
                                    props.changedRowIds?.includes(
                                        item.id
                                    )
                                }
                                expanded={
                                    expandedRowId === item.id
                                }
                                keyboardFocused={
                                    isKeyboardNavigation &&
                                    tableData[
                                        focusedRowIndex
                                    ]?.id === item.id
                                }
                                onExpand={(id) =>
                                    setExpandedRowId(
                                        (current) =>
                                            current === id
                                                ? null
                                                : id
                                    )
                                }
                                onMouseDown={() =>
                                    setIsKeyboardNavigation(false)
                                }
                            />
                        ))
                    )}

                </tbody>
            </table>
        </div>
    );
};

export default MsTable;