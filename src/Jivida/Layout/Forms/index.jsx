import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

// CSS
import styles from '../JividaLayout.css';
import stylesForm from './Form.css';

// Components
import SignupComponent from './Signup';
import SignupAgencyComponent from './SignupAgency';
import LoginComponent from './Login';
import FindIdComponent from './FindIdText';
import FindPasswordComponent from './FindPassword';
import RequestFindHouseComponent from './RequestFindHouse';
import RequestFindCustomerComponent from './RequestFindCustomer';
import RequestSellComponent from './RequestSell';
import SellComponent from './Sell';

class RequestView extends React.Component {
    render() {
        return (
            <div className={stylesForm.formContainer}>
                <Route path={'/form/sell'} component={SellComponent} />
                <Route path={'/form/request/findHouse'} component={RequestFindHouseComponent} />
                <Route path={'/form/request/findCustomer'} component={RequestFindCustomerComponent} />
                <Route path={'/form/request/sell'} exact={true} strict={true} component={RequestSellComponent} />
                <Route path={'/form/login'} component={LoginComponent} />
                <Route path={'/form/findPassword'} component={FindPasswordComponent} />
                <Route path={'/form/findIdText'} component={FindIdComponent} />
                <Route path={'/form/signup'} exact={true} strict={true} component={SignupComponent} />
                <Route path={'/form/signup/agency'} exact={true} strict={true} component={SignupAgencyComponent} />
            </div>
        );
    }
}
export default RequestView;
