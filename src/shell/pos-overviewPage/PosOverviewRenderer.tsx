import { useSearchParams } from "react-router-dom";
import PosOverviewPage from "./components/PosOverviewPage";
import { RepoPosOverviewProvider } from "./provider/pos-overviewProvider";

const PosOverviewRenderer = () => {
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session") || undefined;
  const selectedDate = searchParams.get("date") || undefined;

  return (
    <RepoPosOverviewProvider
      selectedDate={selectedDate}
      selectedSessionId={sessionId}
    >
      <PosOverviewPage />
    </RepoPosOverviewProvider>
  );
};

export default PosOverviewRenderer;
