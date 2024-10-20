import React from 'react';
import Container from "../../../components/Container.jsx";
import usePostQuery from "../../../hooks/api/usePostQuery.js";
import {URLS} from "../../../constants/url.js";
import {useTelegram} from "../../../hooks/useTelegram.jsx";
import {Button, Col, Form, Input, InputNumber, Row, Space, Spin, Typography} from "antd";
import {get} from "lodash";
import useGetAllQuery from "../../../hooks/api/useGetAllQuery.js";
import {KEYS} from "../../../constants/key.js";
const { Title } = Typography;

const PharmacyAddContainer = ({userId}) => {
    const { mutate, isLoading:isLoadingPost } = usePostQuery({});
    const { onClose } = useTelegram();
    const [form] = Form.useForm();
    const {data,isLoading} = useGetAllQuery({
        url: URLS.medicine_list,
        key: KEYS.medicine_list,
    })

    const onFinish = (values) => {
        const remainCount = {};
        const reservationCount = {};

        get(data, 'data', [])?.forEach(product => {
            const productId = get(product, 'id');
            remainCount[productId] = get(values, `remainCount-${productId}`, 0);
            reservationCount[productId] = get(values, `reservationCount-${productId}`, 0);
        });

        const formData = {
            chatId: userId,
            address: get(values,'address'),
            name: get(values,'name'),
            pharmacistFIO: get(values,'pharmacistFIO'),
            phoneNumber: get(values,'phoneNumber'),
            remainCount,
            reservationCount,
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
                    <Spin spinning={isLoading} tip={"Юкланмоқда..."}>
                        <Row justify={"space-between"} align={"middle"} gutter={[10,10]}>
                            {
                                get(data,'data',[])?.map(product => {
                                    return (
                                        <Col span={12} key={get(product,'id')}>
                                            <Form.Item
                                                label={get(product,'name')}
                                                name={`remainCount-${get(product,'id')}`}>
                                                <InputNumber min={0} defaultValue={0} style={{width: "100%"}}/>
                                            </Form.Item>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Spin>
                    <Title level={4}>Бронь</Title>
                    <Spin spinning={isLoading} tip={"Юкланмоқда..."}>
                        <Row justify={"space-between"} align={"middle"} gutter={[10,10]}>
                            {
                                get(data,'data',[])?.map(product => {
                                    return (
                                        <Col span={12} key={get(product,'id')}>
                                            <Form.Item
                                                label={get(product,'name')}
                                                name={`reservationCount-${get(product,'id')}`}>
                                                <InputNumber min={0} defaultValue={0} style={{width: "100%"}}/>
                                            </Form.Item>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Spin>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit" loading={isLoadingPost}>
                            Юбориш
                        </Button>
                    </Form.Item>
                </Space>
            </Form>
        </Container>
    );
};

export default PharmacyAddContainer;
