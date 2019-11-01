import React, { Component } from 'react';
import { Modal, Select, Input, Form, Radio, Checkbox, DatePicker, InputNumber } from 'antd';

const { Option } = Select;
const { TextArea, Password } = Input;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const CheckboxGroup = Checkbox.Group;
const { RangePicker, MonthPicker } = DatePicker;

const TYPES = [
    { value: 'label', label: '文字 label' },
    { value: 'input', label: '输入框 input' },
    { value: 'select', label: '选择框 select' },
    { value: 'inputnumber', label: '数字输入框 inputnumber' },
    { value: 'password', label: '密码框 password' },
    { value: 'datepicker', label: '日期选择框 datepicker' },
    { value: 'monthpicker', label: '月份选择框 monthpicker' },
    { value: 'rangepicker', label: '时间区间选择框 rangepicker' },
    { value: 'checkbox', label: '多选 checkbox' },
    { value: 'checkboxgroup', label: '输入框组 checkboxgroup' },
    { value: 'textarea', label: '文本框 textarea' },
    { value: 'radiogroup', label: '单选组 radiogroup' },
];

const initialValueOptions = [
    { label: 'false', value: false },
    { label: 'true', value: true },
]

const colonOptions = [
    { label: 'true', value: true },
    { label: 'false', value: false },
]

const addonAfterOptions = [
    { label: 'false', value: false },
    { label: 'true', value: true },
]

const formItemLayoutOptions = [
    { label: 'false', value: false },
    { label: '变量', value: '变量' },
    { label: '数值', value: '数值' },
]

class SetForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCol: false,
        };
    }

    setForm() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // this.props.onOk(values);
                console.log(values);
            }
        });
    }

    /**
     * 关闭配置表单弹窗
     */
    closeSetForm() {
        this.props.onCancel();
    }

    /**
     * 
     */
    layoutChange = e => {
        let showCol = false;
        if (e.target.value === '数值') {
            showCol = true;
        }
        this.setState({
            showCol,
        })
    }

    render() {
        const { visibleSetForm } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 },
        };
        const { showCol } = this.state;

        return (
            <Modal
                title="设置"
                visible={visibleSetForm}
                onOk={this.setForm.bind(this)}
                onCancel={this.closeSetForm.bind(this)}
            >
                <Form {...formItemLayout}>
                    <Form.Item label="类型 type">
                        {getFieldDecorator('type', {
                            initialValue: 'input',
                        })(
                            <Select>
                                {TYPES.map((item, index) => (
                                    <Option value={item.value} key={index}>
                                        {item.label}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="标签 label">
                        {getFieldDecorator('label', {
                            rules: [
                                { required: true, message: '请输入标签' }
                            ]
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="默认值 initialValue">
                        {getFieldDecorator('initialValue', {
                            initialValue: false
                        })(
                            <Radio.Group options={initialValueOptions} />
                        )}
                    </Form.Item>
                    <Form.Item label="自定义类 colClass">
                        {getFieldDecorator('colClass')(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="冒号 colon">
                        {getFieldDecorator('colon', {
                            initialValue: true
                        })(
                            <Radio.Group options={colonOptions} />
                        )}
                    </Form.Item>
                    <Form.Item label="后缀 addonAfter">
                        {getFieldDecorator('addonAfter', {
                            initialValue: false
                        })(
                            <Radio.Group options={addonAfterOptions} />
                        )}
                    </Form.Item>
                    <Form.Item label="长度 span">
                        {getFieldDecorator('span')(
                            <InputNumber />
                        )}
                    </Form.Item>
                    <Form.Item label="布局 formItemLayout">
                        {getFieldDecorator('formItemLayout', {
                            initialValue: false
                        })(
                            <Radio.Group options={formItemLayoutOptions} onChange={this.layoutChange}/>
                        )}
                    </Form.Item>
                    {
                        showCol &&
                        <Form.Item label="labelCol">
                            {getFieldDecorator('labelCol')(
                                <InputNumber />
                            )}
                        </Form.Item>
                    }
                    {
                        showCol &&
                        <Form.Item label="wrapperCol">
                            {getFieldDecorator('wrapperCol')(
                                <InputNumber />
                            )}
                        </Form.Item>
                    }
                </Form>
            </Modal>
        );
    }
}

const SetFormForm = Form.create({ name: 'set_form' })(SetForm);

export default SetFormForm;
