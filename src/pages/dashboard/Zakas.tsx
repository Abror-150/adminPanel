import {
  DeleteOutlined,
  EditOutlined,
  EyeFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { API } from "../../hooks/getEnv";
import type { ZakasType } from "../../types/ZakasType";
import { toast, ToastContainer } from "react-toastify";

const Zakas = () => {
  const [name, setName] = useState<string>("");
  const queryClient = useQueryClient();

  const [selectedType, setSelectedType] = useState<"Заказы" | "Консультации">(
    "Заказы"
  );
  const { data: zakasLists = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: () => axios.get(`${API}/api/orders`).then((res) => res.data?.data),
  });

  const { mutate: deleteOrders } = useMutation({
    mutationFn: (id: number) => axios.delete(`${API}/api/orders/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.refetchQueries({ queryKey: ["products"] });
      toast.success("Продукт удален");
    },
    onError: (error: any) => {
      console.log("O'chirish xatosi:", error.response?.data);
      toast.error(
        `Ошибка при удалении: ${
          error.response?.data?.message || "Noma'lum xato"
        }`
      );
    },
  });

  const consultationData = [
    {
      id: 1,
      clientName: "Аброр Уразалиев",
      phone: " 95 892 08 10",
      time: "2025-07-18 14:30",
    },
    {
      id: 2,
      clientName: "Саида Абдуллаева",
      phone: " 90 123 45 67",
      time: "2025-07-18 15:00",
    },
    {
      id: 3,
      clientName: "Бобур Исломов",
      phone: " 93 765 43 21",
      time: "2025-07-18 16:45",
    },
  ];

  const dataToRender =
    selectedType === "Заказы" ? zakasLists : consultationData;

  return (
    <>
      <ToastContainer />

      <div className="p-[50px] h-[1000px]">
        <div className="flex justify-between items-center gap-4 mb-6">
          <Input
            style={{ height: "40px", borderRadius: "29px" }}
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="h-[40px] rounded-[20px] w-full max-w-[250px]"
            placeholder="Найти"
            size="middle"
            suffix={<SearchOutlined />}
          />
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setSelectedType("Заказы")}
            className={`relative px-6 py-2 bg-transparent text-[35px] transition-none ${
              selectedType === "Заказы"
                ? "text-[#009398] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#009398]"
                : "text-gray-500"
            }`}
          >
            Заказы
          </button>
          <button
            onClick={() => setSelectedType("Консультации")}
            className={`relative px-6 py-2 bg-transparent text-[35px] transition-none ${
              selectedType === "Консультации"
                ? "text-[#009398] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#009398]"
                : "text-gray-500"
            }`}
          >
            Консультации
          </button>
        </div>

        {selectedType === "Заказы" ? (
          <div className="grid grid-cols-8 mt-[60px] pt-[10px]  pl-[60px] text-[#000000] py-2 mb-2 bg-[#FFFFFF] rounded-[30px] h-[55px] font-semibold">
            <div>Имя клиента</div>
            <div>Телефон</div>
            <div>Изображение</div>
            <div>Размер(м)/Глубина(см)</div>
            <div>Цена(сум)</div>
            <div>Адрес</div>
            <div>Время</div>
            <div>Действия</div>
          </div>
        ) : (
          <div className="grid grid-cols-4 mt-[60px] pl-[60px] text-[#000000] py-2 mb-2 bg-[#FFFFFF] rounded-[30px] h-[55px] font-semibold">
            <div>Имя клиента</div>
            <div>Телефон клиента</div>
            <div>Время</div>
            <div>Действия</div>
          </div>
        )}

        {selectedType === "Заказы"
          ? zakasLists.map((item: ZakasType) => (
              <div
                key={item.id}
                className="grid grid-cols-8 items-center gap-2 mt-[20px] py-3 pl-[60px] bg-[#FFFFFF] rounded-[30px] min-h-[60px] overflow-hidden"
              >
                <div className="truncate max-w-[140px]">{item.name}</div>
                <div className="truncate max-w-[140px]">{item.phone}</div>
                <div className="flex justify-center">
                  <img
                    src={`http://server.rtudarsjadvali.uz/uploads/${item.Products.image}`}
                    alt="product"
                    className="w-[100px] h-[40px] object-cover rounded-[30px]"
                  />
                </div>
                <div className="truncate max-w-[140px]">
                  {item.Products.size} / {item.Products.depth} см
                </div>
                <div className="truncate max-w-[120px]">
                  {item.Products.price}
                </div>
                <div className="truncate max-w-[180px]">{item.adress}</div>
                <div className="truncate max-w-[180px]">{item.createdAt}</div>
                <div className="flex space-x-3 justify-center min-w-[100px]">
                  <button className="text-yellow-500">
                    <EditOutlined />
                  </button>
                  <button className="text-red-500">
                    <DeleteOutlined />
                  </button>
                </div>
              </div>
            ))
          : consultationData.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-4 items-center gap-2 mt-[20px] py-2 pl-[60px] bg-[#FFFFFF] rounded-[30px] h-[60px]"
              >
                <div>{item.clientName}</div>
                <div>{item.phone}</div>
                <div>{item.time}</div>
                <div className="space-x-2">
                  <button className="text-blue-500">
                    <EyeFilled />
                  </button>
                  <button className="text-red-500">
                    <DeleteOutlined />
                  </button>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default Zakas;
