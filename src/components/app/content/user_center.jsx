/*
* 个人中心组件
* */
import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router'
import {Tabs, Row, Col, Card, Upload, Icon, Modal} from 'antd'
const TabPane = Tabs.TabPane

export default class UserCenter extends Component{
    constructor(props){
        super(props)
        this.state = {
            collectionArr: [], // 收藏列表
            contentArr: [], // 评论列表
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            }]
        }
    }
    componentWillMount(){
        const userId = localStorage.userId
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
        axios.get(url)
            .then(response => {
                const collectionArr = response.data.map(ele => {
                    return {
                        uniquekey : ele.uniquekey,
                        title : ele.Title
                    }
                })
                this.setState({collectionArr})
            })
        url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
        axios.get(url)
            .then(response => {
                const contentArr = response.data.map(ele => {
                    return {
                        uniquekey : ele.uniquekey,
                        datetime: ele.datetime,
                        content: ele.Comments
                    }
                })
                this.setState({contentArr})
            })
    }
    // 点击×、浮层关闭对话框
    handleCancel = () => this.setState({ previewVisible: false })
    // 点击文件链接或预览图标时的回调
    handlePreview = file => {
        console.log(file)
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        });
    }
    // 文件状态改变的回调，返回当前的文件列表
    handleChange = ({ fileList }) => this.setState({ fileList })

    render(){
        const {collectionArr, contentArr, previewVisible, previewImage, fileList} = this.state
        const props = {
            action: '//jsonplaceholder.typicode.com/posts/',  //上传的地址
            listType: "picture-card", // 上传列表的內建样式
            fileList: fileList,     // 已经上传的文件列表（受控）
            onPreview: this.handlePreview,  // 点击文件链接或预览图标时的回调
            onChange: this.handleChange    // 上传文件改变时的状态
        }
        return <Row>
            <Col span={1} />
            <Col span={22}>
                <Tabs>
                    <TabPane tab="我的收藏列表" key="1">
                        {collectionArr.length ? collectionArr.map((ele, index) => {
                            return <Card key={index} title={ele.uniquekey} extra={<Link to={`/detail/${ele.uniquekey}`}>查看</Link>}>
                                <p>{ele.title}</p>
                            </Card>
                        }) : '您还没有收藏任何的新闻，快去收藏一些新闻吧。'}
                    </TabPane>
                    <TabPane tab="我的评论列表" key="2">
                        {contentArr.length ? contentArr.map((ele, index) => {
                            return <Card key={index} title={`于${ele.datetime}评论了文章${ele.uniquekey}`} extra={<Link to={`/detail/${ele.uniquekey}`}>查看</Link>}>
                                <p>{ele.content}</p>
                            </Card>
                        }) : '您还没有发表过任何评论。'}
                    </TabPane>
                    <TabPane tab="头像设置" key="3">
                        <div className="uc_setting">
                            <Upload {...props}>
                                <div>
                                    <Icon type="plus" />
                                    <div className="ant-upload-text">上传照片</div>
                                </div>
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="预览" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </div>
                    </TabPane>
                </Tabs>
            </Col>
            <Col span={1} />
        </Row>
    }
}