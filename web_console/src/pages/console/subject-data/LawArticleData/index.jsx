import { useEffect, useState, useRef } from "react";
import { Form, Input, Button, Table, Drawer, Row, Col, Space } from 'antd';
import { lawArticleList } from "../../../../api/biz"
import './index.css';

const { Search } = Input;

const LawArticleData = () => {
    const [searchForm] = Form.useForm();

    const [data, setData] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [total, setTotal] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    
    const [detail,setDetail] = useState({});
    const [detailVisible, setDetailVisible] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        loadData();
    }, [page]);

    let columns = [
        
        {
            title: '名称',
            dataIndex: 'title',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        }/*,
        {
            title: '序号',
            dataIndex: 'orderValue',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            width: 80
        },
        {
            title: '录入时间',
            dataIndex: 'createdTime',
            onHeaderCell: function (column) {
                column.align = "center"
            },
            width: 170
        }*/
    ];

    const onTablePageChange = (page, pageSize, sorter, extra) => {
        setPage(page);
        setPageSize(pageSize);
    }

    const loadData = () => {
        setDataLoading(true);
        let formData = searchForm.getFieldsValue();
        let params = {
            entity: {
                "titleSearch": formData.title,
                "content": formData.content
            },
            pageNum: page - 1,
            pageSize,
            orderBy: "orderValue asc"
        }
        lawArticleList(params).then(res => {
            setData(res.rows);
            setTotal(res.total)
        });
        setDataLoading(false);
    }

    const showDrawer = (r) => {
        if(r != null) {
            setDetail(r);
        }
        setDetailVisible(true);
    }

    const closeDrawer = () => {
        setDetailVisible(false);
        setDetail({});
    }

    const onSearch = (value) => {
        if(value && value.length > 0) {
            contentRef.current.focus();
            if(windowSearch(value)) {
                let s = window.getSelection();
                let {withinFlag,offsetTop} = searchResultProperties(s.anchorNode);
                console.log(s);
                console.log(withinFlag,offsetTop);
                if(withinFlag) {
                    //contentRef.current.scrollTo(0,2242);
                }
                //let top = s.anchorNode.parentElement.offsetTop + s.anchorNode.parentElement.parentElement.offsetTop + s.anchorNode.parentElement.parentElement.parentElement.offsetTop;
                //contentRef.current.scrollTo(0,top + s.focusOffset);
            }
        }
    }

    const windowSearch = (v) => {
        return window.find(v,true,false,true);
    }

    const searchResultProperties = (anchorNode) => {
        let p = anchorNode.parentElement;
        let resultTop = 0;
        while(p) {
            console.log('nodeName:',p.nodeName,"nodeId:",p.id);
            if(p.nodeName === "BODY") {
                break;
            }
            resultTop = resultTop + p.offsetTop
            if(p.id && p.id === 'contentDiv') {
                return {'withinFlag': true, 'offsetTop': resultTop};
            }
            p = p.parentElement;
        }
        return {'withinFlag':false,'offsetTop':0};
    }

    const handleScroll = (a,b,c,d) => {
        console.log(a,b,c,d)
    }

    return (
        <div className="case-type-wrapper">
            <div className="toolbar-area">
                <Row>
                    <Col span={20}>
                    <Form form={searchForm} 
                        layout="inline"
                        onFinish={() => loadData()}
                        >
                        <Form.Item name="title" label="标题">
                            <Input maxLength={10} placeholder="标题" allowClear={true} size="small"/>
                        </Form.Item>
                        <Form.Item name="content" label="内容">
                            <Input maxLength={20} placeholder="内容" style={{width: "300px"}} allowClear={true} size="small"/>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" size="small" htmlType="submit">
                                查询
                            </Button>
                        </Form.Item>
                    </Form>
                    </Col>
                    <Col span={4}>
                        &nbsp;
                    </Col>
                </Row>
            </div>

            <Table
                columns={columns}
                dataSource={data}
                loading={dataLoading}
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
                onRow={record => {
                    return {
                        onDoubleClick: event => {
                            showDrawer(record);
                        }
                    }
                }}
            ></Table>
            <Drawer title="详细信息" placement="right" width={1000} maskClosable={false} visible={detailVisible} extra={
                <div>
                    <Space>
                        <Button onClick={closeDrawer} size="medium">关 闭</Button>
                    </Space>
                </div>
            } onClose={closeDrawer}>
                
                        <div style={{fontWeight:'600',height:'40px',lineHeight:'40px'}}>{detail.title}</div>
                        <div style={{fontStyle: 'italic', color: 'blue'}}>（提示：搜索定位请使用 Ctrl + F）</div>
                        <div style={{
                            height: 'calc(100vh - 220px)',
                            overflow: 'auto',
                            border: '1px solid #EFEFEF',
                            padding: '5px'
                        }} ref={contentRef} id="contentDiv">
                            {
                                 (detail.content && (detail.content.indexOf('</p>') > -1 || detail.content.indexOf('</span>') > -1)) ? (
                                    <p dangerouslySetInnerHTML={{__html: detail.content}}></p>
                                ) :
                                (
                                    <pre>{detail.content}</pre>
                                )
                            }
                        </div>
                        {
                            detail.attachmentId ? (
                                <div><span style={{fontWeight:'600',height:'40px',lineHeight:'40px'}}>附件: </span><a href={"/legal-case/attachment/get/" + detail.attachmentId} target={"_blank"}>{detail.attachmentName}</a></div>) : (<></>)
                        }
            </Drawer>
        </div>
    );
}

export default LawArticleData;