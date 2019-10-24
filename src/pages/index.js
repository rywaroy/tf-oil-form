import React, { Component } from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import CreateTable from './components/CreateTable/CreateTable';

const { TabPane } = Tabs;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <div className="indexWrap">
          <Tabs defaultActiveKey="1" animated={false}>
            <TabPane tab="table" key="table">
              <CreateTable />
            </TabPane>
            <TabPane tab="form" key="form">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
      </div>
    );
  }
}

export default Index;
