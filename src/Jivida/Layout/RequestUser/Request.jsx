import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import * as ActionHouse from '../../Data/House/actions';
import * as ActionInquiry from '../../Data/Inquiry/actions';

// CSS
import styles from '../JividaLayout.css';
import stylesRequest from './Request.css';
import stylesTab from '../TabPage.css';

// Components
import InquiryComponent from './TabInquiry';
import FindHouseComponent from './TabFindHouse';
import SellComponent from './TabSell';

class RequestView extends React.Component {
    componentWillMount() {
        this.props.dispatch(ActionHouse.getMyHousesCount());
        let inquiryParams = {};
        if (this.props.author.type == 1) inquiryParams.uIdUser = this.props.author.id;
        if (this.props.author.type == 2) inquiryParams.uIdAgency = this.props.author.id;
        this.props.dispatch(ActionInquiry.getInquiriesCount(inquiryParams));
    }

    render() {
        return (
            <div className={stylesTab.tabContainer}>
                <div className={stylesTab.tabMenu}>
                    <div className={stylesTab.tabMenuItemBox}>
                        <Link to="/request/inquiry" className={stylesTab.tabMenuItem + ' ' + (this.props.location.pathname == '/request/inquiry' ? stylesTab.active : null)}>문의</Link>
                        <Link to="/request/findHouse" className={stylesTab.tabMenuItem + ' ' + (this.props.location.pathname == '/request/findHouse' ? stylesTab.active : null)}>찾는 집</Link>
                        <Link to="/request/sell" className={stylesTab.tabMenuItem + ' ' + (this.props.location.pathname == '/request/sell' ? stylesTab.active : null)}>내놓은 집</Link>
                    </div>
                </div>
                <Route path={'/request/inquiry'} component={InquiryComponent} />
                <Route path={'/request/findHouse'} component={FindHouseComponent} />
                <Route path={'/request/sell'} component={SellComponent} />
            </div>
        );
    }
}

export default connect((state) => {
    return {
        myHousesCount: state.data.house.myHousesCount,
        inquiriesCount: state.data.inquiry.inquiriesCount,
        author: state.data.auth.author,
    };
})(withRouter(RequestView));
