import { Download, FileSpreadsheet, Printer } from "lucide-react";

interface ReportActionsProps {
    onPrint: () => void;
    onExportExcel: () => void;
    onExportCsv: () => void;
}

const ReportActions = ({
    onPrint,
    onExportExcel,
    onExportCsv,
}: ReportActionsProps) => {
    return (
        <div className="flex flex-wrap gap-2">

            <button
                onClick={onPrint}
                className="flex items-center gap-2 border rounded px-4 py-2"
            >
                <Printer size={16} />
                Print
            </button>


            <button
                onClick={onExportExcel}
                className="flex items-center gap-2 border rounded px-4 py-2"
            >
                <FileSpreadsheet size={16} />
                Excel
            </button>

            <button
                onClick={onExportCsv}
                className="flex items-center gap-2 border rounded px-4 py-2"
            >
                <Download size={16} />
                CSV
            </button>

        </div>
    );
};

export default ReportActions;