import React, { useEffect, useState } from "react";
import {Button, Col, DatePicker, Image, Layout, Row, Space, Switch, theme} from "antd";
import { FileExcelOutlined, LogoutOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { get } from "lodash";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import useGetAllQuery from "../../hooks/api/useGetAllQuery.js";
import { KEYS } from "../../constants/key.js";
import { URLS } from "../../constants/url.js";
import { useSettingsStore, useStore } from "../../store";
import storage from "../../services/storage";
import logo from "../../assets/images/logo.svg";
import logoDark from "../../assets/images/logoDark.svg";
const { Header } = Layout;
const { RangePicker } = DatePicker;

const disabledDate = (current) => {
    return current && current > dayjs().endOf('day');
};

const DashboardHeader = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const setDarkMode = useSettingsStore((state) => get(state, "setDarkMode", () => {}));
    const darkMode = useSettingsStore((state) => get(state, "darkMode"));
    const setUser = useStore((state) => get(state, "setUser", () => {}));
    const setAuthenticated = useStore((state) => get(state, "setAuthenticated", () => {}));
    const clearToken = useSettingsStore((state) => get(state, "setToken", () => {}));
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState({ from: null, to: null });

    const { data, isLoading, refetch } = useGetAllQuery({
        key: KEYS.get_file,
        url: URLS.get_file,
        params: {
            responseType: 'blob',
            params: { ...dateRange }
        },
        enabled: false
    });

    useEffect(() => {
        if (data) {
            const blob = new Blob([get(data,'data')], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            saveAs(blob, "Отчет форма.xlsx");
        }
    }, [data]);

    const logout = () => {
        Swal.fire({
            title: "Чиқишга ишончингиз комилми ?",
            icon: "warning",
            backdrop: "rgba(0,0,0,0.9)",
            background: "none",
            showCancelButton: true,
            confirmButtonColor: "#13D6D1",
            confirmButtonText: "Ҳа",
            cancelButtonText: "Орқага",
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

    const onChange = (_, dateString) => {
        setDateRange({
            from: dateString[0],
            to: dateString[1],
        });
    };

    return (
        <Header
            theme="dark"
            style={{
                padding: '0 15px',
                background: colorBgContainer,
            }}
        >
            <Row justify={"space-between"}>
                <Col flex={"auto"}>
                    <Image
                        src={darkMode ? logoDark : logo}
                        preview={false}
                        width={90}
                        onClick={() => navigate('/')}
                        style={{ cursor: "pointer" }}
                    />
                </Col>
                <Col>
                    <Space size={"middle"} style={{ width: "100%" }}>
                        <RangePicker
                            id={{ start: 'from', end: 'to', }}
                            onChange={onChange}
                            disabledDate={disabledDate}
                        />
                        <Button
                            type={"primary"}
                            icon={<FileExcelOutlined />}
                            loading={isLoading}
                            onClick={() => refetch()}
                        >
                            Файлни юклаш
                        </Button>
                        <Switch
                            checkedChildren={<SunOutlined />}
                            unCheckedChildren={<MoonOutlined />}
                            checked={darkMode}
                            onClick={() => setDarkMode()}
                        />
                        <Button
                            icon={<LogoutOutlined />}
                            style={{ height: 50, }}
                            onClick={logout}
                        >
                            Чиқиш
                        </Button>
                    </Space>
                </Col>
            </Row>
        </Header>
    )
};

export default DashboardHeader;
