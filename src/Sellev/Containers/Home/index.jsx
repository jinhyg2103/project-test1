import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Components
import HomeBanner from '../../Components/Home/Banner';
import HomeFunding from '../../Components/Home/Funding';
import HomeHashTag from '../../Components/Home/HashTag';
import HomeVideo from '../../Components/Home/Video';

// Actions

// Styles
import stylesHome from './Home.css';

// Routes


class HomeContainer extends React.Component {
    render() {
        return (
            <div className={stylesHome.homeContainer}>
                <HomeBanner />
                <HomeFunding />
                <HomeHashTag />
                <HomeVideo />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(HomeContainer));
