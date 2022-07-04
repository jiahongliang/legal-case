/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
    Form, Input, Button, Space, Table, Popconfirm, Drawer, Result, message,
    Row, Col
} from 'antd';
import CaseStep from "../components/CaseStep";
import { caseTypeList, saveCaseType, removeCaseType } from "../../../../api/biz"
import "./index.css"

const CaseType = () => {
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

    const [stepData, setStepData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    let columns = [
        
        {
            title: '名称',
            dataIndex: 'name',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            width: 220
        },
        {
            title: '备注',
            dataIndex: 'memo',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: '步骤数量',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            width: 120,
            render: (_,record) => (record.caseTypeSteps.length)
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
        let params = {
            entity:{},
            pageNum: page - 1,
            pageSize,
            orderBy: "id asc"
        }
        caseTypeList(params).then(res => {
            setData(res.rows);
            setTotal(res.total)
        });
        setDataLoading(false);
    }

    const showDrawer = (r) => {
        if(r != null) {
            detailForm.setFieldsValue(r);
            setDetailId(r.id);
            setStepData(r.caseTypeSteps);
        }
        setDetailVisible(true);
    }

    const closeDrawer = () => {
        setDetailVisible(false);
        detailForm.resetFields();
        setDetailId(null);
        setSaveResult({code:null,message:null});
        setStepData([]);
    
    }

    const saveForm = (caseType) => {
        console.log('formdata',caseType)
        let params = {
            entity: {
                id: detailId,
                ...caseType,
                caseTypeSteps: stepData
            }
        }
        saveCaseType(params).then(res => {
            if(res.subCode === 0) {
                setSaveResult({code:"success",message:res.subMsg});
                loadData();
            } else {
                setSaveResult({code:"error",message:res.subMsg});
            }
        });
        setStepData([]);
    }

    const deleteData = (r) => {
        let params = {
            entity: {
                id: r.id
            }
        }
        removeCaseType(params).then(res => {
            message.success(res.subMsg);
            loadData();
        });
    }

    const onStepDataChange = (newStepData) => {
        setStepData(newStepData);
    }

    return (
        <div className="case-type-wrapper">
            <div className="toolbar-area">
                <Row>
                    <Col span={20}></Col>
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
                        <Form form={detailForm} layout="vertical" onFinish={saveForm}>
                            <Form.Item name="name" label="名称" rules={[{ required: true, message: '名称必须输入' }]}>
                                <Input placeholder="请输入名称" maxLength={50}/>
                            </Form.Item>
                            
                            <Form.Item label="办案环节" >
                                <CaseStep data={stepData} onChange={onStepDataChange}></CaseStep>
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

export default CaseType;