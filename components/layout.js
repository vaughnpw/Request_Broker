
import Head from 'next/head';
import { Component } from "react";
import {
  Layout, Menu, Input, Icon, Button, Upload, message, Col
} from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

import Router from 'next/router'; 


class CustomLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      fileList: [],
      link: ""
    };
  }

  render() {
    return(
      <Layout>
      <Header className="header" style={{ background: '#fff', boxShadow: '0 2px 8px #f0f1f2', backgroundClip: 'border-box', position: 'fixed', zIndex: 1, width: '100%', height: '84px'}}>
        <div className="header-row">
          <div className="logo_left">
            <a id="logo" href="/">
              <img 
                alt="Request Broker" 
                src="https://s3.amazonaws.com/com.request.broker.queue/img/request_broker_logo.png"
              />
            </a>
          </div>
          <div className="top_right_nav"> 
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px', height: 'inherit' }}
            >
              <Menu.Item key="top_home_nav" style={{ marginTop: '18px' }}><a id="home" href="/"><Icon type="home"/>Home</a></Menu.Item>
              <Menu.Item key="top_sender_nav" style={{ marginTop: '18px' }}><a id="sender" href="/sender"><Icon type="mail"/>Sender</a></Menu.Item>
              <Menu.Item key="top_receiver_nav" style={{ marginTop: '18px' }}><a id="receiver" href="/receiver"><Icon type="robot"/>Receiver</a></Menu.Item>
            </Menu>
          </div>
          <style jsx>{`
            .top_right_nav {
              margin-left: 25px;
              margin-right: 25px;
              float: right;
            }
            .logo_left {
              margin-right: 30px;
              float: left;
            }
            .logo_left img {
              margin-right: 250px;
              padding: 8px 40px 6px 40px;
              width: 300px;
              height: auto;
            }
          `}</style>
        </div>
      </Header>
      <Layout>
        <Layout style={{ padding: 24, marginTop: 84 }}>
          <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
            {this.props.children}
          </Content>
          <Footer>
            <Col span={4}/>
            <Col span={16}>
              <div style={{ textAlign: "center", paddingTop: 55 }}>
                Request Broker ☺2019 Created by _vawn__
              </div>
            </Col>
            <Col span={4}/>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
    );
  }

}

export default CustomLayout