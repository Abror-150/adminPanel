import { NavLink } from "react-router-dom";
import { DashboardNavList } from "../hooks/paths";
import Heading from "../components/Heading";

const Navbar = () => {
  return (
    <nav className="w-[262px] min-h-screen bg-white relative z-50">
      <div className="pt-[34px] pl-[50px]">
        <Heading classList="!text-[18px]" tag="h3">
          INTEX-MARKET.UZ
        </Heading>
      </div>

      <div className="w-full h-[1px] mt-[30px] mb-[30px] bg-[#EBEBFF]" />

      <div className="flex flex-col pl-[51px] gap-[20px]">
        {DashboardNavList.map((item) => (
          <NavLink
            key={item.key}
            to={item.path}
            className={({ isActive }) =>
              `text-lg font-medium transition-colors duration-200  ${
                isActive ? "text-[#009398]" : "text-[#B4B4B4] "
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
