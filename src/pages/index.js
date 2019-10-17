import React, { Component } from 'react';
import { Table, Button, Modal, InputNumber, Icon } from 'antd';
import 'antd/dist/antd.css';
import styles from './index.css';


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            dataSource: [{}, {}, {}, {}],
            visibleAdd: false, // 是否显示批量添加弹窗
            addNumber: 5, // 批量添加个数
        }
    }

    /**
     * 打开批量添加弹窗
     */
    openAdd() {
        this.setState({
            visibleAdd: true
        })
    }

    /**
     * 关闭批量添加弹窗
     */
    closeAdd() {
        this.setState({
            visibleAdd: false
        })
    }

    /**
     * 编辑表列
     */
    editTitle(index) {
        console.log(index);
    }

    /**
     * 批量添加
     */
    add() {
        const { addNumber, columns, dataSource } = this.state;
        const len = columns.length;
        const c = [...columns];
        const d = [...dataSource];
        for (let i = 0; i < addNumber; i++) {
            const name = `标题${len + i + 1}`;
            c.push({
                title: () => (<span>{`标题${len + i + 1}`}<Icon type="edit" onClick={() => {this.editTitle(len + i)}}/></span>),
                dataIndex: name,
            })
            for(let j = 0; j < d.length; j++) {
                d[j][name] = `测试数据${j + 1}`;
            }
        }
        this.setState({
            columns: c,
            dataSource: d,
            visibleAdd: false
        })
    }

    /**
     * 监听批量数字
     */
    addNumberChange(number) {
        this.setState({
            addNumber: number
        })
    }

    render() {
        const { columns, dataSource } = this.state;
        return (
            <div className={styles.indexWrap}>
                <Button type="primary" onClick={this.openAdd.bind(this)}>批量添加</Button>
                <Table
                    columns={columns}
                    dataSource={dataSource}>
                </Table>
                <Modal
                    title="批量添加"
                    visible={this.state.visibleAdd}
                    onOk={this.add.bind(this)}
                    onCancel={this.closeAdd.bind(this)}>
                        <InputNumber style={{width: '400px'}} min={1} defaultValue={5} onChange={this.addNumberChange.bind(this)}/>
                </Modal>
            </div>
        );
    }
}
 
export default Index;
