import { useEffect, useState, useRef } from "react";
import { Form, Input, Button, Table, Drawer, Row, Col, Space } from 'antd';
import { lawArticleList } from "../../../../api/biz"
import './index.css';

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
                            <Input maxLength={10} placeholder="标题" size="small"/>
                        </Form.Item>
                        <Form.Item name="content" label="内容">
                            <Input maxLength={20} placeholder="内容" style={{width: "300px"}} size="small"/>
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
                        <Input.TextArea readOnly bordered={false} style={{
                            height: 'calc(100vh - 220px)',
                            marginTop: '20px'
                        }} value={detail.content} ref={contentRef}/>
                        {
                            detail.attachmentId ? (
                                <div><span style={{fontWeight:'600',height:'40px',lineHeight:'40px'}}>附件: </span><a href={"/legal-case/attachment/get/" + detail.attachmentId} target={"_blank"}>{detail.attachmentName}</a></div>) : (<></>)
                        }
            </Drawer>
        </div>
    );
}

export default LawArticleData;