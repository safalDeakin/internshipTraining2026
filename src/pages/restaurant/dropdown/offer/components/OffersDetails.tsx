// author: shrajja

import type { ReactNode } from "react";
import { Clock, Download, FileText, SquarePen } from "lucide-react";

import type { InfoRow, Stat } from "../../types/DropdownTypes";
import type { Offer } from "../data/initialOfferData";

// Header Button
const HeaderButton = ({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
  >
    {icon}
    {label}
  </button>
);

// Section Title
const SectionTitle = ({ children }: { children: ReactNode }) => (
  <h3 className="mb-3 text-sm font-semibold text-gray-900">{children}</h3>
);

// Information List
const InfoList = ({ rows }: { rows: InfoRow[] }) => (
  <div className="space-y-3 text-sm">
    {rows.map((row) => (
      <p key={row.label} className="text-gray-600">
        {row.label}: <span className="text-gray-900">{row.value}</span>
      </p>
    ))}
  </div>
);

// Statistics Column
const StatColumn = ({ stats }: { stats: Stat[] }) => (
  <div className="flex-1 space-y-3 text-sm">
    {stats.map((stat) => (
      <div key={stat.label} className="flex items-center justify-between gap-3">
        <span className="text-gray-500">{stat.label}</span>
        <span className="text-gray-900">{stat.value}</span>
      </div>
    ))}
  </div>
);

// Offer Details Page
interface OffersDetailsProps {
  offer: Offer;
}

const OffersDetails = ({ offer }: OffersDetailsProps) => {
  return (
    <div className="w-full bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-sm font-semibold text-gray-900">
          {offer.name}{" "}
          <span className="font-normal text-gray-500">({offer.code})</span>
        </h1>

        <div className="flex flex-wrap gap-2 text-sm">
          <HeaderButton
            icon={<Download size={13} />}
            label="Export CSV"
            onClick={() => console.log("Export CSV")}
          />

          <HeaderButton
            icon={<FileText size={13} />}
            label="Download PDF"
            onClick={() => console.log("Download PDF")}
          />

          <HeaderButton
            icon={<SquarePen size={13} />}
            label="Edit Item Settings"
            onClick={() => console.log("Edit item settings")}
          />
        </div>
      </div>

      {/* Offer Information */}
      <section className="mt-5 rounded-lg border border-gray-200 bg-white p-5">
        <SectionTitle>Offer Information</SectionTitle>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InfoList rows={offer.leftInfo} />
          <InfoList rows={offer.rightInfo} />
        </div>
      </section>

      {/* Overview */}
      <section className="mt-6">
        <h2 className="mb-3 text-xs font-semibold text-gray-900">Overview</h2>

        <div className="grid grid-cols-1 gap-6 rounded-lg border border-gray-200 bg-white p-5 md:grid-cols-2">
          {/* POS Shifts */}
          <div>
            <p className="mb-3 border-b border-gray-100 text-sm text-gray-800">
              POS Shifts
            </p>

            <div className="flex gap-6">
              {offer.posShifts.map((column, index) => (
                <StatColumn key={index} stats={column} />
              ))}
            </div>
          </div>

          {/* Sales */}
          <div className="md:pl-6">
            <p className="mb-3 border-b border-gray-100 text-sm text-gray-800">
              Sales
            </p>

            <div className="flex gap-6">
              {offer.sales.map((column, index) => (
                <StatColumn key={index} stats={column} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shortcut Actions */}
      <section className="mt-6">
        <h2 className="mb-3 text-xs font-semibold text-gray-900">
          Shortcuts Actions
        </h2>

        <div className="relative grid grid-cols-2 gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-4">
          {offer.shortcuts.map((shortcut) => (
            <button
              key={shortcut.label}
              type="button"
              className="relative flex h-14 items-center justify-center rounded-md bg-white px-4 text-[11px] font-medium text-gray-700 shadow-sm ring-1 ring-gray-100 hover:bg-gray-50"
            >
              <span
                className={`absolute bottom-2 left-0 top-2 w-1 rounded-r ${shortcut.color}`}
              />
              {shortcut.label}
            </button>
          ))}

          <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-white">
            <Clock size={12} />
          </span>
        </div>
      </section>

      {/* Usage Limits */}
      <section className="mt-6 rounded-lg border border-gray-200 bg-white p-5">
        <SectionTitle>Usage Limit</SectionTitle>

        <InfoList rows={offer.usageLimits} />
      </section>
    </div>
  );
};

export default OffersDetails;
