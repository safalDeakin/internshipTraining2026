import { useMemo } from "react";

const INFO_COLUMN_WIDTH = 40;
const MANDATORY_PRIORITY = 3;

export const useTableColumns = (
    columns: any[],
    containerWidth: number
) => {
    return useMemo(() => {
        const sortedColumns = [...columns].sort(
            (a, b) => a.priority - b.priority
        );

        const priorityGroups = new Map<number, any[]>();

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
                (total, column) =>
                    total + column.idealWidth,
                0
            );

            if (priority <= MANDATORY_PRIORITY) {
                for (const column of group) {
                    visibleKeys.add(column.key);
                }

                usedIdealWidth += groupIdealWidth;
                continue;
            }

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

        const visibleColumns = columns.filter(
            column => visibleKeys.has(column.key)
        );

        const hiddenColumns = columns.filter(
            column => !visibleKeys.has(column.key)
        );

        const columnWidths = new Map<string, number>();

        const totalIdealWidth = visibleColumns.reduce(
            (total, column) =>
                total + column.idealWidth,
            0
        );

        const totalMinWidth = visibleColumns.reduce(
            (total, column) =>
                total + column.minWidth,
            0
        );

        if (totalIdealWidth <= availableWidth) {
            for (const column of visibleColumns) {
                columnWidths.set(
                    column.key,
                    column.idealWidth
                );
            }
        } else if (totalMinWidth <= availableWidth) {
            const compressionNeeded =
                totalIdealWidth - availableWidth;

            const totalShrinkCapacity =
                visibleColumns.reduce(
                    (total, column) =>
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
        } else {
            const compressionRatio =
                totalMinWidth > 0
                    ? availableWidth / totalMinWidth
                    : 1;

            for (const column of visibleColumns) {
                columnWidths.set(
                    column.key,
                    column.minWidth *
                    compressionRatio
                );
            }
        }

        return {
            visibleColumns,
            hiddenColumns,
            columnWidths,
        };
    }, [columns, containerWidth]);
};