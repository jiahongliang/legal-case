import { useEffect, useState } from 'react';
import newCaseIcon from '../../../../../../assets/images/new-case.jpg';
import { PageHeader, Row, Col, Tag, Collapse, Tabs, Form, Tooltip } from "antd";
import { UserOutlined } from '@ant-design/icons';
import './index.css'

const { TabPane } = Tabs;
const { Panel } = Collapse;

const HandleExecution = (props) => {
    const [data, setData] = useState({});
    const [caseTypeData, setCaseTypeData] = useState([]);
    const [stepActiveKey, setStepActiveKey] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        // console.log(props)
        setData(props.data);
        setCaseTypeData(props.caseTypeData);
        setStepActiveKey(props.data.steps ? props.data.steps.map(step => step.id) : []);
        setUserData(props.userData);
    }, []);

    const handleCollapseChange = (keys) => {
        setStepActiveKey(keys);
    }

    return (
        <>
            <PageHeader
                title="案件详情"
                className="site-page-header"
                subTitle="查看案件详情"
                avatar={{ src: newCaseIcon }}
                onBack={() => props.onExit()}
            >
            <Form layout="vertical">
                <Row gutter={16} className="case-form-row" justify="space-between">
                        <Col span={9} className="case-form-area">
                            <Form.Item label="类型">
                                {caseTypeData && caseTypeData.length > 0 ? caseTypeData.find(ctd => ctd.id === data.typeId).name : ""}
                            </Form.Item>

                            <Form.Item label="名称">
                                {data.name}
                            </Form.Item>

                            <Form.Item label="负责人">
                                {
                                    userData.length > 0 ? userData.find(user => user.id === data.createdBy).name : ''
                                }
                            </Form.Item>
                            
                            <Form.Item label="创建时间">
                                {data.createdTime}
                            </Form.Item>

                            <Form.Item label="最后修改时间">
                                {data.lastmodifiedTime}
                            </Form.Item>
                        </Col>
                        <Col span={15} className="case-form-area">
                            <span style={{fontWeight: 600}}>步骤及事项</span>
                            <Collapse
                                activeKey={stepActiveKey}
                                onChange={handleCollapseChange}
                                className="case-form-step-data"
                                style={{marginTop: '10px'}}
                                expandIconPosition="left"
                            >
                                {
                                    data.steps ? data.steps.map(step => (
                                        <Panel header={step.name} key={step.id} collapsible="header" extra={
                                        <span>{step.suspect}</span>
                                        }>
                                            {
                                                (step.caseTypeStepItems && step.caseTypeStepItems.length > 0) ? 
                                                    step.caseTypeStepItems.map(item => item.status === 1 ? (
                                                        <Tooltip key={item.name}  placement="topLeft" title={item.lawTitle} color="gold" arrowPointAtCenter>
                                                            <Tag
                                                                className="edit-tag"
                                                                key={item.id}
                                                                closable={false}
                                                            >
                                                                {item.name}
                                                            </Tag>
                                                        </Tooltip>
                                                    ) : '')
                                                    : ''
                                            }
                                        </Panel>
                                    )) : []
                                }
                            </Collapse>
                        </Col>
                </Row>
                    </Form>
            </PageHeader>
        </>
    )
}

export default HandleExecution;