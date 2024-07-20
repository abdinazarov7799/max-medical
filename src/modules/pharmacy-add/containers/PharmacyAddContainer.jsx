import React from 'react';
import Container from "../../../components/Container.jsx";
import usePostQuery from "../../../hooks/api/usePostQuery.js";
import {URLS} from "../../../constants/url.js";
import {useTelegram} from "../../../hooks/useTelegram.jsx";
import {Button, Form, Input, InputNumber, Space, Typography} from "antd";
import {get} from "lodash";
const { Title } = Typography;

const PharmacyAddContainer = ({userId}) => {
    const { mutate, isLoading } = usePostQuery({});
    const { onClose } = useTelegram();
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const formData = {
            chatId: userId,
            address: get(values,'address'),
            name: get(values,'name'),
            pharmacistFIO: get(values,'pharmacistFIO'),
            phoneNumber: get(values,'phoneNumber'),
            remainCount: {
                1: get(values,'remainCount-1',0),
                2: get(values,'remainCount-2',0),
                3: get(values,'remainCount-3',0),
                4: get(values,'remainCount-4',0),
            },
            reservationCount: {
                1: get(values,'reservationCount-1',0),
                2: get(values,'reservationCount-2',0),
                3: get(values,'reservationCount-3',0),
                4: get(values,'reservationCount-4',0),
            },
        }
        mutate(
            { url: URLS.pharmacy_add, attributes: formData },
            {
                onSuccess: () => {
                    onClose()
                },
            }
        );
    }
    return (
        <Container>
            <Form
                onFinish={onFinish}
                autoComplete="off"
                layout={"vertical"}
                form={form}
                style={{minHeight: "100vh"}}
            >
                <Space direction={"vertical"} style={{width:'100%'}}>
                    <Form.Item
                        label={"Дорихона номи"}
                        name="name"
                        rules={[{required: true,}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={"Манзил"}
                        name="address"
                        rules={[{required: true,}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={"Телефон рақами"}
                        name="phoneNumber"
                        rules={[{required: true,}]}
                    >
                        <InputNumber controls={false} style={{width: "100%"}}/>
                    </Form.Item>

                    <Form.Item
                        label={"Фармацевт Ф.И.О."}
                        name="pharmacistFIO"
                        rules={[{required: true,}]}
                    >
                        <Input />
                    </Form.Item>
                    <Title level={4}>Остатка</Title>
                    <Space>
                        <Form.Item
                            label={"Елекса"}
                            name="remainCount-1">
                            <InputNumber min={0} defaultValue={0} style={{width: "100%"}}/>
                        </Form.Item>

                        <Form.Item
                            label={"Л-Аргенин"}
                            name="remainCount-2">
                            <InputNumber min={0} defaultValue={0} style={{width: "100%"}}/>
                        </Form.Item>
                    </Space>

                    <Space>
                        <Form.Item
                            label={"Кардон"}
                            name="remainCount-3">
                            <InputNumber min={0} defaultValue={0} style={{width: "100%"}}/>
                        </Form.Item>

                        <Form.Item
                            label={"Фертуна"}
                            name="remainCount-4">
                            <InputNumber min={0} defaultValue={0} style={{width: "100%"}}/>
                        </Form.Item>
                    </Space>
                    <Title level={4}>Бронь</Title>
                    <Space>
                        <Form.Item
                            label={"Елекса"}
                            name="reservationCount-1">
                            <InputNumber min={0} defaultValue={0} style={{width: "100%"}}/>
                        </Form.Item>

                        <Form.Item
                            label={"Л-Аргенин"}
                            name="reservationCount-2">
                            <InputNumber min={0} defaultValue={0} style={{width: "100%"}}/>
                        </Form.Item>
                    </Space>

                    <Space>
                        <Form.Item
                            label={"Кардон"}
                            name="reservationCount-3">
                            <InputNumber min={0} defaultValue={0} style={{width: "100%"}}/>
                        </Form.Item>

                        <Form.Item
                            label={"Фертуна"}
                            name="reservationCount-4">
                            <InputNumber min={0} defaultValue={0} style={{width: "100%"}}/>
                        </Form.Item>
                    </Space>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit" loading={isLoading}>
                            Юбориш
                        </Button>
                    </Form.Item>
                </Space>
            </Form>
        </Container>
    );
};

export default PharmacyAddContainer;
