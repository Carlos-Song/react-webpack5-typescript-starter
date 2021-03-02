import { Loading } from "carbon-components-react";
import React, { Suspense } from "react";
import { RouteProps, Route, Switch, Redirect } from "react-router-dom";


const routes: RouteProps[] = [
  {
    path: "/login",
    exact: true,
    // 按需加载，申明chunkName是方便看，比如打包的时候可以直接使用chunkName（会有缓存问题，还是用chunkhash比较好，具体还是看业务场景）
    // 使用import的话只能用export default哦
    component: React.lazy(
      () => import(/* webpackChunkName:"LoginPage" */ "../pages/Login/Login")
    ),
  },
  {
    path: "/",
    component: React.lazy(
      () => import(/* webpackChunkName:"HomePage" */ "../pages/Home/Home")
    ),
  },
];

export const Routes = () => (
  // 可以做一个loading组件
  <Suspense fallback={<Loading />}>
    <Switch>
      {routes.map((val, key) => {
        return <Route key={`route_${key}`} {...val} />;
      })}
      <Redirect from="/" to="/#/" />
    </Switch>
  </Suspense>
);
