import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import FundingMarketHome from '../../Components/FundingMarket';
import FundingMarketDetail from '../../Components/FundingMarket/Detail';

class FundingMarketView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Route path={'/fundingmarket'} exact={true} strict={false} component={FundingMarketHome} />
                <Route path={'/fundingmarket/detail'} exact={true} strict={false} component={FundingMarketDetail} />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(FundingMarketView));