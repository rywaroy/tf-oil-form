import React, { Component } from 'react';
import { Table, Button, Modal, InputNumber, Icon, Input, Form, Radio } from 'antd';
import 'antd/dist/antd.css';
import SetColumn from './components/SetColumn';
import styles from './index.css';


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            dataSource: [{}, {}, {}, {}],
            visibleAdd: false, // 是否显示批量添加弹窗
            addNumber: 5, // 批量添加个数
            visibleSetColumn: false, // 设置列
            setColumnKey: Math.random(),
            setIndex: null,
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
        this.setState({
            visibleSetColumn: true,
            setIndex: index,
            setColumnKey: Math.random()
        })
    }


    /**
     * 编辑表头名称
     */
    titleInputBlur(e, index) {
        const c = [...this.state.columns]
        c[index].titleText = e.target.value
        c[index].titleText = e.target.value
        this.setState({
            columns: c
        })
    }

    /**
     * 设置表列
     */
    setColumn = values => {
        this.closeSetColumn();
        const { setIndex, columns } = this.state;
        const c = [...columns];
        // 解析对象
        const { width, align, ellipsis, className } = values;
        if (width) {
            c[setIndex].width = width;
        } else if (c[setIndex].width) {
            delete c[setIndex].width;
        }
        if (align) c[setIndex].align = align;
        if (ellipsis) c[setIndex].ellipsis = ellipsis;
        if (className) {
            c[setIndex].className = className;
        } else if (c[setIndex].className) {
            delete c[setIndex].className;
        }
        this.setState({
            columns: c
        })
    }

    /**
     * 关闭设置表列弹窗
     */
    closeSetColumn = () => {
        this.setState({
            visibleSetColumn: false
        });
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
                title: () => (
                    <>
                        <Input style={{width: '100px'}} allowClear onBlur={(e) => {this.titleInputBlur(e, len + i)}}/>
                        <Icon type="edit" onClick={() => {this.editTitle(len + i)}} style={{marginLeft: '5px'}}/>
                    </>
                ),
                titleText: name,
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
        const { columns, dataSource, visibleSetColumn, setColumnKey } = this.state;

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
                <SetColumn 
                    visibleSetColumn={visibleSetColumn}
                    setColumnKey={setColumnKey}
                    onOk={this.setColumn}
                    onCancel={this.closeSetColumn} />
            </div>
        );
    }
}
 
export default Index;
