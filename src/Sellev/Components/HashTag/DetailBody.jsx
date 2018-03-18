import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import RelatedHashTag from './DetailRelatedHashTag';
import RelatedSellever from './DetailRelatedSellever';
import FundingMarket from './DetailFundingMarket';
import Video from './DetailVideo';


// Styles
import styles from '../../Styles/App.css';
import stylesHashTag from '../../Styles/Components/HashTag.css';

class DetailBody extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={stylesHashTag.detailBody}>
                <RelatedHashTag />
                <RelatedSellever />
                <FundingMarket />
                <Video />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(DetailBody));