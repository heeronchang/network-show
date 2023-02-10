import { Outlet, useLocation } from "react-router-dom";

import { Layout, Menu } from "antd";
import { LineChartOutlined } from "@ant-design/icons";
import "./index.scss";
import { routeConfig } from "@/routes/Index";
import { ItemType } from "antd/lib/menu/hooks/useItems";

const { Sider, Content } = Layout;

const getItems = () => {
  return routeConfig[0].children?.filter((item) => !item.index) as ItemType[];
};

const AppLayout: React.FC = () => {
  const location = useLocation();

  let defaultSelectedKeys: string[] = [];
  const pathname = location.pathname === "/" ? "/net" : location.pathname;
  defaultSelectedKeys = [pathname];

  return (
    <Layout hasSider className="app-layout">
      <Sider
        style={{
          overflow: "auto",
          height: "100%",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}>
        <div className="logo">
          <LineChartOutlined style={{ fontSize: "48px", color: "#fff" }} />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={defaultSelectedKeys} items={getItems()} />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}>
        <Content
          className="site-layout-content"
          style={{
            margin: "64px 16px 70px",
            overflow: "initial",
          }}>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              textAlign: "center",
            }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
