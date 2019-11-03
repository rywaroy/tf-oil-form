import React, { Component } from 'react';
import { Table, Button, Modal, InputNumber, Icon, Input, message, Form, Radio } from 'antd';
import GenerateForm from '../GenerateForm';
import SetForm from '../SetForm';
import styles from './index.less';

const typeOptions = [
    { value: 'filter', label: '筛选表单 filter' },
    { value: 'modal', label: '弹窗表单 modal' },
];

const variableTypeOptions = [
    { value: 'Array', label: 'Array' },
    { value: 'Function', label: 'Function' },
];

const defaultLayoutOptions = [
    { value: false, label: 'false' },
    { value: true, label: 'true' },
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
            name: 'listFiltles', // 变量名
            variableType: 'Array', // 变量类型
            labelCol: 8,
            wrapperCol: 16,
            defaultLayout: false
        };
    }

    openAdd() {
        this.setState({
            visibleSetForm: true,
            setFormKey: Math.random(),
        });
    }

    closeAdd() {
        this.setState({
            visibleSetForm: false,
        });
    }

    add = values => {
        const formOption = [...this.state.formOption];
        if (values.formItemLayoutText) { // 默认变量布局
            const { labelCol, wrapperCol } = this.state;
            values.formItemLayout = {
                labelCol: { span: labelCol },
                wrapperCol: { span: wrapperCol },
            }
        }
        formOption.push(values);
        this.setState({
            formOption,
        });
        this.closeAdd();
    };

    /**
     * 设置容器宽度
     */
    boxWidthChange = e => {
        this.setState({
            width: e.target.value,
        });
    };

    /**
     * 表单类型切换
     */
    typeChange = e => {
        const type = e.target.value;
        this.setState({
            type,
            width: type === 'filter' ? 1000 : 520,
            name: type === 'filter' ? 'listFiltles' : 'modalForm',
        });
    };

    /**
     * 模拟提交
     */
    handleSubmit = e => {
        e.preventDefault();
        this.generateForm.verify();
    };

    render() {
        const { formOption, visibleSetForm, setFormKey, width, type, name, variableType, defaultLayout } = this.state;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };

        return (
            <div>
                <div>
                    <Button
                        type="primary"
                        onClick={this.openAdd.bind(this)}
                        style={{ marginRight: '10px' }}
                    >
                        添加
                    </Button>
                </div>
                <div>
                    <Form {...formItemLayout}>
                        <Form.Item label="表单类型">
                            <Radio.Group
                                options={typeOptions}
                                onChange={this.typeChange}
                                value={type}
                            />
                        </Form.Item>
                        <Form.Item label="容器宽度">
                            <InputNumber
                                step={100}
                                onChange={value => this.setState({ width: value })}
                                value={width}
                            />
                        </Form.Item>
                        <Form.Item label="变量名">
                            <Input
                                style={{width: 200}}
                                onChange={e => this.setState({ name: e.target.value })}
                                value={name}
                            />
                        </Form.Item>
                        <Form.Item label="变量类型">
                            <Radio.Group
                                options={variableTypeOptions}
                                onChange={e => this.setState({ variableType: e.target.value })}
                                value={variableType}
                            />
                        </Form.Item>
                        <Form.Item label="默认布局">
                            <Radio.Group
                                options={defaultLayoutOptions}
                                onChange={e => this.setState({ defaultLayout: e.target.value })}
                                value={defaultLayout}
                            />
                        </Form.Item>
                    </Form>
                </div>
                <div className={styles.formBox} style={{ width: `${width}px` }}>
                    <GenerateForm
                        formSet={formOption}
                        formType={type}
                        wrappedComponentRef={el => (this.generateForm = el)}
                    />
                    {formOption.length > 0 && (
                        <Button type="primary" onClick={this.handleSubmit} className={styles.testButton}>
                            测试rules
                        </Button>
                    )}
                </div>
                <SetForm
                    visibleSetForm={visibleSetForm}
                    key={setFormKey}
                    onCancel={this.closeAdd.bind(this)}
                    onOk={this.add.bind(this)}
                />
            </div>
        );
    }
}

const CreateFormForm = Form.create()(CreateForm);
export default CreateFormForm;
