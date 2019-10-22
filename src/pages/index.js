import React, { Component } from 'react';
import { Table, Button, Modal, InputNumber, Icon, Input } from 'antd';
import 'antd/dist/antd.css';
import SetColumn from './components/SetColumn';
import SetOpt from './components/setOpt';


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            dataSource: [{id: 1}, {id: 2}],
            visibleAdd: false, // 是否显示批量添加弹窗
            addNumber: 5, // 批量添加个数
            visibleSetColumn: false, // 设置列
            setColumnKey: Math.random(),
            setIndex: null,
            setColumnObj: {},
            visibleOpt: false, // 是否显示添加操作弹窗
            optKey: Math.random(),
            setOptObj: {}
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
            setColumnKey: Math.random(),
            setColumnObj: {...this.state.columns[index]}
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
            columns: c,
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
        if (ellipsis === undefined ) {
            delete c[setIndex].ellipsis;
        } else {
            c[setIndex].ellipsis = ellipsis
        }
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

    /**
     * 打开添加操作弹窗
     */
    openOpt() {
        if (this.state.columns.length === 0) {
            return;
        }
        this.setState({
            visibleOpt: true,
            optKey: Math.random()
        })
    }

    /**
     * 设置操作
     */
    opt(values) {
        const columns = [...this.state.columns];
        const index = columns.length;
        const opt = {
            title: () => {
                return (
                    <>
                        操作
                        <Icon type="edit" onClick={() => {this.editOpt(index)}} style={{marginLeft: '5px'}}/>
                    </>
                )
            },
            titleText: '操作',
            dataIndex: 'action',
            render() {
                return (
                    <>
                        {
                            values.opts.map((item, index) => (
                                item.link ?
                                    <a href={'/'} target="_blank" className="mar10" key={index}>{item.text}</a>
                                    :
                                    <a href="javascript:;" className="mar10" key={index} onClick={() => {}}>{item.text}</a>
                            ))
                        }
                    </>
                )
            },
            renderText: `
                render() {
                    return (
                        <>
                            ${
                                values.opts.map((item, index) => (
                                    item.link ?
                                        `<a href={'/'} target="_blank" className="mar10" key={index}>${item.text}</a>`
                                        :
                                        `<a href="javascript:;" className="mar10" key={index} onClick={() => {}}>${item.text}</a>`
                                ))
                            }
                        </>
                    )
                }
            `,
            opts: values.opts
        }
        const { width, fixed } = values;
        if (width) {
            opt.width = width;
        }
        if (fixed) {
            opt.fixed = fixed;
        }
        columns.push(opt)
        this.setState({
            columns,
        })
        this.closeOpt();
    }

    /**
     * 关闭添加操作弹窗
     */
    closeOpt() {
        this.setState({
            visibleOpt: false,
        })
    }

    /**
     * 编辑操作弹窗
     */
    editOpt(index) {
        this.setState({
            visibleOpt: true,
            optKey: Math.random(),
            setOptObj: this.state.columns[index],
        })
    }

    render() {
        const {
            columns,
            dataSource,
            visibleSetColumn,
            setColumnKey,
            setColumnObj,
            visibleAdd,
            visibleOpt,
            optKey,
            setOptObj
        } = this.state;

        return (
            <div className="indexWrap">
                <Button type="primary" onClick={this.openAdd.bind(this)} style={{marginRight: '10px'}}>批量添加</Button>
                <Button type="primary" onClick={this.openOpt.bind(this)}>添加操作</Button>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    rowKey={r => r.id}>
                </Table>
                <Modal
                    title="批量添加"
                    visible={visibleAdd}
                    onOk={this.add.bind(this)}
                    onCancel={this.closeAdd.bind(this)}>
                        <InputNumber style={{width: '400px'}} min={1} defaultValue={5} onChange={this.addNumberChange.bind(this)}/>
                </Modal>
                <SetColumn 
                    visibleSetColumn={visibleSetColumn}
                    key={setColumnKey}
                    {...setColumnObj}
                    onOk={this.setColumn}
                    onCancel={this.closeSetColumn} />
                <SetOpt
                    key={optKey}
                    visibleOpt={visibleOpt}
                    {...setOptObj}
                    onOk={this.opt.bind(this)}
                    onCancel={this.closeOpt.bind(this)} />
            </div>
        );
    }
}
 
export default Index;
