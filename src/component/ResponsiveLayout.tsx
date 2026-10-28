import React, { useState } from "react";
import { Outlet } from "react-router-dom";

interface ResponsiveLayoutProps {
  sidebar: (closeBar: () => void) => React.ReactNode;
  children?: React.ReactNode;
}
const ResponsiveLayout = ({ sidebar, children }: ResponsiveLayoutProps) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const startX = e.touches[0].clientX;
    //it detectswipe form left edge
    // if (startX < 100) {
    setTouchStartX(startX);
    // }
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const endX = e.changedTouches[0].clientX;
    const swipeDistance = endX - touchStartX;
    //swipe l to r open side bar
    if (swipeDistance > 100) {
      setIsSideBarOpen(true);
    }
    //swipe r to l hide it
    if (swipeDistance < -100) {
      setIsSideBarOpen(false);
    }
    setTouchStartX(null);
  };
  const closeBar = () => {
    setIsSideBarOpen(false);
  };
  return (
    <div
      className="md:grid md:grid-cols-[1fr_4fr]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <aside
        className={`fixed left-0 top-13 z-50 h-[calc(100vh-3rem)] w-[85vw] max-w-[280px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} md:static md:h-screen md:w-[280px] md:translate-x-0 md:shadow-none`}
      >
        {sidebar(closeBar)}
      </aside>

      <main className="pl-5 md:min-h-0">{children ?? <Outlet />}</main>
    </div>
  );
};

export default ResponsiveLayout;
