import ListHeader from "./ListHeader";
import ListHeroSection from "./ListHeroSection";

const Offers = () => {
  console.log("OFFERS COMPONENT RENDERED");

  return (
    <>
      <div className="py-4">
        <div className="w-75 min-h-screen bg-[#ffffff] pt-5 px-3.75 pb-3.75 ">
          <ListHeader />
          <div className="h-6" />
          <ListHeroSection />
        </div>
      </div>
    </>
  );
};

export default Offers;
