import React, { useState } from "react";

import SettingsModal, {
  SettingsField,
  SettingsSection,
  type SettingsNavItem,
} from "./ReusableSettingsModal";
import {
  BadgeDollarSign,
  BatteryCharging,
  CalendarRange,
  HandCoins,
  HardDrive,
  Pen,
  Percent,
  Smartphone,
  Trash,
  Undo,
} from "lucide-react";

interface BillingSettingsProps {
  onClose: () => void;
}

interface BillingForm {
  pricelist: string;
  mode: "inclusive" | "exclusive";
  tax: string;
  rounding: "up" | "down" | "nearest";
}

const NAV: SettingsNavItem[] = [
  { id: "billing", label: "Billing and Charges", icon: <BatteryCharging /> },
  { id: "discounts", label: "Discounts", icon: <BadgeDollarSign /> },
  { id: "returns", label: "Returns and Refund", icon: <Undo /> },
  { id: "payments", label: "Payments and Credits", icon: <HandCoins /> },
  { id: "devices", label: "Devices", icon: <HardDrive /> },
  { id: "taxes", label: "Taxes", icon: <Percent /> },
];
const devices = [
  { id: 1, name: "Kitchen" },
  { id: 2, name: "Bar" },
];

interface ChargeItem {
  id: number;
  chargeName: string;
  chargeCode: string;
  rate: string;
  chargeType: "Auto" | "Manual";
  status: boolean;
}
const registeredDevices = [
  {
    id: 1,
    name: "Google pixel 7",
    user: "Sailesh Google",
    info: "13:23:1 00T",
    active: true,
  },
  {
    id: 2,
    name: "Google pixel 7",
    user: "Sailesh Google",
    info: "Chardobato, Banepa 10",
    active: false,
  },
];
const initialCharges: ChargeItem[] = [
  {
    id: 1,
    chargeName: "Service Charge",
    chargeCode: "SC001",
    rate: "10%",
    chargeType: "Auto",
    status: true,
  },
  {
    id: 2,
    chargeName: "Extra Charge",
    chargeCode: "EC001",
    rate: "500",
    chargeType: "Manual",
    status: false,
  },
];
const ShellSetting: React.FC<BillingSettingsProps> = ({ onClose }) => {
  const [active, setActive] = useState<string>("billing");
  const [charges, setCharges] = useState<ChargeItem[]>(initialCharges);
  const [selectedDevices, setSelectedDevices] = useState({
    Kitchen: "bros",
    Bar: "bros",
  });
  const [form, setForm] = useState<BillingForm>({
    pricelist: "march-2024-123",
    mode: "inclusive",
    tax: "vat13",
    rounding: "up",
  });

  const handleChange =
    (key: keyof BillingForm) =>
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setForm((prev) => ({
        ...prev,
        [key]: event.target.value,
      }));
    };
  const handleChargeStatus = (id: number) => {
    setCharges((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item,
      ),
    );
  };
  return (
    <SettingsModal
      title="Shell-Settings"
      navItems={NAV}
      activeId={active}
      onNavChange={setActive}
      onClose={onClose}
      navVariant="filled"
      learnMore={{
        href: "",
      }}
    >
      {active === "billing" && (
        <>
          <SettingsSection title="Pricing">
            <SettingsField
              label="Active Pricelist:"
              hint="Billing Service will reference the above mentioned price-lists to generate invoices."
            >
              <select
                className="flex justify-between"
                value={form.pricelist}
                onChange={handleChange("pricelist")}
              >
                <option value="march-2024-123">March 2024 - #123</option>
              </select>
            </SettingsField>

            <SettingsField
              label="Pricing Mode:"
              hint="Default taxes are applied to local sales transactions."
            >
              <select
                className=""
                value={form.mode}
                onChange={handleChange("mode")}
              >
                <option value="inclusive">Tax Inclusive</option>
                <option value="exclusive">Tax Exclusive</option>
              </select>
            </SettingsField>

            <SettingsField
              label="Default Tax:"
              hint="Default taxes are applied to local sales transactions."
            >
              <select
                className="w-full"
                value={form.tax}
                onChange={handleChange("tax")}
              >
                <option value="vat13">VAT 13%</option>
              </select>
            </SettingsField>

            <SettingsField
              label="Tax Rounding Method:"
              hint="How tax is calculated and rounded in invoices."
            >
              <select
                className="w-full"
                value={form.rounding}
                onChange={handleChange("rounding")}
              >
                <option value="up">Round Up</option>
                <option value="down">Round Down</option>
                <option value="nearest">Round Nearest</option>
              </select>
            </SettingsField>
            <SettingsField
              label="Additional Charges:"
              hint="Register additional charges below in the master table."
            >
              <table className="w-full min-w-[600px] text-sm text-left overflow-x-auto">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Charge Name</th>
                    <th className="px-4 py-3 font-semibold">Charge Code</th>
                    <th className="px-4 py-3 font-semibold">Rate</th>
                    <th className="px-4 py-3 font-semibold">Charge Type</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {charges.map((charge) => (
                    <tr key={charge.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{charge.chargeName}</td>

                      <td className="px-4 py-3 text-gray-600">
                        {charge.chargeCode}
                      </td>

                      <td className="px-4 py-3">{charge.rate}</td>

                      <td className="px-4 py-3">
                        <span className="px-4 py-3 text-gray-600">
                          Percentage
                        </span>
                      </td>

                      <td className="px-4 py-3 flex gap-1">
                        <input
                          type="checkbox"
                          checked={charge.status}
                          onChange={() => handleChargeStatus(charge.id)}
                          className="h-4 w-4 cursor-pointer accent-blue-600"
                        />
                        <span>{charge.chargeType}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SettingsField>
            <SettingsField
              label="Split Billing:"
              hint="Allow dividing a single transaction among multiple customers"
            >
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer accent-blue-600"
                />
                <span>Allow Split Billing</span>
              </div>
            </SettingsField>
          </SettingsSection>
        </>
      )}

      {active === "discounts" && (
        <SettingsSection title="Discount Settings">
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer accent-blue-600"
                />
                <span>Allow Manual Discounts Override</span>
              </div>{" "}
              <p className="mt-2 text-sm italic text-gray-400">
                Requires High Level Access to Apply
              </p>
            </div>
            <div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer accent-blue-600"
                />
                <span>Auto Apply Cart Level Discounts</span>
              </div>
              <p className="mt-2 text-sm italic text-gray-400">
                Enable cart level discounts to allow applying discounts to
                single transaction
              </p>
            </div>
          </div>
        </SettingsSection>
      )}

      {active === "returns" && (
        <>
          <SettingsSection title="Returns and Refund">
            <SettingsField
              label="Return Time Limit:"
              hint="Set number of days to allow returns from invoice date"
            >
              <select
                className="flex justify-between"
                value={form.pricelist}
                onChange={handleChange("pricelist")}
              >
                <option value="march-2024-123">1 Days</option>
              </select>
            </SettingsField>
            <SettingsField label="Partial Refund Support:">
              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer accent-blue-600"
                    />
                    <span>Allow Partial Amount</span>
                  </div>{" "}
                  <p className="mt-2 text-sm italic text-gray-400">
                    Select to allow refund partial amount of invoice date.
                  </p>
                </div>
                <div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer accent-blue-600"
                    />
                    <span>Allow Partial Items </span>
                  </div>
                  <p className="mt-2 text-sm italic text-gray-400">
                    Select to return item for partial items.
                  </p>
                </div>
              </div>
            </SettingsField>
            <SettingsField
              label="Cash Refund Limits:"
              hint="Refund for Amount more than mentioned above will need managers access"
            >
              <select
                className="flex justify-between"
                value={form.pricelist}
                onChange={handleChange("pricelist")}
              >
                <option value="march-2024-123">Allowed</option>
              </select>
            </SettingsField>
          </SettingsSection>
        </>
      )}

      {active === "payments" && (
        <SettingsSection title="Payments and Credits">
          <SettingsField label="">
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer accent-blue-600"
                  />
                  <span>EFTPOS</span>
                </div>{" "}
                <p className="mt-2 text-sm italic text-gray-400">
                  Automatically apply Service Charges when generating invoices
                </p>
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer accent-blue-600"
                  />
                  <span>Mobile Banking </span>
                </div>
                <p className="mt-2 text-sm italic text-gray-400">
                  Automatically apply Service Charges when generating invoices
                </p>
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer accent-blue-600"
                  />
                  <span>Cheque </span>
                </div>
                <p className="mt-2 text-sm italic text-gray-400">
                  Automatically apply Service Charges when generating invoices
                </p>
              </div>
            </div>
          </SettingsField>
          <SettingsField label="Payment Options:">
            <div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer accent-blue-600"
                />
                <span>Allow Split Payments </span>
              </div>
              <p className="mt-2 text-sm italic text-gray-400">
                Allow dividing a single transcatio into multiple customers
              </p>
            </div>
          </SettingsField>
          <SettingsField label="Credits:">
            <div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer accent-blue-600"
                />
                <span>Allow Credits Sales </span>
              </div>
              <p className="mt-2 text-sm italic text-gray-400">
                Allow dividing a single transcatio into multiple customers
              </p>
            </div>

            <SettingsField label="Payment Due Duration:">
              <select
                className="flex justify-between"
                value={form.pricelist}
                onChange={handleChange("pricelist")}
              >
                <option value="march-2024-123">1 Days</option>
              </select>
            </SettingsField>
            <SettingsField label="Minimun Payment Required:">
              <select
                className="flex justify-between"
                value={form.pricelist}
                onChange={handleChange("pricelist")}
              >
                <option value="march-2024-123">25%</option>
              </select>
            </SettingsField>
          </SettingsField>
          <SettingsField label="Cash and Chnages ">
            <div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer accent-blue-600"
                />
                <span>Auto Calculate Changes and Record Cash -in </span>
              </div>
              <p className="mt-2 text-sm italic text-gray-400">
                Allow dividing a single transcatio into multiple customers
              </p>
            </div>
          </SettingsField>
        </SettingsSection>
      )}

      {active === "devices" && (
        <SettingsSection title="Devices">
          <SettingsField label="KOT/BOT Printer">
            <div className="w-full ">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <span className="">{device.name}</span>

                  <select
                    value={
                      selectedDevices[
                        device.name as keyof typeof selectedDevices
                      ]
                    }
                    onChange={(e) =>
                      setSelectedDevices((prev) => ({
                        ...prev,
                        [device.name]: e.target.value,
                      }))
                    }
                    className="w-60 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="bros">Bros Thermal: 1234.56.1</option>
                    <option value="default">Default Printer</option>
                  </select>
                </div>
              ))}
            </div>
          </SettingsField>
          <SettingsField label="Invoice Printer">
            <div className="w-full ">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <span className="">{device.name}</span>

                  <select
                    value={
                      selectedDevices[
                        device.name as keyof typeof selectedDevices
                      ]
                    }
                    onChange={(e) =>
                      setSelectedDevices((prev) => ({
                        ...prev,
                        [device.name]: e.target.value,
                      }))
                    }
                    className="w-60 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="bros">Bros Thermal: 1234.56.1</option>
                    <option value="default">Default Printer</option>
                  </select>
                </div>
              ))}
            </div>
          </SettingsField>
          <SettingsField label="Scanners ">
            <div className="w-full ">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <span className="">{device.name}</span>

                  <select
                    value={
                      selectedDevices[
                        device.name as keyof typeof selectedDevices
                      ]
                    }
                    onChange={(e) =>
                      setSelectedDevices((prev) => ({
                        ...prev,
                        [device.name]: e.target.value,
                      }))
                    }
                    className="w-60 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="bros">Bros Thermal: 1234.56.1</option>
                    <option value="default">Default Printer</option>
                  </select>
                </div>
              ))}
            </div>
          </SettingsField>
          <SettingsField label="Registered Mobile Device">
            <div className="w-full">
              {/* Device List */}
              <div className="w-full divide-y divide-gray-100 border-y border-gray-100">
                {registeredDevices.map((device) => (
                  <div
                    key={device.id}
                    className="grid grid-cols-1 sm:grid-cols-[1.2fr_1fr_1fr_auto] items-center gap-3 px-2 py-3 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Smartphone
                        size={16}
                        className="text-gray-500 shrink-0"
                      />

                      <span className="text-sm text-gray-700">
                        {device.name}
                      </span>

                      {device.active && (
                        <span className="flex items-center gap-1 text-xs text-green-600 shrink-0">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          Active
                        </span>
                      )}
                    </div>

                    <span className="text-sm text-gray-500 truncate">
                      {device.user}
                    </span>

                    <span className="text-sm text-gray-500 truncate">
                      {device.info}
                    </span>

                    <button
                      type="button"
                      className="text-gray-400 hover:text-red-500 transition"
                      title="Remove device"
                    >
                      <Trash size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </SettingsField>
        </SettingsSection>
      )}

      {active === "taxes" && (
        <>
          <SettingsSection title="Tax  Master">
            <table className="w-full min-w-[600px] text-sm text-left overflow-x-auto">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Tax Name</th>
                  <th className="px-4 py-3 font-semibold">Tax Code</th>
                  <th className="px-4 py-3 font-semibold">Tax Rate</th>
                  <th className="px-4 py-3 font-semibold">Tax Type</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {charges.map((charge) => (
                  <tr key={charge.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{charge.chargeName}</td>

                    <td className="px-4 py-3 text-gray-600">
                      {charge.chargeCode}
                    </td>

                    <td className="px-4 py-3">{charge.rate}</td>

                    <td className="px-4 py-3">
                      <span className="px-4 py-3 text-gray-600">
                        Percentage
                      </span>
                    </td>

                    <td className="px-4 py-3 flex gap-1">
                      <input
                        type="checkbox"
                        checked={charge.status}
                        onChange={() => handleChargeStatus(charge.id)}
                        className="h-4 w-4 cursor-pointer accent-blue-600"
                      />
                      <span>{charge.chargeType}</span>
                    </td>
                    <td>
                      <Trash />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SettingsSection>
          <SettingsSection title="Sales Tax">
            <SettingsField
              label="Default Tax:"
              hint=" Default tax are applied to local sales transactions"
            >
              <select
                className="flex justify-between"
                value={form.pricelist}
                onChange={handleChange("pricelist")}
              >
                <option value="march-2024-123">VAt 13</option>
              </select>
            </SettingsField>
            <SettingsField
              label="Tax Rounding Method:"
              hint="How tax is calculated and rounded invoice"
            >
              <select
                className="flex justify-between"
                value={form.pricelist}
                onChange={handleChange("pricelist")}
              >
                <option value="march-2024-123">Round Up</option>
              </select>
            </SettingsField>
            <SettingsField label="">
              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer accent-blue-600"
                    />
                    <span>Allow Manual Tax Ovveride</span>
                  </div>{" "}
                  <p className="mt-2 text-sm italic text-gray-400">
                    Allow Manual Tax Ovveride for taxes.
                  </p>
                </div>
                <div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer accent-blue-600"
                    />
                    <span>Display full Tax Breakdown </span>
                  </div>
                  <p className="mt-2 text-sm italic text-gray-400">
                    Display tax for each line items in receipt.
                  </p>
                </div>
              </div>
            </SettingsField>
          </SettingsSection>
        </>
      )}
    </SettingsModal>
  );
};

export default ShellSetting;
