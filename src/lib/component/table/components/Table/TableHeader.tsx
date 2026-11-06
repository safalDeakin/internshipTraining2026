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
        {visibleColumns.map((column) => (
          <th key={column.key} className="text-left">
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
