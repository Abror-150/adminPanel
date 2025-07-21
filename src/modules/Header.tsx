import { NavLink } from "react-router-dom";
import { paths } from "../hooks/paths";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API } from "../hooks/getEnv";

const Header = () => {
  const { data: adminList } = useQuery({
    queryKey: ["admin"],
    queryFn: () => axios.get(`${API}/admin`).then((res) => res.data),
  });
  console.log(adminList, "sa");

  return (
    <div>
      <div className="flex items-end justify-end pr-[35px] gap-[10px] pt-[20px] h-full">
        <NavLink to={paths.site} className="text-[#A6A6A6]">
          <p>Просмотр веб-сайта</p>
        </NavLink>
        <div className="text-[#A6A6A6]">|</div>
        {adminList?.map((admin:any) => (
          <div key={admin.id} className="text-[#A6A6A6]">
            {admin.username}
          </div>
        ))}{" "}
      </div>
    </div>
  );
};

export default Header;
