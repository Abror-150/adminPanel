import { Route, Routes } from "react-router-dom";
import { DashboardList } from "../hooks/paths";
import type { DashboarRouteType } from "../types/DashboardType";

const DashboardRoute = () => {
  return (
    <Routes>
      {DashboardList.map((item: DashboarRouteType) => (
        <Route key={item.id} path={item.path} element={item.element} />
      ))}
    </Routes>
  );
};

export default DashboardRoute;
