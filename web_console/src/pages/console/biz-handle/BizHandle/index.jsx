import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router';
import { Form, Input, Checkbox, Button, Select, Space, Popconfirm, Table } from 'antd'
import HandleExecution from "./components/HandleExecutionNew";
import { caseTypeList, caseExecutionList, completeCaseExecution, removeCaseExecution} from "../../../../api/biz"
import {LOGIN_USER_TOKEN} from '../../../../util/Constants'
import './index.css'

const { Option } = Select;

const statusOptions = [
    {
        label: '进行中',
        value: '1',
    },
    {
        label: '已完成',
        value: '2',
    }
];

const BizHandle = () => {
    const [searchForm] = Form.useForm();
    const [dataLoading, setDataLoading] = useState(false);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [caseTypeData, setCaseTypeData] = useState([]);

    const [detailData, setDetailData] = useState(null)

    let navigate = useNavigate();

    useEffect(() => {
        loadCaseTypeData();
        loadData();
    }, []);

    useEffect(() => {
        loadData();
    }, [page]);

    const loadCaseTypeData = () => {
        let params = {
            entity:{},
            pageNum: 0,
            pageSize: 1000,
            orderBy: "id asc"
        }
        caseTypeList(params).then(res => {
            setCaseTypeData(res.rows);
        });
    }

    const handleFinishSearchForm = (searchData) => {
        loadData();
    }

    const handleCaseExecution = (record) => {
        setDetailData(record);
    }

    const exitHandleCaseExecution = () => {
        setDetailData(null);
    }

    const handleSaveSuccess = () => {
        exitHandleCaseExecution();
        loadData();
    }
    
    const handleFinishExecution = (record) => {
        let param = {
            entity: {
                id: record.id
            }
        }
        completeCaseExecution(param).then(res => {
            loadData();
        });
    }

    const onTablePageChange = (page, pageSize) => {
        setPage(page);
        setPageSize(pageSize);
    }

    const loadData = () => {
        setDataLoading(true);
        let searchData = searchForm.getFieldsValue();
        let param = {
            entity: {
                typeId: searchData.typeId,
                nameSearch: searchData.name,
                // suspects: searchData.suspects,
                createdBy: sessionStorage.getItem(LOGIN_USER_TOKEN) == null ? null : JSON.parse(sessionStorage.getItem(LOGIN_USER_TOKEN)).id
            },
            where: searchData.status && searchData.status.length > 0 ? [
                {
                    field: "status",
                    opt: "in",
                    value: searchData.status.join()
                }
            ] : [{
                field: "status",
                opt: "in",
                value: "1,2"
            }],
            pageNum: page - 1,
            pageSize,
            orderBy: "createdTime desc"

        };
        caseExecutionList(param).then(res => {
            // console.log(res)
            setData(res.rows);
            setTotal(res.total)
        });

        setDataLoading(false);
    }

    const onSelectionChange = (selectedRowKeys, selectedRows, info) => {
        // console.log("selectedRowKeys", selectedRowKeys)
        // console.log("selectedRows", selectedRows)
        // console.log("info", info)
    }
    
    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: '类型',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            render: (_,record) => {
                let caseType = caseTypeData.find(ct => ct.id === record.typeId);
                return caseType ? caseType.name : ''
            },
            width: 120
            
        },
        {
            title: '环节',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            render: (_,record) => {
                let total = 0;
                let rest = 0;
                if(record.steps) {
                    total = record.steps.length;
                }
                rest = record.steps.filter(step => {
                    if(step.caseTypeStepItems) {
                        return step.caseTypeStepItems.filter(item => item.status === 1).length > 0;
                    } else {
                        return false;
                    }
                    
                }).length;
                return rest + "/" + total;
            },
            width: 80
        },
        {
            title: '事项',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            render: (_,record) => {
                let totalCount = 0;
                let restCount = 0;
                record.steps.forEach(step => {
                    if(step.caseTypeStepItems) {
                        totalCount += step.caseTypeStepItems.length;
                        restCount += step.caseTypeStepItems.filter(item => item.status === 1).length;
                    }
                    
                });
                return restCount + "/" + totalCount;
            },
            width: 80
        },
        {
            title: '办案人',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            render: (_,record) => {
                return ((record.ownerDept ? ("[" + record.ownerDept + "]") : '') + (record.owner ? record.owner : ''))
            },
            width: 120
            
        },
        {
            title: '填写人',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            render: (_,record) => {
                return ((record.creatorDept ? ("[" + record.creatorDept + "]") : '') + (record.creator ? record.creator : ''))
            },
            width: 120
            
        },
        {
            title: '创建时间',
            dataIndex: 'createdTime',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            width: 180
        },
        {
            title: '状态',
            dataIndex: 'status',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            render: (_,record) => {
                if(record.status === 1) {
                    return (<span style={{color:"green"}}>进行中</span>)
                }
                if(record.status === 2) {
                    return (<span style={{color:"Gray"}}>已完成</span>)
                }
            },
            width: 60
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button size="small" onClick={() => handleCaseExecution(record)}>办理</Button>
                    {
                        record.status === 1 ? (
                            <Popconfirm placement="left" title="确定完成该案件吗？" onConfirm={() => handleFinishExecution(record)} okText="确认" cancelText="取消">
                                <Button size="small">完成</Button>
                            </Popconfirm>
                        ) : (<Button size="small" disabled={true}>完成</Button>)
                    }
                    <Popconfirm placement="left" title="确定删除该案件吗？" onConfirm={() => handleRemove(record)} okText="确认" cancelText="取消">
                        <Button size="small">删除</Button>
                    </Popconfirm>
                </Space>
            ),
            align: "center",
            width: 100
        }
    ];

    const createNewInstance = () => {
        navigate("/console/biz-handle/new-instance");
    }

    const handleRemove = (data) => {
        let param = {
            entity: data
        }
        removeCaseExecution(param).then(res => {
            loadData();
        });
    }

    return detailData == null ? (
        <>
            <Form form={searchForm} initialValues={{
                status: ['1', '2']
            }}
                layout="inline"
                className="search-form"
                onFinish={handleFinishSearchForm}
            >
                <Form.Item name="typeId" label="类型">
                    <Select style={{width: "160px"}} allowClear={true} size="small">
                        <Option value="">请选择</Option>
                        {
                            caseTypeData.map(caseType => (
                                <Option value={caseType.id} key={caseType.id}>{caseType.name}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item name="name" label="名称">
                    <Input maxLength={10} placeholder="请输入名称" allowClear={true} size="small" />
                </Form.Item>

                {
                    /**
                     * 
                <Form.Item name="suspects" label="对象">
                    <Input maxLength={10} placeholder="请输入对象" size="small" />
                </Form.Item>
                     */
                }

                <Form.Item name="status" label="状态">
                    <Checkbox.Group options={statusOptions} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" size="small" htmlType="submit">
                        查询
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button size="small" onClick={createNewInstance}>
                        新增
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
                rowSelection={{
                    type: "checkbox",
                    onChange: onSelectionChange
                }}
            ></Table>
        </>
    ) : (
        <HandleExecution data={detailData} caseTypeData={caseTypeData} onExit={exitHandleCaseExecution} onSaveSuccess={handleSaveSuccess}></HandleExecution>
    )
}


export default BizHandle;