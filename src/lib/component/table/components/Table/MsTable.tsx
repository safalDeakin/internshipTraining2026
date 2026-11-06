import { Fragment, useEffect, useRef, useState } from "react";


const MsTable = (props: any) => {
    const [containerWidth, setContainerWidth] = useState(0);
    const [focusedRowIndex, setFocusedRowIndex] = useState(-1);
    const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
    const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);

    const tableWrapperRef = useRef<HTMLDivElement | null>(null);

    const tableData = props.data;

    const selectedItems = props.selectedItems ?? [];

    const loading = props.loading ?? false;

    const INFO_COLUMN_WIDTH = 40;
    const MANDATORY_PRIORITY = 3;

    const types = ["All", "Food", "Beverage"]

    const sortedColumns = [...props.columns].sort(
        (a: any, b: any) =>
            a.priority - b.priority
    );

    const priorityGroups = new Map<number, any[]>();

    // const toggleItem(id: number) {
    //     if (this.selectedItems.includes(id)) {
    //         this.selectedItems = this.selectedItems.filter(
    //             itemId => itemId !== id
    //         );
    //     } else {
    //         this.selectedItems = [
    //             ...this.selectedItems,
    //             id
    //         ];
    //     }
    // }

    for (const column of sortedColumns) {
        if (!priorityGroups.has(column.priority)) {
            priorityGroups.set(column.priority, []);
        }

        priorityGroups
            .get(column.priority)!
            .push(column);
    }

    const availableWidth = Math.max(
        0,
        containerWidth - INFO_COLUMN_WIDTH
    );

    const visibleKeys = new Set<string>();

    let usedIdealWidth = 0;

    for (const [priority, group] of priorityGroups) {
        const groupIdealWidth = group.reduce(
            (total: number, column: any) =>
                total + column.idealWidth,
            0
        );

        // Priority high columns
        if (priority <= MANDATORY_PRIORITY) {
            for (const column of group) {
                visibleKeys.add(column.key);
            }

            usedIdealWidth += groupIdealWidth;
            continue;
        }

        // Optional columns
        if (
            usedIdealWidth + groupIdealWidth <=
            availableWidth
        ) {
            for (const column of group) {
                visibleKeys.add(column.key);
            }

            usedIdealWidth += groupIdealWidth;
        }
    }

    const visibleColumns = props.columns.filter(
        (column: any) =>
            visibleKeys.has(column.key)
    );

    const hiddenColumns = props.columns.filter(
        (column: any) =>
            !visibleKeys.has(column.key)
    );

    const columnWidths = new Map<string, number>();

    const totalIdealWidth =
        visibleColumns.reduce(
            (total: number, column: any) =>
                total + column.idealWidth,
            0
        );

    const totalMinWidth =
        visibleColumns.reduce(
            (total: number, column: any) =>
                total + column.minWidth,
            0
        );

    // Everything fits
    if (totalIdealWidth <= availableWidth) {
        for (const column of visibleColumns) {
            columnWidths.set(
                column.key,
                column.idealWidth
            );
        }
    }

    // Need compression
    else if (totalMinWidth <= availableWidth) {
        const compressionNeeded =
            totalIdealWidth - availableWidth;

        const totalShrinkCapacity =
            visibleColumns.reduce(
                (
                    total: number,
                    column: any
                ) =>
                    total +
                    (
                        column.idealWidth -
                        column.minWidth
                    ),
                0
            );

        for (const column of visibleColumns) {
            const shrinkCapacity =
                column.idealWidth -
                column.minWidth;

            const shrinkAmount =
                compressionNeeded *
                (
                    shrinkCapacity /
                    totalShrinkCapacity
                );

            const finalWidth =
                column.idealWidth -
                shrinkAmount;

            columnWidths.set(
                column.key,
                Math.max(
                    finalWidth,
                    column.minWidth
                )
            );
        }
    }

    else {
        const compressionRatio =
            totalMinWidth > 0
                ? availableWidth /
                totalMinWidth
                : 1;

        for (const column of visibleColumns) {
            const finalWidth =
                column.minWidth *
                compressionRatio;

            columnWidths.set(
                column.key,
                finalWidth
            );
        }
    }


    useEffect(() => {
        const wrapper =
            tableWrapperRef.current;

        if (!wrapper) return;

        const observer =
            new ResizeObserver(
                (entries) => {
                    const width =
                        entries[0]
                            .contentRect
                            .width;

                    setContainerWidth(width);
                }
            );

        observer.observe(wrapper);

        return () => {
            observer.disconnect();
        };
    }, []);


    useEffect(() => {
        if (hiddenColumns.length === 0) {
            setExpandedRowId(null);
        }
    }, [hiddenColumns.length]);


    useEffect(() => {
        const handleKeyDown = (
            event: KeyboardEvent
        ) => {
            if (
                event.target instanceof
                HTMLInputElement ||
                event.target instanceof
                HTMLTextAreaElement
            ) {
                return;
            }

            if (tableData.length === 0) {
                return;
            }

            switch (event.key) {
                case "ArrowDown":
                    event.preventDefault();

                    setIsKeyboardNavigation(true);

                    setFocusedRowIndex((prev) =>
                        Math.min(
                            prev + 1,
                            tableData.length - 1
                        )
                    );

                    break;

                case "ArrowUp":
                    event.preventDefault();

                    setIsKeyboardNavigation(true);

                    setFocusedRowIndex((prev) =>
                        Math.max(
                            prev - 1,
                            0
                        )
                    );

                    break;

                case " ":
                    event.preventDefault();

                    if (
                        focusedRowIndex < 0 ||
                        focusedRowIndex >=
                        tableData.length
                    ) {
                        break;
                    }

                    const currentItem =
                        tableData[
                        focusedRowIndex
                        ];

                    if (
                        props.onToggleItem
                    ) {
                        props.onToggleItem(
                            currentItem.id
                        );
                    }

                    break;

                case "Enter":
                    event.preventDefault();

                    if (
                        hiddenColumns.length > 0 &&
                        focusedRowIndex >= 0 &&
                        focusedRowIndex <
                        tableData.length
                    ) {
                        const rowId =
                            tableData[
                                focusedRowIndex
                            ].id;

                        setExpandedRowId(
                            (currentId) =>
                                currentId === rowId
                                    ? null
                                    : rowId
                        );
                    }

                    break;

                case "Escape":
                    event.preventDefault();
                    setExpandedRowId(null);
                    setIsKeyboardNavigation(false);
                    break;

                default:
                    break;
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [
        focusedRowIndex,
        tableData,
        hiddenColumns.length,
        props.onToggleItem,
    ]);

    return (
        <div
            ref={tableWrapperRef}
            className="table-wrapper"
            onMouseDown={() =>
                setIsKeyboardNavigation(false)
            }
        >
            {props.showSearchBar && (
                <div className="search-header">
                    <div className="left-container">
                        <h3>Select Type:</h3>
                        {types.map(
                            (type: any) => (
                                <button
                                    key={type}
                                    className={
                                        props.searchType === type
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() => props.onSearchTypeChange(type)}
                                >
                                    {type}
                                </button>
                            )
                        )}
                    </div>

                    <div className="right-container">
                        <h3>Table Search:</h3>
                        <input
                            type="text"
                            onChange={(e) => props.onChange(e.target.value)}
                            placeholder="Enter here"
                        />
                    </div>
                </div>
            )}

            <table className="item-table">
                <thead>
                    <tr>
                        {visibleColumns.map(
                            (column: any) => (
                                <th
                                    key={column.key}
                                    style={{
                                        width: `${columnWidths.get(column.key)}px`,
                                    }}
                                >
                                    {column.label}
                                </th>
                            )
                        )}
                        {hiddenColumns.length >
                            0 && (
                                <th
                                    style={{ width: `${INFO_COLUMN_WIDTH}px`, }}
                                />
                            )}

                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        Array.from({ length: 5, }).map((_, index) => (
                            <tr
                                key={index}
                                className="skeleton-row"
                            >
                                {visibleColumns.map((column: any) => (
                                    <td
                                        key={column.key}
                                        style={{
                                            width: `${columnWidths.get(column.key)}px`,
                                        }}
                                    >
                                        <div className="skeleton-box" />
                                    </td>
                                )
                                )}
                                {hiddenColumns.length >
                                    0 && (
                                        <td>
                                            <div className="skeleton-info" />
                                        </td>
                                    )}
                            </tr>
                        ))
                    ) : tableData.length === 0 ? (
                        <tr>
                            <td
                                colSpan={
                                    visibleColumns.length + (hiddenColumns.length > 0 ? 1 : 0)
                                }
                                className="no-data"
                            >
                                No data available
                            </td>
                        </tr>

                    ) : (
                        tableData.map(
                            (item: any) => (
                                <Fragment
                                    key={item.id}
                                >
                                    <tr
                                        onClick={() => setIsKeyboardNavigation(false)}
                                        className={[
                                            props.changedRowIds?.includes(item.id) && "changed-row",
                                            expandedRowId === item.id && "expanded-active-row",
                                            isKeyboardNavigation && tableData[focusedRowIndex]?.id === item.id && "keyboard-focused-row",
                                            selectedItems.some((selectedItem: any) =>
                                                selectedItem === item.id
                                            ) && "selected-row",
                                        ]
                                            .filter(Boolean)
                                            .join(" ")
                                        }
                                    >
                                        {visibleColumns.map((column: any) => (
                                            <td
                                                key={column.key}
                                                style={{
                                                    width: `${columnWidths.get(column.key)}px`,
                                                }}
                                            >
                                                {column.render
                                                    ? column.render(item)
                                                    : item[column.key]}
                                            </td>

                                        )
                                        )}
                                        {hiddenColumns.length > 0 && (
                                            <td
                                                style={{
                                                    width: `${INFO_COLUMN_WIDTH}px`,
                                                }}
                                            >
                                                <button
                                                    className="info-button"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        setExpandedRowId(
                                                            (currentId) =>
                                                                currentId === item.id ? null : item.id
                                                        );
                                                    }}
                                                >
                                                    ⓘ
                                                </button>
                                            </td>
                                        )}
                                    </tr>

                                    {expandedRowId === item.id && (
                                        <tr className="expanded-row">
                                            <td
                                                colSpan={visibleColumns.length + (
                                                    hiddenColumns.length > 0 ? 1 : 0
                                                )
                                                }
                                            >
                                                <div className="hidden-columns-details">
                                                    {hiddenColumns.map(
                                                        (column: any) => (
                                                            <div
                                                                key={column.key}
                                                                className="detail-item"
                                                            >
                                                                <strong>
                                                                    {column.label}:
                                                                </strong>{" "}
                                                                {column.render
                                                                    ? column.render(item)
                                                                    : item[column.key]}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MsTable;