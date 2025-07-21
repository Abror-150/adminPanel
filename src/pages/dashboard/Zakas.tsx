import {
  DeleteOutlined,
  EditOutlined,
  EyeFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import { useState } from "react";

const Zakas = () => {
  const [name, setName] = useState<string>("");
  const [selectedType, setSelectedType] = useState<"Заказы" | "Консультации">(
    "Заказы"
  );

  const zakasData = [
    {
      id: 1,
      clientName: "Ибрагимов Умид",
      phone: " 90 123 45 67",
      image: "/images/basseyn1.jpg",
      size: "3x2",
      depth: 100,
      price: "1 200 000 сум",
      address: "Ташкент, Чиланзар",
      time: "2025-07-18 15:30",
    },
    {
      id: 2,
      clientName: "Норматов Жамшид",
      phone: " 93 765 43 21",
      image: "/images/basseyn2.jpg",
      size: "4x2",
      depth: 120,
      price: "1 500 000 сум",
      address: "Самарканд, Регистан",
      time: "2025-07-18 12:00",
    },
    {
      id: 3,
      clientName: "Каримова Азиза",
      phone: " 99 876 54 32",
      image: "/images/basseyn3.jpg",
      size: "2.5x1.5",
      depth: 90,
      price: "950 000 сум",
      address: "Фергана, Кува",
      time: "2025-07-17 17:45",
    },
    {
      id: 4,
      clientName: "Тошпулатов Маъруф",
      phone: " 91 345 67 89",
      image: "/images/basseyn4.jpg",
      size: "5x3",
      depth: 140,
      price: "2 100 000 сум",
      address: "Бухара, Центр",
      time: "2025-07-18 10:00",
    },
  ];

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

  const dataToRender = selectedType === "Заказы" ? zakasData : consultationData;

  return (
    <div className="p-[50px]">
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
          <div>Изображение</div>
          <div>Телефон</div>
          <div className="pb-[100px]">Размер(м)/Глубина(см)</div>
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
        ? zakasData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-8 items-center pb-[10px] gap-2 mt-[20px] py-2 pl-[60px] bg-[#FFFFFF] rounded-[30px] h-[60px]"
            >
              <div>{item.clientName}</div>
              <div>{item.phone}</div>
              <div>
                <img
                  src={item.image}
                  alt="basseyn"
                  className="w-[70px] h-[60px] object-cover rounded-md"
                />
              </div>
              <div>
                {item.size} / {item.depth} см
              </div>
              <div>{item.price}</div>
              <div>{item.address}</div>
              <div>{item.time}</div>
              <div className="space-x-3">
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
  );
};

export default Zakas;
