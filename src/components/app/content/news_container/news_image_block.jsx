/*
* 图片新闻列表组件
* */
import React, {Component, PropTypes} from 'react'
import {Card} from 'antd'
import {Link} from 'react-router'
import axios from 'axios'

export default class NewsImageBlock extends Component{
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
                        author_name: news.author_name,
                        img_url: news.thumbnail_pic_s,
                        newsId: news.uniquekey
                    }
                })
                // 更新状态
                this.setState({newsArr})
            })
    }
    render(){
        const {newsArr} = this.state
        const {cardTitle, cardWidth, imageWidth} = this.props
        return <Card title={cardTitle} className="topNewsList" style={{width: cardWidth}}>
            {newsArr.length
                ? newsArr.map((news, index) => {
                    return <div key={index} className="imageblock">
                        <Link to={`/detail/${news.newsId}`}>
                            <div>
                                <img src={news.img_url} alt="" style={{width: imageWidth}} />
                            </div>
                            <div className="custom-card">
                                <h3 style={{width: imageWidth}}>{news.title}</h3>
                                <p style={{width: imageWidth}}>{news.author_name}</p>
                            </div>
                        </Link>
                    </div>
                })
                : '没有加载到任何新闻'}
        </Card>
    }
}
NewsImageBlock.propTypes = {
    type: PropTypes.string.isRequired,
    cardTitle: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    cardWidth: PropTypes.string.isRequired,
    imageWidth: PropTypes.string.isRequired
}