import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API } from "../hooks/getEnv";
import { useContext, useState } from "react";
import { Context } from "../context/Context";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import { Modal } from "antd";

interface TokenType {
  id: string;
}
const Header = () => {
  const { token, setToken } = useContext(Context);
  let currentAdminId = null;
  const navigate = useNavigate();
  const [_, removeCookie] = useCookies(["token"]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (token) {
    const decoded = jwtDecode<TokenType>(token);
    currentAdminId = decoded.id;
  }

  const { data: adminList = [] } = useQuery({
    queryKey: ["admin"],
    queryFn: () =>
      axios
        .get(`${API}/api/admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
  });

  const currentAdmin = adminList.find(
    (admin: any) => admin.id === currentAdminId
  );

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    setToken(null);
    navigate("/login");
  };

  return (
    <div>
      <div className="flex items-end justify-end pr-[35px] gap-[10px] pt-[20px] h-full">
        <p className="text-[#A6A6A6]">Просмотр веб-сайта</p>
        <div className="text-[#A6A6A6]">|</div>
        <div
          className="text-[#A6A6A6] cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          {currentAdmin?.username || "Username"}
        </div>
      </div>
      <Modal
        title="Вы выходите из системы?"
        open={isModalOpen}
        onOk={() => {
          handleLogout();
          setIsModalOpen(false);
          navigate("/login");
        }}
        onCancel={() => setIsModalOpen(false)}
        okText="да"
        cancelText="нет"
      >
        <p>Вы уверены, что хотите выйти?</p>
      </Modal>
    </div>
  );
};

export default Header;
