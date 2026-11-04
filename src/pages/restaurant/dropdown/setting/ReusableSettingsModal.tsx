import { ArrowLeft, X } from "lucide-react";
import React, { useState } from "react";

export interface SettingsNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SettingsLearnMore {
  label?: string;
  href: string;
}

export type SettingsNavVariant = "filled" | "outlined";

interface SettingsModalProps {
  title: string;
  navItems: SettingsNavItem[];
  activeId: string;
  onNavChange: (id: string) => void;
  onClose?: () => void;
  navVariant?: SettingsNavVariant;
  learnMore?: SettingsLearnMore;
  children: React.ReactNode;
}

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

interface SettingsFieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

const navContainer: Record<SettingsNavVariant, string> = {
  filled: "",
  outlined: "border border-gray-300 bg-white p-1",
};

const navItemBase = "flex w-full items-center gap-2 text-left cursor-pointer";

const navItemStyles: Record<
  SettingsNavVariant,
  { base: string; active: string }
> = {
  filled: {
    base: "px-3 py-2 mb-1.5 text-[15px] text-[#0b3550]",
    active: "bg-[#44688f] text-white",
  },
  outlined: {
    base: "px-2 py-1 mb-0.5 text-[15px] text-gray-700",
    active: "border-blue-500 bg-white",
  },
};

const SettingsModal: React.FC<SettingsModalProps> = ({
  title,
  navItems,
  activeId,
  onNavChange,
  onClose,
  navVariant = "filled",
  learnMore,
  children,
}) => {
  // const [isOpen, setIsOpen] = useState(true);
  const variantStyles = navItemStyles[navVariant];
  // const handleClose = () => {
  //   setIsOpen(false);
  //   onClose?.();
  // };

  // if (!isOpen) return null;
  return (
    <div className="min-h-screen w-full bg-white ">
      <div className="mx-auto flex min-h-[700px] w-full max-w-[1060px] flex-col rounded-xl bg-white px-4 pb-4 sm:px-6">
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between border-b border-gray-200 px-2 pb-4 pt-5">
          <div className="">
            <h2 className="m-0 ">{title}</h2>
          </div>

          <button
            type="button"
            // onClick={handleClose}
            aria-label="Go back"
            className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <X />
          </button>
        </header>

        {/* Body */}
        <div className="flex min-h-0 flex-1 flex-col gap-4 pt-4 md:flex-row">
          {/* Sidebar */}
          <aside
            className={`flex w-full shrink-0 flex-col justify-between md:w-[220px] ${navContainer[navVariant]}`}
          >
            <nav>
              <ul className="m-0 list-none p-0">
                {navItems.map((item) => {
                  const isActive = item.id === activeId;

                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => onNavChange(item.id)}
                        aria-current={isActive ? "page" : undefined}
                        className={`${navItemBase} ${variantStyles.base} ${
                          isActive ? variantStyles.active : ""
                        }`}
                      >
                        {item.icon && (
                          <span className="inline-flex w-5 shrink-0 justify-center">
                            {item.icon}
                          </span>
                        )}

                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {learnMore && (
              <a
                href={learnMore.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 ml-3 mt-4 text-sm text-blue-600 underline"
              >
                {learnMore.label ?? "Learn More"} ↗
              </a>
            )}
          </aside>

          {/* Content */}
          <main className="min-h-[400px] min-w-0 flex-1 overflow-y-auto rounded-md bg-white px-4 py-4 sm:px-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

//right main title
export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
}) => {
  return (
    <section className="mb-7">
      <h3 className="m-0 mb-4 border-b border-gray-200 pb-2 text-[17px] font-medium">
        {title}
      </h3>

      {children}
    </section>
  );
};

// content ,label, option hint
export const SettingsField: React.FC<SettingsFieldProps> = ({
  label,
  hint,
  children,
}) => {
  return (
    <div className="mb-[18px]">
      <label className="mb-2 block text-[15px] font-medium">{label}</label>

      <div className="rounded-lg p-2 border border-gray-200 w-auto ">
        {children}
      </div>

      {hint && <p className="mt-2 text-sm italic text-gray-400">{hint}</p>}
    </div>
  );
};
