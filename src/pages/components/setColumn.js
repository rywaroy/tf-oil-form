import React, { Component } from 'react';
import { Table, Button, Modal, InputNumber, Icon, Input, Form, Radio } from 'antd';

const alignOptions = [
    { label: 'left', value: 'left' },
    { label: 'right', value: 'right' },
    { label: 'center', value: 'center' },
]

const ellipsisOptions = [
    { label: 'false', value: 'false' },
    { label: 'true', value: 'true' },
]

class SetColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    /**
     * 配置列
     */
    setLine() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onOk(values);
            }
        });
    }

    /**
     * 关闭配置列弹窗
     */
    closeSetLine() {
        this.props.onCancel();
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
                title="设置"
                visible={this.props.visibleSet}
                onOk={this.setLine.bind(this)}
                onCancel={this.closeSetLine.bind(this)}>
                    <Form  {...formItemLayout}>
                        <Form.Item
                            label="width">
                                {getFieldDecorator('width')(
                                    <InputNumber />
                                )}
                        </Form.Item>
                        <Form.Item
                            label="align">
                                {getFieldDecorator('align')(
                                    <Radio.Group options={alignOptions} />
                                )}
                        </Form.Item>
                        <Form.Item
                            label="ellipsis">
                                {getFieldDecorator('ellipsis')(
                                    <Radio.Group options={ellipsisOptions} />
                                )}
                        </Form.Item>
                        <Form.Item
                            label="className">
                                {getFieldDecorator('className')(
                                    <Input />
                                )}
                        </Form.Item>
                    </Form>
            </Modal>
        );
    }
}

const SetColumnForm = Form.create({ name: 'horizontal_login' })(SetColumn);
 
export default SetColumnForm;