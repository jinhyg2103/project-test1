import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Components
import ImageList from '../../Common/ImageList';

// Styles
import stylesFundingMarket from '../../Styles/Components/FundingMarket.css';
import styles from '../../Styles/App.css';
// Actions
import * as ActionList from '../../Data/FundingMarket/action';

class FundingMarketList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let fundingMarketList = ActionList.FUNDING_MARKET_LIST.map((item, index) => {
            return (
                <div className={stylesFundingMarket.productBox} key={index}>
                    <ImageList type={'fundingmarket'} listItem={item} />
                </div>
            );
        });
        return (
            <div className={stylesFundingMarket.fundingMarketBody}>
                <div className={stylesFundingMarket.listHeader}>
                    <div className={styles.sectionSmallTitle}>랭킹</div>
                    <div className={styles.titleBox}>
                        <div className={styles.sectionTitle}>
                            펀딩&마켓
                            <div />
                        </div>
                        <div className={styles.filter}>
                            인기순
                            <div />
                        </div>
                    </div>
                </div>
                <div className={stylesFundingMarket.productBody}>
                    {fundingMarketList}
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(FundingMarketList));
