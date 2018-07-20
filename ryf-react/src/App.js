import React, { Component } from 'react';
import { Table, Pagination, Input, Row, Button, Modal, Form,message} from 'antd'; //对react ui 阿里的antd 部分引用
import 'antd/dist/antd.css';
import axios from 'axios';
import './App.css';

const { Search } = Input;
const FormItem = Form.Item;
const { confirm } = Modal;

class App extends Component {
    columns = [{
        dataIndex: "username",
        title: "用户"
    }, {
        dataIndex: "age",
        title: '年龄'
    }, {
        dataIndex: 'address',
        title: '地址'
    }, {
        dataIndex: 'action',
        title: '操作',
        width: 200,
        render: (Text, row) => {
            return (
                <div>
                    <Button type="primary" onClick={() => this.modal('edit', row)}>编辑</Button>
                    <Button type="danger" style={{ marginLeft: 10 }} onClick={() => this.remove(row)}>删除</Button>
                </div>
            )
        }
    }]
    state = {
        visible: false,
        users: [{
            username: 'zk',
            age: 18,
            address: '杭州',
            id: 1
        }, {
            username: 'lili',
            age: 22,
            address: '厦门',
            id: 2
        }],
        modalType: 'add',
        id: 3,
        editRow: {}
    }

    remove(row) {
        const that = this;
        confirm({
            title: '是否要删除该用户',
            okText: 'yes',
            cancelText: 'no',
            onOk() {
                const _users = that.state.users.filter(data => {
                    return data.id != row.id
                });
                that.setState({
                    users: _users
                })
            }
        })
    }
    handleOk() {
        // console.log('ok')
        // this.setState({
        //     visible: false
        // })
        this.props.form.validateFieldsAndScroll((err, values) => {
            const { username, age, address } = values
            const _id = this.state++

            if (!err) {
              
                let data = {
                    username: values.username,
                    age: values.age,
                    address: values.address
                }
                console.log(data)
                axios.post('http://127.0.0.1:3006/user',data)
                    .then(msg => {
                        console.log(msg);
                        this.setState({
                            visible: false,
                        });
                        message.success('添加成功');
                    })
            }
        })      
    }
    searchUser (event) {
        axios.get('http://localhost:3006/users')
            .then(data => {
                console.log(data);
            })
    }
    render() {
        //getFieldDecorator: 获取一个字段的一个装饰器
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        }
        return (
            <div className="App">
                <Row>
                    <Search style={{ width: 300 }} onChange={this.searchUser.bind(this)}/>
                    <Button type="primary" style={{ marginLeft: 20, marginTop: 20 }} onClick={() => this.modal('add')} >添加用户</Button>
                </Row>
                <Row style={{ paddingTop: 20 }}>
                    {/* columns 简单的配置, 一个配置项 */}
                    <Table dataSource={this.state.users} columns={this.columns} rowKey={row => row.id} bordered pagination={false} />

                </Row>

                <Modal title={this.state.modalType === 'add' ? "添加用户" : '编辑用户'} visible={this.state.visible}
                    onOk={() => this.handleOk()}
                    onCancel={() => this.setState({ visible: false })}>
                    <Form>
                        <FormItem label="用户" {...formItemLayout}>
                            {
                                getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }]
                                })(<Input placeholder="UserName" />)
                            }

                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    rules: [
                                        { required: true, message: 'Please input your age' }
                                    ]
                                }
                                )(<Input placeholder="age" />)  //函数, 结果返回新的函数
                            }
                        </FormItem>
                        <FormItem label="地址" {...formItemLayout}>
                            {
                                getFieldDecorator('address', {
                                    rules: [
                                        { required: true, message: 'Please input your adress' }
                                    ]
                                }
                                )(<Input placeholder="address" />)  //函数, 结果返回新的函数
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
    modal(type, row) {
        // console.log(type);
        this.setState({
            visible: true
        }, () => {
            this.props.form.resetFields();
            if (type === 'add') return;
            this.props.form.setFieldsValue({
                username: row.username,
                age: row.age,
                address: row.address
            })
        })
    }
}


export default Form.create()(App);