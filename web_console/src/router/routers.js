import { useRoutes } from "react-router-dom";
import { lazy } from "react";
import { wrapper } from '../pages';

export const Console = lazy(() => import('../pages/console/Console'));
export const Dashboard = lazy(() => import('../pages/console/Dashboard'));
export const CaseType = lazy(() => import('../pages/console/base-config/CaseType'));
export const CaseDefinition = lazy(() => import('../pages/console/base-config/CaseDefinition'));
export const ConfirmUser = lazy(() => import('../pages/console/users/ConfirmUser'));
export const UserManage = lazy(() => import('../pages/console/users/UserManage'));
export const CaseInstance = lazy(() => import('../pages/console/biz-info/CaseExecution'));
export const CaseStatistic = lazy(() => import('../pages/console/biz-info/CaseStatistic'));
export const BizHandle = lazy(() => import('../pages/console/biz-handle/BizHandle'));
export const CreateCase = lazy(() => import('../pages/console/biz-handle/CreateCase'));
export const UserRegister = lazy(() => import('../pages/register/UserRegister'));
export const Login = lazy(() => import('../pages/Login.jsx'));


const GetRoutes = () => {
    const routes = useRoutes([
        {
            path: '/',
            element: wrapper(Login)
        },
        {
            path: '/register',
            element: wrapper(UserRegister)
        },
        {
            path: '/console',
            element: wrapper(Console),
            children: [
                {
                    index: true,
                    element: wrapper(Dashboard)
                },
                {
                    path: '/console/users/to-be-confirmed',
                    element: wrapper(ConfirmUser)
                },
                {
                    path: '/console/users/user-manage',
                    element: wrapper(UserManage)
                },
                {
                    path: '/console/base-config/case-type',
                    element: wrapper(CaseType)
                },
                {
                    path: '/console/base-config/definition',
                    element: wrapper(CaseDefinition)
                },
                {
                    path: '/console/biz-handle/instance-list',
                    element: wrapper(BizHandle)
                },
                {
                    path: '/console/biz-handle/new-instance',
                    element: wrapper(CreateCase)
                },
                {
                    path: '/console/biz-info/statistic',
                    element: wrapper(CaseStatistic)
                },
                {
                    path: '/console/biz-info/instance',
                    element: wrapper(CaseInstance)
                }
            ]
        }
    ]);
    return routes;
}

export default GetRoutes;