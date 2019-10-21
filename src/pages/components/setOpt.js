import React, { Component } from 'react';
import { Modal, InputNumber, Input, Form, Radio } from 'antd';

const fixedOptions = [
    { label: 'false', value: false },
    { label: 'true', value: true },
]

class SetOpt extends Component {

    setOpt() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onOk(values);
            }
        });
    }

    closeOpt() {
        this.props.onCancel();
    }
    
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { visibleOpt } = this.props;
        const { getFieldDecorator } = this.props.form;
        
        return (
            <Modal
                title="操作"
                visible={visibleOpt}
                onOk={this.setOpt.bind(this)}
                onCancel={this.closeOpt.bind(this)}>
                    <Form {...formItemLayout}>
                        <Form.Item
                            label="width">
                                {getFieldDecorator('width')(
                                    <InputNumber />
                                )}
                        </Form.Item>
                        <Form.Item
                            label="fixed">
                                {getFieldDecorator('fixed')(
                                    <Radio.Group options={fixedOptions} />
                                )}
                        </Form.Item>
                        <div>操作按钮：</div>
                    </Form>
            </Modal>
        );
    }
}
 
const SetOptForm = Form.create({ name: 'set_opt' })(SetOpt);

export default SetOptForm;