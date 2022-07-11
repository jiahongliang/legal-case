import { useEffect, useState } from 'react';
import { PageHeader, Tree, Button, Modal, Form, Input, Row, Col, message, Tabs, Space, Popconfirm} from "antd";
import { BookTwoTone, BookOutlined } from '@ant-design/icons';
import { subjectTreeData, saveSubject, removeSubject, subjectItemList, saveSubjectItem, removeSubjectItem } from '../../../../api/biz'
import './index.css';

const { TabPane } = Tabs;

const SubjectItem = () => {
    const [treeData, setTreeData] = useState([]);
    const [currentNode, setCurrentNode] = useState(null);

    const [subjectItemData, setSubjectItemData] = useState([]);
    const [activedKeys, setActivedKeys] = useState('');

    useEffect(() => {
        loadSubjectTreeData();
    }, []);

    useEffect(() => {
        loadSubjectItemData();
    }, [currentNode]);

    useEffect(() => {
        if(subjectItemData && subjectItemData.length > 0) {
            setActivedKeys(subjectItemData[0].id + '');
        }
    }, [subjectItemData]);

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

    const loadSubjectItemData = () => {
        if (currentNode && currentNode.key) {
            subjectItemList({ entity: { subjectId: currentNode.key }, pageNum: 0, pageSize: 1000 }).then(res => {
                setSubjectItemData(res.rows);
            });
        } else {
            setSubjectItemData([]);
        }
    }

    const handleTabClick = (key) => {
        setActivedKeys(key);
    }

    return (
        <>
            <PageHeader
                title="专题数据"
                className="site-page-header"
                subTitle="展示专题相关数据"
                avatar={{ icon: <BookTwoTone /> }}
            >
                <Row gutter={16} className="case-form-row" justify="space-between">
                    <Col span={8} className="case-form-area">
                        <div className="panel-title">
                            <div className="panel-title-text">专题类别</div>
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
                            <div className="panel-title-text">项目数据</div>
                        </div>
                        <div className="panel-content">
                            <Tabs tabPosition="left" activeKey={activedKeys} onTabClick={handleTabClick}>
                                {
                                    subjectItemData.map(item => (
                                        <TabPane tab={item.name} key={item.id}>
                                            <div className='panel-content-law-title'>{item.lawTitle}</div>
                                            <div className='panel-content-law-content'><Input.TextArea value={item.lawContent} style={{
                                                height: '100%'
                                            }}></Input.TextArea></div>
                                        </TabPane>
                                    ))
                                }
                            </Tabs>
                        </div>
                    </Col>
                </Row>
            </PageHeader>
        </>
    );
}

export default SubjectItem;