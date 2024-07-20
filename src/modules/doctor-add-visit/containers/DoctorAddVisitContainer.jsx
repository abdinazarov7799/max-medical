import React from 'react';
import {Button, Form, Input, InputNumber} from "antd";
import Container from "../../../components/Container.jsx";
import usePostQuery from "../../../hooks/api/usePostQuery.js";
import {useTelegram} from "../../../hooks/useTelegram.jsx";
import {URLS} from "../../../constants/url.js";

const DoctorAddVisitContainer = ({userId}) => {
    const { mutate, isLoading } = usePostQuery({});
    const { onClose } = useTelegram();
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const formData = {
            ...values,
            chatId: userId
        }
        mutate(
            { url: URLS.doctor_add_visit, attributes: formData },
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
                <Form.Item
                    label={"Исм"}
                    name="firstName"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={"Фамилия"}
                    name="lastName"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={"Отасининг исми"}
                    name="middleName"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={"Телефон рақами"}
                    name="phoneNumber"
                    rules={[{required: true,}]}
                >
                    <InputNumber type={"number"} controls={false} style={{width: "100%"}}/>
                </Form.Item>

                <Form.Item
                    label={"Иш жойи"}
                    name="work"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={"Лавозим"}
                    name="position"
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

                <Form.Item>
                    <Button block type="primary" htmlType="submit" loading={isLoading}>
                        Юбориш
                    </Button>
                </Form.Item>
            </Form>
        </Container>
    );
};

export default DoctorAddVisitContainer;
