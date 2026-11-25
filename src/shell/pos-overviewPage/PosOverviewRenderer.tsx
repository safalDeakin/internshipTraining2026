import { useSearchParams } from "react-router-dom";
import PosOverviewPage from "./components/PosOverviewPage";
import { RepoPosOverviewProvider } from "./provider/pos-overviewProvider";

const PosOverviewRenderer = () => {
  const [searchParam] = useSearchParams();
  const sessionId = searchParam.get('session');
  const selectedDate = searchParam.get('date');
  if (sessionId) {
    alert('Session : ' + sessionId)

  }
  if (selectedDate) {
    alert('Date : ' + selectedDate)
  }
  return (

    <>
      <RepoPosOverviewProvider selectedDate={selectedDate ? selectedDate : undefined} selectedSessionId={sessionId ? sessionId : undefined}>
        <PosOverviewPage />
      </RepoPosOverviewProvider>
    </>
  );
};

export default PosOverviewRenderer;
