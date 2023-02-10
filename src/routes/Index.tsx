import React, { lazy, Suspense } from "react";
import { Link, RouteObject, useRoutes } from "react-router-dom";

import { ItemType } from "antd/lib/menu/hooks/useItems";
import Layout from "@/pages/layout/Index";

const Net = lazy(() => import("@/pages/net/Index"));
const BandWidth = lazy(() => import("@/pages/bandwidth/Index"));

type RouteConfigBase = Partial<Omit<RouteObject, "children">> & Partial<ItemType>;
type RouteConfig = RouteConfigBase & {
  children?: RouteConfig[];
};

const lazyLoad = (children: React.ReactNode) => {
  return <Suspense fallback={<h1>Loading..</h1>}>{children}</Suspense>;
};

// 配置路由
export const routeConfig: RouteConfig[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        label: <Link to="/net">网络连接</Link>,
        index: true,
        element: lazyLoad(<Net />),
      },
      {
        key: "/net",
        label: <Link to="/net">网络连接</Link>,
        path: "net",
        element: lazyLoad(<Net />),
      },
      {
        key: "/bandwidth",
        label: <Link to="/bandwidth">网络带宽</Link>,
        path: "bandwidth",
        element: lazyLoad(<BandWidth />),
      },
    ],
  },
  {
    path: "*",
    element: lazyLoad(<h1>Not Found.</h1>),
  },
];

const Routes = () => {
  return useRoutes(routeConfig);
};

export default Routes;
