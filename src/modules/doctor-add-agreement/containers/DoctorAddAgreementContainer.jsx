import React, { useState } from 'react';
import usePostQuery from "../../../hooks/api/usePostQuery.js";
import { useTelegram } from "../../../hooks/useTelegram.jsx";
import {Button, Col, Form, Input, InputNumber, Row, Spin} from "antd";
import { URLS } from "../../../constants/url.js";
import Container from "../../../components/Container.jsx";
import useGetAllQuery from "../../../hooks/api/useGetAllQuery.js";
import { KEYS } from "../../../constants/key.js";
import InputMask from 'react-input-mask';

const DoctorAddAgreementContainer = ({ userId }) => {
    const { mutate, isLoading } = usePostQuery({});
    const { onClose } = useTelegram();
    const [form] = Form.useForm();
    const [medicineCounts, setMedicineCounts] = useState({});

    const { data: medicines, isLoading: medicinesIsLoading } = useGetAllQuery({
        key: KEYS.medicine_list,
        url: URLS.medicine_list,
    });

    const handleCountChange = (id, count) => {
        setMedicineCounts((prevCounts) => ({
            ...prevCounts,
            [id]: count,
        }));
    };

    const onFinish = (values) => {
        const { medicines, ...formValues } = values;
        const medicinesData = (medicines?.data || []).reduce((acc, medicine) => {
            const count = medicineCounts[medicine.id] || 0;
            if (count > 0) acc[medicine.id] = count;
            return acc;
        }, {});
        console.log(medicinesData,'medicinesData')
        const formData = {
            ...formValues,
            medicines: medicinesData,
            chatId: userId
        };

        mutate(
            { url: URLS.doctor_add_agreement, attributes: formData },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    return (
        <Container>
            <Form
                onFinish={onFinish}
                autoComplete="off"
                layout={"vertical"}
                form={form}
                style={{ minHeight: "100vh" }}
            >
                <Form.Item label={"Фамилия"} name="lastName" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label={"Исм"} name="firstName" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label={"Отасининг исми"} name="middleName" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label={"Туғилган кун"} name="birthDate">
                    <InputMask mask="99-99-9999">
                        {(inputProps) => <Input {...inputProps} />}
                    </InputMask>
                </Form.Item>

                <Form.Item label={"Телефон рақами"} name="phoneNumber" rules={[{ required: true }]}>
                    <InputNumber controls={false} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item label={"Иш жойи"} name="work" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label={"Лавозим"} name="position" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label={"Манзил"} name="address" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Spin spinning={medicinesIsLoading} tip={"Юкланмоқда..."}>
                    <Row justify={"space-between"} align={"middle"} gutter={[10, 10]}>
                        {(medicines?.data || []).map((medicine) => (
                            <Col span={12} key={medicine?.id}>
                                <Form.Item label={medicine?.name || "Дори"}>
                                    <InputNumber
                                        min={0}
                                        onChange={(value) => handleCountChange(medicine?.id, value)}
                                        style={{ width: "100%" }}
                                    />
                                </Form.Item>
                            </Col>
                        ))}
                    </Row>
                </Spin>

                <Form.Item label={"Карта рақами"} name="cardNumber" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label={"Дорихона номи"} name="pharmacyName">
                    <Input />
                </Form.Item>

                <Form.Item label={"Дорихона телефон рақами"} name="pharmacyPhoneNumber">
                    <InputNumber controls={false} style={{ width: "100%" }} />
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
