import { Button, Popconfirm } from "antd";
import { useContext, useState } from "react";
import { API } from "../../hooks/getEnv";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { CategoryType } from "../../types/CategoryType";
import CategoryModal from "../../components/CategoryModal";
import { toast, ToastContainer } from "react-toastify";
import { Context } from "../../context/Context";

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useContext(Context);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );
  const queryClient = useQueryClient();

  const { mutate: deleteCategory } = useMutation({
    mutationFn: (id: number) =>
      axios.delete(`${API}/api/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("Категория удалена");
    },
    onError: (error: any) => {
      toast.error(
        `Ошибка при удалении: ${
          error.response?.data?.message || "Неизвестная ошибка"
        }`
      );
    },
  });

  const { data: category = [], isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: () =>
      axios.get(`${API}/api/category`).then((res) => res.data?.data || []),
  });

  const handleEdit = (category: CategoryType) => {
    setSelectedCategory(category);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

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
            onClick={handleAdd}
          >
            <span className="text-white">+ Добавить категорию</span>
          </Button>
        </div>

        <div className="grid grid-cols-3 mt-[60px] pt-[15px] rounded-[30px] text-[#000000] w-[1088px] bg-[#FFFFFF] h-[55px] font-semibold text-center">
          <div>Название</div>
          <div>На узбекском</div>
          <div>Действия</div>
        </div>

        {isLoading ? (
          <div>Загрузка...</div>
        ) : (
          category.map((item: CategoryType) => (
            <div
              key={item.id}
              className="grid grid-cols-3 items-center text-center w-[1088px] gap-4 mt-4 bg-white rounded-[30px] h-[55px] shadow-sm"
            >
              <div className="text-base font-medium">{item.name}</div>
              <div className="text-base font-medium">{item.name_uz}</div>
              <div className="flex justify-center gap-2">
                <button
                  className="text-blue-500"
                  onClick={() => handleEdit(item)}
                >
                  <EditOutlined />
                </button>
                <Popconfirm
                  title="Вы уверены, что хотите удалить эту категорию?"
                  okText="Да"
                  cancelText="Нет"
                  onConfirm={() => deleteCategory(item.id)}
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
          onClose={() => setIsModalOpen(false)}
          isEdit={isEditMode}
          editingData={selectedCategory}
        />
      </div>
    </>
  );
};

export default Category;
