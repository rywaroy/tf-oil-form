import React, { Component } from 'react';
import { Modal, Select, Input, Form, Radio, Checkbox, DatePicker } from 'antd';

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

class SetForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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

    render() {
        const { visibleSetForm } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

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
                        {getFieldDecorator('label')(
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
                </Form>
            </Modal>
        );
    }
}

const SetFormForm = Form.create({ name: 'set_form' })(SetForm);

export default SetFormForm;
