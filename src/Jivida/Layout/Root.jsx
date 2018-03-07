import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Components
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import HomeComponent from './Home/Home';
import SearchComponent from './Search/Search';
import ChatComponent from './Chat/Chat';
import RequestUserComponent from './RequestUser/Request';
import RequestAgencyComponent from './RequestAgency/Request';
import MyHousesComponent from './MyHouses/MyHouses';
import HouseComponent from './House/House';
import FindHouseComponent from './House/FindHouse';
import AgencyComponent from './Agency/Agency';
import UserComponent from './Agency/User';
import FavoriteComponent from './Favorite/Favorite';
import PolicyComponent from './Forms/Policy';
import FormComponent from './Forms';

// Actions
import * as ActionAuth from '../Data/Authentification/actions';
import * as ActionGeoLocation from '../Data/GeoLocation/actions';

// Routes
import routes from '../routes';

// Styles
import styles from './JividaLayout.css';

class RootView extends React.Component {
    componentDidMount() {
        this.props.dispatch(ActionAuth.session());
    }
    render() {
        return (
            <div>
                <div className={styles.contentContainer}>
                    <HeaderComponent />
                    <Route path={'/'} exact={true} strict={true} component={HomeComponent} />
                    <Route path={'/search'} exact={true} component={SearchComponent} />
                    <Route path={'/chat'} exact={true} component={ChatComponent} />
                    <Route path={'/request'} exact={false} component={(this.props.author.agency ? RequestAgencyComponent : RequestUserComponent)} />
                    <Route path={'/find/house'} exact={false} component={FindHouseComponent} />
                    <Route path={'/favorite'} exact={false} component={FavoriteComponent} />
                    <Route path={'/myHouses'} exact={false} component={MyHousesComponent} />
                    <Route path={'/policies'} exact={false} component={PolicyComponent} />
                    <Route path={'/house'} component={HouseComponent} />
                    <Route path={'/agency'} component={AgencyComponent} />
                    <Route path={'/user'} component={UserComponent} />
                    <Route path={'/form'} exact={false} strict={false} component={FormComponent} />
                    <FooterComponent />
                </div>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(RootView));
