/*
* 新闻列表组件
* */
import React, {Component, PropTypes} from 'react'
import {Card} from 'antd'
import {Link} from 'react-router'
import axios from 'axios'

export default class NewsBlock extends Component{
    constructor(props){
        super(props)
        this.state = {
            newsArr: []
        }
    }
    componentWillMount () {
        const {type, count} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        axios.get(url)
            .then(response => {
                // 读取响应数据并封装成数组
                const newsArr = response.data.map(news => {
                    return {
                        title: news.title,
                        newsId: news.uniquekey
                    }
                })
                // 更新状态
                this.setState({newsArr})
            })
    }
    render(){
        const {newsArr} = this.state
        const {cardWidth} = this.props
        return <Card className="topNewsList" style={{width: cardWidth}}>
            <ul>
                {newsArr.length
                    ? newsArr.map((news, index) => {
                        return <li key={index}>
                            <Link to={`/detail/${news.newsId}`}>{news.title}</Link>
                        </li>
                    })
                    : '没有加载到任何新闻'}
            </ul>
        </Card>
    }
}
NewsBlock.propTypes = {
    cardWidth: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
}