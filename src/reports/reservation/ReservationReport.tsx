import { useMemo, useState } from "react";

import ReservationReportTemplate from "./report/ReservationReportTemplate";
import { reservations } from "./reservationData";
import { buildReservationReport } from "./reservationReportData";
import ReservationReportFilters from "./components/ReservationReportFilters";
import { filterReservations } from "./filterReservation";
import ReportActions from "./components/ReportActions";


import * as XLSX from "xlsx";



const ReservationReport = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [roomType, setRoomType] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");


  const filteredReservations = useMemo(() => {
    return filterReservations(reservations, {
      search,
      status,
      roomType,
      paymentStatus,
      fromDate,
      toDate,
    });
  }, [
    search,
    status,
    roomType,
    paymentStatus,
    fromDate,
    toDate,
  ]);

  const reportData = useMemo(() => {
    return buildReservationReport(
      filteredReservations,
      {
        propertyName: "VIP Hotel & Resort",
        reportDate: "2083/01/01",
        preparedBy: "Store Manager",
        location: "28 Kilo, Dhulikhel",
      }
    )
  }, [filteredReservations]);


  const handleReset = () => {
    setSearch("");
    setStatus("");
    setRoomType("");
    setPaymentStatus("");
    setFromDate("");
    setToDate("");
  }


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
        onReset={handleReset}
      />


      {/* Report */}
      <div id="printable-report" className="bg-white p-6">
        <ReservationReportTemplate
          report={reportData}
        />
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
        onExportCsv={() => exportReportCsv([reportData as unknown as Record<string, unknown>], "reservation-report.csv")}
      />
    </div>
  );
};

export default ReservationReport;