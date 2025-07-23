import {
  DeleteOutlined,
  EditOutlined,
  EyeFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Input, Modal } from "antd";
import axios from "axios";
import { useContext, useState, type ChangeEvent } from "react";
import { API } from "../../hooks/getEnv";
import type { ZakasType } from "../../types/ZakasType";
import { toast, ToastContainer } from "react-toastify";
import type { ConsultionType } from "../../types/Consultion";
import { formatTime } from "../../hooks/formatTime";
import { Context } from "../../context/Context";
import useDebounce from "../../hooks/debounce";

const Zakas = () => {
  const queryClient = useQueryClient();
  const { token } = useContext(Context);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const searchQuery = useDebounce(search, 300);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectId, setSelectedId] = useState<string | null>("");
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const [selectedType, setSelectedType] = useState<"Заказы" | "Консультации">(
    "Заказы"
  );
  const { data: zakasLists = [] } = useQuery({
    queryKey: ["orders", searchQuery],
    queryFn: () =>
      axios
        .get(`${API}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            search: searchQuery,
          },
        })
        .then((res) => res.data?.data),
    enabled: selectedType === "Заказы",
  });
  

  const { mutate: deleteOrders, isLoading: isOrders } = useMutation({
    mutationFn: (id: string) =>
      axios.delete(`${API}/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Продукт удален");
      setIsModalOpen(false);
      setSelectedId(null);
    },
    onError: (error: any) => {
      console.error("O'chirish xatosi:", error.response?.data);
      toast.error(
        `Ошибка при удалении: ${
          error.response?.data?.message || "Noma'lum xato"
        }`
      );
      setIsModalOpen(false);
    },
  });
  const { mutate: deleteConsultation, isLoading: isConsul } = useMutation({
    mutationFn: (id: string) =>
      axios.delete(`${API}/api/consultatsiya/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultion"] });
      toast.success("консультация удален");
      setIsModalOpen(false);
      setSelectedId(null);
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

  const { data: consultationList = [] } = useQuery({
    queryKey: ["consultion", searchQuery],
    queryFn: () =>
      axios
        .get(`${API}/api/consultatsiya`, {
          params: {
            search: searchQuery,
          },
        })
        .then((res) => res.data?.data),
    enabled: selectedType == "Консультации",
  });
  
  const [check, setCheck] = useState(false);

  const handleClick = () => {
    setCheck((prev) => !prev);
  };
  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    setSearch(e.target.value);
  }
  const showDeleteModal = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };
  const handleCheckToggle = (id: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const dataToRender =
    selectedType === "Заказы" ? zakasLists : consultationList;

  return (
    <>
      <ToastContainer />

      <div className="p-[50px] h-[1000px]">
        <div className="flex justify-between items-center gap-4 mb-6">
          <Input
            style={{ height: "40px", borderRadius: "29px" }}
            onChange={handleSearch}
            value={search}
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
            <div className="pl-[20px]">Действия</div>
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
                <div>{formatTime(item.createdAt)}</div>

                <div className="flex space-x-3 justify-center mr-[50px] min-w-[100px]">
                  <button
                    onClick={() => handleCheckToggle(item.id)}
                    className="text-blue-500"
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-none flex items-center justify-center ${
                        checkedItems[item.id]
                          ? "bg-green-500 text-white"
                          : "bg-[#C6C6C6] text-black"
                      }`}
                    >
                      ✔️
                    </div>
                  </button>

                  <button
                    onClick={() => showDeleteModal(item.id)}
                    className="text-red-500"
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              </div>
            ))
          : consultationList.map((item: ConsultionType) => (
              <div
                key={item.id}
                className="grid grid-cols-4 items-center gap-2 mt-[20px] py-2 pl-[60px] bg-[#FFFFFF] rounded-[30px] h-[60px]"
              >
                <div>{item.name}</div>
                <div>{item.phone}</div>
                <div>{formatTime(item.createdAt)}</div>

                <div className="space-x-2 ">
                  <button
                    onClick={() => handleCheckToggle(item.id)}
                    className="text-blue-500"
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-none flex items-center justify-center ${
                        checkedItems[item.id]
                          ? "bg-green-500 text-white"
                          : "bg-[#C6C6C6] text-black"
                      }`}
                    >
                      ✔️
                    </div>
                  </button>

                  <button
                    onClick={() => showDeleteModal(item.id)}
                    className="text-red-500"
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              </div>
            ))}
        <Modal
          title="Вы уверены?"
          open={isModalOpen}
          onOk={() => {
            if (selectId) {
              selectedType === "Заказы"
                ? deleteOrders(selectId)
                : deleteConsultation(selectId);
            }
          }}
          onCancel={() => setIsModalOpen(false)}
          okText={
            (selectedType === "Заказы" && isOrders) ||
            (selectedType === "Консультации" && isConsul)
              ? "Удаляется..."
              : "Да"
          }
          cancelText="Нет"
          confirmLoading={selectedType === "Заказы" ? isOrders : isConsul}
        />
      </div>
    </>
  );
};

export default Zakas;
