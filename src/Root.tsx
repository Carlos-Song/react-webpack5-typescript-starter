import React from 'react';
import { HashRouter } from 'react-router-dom';  // router模式 自行选择 这里拿hash做例子
import { Routes } from './routes/Routes';


export const Root:React.FC = React.memo(function Root() {
  // 启用react的严格模式
  return (
    <React.StrictMode>
        <HashRouter>
          <Routes/>
        </HashRouter>
    </React.StrictMode>
  );
});

