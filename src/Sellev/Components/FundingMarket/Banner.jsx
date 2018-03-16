import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Components
import BannerBody from './BannerBody';

// Styles
import stylesFundingMarket from '../../Styles/Components/FundingMarket.css';
import styles from '../../Styles/App.css';


// Actions

class Banner extends React.Component {
    render() {
        return (
            <div className={stylesFundingMarket.fundingMarketSection}>
                <div className={stylesFundingMarket.fundingMarketHeader}>
                    <div className={styles.sectionSmallTitle}>셀레브 Pick</div>
                    <div className={styles.sectionTitle}>오늘의 펀딩&마켓</div>
                </div>
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
