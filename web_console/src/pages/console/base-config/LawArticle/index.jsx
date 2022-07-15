import { useEffect, useState } from "react";
import { Form, Input, Button, Space, Table, Popconfirm, Drawer, Result, message, Row, Col } from 'antd';
import { lawArticleList, saveLawArticle, removeLawArticle } from "../../../../api/biz"
import './index.css';

const LawArticle = () => {
    const [searchForm] = Form.useForm();

    const [data, setData] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [total, setTotal] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [detailId, setDetailId] = useState(null);
    const [detailForm] = Form.useForm();
    const [detailVisible, setDetailVisible] = useState(false);
    const [saveResult,setSaveResult] = useState({
        code: null,
        message: null
    });

    useEffect(() => {
        loadData();
    }, []);

    let columns = [
        
        {
            title: '名称',
            dataIndex: 'title',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
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
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button size="small" onClick={() => { showDrawer(record) }}>修改</Button>
                    <Popconfirm placement="left" title="确定删除该类型吗？" onConfirm={() => { deleteData(record) }} okText="确认" cancelText="取消">
                        <Button size="small">删除</Button>
                    </Popconfirm>
                </Space>
            ),
            align: "center",
            width: 100
        }
    ];

    const onTablePageChange = (page, pageSize, sorter, extra) => {
        setPage(page);
        setPageSize(pageSize);
        loadData();
    }

    const loadData = () => {
        setDataLoading(true);
        let formData = searchForm.getFieldsValue();
        let params = {
            entity: formData,
            pageNum: page - 1,
            pageSize,
            orderBy: "orderValue asc"
        }
        lawArticleList(params).then(res => {
            setData(res.rows);
            setTotal(res.total)
        });
        setDataLoading(false);
    }

    const showDrawer = (r) => {
        if(r != null) {
            detailForm.setFieldsValue(r);
            setDetailId(r.id);
        }
        setDetailVisible(true);
    }

    const closeDrawer = () => {
        setDetailVisible(false);
        detailForm.resetFields();
        setDetailId(null);
        setSaveResult({code:null,message:null});
    }

    const saveForm = (lawArticle) => {
        // console.log('formdata',lawArticle)
        let params = {
            entity: {
                id: detailId,
                ...lawArticle
            }
        }
        saveLawArticle(params).then(res => {
            if(res.subCode === 0) {
                setSaveResult({code:"success",message:res.subMsg});
                loadData();
            } else {
                setSaveResult({code:"error",message:res.subMsg});
            }
        });
    }

    const deleteData = (r) => {
        let params = {
            entity: {
                id: r.id
            }
        }
        removeLawArticle(params).then(res => {
            message.success(res.subMsg);
            loadData();
        });
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
                        <Form.Item name="title" label="标题">
                            <Input maxLength={10} placeholder="标题" size="small"/>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" size="small" htmlType="submit">
                                查询
                            </Button>
                        </Form.Item>
                    </Form>
                    </Col>
                    <Col span={4}>
                        <div style={{ textAlign: "right", padding: "0 5px 0 0" }}>
                            <Button size="small" onClick={() => {showDrawer(null)}}>新增</Button>
                        </div>
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
                rowSelection={{
                    type: "checkbox"
                }}
            ></Table>
            <Drawer title="详细信息" placement="right" width={800} visible={detailVisible} onClose={closeDrawer}>
                {
                    saveResult.code == null ? (
                        <Form form={detailForm} layout="vertical" onFinish={saveForm} initialValues={{orderValue: 100}}>
                            <Form.Item name="title" label="名称" rules={[{ required: true, message: '名称必须输入' }]}>
                                <Input placeholder="请输入名称" maxLength={50}/>
                            </Form.Item>

                            <Form.Item name="orderValue" label="序号" rules={[{ required: true, message: '名称必须输入' }]}>
                                <Input placeholder="请输入名称" maxLength={50}/>
                            </Form.Item>

                            <Form.Item name="content" label="正文" rules={[{ required: true, message: '正文必须输入' }]}>
                                <Input.TextArea placeholder="请输入法律详情" style={{
                                    height: 560,
                                }} />
                            </Form.Item>
                            
                            <Form.Item wrapperCol= {{ offset: 0, span: 24 }} style={{textAlign: "center"}}>
                                <Button type="primary" htmlType="submit">
                                    保存
                                </Button> &nbsp;
                                <Button onClick={closeDrawer}>取消</Button>
                            </Form.Item>
                        </Form>
                    ) : (
                        <Result status={saveResult.code} 
                            title={saveResult.message} 
                            extra={[<Button key={"btn_" + saveResult.code} 
                            onClick={closeDrawer}>关闭</Button>]}>
                        </Result>
                    )
                }
            </Drawer>
        </div>
    );
}

export default LawArticle;