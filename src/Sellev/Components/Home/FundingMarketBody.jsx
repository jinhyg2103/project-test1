import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';


// Components
import FundingMarketList from '../ContentList/FundingMarketList';

// Styles
import stylesHome from '../../Styles/Components/Home.css';

// Actions
import * as ActionListItem from '../../Data/FundingMarket/action';

class FundingMarketBody extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={stylesHome.fundingMarketBody}>
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
})(withRouter(FundingMarketBody));
