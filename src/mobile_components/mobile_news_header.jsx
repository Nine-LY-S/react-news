/*
* 头部组件
* */
import React, {Component} from 'react'
import {Link} from 'react-router'
import axios from 'axios'
import {Icon, Modal, Tabs, Form, Button, Input, message} from 'antd'
const TabPane = Tabs.TabPane
const FormItem = Form.Item

import logo from '../images/logo.png'

class MobileNewsHeader extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: null,
            userId: null,
            visible: false
        }
    }
    componentWillMount(){
        if(localStorage.userId){
            this.setState({
                username: localStorage.username,
                userId: localStorage.userId
            })
        }
    }
    // 点击登录图标让对话框可见
    login = () => { this.setState({visible: true}) }
    handleOk = () => { this.setState({visible: false}) }
    handleCancel = () => { this.setState({visible: false}) }
    // 登录/注册
    handleSubmit = (isRegister, e) => {
        e.preventDefault()
        const action = isRegister ? 'register' : 'login'
        const {username, password, r_userName, r_password, r_confirmPassword} = this.props.form.getFieldsValue()
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&username=${username}&password=${password}&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
        console.log(url)
        axios.get(url)
            .then(response => {
                const {UserId, NickUserName} = response.data

                console.log(response)
                this.props.form.resetFields()
                if(isRegister){
                    message.success('注册成功！')
                }else{
                    if(!response.data){
                        message.error('登录失败！')
                    }else{
                        message.success('登录成功！')
                        localStorage.userId = UserId
                        localStorage.username = NickUserName
                        this.setState({
                            username: NickUserName,
                            userId: UserId
                        })
                    }
                }
                this.setState({visible: false})
            })
    }
    render(){
        const {username, visible} = this.state
        const {getFieldDecorator } = this.props.form
        return <div id="mobileheader">
            <header>
                <Link to="/">
                    <img src={logo} alt="logo"/>
                    <span>ReactNews</span>
                </Link>
                {username
                    ? <Link to='/usercenter'>
                        <Icon type="user" />
                    </Link>
                    : <Icon type="login" onClick={this.login} />}
            </header>
            <Modal title="用户中心" visible={visible}
                   onOk={this.handleOk} onCancel={this.handleCancel}
                   okText="关闭" cancelText="取消">
                <Tabs type="card">
                    <TabPane tab="登录" key="1">
                        <Form onSubmit={this.handleSubmit.bind(this, false)}>
                            <FormItem label="账号">
                                {getFieldDecorator ('username')(
                                    <Input placeholder="请输入账号" />
                                )}
                            </FormItem>
                            <FormItem label="密码">
                                {getFieldDecorator('password')(
                                    <Input type="password" placeholder="请输入密码" />
                                )}
                            </FormItem>
                            <Button type="primary" htmlType="submit">登录</Button>
                        </Form>
                    </TabPane>
                    <TabPane tab="注册" key="2">
                        <Form onSubmit={this.handleSubmit.bind(this, true)}>
                            <FormItem label="账号">
                                {getFieldDecorator ('r_userName')(
                                    <Input placeholder="请输入账号" />
                                )}
                            </FormItem>
                            <FormItem label="密码">
                                {getFieldDecorator('r_password')(
                                    <Input type="password" placeholder="请输入密码" />
                                )}
                            </FormItem>
                            <FormItem label="确认密码">
                                {getFieldDecorator('r_confirmPassword')(
                                    <Input type="password" placeholder="请再次输入密码" />
                                )}
                            </FormItem>
                            <Button type="primary" htmlType="submit">注册</Button>
                        </Form>
                    </TabPane>
                </Tabs>
            </Modal>
        </div>
    }
}
export default Form.create()(MobileNewsHeader)