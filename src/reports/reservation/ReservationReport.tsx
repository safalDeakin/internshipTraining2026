
import ReservationReportTemplate from "./report/ReservationReportTemplate";

import ReservationReportFilters from "./components/ReservationReportFilters";

import ReportActions from "./components/ReportActions";


import * as XLSX from "xlsx";
import { useReservationReportState } from "../../hooks/useReservationReportState";



const ReservationReport = () => {

  const {
    search,
    status,
    roomType,
    paymentStatus,
    fromDate,
    toDate,

    reportData,

    setSearch,
    setStatus,
    setRoomType,
    setPaymentStatus,
    setFromDate,
    setToDate,
    resetFilters,
  } = useReservationReportState();


  const handlePrint = () => {
    window.print();
  }


  const exportReportExcel = (
    data: Record<string, unknown>[],
    fileName = "report.xlsx"
  ) => {
    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Report"
    );

    XLSX.writeFile(workbook, fileName);
  };



  const exportReportCsv = (
    data: Record<string, unknown>[],
    fileName = "report.csv"
  ) => {
    if (!data.length) {
      console.warn("No data available for CSV export");
      return;
    }

    const headers = Object.keys(data[0]);

    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header] ?? "";

            const escaped = String(value).replace(
              /"/g,
              '""'
            );

            return `"${escaped}"`;
          })
          .join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">

      {/* Filters */}
      <ReservationReportFilters
        search={search}
        status={status}
        roomType={roomType}
        paymentStatus={paymentStatus}
        fromDate={fromDate}
        toDate={toDate}

        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onRoomTypeChange={setRoomType}
        onPaymentStatusChange={setPaymentStatus}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
        onReset={resetFilters}
      />


      {/* Report */}
      <div id="printable-report" className="bg-white p-6">
        {reportData && (
          <ReservationReportTemplate
            report={reportData}
          />
        )}
      </div>

      {/* Actions */}
      <ReportActions
        onPrint={handlePrint}
        onExportExcel={() =>
          exportReportExcel(
            [reportData as unknown as Record<string, unknown>],
            "reservation-report.xlsx"
          )
        }
        onExportCsv={() =>
          exportReportCsv(
            [reportData as unknown as Record<string, unknown>], "reservation-report.csv"
          )}
      />
    </div>
  );
};

export default ReservationReport;