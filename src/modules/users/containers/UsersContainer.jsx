import React, {useState} from 'react';
import Container from "../../../components/Container.jsx";
import {get} from "lodash";
import {Button, Input, Modal, Pagination, Popconfirm, Row, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import usePaginateQuery from "../../../hooks/api/usePaginateQuery.js";
import {KEYS} from "../../../constants/key.js";
import {URLS} from "../../../constants/url.js";
import useDeleteQuery from "../../../hooks/api/useDeleteQuery.js";
import CreateEditUser from "../components/CreateEditUser.jsx";

const UsersContainer = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [itemData, setItemData] = useState(null);
    const [searchKey, setSearchKey] = useState();
    const [isCreateModalOpenCreate, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const {data, isLoading, refetch} = usePaginateQuery({
        key: KEYS.user_list,
        url: URLS.user_list,
        params: {
            size,
            search: searchKey
        },
        page
    });
    const { mutate } = useDeleteQuery({
        listKeyId: KEYS.user_list
    });
    const useDelete = (id) => {
        mutate({url: `${URLS.user_delete}/${id}`}, {
            onSuccess: () => {
                refetch();
            }
        })
    }
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Ф.И.О",
            dataIndex: "fio",
            key: "fio",
        },
        {
            title: "Телефон рақами",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Ҳудуд",
            dataIndex: "region",
            key: "region",
        },
        {
            title: "Зона",
            dataIndex: "zone",
            key: "zone",
        },
        {
            title: "Таҳрирлаш / Ўчириш",
            width: 120,
            fixed: 'right',
            key: 'action',
            render: (props, data, index) => (
                <Space key={index}>
                    <Button icon={<EditOutlined />} onClick={() => {
                        setIsEditModalOpen(true)
                        setItemData(data)
                    }} />
                    <Popconfirm
                        title="Ўчириш"
                        description="Ўчиришни тасдиқлайсизми?"
                        onConfirm={() => useDelete(get(data, 'id'))}
                        okText="Ҳа"
                        cancelText="Йўқ"
                    >
                        <Button danger icon={<DeleteOutlined />}/>
                    </Popconfirm>
                </Space>
            )
        }
    ]
    return (
        <Container>
            <Space direction={"vertical"} style={{width: "100%"}} size={"middle"}>
                <Space size={"middle"}>
                    <Input.Search
                        placeholder="Қидириш"
                        onChange={(e) => setSearchKey(e.target.value)}
                        allowClear
                    />
                    <Button
                        icon={<PlusOutlined />}
                        type={"primary"}
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        Янги фойдаланувчи
                    </Button>
                </Space>

                <Table
                    columns={columns}
                    dataSource={get(data, 'data.content', [])}
                    bordered
                    size={"middle"}
                    pagination={false}
                    loading={isLoading}
                />

                <Row justify={"end"} style={{marginTop: 10}}>
                    <Pagination
                        current={page + 1}
                        onChange={(page) => setPage(page - 1)}
                        total={get(data, 'data.totalPages') * 10 }
                        showSizeChanger={false}
                    />
                </Row>
            </Space>

            <Modal
                title="Янги фойдаланувчи яратиш"
                open={isCreateModalOpenCreate}
                onCancel={() => setIsCreateModalOpen(false)}
                footer={null}
            >
                <CreateEditUser
                    setIsModalOpen={setIsCreateModalOpen}
                    refetch={refetch}
                />
            </Modal>

            <Modal
                title="Фойдаланувчини таҳрирлаш"
                open={isEditModalOpen}
                onCancel={() => setIsEditModalOpen(false)}
                footer={null}
            >
                <CreateEditUser
                    itemData={itemData}
                    setIsModalOpen={setIsEditModalOpen}
                    refetch={refetch}
                />
            </Modal>
        </Container>
    );
};

export default UsersContainer;
