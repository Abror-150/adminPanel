import React, { useContext } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API } from "../hooks/getEnv";
import { Context } from "../context/Context";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setToken } = useContext(Context);
  const { mutate: loginAdmin } = useMutation({
    mutationFn: (loginData: { username: string; password: string }) =>
      axios.post(`${API}/api/admin/login`, loginData, {
        withCredentials: true,
      }),

    onSuccess: (res) => {
      const token = res.data?.token;
      console.log(token);

      setToken(token);
      toast.success("Muvaffaqиятли кирилди!");
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      setTimeout(() => navigate("/products"), 1000);
    },

    onError: (error: any) => {
      console.log("Login xatosi:", error.response?.data || error.message);
      toast.error("Логин ёки пароль нотўғри!");
    },
  });

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    loginAdmin({
      username: values.username!,
      password: values.password!,
    });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <ToastContainer />

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            className="w-[359px] h-[35px] rounded-[17px] custom-input"
            placeholder="Имя пользователя"
            allowClear
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            className="w-[359px] h-[35px] rounded-[17px] custom-input"
            style={{ textAlign: "center" }}
            placeholder="Пароль"
            allowClear
          />
        </Form.Item>

        <Form.Item>
          <Button
            className="w-[150px] h-[47.89px] ml-[30px]"
            type="primary"
            htmlType="submit"
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
