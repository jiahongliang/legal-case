import { useEffect, useState, useRef } from 'react';
import { handleCaseExecution, downloadCase } from '../../../../../../api/biz'
import newCaseIcon from '../../../../../../assets/images/new-case.jpg';
import { PageHeader, Button, Form,  Row, Col, Tag, Collapse, Popconfirm, Tooltip, Input, message, Checkbox} from "antd";
import {CloseOutlined, PlusOutlined, CheckCircleOutlined, UserOutlined} from '@ant-design/icons';
import moment from 'moment'
import './index.css'

const { Panel } = Collapse;

const HandleExecution = (props) => {
    const [data, setData] = useState({});
    const [caseTypeData, setCaseTypeData] = useState([]);
    const [stepActiveKey, setStepActiveKey] = useState([-1]);
    const [stepHistory, setStepHistory] = useState([]);
    const [stepData, setStepData] = useState([]);
    const [stepFilterText, setStepFilterText] = useState('');

    const [commentInputVisible, setCommentInputVisible] = useState(false);
    const [commentInputValue, setCommentInputValue] = useState('');
    const commentInputRef = useRef(null);
    const commentIdRef = useRef(0);

    useEffect(() => {
        let ct = props.caseTypeData.find(o => o.id === props.data.typeId);
        /*props.data.steps = props.data.steps ? [
            props.data.steps.map(step => {
                let o = ct.caseTypeSteps.find(s => s.name === step.name);
                return {...step, orderValue: o ? o.orderValue : 0}
            })
        ] : [];*/
        /*
        setData({...props.data, steps: props.data.steps ? [
            ...props.data.steps.map(step => {
                let o = ct.caseTypeSteps.find(s => s.name === step.name);
                return {...step, orderValue: o ? o.orderValue : 0}
            }).sort((v1,v2) => {
                let s1 = ('' + v1.orderValue).padStart(6,'0') + (v1.suspect ? v1.suspect : '') + '';
                let s2 = ('' + v2.orderValue).padStart(6,'0') + (v2.suspect ? v2.suspect : '') + '';
                return s1.localeCompare(s2);
            })
        ] : []});*/
        setRawData(props.data);
        setCaseTypeData(props.caseTypeData);
        setStepActiveKey(props.data.steps ? [...props.data.steps.map(step => step.id), -1] : [-1]);
        setStepData(ct.caseTypeSteps);
    }, []);

    useEffect(() => {
         console.log('data',data)
         setStepActiveKey(data.steps ? [...data.steps.map(step => step.keyid ? step.keyid : step.id), -1] : [-1]);
    }, [data]);

    const setRawData = (obj) => {
        let ct = props.caseTypeData.find(o => o.id === obj.typeId);
        setData({...obj, steps: obj.steps ? [
            ...obj.steps.map(step => {
                let o = ct.caseTypeSteps.find(s => s.name === step.name);
                return {...step, orderValue: o ? o.orderValue : 0}
            }).sort((v1,v2) => {
                let s1 = ('' + v1.orderValue).padStart(6,'0') + (v1.suspect ? v1.suspect : '') + '';
                let s2 = ('' + v2.orderValue).padStart(6,'0') + (v2.suspect ? v2.suspect : '') + '';
                return s1.localeCompare(s2);
            })
        ] : []});
    }

    const handleStepFilterText = (e) => {
        setStepFilterText(e.target.value);
    }

    const handleClickSourceStep = (stepId) => {
       
        let clickedStep = stepData.find(step => step.id === stepId);
        //clickedStep.id = null;
        console.log('clickedStep',clickedStep);
        stepHistory.push(data.steps);
        setStepHistory(stepHistory);

        let newStepData = [...data.steps, {...clickedStep,
            id: null,
            keyid: moment().format('X') + '' + data.steps.length,
            caseTypeStepItems: clickedStep.caseTypeStepItems.map(item => ({...item, keyid: moment().format('X') + '' + item.id, id: null, status: 2}))}];
        console.log('newStepData:',newStepData)
        newStepData = newStepData.sort((v1,v2) => {
            let s1 = ('' + v1.orderValue).padStart(6,'0') + (v1.suspect ? v1.suspect : '') + '';
            let s2 = ('' + v2.orderValue).padStart(6,'0') + (v2.suspect ? v2.suspect : '') + '';
            return s1.localeCompare(s2);
        });

        setData({
            ...data,
            steps: newStepData
        })
 /*
        
        let newStepData = [...selectedStepData, {...clickedStep,keyid: moment().format('X') + '' + selectedStepData.length}];
        newStepData = newStepData.sort((v1,v2) => {
            let s1 = '' + v1.orderValue + (v1.suspect ? v1.suspect : '') + '';
            let s2 = '' + v2.orderValue + (v2.suspect ? v2.suspect : '') + '';
            return s1.localeCompare(s2);
        });
        setSelectedStepData(newStepData);
        */
    }

    const handleCollapseChange = (keys) => {
        setStepActiveKey([...keys, -1]);
    }

    const handleSave = () => { 
        //console.log('saving:',data)
        let param = {
            entity: data
        }
        handleCaseExecution(param).then(res => {
            props.onSaveSuccess();
        });
    }

    /*
    const handleStepItemTagClose = (stepId, itemId) => {
        console.log('stepId type:',typeof(stepId),'stepId:',stepId);
        console.log('itemId type:',typeof(itemId),'itemId:',itemId);
        stepHistory.push(data.steps);
        setStepHistory(stepHistory);
        setData({
            ...data,
            steps: data.steps.map(step =>
                (step.id + '') === (stepId + '') ? ({
                    ...step, caseTypeStepItems: step.caseTypeStepItems.map(item => (itemId + '') === (item.keyid ? (item.keyid + '') : (item.id + '')) ? ({ ...item, status: 2 }) : item)
                }) : step
            )
        })
    }*/

    const handleStepItemClick = (stepId, itemId,isChecked) => {
        console.log('stepId type:',typeof(stepId),'stepId:',stepId);
        console.log('itemId type:',typeof(itemId),'itemId:',itemId);
        stepHistory.push(data.steps);
        setStepHistory(stepHistory);
        setData({
            ...data,
            steps: data.steps.map(step =>
                (step.id === null ? ((step.keyid + '') === (stepId + '')) : ((step.id + '') === (stepId + ''))) ? ({
                    ...step, caseTypeStepItems: step.caseTypeStepItems.map(item => (itemId + '') === (item.keyid ? (item.keyid + '') : (item.id + '')) ? ({ ...item, status: isChecked ? 1 : 2 }) : item)
                }) : step
            )
        })
    }

    const handleBackHistory = () => {
        let steps = stepHistory.pop();
        console.log('poped steps:',steps);
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

    const handleSuspectChange = (keyId,value) => {
        //console.log('keyid type:',typeof(keyId),'keyid value:',keyId);
        //console.log('suspect value:',value)
        //if(suspectInputFlag.current) {
            stepHistory.push(data.steps);
            setStepHistory(stepHistory);
            setData({
                ...data,
                steps: data.steps.map(step =>{
                    let x = step.keyid ? step.keyid : step.id;
                    return x === keyId ? ({...step, suspect: value}) : step 
                })
            })
        //} 

        /*historyData.push(selectedStepData);
        setHistoryData(historyData);
        setSelectedStepData(selectedStepData.map(step => step.keyid === keyId ? {...step, suspect: value} : step).sort((v1,v2) => {
            let s1 = '' + v1.orderValue + (v1.suspect ? v1.suspect : '') + '';
            let s2 = '' + v2.orderValue + (v2.suspect ? v2.suspect : '') + '';
            return s1.localeCompare(s2);
        }));*/
    }

    const handleStepCommentChange = (keyId,value) => {
        stepHistory.push(data.steps);
        setStepHistory(stepHistory);
        setData({
            ...data,
            steps: data.steps.map(step =>{
                let x = step.keyid ? step.keyid : step.id;
                return x === keyId ? ({...step, comment: value}) : step 
            })
        })
    }

    const handleSuspectBlur = () => {
        stepHistory.push(data.steps);
        setStepHistory(stepHistory);
        setData({
            ...data,
            steps: data.steps.sort((v1,v2) => {
                let s1 = ('' + v1.orderValue).padStart(6,'0') + (v1.suspect ? v1.suspect : '') + '';
                let s2 = ('' + v2.orderValue).padStart(6,'0') + (v2.suspect ? v2.suspect : '') + '';
                return s1.localeCompare(s2);
            })
        })
    }

    const handleRemoveSelectedStep = (stepId) => {
        stepHistory.push(data.steps);
        setStepHistory(stepHistory);

        setData({
            ...data,
            steps: data.steps.filter(step =>{
                let x = step.keyid ? step.keyid : step.id;
                return x !== stepId  
            })
        })
    }

    const showCommentInput = () => {
        setCommentInputVisible(true);
    }

    const handleCommentInputChange = (e) => {
        setCommentInputValue(e.target.value);
    }

    const handleCommentInputConfirm = () => {
        if(commentInputValue) {
            commentIdRef.current--;

            setData({
                ...data,
                comments: [...data.comments,{
                    id: commentIdRef.current,
                    name: commentInputValue,
                    status: 1
                }]
            })
        }
        setCommentInputValue('');
        setCommentInputVisible(false);
    }

    useEffect(() => {
        if(commentInputVisible) {
            commentInputRef.current?.focus();
        }
    },[commentInputVisible]);

    const handleDownload = () => {
        let param = {
            entity: data
        }
        handleCaseExecution(param).then(res => {
            if(res && res.rows) {
                let returnData = res.rows[0];
                setData({
                    ...returnData,
                    steps: returnData.steps.sort((v1,v2) => {
                        let s1 = ('' + v1.orderValue).padStart(6,'0') + (v1.suspect ? v1.suspect : '') + '';
                        let s2 = ('' + v2.orderValue).padStart(6,'0') + (v2.suspect ? v2.suspect : '') + '';
                        return s1.localeCompare(s2);
                    })
                })
            }
            downloadCase(data.id).then(res => {
                console.log(res);
                if(res.data.type && res.data.type === 'application/json') {
                    message.error("下载中出现错误，请检查数据格式。");
                }
                else {
                    downloadFile(res);
                }
            })
        });
        //window.open("/legal-case/case-execution/export-one/" + data.id);
    }

    const downloadFile = res => {
        let header_file = res.headers["content-disposition"];
        if (!header_file) {
            return false;
        }
        let fileName = header_file.split(";")[1].split("filename=")[1];
        fileName = decodeURI(fileName);
        let content = res.data;
        let blob = new Blob([content]);
        if ("download" in document.createElement("a")) {
            // 非IE下载
            let elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
        } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
        }
        return true;
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
                        <Col span={8} className="case-form-area">
                            <Form.Item label="类型">
                                {caseTypeData && caseTypeData.length > 0 ? caseTypeData.find(ctd => ctd.id === data.typeId).name : ""}
                            </Form.Item>

                            <Form.Item label="名称">
                                {data.name}
                            </Form.Item>
                            
                            <span style={{fontWeight: 600}}>可选步骤 <Input onChange={handleStepFilterText}></Input></span>
                            <div className="case-type-source-step-area">
                            {
                                stepData.filter(step => stepFilterText.length === 0 || step.nameSearch.indexOf(stepFilterText) >= 0).map(step => (
                                    <Button key={step.id} type="primary" style={{width: '95%'}} shape="round" block className="case-step-button" onClick={() => {handleClickSourceStep(step.id)}}>{step.name}</Button>
                                ))
                            }
                            </div>
                        </Col>
                        <Col span={16} className="case-form-area">
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
                                        <Panel header={<div style={{width: '300px',display: 'flex'}}><div style={{wordBreak: 'keep-all'}}>{step.name}</div>
                                        <Input style={{float: "right",marginLeft: '5px'}} size="small" placeholder="对象名称" value={step.suspect ? step.suspect : ''}
                                        onBlur={(event) => handleSuspectBlur()}
                                        onChange={(event) => handleSuspectChange(step.keyid ? step.keyid : step.id,event.target.value)} 
                                        onClick={(event) => {event.stopPropagation()}}
                                        prefix={<UserOutlined />}
                                        ></Input></div>}
                                         key={step.keyid ? step.keyid : step.id} collapsible="header" extra={
                                            <><CloseOutlined  onClick={() => handleRemoveSelectedStep(step.keyid ? step.keyid : step.id)}/></>
                                            }>
                                            {
                                                (step.caseTypeStepItems && step.caseTypeStepItems.length > 0) ? 
                                                    step.caseTypeStepItems.map(item =>  
                                                        <Tooltip key={item.name}  placement="topLeft" title={item.lawTitle} color="gold" arrowPointAtCenter>
                                                            
                                                            <Checkbox 
                                                                key={item.keyid ? item.keyid : item.id} 
                                                                checked={!item.status || item.status === 1} 
                                                                onChange={(e) => {handleStepItemClick(step.keyid ? step.keyid : step.id, item.keyid ? item.keyid : item.id, e.target.checked)}}>{item.name}</Checkbox>
                                                        </Tooltip>
                                                     )
                                                    : ''
                                            }
                                            <Input style={{width: '200px',marginLeft: '5px'}} size="small" placeholder="自定义" value={step.comment ? step.comment : ''}
                                                onChange={(event) => handleStepCommentChange(step.keyid ? step.keyid : step.id,event.target.value)} 
                                                onClick={(event) => {event.stopPropagation()}}
                                                prefix={<CheckCircleOutlined />}
                                                ></Input>
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

                                    {commentInputVisible && (
                                        <Input
                                        ref={commentInputRef}
                                        type="text"
                                        size="small"
                                        className="tag-input"
                                        value={commentInputValue}
                                        onChange={handleCommentInputChange}
                                        onBlur={handleCommentInputConfirm}
                                        onPressEnter={handleCommentInputConfirm}
                                        />
                                    )}

                                    {!commentInputVisible && (
                                        <Tag className="site-tag-plus" onClick={showCommentInput}>
                                            <PlusOutlined /> 新增
                                        </Tag>
                                    )}
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