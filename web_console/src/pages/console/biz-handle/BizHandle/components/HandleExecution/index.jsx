import { useEffect, useState } from 'react';
import { caseTypeList, createCaseExecution, handleCaseExecution } from '../../../../../../api/biz'
import newCaseIcon from '../../../../../../assets/images/new-case.jpg';
import { PageHeader, Button, Form, Input, Row, Col, Radio, Tag, Collapse, Popconfirm, Modal, Result, Tabs, Tooltip} from "antd";
import { UserOutlined } from '@ant-design/icons';
import './index.css'

const { TabPane } = Tabs;
const { Panel } = Collapse;

const HandleExecution = (props) => {
    const [data, setData] = useState({});
    const [caseTypeData, setCaseTypeData] = useState([]);
    const [stepActiveKey, setStepActiveKey] = useState([]);

    useEffect(() => {
        // console.log(props)
        setData(props.data);
        setCaseTypeData(props.caseTypeData);
        setStepActiveKey(props.data.steps ? props.data.steps.map(step => step.id) : [])
    }, []);

    useEffect(() => {
        // console.log(data)
    }, [data]);

    const handleCollapseChange = (keys) => {
        setStepActiveKey(keys);
    }

    const handleSave = () => { 
        let param = {
            entity: data
        }
        handleCaseExecution(param).then(res => {
            props.onSaveSuccess();
        });
    }

    const handleStepItemTagClose = (stepId, itemId) => {
        setData({
            ...data,
            steps: data.steps.map(step =>
                step.id === stepId ? ({
                    ...step, caseTypeStepItems: step.caseTypeStepItems.map(item => itemId === item.id ? ({ ...item, status: 2 }) : item)
                }) : step
            )
        })
    }

    return (
        <>
            <PageHeader
                title="已办案件"
                className="site-page-header"
                subTitle="设置案件已完成事件"
                extra={[
                    <Popconfirm key="1" placement="left" title="确认保存吗？" onConfirm={handleSave} okText="确定" cancelText="取消" disabled={data.status === 2}>
                        <Button disabled={data.status === 2}>保存</Button>
                    </Popconfirm>
                ]}
                avatar={{ src: newCaseIcon }}
                onBack={() => props.onExit()}
            >
            <Form layout="vertical">
                <Row gutter={16} className="case-form-row" justify="space-between">
                        <Col span={6} className="case-form-area">
                            <Form.Item label="类型">
                                {caseTypeData && caseTypeData.length > 0 ? caseTypeData.find(ctd => ctd.id === data.typeId).name : ""}
                            </Form.Item>

                            <Form.Item label="名称">
                                {data.name}
                            </Form.Item>
                            
                            <Form.Item label="创建时间">
                                {data.createdTime}
                            </Form.Item>

                            <Form.Item label="最后修改时间">
                                {data.lastmodifiedTime}
                            </Form.Item>
                        </Col>
                        <Col span={18} className="case-form-area">
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
                                        <Panel header={<>{step.name}-{step.suspect}</>} key={step.id} collapsible="header">
                                            {
                                                (step.caseTypeStepItems && step.caseTypeStepItems.length > 0) ? 
                                                    step.caseTypeStepItems.map(item => item.status === 1 ? (
                                                        <Tooltip key={item.name}  placement="topLeft" title={item.lawTitle} color="gold" arrowPointAtCenter>
                                                            <Tag
                                                                className="edit-tag"
                                                                key={item.id}
                                                                closable={data.status === 1 ? true : false}
                                                                onClose={() => handleStepItemTagClose(step.id,item.id)}
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