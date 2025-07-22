import Header from "../modules/Header";
import Navbar from "../modules/Navbar";
import { DashboardRoute } from "../routes";

const Layout = () => {
  return (
    <div className="flex min-h-screen overflow-hidden bg-[#e0e0e0]">
      <Navbar />
      <div className="flex-1 flex flex-col overflow-auto">
        <Header />
        <DashboardRoute />
      </div>
    </div>
  );
};

export default Layout;
