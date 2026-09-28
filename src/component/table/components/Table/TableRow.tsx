interface TableRowProps {
    item: any;
    visibleColumns: any[];
    hiddenColumns: any[];
    columnWidths: Map<string, number>;
    selected: boolean;
    changed?: boolean;
    expanded: boolean;
    keyboardFocused: boolean;
    onExpand: (id: number) => void;
    onMouseDown: () => void;
}

const TableRow = ({
    item,
    visibleColumns,
    hiddenColumns,
    columnWidths,
    selected,
    changed,
    expanded,
    keyboardFocused,
    onExpand,
    onMouseDown,
}: TableRowProps) => {
    const className = [
        changed && "changed-row",
        expanded && "expanded-active-row",
        keyboardFocused && "keyboard-focused-row",
        selected && "selected-row",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <>
            <tr
                onClick={onMouseDown}
                className={className}
            >
                {visibleColumns.map(column => (
                    <td
                        key={column.key}
                        style={{
                            width: `${columnWidths.get(
                                column.key
                            )}px`,
                        }}
                    >
                        {column.render
                            ? column.render(item)
                            : item[column.key]}
                    </td>
                ))}

                {hiddenColumns.length > 0 && (
                    <td>
                        <button
                            className="info-button"
                            onClick={event => {
                                event.stopPropagation();
                                onExpand(item.id);
                            }}
                        >
                            ⓘ
                        </button>
                    </td>
                )}
            </tr>

            {expanded && (
                <tr className="expanded-row">
                    <td
                        colSpan={
                            visibleColumns.length + 1
                        }
                    >
                        <div className="hidden-columns-details">
                            {hiddenColumns.map(column => (
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
                            ))}
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export default TableRow;