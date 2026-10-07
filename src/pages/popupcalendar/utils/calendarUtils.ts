export function getDaysInMonth(month: number, year: number) {
    return new Date(
        year,
        month + 1,
        0
    ).getDate();
}

export function getFirstDayOfMonth(month: number, year: number) {
    return new Date(
        year,
        month,
        1
    ).getDay();
}

export function buildCalendarGrid(month: number, year: number) {
    const firstDay = getFirstDayOfMonth(month, year);
    const daysInMonth = getDaysInMonth(month, year);
    const cells: (number | null)[] = [];

    // Empty cells before the first day
    for (let i = 0; i < firstDay; i++) {
        cells.push(null);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
        cells.push(day);
    }

    // Complete the last week
    while (cells.length % 7 !== 0) {
        cells.push(null);
    }

    return cells;
}