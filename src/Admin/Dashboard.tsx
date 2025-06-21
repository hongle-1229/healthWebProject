import React, { useState } from "react";
import {
  ShoppingOutlined,
  MedicineBoxOutlined,
  HomeOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
// import Test from "./Test";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode
): MenuItem {
  return {
    key,
    icon,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Trang chủ", "/", <HomeOutlined />),
  getItem("Quản lý người dùng", "dashboard/manage-user", <UserOutlined />),
  getItem("Quản lý sản phẩm", "dashboard/manage-product", <ShoppingOutlined />),
  getItem("Quản lý trường hợp sơ cứu","dashboard/manage-first-aid", <MedicineBoxOutlined/>),
  getItem("Quản lý bài viết", "dashboard/manage-blog",<FileTextOutlined/>),
  getItem("Tài khoản", "dashboard/account", )

];

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["/"]}
          mode="inline"
          items={items}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
