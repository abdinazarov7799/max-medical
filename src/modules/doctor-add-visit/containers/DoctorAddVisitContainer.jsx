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
            >
                <Form.Item
                    label={"firstName"}
                    name="firstName"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={"lastName"}
                    name="lastName"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={"middleName"}
                    name="middleName"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={"phoneNumber"}
                    name="phoneNumber"
                    rules={[{required: true,}]}
                >
                    <InputNumber type={"number"} controls={false} style={{width: "100%"}}/>
                </Form.Item>

                <Form.Item
                    label={"work"}
                    name="work"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={"position"}
                    name="position"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={"address"}
                    name="address"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit" loading={isLoading}>
                        Send
                    </Button>
                </Form.Item>
            </Form>
        </Container>
    );
};

export default DoctorAddVisitContainer;