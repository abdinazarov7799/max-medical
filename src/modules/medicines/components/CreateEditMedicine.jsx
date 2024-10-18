import React, {useEffect} from 'react';
import usePostQuery from "../../../hooks/api/usePostQuery.js";
import {KEYS} from "../../../constants/key.js";
import {URLS} from "../../../constants/url.js";
import {Button, Form, Input} from "antd";
import {get} from "lodash";
import usePutQuery from "../../../hooks/api/usePutQuery.js";

const CreateEditMedicine = ({itemData, setIsModalOpen, refetch}) => {
    const [form] = Form.useForm();
    const { mutate, isLoading } = usePostQuery({
        listKeyId: KEYS.medicine_list,
    });
    const { mutate:mutateEdit, isLoading:isLoadingEdit } = usePutQuery({
        listKeyId: KEYS.medicine_list,
        hideSuccessToast: false
    });

    useEffect(() => {
        form.setFieldsValue({
            name: get(itemData, 'name'),
        });
    }, [itemData]);

    const onFinish = (values) => {
        if (itemData) {
            mutateEdit(
                { url: `${URLS.medicine_edit}/${get(itemData, 'id')}`, attributes: values },
                {
                    onSuccess: () => {
                        setIsModalOpen(false);
                        refetch()
                    },
                }
            );
        } else {
            mutate(
                { url: URLS.medicine_add, attributes: values },
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
                    label={"Номи"}
                    name="name"
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

export default CreateEditMedicine;
