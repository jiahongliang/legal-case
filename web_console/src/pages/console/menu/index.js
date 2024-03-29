import {
    TeamOutlined,
    UserAddOutlined,
    IdcardOutlined, 
    ContainerOutlined, 
    FileDoneOutlined, 
    SettingOutlined, 
    PartitionOutlined, 
    FormOutlined,
    CopyOutlined,
    BookOutlined,
    GoldOutlined,
    ProjectOutlined,
    FileSearchOutlined,
    HolderOutlined,
    TabletOutlined
} from '@ant-design/icons';

export const menus = [
    {
        key: '/console/users',
        label: '用户管理',
        sort: 10,
        icon: <TeamOutlined />,
        role: 'ADMIN',
        children: [
            {
                key: '/console/users/to-be-confirmed',
                label: '确认用户',
                sort: 10,
                icon: <UserAddOutlined />,
                url: '/console/users/to-be-confirmed',
                role: 'ADMIN',
            },
            {
                key: '/console/users/user-manage',
                label: '用户管理',
                sort: 20,
                icon: <IdcardOutlined />,
                url: '/console/users/user-manage',
                role: 'ADMIN',
            },
            {
                key: '/console/users/login-log',
                label: '登录日志',
                sort: 30,
                icon: <HolderOutlined />,
                url: '/console/users/login-log',
                role: 'ADMIN',
            }
        ]
    },
    {
        key: '/console/base-config',
        label: '基础配置',
        sort: 20,
        icon: <SettingOutlined />,
        role: 'ADMIN',
        children: [
            {
                key: '/console/base-config/case-type',
                label: '案件类型',
                sort: 10,
                icon: <PartitionOutlined />,
                url: '/console/base-config/case-type',
                role: 'ADMIN',
            },
            {
                key: '/console/base-config/subject-manage',
                label: '专项执法',
                sort: 20,
                icon: <BookOutlined />,
                url: '/console/base-config/subject-manage',
                role: 'ADMIN',
            },
            {
                key: '/console/base-config/law-article',
                label: '执法依据',
                sort: 30,
                icon: <ProjectOutlined />,
                url: '/console/base-config/law-article',
                role: 'ADMIN',
            },
            {
                key: '/console/base-config/service-reminder',
                label: '服务提醒',
                sort: 40,
                icon: <TabletOutlined />,
                url: '/console/base-config/service-reminder',
                role: 'ADMIN',
            }
        ]
    },
    /*
    {
        key: '/console/biz-handle',
        label: '案件办理',
        icon: <ReadOutlined />,
        role: 'USER',
        children: [
            {
                key: '/console/biz-handle/new-instance',
                label: '案件新增',
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
        key: '/console/subject-data',
        label: '数据查询',
        icon: <BookOutlined />,
        role: 'USER',
        children: [
            {
                key: '/console/subject-data/subject-item',
                label: '专项执法',
                icon: <GoldOutlined />,
                url: '/console/subject-data/subject-item',
                role: 'USER',
            },
            {
                key: '/console/subject-data/law-article',
                label: '执法依据',
                icon: <FileSearchOutlined />,
                url: '/console/subject-data/law-article',
                role: 'USER',
            },
        ]
    },*/
    {
        key: '/console/biz-info',
        label: '业务数据',
        sort: 30,
        icon: <ContainerOutlined />,
        role: 'ADMIN',
        children: [
            {
                key: '/console/biz-info/instance',
                label: '案件管理',
                sort: 10,
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
    {
        key: '/console/biz-handle/new-instance',
        label: '案件新增',
        sort: 40,
        icon: <FormOutlined />,
        url: '/console/biz-handle/new-instance',
        role: 'USER',
    },
    {
        key: '/console/biz-handle/instance-list',
        label: '案件办理',
        sort: 50,
        icon: <CopyOutlined />,
        url: '/console/biz-handle/instance-list',
        role: 'USER',
    },
    {
        key: '/console/subject-data/subject-item',
        label: '专项执法',
        sort: 60,
        icon: <GoldOutlined />,
        url: '/console/subject-data/subject-item',
        role: 'USER',
    },
    {
        key: '/console/subject-data/law-article',
        label: '执法依据',
        sort: 70,
        icon: <FileSearchOutlined />,
        url: '/console/subject-data/law-article',
        role: 'USER',
    },
    {
        key: '/console/subject-data/service-reminder',
        label: '服务提醒',
        sort: 80,
        icon: <TabletOutlined />,
        url: '/console/subject-data/service-reminder',
        role: 'USER',
    },
];