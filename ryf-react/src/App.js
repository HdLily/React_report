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
    }];
    state = {
        visible: false,
        dataSource: [],
        current: 1,
        size: 10,
        total: 0,
        search: '',
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

    ComponentDidMount () {
        this.sizeChange(this.state.current, this.state.size);
    }

    //分页
    sizeChange = (current, size) => {
        let data = {
            search: 'slf',
            limit: size,
            offset: (parseInt(current) - 1) * size
        }
        axios.post('http://localhost:3006/user-search', data).then(data => {
            this.setState({
                dataSource: data.data.rows,
                total: data.data.count,
                current,size
            })
        })
    };

    remove(row) {
        const that = this;
        confirm({
            title: '是否要删除该用户',
            okText: 'yes',
            cancelText: 'no',
            onOk() {
                axios.delete('http://127.0.0.1:3006/user/' +row.id)
                    .then(data => {
                        that.sizeChange(that.state.current, that.state.size);
                        message.success('success!')
                    })
                const _users = that.state.users.filter(data => {
                    return data.id != row.id
                });
                that.setState({
                    users: _users
                })
            }
        })
    };
    search = (name) => {
        this.setState ({
            search: name
        },() => {
            this.sizeChange(1,10)
        })
    };
    handleOk() {
        // console.log('ok')
        // this.setState({
        //     visible: false
        // })
        this.props.form.validateFieldsAndScroll((err, values) => {
            // const { username, age, address } = values
            // const _id = this.state++

            if (err) return;
                let data = {
                    username: values.username,
                    age: values.age,
                    address: values.address
                };
                if(this.state.modalType === 'add') {
                    axios.post('http://127.0.0.1:3006/user', data)
                        .then(msg => {
                            this.sizeChange(this.state.current, this.state.size);
                            console.log(msg);
                            this.setState({visible: false,});
                            message.success('添加成功');
                        })   
                } 
                else {
                    axios.put('http://127.0.0.1:3006/user/' + this.state.editRow.id, data)
                        .then(data => {
                            this.sizeChange(this.state.current, this.state.size);
                            console.log(data);
                            this.setState({
                                visible: false
                            });
                            message.success('success!')
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
                    {/* {this.searchUser.bind(this)} */}
                    <Search style={{ width: 300 }} onChange={this.searchUser} />
                    <Button type="primary" style={{ marginLeft: 20, marginTop: 20 }} onClick={() => this.modal('add')} >添加用户</Button>
                </Row>
                <Row style={{ paddingTop: 20 }}>
                    {/* columns 简单的配置, 一个配置项 */}
                    <Table dataSource={this.state.users} columns={this.columns} rowKey={row => row.id} bordered pagination={false} />
                </Row>

                <Row style={{paddingTop: 20}}>
                    <Pagination 
                        showTotal={(total => `共${total}条`)}
                        current={this.state.current} total={this.state.total} pageSize={this.state.size}
                        onChange={this.sizeChange} />
                </Row>

                <Modal title={this.state.modalType === 'add' ? "添加用户" : '编辑用户'} visible={this.state.visible}
                    onOk={() => this.handleOk()}
                    onCancel={() => this.setState({ visible: false })}>
                    <Form>
                        <FormItem label="用户" {...formItemLayout}>
                            {
                                getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
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
    modal(type, row) { // 添加编辑用户
        // console.log(type);
        this.setState({
            visible: true,
            modalType: type
        }, () => {
            this.props.form.resetFields();
            if (type === 'add') return;
            this.props.form.setFieldsValue({
                username: row.username,
                age: row.age,
                address: row.address
            })
            this.setState({editRow: row})
        })
    }
}


export default Form.create()(App);