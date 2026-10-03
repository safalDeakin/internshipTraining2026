import { Outlet } from "react-router-dom";
import Navbar from "../../component/Navbar";

const AppLayout = () => {
  console.log("AppLayout rendered");
  console.log("Navbar should render now");
  return (
    <div>
      <Navbar />
      <div>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
