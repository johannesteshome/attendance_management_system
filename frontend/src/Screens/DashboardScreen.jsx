import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children, danger) {
  return {
    key,
    icon,
    children,
    label,
    danger,
  };
}
const adminItems = [
  getItem(
    <Link to=''>Dashboards</Link>,
    "1",
    <Icon icon='akar-icons:dashboard' />
  ),
  getItem(
    <Link to='teachers-page'>Teachers</Link>,
    "2",
    <Icon icon='ph:chalkboard-teacher-light' />
  ),
  getItem(
    <Link to='students-page'>Students</Link>,
    "3",
    <Icon icon='ph:student-light' />
  ),
  getItem(
    <Link to='admins-page'>Admins</Link>,
    "4",
    <Icon icon='eos-icons:admin-outlined' />
  ),
  getItem(
    <Link to='courses-page'>Courses</Link>,
    "5",
    <Icon icon='tdesign:course' />
  ),
  getItem(
    <Link to='logs-page'>Log</Link>,
    "6",
    <Icon icon='icon-park-outline:log' />
  ),
  getItem("Logout", "7", <Icon icon='humbleicons:logout' />, null, true),
];

const teacherItems = [
  getItem(
    <Link to='/page1'>Teahcer Dashboards</Link>,
    "1",
    <Icon icon='akar-icons:dashboard' />,
    [],
    false,
    true
  ),
];

const DashboardScreen = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme='light'>
        <div className='demo-logo-vertical' />
        <Menu
          theme='light'
          defaultSelectedKeys={["1"]}
          mode='inline'
          items={adminItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 16,

            background: colorBgContainer,
          }}>
          <h1 className='text-2xl'>Hello there, {user?.name}</h1>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}>   
            <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}>
          ©{new Date().getFullYear()} Made by Yohannes Teshome
        </Footer>
      </Layout>
    </Layout>
  );
};
export default DashboardScreen;
