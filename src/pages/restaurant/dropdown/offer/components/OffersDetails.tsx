// author: shrajja

import type { ReactNode } from "react";
import { Clock, Download, FileText, SquarePen } from "lucide-react";

import type { InfoRow, OfferType, Stat } from "../../types/DropdownTypes";
import ReusableButton from "../../../pages/posuserSession/shared/components/reuse/ReusableButton";

// Section Title
const SectionTitle = ({ children }: { children: ReactNode }) => (
  <h3 className="mb-3 font-semibold ">{children}</h3>
);

// Information List
const InfoList = ({ rows }: { rows: InfoRow[] }) => (
  <div className="space-y-3 ">
    {rows.map((row) => (
      <p key={row.label} className="text-gray-600">
        {row.label}: <span className="text-black">{row.value}</span>
      </p>
    ))}
  </div>
);

// Statistics Column
const StatColumn = ({ stats }: { stats: Stat[] }) => (
  <div className="flex-1 space-y-3 ">
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
  offer: OfferType;
}

const OffersDetails = ({ offer }: OffersDetailsProps) => {
  return (
    <div className="w-full bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-semibold ">
          {offer.name}{" "}
          <span className="font-normal text-gray-500">({offer.code})</span>
        </h1>

        <div className="flex flex-wrap gap-2 text-sm">
          <ReusableButton
            variant="outline"
            size="sm"
            icon={<Download size={13} />}
            onClick={() => console.log("Export CSV")}
          >
            Export CSV
          </ReusableButton>

          <ReusableButton
            variant="outline"
            size="sm"
            icon={<FileText size={13} />}
            onClick={() => console.log("Download PDF")}
          >
            Download PDF
          </ReusableButton>

          <ReusableButton
            variant="outline"
            size="sm"
            icon={<SquarePen size={13} />}
            onClick={() => console.log("Edit item settings")}
          >
            Edit Item Settings
          </ReusableButton>
        </div>
      </div>

      {/* Offer Information */}
      <section className="mt-5 rounded-lg border border-gray-200 bg-white p-5">
        <SectionTitle>Offer Information</SectionTitle>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InfoList rows={offer.leftInfo ?? []} />
          <InfoList rows={offer.rightInfo ?? []} />
        </div>
      </section>

      {/* Overview */}
      <section className="mt-6">
        <h2 className="mb-3 font-semibold">Overview</h2>

        <div className="grid grid-cols-1 gap-6 rounded-lg border border-gray-200 bg-white p-5 md:grid-cols-2">
          {/* POS Shifts */}
          <div>
            <p className="mb-3 border-b border-gray-100 text-sm font-bold">
              POS Shifts
            </p>

            <div className="flex gap-6">
              {offer.posShifts?.map((column: any, index: any) => (
                <StatColumn key={index} stats={column} />
              ))}
            </div>
          </div>

          {/* Sales */}
          <div className="md:pl-6">
            <p className="mb-3 border-b border-gray-100 text-sm font-bold">
              Sales
            </p>

            <div className="flex gap-6">
              {offer.sales?.map((column: any, index: any) => (
                <StatColumn key={index} stats={column} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shortcut Actions */}
      <section className="mt-6">
        <h2 className="mb-3  font-semibold">Shortcuts Actions</h2>

        <div className="relative grid grid-cols-2 gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-4">
          {offer.shortcuts?.map((shortcut: any) => (
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

        <InfoList rows={offer.usageLimits ?? []} />
      </section>
    </div>
  );
};

export default OffersDetails;
