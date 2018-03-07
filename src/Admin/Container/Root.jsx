import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Components
import MenuComponent from '../Components/Menu';
import HeaderComponent from '../Components/Header';

// Container
import LoginPageContainer from './LoginPage';
import UserPageContainer from './UserPage';
import HousePageContainer from './HousePage';
import SmsPageContainer from './SmsPage';
import PushPageContainer from './PushPage';
import ReportPageContainer from './ReportPage';
import GpsPageContainer from './GpsPage';

// Actions
import * as ActionAuth from '../Data/Authentification/actions';

// Routes
import routes from '../routes';

// Styles
import * as stylesAdmin from '../Styles/AdminLayout.css';

class RootView extends React.Component {
    componentWillMount() {
        if (this.props.author.email == "azna@azna.co.kr" || this.props.author.email == "ceo@azna.co.kr" || this.props.author.email == "cs@azna.co.kr") {
            if (this.props.author.name && (this.props.location.pathname == '/admin' || this.props.location.pathname == '/admin/')) {
                this.props.history.push('/admin/user');
            }
        } else {
            alert('관리자로 로그인 후 사용가능합니다.');
            this.props.history.push('/admin');
            return;
        }
    }
    render() {
        return (
            <div>
                <MenuComponent />
                <div className={stylesAdmin.contentContainer}>
                    <HeaderComponent />
                    <Route
                        path={'/admin'}
                        exact={true}
                        component={LoginPageContainer}
                    />
                    <Route
                        path={'/admin/user'}
                        exact={true}
                        component={UserPageContainer}
                    />
                    <Route
                        path={'/admin/house'}
                        exact={true}
                        component={HousePageContainer}
                    />
                    <Route
                        path={'/admin/sms'}
                        exact={true}
                        component={SmsPageContainer}
                    />
                    <Route
                        path={'/admin/push'}
                        exact={true}
                        component={PushPageContainer}
                    />
                    <Route
                        path={'/admin/report'}
                        exact={true}
                        component={ReportPageContainer}
                    />
                    <Route
                        path={'/admin/gps'}
                        exact={true}
                        component={GpsPageContainer}
                    />
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(RootView));
