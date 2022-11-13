import { useEffect, useState } from "react";
import { Form, Input, Button, Table, Row, Col } from 'antd';
import { serviceReminderList } from "../../../../api/biz"
import './index.css';

const ServiceReminder = () => {
    const [searchForm] = Form.useForm();

    const [data, setData] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [total, setTotal] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        loadData();
    }, [page]);

    let columns = [
        
        {
            title: '文件名称',
            dataIndex: 'fileName',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            render: (text,record) => <a href={'/legal-case/attachment/get/' + record.attachmentId} target='_blank'>{text}</a>,
        },
        /*
        {
            title: '序号',
            dataIndex: 'orderValue',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            width: 80
        },
        {
            title: '录入时间',
            dataIndex: 'createdTime',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            width: 170
        },*/
    ];

    const onTablePageChange = (page, pageSize, sorter, extra) => {
        setPage(page);
        setPageSize(pageSize);
    }

    const loadData = () => {
        setDataLoading(true);
        let formData = searchForm.getFieldsValue();
        let params = {
            entity: {
                "fileName": formData.fileName
            },
            pageNum: page - 1,
            pageSize,
            orderBy: "orderValue asc"
        }
        serviceReminderList(params).then(res => {
            setData(res.rows);
            setTotal(res.total)
        });
        setDataLoading(false);
    }

    return (
        <div className="case-type-wrapper">
            <div className="toolbar-area">
                <Row>
                    <Col span={20}>
                    <Form form={searchForm} 
                        layout="inline"
                        onFinish={() => loadData()}
                        >
                        <Form.Item name="fileName" label="文件名称">
                            <Input maxLength={10} placeholder="" allowClear={true} size="small"/>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" size="small" htmlType="submit">
                                查询
                            </Button>
                        </Form.Item>
                    </Form>
                    </Col>
                    <Col span={4}>
                        
                    </Col>
                </Row>
            </div>

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

export default ServiceReminder;