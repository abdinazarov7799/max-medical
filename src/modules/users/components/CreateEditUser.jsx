import React, {useEffect} from 'react';
import usePostQuery from "../../../hooks/api/usePostQuery.js";
import {KEYS} from "../../../constants/key.js";
import {URLS} from "../../../constants/url.js";
import {Button, Form, Input} from "antd";
import {get} from "lodash";
import usePutQuery from "../../../hooks/api/usePutQuery.js";

const CreateEditUser = ({itemData, setIsModalOpen, refetch}) => {
    const [form] = Form.useForm();
    const { mutate, isLoading } = usePostQuery({
        listKeyId: KEYS.user_list,
    });
    const { mutate:mutateEdit, isLoading:isLoadingEdit } = usePutQuery({
        listKeyId: KEYS.user_list,
        hideSuccessToast: false
    });

    useEffect(() => {
        form.setFieldsValue({
            phoneNumber: get(itemData, 'phoneNumber'),
            region: get(itemData, 'region'),
            zone: get(itemData, 'zone'),
            fio: get(itemData, 'fio'),
        });
    }, [itemData]);

    const onFinish = (values) => {
        if (itemData) {
            mutateEdit(
                { url: `${URLS.user_edit}/${get(itemData, 'id')}`, attributes: values },
                {
                    onSuccess: () => {
                        setIsModalOpen(false);
                        refetch()
                    },
                }
            );
        } else {
            mutate(
                { url: URLS.user_add, attributes: values },
                {
                    onSuccess: () => {
                        setIsModalOpen(false);
                        refetch()
                    },
                }
            );
        }
    };

    return (
        <>
            <Form
                onFinish={onFinish}
                autoComplete="off"
                layout={"vertical"}
                form={form}
            >
                <Form.Item
                    label={"Ф.И.О"}
                    name="fio"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={"Телефон рақами"}
                    name="phoneNumber"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={"Ҳудуд"}
                    name="region"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={"Зона"}
                    name="zone"
                    rules={[{required: true,}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit" loading={isLoading || isLoadingEdit}>
                        {itemData ? "Таҳрирлаш" : "Яратиш"}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default CreateEditUser;
