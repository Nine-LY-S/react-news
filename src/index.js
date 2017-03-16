import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import MediaQuery from 'react-responsive'

import App from './components/app'
import NewsContainer from './components/app/content/news_container'
import NewsDetail from './components/app/content/news_detail'
import UserCenter from './components/app/content/user_center'

import MobileApp from './mobile_components/mobile_app'
import MobileNewsContainer from './mobile_components/mobile_news_container'
import MobileNewsDetail from './mobile_components/mobile_news_detail'
import MobileUserCenter from './mobile_components/mobile_user_center'

render(
    <div>
        <MediaQuery query='(min-device-width: 1224px)'>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={NewsContainer}/>
                    <Route path="/detail/:uniquekey" component={NewsDetail} />
                    <Route path="/usercenter" component={UserCenter} />
                </Route>
            </Router>
        </MediaQuery>
        <MediaQuery query='(max-width: 1224px)'>
            <Router history={hashHistory}>
                <Route path="/" component={MobileApp}>
                    <IndexRoute component={MobileNewsContainer}/>
                    <Route path="/detail/:uniquekey" component={MobileNewsDetail} />
                    <Route path="/usercenter" component={MobileUserCenter} />
                </Route>
            </Router>
        </MediaQuery>
    </div>, document.getElementById('root')
);
