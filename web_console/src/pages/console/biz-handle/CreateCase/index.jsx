import { useEffect, useState, useRef, createRef } from "react";
import { PageHeader,Button,Form, Input,Row,Col, Radio,Tag, Collapse,Popconfirm, Modal, Result } from "antd";
import {PlusOutlined} from '@ant-design/icons';
import {caseTypeList, createCaseExecution} from '../../../../api/biz'
import newCaseIcon from '../../../../assets/images/new-case.jpg';
import './index.css';

const { Panel } = Collapse;

const CreateCase = () => {
    const [caseForm] = Form.useForm();
    const [suspectInputVisible, setSuspectInputVisible] = useState(false);
    const [suspectsData, setSuspectsData] = useState([]);
    const suspectInputRef = createRef(); 
    const [suspectInputValue, setSuspectInputValue] = useState('');
    const [stepData, setStepData] = useState([]);
    const [stepActiveKey, setStepActiveKey] = useState([]);
    const [saveResult,setSaveResult] = useState({
        code: null,
        message: null
    });

    const [caseTypeData,setCaseTypeData] = useState([]);

    useEffect(() => {
        loadCaseTypeData();
    },[])

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
        let newStepData = ct.caseTypeSteps.map(step => ({
            ...step, itemData: (step.items&&step.items.length > 0) ? step.items.split(",") : []
        }))
        setStepData(newStepData);
        setStepActiveKey(ct.caseTypeSteps.map(step => '' + step.id));

    }

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
    }

    const handleStepItemTagClose = (stepId,removedTag) => {
        let newStepData = stepData.map(step => (step.id === stepId ? 
            {...step,itemData: step.itemData.filter(item => item !==removedTag)} :
            {...step}
        ))
        setStepData(newStepData);
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
        if(suspectsData.length === 0) {
            errorInfo += '请输入对象；'
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
                suspects: suspectsData.map(data => ({
                    name: data
                })),
                steps: stepData.filter(sd => sd.itemData && sd.itemData.length > 0).map(sd => ({
                    name: sd.name,
                    items: sd.itemData.map(i => ({
                        itemName: i
                    }))
                }))
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
        setSuspectsData([]);
        setStepData([]);
        setStepActiveKey([]);
        setSaveResult({
            code: null,
            message: null
        });

    }

    return (
        <>
            <PageHeader
                title="新建案件"
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
                                <Col span={9} className="case-form-area">
                                    <Form.Item name="name" label="名称">
                                        <Input placeholder="请输入名称" maxLength={50}/>
                                    </Form.Item>

                                    <Form.Item label="对象">
                                        {
                                            suspectsData.map((tag,index) => {
                                                return (
                                                    <Tag
                                                        className="edit-tag"
                                                        key={tag}
                                                        closable={true}
                                                        onClose={() => handleSuspectTagClose(tag)}
                                                    >
                                                        {tag}
                                                    </Tag>
                                                )
                                            })
                                        }
                                    {suspectInputVisible && (
                                        <Input
                                        ref={suspectInputRef}
                                        type="text"
                                        size="small"
                                        className="tag-input"
                                        value={suspectInputValue}
                                        onChange={handleSuspectInputChange}
                                        onBlur={handleSuspectInputConfirm}
                                        onPressEnter={handleSuspectInputConfirm}
                                        />
                                    )}
                                    {!suspectInputVisible && (
                                        <Tag className="site-tag-plus" onClick={showSuspectInput}>
                                        <PlusOutlined /> 新增
                                        </Tag>
                                    )}
                                    </Form.Item>
                                </Col>
                                <Col span={15} className="case-form-area">
                                    <Form.Item name="typeId" label="类型">
                                        <Radio.Group onChange={onCaseTypeChange}>
                                            {
                                                caseTypeData.map((caseType,index) => (
                                                    <Radio.Button value={caseType.id} key={caseType.id}>{caseType.name}</Radio.Button>
                                                ))
                                            }
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item label="步骤及事项">
                                    <Collapse
                                        activeKey={stepActiveKey}
                                        onChange={handleCollapseChange}
                                        className="case-form-step-data"
                                    >
                                        {
                                            stepData.map(step => (
                                                <Panel header={step.name} key={'' + step.id} collapsible="header">
                                                    {
                                                        (step.itemData && step.itemData.length > 0) ? 
                                                            step.itemData.map(item => (
                                                                <Tag
                                                                    className="edit-tag"
                                                                    key={item}
                                                                    closable={true}
                                                                    onClose={() => handleStepItemTagClose(step.id,item)}
                                                                >
                                                                    {item}
                                                                </Tag>
                                                            ))
                                                            : ""
                                                    }
                                                </Panel>
                                            ))
                                        }
                                    </Collapse>
                                    </Form.Item>
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