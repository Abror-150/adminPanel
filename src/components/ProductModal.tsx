import {
  Modal,
  Form,
  Input,
  Select,
  Upload,
  InputNumber,
  Button,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Context } from "../context/Context";
import { API } from "../hooks/getEnv";
import { toast } from "react-toastify";
import type { ProductType } from "../types/ProductType";

const { Option } = Select;

const ProductModal = ({
  open,
  onClose,
  editMode = false,
  initialData = null,
}: {
  open: boolean;
  onClose: () => void;
  editMode?: boolean;
  initialData?: ProductType | null;
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const queryClient = useQueryClient();
  const { token } = useContext(Context);
  const decoded: any = token ? jwtDecode(token) : {};
  const adminId = decoded?.id;

  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axios
        .get(`${API}/api/category`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.data.data || []),
    enabled: !!token,
  });

  useEffect(() => {
    if (editMode && initialData) {
      
      form.setFieldsValue({
        category: initialData.Category?.name,
        quantity: initialData.quantity,
        price: initialData.price,
        discountedPrice: initialData.discountedPrice,
        frame_en: initialData.frame_en,
        frame_uz: initialData.frame_uz,
        frame_ru: initialData.frame_ru,
        size: initialData.size,
        depth: initialData.depth,
        status: initialData.status,
      });

      if (initialData.image) {
        setImageUrl(
          initialData.image.startsWith("http")
            ? initialData.image
            : `http://server.rtudarsjadvali.uz/uploads/${initialData.image}`
        );
        setFileList([
          {
            uid: "-1",
            name: initialData.image,
            status: "done",
            url: initialData.image.startsWith("http")
              ? initialData.image
              : `http://server.rtudarsjadvali.uz/uploads/${initialData.image}`,
          },
        ]);
      }
    }
  }, [editMode, initialData]);

  useEffect(() => {
    if (!editMode || !initialData) {
      form.resetFields();
      setImageUrl("");
      setFileList([]);
    }
  }, [editMode, initialData]);

  const uploadMutation = useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return axios.post(`${API}/api/file/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      const url = res.data?.link;
      if (!url) throw new Error("URL topilmadi");
      setImageUrl(url);
      message.success("Rasm yuklandi");
    },
    onError: () => {
      message.error("Rasm yuklashda xatolik");
    },
  });

  const createProduct = useMutation({
    mutationFn: (data: ProductType) =>
      axios.post(`${API}/api/products`, data, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      toast.success("Mahsulot qo‘shildi");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      form.resetFields();
      setImageUrl("");
      setFileList([]);
      onClose();
    },
    onError: () => {
      toast.error("Yaratishda xatolik");
    },
  });

  const updateProduct = useMutation({
    mutationFn: (data: any) =>
      axios.patch(`${API}/api/products/${initialData?.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      toast.success("Mahsulot yangilandi");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onClose();
    },
    onError: () => {
      toast.error("Tahrirlashda xatolik");
    },
  });

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
    const file = fileList?.[0]?.originFileObj;
    if (file) uploadMutation.mutate(file);
  };

  const handleSubmit = async (values: any) => {
    try {
      await form.validateFields();
      if (!imageUrl) return toast.warning("Rasm yuklanmadi");

      const selectedCategory = categories.find(
        (cat: any) => cat.name === values.category
      );
      if (!selectedCategory) return toast.error("Kategoriya topilmadi");

      const dataToSend: any = {
        categoryId: selectedCategory.id,
        image: imageUrl.startsWith("http")
          ? imageUrl.split("/").pop()
          : imageUrl,
        price: values.price,
        quantity: values.quantity,
        size: values.size || "",
        depth: values.depth || 0,
        frame_en: values.frame_en || "",
        frame_uz: values.frame_uz || "",
        frame_ru: values.frame_ru || "",
        status: values.status,
      };

      if (
        values.discountedPrice !== undefined &&
        values.discountedPrice !== null &&
        values.discountedPrice !== ""
      ) {
        dataToSend.discountedPrice = Number(values.discountedPrice);
      }

      editMode
        ? updateProduct.mutate(dataToSend)
        : createProduct.mutate(dataToSend);
    } catch (error) {
      toast.error("Majburiy maydonlar to‘ldirilmagan");
    }
  };

  return (
    <Modal
      title={editMode ? "Редактирование продукта" : "Добавить продукт"}
      open={open}
      onCancel={onClose}
      footer={null}
      width={1200}
      style={{ top: 30 }}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="image">
          <Upload.Dragger
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleUploadChange}
            multiple={false}
            accept="image/*"
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
          </Upload.Dragger>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded"
              style={{ width: "200px", marginTop: "10px" }}
            />
          )}
        </Form.Item>

        <div className="grid grid-cols-2 gap-3">
          <Form.Item
            label="Категори"
            name="category"
            rules={[{ required: true, message: "Категори" }]}
          >
            <Select loading={isLoading}>
              {categories.map((cat: any) => (
                <Option key={cat.id} value={cat.name}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Количество"
            name="quantity"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>

          <Form.Item label="Стартая цена (сум) " name="price" rules={[{required:true}]}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item
            label="Цена со скидкой (сум)"
            name="discountedPrice"
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item label="Ramka (EN)" name="frame_en">
            <Input />
          </Form.Item>
          <Form.Item label="Ramka (UZ)" name="frame_uz">
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label="Рамка (RU)"
            name="frame_ru"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label="Размер (м)"
            name="size"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label="Глубина(см)"
            name="depth"
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item rules={[{ required: true }]} label="Статус" name="status">
            <Select>
              <Option value="Recommend">Tavsiya qilamiz</Option>
              <Option value="Sale">Chegirma</Option>
              <Option value="OutOfStock">Tugadi</Option>
              <Option value="Block">Bloklangan</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item className="text-center mt-2">
          <Button
            type="primary"
            htmlType="submit"
            loading={createProduct.isPending || updateProduct.isPending}
            style={{ padding: "0 40px" }}
          >
            {editMode ? "Yangilash" : "Добавить"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
