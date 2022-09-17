import { useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { PageHeader, Tree, Button, Modal, Input, Row, Col, Table, Space} from "antd";
import { BookTwoTone, BookOutlined } from '@ant-design/icons';
import { subjectTreeData,subjectItemList } from '../../../../api/biz'
import './index.css'

const SubjectManage = () => {

    const [treeData, setTreeData] = useState([]);
    const [currentNode, setCurrentNode] = useState(null);
    const [detailData, setDetailData] = useState(null);

    const [subjectItemData, setSubjectItemData] = useState([]);
    const [subjectItemDataLoading, setSubjectItemDataLoading] = useState(false);
    const [subjectItemVisible, setSubjectItemVisible] = useState(false);
    const [total, setTotal] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [disabled, setDisabled] = useState(false);
    const [bounds, setBounds] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });
    const draggleRef = useRef(null);

    const onStart = (_event, uiData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();
    
        if (!targetRect) {
          return;
        }
    
        setBounds({
          left: -targetRect.left + uiData.x,
          right: clientWidth - (targetRect.right - uiData.x),
          top: -targetRect.top + uiData.y,
          bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
      };

    useEffect(() => {
        loadSubjectTreeData();
    }, []);

    useEffect(() => {
        loadSubjectItemData();
    }, [currentNode,page]);

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
        /*
        {
            title: '排序',
            dataIndex: 'orderValue',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            width: 100
        },*/
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button size="small" style={{width: "100%"}} onClick={() => showSubjectItemWindow(record)}> 查 看 </Button>
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

    const showSubjectItemWindow = (record) => {
        setDetailData(record);
        setSubjectItemVisible(true);
    }

    const handleCloseSubjectItem = () => {
        setDetailData(null);
        setSubjectItemVisible(false);
    }

    return (
        <div className='subject-data-subject'>
            <PageHeader
                title="专项执法"
                className="site-page-header"
                subTitle="专项执法数据查看"
                avatar={{ icon: <BookTwoTone /> }}
            >
                <Row gutter={16} className="case-form-row" justify="space-between">
                    <Col span={8} className="case-form-area">
                        <div className="panel-title">
                            <div className="panel-title-text">类别</div>
                            <div className="panel-title-toolbar">
                                
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
                            <div className="panel-title-text">项目列表</div>
                            <div className="panel-title-toolbar">
                                
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
                                onRow={(record,rowIndex) => {
                                    return {
                                        onDoubleClick: event => showSubjectItemWindow(record)
                                    }
                                }}
                            ></Table>
                        </div>
                    </Col>
                </Row>
            </PageHeader>

            <Modal title="项目详情" 
                visible={subjectItemVisible}  
                onCancel={handleCloseSubjectItem} 
                closable={true} 
                width={1000}
                footer={[
                    <Button key="close" onClick={handleCloseSubjectItem}>
                        关 闭
                    </Button>
                ]}
                modalRender={(modal) => (
                    <Draggable
                      disabled={disabled}
                      bounds={bounds}
                      onStart={(event, uiData) => onStart(event, uiData)}
                    >
                      <div ref={draggleRef}>{modal}</div>
                    </Draggable>
                  )}
            >
                {
                    detailData ? (
                        <>
                            <div className='panel-content-law-title'>{detailData.lawTitle}</div>
                            <div className='panel-content-law-content'><p dangerouslySetInnerHTML={{__html: detailData.lawContent}}></p></div>
                            {
                                detailData.attachmentId ? (
                                    <div><span style={{fontWeight:'600',height:'40px',lineHeight:'40px'}}>附件: </span><a href={"/legal-case/attachment/get/" + detailData.attachmentId} target={"_blank"}>{detailData.attachmentName}</a></div>) : (<></>)
                            }
                        </>
                    ) : (
                        <></>
                    )
                }
            
            </Modal>
        </div>
    );
}

export default SubjectManage;