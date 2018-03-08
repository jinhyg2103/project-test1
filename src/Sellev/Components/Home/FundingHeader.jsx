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

class FundingHeader extends React.Component {
    render() {
        return (
            <div className={stylesHome.fundingHeader}>
                <div className={stylesHome.sectionSmallTitle}>랭킹</div>
                <div className={stylesHome.sectionTitle}>펀딩&마켓</div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(FundingHeader));
