import { useEffect, useState } from "react";
import { Form, Input, Button, Table, DatePicker} from 'antd';
import { loginLogList, loginLogExcel } from '../../../../api/user'
import './index.css'

const { RangePicker } = DatePicker;

const LoginLog = () => {
    const [searchForm] = Form.useForm();
    const [dataLoading, setDataLoading] = useState(false);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);


    let columns = [
        {
            title: '登录人',
            dataIndex: 'name',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: 'IP地址',
            dataIndex: 'ip',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: '设备类型',
            dataIndex: 'deviceType',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: '浏览器',
            dataIndex: 'browser',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: '操作系统',
            dataIndex: 'system',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: '登录时间',
            dataIndex: 'createdTime',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
        {
            title: '退出时间',
            dataIndex: 'endTime',
            onHeaderCell: function (column) {
                column.align = "center"
            }
        },
    ];

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        loadData();
    }, [page]);

    const onFinishSearchForm = () => {
        loadData();
    }

    const loadData = () => {
        setDataLoading(true);
        let formData = searchForm.getFieldsValue();
        let createdTime = formData.createdTime;
        let range = [];
        if(createdTime && createdTime.length == 2) {
            range.push(
                {
                    field: 'createdTime',
                    from: createdTime[0].hour(0).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss'),
                    to: createdTime[1].hour(23).minute(59).second(59).format('YYYY-MM-DD HH:mm:ss')
                }
            )
            console.log();
        }
        
        let param = {
            entity: {
                nameSearch: formData.name
            },
            range,
            pageNum: page - 1,
            pageSize,
            orderBy: "createdTime desc"

        };
        loginLogList(param).then(res => {
            setData(res.rows);
            setTotal(res.total)
        });
        setDataLoading(false);
    }

    const onTablePageChange = (page, pageSize, sorter, extra) => {
        setPage(page);
        setPageSize(pageSize);
    }

    const exportExcel = () => {
        setDataLoading(true);
        let formData = searchForm.getFieldsValue();
        let param = {
            entity: {
                nameSearch: formData.name
            },
            pageNum: page - 1,
            pageSize,
            orderBy: "createdTime desc"
        };
        loginLogExcel(param).then(res => {console.log(res);
            let blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8text/plain;charset=utf-8'});
            // 获取heads中的filename文件名
            let downloadElement = document.createElement("a");
            // 创建下载的链接
            let href = window.URL.createObjectURL(blob);
            downloadElement.href = href;
            // 下载后文件名
            downloadElement.download = "登录日志";
            document.body.appendChild(downloadElement);
            // 点击下载
            downloadElement.click();         // 下载完成移除元素
            document.body.removeChild(downloadElement);
        });
        setDataLoading(false);
    }

    return (
        <div className="user-manage-wrapper">
            <Form form={searchForm}
            layout="inline"
            className="search-form"
            onFinish={onFinishSearchForm}
            >
               

                <Form.Item name="name" label="姓名">
                    <Input maxLength={10} placeholder="姓名" allowClear={true} size="small"/>
                </Form.Item>

                <Form.Item name="createdTime" label="登录日期">
                    <RangePicker allowClear={true} size="small"/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" size="small" htmlType="submit">
                        查询
                    </Button>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button  size="small" onClick={exportExcel}>
                        导出
                    </Button>
                </Form.Item>
            </Form>

            <Table
                columns={columns}
                dataSource={data}
                loading={dataLoading}
                pagination={{
                    position: ["bottomRight"],
                    total: total,
                    showSizeChanger: true,
                    pageSizeOptions:[10,20,50,100,500,1000],
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
            ></Table>
            
        </div>
    );
}

export default LoginLog;