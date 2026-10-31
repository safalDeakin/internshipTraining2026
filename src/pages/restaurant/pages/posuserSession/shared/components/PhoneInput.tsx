import { ChevronDown } from "lucide-react";
import { AU, GB, IN, NP, US } from "country-flag-icons/react/1x1";

interface PhoneInputProps {
  phone: string;
  onPhoneChange: (value: string) => void;
  selectedCode: string;
  onCodeChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

const countries = [
  { code: "NP", dialCode: "+977", Flag: NP },
  { code: "IN", dialCode: "+91", Flag: IN },
  { code: "US", dialCode: "+1", Flag: US },
  { code: "GB", dialCode: "+44", Flag: GB },
  { code: "AU", dialCode: "+61", Flag: AU },
];

const PhoneInput = ({
  phone,
  onPhoneChange,
  selectedCode,
  onCodeChange,
  label = "Mobile Number",
  placeholder = "9800000000",
}: PhoneInputProps) => {
  const selectedCountry =
    countries.find((country) => country.dialCode === selectedCode) ??
    countries[0];

  return (
    <div className="flex min-w-0 flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>

      <div className="flex h-9 items-center rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30">
        {/* Country code selector */}
        <div className="relative flex h-full shrink-0 items-center border-r border-gray-300">
          <selectedCountry.Flag className="pointer-events-none absolute left-2.5 h-4 w-4 rounded-full object-cover" />

          <select
            value={selectedCode}
            onChange={(event) => onCodeChange(event.target.value)}
            className="h-full appearance-none rounded-l-lg bg-transparent pl-9 pr-7 text-sm outline-none"
            aria-label="Country code"
          >
            {countries.map(({ code, dialCode }) => (
              <option key={code} value={dialCode}>
                {dialCode}
              </option>
            ))}
          </select>

          <ChevronDown className="pointer-events-none absolute right-2 h-4 w-4 text-gray-400" />
        </div>

        {/* Phone number */}
        <input
          type="tel"
          value={phone}
          onChange={(event) => onPhoneChange(event.target.value)}
          placeholder={placeholder}
          className="h-full min-w-0 flex-1 bg-transparent px-2 text-sm outline-none"
        />
      </div>
    </div>
  );
};

export default PhoneInput;
