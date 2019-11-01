import React, { Component } from 'react';
import { Table, Button, Modal, InputNumber, Icon, Input, message, Form, Radio } from 'antd';
import GenerateForm from '../GenerateForm';
import SetForm from '../SetForm';
import styles from './index.less';

const typeOptions = [
    { value: 'filter', label: '筛选表单 filter' },
    { value: 'modal', label: '弹窗表单 modal' },
]

class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formOption: [],
            visibleSetForm: false,
            setFormKey: Math.random(),
            width: 520, // 容器宽度
            type: 'filter', // 表单类型
        };
    }

    openAdd() {
        this.setState({
            visibleSetForm: true,
            setFormKey: Math.random(),
        })
    }

    closeAdd() {
        this.setState({
            visibleSetForm: false,
        })
    }

    add = values => {
        const formOption = [...this.state.formOption];
        formOption.push(values);
        this.setState({
            formOption
        });
        this.closeAdd();
    }

    /**
     * 设置容器宽度
     */
    boxWidthChange = e => {
        this.setState({
            width: e.target.value
        });
    }

    /**
     * 表单类型切换
     */
    typeChange = e => {
        const type = e.target.value;
        this.setState({
            type,
            width: type === 'filter' ? 520 : 1000
        })
    }

    render() { 
        const { formOption, visibleSetForm, setFormKey, width, type } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };

        return (
            <div>
                <div>
                    <Button type="primary" onClick={this.openAdd.bind(this)} style={{ marginRight: '10px' }}>
                        添加
                    </Button>
                </div>
                <div>
                    <Form {...formItemLayout}>
                        <Form.Item label="表单类型">
                            <Radio.Group options={typeOptions} onChange={this.typeChange} value={type}/>
                        </Form.Item>
                        <Form.Item label="容器宽度 width">
                            <InputNumber step={100} onChange={value => this.setState({width: value})} value={width}/>
                        </Form.Item>
                    </Form>
                </div>
                <div className={styles.formBox} style={{width: `${width}px`}}>
                    <GenerateForm formSet={formOption} formType={type}/>
                </div>
                <SetForm 
                    visibleSetForm={visibleSetForm}
                    key={setFormKey} 
                    onCancel={this.closeAdd.bind(this)}
                    onOk={this.add.bind(this)}/>
            </div>
        );
    }
}

const CreateFormForm = Form.create()(CreateForm);
export default CreateFormForm;
