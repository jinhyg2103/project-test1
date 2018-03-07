import React from 'react';
import { Switch, Route } from 'react-router';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

// CSS
import styles from '../JividaLayout.css';
import stylesTab from '../TabPage.css';

// Components
import TabComponent from './TabPolicy';

class PolicyView extends React.Component {
    render() {
        return (
            <div className={stylesTab.tabContainer}>
                <div className={stylesTab.tabMenu}>
                    <div className={stylesTab.tabMenuItemBox}>
                        <Link to="/policies/terms" className={stylesTab.tabMenuItem + ' ' + (this.props.location.pathname == '/policies/terms' ? stylesTab.active : null)}>지비다 이용약관</Link>
                        <Link to="/policies/privacy" className={stylesTab.tabMenuItem + ' ' + (this.props.location.pathname == '/policies/privacy' ? stylesTab.active : null)}>개인정보취급방침</Link>
                        <Link to="/policies/location" className={stylesTab.tabMenuItem + ' ' + (this.props.location.pathname == '/policies/location' ? stylesTab.active : null)}>위치기반서비스</Link>
                        <Link to="/policies/agency" className={stylesTab.tabMenuItem + ' ' + (this.props.location.pathname == '/policies/agency' ? stylesTab.active : null)}>중개회원서비스</Link>
                    </div>
                </div>
                <Route path={'/policies/terms'} component={TabComponent} />
                <Route path={'/policies/privacy'} component={TabComponent} />
                <Route path={'/policies/location'} component={TabComponent} />
                <Route path={'/policies/agency'} component={TabComponent} />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(PolicyView));
