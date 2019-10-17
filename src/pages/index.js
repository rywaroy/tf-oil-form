import React, { Component } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import styles from './index.css';


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: '标题1', dataIndex: '标题1' },
        { title: '标题2', dataIndex: '标题2' },
        { title: '标题3', dataIndex: '标题3' },
        { title: '标题4', dataIndex: '标题4' },
      ]
    }
  }
  render() {
        const { columns } = this.state;
        return (
            <div className={styles.indexWrap}>
                <Table columns={columns}></Table>
            </div>
        );
  }
}
 
export default Index;
