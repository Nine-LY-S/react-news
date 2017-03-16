/*
* 首页显示各种新闻列表组件
* */
import React, {Component} from 'react'
import {Row, Col, Carousel, Tabs} from 'antd'
const TabPane = Tabs.TabPane

import NewsImageBlock from './news_container/news_image_block'
import NewsBlock from './news_container/news_block'
import Products from './news_container/products'

import carousel_1 from '../../../images/carousel_1.jpg'
import carousel_2 from '../../../images/carousel_2.jpg'
import carousel_3 from '../../../images/carousel_3.jpg'
import carousel_4 from '../../../images/carousel_4.jpg'

export default class NewsContainer extends Component{
    render(){
        return <Row className='container'>
            <Col span={1} />
            <Col span={22}>
                <div className="leftContainer" style={{width: "35%"}}>
                    <Carousel autoplay infinite>
                        {/* infinite-->循环播放 */}
                        <div><img src={carousel_1} alt="1" /></div>
                        <div><img src={carousel_2} alt="2" /></div>
                        <div><img src={carousel_3} alt="3" /></div>
                        <div><img src={carousel_4} alt="4" /></div>
                    </Carousel>
                    <NewsImageBlock cardTitle="国际头条" cardWidth="100%" type="guoji" count={6} imageWidth="123px"/>
                </div>
                <Tabs className='tabs_news' style={{width: "41%"}}>
                    <TabPane tab="头条新闻" key="1">
                        <NewsBlock type="top" count={22} cardWidth="100%" />
                    </TabPane>
                    <TabPane tab="国际新闻" key="2">
                        <NewsBlock type="guoji" count={22} cardWidth="100%"/>
                    </TabPane>
                </Tabs>
                <Tabs className='tabs_product' style={{width: "24%"}}>
                    <TabPane tab="React News产品" key="1">
                        <Products />
                    </TabPane>
                </Tabs>
                <div>
                    <NewsImageBlock count={8} type="guonei" cardWidth="100%" cardTitle="国内新闻" imageWidth="138px"/>
                    <NewsImageBlock count={16} type="yule" cardWidth="100%" cardTitle="娱乐新闻" imageWidth="140px"/>
                </div>
            </Col>
            <Col span={1} />
        </Row>
    }
}