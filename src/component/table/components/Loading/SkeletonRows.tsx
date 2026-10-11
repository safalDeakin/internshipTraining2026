interface SkeletonRowsProps {
    visibleColumns: any[];
    hiddenColumnsCount: number;
    columnWidths: Map<string, number>;
}

const SkeletonRows = ({
    visibleColumns,
    hiddenColumnsCount,
    columnWidths,
}: SkeletonRowsProps) => {
    return (
        <>
            {Array.from({ length: 5 }).map(
                (_, index) => (
                    <tr
                        key={index}
                        className="skeleton-row"
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
                                <div className="skeleton-box" />
                            </td>
                        ))}

                        {hiddenColumnsCount > 0 && (
                            <td>
                                <div className="skeleton-info" />
                            </td>
                        )}
                    </tr>
                )
            )}
        </>
    );
};

export default SkeletonRows;