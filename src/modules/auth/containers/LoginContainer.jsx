import React from "react";
import { get } from "lodash";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import { URLS } from "../../../constants/url";
import { useSettingsStore, useStore } from "../../../store";
import usePostQuery from "../../../hooks/api/usePostQuery";
import logo from "../../../assets/images/logo.svg";
import {Button, Form, Input, Space, Image, theme} from "antd";
import logoDark from "../../../assets/images/logoDark.svg";

const LoginContainer = () => {
  const { mutate, isLoading } = usePostQuery({
    url: URLS.sign_in,
    hideSuccessToast: true,
  });
  const darkMode = useSettingsStore((state) => get(state, "darkMode"));
  const setToken = useSettingsStore((state) => get(state, "setToken", () => {}));
  const setAuthenticated = useStore((state) => get(state, "setAuthenticated", () => {}));
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadius },
  } = theme.useToken();

  const onFinish = (data) => {
    mutate(
        { url: URLS.sign_in, attributes: data },
        {
          onSuccess: ({ data }) => {
            setToken(get(data, "accessToken", null));
            setAuthenticated(true);
            navigate("/auth");
            Swal.fire({
              position: "center",
              icon: "success",
              backdrop: "rgba(0,0,0,0.9)",
              background: "none",
              title: "Тизимимизга хуш келибсиз",
              iconColor: "#0BC4EA ",
              showConfirmButton: false,
              timer: 2000,
              customClass: {
                title: "title-color",
              },
            });
          },
        }
    );
  };

  return (
      <div style={{
        backgroundColor: colorBgContainer,
        padding: 50,
        boxShadow: "0 0 10px 0 #c8cbcb",
        borderRadius,
      }}>
        <Space direction={"vertical"} size={"large"}>
          <Image src={darkMode ? logoDark : logo} width={200} height={90} preview={false} />
          <Form
              layout={"vertical"}
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
          >
            <Form.Item
                label={"Фойдаланувчи номи"}
                name="username"
                rules={[
                  {
                    required: true,
                  },
                ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
                label={"Парол"}
                name="password"
                rules={[
                  {
                    required: true,
                  },
                ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={isLoading}>
                {"Кириш"}
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </div>
  );
};

export default LoginContainer;
