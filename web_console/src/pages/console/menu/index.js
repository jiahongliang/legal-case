import {
    TeamOutlined,
    UserAddOutlined,
    IdcardOutlined, 
    ContainerOutlined, 
    FileDoneOutlined, 
    SettingOutlined, 
    PartitionOutlined, 
    ReadOutlined,
    FormOutlined,
    CopyOutlined
} from '@ant-design/icons';

export const menus = [
    {
        key: '/console/users',
        label: '用户管理',
        icon: <TeamOutlined />,
        role: 'ADMIN',
        children: [
            {
                key: '/console/users/to-be-confirmed',
                label: '确认用户',
                icon: <UserAddOutlined />,
                url: '/console/users/to-be-confirmed',
                role: 'ADMIN',
            },
            {
                key: '/console/users/user-manage',
                label: '用户管理',
                icon: <IdcardOutlined />,
                url: '/console/users/user-manage',
                role: 'ADMIN',
            }
        ]
    },
    {
        key: '/console/base-config',
        label: '基础配置',
        icon: <SettingOutlined />,
        role: 'ADMIN',
        children: [
            {
                key: '/console/base-config/case-type',
                label: '案件类型',
                icon: <PartitionOutlined />,
                url: '/console/base-config/case-type',
                role: 'ADMIN',
            },
            /*{
                key: '/console/base-config/definition',
                label: '案件定义',
                icon: <ProfileOutlined />,
                url: '/console/base-config/definition'
            }*/
        ]
    },
    {
        key: '/console/biz-handle',
        label: '案件办理',
        icon: <ReadOutlined />,
        role: 'USER',
        children: [
            {
                key: '/console/biz-handle/new-instance',
                label: '新建案件',
                icon: <FormOutlined />,
                url: '/console/biz-handle/new-instance',
                role: 'USER',
            },
            {
                key: '/console/biz-handle/instance-list',
                label: '案件办理',
                icon: <CopyOutlined />,
                url: '/console/biz-handle/instance-list',
                role: 'USER',
            },
        ]
    },
    {
        key: '/console/biz-info',
        label: '业务数据',
        icon: <ContainerOutlined />,
        role: 'ADMIN',
        children: [
            {
                key: '/console/biz-info/instance',
                label: '案件管理',
                icon: <FileDoneOutlined />,
                url: '/console/biz-info/instance',
                role: 'ADMIN',
            },
            /*
            {
                key: '/console/biz-info/statistic',
                label: '案件统计',
                icon: <FundOutlined />,
                url: '/console/biz-info/statistic',
                role: 'ADMIN',
            }*/
        ]
    },
];