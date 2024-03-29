import { useEffect, useState, useRef } from "react";
import ControlledEditor from "../../../../components/ControlledEditor";
import { Form, Input, Button, Space, Table, Popconfirm, Drawer, Result, message, Row, Col, Upload, Select, Divider } from 'antd';
import { UploadOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { lawArticleList, saveLawArticle, removeLawArticle, lawArticleClassificationList, addLawArticleClassification, removeLawArticleClassification } from "../../../../api/biz"
import './index.css';

const LawArticle = () => {
    const [searchForm] = Form.useForm();

    const [data, setData] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [total, setTotal] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [classifications, setClassifications] = useState([]);
    const [classification, setClassification] = useState('');
    const [selectedClassification, setSelectedClassification] = useState(null);
    const inputRef = useRef(null);

    const [detailId, setDetailId] = useState(null);
    const [detailForm] = Form.useForm();
    const [detailContent, setDetailContent] = useState(null);
    const [initContent, setInitContent] = useState(null);
    const [detailFileList, setDetailFileList] = useState(null);
    const [attachment, setAttachment] = useState(null);
    const [detailVisible, setDetailVisible] = useState(false);
    const [saveResult, setSaveResult] = useState({
        code: null,
        message: null
    });

    useEffect(() => {
        loadData();
        loadClassificationData();
    }, []);

    useEffect(() => {
        loadData();
    }, [page]);

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
    }

    const loadData = () => {
        setDataLoading(true);
        let formData = searchForm.getFieldsValue();
        let params = {
            entity: {
                "titleSearch": formData.title,
                "title": selectedClassification
            },
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
        if (r != null) {
            detailForm.setFieldsValue(r);
            setDetailId(r.id);
            setInitContent(r.content);
            if (r.attachmentId) {
                var detailFile = { uid: r.attachmentId, name: r.attachmentName, status: 'done' };
                setDetailFileList([detailFile]);
                setAttachment({ id: r.attachmentId, name: r.attachmentName });
            }
        }
        setDetailVisible(true);
    }

    const closeDrawer = () => {
        setDetailVisible(false);
        detailForm.resetFields();
        setDetailId(null);
        setDetailContent(null);
        setInitContent(null);
        setDetailFileList(null);
        setAttachment(null);
        setSaveResult({ code: null, message: null });
    }

    const saveForm = (lawArticle) => {
        // console.log('formdata',lawArticle);return;
        let params = {
            entity: {
                ...lawArticle,
                content: detailContent,
                id: detailId,
                attachmentId: attachment ? attachment.id : null,
                attachmentName: attachment ? attachment.name : null
            }
        }
        saveLawArticle(params).then(res => {
            if (res.subCode === 0) {
                setSaveResult({ code: "success", message: res.subMsg });
                loadData();
            } else {
                setSaveResult({ code: "error", message: res.subMsg });
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

    const handleFileListChage = ({ file: newFile, fileList: newFileList }) => {
        setDetailFileList(newFileList);
        if (newFileList && newFileList.length > 0 && newFile.response && newFile.response.rows && newFile.response.rows.length > 0) {
            setAttachment(newFile.response.rows[0]);
        } else {
            setAttachment(null);
        }
    }

    const handleEditorContentChange = (content) => {
        setDetailContent(content);
    }

    const onClassificationChange = (event) => {
        setClassification(event.target.value);
    };

    const addItem = (e) => {
        e.preventDefault();
        if (classification && classification.length > 0) {
            addLawArticleClassification(classification).then(res => {
                setClassifications(res.rows);
            });
            setClassification('');
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    };

    const removeItem = (e) => {
        e.preventDefault();
        if (classification && classification.length > 0) {
            removeLawArticleClassification(classification).then(res => {
                setClassifications(res.rows);
            });
            setClassification('');
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    }

    const handleClassificationChange = (value) => {
        setSelectedClassification(value)
    }

    const loadClassificationData = () => {
        lawArticleClassificationList().then(res => {
            setClassifications(res.rows);
        })
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
                                <Input maxLength={10} placeholder="标题" allowClear={true} size="small" />
                            </Form.Item>
                            <Form.Item label="类别">
                                <Select
                                    style={{
                                        width: 300,
                                    }}
                                    allowClear={true}
                                    placeholder="请选择类别"
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider
                                                style={{
                                                    margin: '8px 0',
                                                }}
                                            />
                                            <Space
                                                style={{
                                                    padding: '0 8px 4px',
                                                }}
                                            >
                                                <Input
                                                    placeholder="输入名称"
                                                    ref={inputRef}
                                                    value={classification}
                                                    onChange={onClassificationChange}
                                                />
                                                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                                </Button>
                                                <Button type="text" icon={<MinusOutlined />} onClick={removeItem}>
                                                </Button>
                                            </Space>
                                        </>
                                    )}
                                    options={classifications.map((item) => ({
                                        label: item.name,
                                        value: item.name,
                                    }))}
                                    onChange={(value) => handleClassificationChange(value)}
                                />
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
                            <Button size="small" onClick={() => { showDrawer(null) }}>新增</Button>
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
                        <Form form={detailForm} layout="vertical" onFinish={saveForm} initialValues={{ orderValue: 100 }}>
                            <Form.Item name="title" label="名称" rules={[{ required: true, message: '名称必须输入' }]}>
                                <Input placeholder="请输入名称" maxLength={50} />
                            </Form.Item>

                            <Form.Item name="orderValue" label="序号" rules={[{ required: true, message: '名称必须输入' }]}>
                                <Input placeholder="请输入名称" maxLength={50} />
                            </Form.Item>

                            <Form.Item name="content" label="正文" rules={[{ required: true, message: '正文必须输入' }]}>
                                <ControlledEditor initContent={initContent} editorClassName="law-article-demo-editor" onEditorContentChange={handleEditorContentChange} />
                            </Form.Item>

                            <Upload
                                action="/legal-case/attachment/upload"
                                maxCount={1}
                                fileList={detailFileList}
                                onChange={handleFileListChage}
                            >
                                <Button icon={<UploadOutlined />}>上传附件</Button>
                            </Upload>

                            <Form.Item wrapperCol={{ offset: 0, span: 24 }} style={{ textAlign: "center" }}>
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