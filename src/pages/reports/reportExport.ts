import * as XLSX from "xlsx";

export const exportReportToCSV = (
    data: Record<string, unknown>[]
) => {
    if (!data.length) {
        alert("No report data available to export.");
        return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Report"
    );

    XLSX.writeFile(workbook, "report.csv", {
        bookType: "csv",
    });
};