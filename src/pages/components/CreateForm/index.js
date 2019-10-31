import React, { Component } from 'react';
import { Table, Button, Modal, InputNumber, Icon, Input, message } from 'antd';
import GenerateForm from '../GenerateForm';
import SetForm from '../SetForm';

class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formOption: [],
            visibleSetForm: false,
            setFormKey: Math.random(),
        }
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

    render() { 
        const { formOption, visibleSetForm, setFormKey } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.openAdd.bind(this)} style={{ marginRight: '10px' }}>
                    添加
                </Button>
                <GenerateForm formSet={formOption} />
                <SetForm 
                    visibleSetForm={visibleSetForm}
                    key={setFormKey} 
                    onCancel={this.closeAdd.bind(this)}/>
            </div>
        );
    }
}
 
export default CreateForm;