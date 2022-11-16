import { useEffect, useState } from 'react';
import { handleCaseExecution } from '../../../../../../api/biz'
import newCaseIcon from '../../../../../../assets/images/new-case.jpg';
import { PageHeader, Button, Form,  Row, Col, Tag, Collapse, Popconfirm, Tooltip} from "antd";
import './index.css'

const { Panel } = Collapse;

const HandleExecution = (props) => {
    const [data, setData] = useState({});
    const [caseTypeData, setCaseTypeData] = useState([]);
    const [stepActiveKey, setStepActiveKey] = useState([-1]);
    const [stepHistory, setStepHistory] = useState([]);

    useEffect(() => {
        // console.log(props)
        setData(props.data);
        setCaseTypeData(props.caseTypeData);
        setStepActiveKey(props.data.steps ? [...props.data.steps.map(step => step.id), -1] : [-1])
    }, []);

    useEffect(() => {
         console.log('data',data)
    }, [data]);

    const handleCollapseChange = (keys) => {
        setStepActiveKey([...keys, -1]);
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
        stepHistory.push(data.steps);
        setStepHistory(stepHistory);
        setData({
            ...data,
            steps: data.steps.map(step =>
                step.id === stepId ? ({
                    ...step, caseTypeStepItems: step.caseTypeStepItems.map(item => itemId === item.id ? ({ ...item, status: 2 }) : item)
                }) : step
            )
        })
    }

    const handleBackHistory = () => {
        let steps = stepHistory.pop();
        setStepHistory(stepHistory);
        setData({
            ...data,
            steps
        })
    }

    const handleCloseComment = (id) => {
        data.comments.forEach(comment => {
            if(comment.id && comment.id === id) {
                comment.status = '2';
            }
        });
    }

    const handleDownload = () => {
        window.open("/legal-case/case-execution/export-one/" + data.id);
    }

    return (
        <>
            <PageHeader
                title="已办案件"
                className="site-page-header"
                subTitle="设置案件已完成事件"
                extra={[<div key={1}>
                    <Button disabled={stepHistory.length === 0} onClick={handleBackHistory}>撤销</Button>
                    <Popconfirm key="1" placement="left" title="确认保存吗？" onConfirm={handleSave} okText="确定" cancelText="取消" disabled={data.status === 2}>
                        <Button disabled={data.status === 2}>保存</Button>
                    </Popconfirm>
                    <Button onClick={handleDownload}>导出</Button>
                    </div>
                ]}
                avatar={{ src: newCaseIcon }}
                onBack={() => props.onExit()}
            >
            <Form layout="vertical">
                <Row gutter={16} className="case-form-row" justify="space-between">
                        <Col span={5} className="case-form-area">
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
                        <Col span={19} className="case-form-area">
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
                                <Panel header={<b>备注</b>} key={-1} collapsible="header">
                                    {
                                        data.comments?.filter(comment => comment.status === 1).map((item,index) => {
                                            return (
                                                <Tag key={item.id}
                                                    className="edit-tag"
                                                    closable={true}
                                                    onClose={() => handleCloseComment(item.id)}
                                                >
                                                    {item.name}
                                                </Tag>
                                            )
                                        })
                                    }
                                </Panel>
                            </Collapse>
                        </Col>
                </Row>
                    </Form>
            </PageHeader>
        </>
    )
}

export default HandleExecution;