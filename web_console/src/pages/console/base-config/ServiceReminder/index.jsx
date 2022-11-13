import { useEffect, useState } from "react";
import { Form, Input, Button, Space, Table, Popconfirm, Drawer, Result, message, Row, Col, Upload, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { serviceReminderList, saveServiceReminder, removeServiceReminder } from "../../../../api/biz"
import './index.css';

const ServiceReminder = () => {
    const [searchForm] = Form.useForm();

    const [data, setData] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [total, setTotal] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [detailId, setDetailId] = useState(null);
    const [detailForm] = Form.useForm();
    const [detailFileList, setDetailFileList] = useState(null);
    const [attachment, setAttachment] = useState(null);
    const [detailVisible, setDetailVisible] = useState(false);
    const [saveResult,setSaveResult] = useState({
        code: null,
        message: null
    });
    const [uploadFileError, setUploadFileError] = useState(false);

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

    const showDrawer = (r) => {
        if(r != null) {
            detailForm.setFieldsValue(r);
            setDetailId(r.id);
            if(r.attachmentId) {
                var detailFile = {uid: r.attachmentId,name:r.fileName,status: 'done'};
                setDetailFileList([detailFile]);
                setAttachment({id: r.attachmentId,name: r.fileName});
            }
        }
        setDetailVisible(true);
    }

    const closeDrawer = () => {
        setDetailVisible(false);
        detailForm.resetFields();
        setDetailId(null);
        //setDetailContent(null);
        //setInitContent(null);
        setUploadFileError(false);
        setDetailFileList(null);
        setAttachment(null);
        setSaveResult({code:null,message:null});
    }

    const saveForm = (serviceReminder) => {
        // console.log('formdata',lawArticle);return;
        if(!attachment) {
            setUploadFileError(true);
            return;
        }
        let params = {
            entity: {
                ...serviceReminder,
                id: detailId,
                attachmentId: attachment ? attachment.id : null
            }
        }
        //console.log(params);
        //return;
        saveServiceReminder(params).then(res => {
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
        removeServiceReminder(params).then(res => {
            message.success(res.subMsg);
            loadData();
        });
    }

    const handleFileListChange = ({ file: newFile, fileList: newFileList }) => {
        setDetailFileList(newFileList);
        if(newFileList && newFileList.length > 0 && newFile.response && newFile.response.rows && newFile.response.rows.length > 0) {
            setAttachment(newFile.response.rows[0]);
            setUploadFileError(false);
        } else {
            setAttachment(null);
            setUploadFileError(true);
        }
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
                        <Form form={detailForm} layout="vertical" onFinish={saveForm} initialValues={{orderValue: 100}} >
                            <Upload
                                action="/legal-case/attachment/upload"
                                maxCount={1}
                                fileList={detailFileList}
                                onChange={handleFileListChange}
                                >
                                <Button icon={<UploadOutlined />}>上传文件</Button>
                            </Upload>
                            <div className="errorMessage">{uploadFileError ? '错误：请上传完文件': ''}</div>

                            <Form.Item name="orderValue" label="序号" rules={[{ required: true,  message: '序号必须输入,且是数字类型'}]}>
                                <InputNumber placeholder="请输入序号" maxLength={50} style={{
                                    width: '100%',
                                }}/>
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

export default ServiceReminder;