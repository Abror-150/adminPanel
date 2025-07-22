// components/modals/CategoryModal.tsx
import { Modal, Form, Input, Button } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../hooks/getEnv";

const CategoryModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const createCategory = useMutation({
    mutationFn: (data: any) => axios.post(`${API}/api/category`, data),
    onSuccess: () => {
      toast.success("Kategoriya yaratildi");
      queryClient.invalidateQueries({ queryKey: ["category"] });
      form.resetFields();
      onClose();
    },

    onError: () => {
      toast.error("Kategoriya yaratishda xatolik");
    },
  });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      createCategory.mutate(values);
    } catch (err) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring");
    }
  };

  return (
    <Modal
      title="добавить категорию"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Kategoriya nomi (ruscha)"
          name="name"
          rules={[{ required: true, message: "Nom kiriting" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Kategoriya nomi (o‘zbekcha)"
          name="name_uz"
          rules={[{ required: true, message: "O‘zbekcha nom kiriting" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="text-center">
          <Button type="primary" htmlType="submit">
            Saqlash
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
