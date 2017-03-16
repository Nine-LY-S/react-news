/*
* 底部组件
* */
import React, {Component} from 'react'
import {Row, Col} from 'antd'

export default class MobileNewsFooter extends Component{
    render(){
        return <footer>
            <Row>
                <Col span={1} />
                <Col span={22} className="footer">
                    &copy;&nbsp;2016 ReactNews. All Rights Reserved.
                </Col>
                <Col span={1} />
            </Row>
        </footer>
    }
}