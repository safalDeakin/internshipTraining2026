interface TableHeaderProps {
    visibleColumns: any[];
    hiddenColumnsCount: number;
    columnWidths: Map<string, number>;
    infoColumnWidth: number;
}

const TableHeader = ({
    visibleColumns,
    hiddenColumnsCount,
    columnWidths,
    infoColumnWidth,
}: TableHeaderProps) => {
    return (
        <thead>
            <tr>
                {visibleColumns.map(column => (
                    <th
                        key={column.key}
                        style={{
                            width: `${columnWidths.get(
                                column.key
                            )}px`,
                        }}
                    >
                        {column.label}
                    </th>
                ))}

                {hiddenColumnsCount > 0 && (
                    <th
                        style={{
                            width: `${infoColumnWidth}px`,
                        }}
                    />
                )}
            </tr>
        </thead>
    );
};

export default TableHeader;