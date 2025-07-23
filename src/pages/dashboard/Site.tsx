import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../hooks/getEnv";
import axios from "axios";
import type { SiteType } from "../../types/SiteType";
import { EditOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { toast, ToastContainer } from "react-toastify";
import { Context } from "../../context/Context";

const Site = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [modalData, setModalData] = useState<{
    key: keyof SiteType;
    value: string;
  }>({ key: "phone", value: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {token} =  useContext(Context)

  const {
    data: site = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["site"],
    queryFn: () =>
      axios.get(`${API}/api/site`).then((res) => res.data?.data || []),
  });

  const mutation = useMutation({
    mutationFn: ({ id, ...data }: { id: string; [key: string]: any }) =>
      axios.patch(`${API}/api/site/${id}`, data,{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      }),
    onSuccess: () => {
      toast.success("Muvaffaqiyatli o‘zgartirildi");
      queryClient.invalidateQueries(["site"]);
    },
    onError: () => {
      toast.error("O‘zgartirishda xatolik");
    },
  });

  const handleEdit = (key: keyof SiteType, value: string, id: string) => {
    setModalData({ key, value });
    setEditingId(id);
    form.setFieldsValue({ value });
    setIsModalOpen(true);
  };

  const handleFinish = (values: any) => {
    if (!editingId) return;

    mutation.mutate({
      id: editingId,
      [modalData.key]: values.value,
    });

    setIsModalOpen(false);
  };

  const renderRow = (label: string, key: keyof SiteType) => (
    <div className="grid grid-cols-3 pl-[60px] mt-[30px] pt-[15px] rounded-[30px] text-[#000000] w-[1200px] pb-2 mb-2 bg-[#FFFFFF] h-[69px] font-semibold text-center">
      <div>{label}</div>
      <div>{site[0]?.[key]}</div>
      <div>
        <button
          className="text-[#3f8c8e]"
          onClick={() =>
            handleEdit(key, site[0]?.[key] || "", site[0]?.id || "")
          }
        >
          <EditOutlined />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <ToastContainer />
      <div className="p-[20px]">
        {renderRow("Телефонный номер", "phone")}
        {renderRow("Адрес", "adress_ru")}
        {renderRow("Рабочее время", "workingHours")}
        {renderRow("Телеграм", "telegramLink")}
        {renderRow("Инстаграм", "instagramLink")}

        <Modal
          title="Edit"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleFinish}>
            <Form.Item
              name="value"
              rules={[{ required: true, message: "Please enter value" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item className="flex justify-center">
              <Button htmlType="submit" type="primary">
                Изменить
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Site;
