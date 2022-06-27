import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'antd/dist/antd.min.css';
import {BrowserRouter as Router} from 'react-router-dom';
import GetRoutes from './router/routers';
import ErrorBoundary from './components/ErrorBoundary';
import zh_CN from 'antd/es/locale/zh_CN';
import { ConfigProvider} from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zh_CN}>
    <ErrorBoundary>
      <Router>
        <GetRoutes />
      </Router>
    </ErrorBoundary>
    </ConfigProvider>
);

