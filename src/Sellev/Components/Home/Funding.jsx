import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Components
import FundingBody from './FundingBody';

// Styles
import stylesHome from '../../Styles/Components/Home.css';

// Actions

class Funding extends React.Component {
    render() {
        return (
            <div className={stylesHome.fundingSection}>
                <div className={stylesHome.fundingHeader}>
                    <div className={stylesHome.sectionSmallTitle}>랭킹</div>
                    <div className={stylesHome.sectionTitle}>펀딩&마켓</div>
                </div>
                <FundingBody />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(Funding));
