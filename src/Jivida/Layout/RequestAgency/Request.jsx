import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import * as ActionRequest from '../../Data/Request/actions';
import * as ActionInquiry from '../../Data/Inquiry/actions';

// CSS
import styles from '../JividaLayout.css';
import stylesRequest from './Request.css';
import stylesTab from '../TabPage.css';

// Components
import InquiryComponent from './TabInquiry';
import FindHouseComponent from './TabFindHouse';
import SellComponent from './TabSell';
import FindIntermidiateHouseComponent from './TabFindIntermidiateHouse';
import FindIntermidiateCustomerComponent from './TabFindIntermidiateCustomer';
import MyIntermidiateHouse from './TabMyIntermidiateRequest';
import MyIntermidiateCustomer from './TabMyIntermidiateCustomer';

class RequestView extends React.Component {
    componentWillMount() {
        //this.props.dispatch(ActionRequest.get());
        this.props.dispatch(ActionInquiry.getInquiriesCount({ uIdAgency: this.props.author.id }));
    }

    render() {
        //<Link to="/request/intermidiate/findCustomer" className={stylesTab.tabMenuItem + ' ' + (this.props.location.pathname == '/request/intermidiate/findCustomer' ? stylesTab.active : null)}>받은 손님요청 ({this.props.myHousesCount})</Link>
        return (
            <div className={stylesTab.tabContainer}>
                <div className={stylesTab.tabMenu}>
                    <div className={stylesTab.leftTab}>
                        <Link to="/request/inquiry" className={stylesTab.leftTabItemGreen + ' ' + (this.props.location.pathname == '/request/inquiry' || this.props.location.pathname == '/request/findHouse' || this.props.location.pathname == '/request/sell' ? stylesTab.active : null)}>고객요청</Link>
                        <span className={stylesTab.leftTabDivider}>·</span>
                        <Link to="/request/intermidiate/findHouse" className={stylesTab.leftTabItemBlue + ' ' + (this.props.location.pathname == '/request/inquiry' || this.props.location.pathname == '/request/findHouse' || this.props.location.pathname == '/request/sell' ? null : stylesTab.active)}>공동중개</Link>
                    </div>
                    { this.props.location.pathname == '/request/inquiry' || this.props.location.pathname == '/request/findHouse' || this.props.location.pathname == '/request/sell' ? (
                        <div className={stylesTab.tabMenuItemBox}>
                            <Link to="/request/inquiry" className={stylesTab.tabMenuItem + ' ' + (this.props.location.pathname == '/request/inquiry' ? stylesTab.active : null)}>문의</Link>
                            <Link to="/request/findHouse" className={stylesTab.tabMenuItem + ' ' + (this.props.location.pathname == '/request/findHouse' ? stylesTab.active : null)}>집 찾기</Link>
                            <Link to="/request/sell" className={stylesTab.tabMenuItem + ' ' + (this.props.location.pathname == '/request/sell' ? stylesTab.active : null)}>판매 요청</Link>
                        </div>
                    ) : (
                        <div className={stylesTab.tabMenuItemBox}>
                            <Link to="/request/intermidiate/findHouse" className={stylesTab.tabMenuItem + ' ' + (this.props.location.pathname == '/request/intermidiate/findHouse' ? stylesTab.active : null)}>받은 매물요청</Link>
                            <Link to="/request/intermidiate/myRequest" className={stylesTab.tabMenuItem + ' ' + (this.props.location.pathname == '/request/intermidiate/myRequest' ? stylesTab.active : null)}>보낸 매물요청</Link>
                        </div>
                    )}
                </div>
                <Route path={'/request/inquiry'} component={InquiryComponent} />
                <Route path={'/request/findHouse'} component={FindHouseComponent} />
                <Route path={'/request/sell'} component={SellComponent} />
                <Route path={'/request/intermidiate/findHouse'} component={FindIntermidiateHouseComponent} />
                <Route path={'/request/intermidiate/findCustomer'} component={FindIntermidiateCustomerComponent} />
                <Route path={'/request/intermidiate/myRequest'} component={MyIntermidiateHouse} />
                <Route path={'/request/intermidiate/myCustomer'} component={MyIntermidiateCustomer} />
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
