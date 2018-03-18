import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import DetailHeader from './DetailHeader';
import DetailBody from './DetailBody';

// Styles
import styles from '../../Styles/App.css';
import stylesHashTag from '../../Styles/Components/HashTag.css';

class HashTagDetail extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={stylesHashTag.hashTagDetailContainer}>
                <DetailHeader />
                <DetailBody />
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(HashTagDetail));