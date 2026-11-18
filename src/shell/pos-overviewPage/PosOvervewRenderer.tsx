import PosOverviewPage from "./components/PosOverviewPage";
import { RepoPosOverviewProvider } from "./provider/pos-overviewProvider";

const PosOvervewRenderer = () => {
  return (
    <>
      <RepoPosOverviewProvider>
        <PosOverviewPage />
      </RepoPosOverviewProvider>
    </>
  );
};

export default PosOvervewRenderer;
