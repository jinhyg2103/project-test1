import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import Banner from '../../Components/Funding/Banner';
import Body from '../../Components/Funding/List';

class FundingView extends React.Component {
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
})(withRouter(FundingView));