import { useEffect, useState, createRef } from "react";
import { PageHeader,Button,Form, Input,Row,Col, Radio,Tag, Collapse,Popconfirm, Modal, Result, Tooltip } from "antd";
import {CloseOutlined} from '@ant-design/icons';
import {caseTypeList, createCaseExecution} from '../../../../api/biz'
import moment from 'moment'
import newCaseIcon from '../../../../assets/images/new-case.jpg';
import './index.css';

const { Panel } = Collapse;

const CreateCase = () => {
    const [caseForm] = Form.useForm();
    //const [suspectInputVisible, setSuspectInputVisible] = useState(false);
    //const [suspectsData, setSuspectsData] = useState([]);
    const suspectInputRef = createRef(); 
    //const [suspectInputValue, setSuspectInputValue] = useState('');
    const [stepData, setStepData] = useState([]);
    const [stepFilterText, setStepFilterText] = useState('');
    const [selectedStepData, setSelectedStepData] = useState([]);
    const [stepActiveKey, setStepActiveKey] = useState([]);
    const [saveResult,setSaveResult] = useState({
        code: null,
        message: null
    });

    const [caseTypeData,setCaseTypeData] = useState([]);

    useEffect(() => {
        loadCaseTypeData();
    },[])

    useEffect(() => {
       setStepActiveKey(selectedStepData.map(step => step.keyid));
    },[selectedStepData])

    /*
    useEffect(() => {
        console.log('stepActiveKey',stepActiveKey);
    },[stepActiveKey])
    */

    useEffect(() => {
        if(suspectInputRef.current) {
            suspectInputRef.current.focus();
        }
    },[suspectInputRef]);

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

    const onCaseTypeChange = (event) => {
        let ct = caseTypeData.find(o => o.id === event.target.value)
        setStepData(ct.caseTypeSteps);
        setSelectedStepData([])
        setStepActiveKey([]);
        caseForm.setFieldsValue({name: ct.name + moment().format('YYYYMMDDHHmm')});
    }

    const handleClickSourceStep = (stepId) => {
        let clickedStep = stepData.find(step => step.id === stepId);
        setSelectedStepData([...selectedStepData, {...clickedStep,keyid: moment().format('X') + '' + selectedStepData.length}]);
    }

    const handleRemoveSelectedStep = (keyid) => {
        setSelectedStepData(selectedStepData.filter(step => step.keyid !== keyid));
    }

    const handleSuspectChange = (keyId,value) => {
        setSelectedStepData(selectedStepData.map(step => step.keyid === keyId ? {...step, suspect: value} : step));
    }
    /*
    const showSuspectInput = () => {
        setSuspectInputVisible(true);
    }

    const handleSuspectInputChange = (e) => {
        setSuspectInputValue(e.target.value);
    }

    const handleSuspectInputConfirm = (e) => {
        if (suspectInputValue && suspectsData.indexOf(suspectInputValue) === -1) {
            setSuspectsData([...suspectsData, suspectInputValue]);
          }
          setSuspectInputVisible(false);
          setSuspectInputValue('');
    }

    const handleSuspectTagClose = (removedTag) => {
        const newTags = suspectsData.filter(tag => tag !== removedTag);
        setSuspectsData(newTags);
    }*/

    const handleStepItemTagClose = (stepKeyId,itemId) => {
        setSelectedStepData(
            selectedStepData.map(
                step => step.keyid === stepKeyId ? 
                {...step,caseTypeStepItems : step.caseTypeStepItems.filter(item => item.id !== itemId)} : 
                step
            )
        )
    }

    const handleCollapseChange = (keys) => {
        setStepActiveKey(keys);
    }

    const handleSave = () => {
        let name = caseForm.getFieldValue('name') ? caseForm.getFieldValue('name').trim() : '';
        let typeId = caseForm.getFieldValue('typeId') ? caseForm.getFieldValue('typeId') : null;
        let errorInfo = '';
        if(!name || name.length === 0) {
            errorInfo += '请输入名称；'
        }
        if(typeId == null) {
            errorInfo += '请选择类型；'
        }
        if(errorInfo.length > 0) {
            Modal.error({
                title: '错误提示',
                okText: '确定',
                content: errorInfo
            });
            return;
        } 

        let params = {
            entity:{
                name,
                typeId,
                steps: selectedStepData.filter(sd => sd.caseTypeStepItems && sd.caseTypeStepItems.length > 0)
            }
        }

        createCaseExecution(params).then(res => {
            if(res.subCode === 0) {
                setSaveResult({code:"success",message:res.subMsg});
            } else {
                setSaveResult({code:"error",message:res.subMsg});
            }
        })
    }

    const resetPage = () => {
        caseForm.resetFields();
        setSelectedStepData([]);
        setStepData([]);
        setStepActiveKey([]);
        setSaveResult({
            code: null,
            message: null
        });
    }

    const handleStepFilterText = (e) => {
        setStepFilterText(e.target.value);
    }

    return (
        <>
            <PageHeader
                title="案件新增"
                className="site-page-header"
                subTitle="选择类型并设置案件事项后，创建案件"
                extra={[
                <Popconfirm key="1" placement="bottom" title="确认保存吗" onConfirm={handleSave} okText="确定" cancelText="取消">
                    <Button>设置完成并保存</Button>
                </Popconfirm>
                ]}
                avatar={{src: newCaseIcon}}
            >
                {
                     saveResult.code == null ? (
                        <Form form={caseForm} layout="vertical">
                            <Row gutter={16} className="case-form-row" justify="space-between">
                                <Col span={5} className="case-form-area">
                                    <Form.Item name="typeId" label="类型">
                                        <Radio.Group onChange={onCaseTypeChange}>
                                            {
                                                caseTypeData.map((caseType,index) => (
                                                    <Radio.Button value={caseType.id} key={caseType.id}>{caseType.name}</Radio.Button>
                                                ))
                                            }
                                        </Radio.Group>
                                    </Form.Item>

                                    <Form.Item name="name" label="名称">
                                        <Input placeholder="请输入名称" maxLength={50} onFocus={e => e.target.select()}/>
                                    </Form.Item>
                                    <span style={{fontWeight: 600}}>可选步骤 <Input onChange={handleStepFilterText}></Input></span>
                                    <div className="case-type-source-step-area">
                                        {
                                            stepData.filter(step => stepFilterText.length === 0 || step.name.indexOf(stepFilterText) >= 0).map(step => (
                                                <Button key={step.id} type="primary" style={{width: '95%'}} shape="round" block className="case-step-button" onClick={() => {handleClickSourceStep(step.id)}}>{step.name}</Button>
                                            ))
                                        }
                                        </div>
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
                                            selectedStepData.map(step => (
                                                <Panel header={<div style={{width: '300px',display: 'flex'}}><div style={{wordBreak: 'keep-all'}}>{step.name}</div>
                                                    <Input style={{float: "right",marginLeft: '5px'}} size="small" placeholder="对象名称" onChange={(event) => handleSuspectChange(step.keyid,event.target.value)} onClick={(event) => {event.stopPropagation()}}></Input></div>
                                                } key={step.keyid} collapsible="header" extra={
                                                <><CloseOutlined  onClick={() => handleRemoveSelectedStep(step.keyid)}/></>
                                                }>
                                                    {
                                                        (step.caseTypeStepItems && step.caseTypeStepItems.length > 0) ? 
                                                            step.caseTypeStepItems.map(item => (
                                                                <Tooltip key={item.name}  placement="topLeft" title={item.lawTitle} color="gold" arrowPointAtCenter>
                                                                    <Tag
                                                                        className="edit-tag"
                                                                        key={item.id}
                                                                        closable={true}
                                                                        onClose={() => handleStepItemTagClose(step.keyid,item.id)}
                                                                    >
                                                                        {item.name}
                                                                    </Tag>
                                                                </Tooltip>
                                                            ))
                                                            : ""
                                                    }
                                                </Panel>
                                            ))
                                        }
                                    </Collapse>
                                </Col>
                            </Row>
                            
                        </Form>
                     ) : (
                        <Result status={saveResult.code} 
                            title={saveResult.message} 
                            extra={[<Button key={"btn_" + saveResult.code} 
                            onClick={resetPage}>关闭</Button>]}>
                        </Result>
                     )
                }
                
            </PageHeader>
        </>
    );
}

export default CreateCase;