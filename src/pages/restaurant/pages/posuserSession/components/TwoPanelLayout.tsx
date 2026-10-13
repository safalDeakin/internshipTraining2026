import type { ReactNode } from "react";

interface TwoPanelLayoutProps {
  children: ReactNode;
  panel: ReactNode;
  panelWidth?: string;
  gap?: string;
  className?: string;
}

const TwoPanelLayout = ({
  children,
  panel,
  panelWidth = "400px",
  gap = "20px",
  className = "",
}: TwoPanelLayoutProps) => {
  return (
    <div
      className={`flex w-full flex-col items-start lg:flex-row ${className}`}
      style={{ gap }}
    >
      <div className="min-w-0 w-full flex-1">{children} </div>

      {panel && (
        <div
          className="w-full shrink-0 self-start lg:sticky lg:top-4"
          style={{ maxWidth: panelWidth }}
        >
          {panel}
        </div>
      )}
    </div>
  );
};

export default TwoPanelLayout;
