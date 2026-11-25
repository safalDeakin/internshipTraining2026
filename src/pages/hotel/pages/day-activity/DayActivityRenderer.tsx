import { Dashboard } from "./components/Dashboard";
import DayActivityPage from "./components/DayActivityPage";
import { DayActivityProvider } from "./provider/DayActivityProvider";

const DayActivityRenderer = () => {
    return (
        <>
            <DayActivityProvider>
                {/* <Dashboard /> */}
                <DayActivityPage />
            </DayActivityProvider>
        </>
    );
}

export default DayActivityRenderer