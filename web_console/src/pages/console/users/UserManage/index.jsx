import { useEffect, useState } from "react";
import { Form, Checkbox, Input, Button, Space, Table, Popconfirm, Drawer, Select, Result, message, Tag} from 'antd';
import { userList, userAction, saveUser, roleList, resetPassword } from '../../../../api/user'
import './index.css'

const { Option } = Select;
const { TextArea } = Input;

const statusOptions = [
    {
        label: '正常',
        value: '1',
    },
    {
        label: '锁定',
        value: '2',
    }
];

const UserManagePage = () => {
    const [searchForm] = Form.useForm();
    const [dataLoading, setDataLoading] = useState(false);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const [infoVisible,setInfoVisible] = useState(false);
    const [userInfoForm] = Form.useForm();
    const [userInfoId, setUserInfoId] = useState(null);
    const [userInfoSaveResult, setUserInfoSaveResult] = useState({
        code: null,
        msg: null
    });

    const [roleData, setRoleData] = useState([]);

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
            title: '角色',
            dataIndex: 'role',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            render: (_,record) => {
                if(record.role && record.role.length > 0) {
                    let roleArr = record.role.split(',');
                    return roleArr.map(o => (
                        <Tag key={o}>
                            {
                                roleData && roleData.length > 0 ? roleData.find(rd => {
                                    return rd.code === o;
                                }).name : ' '
                            }
                        </Tag>
                    ))
                }
                return '';
            }
        },
        {
            title: '注册时间',
            dataIndex: 'createdTime',
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
                if(record.status === 2) {
                    return (<span style={{color:"Gray"}}>锁定</span>)
                }
                if(record.status === 0) {
                    return (<span style={{color:"Chartreuse"}}>未确认</span>)
                }
                if(record.status === -1) {
                    return (<span style={{color:"red"}}>已拒绝</span>)
                }
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button size="small" onClick={() => showEditUserWindow(record)}>修改</Button>
                    {
                        record.status === 1 ? (
                            <Popconfirm placement="left" title="锁定后用户不可以正常登录系统，确定锁定该用户吗？" onConfirm={() => lockUser(record)} okText="确认" cancelText="取消">
                                <Button size="small">锁定</Button>
                            </Popconfirm>
                        ) : "" 
                    }
                    {
                        record.status === 2 ? (
                            <Popconfirm placement="left" title="解锁后用户可以正常登录系统,确定解锁该用户吗?" onConfirm={() => unlockUser(record)} okText="确认" cancelText="取消">
                                <Button size="small">解锁</Button>
                            </Popconfirm>
                        ) : ""
                    }
                </Space>
            ),
            align: "center",
            width: 100
        }
    ];

    useEffect(() => {
        loadData();
        loadRoleData();
    }, []);

    useEffect(() => {
        loadData();
    }, [page]);

    const onFinishSearchForm = () => {
        loadData();
    }

    const loadRoleData = () => {
        roleList().then(res => {
            setRoleData(res.rows);
        });
    }

    const loadData = () => {
        setDataLoading(true);
        let formData = searchForm.getFieldsValue();
        let param = {
            entity: {
                name: formData.name,
                deptName: formData.deptName
            },
            where: formData.status && formData.status.length > 0 ? [
                {
                    field: "status",
                    opt: "in",
                    value: formData.status.join()
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
        userList(param).then(res => {
            setData(res.rows);
            setTotal(res.total)
        });
        setDataLoading(false);
    }

    const onTablePageChange = (page, pageSize, sorter, extra) => {
        setPage(page);
        setPageSize(pageSize);
    }

    const showEditUserWindow = (r) => {
        setInfoVisible(true);
        userInfoForm.setFieldsValue(r);
        if(r.role && r.role.length > 0) {
            userInfoForm.setFieldsValue({roleArray:r.role.split(',')});
        }
        setUserInfoId(r.id);
    }

    const lockUser = (r) => {
        let param = {
            entity: {
                id: r.id
            },
            ext: "lock"
        }
        userAction(param).then(res => {
            message.success(res.msg);
            loadData();
        })
    }
    const unlockUser = (r) => {
        let param = {
            entity: {
                id: r.id
            },
            ext: "unlock"
        }
        userAction(param).then(res => {
            message.success(res.msg);
            loadData();
        })
    }

    const onSelectionChange = (selectedRowKeys, selectedRows, info) => {
        setSelectedKeys(selectedRowKeys);
    }

    const closeDrawer = () => {
        setInfoVisible(false);
        userInfoForm.resetFields();
        setUserInfoId(null);
        setUserInfoSaveResult({code:null,msg:null});
    }

    const saveUserInfo = (userInfo) => {
        let params = {
            entity: {
                id: userInfoId,
                role: userInfo.roleArray.join(','),
                ...userInfo
            }
        }
        saveUser(params).then(res => {
            if(res.subCode === 0) {
                setUserInfoSaveResult({code:"success",msg:res.subMsg});
                loadData();
            } else {
                setUserInfoSaveResult({code:"error",msg:res.subMsg});
            }
        });
    }

    const resetUserPassword = () => {
        if(selectedKeys && selectedKeys.length > 0) {
            let params = {
                entity: selectedKeys
            }
            resetPassword(params).then(res => {
                if(res.subCode === 0) {
                    message.success(res.subMsg);
                } else {
                    message.error(res.subMsg);
                }
            })
        }
    }

    return (
        <div className="user-manage-wrapper">
            <Form form={searchForm} initialValues={{
                status: ['1','2']
            }} 
            layout="inline"
            className="search-form"
            onFinish={onFinishSearchForm}
            >
               

                <Form.Item name="name" label="姓名">
                    <Input maxLength={10} placeholder="姓名" size="small"/>
                </Form.Item>

                <Form.Item name="deptName" label="部门">
                    <Input maxLength={10} placeholder="部门名称" size="small"/>
                </Form.Item>

                <Form.Item name="status" label="状态">
                    <Checkbox.Group options={statusOptions}/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" size="small" htmlType="submit">
                        查询
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 24, span: 24 }}>
                    <Button size="small" onClick={resetUserPassword}>
                        重置密码
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
            <Drawer title="修改用户信息" placement="right" width={400} visible={infoVisible} onClose={closeDrawer}>
                {
                    userInfoSaveResult.code == null ? (
                        <Form form={userInfoForm} layout="vertical" onFinish={saveUserInfo}>
                            <Form.Item name="name" label="姓名" tooltip="请输入用户姓名" rules={[{ required: true, message: '姓名必须输入' }]}>
                                <Input placeholder="请输入姓名" maxLength={50}/>
                            </Form.Item>
                            <Form.Item name="gender" label="性别" tooltip="请选择性别" rules={[{ required: true, message: '性别必须选择' }]}>
                                <Select>
                                    <Option value="男">男</Option>
                                    <Option value="女">女</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="deptName" label="单位名称" tooltip="请输入单位名称" rules={[{ required: true, message: '单位名称必须输入' }]}>
                                <Input placeholder="请输入单位名称" maxLength={50}/>
                            </Form.Item>
                            <Form.Item name="mobile" label="手机号码" tooltip="请输入手机号码" rules={[{ required: true, message: '手机号码必须输入' }]}>
                                <Input placeholder="请输入手机号码" maxLength={20}/>
                            </Form.Item>
                            <Form.Item name="roleArray" label="角色" tooltip="请选择角色" rules={[{ required: true, message: '用户必须有至少一个角色' }]}>
                                <Checkbox.Group>
                                    {
                                        roleData.map(role => (
                                            <Checkbox value={role.code} key={role.id}>{role.name}</Checkbox>
                                        ))
                                    }
                                </Checkbox.Group>
                            </Form.Item>
                            <Form.Item name="memo" label="备注" tooltip="请输入备注信息">
                                <TextArea rows={4} />
                            </Form.Item>
                            <Form.Item wrapperCol= {{ offset: 6, span: 20 }}>
                                <Button type="primary" htmlType="submit">
                                    保存
                                </Button> &nbsp;
                                <Button onClick={closeDrawer}>取消</Button>
                            </Form.Item>
                        </Form>
                    ) : (<Result status={userInfoSaveResult.code} title={userInfoSaveResult.msg} extra={[<Button key={"btn_" + userInfoSaveResult.code} onClick={closeDrawer}>关闭</Button>]}></Result>)
                }
                
            </Drawer>
        </div>
    );
}

export default UserManagePage;