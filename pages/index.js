import Layout from "../components/layout";
import "../style.less";

import { Component } from "react";
import ReactDOM from "react-dom";
import { Col, Row, Icon, Button } from 'antd';

import Router from 'next/router'; 

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      resources: []
    };
  }

  handleReceiver = () => {
    window.open("/receiver", "_blank");
  }

  handleSender = () => {
    window.open("/sender", "_blank");
  }

  render() {
    return (
      <Layout>
        <Col span={4}/>
        <Col span={16}>
          <div>
            <h2>Welcome to Request Broker!</h2>
            <p style={{ padding: 24 }}>Request Broker is a payment processing pipeline that 
              delivers payment requests to a queue to be processed by 
              a variety of applications depending on the type of messages 
              in the queue.</p>
            <h2>Benefits</h2>
            <div style={{ padding: 24 }}>
              <p>Request Broker was designed with 3 key attributes in mind:</p>
              <ul>
                <li>Data Persistency</li>
                <li>Load Balancing</li>
                <li>Continuous Integraton</li>
              </ul>
            </div>
          </div>
          <div className="button_row">
            <Row>
              <Col span={4}/>
              <Col span={16}>
                <Button 
                  style={{ float: "left" }}
                  type="primary"
                  onClick={this.handleSender}
                >
                  <Icon type="mail"/> Create Sender
                </Button>
                <Button 
                  style={{ float: "right" }}
                  type="primary"
                  onClick={this.handleReceiver}
                >
                  <Icon type="robot"/> Create Receiver
                </Button>
              </Col>
              <Col span={4}/>
            </Row>
          </div>
        </Col>
        <Col span={4}/>
        <style jsx>{`
          .button_row {
            padding-top: 24px;
            padding-bottom: 55px;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Index