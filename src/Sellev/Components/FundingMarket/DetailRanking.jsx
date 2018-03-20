import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import FundingMarketList from '../ContentList/FundingMarketList';
// Actions
import * as ActionListItem from '../../Data/FundingMarket/action';
//Style
import styles from '../../Styles/App.css';
import stylesFundingMarket from '../../Styles/Components/FundingMarket.css';

class DetailRanking extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={stylesFundingMarket.rankSection}>
                <div className={stylesFundingMarket.rankHeader}>
                    <div className={styles.sectionSmallTitle}>랭킹</div>
                    <div className={styles.sectionTitle}>실시간 인기펀딩</div>
                </div>
                <FundingMarketList title={'펀딩액순'} listItem={ActionListItem.LIST_RAKING_FUNDING_MARKET.fundingList} />
                <FundingMarketList title={'조회순'} listItem={ActionListItem.LIST_RAKING_FUNDING_MARKET.hitList} />
                <FundingMarketList title={'신규'} listItem={ActionListItem.LIST_RAKING_FUNDING_MARKET.newList} />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(DetailRanking));
