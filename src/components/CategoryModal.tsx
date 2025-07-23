// components/modals/CategoryModal.tsx
import { Modal, Form, Input, Button } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../hooks/getEnv";
import type { CategoryType } from "../types/CategoryType";
import { useContext } from "react";
import { Context } from "../context/Context";

const CategoryModal = ({
  open,
  onClose,
  isEdit = false,
  editingData,
}: {
  open: boolean;
  onClose: () => void;
  isEdit?: boolean;
  editingData?: CategoryType | null;
}) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { token } = useContext(Context);

  const createCategory = useMutation({
    mutationFn: (data: any) =>
      axios.post(`${API}/api/category`, data, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      toast.success("Kategoriya yaratildi");
      queryClient.invalidateQueries({ queryKey: ["category"] });
      form.resetFields();
      onClose();
    },
    onError: () => toast.error("Kategoriya yaratishda xatolik"),
  });

  const updateCategory = useMutation({
    mutationFn: (data: any) =>
      axios.patch(`${API}/api/category/${editingData?.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      toast.success("Kategoriya yangilandi");
      queryClient.invalidateQueries({ queryKey: ["category"] });
      form.resetFields();
      onClose();
    },
    onError: () => toast.error("Kategoriya yangilashda xatolik"),
  });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (isEdit && editingData?.id) {
        updateCategory.mutate(values);
      } else {
        createCategory.mutate(values);
      }
    } catch (err) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring");
    }
  };

  if (isEdit && editingData) {
    form.setFieldsValue(editingData);
  }

  return (
    <Modal
      title={isEdit ? "Редактировать категорию" : "Добавить категорию"}
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Название" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="На узбекском"
          name="name_uz"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="text-center">
          <Button
            type="primary"
            htmlType="submit"
            loading={createCategory.isPending || updateCategory.isPending}
          >
            {isEdit ? "обновлять" : "Добавить"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
