/*
* 图文组件
* */
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import axios from 'axios'
import {Card} from 'antd'

export default class MobileNewsBlock extends Component{
    constructor(props){
        super(props)
        this.state = {
            newsArr: []
        }
    }
    componentWillMount(){
        const {type, count} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        axios.get(url)
            .then(response => {
                const newsArr = response.data.map(news => {
                    return {
                        image: news.thumbnail_pic_s,
                        title: news.title,
                        realtype: news.realtype,
                        date: news.date,
                        uniquekey: news.uniquekey
                    }
                })
                this.setState({newsArr})
            })
    }
    render(){
        const {newsArr} = this.state
        return <div>
            {newsArr.length
                ? this.state.newsArr.map((news, index) => {
                    return <Card key={index} className="m_article list-item special_section clearfix">
                        <Link to={`/detail/${news.uniquekey}`}>
                            <div className="m_article_img">
                                <img src={news.image} alt={news.title}/>
                            </div>
                            <div className="m_article_info">
                                <div className="m_article_title">
                                    <span>{news.title}</span>
                                </div>
                                <div className="m_article_desc clearfix">
                                    <div className="m_article_desc_l">
                                        <span className="m_article_channel">{news.realtype}</span>
                                        <span className="m_article_time">{news.date}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </Card>
            })
            : '没有加载到任何新闻'}
        </div>
    }
}
MobileNewsBlock.propTypes = {
    type: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
}