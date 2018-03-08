import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';


// Components

// Styles
import stylesHome from '../../Styles/Components/Home.css';

// Actions

class BannerHeader extends React.Component {
    render() {
        return (
            <div className={stylesHome.BannerHeader}>
                <div className={stylesHome.sectionSmallTitle}>셀레브 Pick</div>
                <div className={stylesHome.sectionTitle}>놓치지마세요</div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(BannerHeader));
