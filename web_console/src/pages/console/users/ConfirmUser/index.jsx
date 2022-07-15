import { useEffect, useState } from "react";
import { Button, Space, Table, Popconfirm, message } from 'antd';
import { userList, userAction } from '../../../../api/user'
import './index.css'

const ToBeConfirmed = () => {
    const [dataLoading, setDataLoading] = useState(false);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    let columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: '性别',
            dataIndex: 'gender',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: '单位',
            dataIndex: 'deptName',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: '手机',
            dataIndex: 'mobile',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: '备注',
            dataIndex: 'memo',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: '申请时间',
            dataIndex: 'createdTime',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm placement="left" title="通过后用户就可以正常登录系统，确定通过该用户吗？" onConfirm={() => confirmUser(record)} okText="确认" cancelText="取消">
                        <Button size="small">通过</Button>
                    </Popconfirm>
                    <Popconfirm placement="left" title="拒绝后用户将会被删除,确定拒绝该用户吗?" onConfirm={() => denyUser(record)} okText="确认" cancelText="取消">
                        <Button size="small">拒绝</Button>
                    </Popconfirm>
                </Space>
            ),
            align: "center",
            width: 100
        }
    ];

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setDataLoading(true);
        let param = {
            entity: {
                status: 0
            },
            pageNum: page - 1,
            pageSize,
            orderBy: "createdTime desc"

        };
        userList(param).then(res => {
            setData(res.rows);
            setTotal(res.total)
        });
        setDataLoading(false);
    }

    const onTablePageChange = (page, pageSize, sorter, extra) => {
        setPage(page);
        setPageSize(pageSize);
        loadData();
    }

    const confirmUser = (r) => {
        let param = {
            entity: {
                id: r.id
            },
            ext: "confirm"
        }
        userAction(param).then(res => {
            message.success(res.msg);
            loadData();
        })
    }
    const denyUser = (r) => {
        let param = {
            entity: {
                id: r.id
            },
            ext: "deny"
        }
        userAction(param).then(res => {
            message.success(res.msg);
            loadData();
        })
    }

    const onSelectionChange = (selectedRowKeys, selectedRows, info) => {
        // console.log("selectedRowKeys", selectedRowKeys)
        // console.log("selectedRows", selectedRows)
        // console.log("info", info)
    }

    return (
        <div className="user-confirm-wrapper">
            <Table
                columns={columns}
                dataSource={data}
                loading={dataLoading}
                pagination={{
                    position: ["bottomRight"],
                    total: total,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total) => `共${total}条`,
                    size: "small",
                    current: page,
                    pageSize: pageSize,
                    onChange: onTablePageChange
                }}
                scroll={{
                    scrollToFirstRowOnChange: true,
                    x: true
                }}
                bordered="true"
                size="small"
                rowKey="id"
                rowSelection={{
                    type: "checkbox",
                    onChange: onSelectionChange
                }}
            ></Table>
        </div>
    );
}

export default ToBeConfirmed;