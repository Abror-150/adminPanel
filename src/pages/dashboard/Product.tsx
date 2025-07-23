import { Button, Input, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useContext, useState, useEffect, type ChangeEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Context } from "../../context/Context";
import { API } from "../../hooks/getEnv";
import type { ProductType } from "../../types/ProductType";
import ProductModal from "../../components/ProductModal";
import useDebounce from "../../hooks/debounce";
import { toast, ToastContainer } from "react-toastify";

const Product = () => {
  const queryClient = useQueryClient();
  const { token } = useContext(Context);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const CATEGORY_IDS = {
    Каркасные: "6796f2c5-f2c7-411d-86de-b12e47269a15",
    Надувные: "3eb8ebee-9ad9-4db7-8f92-bf84eca40dd4",
  };

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    setSearch(e.target.value);
  }
  const searchQuery = useDebounce(search, 300);

  const [selectedType, setSelectedType] = useState<"Каркасные" | "Надувные">(
    "Каркасные"
  );

  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["products", searchQuery, selectedType],
    queryFn: () =>
      axios
        .get(`${API}/api/products`, {
          params: {
            search: searchQuery,
            categoryId: CATEGORY_IDS[selectedType],
          },
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("Serverdan olingan mahsulotlar:", res.data);
          return res.data?.data || [];
        })
        .catch((error) => {
          console.error("Mahsulotlarni olish xatosi:", error.response?.data);
          throw error;
        }),
  });
  console.log(products);

  const { mutate: deleteProduct } = useMutation({
    mutationFn: (id: number) =>
      axios.delete(`${API}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
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

  const handleEdit = (product: ProductType) => {
    setSelectedProduct(product);
    setEditMode(true);
    setIsModalOpen(true);
  };

  useEffect(() => {
    console.log(
      "isModalOpen:",
      isModalOpen,
      "editMode:",
      editMode,
      "selectedProduct:",
      selectedProduct
    );
  }, [isModalOpen, editMode, selectedProduct]);

  if (productsError) {
    return <div>Mahsulotlarni yuklashda xato: {productsError.message}</div>;
  }

  return (
    <>
      <ToastContainer />
      <div className="p-[50px]">
        <div className="flex justify-between items-center gap-4 mb-6">
          <Input
            style={{ height: "40px", borderRadius: "29px" }}
            onChange={handleSearch}
            value={search}
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
            onClick={() => {
              setEditMode(false);
              setSelectedProduct(null);
              setIsModalOpen(true);
            }}
          >
            <span className="text-white">+ Добавить продукт</span>
          </Button>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setSelectedType("Каркасные")}
            className={`relative px-6 py-2 text-[35px] transition-none ${
              selectedType === "Каркасные"
                ? "text-[#009398] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#009398]"
                : "text-gray-500"
            }`}
          >
            Каркасные
          </button>
          <button
            onClick={() => setSelectedType("Надувные")}
            className={`relative px-6 py-2 text-[35px] transition-none ${
              selectedType === "Надувные"
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

        {productsLoading ? (
          <div>Loading...</div>
        ) : (
          products
            .filter((item: ProductType) => item.Category?.name === selectedType)
            .map((item: ProductType) => (
              <div
                key={item.id}
                className="grid grid-cols-7 items-center pl-[70px] text-center gap-4 mt-4 bg-white rounded-[30px] h-[70px] shadow-sm"
              >
                <div className="flex justify-center  w-[80px] h-[60px] ml-[20px] overflow-hidden rounded-md">
                  <img
                    src={`http://server.rtudarsjadvali.uz/uploads/${item.image}`}
                    alt="product"
                    className="object-contain w-full h-full"
                  />
                </div>

                <div className="text-base font-medium">{item.price}</div>
                <div className="text-base font-medium">{item.quantity}</div>
                <div className="text-base font-medium">{item.frame_ru}</div>
                <div className="text-base font-medium">{item.size}</div>
                <div className="text-base font-medium">{item.depth} см</div>
                <div className="flex justify-center gap-2">
                  <button
                    className="text-blue-500"
                    onClick={() => handleEdit(item)}
                  >
                    <EditOutlined />
                  </button>
                  <Popconfirm
                    title="Вы уверены, что хотите удалить этот продукт?"
                    onConfirm={() => deleteProduct(item.id)}
                    okText="Да"
                    placement="leftBottom"
                    cancelText="Нет"
                  >
                    <button className="text-red-500">
                      <DeleteOutlined />
                    </button>
                  </Popconfirm>
                </div>
              </div>
            ))
        )}

        <ProductModal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditMode(false);
            setSelectedProduct(null);
          }}
          editMode={editMode}
          initialData={selectedProduct}
        />
      </div>
    </>
  );
};

export default Product;
