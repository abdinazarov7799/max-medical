import {Button, Col, DatePicker, Image, Row, Space, Switch, theme} from "antd";
import logo from "../../assets/images/logo.svg";
import logoDark from "../../assets/images/logoDark.svg";
import React, {useState} from "react";
import {Header} from "antd/es/layout/layout";
import {FileExcelOutlined, LogoutOutlined, MoonOutlined, SunOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {useSettingsStore, useStore} from "../../store";
import {get} from "lodash";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import storage from "../../services/storage";
import dayjs from "dayjs";
import useGetAllQuery from "../../hooks/api/useGetAllQuery.js";
import {KEYS} from "../../constants/key.js";
const { RangePicker } = DatePicker;

const disabledDate = (current) => {
    return current && current > dayjs().endOf('day');
};

const DashboardHeader = () => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const {t, i18n} = useTranslation();
    const setDarkMode = useSettingsStore((state) => get(state, "setDarkMode", () => {}));
    const darkMode = useSettingsStore((state) => get(state, "darkMode"));
    const setUser = useStore((state) => get(state, "setUser", () => {}));
    const setAuthenticated = useStore((state) => get(state, "setAuthenticated", () => {}));
    const clearToken = useSettingsStore((state) => get(state, "setToken", () => {}));
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState({from: null, to: null});

    const {data,isLoading} = useGetAllQuery({
        key: KEYS.get_file,
        url: KEYS.get_file,
        params: {
            responseType: 'blob'
        }
    })

    const logout = () => {
        Swal.fire({
            title: t("Are you sure you want to exit??"),
            icon: "warning",
            backdrop: "rgba(0,0,0,0.9)",
            background: "none",
            showCancelButton: true,
            confirmButtonColor: "#13D6D1",
            confirmButtonText: t("Yes"),
            cancelButtonText: t("Back"),
            customClass: {
                title: "title-color",
                content: "text-color",
                icon: "icon-color",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setAuthenticated(false);
                setUser(null);
                clearToken(null);
                storage.remove("settings");
                navigate("/auth");
            }
        });
    };

    const onChange = (_,dateString) => {
        setDateRange({
            from: dateString[0],
            to: dateString[1],
        })
    }
  return(
      <Header
          theme="dark"
          style={{
              padding: '0 15px',
              background: colorBgContainer,
          }}
      >
          <Row justify={"space-between"}>
              <Col>
                  <Image
                      src={darkMode ? logoDark : logo}
                      preview={false}
                      width={90}
                      onClick={() => navigate('/')}
                      style={{cursor: "pointer"}}
                  />
              </Col>
              <Col>
                  <Space size={"middle"}>
                      <RangePicker
                          id={{start: 'from', end: 'to',}}
                          onChange={onChange}
                          disabledDate={disabledDate}
                      />
                      <Button
                          type={"primary"}
                          icon={<FileExcelOutlined />}
                      >
                          Get file
                      </Button>
                      <Switch
                          checkedChildren={<SunOutlined />}
                          unCheckedChildren={<MoonOutlined />}
                          checked={darkMode}
                          onClick={() => setDarkMode()}
                      />
                      <Button
                          icon={<LogoutOutlined />}
                          style={{height: 50,}}
                          onClick={logout}
                      >
                          {t("Logout")}
                      </Button>
                  </Space>
              </Col>
          </Row>
      </Header>
  )
}
export default DashboardHeader
