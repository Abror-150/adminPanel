import { Button, Input, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API } from "../../hooks/getEnv";
import type { CreateProductType, ProductType } from "../../types/ProductType";
import { toast } from "react-toastify";
import ProductModal from "../../components/ProductModal";
import { EditIcon } from "../../assets/icons";

const Product = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedType, setSelectedType] = useState<"karkas" | "naduvniy">(
    "karkas"
  );

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get(`${API}/products`).then((res) => res.data.data),
  });

  const { mutate: deleteProduct } = useMutation({
    mutationFn: (id: number) => axios.delete(`${API}/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Продукт удален");
    },
    onError: () => {
      toast.error("Ошибка при удалении");
    },
  });

  return (
    <div className="p-[50px]">
      <div className="flex justify-between items-center gap-4 mb-6">
        <Input
          style={{ height: "40px", borderRadius: "29px" }}
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[250px]"
          placeholder="Найти"
          size="middle"
          suffix={<SearchOutlined />}
        />
        <Button
          type="primary"
          style={{
            height: "50px",
            borderRadius: "29px",
            background: "#00b894",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <span className="text-white">+ Добавить продукт</span>
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setSelectedType("karkas")}
          className={`relative px-6 py-2 text-[35px] transition-none ${
            selectedType === "karkas"
              ? "text-[#009398] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#009398]"
              : "text-gray-500"
          }`}
        >
          Каркасные
        </button>
        <button
          onClick={() => setSelectedType("naduvniy")}
          className={`relative px-6 py-2 text-[35px] transition-none ${
            selectedType === "naduvniy"
              ? "text-[#009398] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#009398]"
              : "text-gray-500"
          }`}
        >
          Надувные
        </button>
      </div>

      <div className="grid grid-cols-7 pl-[60px] mt-[60px] pt-[15px] rounded-[30px] text-[#000000] pb-2 mb-2 bg-[#FFFFFF] h-[55px] font-semibold text-center">
        <div>Изображение</div>
        <div>Цена (сум)</div>
        <div>Количество</div>
        <div>Рамка</div>
        <div>Размер (м)</div>
        <div>Глубина (см)</div>
        <div>Действия</div>
      </div>

      {products.map((item: ProductType) => (
        <div
          key={item.id}
          className="grid grid-cols-7 items-center pl-[40px] text-center gap-4 mt-4 bg-white rounded-[30px] h-[70px] shadow-sm "
        >
          <div className="flex justify-center">
            <img
              src={`${API}/file/${item.image}`}
              alt="product"
              className="w-[60px] h-[60px] object-cover rounded-md"
            />
          </div>
          <div className="text-base font-medium">{item.price}</div>
          <div className="text-base font-medium">{item.quantity}</div>
          <div className="text-base font-medium">{item.frame_ru}</div>
          <div className="text-base font-medium">{item.size}</div>
          <div className="text-base font-medium">{item.depth} см</div>
          <div className="flex justify-center gap-2">
            <Button
              type="default"
              icon={<EditIcon />}
              size="middle"
              onClick={() => {
                setIsModalOpen(true);
              }}
            />
            <Popconfirm
              title="Вы уверены, что хотите удалить?"
              onConfirm={() => deleteProduct(item.id)}
              okText="Да"
              cancelText="Нет"
            >
              <Button
                type="default"
                danger
                icon={<DeleteOutlined />}
                size="middle"
              />
            </Popconfirm>
          </div>
        </div>
      ))}

      <ProductModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Product;
