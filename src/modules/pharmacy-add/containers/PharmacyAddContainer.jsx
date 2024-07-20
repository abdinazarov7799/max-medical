import React from 'react';
import Container from "../../../components/Container.jsx";
import usePostQuery from "../../../hooks/api/usePostQuery.js";
import {URLS} from "../../../constants/url.js";
import {useTelegram} from "../../../hooks/useTelegram.jsx";
import {Button, Form, Input, InputNumber, Select, Space} from "antd";
import useGetAllQuery from "../../../hooks/api/useGetAllQuery.js";
import {KEYS} from "../../../constants/key.js";
import {get} from "lodash";

const PharmacyAddContainer = ({userId}) => {
    const { mutate, isLoading } = usePostQuery({});
    const { onClose } = useTelegram();
    const [form] = Form.useForm();

    const {data:medicenes,isLoading:isLoadingMedicines} = useGetAllQuery({
        key: KEYS.medicine_list,
        url: URLS.medicine_list,
    })
    const onFinish = (values) => {
        const formData = {
            ...values,
            chatId: userId
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
            >
               <Space direction={"vertical"} style={{width:'100%'}}>
                   <Form.Item
                       label={"name"}
                       name="name"
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

                   <Form.Item
                       label={"phoneNumber"}
                       name="phoneNumber"
                       rules={[{required: true,}]}
                   >
                       <InputNumber controls={false} style={{width: "100%"}}/>
                   </Form.Item>

                   <Form.Item
                       label={"pharmacistFIO"}
                       name="pharmacistFIO"
                       rules={[{required: true,}]}
                   >
                       <Input />
                   </Form.Item>

                   <Form.Item
                       label={"remainCount"}
                       name="remainCount"
                       rules={[{required: true,}]}>
                       <Select
                           placeholder={"remainCount"}
                           optionFilterProp="children"
                           loading={isLoadingMedicines}
                           options={get(medicenes,'data')?.map((item) => {
                               return {
                                   value: get(item,'id'),
                                   label: get(item,'name')
                               }
                           })}
                       />
                   </Form.Item>

                   <Form.Item>
                       <Button block type="primary" htmlType="submit" loading={isLoading}>
                           Send
                       </Button>
                   </Form.Item>
               </Space>
            </Form>
        </Container>
    );
};

export default PharmacyAddContainer;