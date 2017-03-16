/*
* 新闻评论组件
* */
import React, {Component} from 'react'
import axios from 'axios'
import {Card, Row, Col, Form, Button, Input, notification, message, Pagination} from 'antd'
const FormItem = Form.Item

class NewsComments extends Component{
    constructor(props){
        super(props)
        this.state = {
            comments: [],
            current: 1, // 当前页码
            test: []    // 分页
        }
    }
    componentWillMount(){
        this.showComments(this.props)
    }
    // 当接收到父传过来的新的props时调用
    componentWillReceiveProps(nextProps){
        this.showComments(nextProps)
    }
    // 获取指定新闻的评论列表
    showComments = props => {
        const {uniquekey} = props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response => {
                const comments = response.data.map(comment => {
                    return {
                        username: comment.UserName,
                        datetime: comment.datetime,
                        content: comment.Comments
                    }
                })
                // 分页，初始化第一页
                let test = comments.slice(0, 10)
                this.setState({comments, test})
            })
    }
    // 提交评论
    handleSubmit = (event) => {
        event.preventDefault()
        const userId = localStorage.userId
        if(!userId){
            message.warn('请先登录')
            return
        }
        const {uniquekey} = this.props
        const content = this.props.form.getFieldValue('content')
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${uniquekey}&commnet=${content}`
        axios.get(url)
            .then(response => {
                message.success('评论成功')
                // 提交评论后显示在评论列表
                this.componentWillMount()
                this.props.form.resetFields()
            })
    }
    // 收藏指定新闻
    addCollection = () => {
        const userId = localStorage.userId
        if(!userId){
            message.warn('请先登录')
            return
        }
        const {uniquekey} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response => {
                // 收藏成功后全局提醒
                notification.success({
                    message: '提醒',
                    description: '收藏此文章成功！'
                })
            })
    }
    // 分页
    onChange = (page) => {
        let start = (page - 1)*10
        let end = start + 10
        let test = this.state.comments.slice(start, end)
        this.setState({
            current: page,
            test
        })
    }
    render(){
        const {getFieldDecorator} = this.props.form
        const {comments, current, test} = this.state
        return <Row>
            <Col span={24}>
                {comments.length ? test.map((comment, index) => {
                    return <Card key={index} title={comment.username} extra={<p>{`发布于 ${comment.datetime}`}</p>} style={{width: '100%'}}>
                        <p>{comment.content}</p>
                    </Card>
                }) : '没有加载到任何评论'}
                {/*current-->当前页数  total-->数据总数*/}
                <Pagination current={current} onChange={this.onChange} total={comments.length} />
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="您的评论">
                        {getFieldDecorator('content')(<Input type='textarea' placeholder="请输入评论内容" />)}
                    </FormItem>
                    <Button type="primary" htmlType="submit">提交评论</Button>&nbsp;&nbsp;
                    <Button type="primary" htmlType="button" onClick={this.addCollection}>收藏该文章</Button>
                </Form>
            </Col>
        </Row>
    }
}
export default Form.create()(NewsComments)