import Header from "../modules/Header";
import Navbar from "../modules/Navbar";
import { DashboardRoute } from "../routes";

const Layout = () => {
  return (
    <div className="flex bg-[#e0e0e0] h-screen">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <DashboardRoute />
      </div>
    </div>
  );
};

export default Layout;
