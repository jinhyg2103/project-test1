import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Components
import HeaderComponent from '../Components/Header/index';
import HomeContainer from './Home';
import AuthContainer from './Authentication';
import FundingContainer from './Funding';
import HashTagContainer from './HashTag';
import MyPageContainer from './MyPage';
import PaymentContainer from './Payment';
import SearchContainer from './Search';
import SelleverContainer from './Sellever';
import VideoContainer from './Video';

// Styles
import SellevLayout from '../Styles/App.css';

// Actions
import * as ActionAuth from '../Data/Authentification/actions';

// Routes
import routes from '../routes';


class RootView extends React.Component {
    componentWillMount() {
        this.props.dispatch(ActionAuth.session());
    }
    render() {
        return (
            <div>
                <HeaderComponent />
                <Route path={'/'} exact={true} strict={false} component={HomeContainer} />
                <Route path={'/auth'} exact={false} strict={false} component={AuthContainer} />
                <Route path={'/fundingmarket'} exact={false} strict={false} component={FundingContainer} />
                <Route path={'/hashtag'} exact={true} strict={false} component={HashTagContainer} />
                <Route path={'/mypage'} exact={true} strict={false} component={MyPageContainer} />
                <Route path={'/payment'} exact={true} strict={false} component={PaymentContainer} />
                <Route path={'/search'} exact={true} strict={false} component={SearchContainer} />
                <Route path={'/sellever'} exact={true} strict={false} component={SelleverContainer} />
                <Route path={'/video'} exact={true} strict={false} component={VideoContainer} />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(RootView));
