import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import Banner from './/Banner';
import Body from './/List';

class FundingMarketHome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Banner />
                <Body />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(FundingMarketHome));