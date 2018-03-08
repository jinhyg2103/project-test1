import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Components
import BannerHeader from './BannerHeader';
import BannerBody from './BannerBody';

// Styles
import stylesHome from '../../Styles/Components/Home.css';

// Actions

class Banner extends React.Component {
    render() {
        return (
            <div className={stylesHome.bannerSection}>
                <BannerHeader />
                <BannerBody />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(Banner));
