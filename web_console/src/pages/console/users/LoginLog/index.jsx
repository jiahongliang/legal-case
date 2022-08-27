import { useEffect, useState } from "react";
import { Form, Input, Button, Table} from 'antd';
import { loginLogList } from '../../../../api/user'
import './index.css'

const LoginLog = () => {
    const [searchForm] = Form.useForm();
    const [dataLoading, setDataLoading] = useState(false);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);


    let columns = [
        {
            title: '登录人',
            dataIndex: 'name',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: 'IP地址',
            dataIndex: 'ip',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: '设备类型',
            dataIndex: 'deviceType',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: '浏览器',
            dataIndex: 'browser',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: '操作系统',
            dataIndex: 'system',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: '登录时间',
            dataIndex: 'createdTime',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: '退出时间',
            dataIndex: 'endTime',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
    ];

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        loadData();
    }, [page]);

    const onFinishSearchForm = () => {
        loadData();
    }

    const loadData = () => {
        setDataLoading(true);
        let formData = searchForm.getFieldsValue();
        let param = {
            entity: {
                name: formData.name
            },
            pageNum: page - 1,
            pageSize,
            orderBy: "createdTime desc"

        };
        loginLogList(param).then(res => {
            setData(res.rows);
            setTotal(res.total)
        });
        setDataLoading(false);
    }

    const onTablePageChange = (page, pageSize, sorter, extra) => {
        setPage(page);
        setPageSize(pageSize);
    }

    return (
        <div className="user-manage-wrapper">
            <Form form={searchForm}
            layout="inline"
            className="search-form"
            onFinish={onFinishSearchForm}
            >
               

                <Form.Item name="name" label="姓名">
                    <Input maxLength={10} placeholder="姓名" size="small"/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" size="small" htmlType="submit">
                        查询
                    </Button>
                </Form.Item>
            </Form>

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
            ></Table>
            
        </div>
    );
}

export default LoginLog;