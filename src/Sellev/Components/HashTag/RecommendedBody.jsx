import React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components

// Styles
import styles from '../../Styles/App.css';
import stylesHashTag from '../../Styles/Components/HashTag.css';

class RecommendedBody extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={stylesHashTag.recommendedBody}>
                버블차트
            </div>
        );
    }
}
export default connect((state) => {
    return {
        author: state.data.auth.author,
    };
})(withRouter(RecommendedBody));