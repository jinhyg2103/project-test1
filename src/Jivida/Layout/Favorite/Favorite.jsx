import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import * as ActionHouse from '../../Data/House/actions';
import * as ActionUser from '../../Data/User/actions';

// CSS
import styles from '../JividaLayout.css';
import stylesFavorite from './Favorite.css';
import stylesTab from '../TabPage.css';

// Components
import HouseComponent from './TabHouse';
import AgencyComponent from './TabAgency';
import UserComponent from './TabUser';

class FavoriteView extends React.Component {
    componentWillMount() {
        this.props.dispatch(ActionHouse.getFavoriteHousesCount());
        this.props.dispatch(ActionUser.getFavoriteAgenciesCount());
        this.props.dispatch(ActionUser.getFavoriteUserCount());
    }

    render() {
        return (
            <div className={stylesTab.tabContainer}>
                <div className={stylesTab.tabMenu}>
                    <div className={stylesTab.tabMenuItemBox}>
                        <Link to="/favorite/house" className={stylesTab.tabMenuItem + ' ' + (this.props.location.pathname == '/favorite/house' ? stylesTab.active : null)}>집</Link>
                        <Link to="/favorite/agency" className={stylesTab.tabMenuItem + ' ' + (this.props.location.pathname == '/favorite/agency' ? stylesTab.active : null)}>중개 회원</Link>
                        { this.props.author.agency ? (
                            <Link to="/favorite/user" className={stylesTab.tabMenuItem + ' ' + (this.props.location.pathname == '/favorite/user' ? stylesTab.active : null)}>고객</Link>
                        ) : null }
                    </div>
                </div>
                <Route path={'/favorite/house'} component={HouseComponent} />
                <Route path={'/favorite/agency'} component={AgencyComponent} />
                <Route path={'/favorite/user'} component={UserComponent} />
            </div>
        );
    }
}

export default connect((state) => {
    return {
        favoriteHousesCount: state.data.house.favoriteHousesCount,
        favoriteAgenciesCount: state.data.user.favoriteAgenciesCount,
        favoriteUsersCount: state.data.user.favoriteUsersCount,
        author: state.data.auth.author,
    };
})(withRouter(FavoriteView));
