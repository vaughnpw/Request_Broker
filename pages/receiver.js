import Layout from '../components/layout.js'
import { Component } from "react";
import fetch from 'isomorphic-unfetch'; 
import Router from 'next/router'; 
import {
  Select, Col, Card, Row, Button, Input, Divider, message, Icon, Modal
} from 'antd';

import "../style.less";
import { inherits } from 'util';

const Option = Select.Option;
const { TextArea } = Input;

class Sender extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedType: "PayPal",
      inputRequest: {
        "transactionType": "PayPal",
        "apiKey": "efHko88bN33Q9QOEM7EJP2yq8i4DQddd2ECuQ1Bh"
      },
      outputRequest: null,
      noData: "No request from the queue has been received yet. Please click the Send button above to receive a request.",
      visible: false,
      newItem: "",
      opts: [
        "PayPal",
        "Square",
        "Credit"
      ]
    };
  }

  static async getInitialProps(props) {
    console.log('props received: ', props);
    const {query} = props;
    console.log('resources received on compare: ', query);
    if(query.selectedType) {
      console.log("selected type on page load: ", query.selectedType);
      return {
        queryType: query.selectedType,
        queryInputRequest: {
          "transactionType": query.selectedType,
          "apiKey": "efHko88bN33Q9QOEM7EJP2yq8i4DQddd2ECuQ1Bh"
        },
        queryOutputRequest: null
      };
    }
    else {
      console.log('no selected type on page load');
      return {
        error: "NO QUERY TYPE"
      };
    }
  }

  componentDidMount() {
    if(this.props.queryType) {
      console.log('query type in didMount(): ', this.props.queryType);
      this.setState({
        selectedType: this.props.queryType,
        inputRequest: this.props.queryInputRequest,
        outputRequest: null,
        noData: "No request from the queue has been received yet. Please click the Send button above to receive a request."
      });
    }
  }

  handleSelectorChange = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      selectedType: value
    });
  }

  handleInputChange = (event) => {
    event = event.currentTarget.value;
    console.log("changed input: ", event);
    var json = JSON.parse(event);
    console.log("json value request: ", json);
    this.setState({
      inputRequest: json
    });
  }

  handleCreate = () => {
    console.log("selected type in state before create: ", this.state.selectedType);
    window.open(`/receiver?selectedType=${this.state.selectedType}`, "_blank");
  }

  handleReceive = async () => {
    let body;
    if(this.props.queryInputRequest) {
      body = this.props.queryInputRequest;
      console.log("input request in state before send: ", this.props.queryInputRequest);
    }
    else {
      body = this.state.inputRequest;
      console.log("input request in state before send: ", this.state.inputRequest);
    }
    try {  
      const res = await fetch('https://fn5xl4wdda.execute-api.us-east-1.amazonaws.com/dev/receiveMessage',
        {
          method: 'POST',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Content-Type': 'application/json',
            'x-api-key': 'p6vycguezq7bR537yphKY24os8dLGl5L9Bqh6XAh'
          },
          body: JSON.stringify(body)
        }
      );
      const json = await res.json();
      console.log('json returned from fetch: ', json);
      if(json.message) {
        console.log("message: Internal server error");
        message.error(`${body.transactionType} request failed to receive. Please try again.`);
      }
      else {
        this.setState({
            outputRequest: JSON.stringify(json, null, 2)
        });
        message.success(`${body.transactionType} request successfully received.`);
      }
    } catch(e) {
      console.log('error message: ', e);
      message.error(`${body.transactionType} request failed to receive.`);
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleChange = (event) => {
    var value = event.currentTarget.value;
    console.log("current modal value: ", value);
    this.setState({
      newItem: value
    });
  }

  handleOk = (event) => {
    var newItem = this.state.newItem;
    console.log('new item after ok: ', newItem);
    var opts = this.state.opts;
    opts.push(newItem);
    console.log('opts after push onto: ', opts);
    this.setState({
      visible: false,
      opts: opts
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
    
  render() {

    const { opts } =  this.state;
    
    return(
        <Layout>
          <Row gutter={16}>
            <Col span={4}/>
            <Col span={16}>
              <Card 
                  title={this.props.queryType ?
                        this.props.queryType+" Receiver"
                      :
                        "PayPal Receiver"
                      }
                  style={{ width: inherits}}
              >
                <div style={{ paddingTop: 24  }}></div>
                <div style= {{ padding: 24 }}>
                  <Row gutter={16}>
                    <div className="receive_title">
                        <h3>Receive A Request From The Queue</h3>
                    </div>
                    <Row gutter={16}>
                        <div className="input_row">
                        <Col span={2}/>
                        <Col span={20}>
                            {this.props.queryType ? 
                            <TextArea 
                                rows={4}
                                size="large"
                                autosize
                                value={"{\n \t\"transactionType\": \""+this.props.queryType+"\",\n \t\"apiKey\":\"efHko88bN33Q9QOEM7EJP2yq8i4DQddd2ECuQ1Bh\"\n}" }
                                onChange={this.handleInputChange}
                            />
                            :
                            <TextArea 
                                rows={4}
                                size="large"
                                value={"{\n \t\"transactionType\": \"PayPal\",\n \t\"apiKey\":\"efHko88bN33Q9QOEM7EJP2yq8i4DQddd2ECuQ1Bh\"\n}" }
                                onChange={this.handleInputChange}
                            />
                            }
                        </Col>
                        <Col span={2}/>
                        </div>
                    </Row>
                    <Row gutter={16}>
                        <div className="input_button_row">
                        <Col span={5}/>
                        <Col span={14}>
                            <Button
                            type="primary"
                            onClick={this.handleReceive}
                            style={{ float: "right" }}
                            >
                            Receive Request
                            </Button>
                        </Col>
                        <Col span={5}/>
                        </div>
                    </Row>
                  </Row>
                </div>
                <div style={{ paddingTop: 24  }}></div>
                <Divider />
                <div style={{ paddingTop: 24  }}></div>
                <div style={{ padding: 24 }}>
                  <Row gutter={16}>
                    <div className="send_title">
                        <h3>Received Request</h3>
                    </div>
                    <Row gutter={16}>
                        <div className="input_row">
                        <Col span={4}/>
                        <Col span={16}>
                            {this.state.outputRequest ? 
                            <TextArea 
                                rows={4}
                                autosize
                                size="large"
                                value={this.state.outputRequest}
                            />
                            : this.props.queryOutputRequest ?
                                <TextArea 
                                    rows={4}
                                    autosize
                                    size="large"
                                    value={this.props.queryOutputRequest}
                                />
                            :
                                <TextArea 
                                    rows={4}
                                    autosize
                                    size="large"
                                    placeholder={this.state.noData}
                                />
                            }
                        </Col>
                        <Col span={4}/>
                        </div>
                    </Row>
                  </Row>
                </div>
                <div style={{ paddingTop: 24  }}></div>
                <Divider />
                <div style={{ paddingTop: 24  }}></div>
                <div style={{ padding: 24 }}>
                  <Row gutter={16}>
                    <div className="create_title">
                        <h3>Create A New Receiver</h3>
                    </div>
                    <div className="selector_row">
                        <Col span={4}/>
                        <Col span={16}>
                        <Select 
                            defaultValue={this.props.queryType? this.props.queryType: "PayPal"} 
                            style={{ width: 300, paddingRight: 50 }} 
                            onChange={this.handleSelectorChange}
                            dropdownRender={menu => (
                                <div>
                                  {menu}
                                  <Divider style={{ margin: '4px 0' }} />
                                  <div 
                                    style={{ padding: '8px', cursor: 'pointer' }} 
                                    onMouseDown={e => e.preventDefault()}
                                    onClick={this.showModal}
                                  >
                                    <Icon type="plus" /> Add New Receiver
                                  </div>
                                </div>
                              )}
                            >
                              {opts.map(opt => <Option key={opt}>{opt}</Option>)}
                        </Select>
                        <Modal
                          title="Add New Receiver"
                          visible={this.state.visible}
                          onOk={this.handleOk}
                          onCancel={this.handleCancel}
                        >
                          <p>Please input a new receiver type.</p>
                          <Input onChange={this.handleChange} placeholder="PayPal" />
                        </Modal>
                        <Button
                            type="primary"
                            onClick={this.handleCreate}
                        >
                            <Icon type="robot"/> Create Receiver
                        </Button>
                        </Col>
                        <Col span={4}/>
                    </div>
                  </Row>
                </div>
                <div style={{ paddingTop: 24  }}></div>
                <style jsx>{`
                    .selector_row {
                      padding: 24px;
                    }
                    .input_row {
                      padding: 24px;
                    }
                    .input_button_row {
                      padding: 24px 0;
                    }
                `}</style>
              </Card>
            </Col>
            <Col span={4}/>
          </Row>
        </Layout>
    );
  }

}

export default Sender