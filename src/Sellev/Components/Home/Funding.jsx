import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Components
import FundingHeader from './FundingHeader';
import FundingBody from './FundingBody';

// Styles
import stylesHome from './Home.css';

// Actions

class Funding extends React.Component {
    render() {
        return (
            <div className={stylesHome.fundingSection}>
                <FundingHeader />
                <FundingBody />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(Funding));
