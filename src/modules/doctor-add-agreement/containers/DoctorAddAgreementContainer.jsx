import React, { useState } from 'react';
import usePostQuery from "../../../hooks/api/usePostQuery.js";
import { useTelegram } from "../../../hooks/useTelegram.jsx";
import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { URLS } from "../../../constants/url.js";
import Container from "../../../components/Container.jsx";
import useGetAllQuery from "../../../hooks/api/useGetAllQuery.js";
import { KEYS } from "../../../constants/key.js";
import {get, isEqual} from "lodash";
import InputMask from 'react-input-mask';

const DoctorAddAgreementContainer = ({ userId }) => {
    const { mutate, isLoading } = usePostQuery({});
    const { onClose } = useTelegram();
    const [form] = Form.useForm();
    const [selectedMedicines, setSelectedMedicines] = useState([]);
    const [medicineCounts, setMedicineCounts] = useState({});

    const { data: medicines, isLoading: medicinesIsLoading } = useGetAllQuery({
        key: KEYS.medicine_list,
        url: URLS.medicine_list,
    });

    const onMedicineSelectChange = (value) => {
        setSelectedMedicines(value);
    };

    const handleCountChange = (id, count) => {
        setMedicineCounts((prevCounts) => ({
            ...prevCounts,
            [id]: count,
        }));
    };

    const onFinish = (values) => {
        const { medicines, ...formValues } = values;
        const medicinesData = selectedMedicines.reduce((acc, medicineId) => {
            acc[medicineId] = medicineCounts[medicineId] || 0;
            return acc;
        }, {});

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
                <Form.Item
                    label={"Фамилия"}
                    name="lastName"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={"Исм"}
                    name="firstName"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={"Отасининг исми"}
                    name="middleName"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={"Туғилган кун"}
                    name="birthDate"
                >
                    <InputMask mask="99-99-9999">
                        {(inputProps) => <Input {...inputProps} />}
                    </InputMask>
                </Form.Item>

                <Form.Item
                    label={"Телефон рақами"}
                    name="phoneNumber"
                    rules={[{ required: true }]}
                >
                    <InputNumber controls={false} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    label={"Иш жойи"}
                    name="work"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={"Лавозим"}
                    name="position"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={"Манзил"}
                    name="address"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={"Дорилар"}
                    name="medicines"
                    rules={[{ required: true }]}
                >
                    <Select
                        mode={"multiple"}
                        placeholder={"Дорилар"}
                        loading={medicinesIsLoading}
                        options={get(medicines, 'data')?.map((item) => ({
                            value: get(item, 'id'),
                            label: get(item, 'name'),
                        }))}
                        onChange={onMedicineSelectChange}
                    />
                </Form.Item>

                <Row justify={"space-between"} align={"middle"} gutter={[10, 10]}>
                    {selectedMedicines?.map((medicineId) => {
                        const medicine = get(medicines, 'data',[])?.find(item => isEqual(get(item,'id'),medicineId));
                        return (
                            <Col span={12} key={medicineId}>
                                <Form.Item
                                    label={medicine?.name || "Дори"}
                                >
                                    <InputNumber
                                        min={0}
                                        defaultValue={0}
                                        onChange={(value) => handleCountChange(medicineId, value)}
                                        style={{ width: "100%" }}
                                    />
                                </Form.Item>
                            </Col>
                        );
                    })}
                </Row>

                <Form.Item
                    label={"Карта рақами"}
                    name="cardNumber"
                    rules={[{ required: true }]}
                >
                    <Input />
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
