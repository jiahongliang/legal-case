import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from 'react-router';
import { Layout, Menu, Row, Col, Dropdown, Breadcrumb, Divider, Tag, Drawer, Form, Input, Button, Result, Tree } from "antd";
import { menus } from "./menu";
import { CONSOLE_NAVIGATE_TABS, LOGIN_USER_TOKEN, LOGIN_USER_MENUS } from '../../util/Constants'
import { logout, updatePassword, menuOrderList, saveMenuOrder } from '../../api/user'
import Base64 from 'base-64';

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    CaretDownOutlined,
    HomeOutlined,
    CaretRightOutlined
} from '@ant-design/icons';
import './Console.css'

const { Header, Sider, Content } = Layout;

const Console = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [pwdVisible, setPwdVisible] = useState(false);
    const [menuOrderVisible, setMenuOrderVisible] = useState(false);
    const [pwdResult, setPwdResult] = useState(null);
    const [pwdResultMsg, setPwdResultMsg] = useState("");
    const [pathNode, setPathNode] = useState([]);
    const [selectedMenuKey, setSelectedMenuKey] = useState(null);
    const [navigateTabs, setNavigateTabs] = useState([{
        key: '/console',
        label: '首 页',
        url: '/console',
        actived: true,
        keyPath: [],
    }]);
    const [loadTab, setLoadTab] = useState(true);
    const [loginUser, setLoginUser] = useState(null);
    const [userMenus, setUserMenus] = useState([]);

    const [pwdForm] = Form.useForm();
    let navigate = useNavigate();
    let location = useLocation();

    /**
     * navigateTabs变化时调用
     */
    useEffect(() => {
        if (navigateTabs.length > 1) {
            if (!loadTab) {
                let tabs = JSON.stringify(navigateTabs);
                sessionStorage.setItem(CONSOLE_NAVIGATE_TABS, tabs);
            } else {
                navigateTabs.forEach(item => {
                    if (item.url === location.pathname) {
                        item.actived = true;

                        let pathArr = [];
                        item.keyPath.slice().reverse().forEach(item => {
                            pathArr.push(getMenuItem(item));
                        });
                        setPathNode(pathArr);
                    } else {
                        item.actived = false;
                    }
                });
                setLoadTab(false);
            }
        }
    }, [navigateTabs]);

    /**
     * 组件加载时调用
     */
    useEffect(() => {
        let tabs = sessionStorage.getItem(CONSOLE_NAVIGATE_TABS);
        if (tabs && tabs.length > 0) {
            setLoadTab(true);
            setNavigateTabs(JSON.parse(tabs));
        } else {
            setLoadTab(false);
        }

        let loginUserToken = sessionStorage.getItem(LOGIN_USER_TOKEN);

        if (loginUserToken && loginUserToken.length > 0) {
            let userObj = JSON.parse(loginUserToken);
            setLoginUser(userObj);
            
            menuOrderList().then(res => {
                const menuOrders = new Map();
                res.rows.forEach(umo => {
                    menuOrders.set(umo.menuKey, umo.sort);
                });
                
                let roleArray = userObj.role ? userObj.role.split(',') : [];
                let newMenus = menus.map(menu => ({...menu, sort: menuOrders.get(menu.key) ? menuOrders.get(menu.key) : menu.sort})).filter(menu => roleArray.indexOf(menu.role) > -1).map(
                    menu => ({ ...menu, children: menu.children ? menu.children.filter(mo => roleArray.indexOf(mo.role) > -1) : null })
                ).sort((a, b) => a.sort - b.sort);
                setUserMenus(newMenus);
            });
            
        } else {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        let key = location.pathname;
        let keyNode = getMenuItem(key);
        if (keyNode != null) {
            let pathArr = [];
            keyNode.keyPath.slice().reverse().forEach(item => {
                pathArr.push(getMenuItem(item));
            });
            setPathNode(pathArr);
            setSelectedMenuKey(key);
            activeNavigateTab(keyNode);
        } else {
            setPathNode([]);
            setSelectedMenuKey(null);
            activeNavigateTab(navigateTabs[0]);
        }

    }, [location]);



    const toggle = () => {
        setCollapsed(!collapsed);
    }

    const menuClick = (e) => {
        //console.log(e);
        let keyNode = getMenuItem(e.key);
        if (keyNode != null) {
            let pathArr = [];
            e.keyPath.slice().reverse().forEach(item => {
                pathArr.push(getMenuItem(item));
            });
            setPathNode(pathArr);
            setSelectedMenuKey(e.key);
            gotoPage({ ...keyNode, keyPath: e.keyPath });
        } else {
            setPathNode([]);
            setSelectedMenuKey(null);
            gotoPage(navigateTabs[0]);
        }
    }

    const userMenuClick = (item) => {
        switch (item.key) {
            case "menuOrder":
                setMenuOrderVisible(true);
                break;
            case "updPassword":
                setPwdVisible(true);
                break;
            case "logout":
                logout().then(res => {
                    sessionStorage.removeItem(LOGIN_USER_TOKEN);
                    navigate("/");
                });
                break;
            default:
                console.log("do nothing");
        }
    }

    const userMenu = (
        <Menu items={
            [
                {
                    label: '菜单顺序',
                    key: 'menuOrder'
                },
                {
                    type: 'divider',
                },
                {
                    label: '修改密码',
                    key: 'updPassword'
                },
                {
                    label: '退出登录',
                    key: 'logout'
                }
            ]
        } onClick={userMenuClick} />
    );

    const clickTab = (e) => {
        e.preventDefault();
        let key = e.target.pathname;
        let tab = navigateTabs.find((item) => {
            return item.key === key;
        });
        if (key !== '/console') {
            menuClick(tab);
        } else {
            setPathNode([]);
            setSelectedMenuKey(null);
            gotoPage(tab);
        }
    }

    const gotoPage = (node) => {
        activeNavigateTab(node);
        navigate(node.url);
    }

    const activeNavigateTab = (tab) => {
        let existFlag = false;
        navigateTabs.forEach(item => {
            if (item.url === tab.url) {
                item.actived = true;
                existFlag = true;
            } else {
                item.actived = false;
            }
        });
        if (!existFlag) {
            let newNavigateTabs = navigateTabs.slice();
            if (tab.actived === null || tab.actived === undefined) {
                newNavigateTabs.push({ ...tab, actived: true });
            } else {
                tab.actived = true;
                newNavigateTabs.push({ ...tab });
            }
            setNavigateTabs(newNavigateTabs);
        }

    }

    const closeTab = (e, url) => {
        let newNavigateTabs = navigateTabs.filter(item => {
            return item.url !== url
        })
        setNavigateTabs(newNavigateTabs);
        if (location.pathname === url) {
            menuClick(newNavigateTabs[newNavigateTabs.length - 1]);
        }
    }

    const getMenuItem = (k) => {
        let result = null;
        menus.find((item) => {
            if (item.key === k) {
                result = { ...item, keyPath: [item.key] };
                return true;
            }
            if (item.children) {
                if (item.children.find(i => {
                    if (i.key === k) {
                        result = { ...i, keyPath: [i.key, item.key] };
                        return true;
                    }
                    return false;
                })) {
                    return true;
                }
            }
            return false;
        });
        return result;
    }

    const closeDrawer = () => {
        setPwdVisible(false);
        setPwdResult(null);
        setPwdResultMsg("");
        pwdForm.setFieldsValue({ oldpass: "", newpass: "", repass: "" });
    }

    const savePassword = (formData) => {
        // console.log("formData:",formData)
        // console.log(JSON.stringify(formData));
        let params = Base64.encode(JSON.stringify(formData));
        updatePassword(params).then(res => {
            // console.log(res);
            if (res.subCode === 0) {
                setPwdResult("success");
            } else {
                setPwdResult("error");
            }
            setPwdResultMsg(res.subMsg);
        }, error => {
            setPwdResult("error");
            setPwdResultMsg(error.message);
        });
    }

    const handleDrop = ({ event, node, dragNode, dragNodesKeys }) => {
        if (node.pos.length === 3 && node.pos.substring(0, node.pos.lastIndexOf('-')) === dragNode.pos.substring(0, dragNode.pos.lastIndexOf('-'))) {
            let start = node.sort > dragNode.sort ? dragNode.sort : node.sort;
            let end = node.sort > dragNode.sort ? node.sort : dragNode.sort;
            setUserMenus(userMenus.map(n => {
                //往下拉
                if (node.sort > dragNode.sort) {
                    if (n.sort === start) {
                        n.sort = end;
                    } else if (n.sort > start && n.sort <= end) {
                        n.sort = n.sort - 10;
                    }
                }
                if (node.sort < dragNode.sort) {
                    if (n.sort > start && n.sort < end) {
                        n.sort = n.sort + 10;
                    } else if (n.sort === end) {
                        n.sort = start + 10;
                    }
                }
                return n;
            }).sort((a, b) => a.sort - b.sort));
        }
        // console.log('event',event);
        // console.log('node',node);
        // console.log('dragNode',dragNode);
        // console.log('dragNodesKeys',dragNodesKeys);
    }

    const handleCloseMenuOrder = () => {
        let list = userMenus.map(menu => ({menuKey: menu.key, sort: menu.sort}));
        let data = {
            ext: list
        }
        console.log('data',data);
        saveMenuOrder(data).then(res => {
            console.log('menu order saved.')
        });
        setMenuOrderVisible(false);
    }

    return (
        <Layout className="console-container">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">{collapsed ? '执法' : '公安执法办案智能辅助平台'}</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[]}
                    selectedKeys={[selectedMenuKey]}
                    items={userMenus}
                    onClick={menuClick}
                />
            </Sider>
            <Layout className="console-layout">
                <Header className="console-header" style={{ padding: 0 }}>
                    <Row justify="center" align="middle">
                        <Col span={1}>
                            {
                                React.createElement(
                                    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: toggle,
                                }
                                )
                            }
                        </Col>
                        <Col span={1} style={{ textAlign: 'center' }} >
                            <Divider type="vertical" />
                        </Col>
                        <Col span={16} >
                            <Breadcrumb separator={<CaretRightOutlined />}>
                                <Breadcrumb.Item><HomeOutlined /> 首页</Breadcrumb.Item>
                                {
                                    pathNode.map(item => {
                                        return (
                                            <Breadcrumb.Item key={item.key}>
                                                {item.icon} {item.label}
                                            </Breadcrumb.Item>
                                        );
                                    })
                                }
                            </Breadcrumb>
                        </Col>
                        <Col span={6} className="user-center">
                            <Dropdown overlay={userMenu}>
                                <span>
                                    {loginUser ? loginUser.name : ''}
                                    <UserOutlined className="user-icon" />
                                    <CaretDownOutlined />
                                </span>
                            </Dropdown>
                        </Col>
                    </Row>
                </Header>
                <div className="console-page-tab-container">
                    {
                        navigateTabs.map(item => {
                            return (
                                <Tag closable={item.url === '/console' ? false : true} className={item.actived ? 'actived' : ''} key={item.key} onClose={(e) => { closeTab(e, item.url) }}>
                                    <a href={item.url} onClick={clickTab}>{
                                        item.label
                                    }</a>
                                </Tag>
                            );
                        })
                    }
                </div>
                <Drawer title="修改密码" placement="right" width={300} visible={pwdVisible} onClose={closeDrawer}>
                    {pwdResult == null ? (
                        <Form form={pwdForm} layout="vertical" onFinish={savePassword}>
                            <Form.Item name="oldpass" label="原密码" tooltip="请输入当前密码" rules={[{ required: true, message: '当前密码必须输入' }]}>
                                <Input.Password placeholder="请输入当前密码" />
                            </Form.Item>
                            <Form.Item name="newpass" label="新密码" tooltip="请输入新密码" rules={[{ required: true, message: '新密码必须输入' }]}>
                                <Input.Password placeholder="请输入新密码" />
                            </Form.Item>
                            <Form.Item name="repass" label="确认密码" tooltip="请输入确认密码" rules={[{ required: true, message: '确认密码必须输入' }, ({ getFieldValue }) => ({
                                validator(role, value) {
                                    if (value !== getFieldValue("newpass")) {
                                        return Promise.reject("确认密码要与新密码相同");
                                    }
                                    return Promise.resolve();
                                }
                            })]}>
                                <Input.Password placeholder="请输入确认密码" />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 6, span: 20 }}>
                                <Button type="primary" htmlType="submit">
                                    保存
                                </Button> &nbsp;
                                <Button onClick={closeDrawer}>取消</Button>
                            </Form.Item>
                        </Form>
                    ) : (<Result status={pwdResult} title={pwdResultMsg} extra={[<Button onClick={closeDrawer}>关闭</Button>]}></Result>)}
                </Drawer>
                <Drawer title="调整菜单顺序" placement="right" width={600} visible={menuOrderVisible} onClose={handleCloseMenuOrder} extra={
                        <Button onClick={handleCloseMenuOrder} size="medium">关闭</Button>
                    }>
                    <Tree
                        showLine={{ showLeafIcon: false }}
                        showIcon={true}
                        fieldNames={{ title: 'label', key: 'key', children: 'children' }}
                        treeData={userMenus}
                        draggable={{ icon: false, nodeDraggable: (node, dataNode) => true }}
                        selectable={false}
                        onDrop={handleDrop}
                    />
                </Drawer>
                <Content className="console-content">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default Console;
