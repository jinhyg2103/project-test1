import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import FundingHome from '../../Components/Funding';
import FundingDetail from '../../Components/Funding/Detail';

class FundingView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Route path={'/fundingmarket'} component={FundingHome} />
                <Route path={'/fundingmarket/detail'} component={FundingDetail} />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(FundingView));