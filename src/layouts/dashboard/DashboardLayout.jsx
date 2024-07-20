import React from 'react';
import { Layout, } from 'antd';
import {Outlet} from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
const { Content} = Layout;

const DashboardLayout = () => {

  return(
      <Layout hasSider>

          <Layout style={{ minHeight: '100vh'}}>
              <DashboardHeader />

              <Content
                  style={{
                      padding: '24px 16px',
                      overflow: 'initial',
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start"
                  }}
              >
                  <Outlet />
              </Content>

          </Layout>
      </Layout>
  )
}
export default DashboardLayout
