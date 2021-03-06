import { useEffect, useState } from 'react';
import { PageHeader, Tree, Button, Modal, Form, Input, Row, Col, message, Table, Space, Popconfirm} from "antd";
import { BookTwoTone, BookOutlined } from '@ant-design/icons';
import { subjectTreeData, saveSubject, removeSubject, subjectItemList, saveSubjectItem, removeSubjectItem } from '../../../../api/biz'
import './index.css'

const SubjectManage = () => {

    const [treeData, setTreeData] = useState([]);
    const [currentNode, setCurrentNode] = useState(null);
    const [subjectVisible, setSubjectVisible] = useState(false);

    const [subjectForm] = Form.useForm();
    const [subjectExtFormData, setSubjectExtFormData] = useState({});

    const [subjectItemData, setSubjectItemData] = useState([]);
    const [subjectItemDataLoading, setSubjectItemDataLoading] = useState(false);
    const [subjectItemForm] = Form.useForm();
    const [subjectItemVisible, setSubjectItemVisible] = useState(false);
    const [total, setTotal] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        loadSubjectTreeData();
    }, []);

    useEffect(() => {
        loadSubjectItemData();
    }, [currentNode]);

    const loadSubjectTreeData = () => {
        subjectTreeData().then(res => {
            if (res.rows && res.rows.length > 0) {
                setTreeData(res.rows.map(s => subject2TreeNode(s, null)))
            } else {
                setTreeData([]);
            }
        });
    }

    const subject2TreeNode = (subject, parent) => {
        return {
            title: subject.name,
            key: subject.id,
            parentKey: parent == null ? null : parent.id,
            parentName: parent == null ? null : parent.name,
            children: (subject.children && subject.children.length > 0) ? (
                subject.children.map(child => subject2TreeNode(child, subject))
            ) : []
        }
    }

    const handleSelectTreeNode = (keys, event) => {
        setCurrentNode(event.node);
    }

    const handleAddSubject = () => {
        setSubjectExtFormData({
            parentId: currentNode ? currentNode.parentKey : null,
            id: null
        });
        subjectForm.setFieldsValue({
            parentName: currentNode ? currentNode.parentName : null
        });
        setSubjectVisible(true);
    }

    const handleAddChildSubject = () => {
        setSubjectExtFormData({
            parentId: currentNode ? currentNode.key : null,
            id: null
        });
        subjectForm.setFieldsValue({
            parentName: currentNode ? currentNode.title : null
        });
        setSubjectVisible(true);
    }

    const handleEditSubject = () => {
        if (currentNode) {
            setSubjectExtFormData({
                parentId: currentNode.parentKey,
                id: currentNode.key
            });
            subjectForm.setFieldsValue({
                parentName: currentNode.parentName,
                name: currentNode.title
            });
            setSubjectVisible(true);
        } else {
            message.error('??????????????????');
        }
    }

    const handleCancelSubjectDetail = () => {
        setSubjectVisible(false);
        setSubjectExtFormData({});
        subjectForm.setFieldsValue({
            parentName: null,
            name: null
        });
    }

    const hadleSaveSubjectData = () => {
        subjectForm.validateFields().then(formData => {
            let entity = {
                id: subjectExtFormData.id,
                name: formData.name,
                parent: {
                    id: subjectExtFormData.parentId
                }
            }
            saveSubject({ entity }).then(res => {
                loadSubjectTreeData();
                setCurrentNode({ ...currentNode, title: formData.name });
                setSubjectExtFormData({});
                subjectForm.setFieldsValue({
                    parentName: null,
                    name: null
                });
                setSubjectVisible(false);
            });
        }).catch(err => {
            console.log(err)
        });
    }

    const handleRemoveSubject = () => {
        if (currentNode) {
            removeSubject({ entity: { id: currentNode.key } }).then(
                res => {
                    setCurrentNode(null);
                    loadSubjectTreeData();
                }
            );
        } else {
            message.error('??????????????????');
        }
    }

    const subjectItemColumns = [
        {
            title: '??????',
            dataIndex: 'name',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            width: 200
        },
        {
            title: '????????????',
            dataIndex: 'lawTitle',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: '??????',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button size="small" onClick={() => showEditSubjectItemWindow(record)}>??????</Button>
                    <Popconfirm placement="left" title="????????????????????????" onConfirm={() => handleRemoveSubjectItem(record)} okText="??????" cancelText="??????">
                        <Button size="small">??????</Button>
                    </Popconfirm>
                </Space>
            ),
            align: "center",
            width: 100
        }
    ];

    const loadSubjectItemData = () => {
        setSubjectItemDataLoading(true);
        if (currentNode && currentNode.key) {
            subjectItemList({ entity: { subjectId: currentNode.key } }).then(res => {
                setSubjectItemData(res.rows);
                setTotal(res.total)
                setSubjectItemDataLoading(false);
            });
        } else {
            setSubjectItemData([]);
            setSubjectItemDataLoading(false);
        }
    }

    const onTablePageChange = (page, pageSize, sorter, extra) => {
        setPage(page);
        setPageSize(pageSize);
        loadSubjectItemData();
    }

    const handleAddSubjectItem = () => {
        if (currentNode && currentNode.key) {
            subjectItemForm.setFieldsValue({
                subjectId: currentNode.key
            });
            setSubjectItemVisible(true);
        } else {
            message.error('??????????????????????????????');
        }
    }

    const handleCancelSubjectItem = () => {
        subjectItemForm.resetFields();
        setSubjectItemVisible(false);
    }

    const showEditSubjectItemWindow = (record) => {
        subjectItemForm.setFieldsValue(record);
        setSubjectItemVisible(true);
    }

    const handleSaveSubjectItem = () => {
        subjectItemForm.validateFields().then(entity => {
            saveSubjectItem({ entity }).then(res => {
                loadSubjectItemData();
                subjectItemForm.resetFields();
                setSubjectItemVisible(false);
            });
        }).catch(err => { });
    }

    const handleRemoveSubjectItem = (record) => {
        removeSubjectItem({entity: record}).then(res => {
            loadSubjectItemData();
        });
    }

    return (
        <>
            <PageHeader
                title="??????????????????"
                className="site-page-header"
                subTitle="?????????????????????????????????"
                avatar={{ icon: <BookTwoTone /> }}
            >
                <Row gutter={16} className="case-form-row" justify="space-between">
                    <Col span={8} className="case-form-area">
                        <div className="panel-title">
                            <div className="panel-title-text">??????</div>
                            <div className="panel-title-toolbar">
                                <Button size="small" className="panel-title-toolbar-button" onClick={handleAddSubject}>????????????</Button>
                                <Button size="small" className="panel-title-toolbar-button" onClick={handleAddChildSubject}>????????????</Button>
                                <Button size="small" className="panel-title-toolbar-button" onClick={handleEditSubject}>??????</Button>
                                <Popconfirm placement="right" title="????????????????????????????????????????????????????????????" onConfirm={handleRemoveSubject} okText="??????" cancelText="??????">
                                    <Button size="small" className="panel-title-toolbar-button">??????</Button>
                                </Popconfirm>
                            </div>
                        </div>
                        <div className="panel-content">
                            <Tree
                                showLine={{ showLeafIcon: false }}
                                showIcon={true}
                                icon={<BookOutlined />}
                                treeData={treeData}
                                onSelect={handleSelectTreeNode}
                            />
                        </div>
                    </Col>
                    <Col span={16} className="case-form-area">
                        <div className="panel-title">
                            <div className="panel-title-text">????????????</div>
                            <div className="panel-title-toolbar">
                                <Button size="small" className="panel-title-toolbar-button" onClick={handleAddSubjectItem}>????????????</Button>
                            </div>
                        </div>
                        <div className="panel-content">
                            <Table
                                columns={subjectItemColumns}
                                dataSource={subjectItemData}
                                loading={subjectItemDataLoading}
                                pagination={{
                                    position: ["bottomRight"],
                                    total: total,
                                    showSizeChanger: true,
                                    showQuickJumper: true,
                                    showTotal: (total) => `???${total}???`,
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
                    </Col>
                </Row>
            </PageHeader>
            <Modal title="????????????" visible={subjectVisible} onOk={hadleSaveSubjectData} onCancel={handleCancelSubjectDetail}>
                <Form form={subjectForm} layout="vertical">
                    <Form.Item name="parentName" label="?????????">
                        <Input placeholder="???????????????" maxLength={50} disabled />
                    </Form.Item>
                    <Form.Item name="name" label="??????" rules={[{ required: true, message: '??????????????????' }]}>
                        <Input placeholder="?????????????????????" maxLength={50} />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="????????????" visible={subjectItemVisible} onOk={handleSaveSubjectItem} onCancel={handleCancelSubjectItem} width={800}>
                <Form form={subjectItemForm} layout="vertical">
                    <Form.Item name="id" label="??????" hidden={true}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="subjectId" label="??????" hidden={true}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="name" label="????????????" rules={[{ required: true, message: '????????????????????????' }]}>
                        <Input placeholder="?????????????????????" maxLength={50} />
                    </Form.Item>
                    <Form.Item name="lawTitle" label="????????????" rules={[{ required: true, message: '????????????????????????' }]}>
                        <Input placeholder="?????????????????????" maxLength={50} />
                    </Form.Item>
                    <Form.Item name="lawContent" label="????????????" rules={[{ required: true, message: '????????????????????????' }]}>
                        <Input.TextArea placeholder="?????????????????????" style={{
                            height: 260,
                        }} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default SubjectManage;