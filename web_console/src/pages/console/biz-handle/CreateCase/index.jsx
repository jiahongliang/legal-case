import { useEffect, useState, useRef, createRef, React } from "react";
import { PageHeader, Button, Form, Input, Row, Col, Radio, Tag, Collapse, Popconfirm, Modal, Result, Tooltip, message } from "antd";
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { caseTypeList, createCaseExecution, downloadCase } from '../../../../api/biz'
import moment from 'moment'
import newCaseIcon from '../../../../assets/images/new-case.jpg';
import './index.css';
import { useNavigate } from 'react-router';

const { Panel } = Collapse;

const CreateCase = () => {
    const [caseForm] = Form.useForm();
    //const [suspectInputVisible, setSuspectInputVisible] = useState(false);
    const [id, setId] = useState(null);
    const [commentsData, setCommentsData] = useState([]);
    const [commentInputVisible, setCommentInputVisible] = useState(false);
    const [commentInputValue, setCommentInputValue] = useState('');
    const commentInputRef = useRef(null);
    const commentEditInputRef = useRef(null);
    const commentIdRef = useRef(0);

    const suspectInputRef = createRef();
    //const [suspectInputValue, setSuspectInputValue] = useState('');
    const [stepData, setStepData] = useState([]);
    const [stepFilterText, setStepFilterText] = useState('');
    const [selectedStepData, setSelectedStepData] = useState([]);
    const [historyData, setHistoryData] = useState([]);
    const [stepActiveKey, setStepActiveKey] = useState(['-1']);
    const [saveResult, setSaveResult] = useState({
        code: null,
        message: null
    });

    const [caseTypeData, setCaseTypeData] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        loadCaseTypeData();
    }, [])

    useEffect(() => {
        if (commentInputVisible) {
            commentInputRef.current?.focus();
        }
    }, [commentInputVisible]);

    useEffect(() => {
        commentEditInputRef.current?.focus();
    }, [commentInputValue]);

    const handleCloseComment = (id) => {
        commentsData.forEach(comment => {
            if (comment.id && comment.id === id) {
                comment.status = '2';
            }
        });
    }

    const showCommentInput = () => {
        setCommentInputVisible(true);
    }

    const handleCommentInputChange = (e) => {
        setCommentInputValue(e.target.value);
    }

    const handleCommentInputConfirm = () => {
        if (commentInputValue) {
            commentIdRef.current--;
            setCommentsData([...commentsData, {
                id: commentIdRef.current,
                name: commentInputValue,
                status: 1
            }]);
        }
        console.log("commentsData", commentsData);
        setCommentInputValue('');
        setCommentInputVisible(false);
    }

    useEffect(() => {
        setStepActiveKey([...selectedStepData.map(step => step.keyid), '-1']);
    }, [selectedStepData])

    /*
    useEffect(() => {
        console.log('stepActiveKey',stepActiveKey);
    },[stepActiveKey])
    */

    useEffect(() => {
        if (suspectInputRef.current) {
            suspectInputRef.current.focus();
        }
    }, [suspectInputRef]);

    const loadCaseTypeData = () => {
        let params = {
            entity: {},
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
        setSelectedStepData([]);
        setHistoryData([]);
        setStepActiveKey(['-1']);
        caseForm.setFieldsValue({ name: ct.name + moment().format('YYYYMMDDHHmm') });
    }

    const handleClickSourceStep = (stepId) => {
        let clickedStep = stepData.find(step => step.id === stepId);

        historyData.push(selectedStepData);
        setHistoryData(historyData);
        let newStepData = [...selectedStepData, { ...clickedStep, keyid: moment().format('X') + '' + selectedStepData.length }];
        newStepData = newStepData.sort((v1, v2) => {
            let s1 = ('' + v1.orderValue).padStart(6, '0') + (v1.suspect ? v1.suspect : '') + '';
            let s2 = ('' + v2.orderValue).padStart(6, '0') + (v2.suspect ? v2.suspect : '') + '';
            return s1.localeCompare(s2);
        });
        setSelectedStepData(newStepData);
    }

    const handleRemoveSelectedStep = (keyid) => {
        historyData.push(selectedStepData);
        setHistoryData(historyData);

        setSelectedStepData(selectedStepData.filter(step => step.keyid !== keyid));
    }

    const handleSuspectChange = (keyId, value) => {
        historyData.push(selectedStepData);
        setHistoryData(historyData);
        setSelectedStepData(selectedStepData.map(step => step.keyid === keyId ? { ...step, suspect: value } : step).sort((v1, v2) => {
            let s1 = ('' + v1.orderValue).padStart(6, '0') + (v1.suspect ? v1.suspect : '') + '';
            let s2 = ('' + v2.orderValue).padStart(6, '0') + (v2.suspect ? v2.suspect : '') + '';
            return s1.localeCompare(s2);
        }));
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

    const handleStepItemTagClose = (stepKeyId, itemId) => {
        historyData.push(selectedStepData);
        setHistoryData(historyData);
        setSelectedStepData(
            selectedStepData.map(
                step => step.keyid === stepKeyId ?
                    { ...step, caseTypeStepItems: step.caseTypeStepItems.filter(item => item.id !== itemId) } :
                    step
            )
        )
    }

    const handleCollapseChange = (keys) => {
        setStepActiveKey([...keys, '-1']);
    }

    const handleSave = (isExport) => {
        let name = caseForm.getFieldValue('name') ? caseForm.getFieldValue('name').trim() : '';
        let typeId = caseForm.getFieldValue('typeId') ? caseForm.getFieldValue('typeId') : null;
        let errorInfo = '';
        if (!name || name.length === 0) {
            errorInfo += '请输入名称；'
        }
        if (typeId == null) {
            errorInfo += '请选择类型；'
        }
        if (errorInfo.length > 0) {
            Modal.error({
                title: '错误提示',
                okText: '确定',
                content: errorInfo
            });
            return;
        }

        let params = {
            entity: {
                name,
                typeId,
                steps: selectedStepData.filter(sd => sd.caseTypeStepItems && sd.caseTypeStepItems.length > 0),
                comments: commentsData,
                id: id
            }
        }
        createCaseExecution(params).then(res => {
            if (res?.ext) {
                setId(res.ext);
            }
            if (!isExport) {
                if (res.subCode === 0) {
                    setSaveResult({ code: "success", message: res.subMsg });
                } else {
                    setSaveResult({ code: "error", message: res.subMsg });
                }
            } else {
                downloadCase(res.ext).then(r => {
                    if (r.data.type && r.data.type === 'application/json') {
                        message.error("下载中出现错误，请检查数据格式。");
                    }
                    else {
                        downloadFile(r);
                    }
                })
            }
        })
    }

    const resetPage = () => {
        caseForm.resetFields();
        setSelectedStepData([]);
        setHistoryData([]);
        setStepData([]);
        setStepActiveKey(['-1']);
        setCommentsData([]);
        setId(null);
        setSaveResult({
            code: null,
            message: null
        });
    }

    const handleStepFilterText = (e) => {
        setStepFilterText(e.target.value);
    }

    const handleBackHistory = () => {
        let data = historyData.pop();
        setHistoryData(historyData);
        setSelectedStepData(data);
    }

    const exitCreateCase = () => {
        setSaveResult({
            code: null,
            message: null
        });
        //navigate("/console/biz-handle/instance-list");
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
                title="案件新增"
                className="site-page-header"
                subTitle="选择类型并设置案件事项后，创建案件"
                extra={[<div key={1}>
                    <Button disabled={historyData.length === 0} onClick={handleBackHistory}>撤销</Button>
                    <Popconfirm placement="bottom" title="确认保存吗" onConfirm={() => handleSave(false)} okText="确定" cancelText="取消">
                        <Button key="btnSave" >保存</Button>
                    </Popconfirm>
                    <Button key="btnExport" onClick={() => handleSave(true)}>导出</Button>
                </div>
                ]}
                avatar={{ src: newCaseIcon }}
                onBack={exitCreateCase}
            >
                {
                    saveResult.code == null ? (
                        <Form form={caseForm} layout="vertical">
                            <Row gutter={16} className="case-form-row" justify="space-between">
                                <Col span={8} className="case-form-area">
                                    <Form.Item name="typeId" label="类型">
                                        <Radio.Group onChange={onCaseTypeChange}>
                                            {
                                                caseTypeData.map((caseType, index) => (
                                                    <Radio.Button value={caseType.id} key={caseType.id}>{caseType.name}</Radio.Button>
                                                ))
                                            }
                                        </Radio.Group>
                                    </Form.Item>

                                    <Form.Item name="name" label="名称">
                                        <Input placeholder="请输入名称" maxLength={50} onFocus={e => e.target.select()} />
                                    </Form.Item>
                                    <span style={{ fontWeight: 600 }}>可选步骤 <Input onChange={handleStepFilterText}></Input></span>
                                    <div className="case-type-source-step-area">
                                        {
                                            stepData.filter(step => stepFilterText.length === 0 || step.nameSearch.indexOf(stepFilterText) >= 0).map(step => (
                                                <Button key={step.id} type="primary" style={{ width: '95%' }} shape="round" block className="case-step-button" onClick={() => { handleClickSourceStep(step.id) }}>{step.name}</Button>
                                            ))
                                        }
                                    </div>
                                </Col>
                                <Col span={16} className="case-form-area">
                                    <span style={{ fontWeight: 600 }}>步骤及事项</span>
                                    <Collapse
                                        activeKey={stepActiveKey}
                                        onChange={handleCollapseChange}
                                        className="case-form-step-data"
                                        style={{ marginTop: '10px' }}
                                        expandIconPosition="left"
                                    >
                                        {
                                            selectedStepData.map(step => (
                                                <Panel header={<div style={{ width: '300px', display: 'flex' }}><div style={{ wordBreak: 'keep-all' }}>{step.name}</div>
                                                    <Input style={{ float: "right", marginLeft: '5px' }} size="small" placeholder="对象名称" onBlur={(event) => handleSuspectChange(step.keyid, event.target.value)} onClick={(event) => { event.stopPropagation() }}></Input></div>
                                                } key={step.keyid} collapsible="header" extra={
                                                    <><CloseOutlined onClick={() => handleRemoveSelectedStep(step.keyid)} /></>
                                                }>
                                                    {
                                                        (step.caseTypeStepItems && step.caseTypeStepItems.length > 0) ?
                                                            step.caseTypeStepItems.map(item => (
                                                                <Tooltip key={item.id} placement="topLeft" title={item.lawTitle} color="gold" arrowPointAtCenter>
                                                                    <Tag
                                                                        className="edit-tag"
                                                                        key={item.id}
                                                                        closable={true}
                                                                        onClose={() => handleStepItemTagClose(step.keyid, item.id)}
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
                                        <Panel header={
                                            <div style={{ width: '300px', display: 'flex' }}><div style={{ wordBreak: 'keep-all', fontWeight: '600' }}>备注</div></div>
                                        } key={'-1'} collapsible="header" >
                                            {
                                                commentsData.filter(comment => comment.status === 1).map((item, index) => {
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
                    ) : (
                        <Result status={saveResult.code}
                            title={saveResult.message}
                            extra={[<Button key={"btn_" + saveResult.code}
                                onClick={exitCreateCase}>关闭</Button>]}>
                        </Result>
                    )
                }

            </PageHeader>
        </>
    );
}

export default CreateCase;