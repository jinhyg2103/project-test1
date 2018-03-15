import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Components
import FundingBody from './FundingMarketBody';

// Styles
import stylesHome from '../../Styles/Components/Home.css';
import styles from '../../Styles/App.css';

// Actions

class FundingMarket extends React.Component {
    render() {
        return (
            <div className={stylesHome.fundingMarketSection}>
                <div className={stylesHome.fundingMarketHeader}>
                    <div className={styles.sectionSmallTitle}>랭킹</div>
                    <div className={styles.sectionTitle}>펀딩&마켓</div>
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
})(withRouter(FundingMarket));
