import { useState, useEffect } from "react";
import { Form, Select, Button, Row, Col, Space, Popconfirm, Table, Drawer, Input, Result } from "antd";
import { caseTypeList, caseTypeDefinitionList } from "../../../../api/biz"
import CaseStep from "../components/CaseStep";
import moment from 'moment'
import './index.css'

const { Option } = Select;
const {TextArea} = Input;

const CaseDefinition = () => {

    const [caseTypeData, setCaseTypeData] = useState([]);
    const [searchForm] = Form.useForm();
    const [detailId, setDetailId] = useState(null);
    const [data, setData] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [total, setTotal] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [detailForm] = Form.useForm();
    const [detailVisible, setDetailVisible] = useState(false);
    const [saveResult,setSaveResult] = useState({
        code: null,
        message: null
    })
    const [stepData, setStepData] = useState([]);

    let columns = [
        {
            title: '类型',
            dataIndex: 'typeId',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            render: (_, record) => {
                let typeArr = caseTypeData.filter( o => o.typeId === record.typeId) || [{name: ''}]
                return typeArr[0].name;
            },
            width: 120
        },
        {
            title: '名称',
            dataIndex: 'name',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            width: 160
        },
        {
            title: '步骤数量',
            dataIndex: 'stepCount',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            width: 80
        },
        {
            title: '事项数量',
            dataIndex: 'itemCount',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            width: 80
        },
        {
            title: '备注',
            dataIndex: 'memo',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            render: (_,record) => {
                if(record.status === 1) {
                    return (<span style={{color:"green"}}>正常</span>)
                }
                if(record.status === 0) {
                    return (<span style={{color:"Chartreuse"}}>禁用</span>)
                }
            },
            width: 50
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button size="small" onClick={() => showEditWindow(record)}>修改</Button>
                    <Popconfirm placement="left" title="锁定后用户不可以正常登录系统，确定锁定该用户吗？" onConfirm={() => deleteRecord(record)} okText="确认" cancelText="取消">
                        <Button size="small">删除</Button>
                    </Popconfirm>
                </Space>
            ),
            align: "center",
            width: 100
        }
    ];

    useEffect(() => {
        loadCaseTypeData();
    }, []);


    const loadCaseTypeData = () => {
        let params = {
            entity:{},
            pageNum: 0,
            pageSize: 1000,
            orderBy: "id asc"
        };

        caseTypeList(params).then(res => {
            setCaseTypeData(res.rows);
        });
    }

    const onFinishSearchForm = () => {
        loadData();
    }

    const loadData = () => {
        setDataLoading(true);
        let formData = searchForm.getFieldsValue();
        let param = {
            entity: {
                typeId: formData.typeId.length === 0 ? null : formData.typeId
            },
            pageNum: page - 1,
            pageSize,
            orderBy: "createdTime desc"

        };
        caseTypeDefinitionList(param).then(res => {
            setData(res.rows);
            setTotal(res.total)
        });
        setDataLoading(false);
    }

    const showDrawer = (record) => {
        if(record) {
            detailForm.setFieldsValue(record);
            setDetailId(record.id);
        }
        setDetailVisible(true);
    }

    const showEditWindow = (record) => {}

    const deleteRecord = (record) => {}

    const onTablePageChange = (page, pageSize, sorter, extra) => {
        setPage(page);
        setPageSize(pageSize);
        loadData();
    }

    const onSelectionChange = (selectedRowKeys, selectedRows, info) => {
        console.log("selectedRowKeys", selectedRowKeys)
        console.log("selectedRows", selectedRows)
        console.log("info", info)
    }

    const closeDrawer = () => {
        setDetailVisible(false);
        detailForm.resetFields();
        setDetailId(null);
        setSaveResult({code:null,message:null});
    }

    const saveForm = (caseType) => {
        let params = {
            entity: {
                id: detailId,
                ...caseType
            }
        }
        /*
        saveCaseType(params).then(res => {
            if(res.subCode === 0) {
                setSaveResult({code:"success",message:res.subMsg});
                loadData();
            } else {
                setSaveResult({code:"error",message:res.subMsg});
            }
        });*/
    }

    const deleteData = (r) => {
        let params = {
            entity: {
                id: r.id
            }
        }
        /*
        removeCaseType(params).then(res => {
            message.success(res.subMsg);
            loadData();
        });*/
    }

    const onCaseTypechange = ( option) => {
        if(option.key && option.key.length > 0) {
            detailForm.setFieldsValue({
                name: option.children + moment().format('YYYYMMDD')
            });
        }
    }

    const onStepDataChange = (newStepData) => {
        setStepData(newStepData);
    }
    

    const formItemLayout = {
        labelCol: {
          xs: {
            span: 20,
          },
          sm: {
            span: 3,
          },
        },
        wrapperCol: {
          xs: {
            span: 20,
          },
          sm: {
            span: 22,
          },
        },
      };

    return (
        <div className="case-type-definition-wrapper">
            <Row className="search-form">
                <Col span={20}>
                    <Form form={searchForm}
                        initialValues={{
                            typeId: ''
                        }} 
                        layout="inline"
                        onFinish={onFinishSearchForm}
                    >
                        <Form.Item name="typeId" label="类型">
                            <Select style={{ width: 120 }} size="medium">
                                <Option key="">请选择</Option>
                                {
                                    caseTypeData.map(ctd => (
                                        <Option key={ctd.id}>{ctd.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" size="small" htmlType="submit">
                                查询
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={4} style={{ textAlign: "right", padding: "3px 5px 0 0", lineHeight: "100%"}}>
                    <Button size="small" onClick={() => {showDrawer()}}>新增</Button>
                </Col>
            </Row>

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

            <Drawer title="详细信息" placement="right" width={800} visible={detailVisible} onClose={closeDrawer}>
                {
                    saveResult.code == null ? (
                        <Form form={detailForm} {... formItemLayout} labelAlign="right" onFinish={saveForm}>
                            <Form.Item name="typeId" label="类型" rules={[{ required: true, message: '类型必须选择' }]}>
                                <Select style={{ width: 120 }} size="medium" onChange={(_,option) => onCaseTypechange(option)}>
                                    <Option key="">请选择</Option>
                                    {
                                        caseTypeData.map(ctd => (
                                            <Option key={ctd.id}>{ctd.name}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item name="name" label="名称" rules={[{ required: true, message: '名称必须输入' }]}>
                                <Input placeholder="请输入名称" maxLength={50}/>
                            </Form.Item>
                            <Form.Item name="memo" label="备注">
                                <TextArea rows={4} />
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

export default CaseDefinition;