import React from 'react';
import usePostQuery from "../../../hooks/api/usePostQuery.js";
import {useTelegram} from "../../../hooks/useTelegram.jsx";
import {Button, Form, Input, InputNumber, Select} from "antd";
import {URLS} from "../../../constants/url.js";
import Container from "../../../components/Container.jsx";
import useGetAllQuery from "../../../hooks/api/useGetAllQuery.js";
import {KEYS} from "../../../constants/key.js";
import {get} from "lodash";

const DoctorAddAgreementContainer = ({userId}) => {
    const { mutate, isLoading } = usePostQuery({});
    const { onClose } = useTelegram();
    const [form] = Form.useForm();

    const {data:medicines,isLoading:medicinesIsLoading} = useGetAllQuery({
        key: KEYS.medicine_list,
        url: URLS.medicine_list,
    })

    const onFinish = (values) => {
        const { medicines , ...formValues } = values;
        const formData = {
            ...formValues,
            medicines: medicines?.join(),
            chatId: userId
        }
        mutate(
            { url: URLS.doctor_add_agreement, attributes: formData },
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

                <Form.Item
                    label={"Дорилар"}
                    name="medicines"
                    rules={[{required: true,}]}
                >
                    <Select
                        mode={"multiple"}
                        placeholder={"Дорилар"}
                        loading={medicinesIsLoading}
                        options={get(medicines,'data')?.map((item) => {
                            return {
                                value: get(item,'name'),
                                label: get(item,'name')
                            }
                        })}
                    />
                </Form.Item>

                <Form.Item
                    label={"Карта рақами"}
                    name="cardNumber"
                    rules={[{required: true,}]}
                >
                    <InputNumber controls={false} type={"number"} style={{width:"100%"}}/>
                </Form.Item>

                <Form.Item
                    label={"Дорихона номи"}
                    name="pharmacyName"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={"Дорихона телефон рақами"}
                    name="pharmacyPhoneNumber"
                >
                    <InputNumber type={"number"} controls={false} style={{width: "100%"}}/>
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

export default DoctorAddAgreementContainer;