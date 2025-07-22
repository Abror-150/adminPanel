import { NavLink } from "react-router-dom";
import { paths } from "../hooks/paths";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API } from "../hooks/getEnv";
import { useContext } from "react";
import { Context } from "../context/Context";
import { jwtDecode } from "jwt-decode";

interface TokenType {
  id: string;
}
const Header = () => {
  const { token } = useContext(Context);
  let currentAdminId = null;

  if (token) {
    const decoded = jwtDecode<TokenType>(token);
    currentAdminId = decoded.id;
  }

  const { data: adminList = [] } = useQuery({
    queryKey: ["admin"],
    queryFn: () => axios.get(`${API}/api/admin`).then((res) => res.data),
  });

  const currentAdmin = adminList.find(
    (admin: any) => admin.id === currentAdminId
  );

  return (
    <div>
      <div className="flex items-end justify-end pr-[35px] gap-[10px] pt-[20px] h-full">
        <NavLink to={paths.site} className="text-[#A6A6A6]">
          <p>Просмотр веб-сайта</p>
        </NavLink>
        <div className="text-[#A6A6A6]">|</div>
        <div className="text-[#A6A6A6]">
          
          {currentAdmin?.username || "Username topilmadi"}
        </div>
      </div>
    </div>
  );
};

export default Header;
