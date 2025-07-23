import { Route, Routes } from "react-router-dom";
import { paths } from "../hooks/paths";
import { Home, Login } from "../pages/auth";

const AuthRoute = () => {
  return (
    <Routes>
      <Route path={paths.home} element={<Home />} />
      <Route path={paths.login} element={<Login />} />
    </Routes>
  );
};
1;
export default AuthRoute;
