import { useEffect, useState } from 'react';
import ControlledEditor from "../../../../components/ControlledEditor";
import { PageHeader, Tree, Button, Modal, Form, Input, Row, Col, message, Table, Space, Popconfirm, Upload} from "antd";
import { BookTwoTone, BookOutlined, UploadOutlined } from '@ant-design/icons';
import { subjectTreeData, saveSubject, removeSubject, subjectItemList, saveSubjectItem, removeSubjectItem } from '../../../../api/biz'
import './index.css'

const { Search } = Input;

const SubjectManage = () => {

    const [treeData, setTreeData] = useState([]);
    const [initTreeData, setInitTreeData] = useState([]);
    const [currentNode, setCurrentNode] = useState(null);
    const [subjectVisible, setSubjectVisible] = useState(false);

    const [subjectForm] = Form.useForm();
    const [subjectExtFormData, setSubjectExtFormData] = useState({});
    const [detailFileList, setDetailFileList] = useState(null);
    const [attachment, setAttachment] = useState(null);
    const [lawContent, setLawContent] = useState(null);
    const [initLawContent, setInitLawContent] = useState(null);

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
    }, [currentNode,page]);

    const loadSubjectTreeData = () => {
        subjectTreeData().then(res => {
            if (res.rows && res.rows.length > 0) {
                let data = res.rows.map(s => subject2TreeNode(s, null));
                setInitTreeData(data);
                setTreeData(data);
            } else {
                setInitTreeData();
                setTreeData([]);
            }
        });
    }

    const subject2TreeNode = (subject, parent) => {
        return {
            title: subject.name,
            titleSearch: subject.nameSearch,
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
            message.error('没有选择节点');
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
            message.error('没有选择节点');
        }
    }

    const subjectItemColumns = [
        {
            title: '名称',
            dataIndex: 'name',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            width: 200
        },
        {
            title: '法律条款',
            dataIndex: 'lawTitle',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: '排序',
            dataIndex: 'orderValue',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            width: 100
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button size="small" onClick={() => showEditSubjectItemWindow(record)}>修改</Button>
                    <Popconfirm placement="left" title="确定删除操作吗？" onConfirm={() => handleRemoveSubjectItem(record)} okText="确认" cancelText="取消">
                        <Button size="small">删除</Button>
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
            subjectItemList({ 
                entity: { subjectId: currentNode.key },
                pageNum: 0,
                pageSize: 1000
                ,orderBy:"orderValue" 
            }).then(res => {
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
    }

    const handleAddSubjectItem = () => {
        if (currentNode && currentNode.key) {
            subjectItemForm.setFieldsValue({
                subjectId: currentNode.key,
                orderValue: '50'
            });
            setSubjectItemVisible(true);
            setInitLawContent(null);
            setLawContent(null);
        } else {
            message.error('请首先选择主体类别！');
        }
    }

    const handleCancelSubjectItem = () => {
        //console.log('关闭详细窗口...')
        subjectItemForm.resetFields();
        setLawContent(null);
        setInitLawContent(null);
        setDetailFileList(null);
        setSubjectItemVisible(false);
    }

    const showEditSubjectItemWindow = (record) => {
        if(!record.orderValue) record.orderValue = '50'
        subjectItemForm.setFieldsValue(record);
        setLawContent(record.lawContent);
        setInitLawContent(record.lawContent);
        if(record.attachmentId) {
            var detailFile = {uid: record.attachmentId,name:record.attachmentName,status: 'done'};
            setDetailFileList([detailFile]);
            setAttachment({id: record.attachmentId,name: record.attachmentName});
        }
        setSubjectItemVisible(true);
    }

    const handleSaveSubjectItem = () => {
        subjectItemForm.validateFields().then(entity => {

            entity.attachmentId = attachment ? attachment.id : null;
            entity.attachmentName = attachment ? attachment.name : null;
            entity.lawContent = lawContent;
            saveSubjectItem({ entity }).then(res => {
                loadSubjectItemData();
                subjectItemForm.resetFields();
                setLawContent(null);
                setInitLawContent(null);
                setDetailFileList(null);
                setAttachment(null);
                setSubjectItemVisible(false);
            });
        }).catch(err => { });
    }

    const handleRemoveSubjectItem = (record) => {
        removeSubjectItem({entity: record}).then(res => {
            loadSubjectItemData();
        });
    }

    const handleFileListChage = ({ file: newFile, fileList: newFileList }) => {
        setDetailFileList(newFileList);
        if(newFileList && newFileList.length > 0 && newFile.response && newFile.response.rows && newFile.response.rows.length > 0) {
            setAttachment(newFile.response.rows[0]);
        } else {
            setAttachment(null);
        }
    }

    const handleEditorContentChange = (content) => {
        setLawContent(content);
    }

    const handleSearch = (value) => {
        if(value && value.trim().length > 0) {
            if(initTreeData && initTreeData.length > 0) {
                setTreeData(initTreeData.filter(d => d.titleSearch && d.titleSearch.indexOf(value) > -1));
            }
        } else {
            setTreeData(initTreeData);
        }
    }

    return (
        <div className='base-config-subject'>
            <PageHeader
                title="专项执法管理"
                className="site-page-header"
                subTitle="管理专项执法类别和内容"
                avatar={{ icon: <BookTwoTone /> }}
            >
                <Row gutter={16} className="case-form-row" justify="space-between">
                    <Col span={8} className="case-form-area">
                        <div className="panel-title">
                            <div className="panel-title-text">类别</div>
                            <div className="panel-title-toolbar">
                                <Button size="small" className="panel-title-toolbar-button" onClick={handleAddSubject}>新增同级</Button>
                                <Button size="small" className="panel-title-toolbar-button" onClick={handleAddChildSubject}>新增子项</Button>
                                <Button size="small" className="panel-title-toolbar-button" onClick={handleEditSubject}>修改</Button>
                                <Popconfirm placement="right" title="删除操作会连同删除子级节点，确认删除吗？" onConfirm={handleRemoveSubject} okText="确定" cancelText="取消">
                                    <Button size="small" className="panel-title-toolbar-button">删除</Button>
                                </Popconfirm>
                            </div>
                        </div>
                        <div className="panel-content">
                        <Search placeholder="关键词搜索" onSearch={handleSearch} enterButton />

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
                            <div className="panel-title-text">项目列表</div>
                            <div className="panel-title-toolbar">
                                <Button size="small" className="panel-title-toolbar-button" onClick={handleAddSubjectItem}>新增项目</Button>
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
                    </Col>
                </Row>
            </PageHeader>
            <Modal title="类别详情" visible={subjectVisible} onOk={hadleSaveSubjectData} onCancel={handleCancelSubjectDetail}>
                <Form form={subjectForm} layout="vertical">
                    <Form.Item name="parentName" label="父节点">
                        <Input placeholder="父类别名称" maxLength={50} disabled />
                    </Form.Item>
                    <Form.Item name="name" label="名称" rules={[{ required: true, message: '名称必须输入' }]}>
                        <Input placeholder="请输入类别名称" maxLength={50} />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="项目详情" visible={subjectItemVisible} onOk={handleSaveSubjectItem} onCancel={handleCancelSubjectItem} width={900}>
                <Form form={subjectItemForm} layout="vertical">
                    <Form.Item name="id" label="主键" hidden={true}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="subjectId" label="类别" hidden={true}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="name" label="项目名称" rules={[{ required: true, message: '项目名称必须输入' }]}>
                        <Input placeholder="请输入项目名称" maxLength={50} />
                    </Form.Item>
                    <Form.Item name="lawTitle" label="法律条款" rules={[{ required: true, message: '法律条款必须输入' }]}>
                        <Input placeholder="请输入法律条款" maxLength={50} />
                    </Form.Item>
                    <Form.Item name="orderValue" label="排序值" rules={[{ required: true, message: '排序值必须输入' }]}>
                        <Input placeholder="请输入法律条款" maxLength={50} />
                    </Form.Item>
                    <Form.Item name="lawContent" label="法律详情" rules={[{ required: true, message: '法律详情必须输入' }]}>
                        <ControlledEditor initContent={initLawContent} onEditorContentChange={handleEditorContentChange}/>
                    </Form.Item>
                    
                    <Upload
                        action="/legal-case/attachment/upload"
                        maxCount={1}
                        fileList={detailFileList}
                        onChange={handleFileListChage}
                        >
                        <Button icon={<UploadOutlined />}>上传附件</Button>
                    </Upload>
                </Form>
            </Modal>
        </div>
    );
}

export default SubjectManage;