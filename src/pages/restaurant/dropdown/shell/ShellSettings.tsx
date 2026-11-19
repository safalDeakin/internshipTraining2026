import type { ReactNode } from "react";
import { ArrowRight, Monitor, Pencil } from "lucide-react";
import ReusableButton from "../../../../shell/shared/components/ReusableButton";
import useDrawer from "../../../../lib/component/Drawer/useDrawer";
import Container from "../../../../lib/component/Container/Container";

/* ----------------------------- Types ----------------------------- */

type KeyValue = { label: string; value: string };
type SettingsColumn = { title: string; items: KeyValue[] };
type OfferStat = { label: string; value: number | string };

/* ----------------------------- Data ------------------------------ */

const store = {
  code: "C2",
  name: "VIP Restaurant and Thakali bhansa Ghar",
  address: "8 Kilo Chowk, Dhulikhel 45210",
  fiscalYear: "2024-2025",
  openingTime: "9:00AM-5:30 PM",
  today: "Sunday 27th July",
  businessId: "122A12",
  subscription: "Standard Plan",
  payPeriod: "Monthly",
};

const salesColumns: [SettingsColumn, SettingsColumn] = [
  {
    title: "Billing",
    items: [
      { label: "Active PriceList", value: "March 2024 - #123" },
      { label: "Pricing Mode", value: "Tax Inclusive" },
      { label: "Invoice Rounding", value: "Disable" },
      { label: "Display full tax BreakDown", value: "No" },
      { label: "Allow Split Billing", value: "Not Allowed" },
    ],
  },
  {
    title: "Tax and Additional Charges",
    items: [
      { label: "Default Tax applied", value: "[ Vat 13, Municipality Tax]" },
      { label: "Tax Calculation Method", value: "Per Invoice (or per item)" },
      { label: "Tax Rounding Method", value: "Round Up" },
      { label: "Manual Tax Override", value: "Not Allowed" },
      {
        label: "Additional Charges",
        value: "[ ServiceCharges, Delivery Charges]",
      },
    ],
  },
];

const paymentColumns: [SettingsColumn, SettingsColumn] = [
  {
    title: "Returns and Refunds",
    items: [
      { label: "Return Time limit", value: "1 day" },
      { label: "Partial Refund - Amount", value: "Not Allowed" },
      { label: "Partial Refund - Items", value: "Not Allowed" },
      { label: "Cash Refunds Limits", value: "Not Allowed" },
    ],
  },
  {
    title: "Payments",
    items: [
      { label: "Allowed Methods", value: "[ EftPos, Mobile Banking, Cheque]" },
      { label: "Allow Split Payments", value: "Allowed" },
      { label: "Allow Credit Sales", value: "Not Allowed" },
      { label: "Credit Payment Duration", value: "1 days after" },
      { label: "Minimum Payment Required", value: "20% of sales" },
      { label: "Auto Calculate Changes", value: "Allowed" },
    ],
  },
];

const offerStats: OfferStat[] = [
  { label: "Active Offers", value: 12 },
  { label: "Active Items", value: 12 },
  { label: "Last Offer Date", value: 12 },
];

/* ------------------------- Page components ----------------------- */

const Breadcrumb = ({
  current,
  parent,
}: {
  current: string;
  parent: string;
}) => (
  <div className="border-b border-gray-200 pb-1.5  text-blue-700 flex items-center gap-2">
    <ArrowRight className="w-3 h-3" /> <span>{current}</span> / {parent}
  </div>
);

const InfoRow = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <div className="flex justify-start gap-3">
    <span className="text-gray-500">{label} </span>
    {children}
  </div>
);

