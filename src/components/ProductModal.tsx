import { Modal, Form, Input, Select, Upload, InputNumber, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Option } = Select;

const ProductModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
    onClose();
    form.resetFields();
  };

  return (
    <Modal
      title="Mahsulot qo‘shish"
      open={open}
      onCancel={onClose}
      footer={null}
      width={1200}
      centered={false}
      style={{ top: 30 }}
      styles={{ mask: { backgroundColor: "rgba(0,0,0,0.5)" } }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          category: "karkas",
          status: "recommend",
        }}
      >
        <Form.Item label="Rasm" name="image" valuePropName="fileList">
          <Upload.Dragger
            beforeUpload={() => false}
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            multiple={false}
            accept="image/*"
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p>Rasmni tanlang</p>
          </Upload.Dragger>
        </Form.Item>

        <div className="grid grid-cols-2 gap-3">
          <Form.Item
            label="Kategoriya"
            name="category"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="karkas">Karkasli</Option>
              <Option value="naduvniy">Shishma</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Miqdor"
            name="quantity"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>

          <Form.Item label="Eski narx (so‘m)" name="old_price">
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item label="Chegirmali narx (so‘m)" name="price">
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item label="Ramka (RU)" name="frame_ru">
            <Input />
          </Form.Item>

          <Form.Item label="Ramka (UZ)" name="frame_uz">
            <Input />
          </Form.Item>

          <Form.Item label="O‘lchami (m)" name="size">
            <Input />
          </Form.Item>

          <Form.Item label="Chuqurligi (sm)" name="depth">
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item label="Holat" name="status">
            <Select>
              <Option value="recommend">Tavsiya qilamiz</Option>
              <Option value="new">Yangi</Option>
              <Option value="sale">Chegirma</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item label="Jihozlar (RU)" name="equipment_ru">
          <Input.TextArea autoSize />
        </Form.Item>

        <Form.Item label="Jihozlar (UZ)" name="equipment_uz">
          <Input.TextArea autoSize />
        </Form.Item>

        <Form.Item className="text-center mt-2">
          <Button
            type="primary"
            htmlType="submit"
            style={{ padding: "0 40px" }}
          >
            Qo‘shish
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
