export interface InfoRow {
  label: string;
  value: string | number;
}

export interface Stat {
  label: string;
  value: string | number;
}

export interface Shortcut {
  label: string;
  color: string; // tailwind bg class for the accent bar
  onClick?: () => void;
}

export interface OfferDetailsProps {
  title: string;
  code: string;
  leftInfo: InfoRow[];
  rightInfo: InfoRow[];
  posShifts: Stat[][]; // two columns
  sales: Stat[][]; // two columns
  shortcuts: Shortcut[];
  usageLimits: InfoRow[];
  onExportCsv?: () => void;
  onDownloadPdf?: () => void;
  onEdit?: () => void;
}
