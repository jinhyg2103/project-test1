import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import DetailFunding from './DetailFunding';
import DetailMarket from './DetailMarket';
import DetailRanking from './DetailRanking';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 1,
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.type === 1 ? <DetailFunding /> : <DetailMarket />
                }
                <DetailRanking/>
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(Detail));