/*
* 新闻详情组件
* */
import React, {Component} from 'react'
import {BackTop} from 'antd'
import axios from 'axios'

import NewsComments from '../components/app/content/news_detail/news_comments'

export default class MobileNewsDetail extends Component{
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
        return <div style={{padding: '10px'}}>
            {/*react不会直接读取HTML代码，以下方法设置innerHTML，让react正常显示HTML字符串*/}
            <div dangerouslySetInnerHTML={{__html: this.state.html}} />
            <hr/>
            <NewsComments uniquekey={this.props.params.uniquekey} />
            <BackTop />
        </div>
    }
}