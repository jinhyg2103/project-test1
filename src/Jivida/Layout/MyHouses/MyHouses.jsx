import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

// Actions

// CSS
import styles from '../JividaLayout.css';
import stylesRequest from './MyHouses.css';
import stylesTab from '../TabPage.css';

// Components
import TabComponent from './TabMyHouse';

class MyHousesView extends React.Component {
    render() {
        return (
            <div className={stylesTab.tabContainer}>
                <div className={stylesTab.tabMenu}>
                    <div className={stylesTab.tabMenuItemBox}>
                        <Link to="/myHouses/all" className={stylesTab.tabMenuItem + ' ' + (this.props.location.pathname == '/myHouses/all' ? stylesTab.active : null)}>전체</Link>
                        <Link to="/myHouses/mine" className={stylesTab.tabMenuItem + ' ' + (this.props.location.pathname == '/myHouses/mine' ? stylesTab.active : null)}>나의 매물</Link>
                        <Link to="/myHouses/customer" className={stylesTab.tabMenuItem + ' ' + (this.props.location.pathname == '/myHouses/customer' ? stylesTab.active : null)}>고객 매물</Link>
                        <Link to="/myHouses/agency" className={stylesTab.tabMenuItem + ' ' + (this.props.location.pathname == '/myHouses/agency' ? stylesTab.active : null)}>공동중개 매물</Link>
                    </div>
                </div>
                <Route path={'/myHouses/all'} component={TabComponent} />
                <Route path={'/myHouses/mine'} component={TabComponent} />
                <Route path={'/myHouses/customer'} component={TabComponent} />
                <Route path={'/myHouses/agency'} component={TabComponent} />
            </div>
        );
    }
}

export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(MyHousesView));
