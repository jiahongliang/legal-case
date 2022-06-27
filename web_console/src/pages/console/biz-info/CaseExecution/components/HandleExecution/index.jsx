import { useEffect, useState } from 'react';
import newCaseIcon from '../../../../../../assets/images/new-case.jpg';
import { PageHeader, Row, Col, Tag, Collapse, Tabs } from "antd";
import { UserOutlined } from '@ant-design/icons';
import './index.css'

const { TabPane } = Tabs;
const { Panel } = Collapse;

const HandleExecution = (props) => {
    const [data, setData] = useState({});
    const [caseTypeData, setCaseTypeData] = useState([]);

    useEffect(() => {
        console.log(props)
        setData(props.data);
        setCaseTypeData(props.caseTypeData);
    }, [])

    return (
        <>
            <PageHeader
                title="案件详情"
                className="site-page-header"
                subTitle="查看案件详情"
                avatar={{ src: newCaseIcon }}
                onBack={() => props.onExit()}
            >
                <div className='case-execution-handle-area'>
                    <Row gutter={16}>
                        <Col span="8"><span className='case-execution-handle-title'>案件名称：</span>{data.name}</Col>
                        <Col span="8"><span className='case-execution-handle-title'>案件类型：</span>{caseTypeData && caseTypeData.length > 0 ? caseTypeData.find(ctd => ctd.id === data.typeId).name : ""}</Col>
                        <Col span="8"><span className='case-execution-handle-title'>创建时间：</span>{data.createdTime}</Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <Tabs>
                                {
                                    data && data.suspects ? data.suspects.map(suspect => (
                                        <TabPane
                                            tab={
                                                <span>
                                                    <UserOutlined />
                                                    {suspect.name}
                                                </span>
                                            }
                                            key={suspect.id}
                                        >
                                            <Collapse
                                                defaultActiveKey={data && data.steps ? data.steps.map(step => step.id) : []}
                                                className="case-form-step-data"
                                            >
                                                {
                                                    data && data.steps ? data.steps.map(step => (
                                                        <Panel header={step.name} key={step.id} collapsible="header">
                                                            {
                                                                (step.items && step.items.length > 0) ?
                                                                    step.items.filter(item => item.suspectId === suspect.id && item.stepId === step.id && item.status === 1).map(item => (
                                                                        <Tag
                                                                            className="edit-tag"
                                                                            key={item.id}
                                                                        >
                                                                            {item.itemName}
                                                                        </Tag>
                                                                    ))
                                                                    : ""
                                                            }
                                                        </Panel>
                                                    )) : ""
                                                }
                                            </Collapse>
                                        </TabPane>
                                    )) : ""
                                }

                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </PageHeader>
        </>
    )
}

export default HandleExecution;