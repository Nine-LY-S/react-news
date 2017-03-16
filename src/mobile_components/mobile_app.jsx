/*
* 应用跟路由组件
* */
import React, {Component} from 'react'
import MobileNewsHeader from './mobile_news_header'
import MobileNewsFooter from './mobile_news_footer'

import '../css/mobile.css'

export default class MobileApp extends Component{
    render(){
        return <div>
            <MobileNewsHeader/>
            {this.props.children}
            <MobileNewsFooter/>
        </div>
    }
}