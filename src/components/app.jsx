/*
* 应用跟路由组件
* */
import React, {Component} from 'react'
import NewsHeader from './app/news_header'
import NewsFooter from './app/news_footer'

import '../css/pc.css'

export default class App extends Component{
    render(){
        return <div>
            <NewsHeader/>
            {this.props.children}
            <NewsFooter/>
        </div>
    }
}