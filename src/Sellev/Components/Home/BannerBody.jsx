import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Common
import SwipeBanner from '../../Common/SwipeBanner';

// Components

// Styles
import stylesHome from '../../Styles/Components/Home.css';
// Actions

class BannerBody extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={stylesHome.bannerBody}>
                <SwipeBanner />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(BannerBody));