const StoreInfoCard = ({ onEdit }: { onEdit: () => void }) => (
  <section className="flex items-center gap-3">
    <div className="text-5xl leading-none mt-0">
      <Monitor className="font-extrabold" />
    </div>

    <div className="flex flex-1 flex-col gap-1">
      <div className="flex items-center justify-between">
        <div>
          <span className=" font-semibold">{store.code}</span>
        </div>
        <ReusableButton
          variant="outline"
          size="sm"
          icon={<Pencil size={14} />}
          onClick={onEdit}
        >
          Edit Organization Profile
        </ReusableButton>
      </div>

      <div className="grid grid-cols-[1.4fr_1fr_1fr] rounded-md bg-white px-4 py-2.5 text-[11px]">
        <div className="flex flex-col gap-1 pr-4">
          <div className="  text-sm text-blue-700">{store.name}</div>

          <div>{store.address}</div>

          <InfoRow label="Current Fiscal Year">
            <b>{store.fiscalYear}</b>
          </InfoRow>
        </div>

        <div className="flex flex-col gap-1 border-l border-gray-300 px-4">
          <InfoRow label="Current Fiscal Year">
            <b>{store.fiscalYear}</b>
          </InfoRow>

          <InfoRow label="Opening Time:">
            <span className=" text-blue-700">{store.openingTime}</span>
          </InfoRow>

          <InfoRow label="Today :">
            <span className="font-semibold text-blue-700">{store.today}</span>
          </InfoRow>
        </div>

        <div className="flex flex-col gap-1 border-l border-gray-300 px-4">
          <InfoRow label="Business ID">
            <b>{store.businessId}</b>
          </InfoRow>

          <InfoRow label="Subscriptions">
            <span className="font-semibold text-blue-700">
              {store.subscription}
            </span>
          </InfoRow>

          <InfoRow label="Pay-Period:">
            <span className="font-semibold text-blue-700">
              {store.payPeriod}
            </span>
          </InfoRow>
        </div>
      </div>
    </div>
  </section>
);

const KeyValueList = ({ items }: { items: KeyValue[] }) => (
  <dl className="m-0 flex flex-col gap-2">
    {items.map((item) => (
      <div key={item.label} className="flex justify-between ">
        <dt className="text-gray-500">{item.label}</dt>
        <dd className="m-0 text-right text-gray-800">{item.value}</dd>
      </div>
    ))}
  </dl>
);

const SettingsPanel = ({
  columns,
}: {
  columns: [SettingsColumn, SettingsColumn];
}) => (
  <div className="grid grid-cols-2 rounded-md border border-gray-200 bg-white p-3.5">
    {columns.map((col) => (
      <section
        key={col.title}
        className="px-3.5 first:pl-0 last:border-l last:border-gray-200 last:pr-0"
      >
        <h3 className="mb-1.5 text-sm">{col.title}</h3>

        <hr className="mb-2 border-gray-200" />

        <KeyValueList items={col.items} />
      </section>
    ))}
  </div>
);

const SectionHeader = ({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) => (
  <div className="flex items-center justify-between">
    <h2 className="font-bold">{title}</h2>
    {action}
  </div>
);

const StatCard = ({ label, value }: OfferStat) => (
  <button
    type="button"
    className="flex min-w-[100px] cursor-pointer flex-col items-center gap-2 rounded-md bg-indigo-100 px-5 py-3.5 text-[10px] shadow-md transition hover:shadow-lg"
  >
    <span>{label}</span>
    <span>{value}</span>
  </button>
);

const OffersSection = ({ stats }: { stats: OfferStat[] }) => (
  <section>
    <div className="mb-1.5 ">
      <b>Offers:</b> <span className="text-blue-600">(Manage Offers)</span>
    </div>

    <div className="flex gap-9 rounded-md bg-white px-24 py-4">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  </section>
);

//page

const ShellSettings = () => {
  const { openDrawer } = useDrawer();

  const handleEditOrganization = () => {
    openDrawer({
      title: "Edit Organization Profile",
      content: <div>Organization profile form goes here.</div>,
      width: "600px",
    });
  };

  const handleEditSettings = () => {
    openDrawer({
      title: "Edit Shell Settings",
      content: <div>Shell settings form goes here.</div>,
      width: "700px",
    });
  };

  return (
    <Container type="main" background="page">
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <Breadcrumb current="Shell Status" parent="Store Status" />

        <StoreInfoCard onEdit={handleEditOrganization} />

        <SectionHeader
          title="Sales Configuration and Overview:"
          action={
            <ReusableButton
              variant="outline"
              size="sm"
              icon={<Pencil size={14} />}
              onClick={handleEditSettings}
            >
              Edit Shell Settings
            </ReusableButton>
          }
        />

        <SettingsPanel columns={salesColumns} />

        <SettingsPanel columns={paymentColumns} />

        <OffersSection stats={offerStats} />
      </div>
    </Container>
  );
};

export default ShellSettings;
