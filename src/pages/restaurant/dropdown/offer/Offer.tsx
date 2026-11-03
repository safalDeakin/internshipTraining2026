// author: shrajja
import { Outlet } from "react-router-dom";
import ListHeroSection from "./ListHeroSection";
import ListHeader from "./ListHeader";

const Offer = () => {
  return (
    <div className="grid min-h-[calc(100vh-100px)] grid-cols-1 gap-4 md:grid-cols-[300px_minmax(0,1fr)]">
      {/* LEFT SIDE: OFFER LIST */}
      <aside className="min-w-0  bg-white rounded-xl pt-5 flex flex-col gap-5">
        <ListHeader />
        <ListHeroSection />
      </aside>

      {/* RIGHT SIDE: OFFER DETAILS */}
      <main className="min-w-0 rounded-lg border border-[#e1e7ed] bg-white p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Offer;
