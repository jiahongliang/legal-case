import { useEffect, useState } from "react";
import { Form, Input, Checkbox, Button, Select, Space,  Table } from 'antd'
import HandleExecution from "./components/HandleExecution";
import { caseTypeList, caseExecutionList, caseExecutionExcel } from "../../../../api/biz"
import {userList} from "../../../../api/user"
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

    const [detailData, setDetailData] = useState(null);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        loadCaseTypeData();
        loadData();
        loadUserData();
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

    const loadUserData = () => {
        let param = {
            entity: {},
            where: [{
                field: "status",
                opt: "in",
                value: "1,2"
            }],
            pageNum: 0,
            pageSize: 1000,
            orderBy: "id asc"

        };
        userList(param).then(res => {
            setUserData(res.rows);
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
    

    const onTablePageChange = (page, pageSize) => {
        setPage(page);
        setPageSize(pageSize);
    }

    const loadData = () => {
        setDataLoading(true);
        let searchData = searchForm.getFieldsValue();
        // console.log('searchData',searchData);
        let param = {
            entity: {
                typeId: searchData.typeId,
                nameSearch: searchData.name
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

        if(searchData.creator && searchData.creator.trim().length > 0) {
            // console.log('creator is inputed')
            let createdBys = userData.filter(user => user.nameSearch.indexOf(searchData.creator) > -1).map(user => user.id + '').join();
            if(createdBys.trim().length === 0) {
                createdBys = '0';
            }
            param.where.push({
                field: "createdBy",
                opt: "in",
                value: createdBys
            });
        }

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
                return caseType ? caseType.name : '.name'
            },
            width: 120
            
        },
        {
            title: '负责人',
            dataIndex: 'createdBy',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            render: (_,record) => userData.length > 0 ? userData.find(user => user.id === record.createdBy).name : '',
            width: 80
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
                    <Button size="small" onClick={() => handleCaseExecution(record)}>查看</Button>
                </Space>
            ),
            align: "center",
            width: 100
        }
    ];

    const exportExcel = () => {
        
        setDataLoading(true);
        let searchData = searchForm.getFieldsValue();
        // console.log('searchData',searchData);
        let param = {
            entity: {
                typeId: searchData.typeId,
                name: searchData.name
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

        if(searchData.creator && searchData.creator.trim().length > 0) {
            // console.log('creator is inputed')
            let createdBys = userData.filter(user => user.name.indexOf(searchData.creator) > -1).map(user => user.id + '').join();
            if(createdBys.trim().length === 0) {
                createdBys = '0';
            }
            param.where.push({
                field: "createdBy",
                opt: "in",
                value: createdBys
            });
        }

        caseExecutionExcel(param).then(res => {
            let blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8text/plain;charset=utf-8'});
            // 获取heads中的filename文件名
            let downloadElement = document.createElement("a");
            // 创建下载的链接
            let href = window.URL.createObjectURL(blob);
            downloadElement.href = href;
            // 下载后文件名
            downloadElement.download = "案件管理";
            document.body.appendChild(downloadElement);
            // 点击下载
            downloadElement.click();         // 下载完成移除元素
            document.body.removeChild(downloadElement);
        });

        setDataLoading(false);
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

                <Form.Item name="creator" label="负责人">
                    <Input maxLength={10} placeholder="请输入负责人" allowClear={true} size="small" />
                </Form.Item>

                <Form.Item name="status" label="状态">
                    <Checkbox.Group options={statusOptions} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" size="small" htmlType="submit">
                        查询
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button  size="small" onClick={exportExcel}>
                        导出
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
        <HandleExecution data={detailData} caseTypeData={caseTypeData} userData={userData} onExit={exitHandleCaseExecution} onSaveSuccess={handleSaveSuccess}></HandleExecution>
    )
}

export default BizHandle;