/*
* 新闻详情组件
* */
import React, {Component} from 'react'
import {Row, Col, BackTop} from 'antd'
import axios from 'axios'

import NewsImageBlock from './news_container/news_image_block'
import NewsComments from './news_detail/news_comments'

export default class NewsDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            html: ''
        }
    }
    componentWillMount(){
        this.showDetail(this.props)
    }
    // 当接收到父传过来的新的props时调用
    componentWillReceiveProps(nextProps){
        this.showDetail(nextProps)
    }
    // 显示新闻详情
    showDetail = props => {
        const {uniquekey} = props.params
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response => {
                const html = response.data.pagecontent
                this.setState({html})
            })
    }
    render(){
        return <div>
            <Row>
                <Col span={1} />
                <Col span={16}>
                    {/*react不会直接读取HTML代码，以下方法设置innerHTML，让react正常显示HTML字符串*/}
                    <div dangerouslySetInnerHTML={{__html: this.state.html}} />
                    <hr/>
                    <NewsComments uniquekey={this.props.params.uniquekey} />
                </Col>
                <Col span={6}>
                    <NewsImageBlock count={40} type="top" cardWidth="100%" cardTitle="相关新闻" imageWidth="135px"/>
                </Col>
                <Col span={1} />
            </Row>
            <BackTop />
        </div>
    }
}