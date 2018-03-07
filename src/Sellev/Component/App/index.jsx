import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Components
import HeaderComponent from './Header';
import HomeComponent from '../Home';
import FundingComponent from '../Funding';
import HashTagComponent from '../HashTag';
import MyPageComponent from '../MyPage';
import PaymentComponent from '../Payment';
import SearchComponent from '../Search';
import SelleverComponent from '../Sellever';
import VideoComponent from '../Video';

// Actions
import * as ActionAuth from '../../Data/Authentification/actions';

// Routes
import routes from '../../routes';

// Styles
import styles from './App.css';

class RootView extends React.Component {
    render() {
        return (
            <div className={styles.AppContainer}>
                <HeaderComponent />
                <Route path={'/'} exact={true} strict={false} component={HomeComponent} />
                <Route path={'/fundingmarket'} exact={true} strict={false} component={FundingComponent} />
                <Route path={'/hashtag'} exact={true} strict={false} component={HashTagComponent} />
                <Route path={'/mypage'} exact={true} strict={false} component={MyPageComponent} />
                <Route path={'/payment'} exact={true} strict={false} component={PaymentComponent} />
                <Route path={'/search'} exact={true} strict={false} component={SearchComponent} />
                <Route path={'/sellever'} exact={true} strict={false} component={SelleverComponent} />
                <Route path={'/video'} exact={true} strict={false} component={VideoComponent} />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(RootView));
