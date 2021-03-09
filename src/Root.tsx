import React from 'react';
import { HashRouter } from 'react-router-dom';  // router模式 自行选择 这里拿hash做例子
import { Routes } from './routes/Routes';
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'http://localhost:3000/graphql',
});

export const Root:React.FC = React.memo(function Root() {
  // 启用react的严格模式
  return (
    <React.StrictMode>
      <Provider value={client} >
        <HashRouter>
          <Routes/>
        </HashRouter>
        </Provider>
    </React.StrictMode>
  );
});

