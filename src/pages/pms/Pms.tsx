import ResponsiveLayout from "../../component/ResponsiveLayout";
import PmsList from "./PmsList";

const Pms = () => {
  return <ResponsiveLayout sidebar={(closeBar) => <PmsList closeBar={closeBar}/>} />;
};

export default Pms;
//grid grid-cols-[1fr_3fr]
