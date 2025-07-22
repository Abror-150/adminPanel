import { Button, Popconfirm } from "antd";
import { useState } from "react";
import { API } from "../../hooks/getEnv";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { CategoryType } from "../../types/CategoryType";
import CategoryModal from "../../components/CategoryModal";
import { toast, ToastContainer } from "react-toastify";

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteCAtegory } = useMutation({
    mutationFn: (id: number) => axios.delete(`${API}/api/category/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      queryClient.refetchQueries({ queryKey: ["category"] });
      toast.success("category удален");
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
  const {
    data: category = [],
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["category"],
    queryFn: () =>
      axios
        .get(`${API}/api/category`, {})
        .then((res) => {
          return res.data?.data || [];
        })
        .catch((error) => {
          console.error("Mahsulotlarni olish xatosi:", error.response?.data);
          throw error;
        }),
  });

  return (
    <>
      <ToastContainer />
      <div className="p-[50px]">
        <div className="flex justify-end">
          <Button
            type="primary"
            style={{
              height: "50px",
              borderRadius: "29px",
              background: "#00b894",
            }}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <span className="text-white">+ Добавить продукт</span>
          </Button>
        </div>

        <div className="grid grid-cols-3 mt-[60px] pt-[15px] rounded-[30px] text-[#000000] w-[1088px] bg-[#FFFFFF] h-[55px] font-semibold text-center">
          <div>Название</div>
          <div>На узбекском</div>
          <div>Действия</div>
        </div>

        {productsLoading ? (
          <div>Loading...</div>
        ) : (
          category.map((item: CategoryType) => (
            <div
              key={item.id}
              className="grid grid-cols-3 items-center  text-center w-[1088px] gap-4 mt-4 bg-white rounded-[30px] h-[55px] shadow-sm"
            >
              <div className="text-base font-medium">{item.name}</div>
              <div className="text-base font-medium">{item.name_uz}</div>
              <div className="flex justify-center gap-2">
                <button className="text-blue-500">
                  <EditOutlined />
                </button>
                <Popconfirm
                  title="Вы уверены, что хотите удалить этот продукт?"
                  okText="Да"
                  cancelText="Нет"
                  onConfirm={() => deleteCAtegory(item.id)}
                >
                  <button className="text-red-500">
                    <DeleteOutlined />
                  </button>
                </Popconfirm>
              </div>
            </div>
          ))
        )}
        <CategoryModal
          open={isModalOpen}
          onClose={() => {
            console.log("Modal yopilmoqda");
            setIsModalOpen(false);
          }}
        />
      </div>
    </>
  );
};

export default Category;
