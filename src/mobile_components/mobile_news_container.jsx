/*
* 首页显示各种新闻列表组件
* */
import React, {Component} from 'react'
import {Tabs, Carousel} from 'antd'
const TabPane = Tabs.TabPane

import MobileNewsBlock from './mobile_news_block'

import carousel_1 from '../images/carousel_1.jpg'
import carousel_2 from '../images/carousel_2.jpg'
import carousel_3 from '../images/carousel_3.jpg'
import carousel_4 from '../images/carousel_4.jpg'

export default class MobileNewsContainer extends Component{
    render(){
        return <Tabs defaultActiveKey="top">
            <TabPane tab="头条" key="top">
                <Carousel antoplay infinite>
                    <div><img src={carousel_1} alt=""/></div>
                    <div><img src={carousel_2} alt=""/></div>
                    <div><img src={carousel_3} alt=""/></div>
                    <div><img src={carousel_4} alt=""/></div>
                </Carousel>
                <MobileNewsBlock type="top" count={20} />
            </TabPane>
            <TabPane tab="社会" key="shehui">
                <MobileNewsBlock type="shehui" count={20} />
            </TabPane>
            <TabPane tab="国内" key="guonei">
                <MobileNewsBlock type="guonei" count={20} />
            </TabPane>
            <TabPane tab="国际" key="guoji">
                <MobileNewsBlock type="guoji" count={20} />
            </TabPane>
            <TabPane tab="娱乐" key="yule">
                <MobileNewsBlock type="yule" count={20} />
            </TabPane>
        </Tabs>
    }
}